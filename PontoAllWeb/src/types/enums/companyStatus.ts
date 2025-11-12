import { createEnumHelpers } from '@/utils/enumUtils';
import { EnumLabels } from '../app/enum';

export enum CompanyStatus {
  ACTIVE = 1,
  SUSPENDED = 2,
  INACTIVE = 3,
}

// Definição dos rótulos
export const labels: EnumLabels = {
  [CompanyStatus.ACTIVE]: 'Ativo',
  [CompanyStatus.SUSPENDED]: 'Suspenso',
  [CompanyStatus.INACTIVE]: 'Inativo',
};

// Criação das funções auxiliares para esse enum
const { getEnumLabel, getEnumOptions } = createEnumHelpers(
  CompanyStatus,
  labels
);

// Exportação das partes necessárias
export {
  getEnumLabel as getCompanyStatusLabel,
  getEnumOptions as getCompanyStatusOptions,
};
