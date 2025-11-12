import { createEnumHelpers } from '@/utils/enumUtils';
import { EnumLabels } from '../app/enum';

export enum UserStatus {
  ACTIVE = 1,
  LEAVE_OF_ABSENCE = 2,
  SUSPENDED = 3,
  INACTIVE = 4,
}

// Definição dos rótulos
export const labels: EnumLabels = {
  [UserStatus.ACTIVE]: 'Ativo',
  [UserStatus.LEAVE_OF_ABSENCE]: 'Licença',
  [UserStatus.SUSPENDED]: 'Suspenso',
  [UserStatus.INACTIVE]: 'Inativo',
};

// Criação das funções auxiliares para esse enum
const { getEnumLabel, getEnumOptions } = createEnumHelpers(UserStatus, labels);

// Exportação das partes necessárias
export {
  getEnumLabel as getUserStatusLabel,
  getEnumOptions as getUserStatusOptions,
};
