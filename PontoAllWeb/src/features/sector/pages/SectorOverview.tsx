import { useEffect, useState } from 'react';
import { MdEdit, MdDelete, MdAdd, MdMoreVert } from 'react-icons/md';

import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';

import { Sector, Department } from '@/types';
import SectorService from '../services/sectorService';
import { DepartmentService } from '@/features/department';

export default function SectorOverview() {
  const [search, setSearch] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [showSetorModal, setShowSetorModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmMessage, setConfirmMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [editingSector, setEditingSector] = useState<Sector | null>(null);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  const columns = ['Nome Setor', 'Departamento'];

  const setorInputs: InputField[] = [
    { label: 'Nome do Setor', type: 'text' },
    {
      label: 'Departamento',
      type: 'select',
      options: departments.map((d) => d.name),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const [sectorRes, deptRes] = await Promise.all([
        SectorService.getAll(),
        DepartmentService.getAll(),
      ]);

      if (sectorRes.success && Array.isArray(sectorRes.data)) {
        setSectors(sectorRes.data);
      }

      if (deptRes.success && Array.isArray(deptRes.data)) {
        setDepartments(deptRes.data);
      }
    };

    fetchData();
  }, []);

  const filteredData = sectors
    .filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (selectedDepartment === '' ||
          String(item.departmentId) === selectedDepartment)
    )
    .map((item) => {
      const departamento = departments.find((d) => d.id === item.departmentId);
      return {
        id: item.id,
        nomeSetor: item.name,
        departamento: departamento?.name || '',
      };
    });

  const handleToggleAll = (checked: boolean) => {
    if (checked) {
      const allIds = filteredData.map((item) => item.id);
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

  const handleSaveSetor = async () => {
    const nome = formValues['Nome do Setor'];
    const departamentoName = formValues['Departamento'];
    const departamento = departments.find((d) => d.name === departamentoName);
    const departamentoId = departamento?.id || 0;

    if (editingSector) {
      const updated: Sector = {
        ...editingSector,
        name: nome,
        departmentId: departamentoId,
      };
      const response = await SectorService.update(updated.id, updated);
      if (response.success && response.data) {
        setSectors((prev) =>
          prev.map((s) => (s.id === updated.id ? (response.data as Sector) : s))
        );
        setEditingSector(null);
      } else {
        console.error('Erro ao atualizar setor:', response.message);
      }
    } else {
      const newSector: Omit<Sector, 'id'> = {
        name: nome,
        departmentId: departamentoId,
      };
      const response = await SectorService.create(newSector as Sector);
      if (response.success && response.data) {
        setSectors((prev) => [...prev, response.data as Sector]);
      } else {
        console.error('Erro ao cadastrar setor:', response.message);
      }
    }

    setShowSetorModal(false);
    setFormValues({});
  };

  const handleConfirmSave = () => {
    setConfirmMessage(
      editingSector
        ? 'Deseja realmente salvar as alterações deste setor?'
        : 'Deseja realmente cadastrar este novo setor?'
    );
    setConfirmAction(() => handleSaveSetor);
    setShowConfirmModal(true);
  };

  const handleDeleteSetor = async (id: number) => {
    const response = await SectorService.deleteById(id);
    if (response.success) {
      setSectors((prev) => prev.filter((s) => s.id !== id));
    } else {
      console.error('Erro ao excluir setor:', response.message);
    }
  };

  const handleConfirmDelete = (id: number) => {
    setConfirmMessage('Deseja realmente excluir este setor?');
    setConfirmAction(() => () => handleDeleteSetor(id));
    setShowConfirmModal(true);
  };

  const handleDeleteSelectedSetores = async (idsToDelete: number[]) => {
    const results = await Promise.all(
      idsToDelete.map((id) =>
        SectorService.deleteById(id).catch((err) => {
          console.error(`Erro ao excluir setor id=${id}`, err);
          return { success: false, message: String(err) };
        })
      )
    );

    const successfulDeletes = idsToDelete.filter((_, idx) => {
      const res = results[idx];
      return res && res.success;
    });

    if (successfulDeletes.length > 0) {
      setSectors((prev) =>
        prev.filter((s) => !successfulDeletes.includes(s.id))
      );
    }

    setSelectedRows([]);
    setIsDropdownOpen(false);
  };

  const handleConfirmDeleteSelected = () => {
    if (selectedRows.length === 0) return;
    const idsSnapshot = [...selectedRows];
    setConfirmMessage(
      'Deseja realmente excluir todos os setores selecionados?'
    );
    setConfirmAction(() => () => handleDeleteSelectedSetores(idsSnapshot));
    setShowConfirmModal(true);
  };

  const handleEditSetor = (sector: Sector) => {
    const departamento = departments.find((d) => d.id === sector.departmentId);
    setEditingSector(sector);
    setFormValues({
      'Nome do Setor': sector.name,
      Departamento: departamento?.name || '',
    });
    setShowSetorModal(true);
  };

  const Actions = ({ id }: { id: number }) => {
    const setor = sectors.find((s) => s.id === id);
    return (
      <>
        <button
          onClick={() => setor && handleEditSetor(setor)}
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
                  onClick={handleConfirmDeleteSelected}
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
            onClick={() => {
              setEditingSector(null);
              setShowSetorModal(true);
            }}
          />
        </div>

        <hr className='border-t border-neutral-dark' />

        <div className='flex py-4 gap-2'>
          <select
            className='rounded-sm p-2 text-sm bg-neutral-light focus:ring-1 focus:ring-neutral-dark'
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value=''>Filtrar por departamento</option>
            {departments.map((dep) => (
              <option key={dep.id} value={String(dep.id)}>
                {dep.name}
              </option>
            ))}
          </select>

          <div className='flex justify-end ml-auto w-1/3'>
            <SearchBar onChange={setSearch} />
          </div>
        </div>

        {showSetorModal && (
          <Modal
            title={editingSector ? 'Editar Setor' : 'Cadastrar Setor'}
            inputs={setorInputs.map((input) => ({
              ...input,
              value: formValues[input.label] || '',
              onChange: (value: string) =>
                setFormValues((prev) => ({ ...prev, [input.label]: value })),
            }))}
            action={handleConfirmSave}
            statusModal={showSetorModal}
            onClose={() => {
              setShowSetorModal(false);
              setEditingSector(null);
              setFormValues({});
            }}
          />
        )}

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

        <Table
          columns={columns}
          data={filteredData}
          selectedRows={selectedRows}
          actions={(id) => <Actions id={id} />}
          onToggleAll={handleToggleAll}
          onToggleRow={handleToggleRow}
        />
      </div>
    </div>
  );
}
