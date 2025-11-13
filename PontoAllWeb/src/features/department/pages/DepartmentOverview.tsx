// Importa hooks do React e ícones de ação
import { useEffect, useState } from 'react';
import { MdEdit, MdDelete, MdAdd, MdMoreVert } from 'react-icons/md';

// Importa componentes reutilizáveis da aplicação
import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';

// Importa a service e os tipos utilizados
import { Department } from '@/types';
import DepartmentService from '../services/departmentService';

// Instancia a service conforme padrão do projeto

export default function DepartmentOverview() {
  const [search, setSearch] = useState('');
  const [showDepartamentoModal, setShowDepartamentoModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmMessage, setConfirmMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  const columns = ['Nome Departamento'];
  const departamentoInputs: InputField[] = [
    { label: 'Nome do Departamento', type: 'text' },
  ];

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await DepartmentService.getAll();
      if (response.success && Array.isArray(response.data)) {
        setDepartments(response.data);
      } else {
        console.error('Erro ao carregar departamentos:', response.message);
      }
    };
    fetchDepartments();
  }, []);

  // CADASTRAR / EDITAR — só após confirmação
  const handleSaveDepartment = async () => {
    const nome = formValues['Nome do Departamento'];

    if (editingDepartment) {
      const updated: Department = { ...editingDepartment, name: nome };
      const response = await DepartmentService.update(updated.id, updated);
      if (response.success && response.data) {
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
      const newDepartment: Omit<Department, 'id'> = {
        name: nome,
        companyId: 1,
      };
      const response = await DepartmentService.create(
        newDepartment as Department
      );
      if (response.success && response.data) {
        setDepartments((prev) => [...prev, response.data as Department]);
      } else {
        console.error('Erro ao cadastrar departamento:', response.message);
      }
    }

    setShowDepartamentoModal(false);
    setFormValues({});
  };

  // Exibe modal de confirmação antes de salvar
  const handleConfirmSave = () => {
    setConfirmMessage(
      editingDepartment
        ? 'Deseja realmente salvar as alterações deste departamento?'
        : 'Deseja realmente cadastrar este novo departamento?'
    );
    setConfirmAction(() => handleSaveDepartment);
    setShowConfirmModal(true);
  };

  // EXCLUIR DEPARTAMENTO — com confirmação
  const handleDeleteDepartment = async (id: number) => {
    const response = await DepartmentService.deleteById(id);
    if (response.success) {
      setDepartments((prev) => prev.filter((d) => d.id !== id));
    } else {
      console.error('Erro ao excluir departamento:', response.message);
    }
  };

  const handleConfirmDelete = (id: number) => {
    setConfirmMessage('Deseja realmente excluir este departamento?');
    setConfirmAction(() => () => handleDeleteDepartment(id));
    setShowConfirmModal(true);
  };

  // EXCLUIR SELECIONADOS — recebe explicitamente uma lista de ids (snapshot)
  const handleDeleteSelectedDepartments = async (idsToDelete: number[]) => {
    if (!idsToDelete || idsToDelete.length === 0) return;

    try {
      // dispara todas as requisições em paralelo
      const results = await Promise.all(
        idsToDelete.map((id) =>
          DepartmentService.deleteById(id).catch((err) => {
            console.error(`Erro na requisição de remoção id=${id}`, err);
            // normaliza para um objeto de erro para manter índices
            return { code: 'ERROR', message: String(err) };
          })
        )
      );

      // coleta os ids que realmente retornaram sucesso
      const successfulDeletes = idsToDelete.filter((_, idx) => {
        const res = results[idx];
        return res;
      });

      console.log(
        'Tentativa excluir ids:',
        idsToDelete,
        'sucesso:',
        successfulDeletes
      );

      // atualiza a lista de departamentos uma única vez
      if (successfulDeletes.length > 0) {
        setDepartments((prev) =>
          prev.filter((d) => !successfulDeletes.includes(d.id))
        );
      }

      // caso queira notificar sobre falhas:
      const failedDeletes = idsToDelete.filter(
        (id) => !successfulDeletes.includes(id)
      );
      if (failedDeletes.length > 0) {
        console.error('Falha ao excluir os ids:', failedDeletes);
      }
    } catch (err) {
      console.error('Erro inesperado ao excluir selecionados:', err);
    } finally {
      // limpa seleção e fecha dropdown (sempre)
      setSelectedRows([]);
      setIsDropdownOpen(false);
    }
  };

  const handleConfirmDeleteSelected = () => {
    if (selectedRows.length === 0) return;

    // tira um snapshot dos ids no momento da confirmação
    const idsSnapshot = [...selectedRows];

    setConfirmMessage(
      'Deseja realmente excluir todos os departamentos selecionados?'
    );

    // aqui setamos a action que chama nossa função passando o snapshot
    setConfirmAction(() => () => handleDeleteSelectedDepartments(idsSnapshot));

    setShowConfirmModal(true);
  };

  // Editar departamento
  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
    setFormValues({ 'Nome do Departamento': department.name });
    setShowDepartamentoModal(true);
  };

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
        <button onClick={() => handleConfirmDelete(id)} className='text-red'>
          <MdDelete className='size-6' />
        </button>
      </>
    );
  };

  const formattedData = departments
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .map((item) => ({ id: item.id, nomeDepartamento: item.name }));

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
        {/* Ações */}
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
                  onClick={handleConfirmDeleteSelected}
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

        <hr className='border-t border-neutral-dark' />

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
              value: formValues[input.label] || '',
              onChange: (value: string) =>
                setFormValues((prev) => ({ ...prev, [input.label]: value })),
            }))}
            action={handleConfirmSave}
            statusModal={showDepartamentoModal}
            onClose={() => {
              setShowDepartamentoModal(false);
              setEditingDepartment(null);
              setFormValues({});
            }}
          />
        )}

        {/* Modal genérica de confirmação */}
        {showConfirmModal && (
          <Modal
            title='Confirmação'
            inputs={[]}
            description={confirmMessage}
            action={() => {
              confirmAction();
              setShowConfirmModal(false);
            }}
            statusModal={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
          />
        )}

        {/* Tabela */}
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
