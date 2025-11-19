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

export default function GeofenceOverview() {
  const columns: TableColumn<Geofence>[] = [
    { label: 'Nome', attribute: 'name' },
    { label: 'Latitude', attribute: 'centerLatitude' },
    { label: 'Longitude', attribute: 'centerLongitude' },
    { label: 'Raio (m)', attribute: 'radiusInMeter' },
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
      showAlert(`Geofence "${res.data?.name}" criada com sucesso!`, 'success');
    } else {
      showAlert(res.message || 'Erro inesperado ao criar a geofence.', 'error');
    }
  };

  const editGeofence = async (id: number, model: Geofence) => {
    const res = await GeofenceService.update(id, model);
    if (res.success) {
      await fetchData();
      showAlert(
        `Geofence "${res.data?.name}" atualizada com sucesso!`,
        'success'
      );
    } else {
      showAlert(
        res.message || 'Erro inesperado ao atualizar a geofence.',
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
      showAlert(`Geofence "${itemName}" excluída com sucesso!`, 'success');
    } else {
      showAlert(
        res.message || 'Erro inesperado ao excluir a geofence.',
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
      <BreadcrumbPageTitle title='Cadastro de Geofence' />
      <div className='px-6'>
        <div className='flex justify-end items-center py-2 gap-4'>
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
            title='Deseja realmente excluir esta geofence?'
            message='Ao excluir esta geofence, ela será removida permanentemente do sistema.'
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
        />
      </div>
    </div>
  );
}
