import { useState, useEffect, useMemo, useCallback } from 'react';
import { MdEdit, MdDelete, MdAdd, MdMoreVert } from 'react-icons/md';
import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import UserRegisterModal from '@/components/UserRegisterModal';
import Button from '@/components/Button';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import Modal from '@/components/GenericModal';
import UserService from '../services/userService';
import { User } from '@/types/models/user';
import DepartmentService from '@/features/department/services/departmentService';
import SectorService from '@/features/sector/services/sectorService';
import { Department } from '@/types/models/department';
import { Sector } from '@/types/models/sector';

export default function UserOverview() {
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

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await UserService.getAll();
      if (response.success && Array.isArray(response.data)) {
        setUsers(response.data as User[]);
      } else {
        setError(response.message || 'Falha ao carregar usuários');
        setUsers([]);
      }
    } catch (err: any) {
      setError(err.message || 'Falha ao carregar colaboradores.');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchFilterLists = useCallback(async () => {
    try {
      const [deptRes, sectorRes] = await Promise.all([
        DepartmentService.getAll(),
        SectorService.getAll(),
      ]);

      if (deptRes.success && Array.isArray(deptRes.data)) {
        setDepartmentList(deptRes.data);
      } else {
        console.error('Erro ao buscar departamentos:', deptRes.message);
        setDepartmentList([]);
      }

      if (sectorRes.success && Array.isArray(sectorRes.data)) {
        setSectorList(sectorRes.data);
      } else {
        console.error('Erro ao buscar setores:', sectorRes.message);
        setSectorList([]);
      }
    } catch (err) {
      console.error('Erro GERAL ao buscar listas de filtro:', err);
      setDepartmentList([]);
      setSectorList([]);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchFilterLists();
  }, [fetchUsers, fetchFilterLists]);

  useEffect(() => {
    if (filterDept) {
      setFilteredSectorList(
        sectorList.filter((s) => s.departmentId === Number(filterDept))
      );
    } else {
      setFilteredSectorList(sectorList);
    }
  }, [filterDept, sectorList]);

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
    fetchUsers();
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
      const deletePromises = idsToDelete.map((id) =>
        UserService.deleteById(id)
      );
      const responses = await Promise.all(deletePromises);
      const allSucceeded = responses.every((res) => res.success);

      if (allSucceeded) {
        alert('Colaborador(s) excluído(s) com sucesso!');
        handleCloseConfirmModal();
        fetchUsers();
        setSelectedRows([]);
      } else {
        const failedResponse = responses.find((res) => !res.success);
        throw new Error(
          failedResponse?.message || 'Falha ao excluir um ou mais itens.'
        );
      }
    } catch (err: any) {
      alert(err.message || 'Falha ao deletar colaborador(s).');
      handleCloseConfirmModal();
    }
  };

  const filteredData = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesSector =
        !filterSector || user.sectorId === Number(filterSector);

      return matchesSearch && matchesSector;
    });
  }, [users, search, filterSector]);

  const columns = [
    'Nome Colaborador',
    'Departamento',
    'Setor',
    'Tipo Colaborador',
    'Status',
    'Ações',
  ];

  const formattedData = useMemo(() => {
    return filteredData.map((user) => ({
      id: user.id,
      nomeColaborador: user.name,
      departamento: 'N/A',
      setor: user.sectorId || 'N/A',
      tipoColaborador: user.userType || 'N/A',
      status: user.userStatus || 'N/A',
      acoes: (
        <div className='flex gap-4 justify-end'>
          <button
            className='text-blue hover:text-blue-dark'
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEditModal(user);
            }}
            title='Editar'
          >
            <MdEdit size={24} />
          </button>
          <button
            className='text-red hover:text-red-dark'
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDeleteModal(user.id);
            }}
            title='Excluir'
          >
            <MdDelete size={24} />
          </button>
        </div>
      ),
    }));
  }, [filteredData]);

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
      <BreadcrumbPageTitle title='Colaboradores' />

      <div className='px-6'>
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
            label='Cadastrar Colaborador'
            color='secondary'
            size='sm'
            icon={<MdAdd size={16} />}
            onClick={handleOpenCreateModal}
          />
        </div>

        <hr className='border-t border-gray-300' />

        <div className='flex flex-wrap py-4 gap-2'>
          <select
            className='rounded-sm p-2 text-sm bg-neutral-light focus:ring-1 focus:ring-neutral-dark'
            value={filterDept}
            onChange={(e) => {
              setFilterDept(e.target.value);
              setFilterSector('');
            }}
          >
            <option value=''>Filtrar por departamento</option>
            {departmentList.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </select>

          <select
            className='rounded-sm p-2 text-sm bg-neutral-light focus:ring-1 focus:ring-neutral-dark'
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            disabled={!filterDept && filteredSectorList.length === 0}
          >
            <option value=''>Filtrar por setor</option>
            {filteredSectorList.map((sec) => (
              <option key={sec.id} value={sec.id}>
                {sec.name}
              </option>
            ))}
          </select>

          <div className='flex-grow flex justify-end ml-auto min-w-[250px]'>
            <SearchBar onChange={setSearch} />
          </div>
        </div>

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

        <Modal
          statusModal={showConfirmModal}
          title={
            itemToDelete ? 'Confirmar Exclusão' : 'Confirmar Exclusão em Lote'
          }
          description={
            itemToDelete
              ? 'Deseja realmente excluir este colaborador?'
              : `Deseja realmente excluir os ${selectedRows.length} colaboradores selecionados?`
          }
          onClose={handleCloseConfirmModal}
          action={handleConfirmDelete}
        />

        {isLoading && (
          <p className='text-center p-4'>Carregando colaboradores...</p>
        )}
        {error && <p className='text-center p-4 text-red'>{error}</p>}
        {!isLoading && !error && (
          <Table
            columns={columns}
            data={formattedData}
            selectedRows={selectedRows}
            onToggleAll={handleToggleAll}
            onToggleRow={handleToggleRow}
          />
        )}
      </div>
    </div>
  );
}
