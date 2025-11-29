import { ScheduleDayType, WorkSchedule } from '@/types';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import { getMarkTimes } from '../utils/scheduleUtils';
import { useState, useRef, useEffect } from 'react';
import { CrudActionsDropdown } from '@/components/CrudActions';

interface ScheduleCardProps {
  workSchedule?: WorkSchedule;
  onClick?: () => void;
  onEdit?: (schedule: WorkSchedule) => void;
  onDelete?: (schedule: WorkSchedule) => void;
}

export default function ScheduleCard(props: ScheduleCardProps) {
  const { workSchedule, onEdit, onDelete } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const markTimes = getMarkTimes(workSchedule);

  const handleDotsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleEdit = () => {
    if (workSchedule && onEdit) {
      onEdit(workSchedule);
    }
    setShowDropdown(false);
  };

  const handleDelete = () => {
    if (workSchedule && onDelete) {
      onDelete(workSchedule);
    }
    setShowDropdown(false);
  };

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
      style: 'bg-neutral-light text-text-primary border-none',
    },
  };

  const currentSchedule = workSchedule
    ? scheduleTypes[workSchedule.dayType]
    : scheduleTypes.NO_SCHEDULE;

  return (
    <button
      className={`h-24 w-full border-l-8 shrink-0 select-none rounded-lg ${currentSchedule.style}`}
      onClick={props.onClick}
    >
      <div className='h-full p-2 flex flex-col justify-evenly'>
        <div className='flex justify-between items-center'>
          <h6 className='font-semibold'>{currentSchedule.text}</h6>
          {markTimes.length >= 2 && (
            <div className='relative' ref={dropdownRef}>
              <PiDotsThreeOutlineVerticalFill
                className='text-text-primary size-4 cursor-pointer hover:text-primary'
                onClick={handleDotsClick}
              />
              {showDropdown && (
                <CrudActionsDropdown
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>
          )}
        </div>
        <p className='text-text-primary text-sm font-medium text-start'>
          {markTimes.length >= 2
            ? `${markTimes[0]} - ${markTimes[markTimes.length - 1]}`
            : markTimes[0] || ''}
        </p>
      </div>
    </button>
  );
}
