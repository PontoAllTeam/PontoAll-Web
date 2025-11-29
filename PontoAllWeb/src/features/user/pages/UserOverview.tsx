import { useCallback, useEffect, useState } from 'react';
import UserService from '../services/userService';
import Table from '@/components/Table';
import { TableColumn } from '@/components/Table/types';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import { AlertModal, ConfirmModal } from '@/components/Modal';
import useAppRoutes from '@/hooks/useAppRoutes';
import { useNavigate } from 'react-router-dom';
import {
  getUserStatusLabel,
  getUserTypeLabel,
  getUserStatusOptions,
  Sector,
  User,
} from '@/types';
import { PiPencil, PiPlus, PiTrash } from 'react-icons/pi';
import { SectorService } from '@/features/sector';
import { CrudActionsButton } from '@/components/CrudActions';
import { SelectInput } from '@/components/FormControls';

export default function UserOverview() {
  const columns: TableColumn<User>[] = [
    { label: 'Nome Colaborador', attribute: 'name' },
    {
      label: 'Setor',
      attribute: 'sectorId',
      render: (value) => {
        const sector = sectors.find((sector) => sector.id === value);
        if (sector) return sector.name;
        return 'N/A';
      },
    },
    {
      label: 'Tipo Colaborador',
      attribute: 'userType',
      render: (value) => getUserTypeLabel(Number(value)),
    },
    {
      label: 'Status',
      attribute: 'userStatus',
      render: (value) => getUserStatusLabel(Number(value)),
    },
  ];
  const routes = useAppRoutes();
  const navigate = useNavigate();
  const [data, setData] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'info' | 'success' | 'error'>(
    'info'
  );
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState<number>(0);
  const [sectorFilter, setSectorFilter] = useState<number>(0);

  const fetchData = useCallback(async () => {
    const res = await UserService.getAll();
    if (res.success && res.data) {
      setData([...res.data]);
    } else {
      showAlert(`Erro ao buscar dados: ${res.message}`, 'error');
    }
  }, []);

  useEffect(() => {
    const fetchSectors = async () => {
      const response = await SectorService.getAll();
      if (response.success && Array.isArray(response.data)) {
        setSectors(response.data);
      } else {
        showAlert(
          `Erro ao carregar departamentos: ${response.message}`,
          'error'
        );
      }
    };
    fetchSectors();
  }, []);

  // Pega os dados ja cadastrados para mostrar na tabela
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = data.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 0 || user.userStatus === statusFilter;
    const matchesSector = sectorFilter === 0 || user.sectorId === sectorFilter;
    return matchesSearch && matchesStatus && matchesSector;
  });

  const openDeleteModal = (id: number) => {
    setCurrentId(id);
    setIsDeleteModalOpen(true);
  };

  const showAlert = (message: string, type: 'info' | 'success' | 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertModalOpen(true);
  };

  const deleteUser = async () => {
    if (!currentId) return;

    const res = await UserService.deleteById(currentId);
    if (res.success) {
      setIsDeleteModalOpen(false);
      const itemName = data.find((item) => item.id === currentId)?.name || '';
      setCurrentId(null);

      await fetchData();
      showAlert(`Colaborador "${itemName}" excluído com sucesso!`, 'success');
    } else {
      showAlert(
        res.message || 'Erro inesperado ao excluir o colaborador.',
        'error'
      );
    }
  };

  const handleDeleteMany = async () => {
    if (selectedRows.length === 0) {
      showAlert('Nenhuma linha selecionada para exclusão.', 'info');
      return;
    }

    const deletePromises = selectedRows.map((id) => UserService.deleteById(id));
    const results = await Promise.all(deletePromises);

    const failedDeletes = results.filter((res) => !res.success);

    if (failedDeletes.length === 0) {
      setSelectedRows([]);
      await fetchData();
      showAlert(
        `${selectedRows.length} colaborador(es) excluído(s) com sucesso!`,
        'success'
      );
    } else {
      showAlert(
        `Erro ao excluir ${failedDeletes.length} colaborador(es).`,
        'error'
      );
    }
  };

  // Essa função cria botões que tem acesso ao id da linha onde eles aparecem
  const Actions = ({ id }: { id: number }) => (
    <>
      <button
        onClick={() => navigate(routes.USER_EDIT.path.replace(':id', `${id}`))}
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
      <BreadcrumbPageTitle title='Colaboradores' />
      <div className='px-6'>
        <div className='flex justify-end items-center py-2 gap-4'>
          <CrudActionsButton onDelete={handleDeleteMany} />
          <Button
            label='Adicionar'
            icon={<PiPlus />}
            iconPosition='left'
            color='secondary'
            size='md'
            onClick={() => navigate(routes.USER_REGISTRATION.path)}
          />
        </div>

        <hr className='border-t border-neutral-dark' />

        <div className='flex py-4 gap-2'>
          <div className='w-48'>
            <SelectInput<{ userStatus: number }>
              name='userStatus'
              label=''
              value={statusFilter}
              onChange={(_, value) => setStatusFilter(Number(value))}
              options={[
                { label: 'Todos os status', value: 0 },
                ...getUserStatusOptions(),
              ]}
            />
          </div>

          <div className='w-48'>
            <SelectInput<{ sectorId: number }>
              name='sectorId'
              label=''
              value={sectorFilter}
              onChange={(_, value) => setSectorFilter(Number(value))}
              options={[
                { label: 'Todos os setores', value: 0 },
                ...sectors.map((sector) => ({
                  label: sector.name,
                  value: sector.id,
                })),
              ]}
            />
          </div>

          <div className='flex justify-end ml-auto w-1/3'>
            <SearchBar onChange={setSearch} />
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredData}
          actions={(id) => <Actions id={id} />}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteUser}
        title='Deseja realmente excluir este colaborador?'
        message='Ao excluir este colaborador, ele será removido permanentemente do sistema.'
      />
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        message={alertMessage}
        type={alertType}
      />
    </div>
  );
}
