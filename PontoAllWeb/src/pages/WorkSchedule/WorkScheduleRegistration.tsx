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
import { WorkSchedule } from '@/types/models';
import { ScheduleDayType } from '@/types/enums';
import { routes } from '@/routes/routes';

export default function WorkScheduleRegistration() {
  const [shifts, setShifts] = useState([
    { id: Date.now(), entry: '', exit: '' },
  ]);

  // Estado para controle visual (começa desligado)
  const [useBankOfHours, setUseBankOfHours] = useState(false);

  /*
  //Dados para edição
  const [dayOfMonth, setDayOfMonth] = useState<number>(0);
  const [yearMonth, setYearMonth] = useState<number>(0);
  const [dayType, setDayType] = useState<ScheduleDayType | "">("");
  const [pick1, setPick1] = useState<Date | null | "">("");
  const [pick2, setPick2] = useState<Date | null | "">("");
  const [pick3, setPick3] = useState<Date | undefined>(undefined);
  const [pick4, setPick4] = useState<Date | undefined>(undefined);
  const [pick5, setPick5] = useState<Date | undefined>(undefined);
  const [pick6, setPick6] = useState<Date | undefined>(undefined);
  const [pick7, setPick7] = useState<Date | undefined>(undefined);
  const [pick8, setPick8] = useState<Date | undefined>(undefined);
  const [pick9, setPick9] = useState<Date | undefined>(undefined);
  const [pick10, setPick10] = useState<Date | undefined>(undefined);

  const fetchWorkSchedule = useCallback(
    async (productId: string) => {
      const workScheduleService = new WorkScheduleService();
      const res = await workScheduleService.getById(Number(id));
      if (res.code === 200 && res.data) {
        const p = res.data.data;
        setDayOfMonth(p.dayOfMonth);
        setYearMonth(p.yearMonth);
        setDayType(p.dayType);
        setPick1(p.pick1);
        setPick2(p.pick2);
        setPick3(p.pick3);
        setPick4(p.pick4);
        setPick5(p.pick5);
        setPick6(p.pick6);
        setPick7(p.pick7);
        setPick8(p.pick8);
        setPick9(p.pick9);
        setPick10(p.pick10);
      } else {
        alert("Escala não encontrada!");
        navigate(routes.WORK_SCHEDULE_OVERVIEW);
      }
    },
    [navigate]
  ); // navigate é uma dependência que não muda, mas é boa prática incluir
*/

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
        {/* --- Seção: Dados Gerais da Escala (Campos de Select/Input) --- */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white rounded-lg shadow'>
          {/* Campo: Departamento */}
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

          {/* Campo: Setor */}
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

          {/* Campo: Funcionário */}
          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='employee'
              className='text-sm font-light text-text-primary'
            >
              Funcionário
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

          {/* Campo: Tipo de Dia */}
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

          {/* Campo: Data de Início */}
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

          {/* Campo: Data Final */}
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

        {/* --- SEÇÃO: Configuração Destacada de Banco de Horas (ULTRA PROFISSIONAL) --- */}
        <div className='p-6 bg-white rounded-lg shadow border border-primary/10 transition-all duration-300 hover:shadow-lg'>
          {/* Título da Seção Separado */}
          <div className='flex items-center space-x-3 border-b pb-3 mb-4 border-neutral-dark/20'>
            <PiBankFill className='text-2xl text-accent' />
            <h2 className='text-xl font-bold text-text-secondary'>
              Configuração de Compensação de Horas
            </h2>
          </div>

          {/* 🚨 BLOCÃO DO TOGGLE (Label Completa para UX) 🚨 */}
          <label
            htmlFor='bank-hours-toggle'
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              // Fundo levemente colorido quando ATIVO para feedback visual
              useBankOfHours ? 'bg-primary/5' : 'hover:bg-gray-50'
            }`}
          >
            {/* Conteúdo Esquerdo (Título e Descrição) */}
            <div className='flex flex-col space-y-1 w-full max-w-lg'>
              <div className='flex items-center space-x-2'>
                {/* Rótulo Principal (Feedback dinâmico) */}
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

              {/* Descrição Didática (Borda sutil para estilo) */}
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

            {/* Conteúdo Direito (Botão Toggle) */}
            <div className='flex-shrink-0 relative'>
              <input
                type='checkbox'
                id='bank-hours-toggle'
                className='sr-only'
                checked={useBankOfHours}
                onChange={toggleBankOfHours}
              />
              <div
                // CONTAINER DO TOGGLE: Tamanho profissional (w-14 h-8)
                className={`block w-14 h-8 rounded-full transition duration-300 ease-in-out ${
                  useBankOfHours ? 'bg-primary' : 'bg-gray-300'
                }`}
              ></div>
              <div
                // CÍRCULO (DOT): Tamanho suave (w-6 h-6)
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition duration-300 ease-in-out transform shadow-md ${
                  useBankOfHours
                    ? 'translate-x-6 border border-primary/50'
                    : 'translate-x-0 border border-gray-400'
                }`}
              ></div>
            </div>
          </label>
        </div>
        {/* --- Fim da Seção Banco de Horas --- */}

        {/* === Bloco de Marcação de Horários de Turno === */}
        <div className='flex flex-col space-y-6'>
          {/* Título e Descrição */}
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
                {/* Horário de Entrada */}
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

                {/* Horário de Saída */}
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

        {/* --- Botões de Ação --- */}
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
