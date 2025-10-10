import { useState } from 'react';
import { MdEdit, MdDelete, MdAdd, MdMoreVert } from 'react-icons/md';

import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import Modal from '@/components/GenericModal';

export default function EmployeeOverview() {
  const [search, setSearch] = useState('');
  const [showSetorModal, setShowSetorModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const columns = ['Nome Setor'];

  const data = [
    { id: 1, nome: 'Pessoal' },
    { id: 2, nome: 'Financeiro' },
    { id: 3, nome: 'Marketing' },
  ];

  const departamentos = ['RH', 'TI', 'Financeiro', 'Marketing'];

  // Campos da modal de cadastro de setor, incluindo o select de departamento
  const setorInputs = [
    { label: 'Nome do Setor', type: 'text' },
    { label: 'Departamento', type: 'select', options: departamentos },
  ];

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

  const formattedData = data.map((item) => ({
    id: item.id,
    nomeSetor: item.nome,
  }));

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

  const handleCadastroSetor = (data: { [key: string]: string }) => {
    console.log('Setor cadastrado:', data);
    setShowSetorModal(false);
    setShowConfirmModal(true);
  };

  return (
    <div className='w-full'>
      <BreadcrumbPageTitle title='Setores' />

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
            onClick={() => setShowSetorModal(true)}
          />
        </div>

        <hr className='border-t border-gray-300' />

        <div className='flex py-4 gap-2'>
          <select className='rounded-sm p-2 text-sm bg-neutral-light focus:ring-1 focus:ring-neutral-dark'>
            <option value=''>Filtrar por departamento</option>
            {departamentos.map((dep, idx) => (
              <option key={idx} value={dep}>
                {dep}
              </option>
            ))}
          </select>

          <div className='flex justify-end ml-auto w-1/3'>
            <SearchBar onChange={setSearch} />
          </div>
        </div>

        {showSetorModal && (
          <Modal
            title='Cadastrar Setor'
            inputs={setorInputs}
            action={handleCadastroSetor}
            statusModal={showSetorModal}
            onClose={() => setShowSetorModal(false)}
          />
        )}

        {showConfirmModal && (
          <Modal
            title='Confirmar Cadastro'
            inputs={[]}
            description='Deseja realmente confirmar o cadastro do setor?'
            action={() => {
              console.log('Setor cadastrado com sucesso!');
              setShowConfirmModal(false);
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
