import { useState } from 'react';
import { MdEdit, MdDelete, MdAdd, MdMoreVert } from 'react-icons/md';

import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import UserRegisterModal from '@/components/UserRegisterModal';
import Button from '@/components/Button';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import Modal from '@/components/GenericModal';

export default function EmployeeOverview() {
  //Declaração de estado
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

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

  const formattedData = data.map((item) => ({
    id: item.id,
    nomeFuncionario: item.nome,
    departamento: item.departamento,
    setor: item.setor,
    tipoFuncionario: item.tipo,
    status: item.status,
  }));

  const actions = (
    <>
      <button className='text-blue'>
        <MdEdit size={24} />
      </button>
      <button className='text-red'>
        <MdDelete size={24} />
      </button>
    </>
  );

  const handleToggleAll = (checked: boolean) => {
    if (checked) {
      const allIds = formattedData.map((item) => item.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleToggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className='w-full'>
      <BreadcrumbPageTitle title='Funcionários' />
      <div className='p-6'>
        <div className='flex justify-between items-center px-4 py-2 bg-neutral-dark rounded-sm mb-4'>
          <SearchBar onChange={setSearch} />
          <Button
            label='Cadastrar Funcionário'
            color='secondary'
            size='sm'
            icon={<MdAdd size={16} />}
            onClick={() => setOpenModal(true)}
          />
        </div>

        <hr className='border-t border-gray-300' />

        <div className='flex py-4 gap-2'>
          <select className='rounded-sm p-2 text-sm bg-neutral-light focus:ring-1 focus:ring-neutral-dark'>
            <option value=''>Filtrar por departamento</option>
            <option value='ativo'>Ativo</option>
            <option value='inativo'>Inativo</option>
            <option value='clt'>CLT</option>
            <option value='pj'>PJ</option>
          </select>

          <select className='rounded-sm p-2 text-sm bg-neutral-light focus:ring-1 focus:ring-neutral-dark'>
            <option value=''>Filtrar por setor</option>
            <option value='ativo'>Ativo</option>
            <option value='inativo'>Inativo</option>
            <option value='clt'>CLT</option>
            <option value='pj'>PJ</option>
          </select>

          <div className='flex justify-end ml-auto w-1/3'>
            <SearchBar onChange={setSearch} />
          </div>
        </div>

        {openModal && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg shadow-lg p-8 max-h-[90%] overflow-auto w-full max-w-5xl'>
              <UserRegisterModal />
              <div className='flex justify-end gap-4 py-2'>
                <Button
                  label='Cancelar'
                  color='cancel'
                  size='sm'
                  onClick={() => setOpenModal(false)}
                />
                <Button
                  label='Cadastrar'
                  color='secondary'
                  size='md'
                  onClick={() => setShowConfirmModal(true)}
                />
              </div>
            </div>
          </div>
        )}

        {showConfirmModal && (
          <Modal
            title='Confirmar Cadastro'
            inputs={[]}
            description='Deseja realmente confirmar o cadastro do funcionário?'
            action={() => {
              console.log('Funcionário cadastrado com sucesso!');
              setShowConfirmModal(false);
              setOpenModal(false);
            }}
            statusModal={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
          />
        )}

        <Table
          columns={columns}
          data={formattedData}
          actions={actions}
          selectedRows={selectedRows}
          onToggleAll={handleToggleAll}
          onToggleRow={handleToggleRow}
        />
      </div>
    </div>
  );
}
