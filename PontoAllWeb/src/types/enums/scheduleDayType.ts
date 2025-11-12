import { createEnumHelpers } from '@/utils/enumUtils';
import { EnumLabels } from '../app/enum';

export enum ScheduleDayType {
  HOLIDAY = 1,
  DAY_OFF = 2,
  VACATION = 3,
  BANKED_DAY_OFF = 4,
  LEAVE_OF_ABSENCE = 5,
  WORK_DAY = 6,
}

// Definição dos rótulos
const labels: EnumLabels = {
  [ScheduleDayType.HOLIDAY]: 'Feriado',
  [ScheduleDayType.DAY_OFF]: 'Folga',
  [ScheduleDayType.VACATION]: 'Férias',
  [ScheduleDayType.BANKED_DAY_OFF]: 'Banco de Horas',
  [ScheduleDayType.LEAVE_OF_ABSENCE]: 'Licença',
  [ScheduleDayType.WORK_DAY]: 'Dia de Trabalho',
};

// Criação das funções auxiliares para esse enum
const { getEnumLabel, getEnumOptions } = createEnumHelpers(
  ScheduleDayType,
  labels
);

// Exportação das partes necessárias
export {
  getEnumLabel as getScheduleDayTypeLabel,
  getEnumOptions as getScheduleDayTypeOptions,
};
