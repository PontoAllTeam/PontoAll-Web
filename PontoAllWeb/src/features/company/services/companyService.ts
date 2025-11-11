import { Company } from '@/types';
import generateGenericMethods from '@/utils/serviceUtils';

const genericMethods = generateGenericMethods<Company>('Company');

const CompanyService = {
  ...genericMethods,
};

export default CompanyService;
