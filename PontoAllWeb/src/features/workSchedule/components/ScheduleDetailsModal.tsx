import { Modal, ModalProps } from '@/components/Modal';
import { WorkSchedule } from '@/types';
import ScheduleCard from './ScheduleCard';
import { PiClockFill, PiUsersFill, PiUsersFourFill } from 'react-icons/pi';
import { getMarkTimes } from '../utils/scheduleUtils';

export interface ScheduleDetailsModalProps
  extends Omit<ModalProps, 'children'> {
  schedule?: WorkSchedule;
  sector: string;
  department: string;
  onEdit?: (schedule: WorkSchedule) => void;
  onDelete?: (schedule: WorkSchedule) => void;
}

export default function ScheduleDetailsModal({
  schedule,
  sector,
  department,
  onEdit,
  onDelete,
  onClose,
  isOpen,
  closeOnBackdropClick = true,
  showCloseButton = true,
}: ScheduleDetailsModalProps) {
  if (!schedule || !isOpen) {
    return null;
  }

  const markTimes = getMarkTimes(schedule);

  const handleDelete = (schedule: WorkSchedule) => {
    onDelete?.(schedule);
    onClose();
  };

  return (
    <Modal.ModalRoot
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdropClick={closeOnBackdropClick}
    >
      <Modal.ModalHeader
        onClose={onClose}
        showCloseButton={showCloseButton}
        title={'Detalhes do horário'}
      />
      <Modal.ModalContent>
        <div className='flex flex-col gap-4'>
          <ScheduleCard
            workSchedule={schedule}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
          <div className='flex gap-2 items-center text-text-primary text-sm'>
            <PiClockFill className='text-lg' />
            {markTimes.map((time, index) => {
              const isEven = index % 2 === 0;
              const isLast = index === markTimes.length - 1;

              return (
                <div key={index} className='flex gap-2'>
                  <p>{time}</p>
                  {isEven && !isLast && <p>-</p>}
                  {!isEven && !isLast && <p>|</p>}
                </div>
              );
            })}
          </div>
          <div className='flex gap-8'>
            <span className='flex gap-2 items-center text-text-primary text-sm'>
              <PiUsersFourFill className='text-lg' />
              <p>{department}</p>
            </span>
            <span className='flex gap-2 items-center text-text-primary text-sm'>
              <PiUsersFill className='text-lg' />
              <p>{sector}</p>
            </span>
          </div>
        </div>
      </Modal.ModalContent>
    </Modal.ModalRoot>
  );
}
