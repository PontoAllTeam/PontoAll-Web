import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import ScheduleCalendar from '../components/ScheduleCalendar';
import { User, WorkSchedule, Department, Sector } from '@/types';
import { PiPlus } from 'react-icons/pi';
import { useCallback, useEffect, useState } from 'react';
import { AlertModal } from '@/components/Modal';
import { UserService } from '@/features/user';
import { DepartmentService } from '@/features/department';
import { SectorService } from '@/features/sector';
import WorkScheduleService from '../services/workScheduleService';
import Button from '@/components/Button';
import useAppRoutes from '@/hooks/useAppRoutes';
import { useNavigate } from 'react-router-dom';
import { CrudActionsButton } from '@/components/CrudActions';
import RemoveScheduleModal from '../components/RemoveScheduleModal';

export default function WorkScheduleOverview() {
  const routes = useAppRoutes();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [workSchedules, setWorkSchedules] = useState<WorkSchedule[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'info' | 'success' | 'error'>(
    'info'
  );
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    const res = await UserService.getAll();
    if (res.success && res.data) {
      setUsers(res.data);
    } else {
      showAlert(res.message, 'error');
    }
  }, []);

  const fetchWorkSchedules = useCallback(async () => {
    const res = await WorkScheduleService.getAll();
    if (res.success && res.data) {
      setWorkSchedules(res.data);
    } else {
      showAlert(res.message, 'error');
    }
  }, []);

  const fetchDepartments = useCallback(async () => {
    const res = await DepartmentService.getAll();
    if (res.success && res.data) {
      setDepartments(res.data);
    } else {
      showAlert(res.message, 'error');
    }
  }, []);

  const fetchSectors = useCallback(async () => {
    const res = await SectorService.getAll();
    if (res.success && res.data) {
      setSectors(res.data);
    } else {
      showAlert(res.message, 'error');
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchWorkSchedules();
    fetchDepartments();
    fetchSectors();
  }, [fetchUsers, fetchWorkSchedules, fetchDepartments, fetchSectors]);

  const showAlert = (message: string, type: 'info' | 'success' | 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertModalOpen(true);
  };

  const handleEditSchedule = (schedule: WorkSchedule) => {
    navigate(
      routes.WORK_SCHEDULE_EDIT.path.replace(':id', String(schedule.id))
    );
  };

  const handleDeleteSchedule = async (schedule: WorkSchedule) => {
    const res = await WorkScheduleService.deleteById(schedule.id);
    if (res.success) {
      showAlert('Escala excluída com sucesso!', 'success');
      await fetchWorkSchedules();
    } else {
      showAlert(res.message, 'error');
    }
  };

  const handleRemoveSchedules = async (data: {
    selectedDepartment: number;
    selectedSector: number;
    selectedUser: number;
    startDate: string;
    endDate: string;
  }) => {
    const [startYear, startMonth, startDay] = data.startDate
      .split('-')
      .map(Number);
    const [endYear, endMonth, endDay] = data.endDate.split('-').map(Number);
    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);

    let successCount = 0;
    let errorCount = 0;

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfMonth = d.getDate();
      const yearMonth = `${d.getFullYear()}/${(d.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;

      let res;
      if (data.selectedUser !== 0) {
        res = await WorkScheduleService.deleteByUserAndDate(
          data.selectedUser,
          dayOfMonth,
          yearMonth
        );
      } else if (data.selectedSector !== 0) {
        res = await WorkScheduleService.deleteBySectorAndDate(
          data.selectedSector,
          dayOfMonth,
          yearMonth
        );
      } else {
        res = await WorkScheduleService.deleteByDepartmentAndDate(
          data.selectedDepartment,
          dayOfMonth,
          yearMonth
        );
      }

      if (res.success) {
        successCount++;
      } else {
        errorCount++;
      }
    }

    await fetchWorkSchedules();

    if (errorCount === 0) {
      showAlert(
        `${successCount} escala(s) removida(s) com sucesso!`,
        'success'
      );
    } else if (successCount > 0) {
      showAlert(
        `${successCount} escala(s) removida(s), ${errorCount} falharam.`,
        'info'
      );
    } else {
      showAlert('Erro ao remover escalas.', 'error');
    }
  };

  return (
    <div className='overflow-clip w-full'>
      <BreadcrumbPageTitle title='Escalas de Trabalho' />
      <div className='px-17'>
        <div className='flex justify-end items-center py-2 gap-4'>
          <CrudActionsButton onDelete={() => setIsRemoveModalOpen(true)} />
          <Button
            label='Adicionar'
            icon={<PiPlus />}
            iconPosition='left'
            color='secondary'
            size='md'
            onClick={() => navigate(routes.WORK_SCHEDULE_REGISTRATION.path)}
          />
        </div>
        <hr className='border-t border-neutral-dark' />
      </div>
      <div className='p-11 h-full'>
        <ScheduleCalendar
          users={users}
          workSchedules={workSchedules}
          departments={departments}
          sectors={sectors}
          currentWeek={currentWeek}
          onWeekChange={setCurrentWeek}
          onEditSchedule={handleEditSchedule}
          onDeleteSchedule={handleDeleteSchedule}
        />
      </div>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        message={alertMessage}
        type={alertType}
      />
      <RemoveScheduleModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onSubmit={handleRemoveSchedules}
      />
    </div>
  );
}
