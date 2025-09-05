import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import ScheduleCard from '@/components/ScheduleCard';
import { ScheduleDayType } from '@/types/enums';
import { WorkSchedule } from '@/types/models';
import { PiUserFill } from 'react-icons/pi';

const EmployeeName = () => {
  return (
    <div className='flex flex-row items-center justify-center shrink-0 gap-2'>
      <PiUserFill className='text-text-secondary text-2xl' />
      <p className='text-text-secondary font-medium'>Nome funcionário</p>
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
  const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

  return (
    <div>
      <BreadcrumbPageTitle title='Escala de Trabalho' />
      {/* Container da página */}
      <div className='p-11 h-full'>
        {/* Container do calendário das escalas */}
        <div className='bg-white p-6 rounded-2xl h-full max-h-fit flex flex-col'>
          {/* Conteúdo do calendário */}
          <div className='flex gap-4 items-center w-full'>
            {/* //TODO Quando for feito a integração com a API, as duas listas (funcionários e os cards dos dias) devem estar em sincronia*/}
            {/* Coluna dos funcionários */}
            <div className='shrink-0 h-full flex flex-col *:my-auto'>
              <EmployeeName />
              <EmployeeName />
              <EmployeeName />
              <EmployeeName />
            </div>

            {/* Container dos cards de todos os funcionários */}
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
