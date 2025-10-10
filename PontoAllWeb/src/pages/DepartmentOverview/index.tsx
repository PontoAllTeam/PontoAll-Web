import { useState } from 'react';
import { MdEdit, MdDelete, MdAdd, MdMoreVert } from 'react-icons/md';

import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import Modal from '@/components/GenericModal';

export default function DepartmentOverview() {
  // Estado para busca no campo de pesquisa
  const [search, setSearch] = useState('');

  // Estado para abrir a modal de cadastro de departamento
  const [showDepartamentoModal, setShowDepartamentoModal] = useState(false);

  // Estado para abrir a modal de confirmação (opcional)
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Estado para abrir o dropdown de ações
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Estado para controlar quais linhas estão selecionadas
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Colunas da tabela
  const columns = ['Nome Departamento'];

  // Dados simulados dos departamentos
  const data = [
    { id: 1, nome: 'Pessoal' },
    { id: 2, nome: 'Financeiro' },
    { id: 3, nome: 'Marketing' },
  ];

  // Campos do formulário da modal de cadastro
  const departamentoInputs = [
    { label: 'Nome do Departamento' },
  ];

  // Ações exibidas na última coluna da tabela
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

  // Formata os dados para o componente Table
  const formattedData = data.map((item) => ({
    id: item.id,
    nomeDepartamento: item.nome,
  }));

  // Seleciona ou desseleciona todas as linhas
  const handleToggleAll = (checked: boolean) => {
    if (checked) {
      const allIds = formattedData.map((item) => item.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  // Alterna a seleção de uma linha individual
  const handleToggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Função chamada ao confirmar cadastro de departamento
  const handleCadastroDepartamento = (data: { [key: string]: string }) => {
    console.log('Departamento cadastrado:', data);
    setShowDepartamentoModal(false);
    setShowConfirmModal(true); // opcional: abrir confirmação
  };

  return (
    <div className='w-full'>
      {/* Título da página */}
      <BreadcrumbPageTitle title='Departamentos' />

      <div className='px-6'>
        {/* Botões de ação e cadastro */}
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
            label='Cadastrar Departamento'
            color='secondary'
            size='sm'
            icon={<MdAdd size={16} />}
            onClick={() => setShowDepartamentoModal(true)}
          />
        </div>

        <hr className='border-t border-gray-300' />

        {/* Campo de busca */}
        <div className='flex py-4 gap-2'>
          <div className='flex justify-end ml-auto w-1/3'>
            <SearchBar onChange={setSearch} />
          </div>
        </div>

        {/* Modal de cadastro de departamento */}
        {showDepartamentoModal && (
          <Modal
            title='Cadastrar Departamento'
            inputs={departamentoInputs}
            action={handleCadastroDepartamento}
            statusModal={showDepartamentoModal}
            onClose={() => setShowDepartamentoModal(false)}
          />
        )}

        {/* Modal de confirmação (opcional) */}
        {showConfirmModal && (
          <Modal
            title='Confirmar Cadastro'
            inputs={[]}
            description='Deseja realmente confirmar o cadastro do departamento?'
            action={() => {
              console.log('Departamento cadastrado com sucesso!');
              setShowConfirmModal(false);
            }}
            statusModal={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
          />
        )}

        {/* Tabela de departamentos */}
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
