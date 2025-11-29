import { TextInput } from '@/components/FormControls';
import { ModalProps, FormModal } from '@/components/Modal';
import useFormData from '@/hooks/useFormData';
import { Geofence } from '@/types';
import { useEffect } from 'react';

interface GeofenceFormModalProps extends Omit<ModalProps, 'children'> {
  onSubmit: (data: Geofence) => Promise<void>;
  objectData?: Geofence;
}

export default function GeofenceFormModal({
  onClose,
  onSubmit,
  isOpen,
  objectData,
}: GeofenceFormModalProps) {
  const { data, setData, updateField, reset } = useFormData<Geofence>({
    id: 0,
    name: '',
    centerLatitude: 0,
    centerLongitude: 0,
    radiusInMeters: 0,
    companyId: 1,
  });

  useEffect(() => {
    if (!isOpen) return;
    if (objectData) {
      setData(objectData);
    } else {
      reset();
    }
  }, [isOpen, objectData, setData, reset]);

  const handleSubmit = async () => {
    await onSubmit(data);
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  const title = objectData?.id
    ? 'Editar Cerca Virtual'
    : 'Cadastrar Cerca Virtual';

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title={title}
    >
      <div className='flex flex-col gap-4'>
        <TextInput<Geofence>
          name='name'
          label='Nome'
          onChange={updateField}
          value={data.name}
          required
        />
        <TextInput<Geofence>
          type='number'
          name='centerLatitude'
          label='Latitude'
          onChange={updateField}
          value={data.centerLatitude}
          step={0.000001}
          required
        />
        <TextInput<Geofence>
          type='number'
          name='centerLongitude'
          label='Longitude'
          onChange={updateField}
          value={data.centerLongitude}
          step={0.000001}
          required
        />
        <TextInput<Geofence>
          type='number'
          name='radiusInMeters'
          label='Raio (metros)'
          onChange={updateField}
          value={data.radiusInMeters}
          min={1}
          required
        />
      </div>
    </FormModal>
  );
}
