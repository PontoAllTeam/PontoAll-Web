import { ScheduleDayType, WorkSchedule } from '@/types';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';

interface ScheduleCardProps {
  workSchedule: WorkSchedule;
}

export default function ScheduleCard(props: ScheduleCardProps) {
  const { workSchedule } = props;

  // TODO pegar primeiro e último horário

  const scheduleTypes = {
    [ScheduleDayType.BANKED_DAY_OFF]: {
      text: 'Banco de Horas',
      style: 'bg-yellow-light text-yellow border-l-yellow',
    },
    [ScheduleDayType.DAY_OFF]: {
      text: 'Folga',
      style: 'bg-blue-light text-blue border-l-blue',
    },
    [ScheduleDayType.HOLIDAY]: {
      text: 'Feriado',
      style: 'bg-red-light text-red border-l-red',
    },
    [ScheduleDayType.LEAVE_OF_ABSENCE]: {
      text: 'Licença',
      style: 'bg-purple-light text-purple border-l-purple',
    },
    [ScheduleDayType.VACATION]: {
      text: 'Férias',
      style: 'bg-green-light text-green border-l-green',
    },
    [ScheduleDayType.WORK_DAY]: {
      text: 'Dia Útil',
      style: 'bg-neutral-light text-text-primary border-l-text-primary',
    },
  };

  return (
    <div
      className={`h-24 w-52 border-l-8 select-none ${
        scheduleTypes[workSchedule.dayType].style
      }`}
    >
      <div className='h-full p-2 flex flex-col justify-evenly'>
        <div className='flex justify-between items-center'>
          <h6 className='font-semibold'>
            {scheduleTypes[workSchedule.dayType].text}
          </h6>
          <PiDotsThreeOutlineVerticalFill className='text-text-primary size-4 cursor-pointer' />
        </div>
        <p className='text-text-primary text-sm font-medium'>00:00 - 00:00</p>
      </div>
    </div>
  );
}
