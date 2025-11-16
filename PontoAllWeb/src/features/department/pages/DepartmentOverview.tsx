import { useCallback, useEffect, useState } from 'react';
import DepartmentService from '../services/departmentService';
import Table from '@/components/Table';
import { TableColumn } from '@/components/Table/types';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import { AlertModal, ConfirmModal } from '@/components/Modal';
import { Department } from '@/types';
import { PiPencil, PiPlus, PiTrash } from 'react-icons/pi';
import DepartmentFormModal from '../components/DepartmentModalForm';
import useCompanyFilter from '@/hooks/useCompanyFilter';

export default function DepartmentOverview() {
  const columns: TableColumn<Department>[] = [
    { label: 'Nome Departamento', attribute: 'name' },
  ];
  const [data, setData] = useState<Department[]>([]);
  const filteredData = useCompanyFilter(data);
  const [originalData, setOriginalData] = useState<Department[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'info' | 'success' | 'error'>(
    'info'
  );
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<Department | undefined>();

  const fetchData = useCallback(async () => {
    const res = await DepartmentService.getAll();
    if (res.success && res.data) {
      setData([...res.data]);
      setOriginalData([...res.data]);
    } else {
      showAlert(`Erro ao buscar dados: ${res.message}`, 'error');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setData(originalData);
      return;
    }
    const searchFiltered = originalData.filter((department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData(searchFiltered);
  };

  const openCreateModal = () => {
    setEditingItem(undefined);
    setCurrentId(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (id: number) => {
    const item = filteredData.find((row) => row.id === id);
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

  const handleSave = async (model: Department) => {
    if (currentId !== null) {
      await editDepartment(currentId, model);
    } else {
      await registerDepartment(model);
    }
  };

  const registerDepartment = async (model: Department) => {
    const res = await DepartmentService.create(model);
    if (res.success) {
      await fetchData();
      showAlert(
        `Departamento "${res.data?.name}" criado com sucesso!`,
        'success'
      );
    } else {
      showAlert(
        res.message || 'Erro inesperado ao criar o departamento.',
        'error'
      );
    }
  };

  const editDepartment = async (id: number, model: Department) => {
    const res = await DepartmentService.update(id, model);
    if (res.success) {
      await fetchData();
      showAlert(
        `Departamento "${res.data?.name}" atualizado com sucesso!`,
        'success'
      );
    } else {
      showAlert(
        res.message || 'Erro inesperado ao atualizar o departamento.',
        'error'
      );
    }
  };

  const deleteDepartment = async () => {
    if (!currentId) return;

    const res = await DepartmentService.deleteById(currentId);
    if (res.success) {
      setIsDeleteModalOpen(false);
      const itemName =
        filteredData.find((item) => item.id === currentId)?.name || '';
      setCurrentId(null);

      await fetchData();
      showAlert(`Departamento "${itemName}" excluído com sucesso!`, 'success');
    } else {
      showAlert(
        res.message || 'Erro inesperado ao excluir o departamento.',
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
      <BreadcrumbPageTitle title='Departamentos' />
      <div className='px-6'>
        <div className='flex justify-end items-center py-2 gap-4'>
          <Button
            label='Adicionar'
            icon={<PiPlus />}
            iconPosition='left'
            color='green'
            size='md'
            onClick={openCreateModal}
          />
          <DepartmentFormModal
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
            onConfirm={deleteDepartment}
            title='Deseja realmente excluir este departamento?'
            message='Ao excluir este departamento, ele será removido permanentemente do sistema.'
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
          <div className='flex-grow flex justify-end ml-auto min-w-[250px]'>
            <SearchBar onChange={handleSearch} />
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredData}
          actions={(id) => <Actions id={id} />}
        />
      </div>
    </div>
  );
}
