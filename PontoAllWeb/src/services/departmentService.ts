import GenericService from './genericService';
import { Department } from '@/types/models/department';

export default class DepartmentService extends GenericService<Department> {
  constructor() {
    super('Department');
  }
}
