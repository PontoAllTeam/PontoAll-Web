import { SelectInput, TextInput } from '@/components/FormControls';
import { ModalProps, FormModal } from '@/components/Modal';
import { DepartmentService } from '@/features/department';
import useFormData from '@/hooks/useFormData';
import { Sector, Department } from '@/types';
import { useEffect, useState } from 'react';

interface SectorFormModalProps extends Omit<ModalProps, 'children'> {
  onSubmit: (data: Sector) => Promise<void>;
  objectData?: Sector;
}

export default function SectorFormModal({
  onClose,
  onSubmit,
  isOpen,
  objectData,
}: SectorFormModalProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const { data, setData, updateField, reset } = useFormData<Sector>({
    id: 0,
    name: '',
    departmentId: 0,
  });

  const fetchDepartments = async () => {
    const res = await DepartmentService.getAll();
    if (res.success && res.data) {
      setDepartments(res.data);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchDepartments();
  }, [isOpen]);

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

  const title = objectData?.id ? 'Editar Setor' : 'Cadastrar Setor';

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title={title}
    >
      <div className='flex flex-col gap-4'>
        <TextInput<Sector>
          name='name'
          label='Nome'
          onChange={updateField}
          value={data.name}
          required
        />
        <SelectInput<Sector>
          name='departmentId'
          label='Departamento'
          onChange={updateField}
          value={data.departmentId}
          options={departments.map((department) => ({
            label: department.name,
            value: department.id,
          }))}
          required
        />
      </div>
    </FormModal>
  );
}
