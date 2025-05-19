import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import UserRegisterModal from '@/components/UserRegisterModal';
import { useState } from 'react';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';

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
    <div className='p-6'>
      <div className='flex justify-between items-center px-4 py-2 bg-neutral-dark rounded-sm mb-4'>
        <SearchBar onChange={setSearch} />
        <button
          onClick={() => setOpenModal(true)}
          className='ml-4 bg-secondary text-white text-sm px-8 py-2 rounded-md font-semibold shadow-md hover:bg-accent flex items-center gap-2'
        >
          <MdAdd size={20} />
          Cadastrar Funcionário
        </button>
      </div>

      {openModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 max-h-[90%] overflow-auto w-full max-w-5xl'>
            <UserRegisterModal />
            <div className='flex justify-end gap-4'>
              <button
                onClick={() => setOpenModal(false)}
                className='mt-4 px-8 py-2 text-base bg-neutral-light text-text-primary font-medium rounded-md hover:bg-neutral-dark'
              >
                Cancelar
              </button>
              <button className='mt-4 px-14 py-2 text-md bg-secondary text-white font-medium rounded-md hover:bg-accent'>
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      )}

      <Table columns={columns} data={formattedData} actions={actions} />
    </div>
  );
}
