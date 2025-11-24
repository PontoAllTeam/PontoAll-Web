import { FormModal, ModalProps } from '@/components/Modal';
import { DateTimeInput, SelectInput } from '@/components/FormControls';
import { PiUsersFourFill, PiUsersFill, PiUserFill, PiCalendarFill } from 'react-icons/pi';
import { Department, Sector, User } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { DepartmentService } from '@/features/department';
import { SectorService } from '@/features/sector';
import { UserService } from '@/features/user';

interface RemoveScheduleModalProps extends Omit<ModalProps, 'children'> {
  onSubmit: (data: {
    selectedDepartment: number;
    selectedSector: number;
    selectedUser: number;
    startDate: string;
    endDate: string;
  }) => Promise<void>;
}

export default function RemoveScheduleModal({
  onClose,
  onSubmit,
  isOpen,
}: RemoveScheduleModalProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number>(0);
  const [selectedSector, setSelectedSector] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>(
    new Date().toLocaleDateString().split('/').reverse().join('-')
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toLocaleDateString().split('/').reverse().join('-')
  );

  const filteredSectors = selectedDepartment === 0
    ? sectors
    : sectors.filter((sector) => sector.departmentId === selectedDepartment);

  const filteredUsers = (() => {
    let filtered = users;
    if (selectedDepartment !== 0) {
      const departmentSectorIds = sectors
        .filter((s) => s.departmentId === selectedDepartment)
        .map((s) => s.id);
      filtered = filtered.filter((user) =>
        departmentSectorIds.includes(user.sectorId)
      );
    }
    if (selectedSector !== 0) {
      filtered = filtered.filter((user) => user.sectorId === selectedSector);
    }
    return filtered;
  })();

  const fetchDepartments = useCallback(async () => {
    const res = await DepartmentService.getAll();
    if (res.success && res.data) {
      setDepartments(res.data);
    }
  }, []);

  const fetchSectors = useCallback(async () => {
    const res = await SectorService.getAll();
    if (res.success && res.data) {
      setSectors(res.data);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    const res = await UserService.getAll();
    if (res.success && res.data) {
      setUsers(res.data);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchDepartments();
      fetchSectors();
      fetchUsers();
    }
  }, [isOpen, fetchDepartments, fetchSectors, fetchUsers]);

  useEffect(() => {
    setSelectedSector(0);
    setSelectedUser(0);
  }, [selectedDepartment]);

  useEffect(() => {
    setSelectedUser(0);
  }, [selectedSector]);

  const handleSubmit = async () => {
    if (selectedDepartment === 0) {
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      return;
    }

    await onSubmit({
      selectedDepartment,
      selectedSector,
      selectedUser,
      startDate,
      endDate,
    });
    onClose();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={'Remover escala(s)'}
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex flex-col space-y-2'>
          <SelectInput
            name='department'
            label='Departamento'
            value={selectedDepartment}
            onChange={(_, value) => setSelectedDepartment(Number(value))}
            options={departments.map((dept) => ({
              label: dept.name,
              value: dept.id,
            }))}
            icon={<PiUsersFourFill className='text-xl text-primary' />}
          />
        </div>

        <div className='flex flex-col space-y-2'>
          <SelectInput
            name='sector'
            label='Setor'
            value={selectedSector}
            onChange={(_, value) => setSelectedSector(Number(value))}
            options={[
              { label: 'Todos', value: 0 },
              ...filteredSectors.map((sector) => ({
                label: sector.name,
                value: sector.id,
              })),
            ]}
            icon={<PiUsersFill className='text-xl text-primary' />}
          />
        </div>

        <div className='flex flex-col space-y-2'>
          <SelectInput
            name='user'
            label='Colaborador(es)'
            value={selectedUser}
            onChange={(_, value) => setSelectedUser(Number(value))}
            options={[
              { label: 'Todos', value: 0 },
              ...filteredUsers.map((user) => ({
                label: user.name,
                value: user.id,
              })),
            ]}
            icon={<PiUserFill className='text-xl text-primary' />}
          />
        </div>

        <div className='flex flex-col space-y-2'>
          <DateTimeInput
            name='startDate'
            label='Data de Início'
            type='date'
            value={startDate}
            onChange={(_, value) => setStartDate(value)}
            error={
              new Date(endDate) < new Date(startDate)
                ? 'A data de início não pode ser depois da data final'
                : undefined
            }
            icon={<PiCalendarFill className='text-xl text-primary' />}
          />
        </div>

        <div className='flex flex-col space-y-2'>
          <DateTimeInput
            name='endDate'
            label='Data Final'
            type='date'
            value={endDate}
            error={
              new Date(endDate) < new Date(startDate)
                ? 'A data final não pode ser antes da data de início'
                : undefined
            }
            onChange={(_, value) => setEndDate(value)}
            icon={<PiCalendarFill className='text-xl text-primary' />}
          />
        </div>
      </div>
    </FormModal>
  );
}
