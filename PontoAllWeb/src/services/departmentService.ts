import GenericService from './genericService';
import { Department } from '@/types/models/department'; // Importe a interface

export default class DepartmentService extends GenericService<Department> {
  constructor() {
    super('Department'); // O nome do seu Controller
  }
}
