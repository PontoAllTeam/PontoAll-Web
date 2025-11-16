import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import ScheduleCard from '../components/ScheduleCard';
import { ScheduleDayType, WorkSchedule } from '@/types';
import { PiUserFill } from 'react-icons/pi';
import { useState } from 'react';
import { AlertModal } from '@/components/Modal';

const EmployeeName = () => {
  return (
    <div className='flex flex-row items-center justify-center shrink-0 gap-2'>
      <PiUserFill className='text-text-secondary text-xl' />
      <p className='text-text-secondary font-medium'>Nome colaborador</p>
    </div>
  );
};

const EmployeeSchedule = () => {
  const dataAgora = new Date();
  const emptySchedule: WorkSchedule = {
    dayOfMonth: 4,
    dayType: ScheduleDayType.BANKED_DAY_OFF,
    id: 1,
    geofenceId: 1,
    markTime1: dataAgora,
    markTime2: dataAgora,
    userId: 1,
    yearMonth: '2025/09',
  };

  return (
    <div className='flex flex-row gap-3 justify-between'>
      {Array.from({ length: 7 }).map((_, index) => (
        <ScheduleCard
          key={index}
          workSchedule={{
            ...emptySchedule,
            dayType: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
          }}
        />
      ))}
    </div>
  );
};

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
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'info' | 'success' | 'error'>(
    'info'
  );

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
          <div className='flex gap-4 items-center w-full'>
            <div className='shrink-0 h-full flex flex-col *:my-auto text-sm'>
              <EmployeeName />
              <EmployeeName />
              <EmployeeName />
              <EmployeeName />
            </div>

            <div className='flex flex-col w-full overflow-x-auto *:py-5'>
              <EmployeeSchedule />
              <EmployeeSchedule />
              <EmployeeSchedule />
              <EmployeeSchedule />
            </div>
          </div>
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
