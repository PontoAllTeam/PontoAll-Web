import GenericService from './genericService';
import { Company } from '@/types';

export default class CompanyService extends GenericService<Company> {
  constructor() {
    super('Company');
  }
}
