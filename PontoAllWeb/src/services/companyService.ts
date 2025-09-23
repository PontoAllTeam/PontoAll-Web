import GenericService from './genericService';
import { Company } from '@/types/models';

export default class CompanyService extends GenericService<Company> {
  constructor() {
    super('Company');
  }
}
