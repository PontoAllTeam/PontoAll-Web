import { useCallback, useEffect, useState } from 'react';
import SectorService from '../services/sectorService';
import Table from '@/components/Table';
import { TableColumn } from '@/components/Table/types';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import { AlertModal, ConfirmModal } from '@/components/Modal';
import { Sector, Department } from '@/types';
import { PiPencil, PiPlus, PiTrash } from 'react-icons/pi';
import { DepartmentService } from '@/features/department';
import SectorFormModal from '../components/SectorModalForm';
import CrudActions from '@/components/CrudActions';

export default function SectorOverview() {
  const columns: TableColumn<Sector>[] = [
    { label: 'Nome Setor', attribute: 'name' },
    {
      label: 'Departamento',
      attribute: 'departmentId',
      render: (value) => {
        const department = departments.find((dept) => dept.id === value);
        return department?.name || 'N/A';
      },
    },
  ];

  const [data, setData] = useState<Sector[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'info' | 'success' | 'error'>(
    'info'
  );
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<Sector | undefined>();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const fetchData = useCallback(async () => {
    const res = await SectorService.getAll();
    if (res.success && res.data) {
      setData([...res.data]);
    } else {
      showAlert(`Erro ao buscar dados: ${res.message}`, 'error');
    }
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await DepartmentService.getAll();
      if (response.success && Array.isArray(response.data)) {
        setDepartments(response.data);
      } else {
        showAlert(
          `Erro ao carregar departamentos: ${response.message}`,
          'error'
        );
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const searchAndDepartmentFiltered = data.filter(
    (sector) =>
      sector.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedDepartment === '' ||
        String(sector.departmentId) === selectedDepartment)
  );

  const openCreateModal = () => {
    setEditingItem(undefined);
    setCurrentId(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (id: number) => {
    const item = data.find((row) => row.id === id);
    if (item) {
      setEditingItem(item);
      setCurrentId(id);
      setIsFormModalOpen(true);
    } else {
      showAlert('Registro não encontrado', 'error');
    }
  };

  const openDeleteModal = (id: number) => {
    setCurrentId(id);
    setIsDeleteModalOpen(true);
  };

  const showAlert = (message: string, type: 'info' | 'success' | 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertModalOpen(true);
  };

  const handleSave = async (model: Sector) => {
    if (currentId !== null) {
      await editSector(currentId, model);
    } else {
      await registerSector(model);
    }
  };

  const registerSector = async (model: Sector) => {
    const res = await SectorService.create(model);
    if (res.success) {
      await fetchData();
      showAlert(`Setor "${res.data?.name}" criado com sucesso!`, 'success');
    } else {
      showAlert(res.message || 'Erro inesperado ao criar o setor.', 'error');
    }
  };

  const editSector = async (id: number, model: Sector) => {
    const res = await SectorService.update(id, model);
    if (res.success) {
      await fetchData();
      showAlert(`Setor "${res.data?.name}" atualizado com sucesso!`, 'success');
    } else {
      showAlert(
        res.message || 'Erro inesperado ao atualizar o setor.',
        'error'
      );
    }
  };

  const deleteSector = async () => {
    if (!currentId) return;

    const res = await SectorService.deleteById(currentId);
    if (res.success) {
      setIsDeleteModalOpen(false);
      const itemName = data.find((item) => item.id === currentId)?.name || '';
      setCurrentId(null);

      await fetchData();
      showAlert(`Setor "${itemName}" excluído com sucesso!`, 'success');
    } else {
      showAlert(res.message || 'Erro inesperado ao excluir o setor.', 'error');
    }
  };

  const handleDeleteMany = async () => {
    if (selectedRows.length === 0) {
      showAlert('Nenhuma linha selecionada para exclusão.', 'info');
      return;
    }

    const deletePromises = selectedRows.map((id) => SectorService.deleteById(id));
    const results = await Promise.all(deletePromises);

    const failedDeletes = results.filter((res) => !res.success);

    if (failedDeletes.length === 0) {
      setSelectedRows([]);
      await fetchData();
      showAlert(
        `${selectedRows.length} setor(es) excluído(s) com sucesso!`,
        'success'
      );
    } else {
      showAlert(
        `Erro ao excluir ${failedDeletes.length} setor(es).`,
        'error'
      );
    }
  };

  const Actions = ({ id }: { id: number }) => (
    <>
      <button
        onClick={() => openEditModal(id)}
        className='text-blue hover:scale-105'
      >
        <PiPencil className='size-6' />
      </button>
      <button
        onClick={() => openDeleteModal(id)}
        className='text-red hover:scale-105'
      >
        <PiTrash className='size-6' />
      </button>
    </>
  );

  return (
    <div className='w-full'>
      <BreadcrumbPageTitle title='Cadastro de Setor' />
      <div className='px-6'>
        <div className='flex justify-end items-center py-2 gap-4'>
          <CrudActions onDelete={handleDeleteMany} />
          <Button
            label='Adicionar'
            icon={<PiPlus />}
            iconPosition='left'
            color='secondary'
            size='md'
            onClick={openCreateModal}
          />
          <SectorFormModal
            isOpen={isFormModalOpen}
            onClose={() => {
              setIsFormModalOpen(false);
              setEditingItem(undefined);
            }}
            onSubmit={handleSave}
            objectData={editingItem}
          />
          <ConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={deleteSector}
            title='Deseja realmente excluir este setor?'
            message='Ao excluir este setor, ele será removido permanentemente do sistema.'
          />
          <AlertModal
            isOpen={isAlertModalOpen}
            onClose={() => setIsAlertModalOpen(false)}
            message={alertMessage}
            type={alertType}
          />
        </div>

        <hr className='border-t border-neutral-dark' />

        <div className='flex flex-wrap py-4 gap-2'>
          <select
            className='rounded-sm p-2 text-sm bg-neutral-light focus:ring-1 focus:ring-neutral-dark'
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value=''>Filtrar por departamento</option>
            {departments.map((dep) => (
              <option key={dep.id} value={String(dep.id)}>
                {dep.name}
              </option>
            ))}
          </select>
          <div className='flex-grow flex justify-end ml-auto min-w-[250px]'>
            <SearchBar onChange={setSearch} />
          </div>
        </div>

        <Table<Sector>
          columns={columns}
          data={searchAndDepartmentFiltered}
          actions={(id) => <Actions id={id} />}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
      </div>
    </div>
  );
}
