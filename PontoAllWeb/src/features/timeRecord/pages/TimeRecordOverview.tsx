import { useCallback, useEffect, useState } from 'react';
import TimeRecordService from '../services/timeRecordService';
import Table from '@/components/Table';
import { TableColumn } from '@/components/Table/types';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import SearchBar from '@/components/SearchBar';
import { AlertModal, ConfirmModal } from '@/components/Modal';
import { TimeRecord } from '@/types';
import { PiPencil, PiTrash } from 'react-icons/pi';
import TimeRecordFormModal from '../components/TimeRecordModalForm';
import { CrudActionsButton } from '@/components/CrudActions';

export default function TimeRecordOverview() {
  const columns: TableColumn<TimeRecord>[] = [
    {
      label: 'Data',
      attribute: 'date',
      render: (value: unknown) => {
        if (typeof value !== 'string' && typeof value !== 'number')
          return 'N/A';
        return new Date(value).toLocaleDateString('pt-BR');
      },
    },
    {
      label: 'Horário',
      attribute: 'time',
      render: (value: unknown) => {
        if (typeof value !== 'string') return 'Desconhecido';
        return value.substring(0, 5);
      },
    },
    {
      label: 'Justificativa',
      attribute: 'justification',
      render: (value: unknown) => {
        if (typeof value !== 'string' || !value) return 'Sem justificativa';
        return value;
      },
    },
  ];
  const [data, setData] = useState<TimeRecord[]>([]);

  const [originalData, setOriginalData] = useState<TimeRecord[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'info' | 'success' | 'error'>(
    'info'
  );
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<TimeRecord | undefined>();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const fetchData = useCallback(async () => {
    const res = await TimeRecordService.getAll();
    if (res.success && res.data) {
      setData([...res.data]);
      setOriginalData([...res.data]);
    } else {
      showAlert(`Erro ao buscar dados: ${res.message}`, 'error');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setData(originalData);
      return;
    }
    const searchFiltered = originalData.filter(
      (timeRecord) =>
        timeRecord.justification
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        timeRecord.date.includes(searchTerm) ||
        timeRecord.time.includes(searchTerm)
    );
    setData(searchFiltered);
  };

  const openEditModal = (id: number) => {
    const item = data.find((row) => row.id === id);
    if (item) {
      setEditingItem(item);
      setCurrentId(id);
      setIsFormModalOpen(true);
    } else {
      showAlert('Registro não encontrado', 'error');
    }
  };

  const openDeleteModal = (id: number) => {
    setCurrentId(id);
    setIsDeleteModalOpen(true);
  };

  const showAlert = (message: string, type: 'info' | 'success' | 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertModalOpen(true);
  };

  const handleSave = async (model: TimeRecord) => {
    if (currentId !== null) {
      await editTimeRecord(currentId, model);
    }
  };

  const editTimeRecord = async (id: number, model: TimeRecord) => {
    const res = await TimeRecordService.update(id, model);
    if (res.success) {
      await fetchData();
      showAlert('Registro de ponto atualizado com sucesso!', 'success');
    } else {
      showAlert(
        res.message || 'Erro inesperado ao atualizar o registro.',
        'error'
      );
    }
  };

  const deleteTimeRecord = async () => {
    if (!currentId) return;

    const res = await TimeRecordService.deleteById(currentId);
    if (res.success) {
      setIsDeleteModalOpen(false);
      setCurrentId(null);
      await fetchData();
      showAlert('Registro de ponto excluído com sucesso!', 'success');
    } else {
      showAlert(
        res.message || 'Erro inesperado ao excluir o registro.',
        'error'
      );
    }
  };

  const handleDeleteMany = async () => {
    if (selectedRows.length === 0) {
      showAlert('Nenhuma linha selecionada para exclusão.', 'info');
      return;
    }

    const deletePromises = selectedRows.map((id) =>
      TimeRecordService.deleteById(id)
    );
    const results = await Promise.all(deletePromises);

    const failedDeletes = results.filter((res) => !res.success);

    if (failedDeletes.length === 0) {
      setSelectedRows([]);
      await fetchData();
      showAlert(
        `${selectedRows.length} registro(s) excluído(s) com sucesso!`,
        'success'
      );
    } else {
      showAlert(
        `Erro ao excluir ${failedDeletes.length} registro(s).`,
        'error'
      );
    }
  };

  const Actions = ({ id }: { id: number }) => (
    <>
      <button
        onClick={() => openEditModal(id)}
        className='text-blue hover:scale-105'
      >
        <PiPencil className='size-6' />
      </button>
      <button
        onClick={() => openDeleteModal(id)}
        className='text-red hover:scale-105'
      >
        <PiTrash className='size-6' />
      </button>
    </>
  );

  return (
    <div className='w-full'>
      <BreadcrumbPageTitle title='Registros de Ponto' />
      <div className='px-6'>
        <div className='flex justify-end items-center py-2 gap-4'>
          <CrudActionsButton onDelete={handleDeleteMany} />
          <TimeRecordFormModal
            isOpen={isFormModalOpen}
            onClose={() => {
              setIsFormModalOpen(false);
              setEditingItem(undefined);
            }}
            onSubmit={handleSave}
            objectData={editingItem}
          />
          <ConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={deleteTimeRecord}
            title='Deseja realmente excluir este registro?'
            message='Ao excluir este registro, ele será removido permanentemente do sistema.'
          />
          <AlertModal
            isOpen={isAlertModalOpen}
            onClose={() => setIsAlertModalOpen(false)}
            message={alertMessage}
            type={alertType}
          />
        </div>

        <hr className='border-t border-neutral-dark' />

        <div className='flex flex-wrap py-4 gap-2'>
          <div className='flex-grow flex justify-end ml-auto min-w-[250px]'>
            <SearchBar onChange={handleSearch} />
          </div>
        </div>

        <Table
          columns={columns}
          data={data}
          actions={(id) => <Actions id={id} />}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
      </div>
    </div>
  );
}
