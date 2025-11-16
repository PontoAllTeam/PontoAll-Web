import { TextInput } from '@/components/FormControls';
import { ModalProps, FormModal } from '@/components/Modal';
import useFormData from '@/hooks/useFormData';
import { Department } from '@/types';
import { useEffect } from 'react';
import { useAuth } from '@/features/auth';

interface DepartmentFormModalProps extends Omit<ModalProps, 'children'> {
  onSubmit: (data: Department) => Promise<void>;
  objectData?: Department;
}

export default function DepartmentFormModal({
  onClose,
  onSubmit,
  isOpen,
  objectData,
}: DepartmentFormModalProps) {
  const { user } = useAuth();
  const { data, setData, updateField, reset } = useFormData<Department>({
    id: 0,
    name: '',
    companyId: user?.companyId || 0,
  });

  useEffect(() => {
    if (!isOpen) return;
    if (objectData) {
      setData(objectData);
    } else {
      reset();
      if (user?.companyId) {
        updateField('companyId', user.companyId);
      }
    }
  }, [isOpen, objectData, setData, reset, user?.companyId, updateField]);

  const handleSubmit = async () => {
    await onSubmit(data);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const title = objectData?.id
    ? 'Editar Departamento'
    : 'Cadastrar Departamento';

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title={title}
    >
      <div className='flex flex-col gap-4'>
        <TextInput<Department>
          name='name'
          label='Nome'
          onChange={updateField}
          value={data.name}
          required
        />
      </div>
    </FormModal>
  );
}
