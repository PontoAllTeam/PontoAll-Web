import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';
import { useState } from 'react';
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

export default function WorkScheduleForm() {
  const [shifts, setShifts] = useState([
    { id: Date.now(), entry: '', exit: '' },
  ]);

  const [useBankOfHours, setUseBankOfHours] = useState(false);

  const addShift = () => {
    if (shifts.length < 5) {
      setShifts((prevShifts) => [
        ...prevShifts,
        { id: Date.now(), entry: '', exit: '' },
      ]);
    }
  };

  const removeShift = (idToRemove: number) => {
    if (shifts.length > 1) {
      setShifts((prevShifts) =>
        prevShifts.filter((shift) => shift.id !== idToRemove)
      );
    }
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift) =>
        shift.id === id ? { ...shift, [field]: value } : shift
      )
    );
  };

  const toggleBankOfHours = () => {
    setUseBankOfHours((prev) => !prev);
  };

  return (
    <div className='p-10 h-full bg-gray-50'>
      <PageTitle title='Adicionar Escala de Trabalho' />

      <div className='flex flex-col space-y-8 mt-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white rounded-lg shadow'>
          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='department'
              className='text-sm font-light text-text-primary'
            >
              Departamento
            </label>
            <div className='flex items-center space-x-2'>
              <PiUsersFourFill className='text-xl text-primary' />
              <select
                id='department'
                className='p-2 bg-white block w-full border border-neutral-dark rounded-md focus:border-text-primary sm:text-sm'
              >
                <option>Selecione</option>
              </select>
            </div>
          </div>

          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='sector'
              className='text-sm font-light text-text-primary'
            >
              Setor
            </label>
            <div className='flex items-center space-x-2'>
              <PiUsersFill className='text-xl text-primary' />
              <select
                id='sector'
                className='p-2 bg-white block w-full border border-neutral-dark rounded-md focus:border-text-primary sm:text-sm'
              >
                <option>Selecione</option>
              </select>
            </div>
          </div>

          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='employee'
              className='text-sm font-light text-text-primary'
            >
              Colaborador
            </label>
            <div className='flex items-center space-x-2'>
              <PiUserFill className='text-xl text-primary' />
              <select
                id='employee'
                className='p-2 bg-white block w-full border border-neutral-dark rounded-md focus:border-text-primary sm:text-sm'
              >
                <option>Selecione</option>
              </select>
            </div>
          </div>

          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='day-type'
              className='text-sm font-light text-text-primary'
            >
              Tipo de Dia
            </label>
            <div className='flex items-center space-x-2'>
              <PiCalendarStarFill className='text-xl text-primary' />
              <select
                id='day-type'
                className='p-2 bg-white block w-full border border-neutral-dark rounded-md focus:border-text-primary sm:text-sm'
              >
                <option>Selecione</option>
              </select>
            </div>
          </div>

          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='start-date'
              className='text-sm font-light text-text-primary'
            >
              Data de Início da Escala
            </label>
            <div className='flex items-center space-x-2'>
              <PiCalendarFill className='text-xl text-primary' />
              <input
                type='date'
                id='start-date'
                className='p-2 bg-white block w-full border border-neutral-dark rounded-md focus:border-text-primary sm:text-sm'
              />
            </div>
          </div>

          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='end-date'
              className='text-sm font-light text-text-primary'
            >
              Data Final da Escala
            </label>
            <div className='flex items-center space-x-2'>
              <PiCalendarFill className='text-xl text-primary' />
              <input
                type='date'
                id='end-date'
                className='p-2 bg-white block w-full border border-neutral-dark rounded-md focus:border-text-primary sm:text-sm'
              />
            </div>
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
                {shifts.length > 1 && (
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
          {shifts.length < 5 && (
            <Button
              onClick={addShift}
              label='Adicionar Nova Jornada'
              icon={<PiPlusCircleFill className='text-xl' />}
              color='cancel'
              size='sm'
            />
          )}
          <Button
            onClick={() => console.log('Salvar Configuração de Escala')}
            color={'secondary'}
            label={'Salvar Configuração de Escala'}
            size='md'
          />
        </div>
      </div>
    </div>
  );
}
