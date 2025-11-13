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
import { getUserStatusLabel, getUserTypeLabel, Sector, User } from '@/types';
import { PiPencil, PiPlus, PiTrash } from 'react-icons/pi';
import { SectorService } from '@/features/sector';

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

  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

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
      <BreadcrumbPageTitle title='Cadastro de Colaborador' />
      <div className='px-6'>
        <div className='flex justify-end items-center py-2 gap-4'>
          <Button
            label='Adicionar'
            icon={<PiPlus />}
            iconPosition='left'
            color='green'
            size='md'
            onClick={() => navigate(routes.USER_REGISTRATION.path)}
          />
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

        <hr className='border-t border-neutral-dark' />

        <div className='flex flex-wrap py-4 gap-2'>
          <div className='flex-grow flex justify-end ml-auto min-w-[250px]'>
            <SearchBar onChange={setSearch} />
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
