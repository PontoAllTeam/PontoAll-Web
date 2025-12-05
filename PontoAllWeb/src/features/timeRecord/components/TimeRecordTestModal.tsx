import { useState, useRef } from 'react';
import { FaCamera, FaMapMarkerAlt } from 'react-icons/fa';
import { ModalProps, FormModal } from '@/components/Modal';
import { TextInput, SelectInput } from '@/components/FormControls';
import useFormData from '@/hooks/useFormData';
import { TimeRecord, User } from '@/types';
import { api } from '@/features/api';

interface TimeRecordTestModalProps extends Omit<ModalProps, 'children'> {
  users: User[];
}

export default function TimeRecordTestModal({
  isOpen,
  onClose,
  users,
}: TimeRecordTestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photo, setPhoto] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto(e.target?.result as string);
      console.log(e.target?.result as string)
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      const payload: TimeRecord = {
        id: 0,
        userId: 3,
        dailyRecordId: 0,
        workScheduleId: 30,
        date: '2025-12-04',
        justification: 'Teste',
        time: new Date().toTimeString().slice(0, 5),
        latitude: -20.27624132561535,
        longitude: -50.54134679420317,
        photo,
      };

      const response = await api.post('/TimeRecord', payload);

      if (response.data.success) {
        console.log('Ponto registrado com sucesso');
      } else {
        console.log('Erro ao registrar ponto', response.data);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setPhoto('');
    onClose();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title='Registrar Ponto - Teste'
      submitLabel={isSubmitting ? 'Registrando...' : 'Registrar Ponto'}
      disabled={isSubmitting}
    >
      <div className='flex flex-col gap-4'>
        <div>
          <label className='block text-sm font-medium text-text-secondary mb-2'>
            Foto para Reconhecimento Facial *
          </label>
          <div className='border-2 border-dashed border-shadow rounded-lg p-4 text-center'>
            {photo ? (
              <div className='relative'>
                <img
                  src={photo}
                  alt='Foto para reconhecimento'
                  className='w-full h-48 object-cover rounded-lg mb-2'
                />
                <button
                  type='button'
                  onClick={() => setPhoto('')}
                  className='absolute top-1 right-1 bg-red text-white rounded-full w-6 h-6 flex items-center justify-center text-xs'
                >
                  ×
                </button>
              </div>
            ) : (
              <div className='h-48 flex flex-col items-center justify-center'>
                <FaCamera className='text-text-primary text-3xl mb-2' />
                <span className='text-sm text-text-primary mb-2'>
                  Selecione uma foto
                </span>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/jpeg,image/jpg,image/png'
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePhotoUpload(file);
                  }}
                  className='hidden'
                />
                <button
                  type='button'
                  onClick={() => fileInputRef.current?.click()}
                  className='bg-blue text-white px-4 py-2 rounded text-sm hover:bg-primary'
                >
                  Selecionar Foto
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </FormModal>
  );
}
