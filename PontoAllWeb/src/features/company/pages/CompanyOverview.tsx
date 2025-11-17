import { useCallback, useEffect, useState } from 'react';
import CompanyService from '../services/companyService';
import Table from '@/components/Table';
import { TableColumn } from '@/components/Table/types';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import { AlertModal, ConfirmModal } from '@/components/Modal';
import useAppRoutes from '@/hooks/useAppRoutes';
import { useNavigate } from 'react-router-dom';
import { Company, getCompanyStatusLabel } from '@/types';
import { PiPencil, PiPlus, PiTrash } from 'react-icons/pi';

export default function CompanyOverview() {
  const columns: TableColumn<Company>[] = [
    { label: 'Nome Corporativo', attribute: 'corporateName' },
    { label: 'Nome Social', attribute: 'fantasyName' },
    { label: 'CNPJ', attribute: 'cnpj' },
    {
      label: 'Status',
      attribute: 'companyStatus',
      render: (value) => getCompanyStatusLabel(Number(value)),
    },
  ];

  const routes = useAppRoutes();
  const navigate = useNavigate();
  const [data, setData] = useState<Company[]>([]);
  const [search, setSearch] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'info' | 'success' | 'error'>(
    'info'
  );
  const [currentId, setCurrentId] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    const res = await CompanyService.getAll();
    if (res.success && res.data) {
      setData([...res.data]);
    } else {
      showAlert(`Erro ao buscar dados: ${res.message}`, 'error');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = data.filter(
    (company) =>
      company.corporateName.toLowerCase().includes(search.toLowerCase()) ||
      company.fantasyName.toLowerCase().includes(search.toLowerCase()) ||
      company.cnpj.includes(search)
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

  const deleteCompany = async () => {
    if (!currentId) return;

    const res = await CompanyService.deleteById(currentId);
    if (res.success) {
      setIsDeleteModalOpen(false);
      const itemName =
        data.find((item) => item.id === currentId)?.corporateName || '';
      setCurrentId(null);

      await fetchData();
      showAlert(`Empresa "${itemName}" excluída com sucesso!`, 'success');
    } else {
      showAlert(
        res.message || 'Erro inesperado ao excluir a empresa.',
        'error'
      );
    }
  };

  const Actions = ({ id }: { id: number }) => (
    <>
      <button
        onClick={() =>
          navigate(routes.COMPANY_EDIT.path.replace(':id', `${id}`))
        }
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
      <BreadcrumbPageTitle title='Cadastro de Empresa' />
      <div className='px-6'>
        <div className='flex justify-end items-center py-2 gap-4'>
          <Button
            label='Adicionar'
            icon={<PiPlus />}
            iconPosition='left'
            color='secondary'
            size='md'
            onClick={() => navigate(routes.COMPANY_REGISTRATION.path)}
          />
          <ConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={deleteCompany}
            title='Deseja realmente excluir esta empresa?'
            message='Ao excluir esta empresa, ela será removida permanentemente do sistema.'
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
