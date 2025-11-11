import { Department } from '@/types';
import generateGenericMethods from '@/utils/serviceUtils';

const genericMethods = generateGenericMethods<Department>('Department');

const DepartmentService = {
  ...genericMethods,
};

export default DepartmentService;