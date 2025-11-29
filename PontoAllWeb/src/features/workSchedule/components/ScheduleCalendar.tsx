import { User, WorkSchedule, Department, Sector } from '@/types';
import { PiUserFill } from 'react-icons/pi';
import ScheduleCard from './ScheduleCard';
import ScheduleDetailsModal from './ScheduleDetailsModal';
import { useState } from 'react';

const WEEK_DAYS = [
  { shortName: 'Seg', dayOfWeek: 1 },
  { shortName: 'Ter', dayOfWeek: 2 },
  { shortName: 'Qua', dayOfWeek: 3 },
  { shortName: 'Qui', dayOfWeek: 4 },
  { shortName: 'Sex', dayOfWeek: 5 },
  { shortName: 'Sáb', dayOfWeek: 6 },
  { shortName: 'Dom', dayOfWeek: 0 },
];

interface ScheduleCalendarProps {
  users: User[];
  workSchedules: WorkSchedule[];
  departments: Department[];
  sectors: Sector[];
  currentWeek: Date;
  onWeekChange: (newWeek: Date) => void;
  onEditSchedule?: (schedule: WorkSchedule) => void;
  onDeleteSchedule?: (schedule: WorkSchedule) => void;
}

export default function ScheduleCalendar({
  users,
  workSchedules,
  departments,
  sectors,
  currentWeek,
  onWeekChange,
  onEditSchedule,
  onDeleteSchedule,
}: ScheduleCalendarProps) {
  const [selectedSchedule, setSelectedSchedule] = useState<WorkSchedule>();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getWeekDates = () => {
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 1);

    return WEEK_DAYS.map((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        ...day,
        date: date.getDate().toString().padStart(2, '0'),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        fullDate: date,
      };
    });
  };

  const findScheduleForDate = (userId: number, date: Date) => {
    const dayOfMonth = date.getDate();
    const yearMonth = `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}`;

    return workSchedules.find(
      (schedule) =>
        schedule.userId === userId &&
        schedule.dayOfMonth === dayOfMonth &&
        schedule.yearMonth === yearMonth
    );
  };

  const formattedData = users.map((user) => ({
    ...user,
    schedules: workSchedules.filter((schedule) => schedule.userId === user.id),
  }));

  const openDetails = (schedule: WorkSchedule, user: User) => {
    setSelectedSchedule(schedule);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const getUserDepartmentAndSector = (user: User) => {
    const sector = sectors.find((s) => s.id === user.sectorId);
    const department = departments.find((d) => d.id === sector?.departmentId);
    return {
      sectorName: sector?.name || '',
      departmentName: department?.name || '',
    };
  };

  return (
    <div className='bg-white p-6 rounded-2xl h-full max-h-fit flex flex-col'>
      {/* Cabeçalhos */}
      <div className='grid grid-cols-[minmax(160px,_1.5fr)_repeat(7,_minmax(120px,_1fr))] border-b border-neutral-dark'>
        <div className='col-span-1 flex items-center justify-between z-10'>
          <h2 className='font-semibold text-text-primary text-sm'>
            Colaboradores
          </h2>
          {/* Dias */}
          <div className='flex items-center space-x-1'>
            <button
              onClick={() =>
                onWeekChange(
                  new Date(currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000)
                )
              }
              className='p-1 text-text-primary'
            >
              {'<'}
            </button>
            <button
              onClick={() =>
                onWeekChange(
                  new Date(currentWeek.getTime() + 7 * 24 * 60 * 60 * 1000)
                )
              }
              className='p-1 text-text-primary'
            >
              {'>'}
            </button>
          </div>
        </div>
        {getWeekDates().map(({ shortName, date, month }) => (
          <div key={shortName} className='col-span-1 text-center'>
            <span className='font-semibold text-text-primary text-sm'>
              {`${shortName} ${date}/${month}`}
            </span>
          </div>
        ))}
      </div>

      {/* Conteúdo */}
      {formattedData.map((employee) => (
        <div
          key={employee.id}
          className='grid grid-cols-[minmax(160px,_1.5fr)_repeat(7,_minmax(120px,_1fr))] border-b border-neutral-dark'
        >
          {/* Nome do Colaborador */}
          <div className='flex flex-row items-center justify-start shrink-0 gap-2'>
            <PiUserFill className='text-text-secondary text-lg' />
            <p className='text-text-secondary font-medium text-sm'>
              {employee.name}
            </p>
          </div>

          {getWeekDates().map((day) => {
            const schedule = findScheduleForDate(employee.id, day.fullDate);

            return (
              <div
                key={`${employee.id}-${day.fullDate.getTime()}`}
                className='col-span-1 px-2 py-3 max-w-52'
              >
                <ScheduleCard
                  workSchedule={schedule}
                  onClick={() => {
                    if (schedule) openDetails(schedule, employee);
                  }}
                  onEdit={onEditSchedule}
                  onDelete={onDeleteSchedule}
                />
              </div>
            );
          })}
        </div>
      ))}

      <ScheduleDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        department={
          selectedUser
            ? getUserDepartmentAndSector(selectedUser).departmentName
            : ''
        }
        sector={
          selectedUser
            ? getUserDepartmentAndSector(selectedUser).sectorName
            : ''
        }
        schedule={selectedSchedule}
        onEdit={onEditSchedule}
        onDelete={onDeleteSchedule}
      />
    </div>
  );
}
