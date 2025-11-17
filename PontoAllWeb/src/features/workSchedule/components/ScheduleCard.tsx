import { ScheduleDayType, WorkSchedule } from '@/types';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';

interface ScheduleCardProps {
  workSchedule?: WorkSchedule;
}

export default function ScheduleCard(props: ScheduleCardProps) {
  const { workSchedule } = props;

  const markTimes = workSchedule
    ? Object.keys(workSchedule)
        .filter((key) => key.startsWith('markTime'))
        .map((markTime) => {
          const timeString = workSchedule[
            markTime as keyof WorkSchedule
          ] as string;
          if (!timeString) return null;
          return timeString.substring(0, 5); // Extrai HH:MM de HH:MM:SS
        })
        .filter(Boolean) // Remove valores nulos
    : [];

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
    NO_SCHEDULE: {
      text: 'Sem escala',
      style: 'bg-white text-text-primary border-none',
    },
  };

  const currentSchedule = workSchedule
    ? scheduleTypes[workSchedule.dayType]
    : scheduleTypes.NO_SCHEDULE;

  return (
    <div
      className={`h-24 max-w-52 w-full border-l-8 shrink-0 select-none rounded-lg ${currentSchedule.style}`}
    >
      <div className='h-full p-2 flex flex-col justify-evenly'>
        <div className='flex justify-between items-center'>
          <h6 className='font-semibold'>{currentSchedule.text}</h6>
          <PiDotsThreeOutlineVerticalFill className='text-text-primary size-4 cursor-pointer' />
        </div>
        <p className='text-text-primary text-sm font-medium'>
          {markTimes.length >= 2
            ? `${markTimes[0]} - ${markTimes[markTimes.length - 1]}`
            : markTimes[0] || '--'}
        </p>
      </div>
    </div>
  );
}
