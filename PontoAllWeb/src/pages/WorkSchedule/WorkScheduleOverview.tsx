import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import ScheduleCard from '@/components/ScheduleCard';
import { ScheduleDayType } from '@/types/enums';
import { WorkSchedule } from '@/types/models';
import { PiUserFill } from 'react-icons/pi';

export default function WorkScheduleOverview() {
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

  const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

  return (
    <div className='w-full'>
      <BreadcrumbPageTitle title='Escala de Trabalho' />
      <div className='p-11 h-full'>
        <table className='bg-white w-full h-40 border-collapse p-6 rounded-2xl'>
          <thead className='text-text-primary font-medium text-lg'>
            <tr className='h-12'>
              {/* Coluna reservada para as checkbox */}
              <th className='text-left border pt-10'>Funcionário</th>
              {dias.map((column, index) => (
                <th key={index} className='text-left border pt-10 pb-4'>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <div className='flex flex-row items-center gap-2 py-5'>
            <PiUserFill className='text-text-secondary text-2xl' />
            <p className='text-text-secondary font-medium shrink-0'>
              Nome funcionário
            </p>
            <div className='flex justify-between w-full'>
              {Array.from({ length: 7 }).map(() => (
                <ScheduleCard workSchedule={emptySchedule} />
              ))}
            </div>
          </div>
        </table>
      </div>
    </div>
  );
}
