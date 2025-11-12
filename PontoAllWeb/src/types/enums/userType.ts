import { createEnumHelpers } from '@/utils/enumUtils';
import { EnumLabels } from '../app/enum';

export enum UserType {
  DIRECTOR = 1,
  MANAGER = 2,
  EMPLOYEE = 3,
}

// Definição dos rótulos
const labels: EnumLabels = {
  [UserType.DIRECTOR]: 'Diretor',
  [UserType.MANAGER]: 'Gerente',
  [UserType.EMPLOYEE]: 'Funcionário',
};

// Criação das funções auxiliares para esse enum
const { getEnumLabel, getEnumOptions } = createEnumHelpers(UserType, labels);

// Exportação das partes necessárias
// ATENÇÃO: as funções auxiliares devem ser exportadas com nomes diferentes para evitar conflito com outros enums
export {
  getEnumLabel as getUserTypeLabel,
  getEnumOptions as getUserTypeOptions,
};
