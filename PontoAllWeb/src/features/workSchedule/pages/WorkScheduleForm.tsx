import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DateTimeInput, SelectInput } from '@/components/FormControls';
import useAppRoutes from '@/hooks/useAppRoutes';
import {
  PiUsersFourFill,
  PiUsersFill,
  PiUserFill,
  PiCalendarStarFill,
  PiCalendarFill,
  PiClockFill,
  PiPlusCircleFill,
  PiMinusCircleFill,
  PiCheckCircleFill,
  PiBankFill,
} from 'react-icons/pi';
import {
  Department,
  getScheduleDayTypeOptions,
  ScheduleDayType,
  Sector,
  User,
  WorkSchedule,
} from '@/types';
import useFormData from '@/hooks/useFormData';
import { DepartmentService } from '@/features/department';
import { SectorService } from '@/features/sector';
import { AlertModal } from '@/components/Modal';
import { UserService } from '@/features/user';
import WorkScheduleService from '../services/workScheduleService';

export default function WorkScheduleForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = id !== undefined && id !== '0';
  const routes = useAppRoutes();
  
  const { data, setData, updateField, reset } = useFormData<WorkSchedule>({
    id: 0,
    dayOfMonth: 1,
    yearMonth: '2025/01',
    dayType: ScheduleDayType.WORK_DAY,
    markTime1: '00:00:00',
    markTime2: '00:00:00',
    userId: 0,
    geofenceId: 1, // TODO Trocar isso aqui posteriormente
  });

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'info' | 'success' | 'error'>(
    'info'
  );

  // Listas de opções
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Estados para filtragem
  const [selectedDepartment, setSelectedDepartment] = useState<number>(
    departments[0]?.id || 0
  );
  const [selectedSector, setSelectedSector] = useState<number>(0);

  // Filtros baseados nas seleções
  const filteredSectors =
    selectedDepartment === 0
      ? sectors
      : sectors.filter((sector) => sector.departmentId === selectedDepartment);
  const filteredUsers = (() => {
    let filtered = users;
    if (selectedDepartment !== 0) {
      const departmentSectorIds = sectors
        .filter((s) => s.departmentId === selectedDepartment)
        .map((s) => s.id);
      filtered = filtered.filter((user) =>
        departmentSectorIds.includes(user.sectorId)
      );
    }
    if (selectedSector !== 0) {
      filtered = filtered.filter((user) => user.sectorId === selectedSector);
    }
    return filtered;
  })();

  // Reset seleções quando filtros mudam (apenas no modo criação)
  useEffect(() => {
    if (!isEditing) {
      setSelectedSector(0);
      setData({ ...data, userId: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartment, isEditing]);

  useEffect(() => {
    if (departments.length > 0 && selectedDepartment === 0 && !isEditing) {
      setSelectedDepartment(departments[0].id);
    }
  }, [departments, selectedDepartment, isEditing]);

  useEffect(() => {
    if (selectedSector !== 0 && !isEditing) {
      setData({ ...data, userId: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSector, isEditing]);

  // Atualizar departamento e setor baseado no usuário selecionado (modo edição)
  useEffect(() => {
    if (isEditing && data.userId && data.userId > 0 && users.length > 0 && sectors.length > 0) {
      const user = users.find(u => u.id === data.userId);
      if (user && user.sectorId) {
        const sector = sectors.find(s => s.id === user.sectorId);
        if (sector) {
          setSelectedDepartment(sector.departmentId);
          setSelectedSector(sector.id);
        }
      }
    }
  }, [data.userId, users, sectors, isEditing]);

  const [startDate, setStartDate] = useState<string>(
    new Date().toLocaleDateString().split('/').reverse().join('-')
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toLocaleDateString().split('/').reverse().join('-')
  );

  const [useBankOfHours, setUseBankOfHours] = useState(false);
  const [activeMarkTimeCount, setActiveMarkTimeCount] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showAlert = (message: string, type: 'info' | 'success' | 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertModalOpen(true);
  };

  const getSectors = useCallback(async () => {
    const res = await SectorService.getAll();
    if (res.success && res.data) {
      setSectors(res.data);
    } else {
      showAlert(res.message, 'error');
    }
  }, []);

  const getDepartments = useCallback(async () => {
    const res = await DepartmentService.getAll();
    if (res.success && res.data) {
      setDepartments(res.data);
    } else {
      showAlert(res.message, 'error');
    }
  }, []);

  const getUsers = useCallback(async () => {
    const res = await UserService.getAll();
    if (res.success && res.data) {
      setUsers(res.data);
    } else {
      showAlert(res.message, 'error');
    }
  }, []);

  const fetchWorkSchedule = useCallback(
    async (scheduleId: string) => {
      const res = await WorkScheduleService.getById(Number(scheduleId));
      if (res.success && res.data) {
        const schedule = res.data;
        
        setData(schedule);
        
        if (schedule.yearMonth && schedule.dayOfMonth) {
          const [year, month] = schedule.yearMonth.split('/');
          const dateStr = `${year}-${month.padStart(2, '0')}-${schedule.dayOfMonth.toString().padStart(2, '0')}`;
          setStartDate(dateStr);
          setEndDate(dateStr);
        }
        
        let markTimeCount = 0;
        for (let i = 1; i <= 10; i++) {
          const markTimeKey = `markTime${i}` as keyof WorkSchedule;
          if (schedule[markTimeKey]) {
            markTimeCount = i;
          }
        }
        setActiveMarkTimeCount(markTimeCount % 2 === 0 ? markTimeCount : markTimeCount + 1);
        
      } else {
        showAlert('Escala não encontrada!', 'error');
        navigate(routes.WORK_SCHEDULE.path);
      }
    },
    [navigate, routes.WORK_SCHEDULE.path, setData]
  );

  useEffect(() => {
    getSectors();
    getDepartments();
    getUsers();
  }, [getDepartments, getSectors, getUsers]);

  useEffect(() => {
    if (
      isEditing &&
      departments.length > 0 &&
      sectors.length > 0 &&
      users.length > 0
    ) {
      fetchWorkSchedule(id);
    }
  }, [
    fetchWorkSchedule,
    id,
    isEditing,
    departments.length,
    sectors.length,
    users.length,
  ]);

  useEffect(() => {
    if (!isEditing) {
      reset();
      setSelectedDepartment(departments[0]?.id || 0);
      setSelectedSector(0);
      setStartDate(new Date().toLocaleDateString().split('/').reverse().join('-'));
      setEndDate(new Date().toLocaleDateString().split('/').reverse().join('-'));
      setActiveMarkTimeCount(2);
      setUseBankOfHours(false);
    }
  }, [isEditing, reset, departments]);

  const getActiveShifts = () => {
    const shifts = [];
    for (let i = 0; i < activeMarkTimeCount; i += 2) {
      const entryIndex = i + 1;
      const exitIndex = i + 2;
      shifts.push({
        id: i / 2,
        entry:
          (data[`markTime${entryIndex}` as keyof WorkSchedule] as string) ||
          '00:00:00',
        exit:
          (data[`markTime${exitIndex}` as keyof WorkSchedule] as string) ||
          '00:00:00',
        entryIndex,
        exitIndex,
      });
    }
    return shifts;
  };

  const shifts = getActiveShifts();

  const addShift = () => {
    if (activeMarkTimeCount < 10) {
      setActiveMarkTimeCount((prev) => prev + 2);
    }
  };

  const removeShift = (shiftId: number) => {
    if (activeMarkTimeCount > 2) {
      const shift = shifts[shiftId];
      const newData = { ...data };
      delete newData[`markTime${shift.entryIndex}` as keyof WorkSchedule];
      delete newData[`markTime${shift.exitIndex}` as keyof WorkSchedule];
      setData(newData);
      setActiveMarkTimeCount((prev) => prev - 2);
    }
  };

  const handleInputChange = (shiftId: number, field: string, value: string) => {
    const shift = shifts[shiftId];
    const markTimeIndex =
      field === 'entry' ? shift.entryIndex : shift.exitIndex;
    setData({
      ...data,
      [`markTime${markTimeIndex}`]: `${value}:00`,
    });
  };

  const toggleBankOfHours = () => {
    setUseBankOfHours((prev) => !prev);
  };

  const convertDateToScheduleFormat = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return {
      dayOfMonth: date.getDate(),
      yearMonth: `${date.getFullYear()}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`,
    };
  };

  const createSchedule = async (scheduleData: WorkSchedule) => {
    if (data.userId !== 0) {
      return await WorkScheduleService.create(scheduleData);
    } else if (selectedSector !== 0) {
      return await WorkScheduleService.createBySector(selectedSector, {
        ...scheduleData,
        userId: 1,
      });
    } else {
      return await WorkScheduleService.createByDepartment(selectedDepartment, {
        ...scheduleData,
        userId: 1,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedDepartment === 0) {
      showAlert('Selecione um departamento.', 'error');
      return;
    }

    setIsSubmitting(true);

    if (isEditing) {
      const res = await WorkScheduleService.update(data.id, data);

      if (res.success) {
        showAlert('Escala atualizada com sucesso!', 'success');
        navigate(routes.WORK_SCHEDULE.path);
      } else {
        showAlert(res.message, 'error');
      }
    } else {
      const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
      const [endYear, endMonth, endDay] = endDate.split('-').map(Number);
      const start = new Date(startYear, startMonth - 1, startDay);
      const end = new Date(endYear, endMonth - 1, endDay);

      if (end < start) {
        showAlert(
          'A data de término deve ser posterior à data de início.',
          'error'
        );
        setIsSubmitting(false);
        return;
      }

      let successCount = 0;
      let errorCount = 0;

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toLocaleDateString().split('/').reverse().join('-');
        const { dayOfMonth, yearMonth } = convertDateToScheduleFormat(dateStr);

        const scheduleData = {
          ...data,
          dayOfMonth,
          yearMonth,
        };

        const res = await createSchedule(scheduleData);

        if (res.success) {
          successCount++;
        } else {
          errorCount++;
        }
      }

      if (errorCount === 0) {
        showAlert(
          `${successCount} escala(s) cadastrada(s) com sucesso!`,
          'success'
        );
        navigate(routes.WORK_SCHEDULE.path);
      } else if (successCount > 0) {
        showAlert(
          `${successCount} escala(s) cadastrada(s), ${errorCount} falharam.`,
          'info'
        );
      } else {
        showAlert('Erro ao cadastrar escalas.', 'error');
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className='p-10 h-full bg-gray-50'>
      <PageTitle title={isEditing ? 'Editar Escala de Trabalho' : 'Adicionar Escala de Trabalho'} />

      <form className='flex flex-col space-y-8 mt-6' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white rounded-lg shadow'>
          <div className='flex flex-col space-y-2'>
            <SelectInput
              name='department'
              label='Departamento'
              value={selectedDepartment}
              onChange={(_, value) => !isEditing && setSelectedDepartment(Number(value))}
              disabled={isEditing}
              options={departments.map((dept) => ({
                label: dept.name,
                value: dept.id,
              }))}
              icon={<PiUsersFourFill className='text-xl text-primary' />}
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <SelectInput
              name='sector'
              label='Setor'
              value={selectedSector}
              onChange={(_, value) => !isEditing && setSelectedSector(Number(value))}
              disabled={isEditing}
              options={[
                { label: 'Todos', value: 0 },
                ...filteredSectors.map((sector) => ({
                  label: sector.name,
                  value: sector.id,
                })),
              ]}
              icon={<PiUsersFill className='text-xl text-primary' />}
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <SelectInput<WorkSchedule>
              name='userId'
              label='Colaborador(es)'
              value={data.userId}
              onChange={updateField}
              options={[
                { label: 'Todos', value: 0 },
                ...filteredUsers.map((user) => ({
                  label: user.name,
                  value: user.id,
                })),
              ]}
              icon={<PiUserFill className='text-xl text-primary' />}
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <SelectInput<WorkSchedule>
              name='dayType'
              label='Tipo de Dia'
              value={data.dayType}
              onChange={updateField}
              options={getScheduleDayTypeOptions()}
              icon={<PiCalendarStarFill className='text-xl text-primary' />}
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <DateTimeInput
              name='startDate'
              label={isEditing ? 'Data da Escala' : 'Data de Início da Escala'}
              type='date'
              value={startDate}
              onChange={(_, value) => setStartDate(value)}
              disabled={isEditing}
              error={
                !isEditing && new Date(endDate) < new Date(startDate)
                  ? 'A data de início não pode ser depois da data final'
                  : undefined
              }
              icon={<PiCalendarFill className='text-xl text-primary' />}
            />
          </div>

          {!isEditing && (
            <div className='flex flex-col space-y-2'>
              <DateTimeInput
                name='endDate'
                label='Data Final da Escala'
                type='date'
                value={endDate}
                error={
                  new Date(endDate) < new Date(startDate)
                    ? 'A data final não pode ser antes da data de início'
                    : undefined
                }
                onChange={(_, value) => setEndDate(value)}
                icon={<PiCalendarFill className='text-xl text-primary' />}
              />
            </div>
          )}
        </div>

        <div className='p-6 bg-white rounded-lg shadow border border-primary/10 transition-all duration-300 hover:shadow-lg'>
          <div className='flex items-center space-x-3 border-b pb-3 mb-4 border-neutral-dark/20'>
            <PiBankFill className='text-2xl text-accent' />
            <h2 className='text-xl font-bold text-text-secondary'>
              Configuração de Compensação de Horas
            </h2>
          </div>

          <label
            htmlFor='bank-hours-toggle'
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              useBankOfHours ? 'bg-primary/5' : 'hover:bg-gray-50'
            }`}
          >
            <div className='flex flex-col space-y-1 w-full max-w-lg'>
              <div className='flex items-center space-x-2'>
                <span
                  className={`text-lg font-bold transition duration-300 ${
                    useBankOfHours ? 'text-primary' : 'text-text-secondary'
                  }`}
                >
                  {useBankOfHours
                    ? 'Banco de Horas Habilitado'
                    : 'Habilitar Banco de Horas'}
                </span>
                {useBankOfHours && (
                  <PiCheckCircleFill className='text-xl text-primary' />
                )}
              </div>

              <p
                className={`text-sm text-text-primary/70 pl-3 border-l-2 ${
                  useBankOfHours ? 'border-primary' : 'border-gray-300'
                }`}
              >
                {useBankOfHours
                  ? 'Ativo: Horas excedentes serão automaticamente convertidas em saldo de banco de horas.'
                  : 'Desativado: Horas excedentes serão pagas como adicional, sem compensação futura em saldo.'}
              </p>
            </div>

            <div className='flex-shrink-0 relative'>
              <input
                type='checkbox'
                id='bank-hours-toggle'
                className='sr-only'
                checked={useBankOfHours}
                onChange={toggleBankOfHours}
              />
              <div
                className={`block w-14 h-8 rounded-full transition duration-300 ease-in-out ${
                  useBankOfHours ? 'bg-primary' : 'bg-gray-300'
                }`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition duration-300 ease-in-out transform shadow-md ${
                  useBankOfHours
                    ? 'translate-x-6 border border-primary/50'
                    : 'translate-x-0 border border-gray-400'
                }`}
              ></div>
            </div>
          </label>
        </div>

        <div className='flex flex-col space-y-6'>
          <header className='space-y-1'>
            <h2 className='text-xl font-bold text-text-secondary flex items-center space-x-2'>
              <PiClockFill className='text-2xl text-accent' />
              <span>Gestão de Pontos por Jornada</span>
            </h2>
            <p className='text-sm text-text-primary'>
              Defina os horários de Entrada e Saída para cada período de
              trabalho. Adicione múltiplas jornadas para incluir pausas (como
              almoço) não compensadas.
            </p>
          </header>

          {shifts.map((shift, index) => (
            <div
              key={shift.id}
              className='relative flex flex-col space-y-4 border border-solid border-neutral-dark p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white'
            >
              <div className='flex justify-between items-center pb-2 border-b border-neutral-dark'>
                <h3 className='text-lg font-semibold text-text-secondary'>
                  Jornada {index + 1}
                </h3>
                {activeMarkTimeCount > 2 && (
                  <button
                    onClick={() => removeShift(shift.id)}
                    title='Remover esta jornada'
                    className='text-2xl text-red hover:text-hover-button transition-colors duration-200'
                  >
                    <PiMinusCircleFill />
                  </button>
                )}
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <DateTimeInput
                  name={`entry-${shift.id}`}
                  label='Horário de Entrada'
                  type='time'
                  value={shift.entry}
                  onChange={(_, value) =>
                    handleInputChange(shift.id, 'entry', value)
                  }
                  icon={<PiClockFill className='text-xl text-primary' />}
                />

                <DateTimeInput
                  name={`exit-${shift.id}`}
                  label='Horário de Saída'
                  type='time'
                  value={shift.exit}
                  onChange={(_, value) =>
                    handleInputChange(shift.id, 'exit', value)
                  }
                  icon={<PiClockFill className='text-xl text-primary' />}
                />
              </div>
            </div>
          ))}
        </div>

        <div className='flex items-center space-x-4 pt-4'>
          {activeMarkTimeCount < 10 && (
            <Button
              type='button'
              onClick={addShift}
              label='Adicionar Nova Jornada'
              icon={<PiPlusCircleFill className='text-xl' />}
              color='cancel'
              size='sm'
            />
          )}
          <Button
            type='submit'
            color='secondary'
            label={
              isSubmitting 
                ? 'Salvando...' 
                : isEditing 
                  ? 'Salvar Alterações' 
                  : 'Salvar Configuração de Escala'
            }
            size='md'
            disabled={isSubmitting}
          />
        </div>
      </form>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        message={alertMessage}
        type={alertType}
      />
    </div>
  );
}
