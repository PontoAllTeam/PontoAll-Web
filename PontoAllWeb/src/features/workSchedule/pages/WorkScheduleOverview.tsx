import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import ScheduleCard from '@/components/ScheduleCard';
import { ScheduleDayType, WorkSchedule } from '@/types';
import { PiUserFill } from 'react-icons/pi';

const EmployeeName = () => {
  return (
    <div className='flex flex-row items-center justify-center shrink-0 gap-2'>
      <PiUserFill className='text-text-secondary text-2xl' />
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

export default function WorkScheduleOverview() {
  return (
    <div>
      <BreadcrumbPageTitle title='Escala de Trabalho' />
      <div className='p-11 h-full'>
        <div className='bg-white p-6 rounded-2xl h-full max-h-fit flex flex-col'>
          <div className='flex gap-4 items-center w-full'>
            <div className='shrink-0 h-full flex flex-col *:my-auto'>
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
    </div>
  );
}
