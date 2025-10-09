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
} from 'react-icons/pi';

export default function WorkScheduleRegistration() {
    const [shifts, setShifts] = useState([
        { id: Date.now(), entry: '', exit: '' },
    ]);

    const addShift = () => {
        if (shifts.length < 5) {
            setShifts((prevShifts) => [
                ...prevShifts,
                { id: Date.now(), entry: '', exit: '' },
            ]);
            setIsSaved(false);
        }
    };

    const removeShift = (idToRemove) => {
        if (shifts.length > 1) {
            setShifts((prevShifts) =>
                prevShifts.filter((shift) => shift.id !== idToRemove)
            );
            setIsSaved(false);
        }
    };

    const handleInputChange = (id, field, value) => {
        setShifts((prevShifts) =>
            prevShifts.map((shift) =>
                shift.id === id ? { ...shift, [field]: value } : shift
            )
        );
        setIsSaved(false);
    };

    // FUNÇÃO DE SALVAMENTO ATUALIZADA
    const handleSave = () => {
        const isFormValid = shifts.every((shift) => shift.entry && shift.exit);
        const HOME_PAGE = '/escalas'; // 👈 DEFINE O CAMINHO DA PÁGINA PRINCIPAL

        if (isFormValid) {
            console.log('Dados a serem enviados:', {
                shifts,
            });

            // 1. Dá feedback de sucesso
            setIsSaved(true);

            // 2. Redireciona após 1 segundo (para o usuário ver o feedback)
            setTimeout(() => {
                router.push(HOME_PAGE);
            }, 1000); // 1000ms = 1 segundo de espera

        } else {
            alert(
                'Por favor, preencha todos os horários de Entrada e Saída das jornadas.'
            );
        }
    };

    return (
        <div className='p-10 h-full bg-gray-50'>
            <PageTitle title='Adicionar Escala de Trabalho' />

            <div className='flex flex-col space-y-8 mt-6'>
                {/* --- Seção: Dados Gerais da Escala --- */}
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
                {/* --- Separador Visual --- */}
                <hr className='border-neutral-dark mt-4' />
                {/* === Bloco de Marcação de Horários de Turno (Refatorado) === */}
                <div className='flex flex-col space-y-6'>
                    {/* Título e Descrição Didática e Sofisticada */}
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
                        onClick={handleSave}
                        color={'secondary'}
                        label={'Salvar Configuração de Escala'}
                        size='md'
                    />
                </div>
            </div>
        </div>
    );
}
