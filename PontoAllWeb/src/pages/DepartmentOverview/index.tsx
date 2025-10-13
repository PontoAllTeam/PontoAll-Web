// Importa hooks do React e ícones de ação
import { useEffect, useState } from 'react';
import { MdEdit, MdDelete, MdAdd, MdMoreVert } from 'react-icons/md';

// Importa componentes reutilizáveis da aplicação
import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import Modal, { InputField } from '@/components/GenericModal';

// Importa a service e os tipos utilizados
import DepartmentService from '@/services/departmentService';
import { Department } from '@/types/models/department';
import { ApiResponseEnum } from '@/types/contracts';

// Instancia a service conforme padrão do projeto
const departmentService = new DepartmentService();

export default function DepartmentOverview() {
  // Estado para o campo de busca
  const [search, setSearch] = useState('');

  // Estado para controlar exibição da modal de cadastro/edição
  const [showDepartamentoModal, setShowDepartamentoModal] = useState(false);

  // Estado para controlar exibição da modal de confirmação
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Estado para controlar exibição do dropdown de ações
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Estado para armazenar IDs das linhas selecionadas na tabela
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Lista de departamentos carregados da API
  const [departments, setDepartments] = useState<Department[]>([]);

  // Estado para controlar qual departamento está sendo editado
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );

  // Define as colunas da tabela
  const columns = ['Nome Departamento'];

  // Define os campos da modal de cadastro/edição
  const departamentoInputs: InputField[] = [
    { label: 'Nome do Departamento', type: 'text' },
  ];

  // Carrega os departamentos da API ao montar o componente
  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await departmentService.getAll();

      // Verifica se a resposta foi bem-sucedida e contém um array
      if (
        response.code === ApiResponseEnum.SUCCESS &&
        Array.isArray(response.data)
      ) {
        setDepartments(response.data);
      } else {
        console.error('Erro ao carregar departamentos:', response.message);
      }
    };

    fetchDepartments();
  }, []);

  // Função para cadastrar ou editar um departamento
  const handleCadastroDepartamento = async (formData: {
    [key: string]: string;
  }) => {
    const nome = formData['Nome do Departamento'];

    if (editingDepartment) {
      // Atualiza departamento existente
      const updated: Department = { ...editingDepartment, name: nome };
      const response = await departmentService.update(updated.id, updated);

      if (response.code === ApiResponseEnum.SUCCESS && response.data) {
        setDepartments((prev) =>
          prev.map((d) =>
            d.id === updated.id ? (response.data as Department) : d
          )
        );
        setEditingDepartment(null);
      } else {
        console.error('Erro ao atualizar departamento:', response.message);
      }
    } else {
      // Cria novo departamento (sem enviar ID se a API não exigir)
      const newDepartment: Omit<Department, 'id'> = {
        name: nome,
        companyId: 1,
      };
      const response = await departmentService.create(
        newDepartment as Department
      );

      if (response.code === ApiResponseEnum.SUCCESS && response.data) {
        setDepartments((prev) => [...prev, response.data as Department]);
        setShowConfirmModal(true);
      } else {
        console.error('Erro ao cadastrar departamento:', response.message);
      }
    }

    setShowDepartamentoModal(false);
  };

  // Função para excluir um departamento individual
  const handleDeleteDepartment = async (id: number) => {
    const response = await departmentService.remove(id);

    if (response.code === ApiResponseEnum.SUCCESS) {
      setDepartments((prev) => prev.filter((d) => d.id !== id));
    } else {
      console.error('Erro ao excluir departamento:', response.message);
    }
  };

  // Função para excluir todos os departamentos selecionados
  const handleDeleteSelectedDepartments = async () => {
    for (const id of selectedRows) {
      await handleDeleteDepartment(id);
    }
    setSelectedRows([]);
    setIsDropdownOpen(false);
  };

  // Abre a modal de edição com os dados preenchidos
  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
    setShowDepartamentoModal(true);
  };

  // Define os botões de ação para cada linha da tabela
  const Actions = ({ id }: { id: number }) => {
    const department = departments.find((d) => d.id === id);
    return (
      <>
        <button
          onClick={() => department && handleEditDepartment(department)}
          className='text-blue'
        >
          <MdEdit className='size-6' />
        </button>
        <button
          onClick={() => handleDeleteDepartment(id)}
          className='text-red'
        >
          <MdDelete className='size-6' />
        </button>
      </>
    );
  };

  // Formata os dados para exibição na tabela, aplicando filtro de busca
  const formattedData = departments
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .map((item) => ({
      id: item.id,
      nomeDepartamento: item.name,
    }));

  // Seleciona ou desseleciona todas as linhas da tabela
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

  // Renderiza a interface da página
  return (
    <div className='w-full'>
      {/* Título da página */}
      <BreadcrumbPageTitle title='Departamentos' />

      <div className='px-6'>
        {/* Botões de ação e cadastro */}
        <div className='flex justify-end items-center py-2 gap-4'>
          {/* Dropdown de ações */}
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
                  onClick={handleDeleteSelectedDepartments}
                >
                  <MdDelete size={16} />
                  <span>Excluir</span>
                </button>
              </div>
            )}
          </div>

          {/* Botão de cadastro */}
          <Button
            label='Cadastrar Departamento'
            color='secondary'
            size='sm'
            icon={<MdAdd size={16} />}
            onClick={() => {
              setEditingDepartment(null);
              setShowDepartamentoModal(true);
            }}
          />
        </div>

        <hr className='border-t border-gray-300' />

        {/* Campo de busca */}
        <div className='flex py-4 gap-2'>
          <div className='flex justify-end ml-auto w-1/3'>
            <SearchBar onChange={setSearch} />
          </div>
        </div>

        {/* Modal de cadastro ou edição */}
        {showDepartamentoModal && (
          <Modal
            title={
              editingDepartment
                ? 'Editar Departamento'
                : 'Cadastrar Departamento'
            }
            inputs={departamentoInputs.map((input) => ({
              ...input,
              value: editingDepartment?.name || '',
            }))}
            action={handleCadastroDepartamento}
            statusModal={showDepartamentoModal}
            onClose={() => {
              setShowDepartamentoModal(false);
              setEditingDepartment(null);
            }}
          />
        )}

        {/* Modal de confirmação de cadastro */}
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
          selectedRows={selectedRows}
          actions={(id) => <Actions id={id} />}
          onToggleAll={handleToggleAll}
          onToggleRow={handleToggleRow}
        />
      </div>
    </div>
  );
}
