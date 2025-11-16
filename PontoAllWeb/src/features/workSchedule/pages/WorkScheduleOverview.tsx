import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import ScheduleCard from '../components/ScheduleCard';
import { User, WorkSchedule } from '@/types';
import { PiUserFill } from 'react-icons/pi';
import { useCallback, useEffect, useState } from 'react';
import { AlertModal } from '@/components/Modal';
import { UserService } from '@/features/user';
import WorkScheduleService from '../services/workScheduleService';

const WEEK_DAYS = [
  { shortName: 'Seg', dayOfWeek: 1 },
  { shortName: 'Ter', dayOfWeek: 2 },
  { shortName: 'Qua', dayOfWeek: 3 },
  { shortName: 'Qui', dayOfWeek: 4 },
  { shortName: 'Sex', dayOfWeek: 5 },
  { shortName: 'Sáb', dayOfWeek: 6 },
  { shortName: 'Dom', dayOfWeek: 0 },
];

export default function WorkScheduleOverview() {
  const [users, setUsers] = useState<User[]>([]);
  const [workSchedules, setWorkSchedules] = useState<WorkSchedule[]>([]);
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

  useEffect(() => {
    fetchUsers();
    fetchWorkSchedules();
  }, [fetchUsers, fetchWorkSchedules]);

  const showAlert = (message: string, type: 'info' | 'success' | 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertModalOpen(true);
  };

  const getWeekDates = () => {
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 1);

    return WEEK_DAYS.map((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        ...day,
        date: date.getDate().toString().padStart(2, '0'),
      };
    });
  };

  const formattedData = users.map((user) => ({
    ...user,
    schedules: workSchedules.filter((schedule) => schedule.userId === user.id),
  }));

  return (
    <div>
      <BreadcrumbPageTitle title='Escala de Trabalho' />
      <div className='p-11 h-full'>
        {/* Calendário */}
        <div className='bg-white p-6 rounded-2xl h-full max-h-fit flex flex-col'>
          {/* Cabeçalhos */}
          <div className='grid grid-cols-[minmax(160px,_1.5fr)_repeat(7,_minmax(120px,_1fr))]'>
            <div className='col-span-1 flex items-center justify-between z-10'>
              <h2 className='font-semibold text-text-primary text-sm'>
                Colaboradores
              </h2>
              {/* Dias */}
              <div className='flex items-center space-x-1'>
                <button
                  onClick={() =>
                    setCurrentWeek(
                      new Date(currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000)
                    )
                  }
                  className='p-1 text-text-primary'
                >
                  {'<'}
                </button>
                <button
                  onClick={() =>
                    setCurrentWeek(
                      new Date(currentWeek.getTime() + 7 * 24 * 60 * 60 * 1000)
                    )
                  }
                  className='p-1 text-text-primary'
                >
                  {'>'}
                </button>
              </div>
            </div>
            {getWeekDates().map(({ shortName, date }) => (
              <div key={shortName} className='col-span-1 text-center'>
                <span className='font-semibold text-text-primary text-sm'>
                  {`${shortName} ${date}`}
                </span>
              </div>
            ))}
          </div>

          {/* Conteúdo */}
          {formattedData.map((employee) => (
            <div
              key={employee.id}
              className='grid grid-cols-[minmax(160px,_1.5fr)_repeat(7,_minmax(120px,_1fr))]'
            >
              {/* Nome do Colaborador */}
              <div className='flex flex-row items-center justify-start shrink-0 gap-2'>
                <PiUserFill className='text-text-secondary text-lg' />
                <p className='text-text-secondary font-medium text-sm'>
                  {employee.name}
                </p>
              </div>

              {getWeekDates().map((day) => {
                const schedule = false;

                return (
                  <div
                    key={`${employee.id}-${day.date}`}
                    className='col-span-1 p-2 border-l'
                  >
                    {schedule ? (
                      <ScheduleCard workSchedule={schedule} />
                    ) : (
                      <div className='h-24 w-full border border-gray-300 rounded-lg flex items-center justify-center'>
                        Sem escala
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
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
