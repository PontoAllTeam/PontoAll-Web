import { useCallback, useEffect, useState } from 'react';
import GeofenceService from '../services/geofenceService';
import Table from '@/components/Table';
import { TableColumn } from '@/components/Table/types';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import { AlertModal, ConfirmModal } from '@/components/Modal';
import { Geofence } from '@/types';
import { PiPencil, PiPlus, PiTrash } from 'react-icons/pi';
import GeofenceFormModal from '../components/GeofenceFormModal';
import { CrudActionsButton } from '@/components/CrudActions';

export default function GeofenceOverview() {
  const columns: TableColumn<Geofence>[] = [
    { label: 'Nome', attribute: 'name' },
    { label: 'Latitude', attribute: 'centerLatitude' },
    { label: 'Longitude', attribute: 'centerLongitude' },
    { label: 'Raio (m)', attribute: 'radiusInMeters' },
  ];

  const [data, setData] = useState<Geofence[]>([]);
  const [search, setSearch] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'info' | 'success' | 'error'>(
    'info'
  );
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<Geofence | undefined>();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const fetchData = useCallback(async () => {
    const res = await GeofenceService.getAll();
    if (res.success && res.data) {
      setData([...res.data]);
    } else {
      showAlert(`Erro ao buscar dados: ${res.message}`, 'error');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = data.filter((geofence) =>
    geofence.name.toLowerCase().includes(search.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingItem(undefined);
    setCurrentId(null);
    setIsFormModalOpen(true);
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

  const handleSave = async (model: Geofence) => {
    if (currentId !== null) {
      await editGeofence(currentId, model);
    } else {
      await registerGeofence(model);
    }
  };

  const registerGeofence = async (model: Geofence) => {
    const res = await GeofenceService.create(model);
    if (res.success) {
      await fetchData();
      showAlert(
        `Cerca Virtual "${res.data?.name}" criada com sucesso!`,
        'success'
      );
    } else {
      showAlert(
        res.message || 'Erro inesperado ao criar a cerca virtual.',
        'error'
      );
    }
  };

  const editGeofence = async (id: number, model: Geofence) => {
    const res = await GeofenceService.update(id, model);
    if (res.success) {
      await fetchData();
      showAlert(
        `Cerca Virtual "${res.data?.name}" atualizada com sucesso!`,
        'success'
      );
    } else {
      showAlert(
        res.message || 'Erro inesperado ao atualizar a cerca virtual.',
        'error'
      );
    }
  };

  const deleteGeofence = async () => {
    if (!currentId) return;

    const res = await GeofenceService.deleteById(currentId);
    if (res.success) {
      setIsDeleteModalOpen(false);
      const itemName = data.find((item) => item.id === currentId)?.name || '';
      setCurrentId(null);

      await fetchData();
      showAlert(`Cerca Virtual "${itemName}" excluída com sucesso!`, 'success');
    } else {
      showAlert(
        res.message || 'Erro inesperado ao excluir a cerca virtual.',
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
      GeofenceService.deleteById(id)
    );
    const results = await Promise.all(deletePromises);

    const failedDeletes = results.filter((res) => !res.success);

    if (failedDeletes.length === 0) {
      setSelectedRows([]);
      await fetchData();
      showAlert(
        `${selectedRows.length} cerca(s) virtual(is) excluída(s) com sucesso!`,
        'success'
      );
    } else {
      showAlert(
        `Erro ao excluir ${failedDeletes.length} cerca(s) virtual(is).`,
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
      <BreadcrumbPageTitle title='Cadastro de Cerca Virtual' />
      <div className='px-6'>
        <div className='flex justify-end items-center py-2 gap-4'>
          <CrudActionsButton onDelete={handleDeleteMany} />
          <Button
            label='Adicionar'
            icon={<PiPlus />}
            iconPosition='left'
            color='secondary'
            size='md'
            onClick={openCreateModal}
          />
          <GeofenceFormModal
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
            onConfirm={deleteGeofence}
            title='Deseja realmente excluir esta cerca virtual?'
            message='Ao excluir esta cerca virtual, ela será removida permanentemente do sistema.'
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
            <SearchBar onChange={setSearch} />
          </div>
        </div>

        <Table<Geofence>
          columns={columns}
          data={filteredData}
          actions={(id) => <Actions id={id} />}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
      </div>
    </div>
  );
}
