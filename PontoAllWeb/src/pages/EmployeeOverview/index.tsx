import { useState, useEffect, useMemo, useCallback } from 'react';
import { MdEdit, MdDelete, MdAdd, MdMoreVert } from 'react-icons/md';
import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import UserRegisterModal from '@/components/UserRegisterModal';
import Button from '@/components/Button';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import Modal from '@/components/GenericModal'; // O seu modal
import UserService from '@/services/userService';
import { User } from '@/types/models/user'; // Sua interface correta
import { ApiResponse, ApiResponseEnum } from '@/types/contracts';
// --- Serviços e Tipos para Filtros ---
import DepartmentService from '@/services/departmentService';
import SectorService from '@/services/sectorService';
import { Department } from '@/types/models/department';
import { Sector } from '@/types/models/sector';

export default function EmployeeOverview() {
  // --- Estados ---
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState<string>('');
  const [filterSector, setFilterSector] = useState<string>('');
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [sectorList, setSectorList] = useState<Sector[]>([]);
  const [filteredSectorList, setFilteredSectorList] = useState<Sector[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Instâncias dos Serviços
  const userService = useMemo(() => new UserService(), []);
  const departmentService = useMemo(() => new DepartmentService(), []);
  const sectorService = useMemo(() => new SectorService(), []);

  // --- Funções de Busca ---

  /**
   * Busca os usuários da API
   */
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await userService.getAll();
      // Verifica se a resposta foi sucesso E se data é um array
      if (response.code === ApiResponseEnum.SUCCESS && Array.isArray(response.data)) {
        setUsers(response.data as User[]);
      } else {
        setError(response.message || 'Falha ao carregar usuários');
        setUsers([]); // Garante array vazio em caso de erro
      }
    } catch (err: any) {
      setError(err.message || 'Falha ao carregar funcionários.');
      setUsers([]); // Garante array vazio em caso de erro
    } finally {
      setIsLoading(false);
    }
  }, [userService]);

  /**
   * Busca as listas de Departamento e Setor para os filtros <select>
   */
  const fetchFilterLists = useCallback(async () => {
    try {
      const [deptRes, sectorRes] = await Promise.all([
        departmentService.getAll(),
        sectorService.getAll()
      ]);

      // Verifica CÓDIGO e se DATA é um ARRAY antes de setar
      if (deptRes.code === ApiResponseEnum.SUCCESS && Array.isArray(deptRes.data)) {
        setDepartmentList(deptRes.data);
      } else {
         console.error("Erro ao buscar departamentos:", deptRes.message);
         setDepartmentList([]); // Garante array vazio
      }

      if (sectorRes.code === ApiResponseEnum.SUCCESS && Array.isArray(sectorRes.data)) {
        setSectorList(sectorRes.data);
      } else {
         console.error("Erro ao buscar setores:", sectorRes.message);
         setSectorList([]); // Garante array vazio
      }

    } catch (err) {
      console.error("Erro GERAL ao buscar listas de filtro:", err);
       setDepartmentList([]);
       setSectorList([]);
    }
  }, [departmentService, sectorService]);

  // Efeito inicial para buscar dados
  useEffect(() => {
    fetchUsers();
    fetchFilterLists();
  }, [fetchUsers, fetchFilterLists]);

  // Efeito para atualizar a lista de setores filtrados quando o departamento muda
  useEffect(() => {
    if (filterDept) {
      // Filtra a lista completa de setores
      setFilteredSectorList(sectorList.filter(s => s.departmentId === Number(filterDept)));
    } else {
      // Se nenhum departamento for selecionado, mostra todos os setores
      setFilteredSectorList(sectorList);
    }
  }, [filterDept, sectorList]);

  // --- Handlers de Modal e CRUD (sem mudanças lógicas) ---

  const handleOpenCreateModal = () => {
    setUserToEdit(null);
    setOpenModal(true);
  };

  const handleOpenEditModal = (user: User) => {
    setUserToEdit(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setUserToEdit(null);
  };

  const handleSaveSuccess = () => {
    handleCloseModal();
    fetchUsers(); // Recarrega a lista de usuários
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setItemToDelete(null);
  };

  const handleOpenDeleteModal = (id: number) => {
    setItemToDelete(id);
    setShowConfirmModal(true);
  };

  const handleOpenBatchDeleteModal = () => {
    if (selectedRows.length === 0) return;
    setItemToDelete(null);
    setIsDropdownOpen(false);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    let idsToDelete: number[] = [];
    if (itemToDelete) idsToDelete = [itemToDelete];
    else if (selectedRows.length > 0) idsToDelete = selectedRows;

    if (idsToDelete.length === 0) return;

    try {
      const deletePromises = idsToDelete.map(id => userService.remove(id));
      const responses = await Promise.all(deletePromises);
      const allSucceeded = responses.every(res => res.code === ApiResponseEnum.SUCCESS);

      if (allSucceeded) {
         alert('Funcionário(s) excluído(s) com sucesso!');
         handleCloseConfirmModal();
         fetchUsers(); // Recarrega a lista
         setSelectedRows([]); // Limpa seleção
      } else {
        const failedResponse = responses.find(res => res.code !== ApiResponseEnum.SUCCESS);
        throw new Error(failedResponse?.message || 'Falha ao excluir um ou mais itens.');
      }
    } catch (err: any) {
      alert(err.message || 'Falha ao deletar funcionário(s).');
      handleCloseConfirmModal(); // Fecha o modal mesmo com erro
    }
  };

  // --- Formatação e Filtragem para a Tabela ---

  // Filtra os usuários com base na pesquisa e nos selects
  const filteredData = useMemo(() => {
    return users.filter((user) => {
      // Filtro de Pesquisa (Nome ou Email)
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      // Filtros de Select (usando os IDs que vêm no User)
      // Sua interface User agora tem 'departmentid'
      const matchesDept = !filterDept || user.departmentid === Number(filterDept);
      const matchesSector = !filterSector || user.sectorid === Number(filterSector);

      return matchesSearch && matchesDept && matchesSector;
    });
  }, [users, search, filterDept, filterSector]);

  // Define as colunas que a tabela vai mostrar
  const columns = [
    'Nome Funcionário',
    'Departamento',
    'Setor',
    'Tipo Funcionário',
    'Status',
    'Ações', // Coluna virtual para os botões
  ];

  // Formata os dados para a tabela, lendo os nomes vindos da API
  const formattedData = useMemo(() => {
    return filteredData.map((user) => ({ // 'user' é o objeto User completo da API
      id: user.id, // Necessário para key e seleção
      nomeFuncionario: user.name,

      // Lê os nomes que o backend já processou
      departamento: user.departmentName || 'N/A',
      setor: user.sectorName || 'N/A',
      tipoFuncionario: user.typeName || 'N/A',
      status: user.statusName || 'N/A',

      // Cria o JSX dos botões para a coluna 'Ações'
      acoes: (
        <div className='flex gap-4 justify-end'>
          <button
            className='text-blue hover:text-blue-dark'
            onClick={(e) => { e.stopPropagation(); handleOpenEditModal(user); }}
            title='Editar'
          >
            <MdEdit size={24} />
          </button>
          <button
            className='text-red hover:text-red-dark'
            onClick={(e) => { e.stopPropagation(); handleOpenDeleteModal(user.id); }}
            title='Excluir'
          >
            <MdDelete size={24} />
          </button>
        </div>
      )
    }));
  }, [filteredData]); // Removido handlers daqui, pois estão no escopo do componente


  // --- Funções da Tabela (Seleção) ---
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

  // --- Renderização ---
  return (
    <div className='w-full'>
      <BreadcrumbPageTitle title='Funcionários' />

      <div className='px-6'>
        {/* Botões de Ação em Lote e Cadastrar */}
        <div className='flex justify-end items-center py-2 gap-4'>
          <div className='relative inline-block'>
            <Button
              label='Ações'
              color='white'
              size='sm'
              icon={<MdMoreVert size={16} />}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={selectedRows.length === 0}
            />
            {isDropdownOpen && (
              <div className='absolute top-full left-0 mt-1 w-48 bg-white rounded shadow-lg z-50'>
                <button
                  className='flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-neutral-dark disabled:opacity-50'
                  onClick={handleOpenBatchDeleteModal}
                  disabled={selectedRows.length === 0}
                >
                  <MdDelete size={16} />
                  <span>Excluir Selecionados</span>
                </button>
              </div>
            )}
          </div>
          <Button
            label='Cadastrar Funcionário'
            color='secondary'
            size='sm'
            icon={<MdAdd size={16} />}
            onClick={handleOpenCreateModal}
          />
        </div>

        <hr className='border-t border-gray-300' />

        {/* Filtros Dinâmicos */}
        <div className='flex flex-wrap py-4 gap-2'>
          <select
            className='rounded-sm p-2 text-sm bg-neutral-light focus:ring-1 focus:ring-neutral-dark'
            value={filterDept}
            onChange={(e) => {
              setFilterDept(e.target.value);
              setFilterSector(''); // Reseta o filtro de setor ao mudar o depto
            }}
          >
            <option value=''>Filtrar por departamento</option>
            {departmentList.map(dep => (
              <option key={dep.id} value={dep.id}>{dep.name}</option>
            ))}
          </select>

          <select
            className='rounded-sm p-2 text-sm bg-neutral-light focus:ring-1 focus:ring-neutral-dark'
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            // Desabilita se não houver departamento selecionado E a lista filtrada estiver vazia (para o caso inicial)
            disabled={!filterDept && filteredSectorList.length === 0}
          >
            <option value=''>Filtrar por setor</option>
            {filteredSectorList.map(sec => (
              <option key={sec.id} value={sec.id}>{sec.name}</option>
            ))}
          </select>

          <div className='flex-grow flex justify-end ml-auto min-w-[250px]'>
            <SearchBar onChange={setSearch} />
          </div>
        </div>

        {/* Modal de Cadastro/Edição (UserRegisterModal) */}
        {openModal && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg shadow-lg p-8 max-h-[90%] overflow-auto w-full max-w-5xl'>
              <UserRegisterModal
                userToEdit={userToEdit}
                onClose={handleCloseModal}
                onSave={handleSaveSuccess}
              />
            </div>
          </div>
        )}

        {/* Modal de Confirmação (Delete) - Usando seu GenericModal */}
        <Modal
          statusModal={showConfirmModal}
          title={itemToDelete ? 'Confirmar Exclusão' : 'Confirmar Exclusão em Lote'}
          description={
            itemToDelete
              ? 'Deseja realmente excluir este funcionário?'
              : `Deseja realmente excluir os ${selectedRows.length} funcionários selecionados?`
          }
          onClose={handleCloseConfirmModal} // Prop para CANCELAR
          action={handleConfirmDelete}       // Prop para CONFIRMAR
        />

        {/* Tabela de Dados */}
        {isLoading && <p className='text-center p-4'>Carregando funcionários...</p>}
        {error && <p className='text-center p-4 text-red'>{error}</p>}
        {!isLoading && !error && (
          <Table
            columns={columns}
            data={formattedData}
            selectedRows={selectedRows}
            onToggleAll={handleToggleAll}
            onToggleRow={handleToggleRow}
            // A prop 'actions' da Tabela não é mais usada, pois os botões estão nos dados
          />
        )}
      </div>
    </div>
  );
}
