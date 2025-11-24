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
import CrudActions from '@/components/CrudActions';

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

  return (
    <div className='overflow-clip'>
      <BreadcrumbPageTitle title='Escala de Trabalho' />
      <div className='px-17'>
        <div className='flex justify-end items-center py-2 gap-4 border-b border-text-primary'>
          <CrudActions />
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
        />
      </div>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        message={alertMessage}
        type={alertType}
      />
    </div>
  );
}
