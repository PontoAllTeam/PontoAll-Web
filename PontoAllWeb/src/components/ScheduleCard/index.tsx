import { ScheduleDayType, WorkSchedule } from '@/types';

interface ScheduleCardProps {
  workSchedule: WorkSchedule;
}

export default function ScheduleCard(props: ScheduleCardProps) {
  const { workSchedule } = props;

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
      <div className='h-full py-4 px-2 font-semibold'>
        {scheduleTypes[workSchedule.dayType].text}
      </div>
    </div>
  );
}
