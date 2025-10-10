import { useState } from 'react';
import { MdEdit, MdDelete, MdAdd, MdMoreVert } from 'react-icons/md';

import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import UserRegisterModal from '@/components/UserRegisterModal';
import Button from '@/components/Button';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import Modal from '@/components/GenericModal';

export default function DepartmentOverview() {
  //Declaração de estado
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const columns = ['Nome Departamento'];

  const data = [
    {
      id: 1,
      nome: 'Pessoal',
    },
    {
      id: 2,
      nome: 'Financeiro',
    },
    {
      id: 3,
      nome: 'Marketing',
    },
  ];

  const formattedData = data.map((item) => ({
    id: item.id,
    nomeDepartamento: item.nome,
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
      <BreadcrumbPageTitle title='Departamentos' />
      <div className='px-6'>
        <div className='flex justify-end items-center py-2 gap-4'>
          <div className='relative inline-block'>
            <Button
              label='Ações'
              color='white'
              size='sm'
              icon={<MdMoreVert size={16} />}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className='absolute top-full left-0 mt-1 w-40 bg-white rounded shadow-lg z-50'>
                <button
                  className='flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-neutral-dark'
                  onClick={() => console.log('Excluir')}
                >
                  <MdDelete size={16} />
                  <span>Excluir</span>
                </button>
              </div>
            )}
          </div>

          <Button
            label='Cadastrar Setor'
            color='secondary'
            size='sm'
            icon={<MdAdd size={16} />}
            onClick={() => setOpenModal(true)}
          />
        </div>

        <hr className='border-t border-gray-300' />

        <div className='flex py-4 gap-2'>
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
            description='Deseja realmente confirmar o cadastro do setor?'
            action={() => {
              console.log('Setor cadastrado com sucesso!');
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
