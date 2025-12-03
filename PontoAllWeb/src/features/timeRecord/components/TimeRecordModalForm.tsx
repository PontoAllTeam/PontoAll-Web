import { TextInput } from '@/components/FormControls';
import { ModalProps, FormModal } from '@/components/Modal';
import useFormData from '@/hooks/useFormData';
import { TimeRecord } from '@/types';
import { useEffect } from 'react';

interface TimeRecordFormModalProps extends Omit<ModalProps, 'children'> {
  onSubmit: (data: TimeRecord) => Promise<void>;
  objectData?: TimeRecord;
}

export default function TimeRecordFormModal({
  onClose,
  onSubmit,
  isOpen,
  objectData,
}: TimeRecordFormModalProps) {
  const { data, setData, updateField, reset } = useFormData<TimeRecord>({
    id: 0,
    date: '',
    time: '',
    latitude: 0,
    longitude: 0,
    justification: '',
    userId: 0,
    photo: '',
    dailyRecordId: 0,
    workScheduleId: 0,
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
    reset();
    onClose();
  };

  const title = objectData?.id
    ? 'Editar Registro de Ponto'
    : 'Cadastrar Registro de Ponto';

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title={title}
    >
      <div className='flex flex-col gap-4'>
        <TextInput<TimeRecord>
          name='date'
          label='Data'
          type='date'
          onChange={updateField}
          value={data.date}
          required
        />
        <TextInput<TimeRecord>
          name='time'
          label='Horário'
          type='time'
          onChange={updateField}
          value={data.time}
          required
        />
        <TextInput<TimeRecord>
          name='justification'
          label='Justificativa'
          onChange={updateField}
          value={data.justification || ''}
        />
      </div>
    </FormModal>
  );
}