import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';
import { useState } from 'react';
import { DateTimeInput, SelectInput } from '@/components/FormControls';
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
  getScheduleDayTypeOptions,
  ScheduleDayType,
  WorkSchedule,
} from '@/types';
import useFormData from '@/hooks/useFormData';

export default function WorkScheduleForm() {
  const { data, setData, updateField } = useFormData<WorkSchedule>({
    id: 0,
    dayOfMonth: 1,
    yearMonth: '2025/01',
    dayType: ScheduleDayType.WORK_DAY,
    markTime1: '00:00:00',
    markTime2: '00:00:00',
    userId: 0,
    geofenceId: 0,
  });

  // Estados para filtragem
  const [selectedDepartment, setSelectedDepartment] = useState<number>(0);
  const [selectedSector, setSelectedSector] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const [useBankOfHours, setUseBankOfHours] = useState(false);
  const [activeMarkTimeCount, setActiveMarkTimeCount] = useState(2);

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
      [`markTime${markTimeIndex}`]: value,
    });
  };

  const toggleBankOfHours = () => {
    setUseBankOfHours((prev) => !prev);
  };

  const handleSubmit = async () => {
    console.log(data);
    console.log(startDate);
    console.log(endDate);
  };

  return (
    <div className='p-10 h-full bg-gray-50'>
      <PageTitle title='Adicionar Escala de Trabalho' />

      <form
        className='flex flex-col space-y-8 mt-6'
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white rounded-lg shadow'>
          <div className='flex flex-col space-y-2'>
            <SelectInput
              name='department'
              label='Departamento'
              value={selectedDepartment}
              onChange={(_, value) => setSelectedDepartment(Number(value))}
              options={[{ label: 'Todos', value: 0 }]}
              icon={<PiUsersFourFill className='text-xl text-primary' />}
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <SelectInput
              name='sector'
              label='Setor'
              value={selectedSector}
              onChange={(_, value) => setSelectedSector(Number(value))}
              options={[{ label: 'Todos', value: 0 }]}
              icon={<PiUsersFill className='text-xl text-primary' />}
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <SelectInput<WorkSchedule>
              name='userId'
              label='Colaborador(es)'
              value={data.userId}
              onChange={updateField}
              options={[{ label: 'Todos', value: 0 }]}
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
              label='Data de Início da Escala'
              type='date'
              value={startDate}
              onChange={(_, value) => setStartDate(value)}
              error={
                new Date(endDate) < new Date(startDate)
                  ? 'A data de início não pode ser depois da data final'
                  : undefined
              }
              icon={<PiCalendarFill className='text-xl text-primary' />}
            />
          </div>

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
                <div className='flex flex-col space-y-2'>
                  <label className='text-sm font-light text-text-primary'>
                    Horário de Entrada
                  </label>
                  <div className='flex items-center space-x-2'>
                    <PiClockFill className='text-xl text-primary' />
                    <input
                      type='time'
                      placeholder='HH:MM'
                      value={shift.entry}
                      onChange={(e) =>
                        handleInputChange(shift.id, 'entry', e.target.value)
                      }
                      className='p-2 bg-white block w-full border border-neutral-dark rounded-md focus:border-text-primary sm:text-sm'
                    />
                  </div>
                </div>

                <div className='flex flex-col space-y-2'>
                  <label className='text-sm font-light text-text-primary'>
                    Horário de Saída
                  </label>
                  <div className='flex items-center space-x-2'>
                    <PiClockFill className='text-xl text-primary' />
                    <input
                      type='time'
                      placeholder='HH:MM'
                      value={shift.exit}
                      onChange={(e) =>
                        handleInputChange(shift.id, 'exit', e.target.value)
                      }
                      className='p-2 bg-white block w-full border border-neutral-dark rounded-md focus:border-text-primary sm:text-sm'
                    />
                  </div>
                </div>
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
            color={'secondary'}
            label={'Salvar Configuração de Escala'}
            size='md'
          />
        </div>
      </form>
    </div>
  );
}
