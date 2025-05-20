import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import UserRegisterModal from '@/components/UserRegisterModal';
import { useState } from 'react';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import Button from '@/components/Button';
import Breadcrumb_PageTitle from '@/components/BreadcrumbPageTitle';

export default function UserManagement() {
  //Declaração de estado
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const columns = [
    'Nome Funcionário',
    'Departamento',
    'Setor',
    'Tipo Funcionário',
    'Status',
  ];

  const data = [
    {
      id: 1,
      nome: 'Ana Lima',
      departamento: 'RH',
      setor: 'Pessoal',
      tipo: 'CLT',
      status: 'Ativo',
    },
    {
      id: 2,
      nome: 'Carlos Souza',
      departamento: 'TI',
      setor: 'Infraestrutura',
      tipo: 'PJ',
      status: 'Ativo',
    },
    {
      id: 3,
      nome: 'Mariana Alves',
      departamento: 'Financeiro',
      setor: 'Contas a Pagar',
      tipo: 'CLT',
      status: 'Inativo',
    },
  ];

  // Ações exibidas na última coluna da tabela
  const actions = (
    <>
      <button className='text-action-edit'>
        <MdEdit size={28} />
      </button>
      <button className='text-action-danger'>
        <MdDelete size={28} />
      </button>
    </>
  );
  // Adaptando os dados para o formato esperado pelo componente Table
  const formattedData = data.map((item) => ({
    id: item.id,
    nomeFuncionario: item.nome,
    departamento: item.departamento,
    setor: item.setor,
    tipoFuncionario: item.tipo,
    status: item.status,
  }));

  return (
    <div className='w-full'>
      <Breadcrumb_PageTitle title="Funcionários" />
      <div className='p-6'>
        <div className='flex justify-between items-center px-4 py-2 bg-neutral-dark rounded-sm mb-4'>
          <SearchBar onChange={setSearch} />
          <Button
            label='Cadastrar Funcionário'
            color='secondary'
            size='sm'
            icon={<MdAdd size={20} />}
            onClick={() => setOpenModal(true)}
          />
        </div>

        {openModal && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg shadow-lg p-6 max-h-[90%] overflow-auto w-full max-w-5xl'>
              <UserRegisterModal />
              <div className='flex justify-end gap-4 py-2'>
                <Button
                  label='Cancelar'
                  color='cancel'
                  size='md'
                  onClick={() => setOpenModal(false)}
                />
                <Button label='Cadastrar' color='secondary' size='lg' />
              </div>
            </div>
          </div>
        )}

        <Table columns={columns} data={formattedData} actions={actions} />
      </div>
    </div>
  );
}
