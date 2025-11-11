import GenericService from './genericService';
import { Sector } from '@/types/models/sector';

export default class SectorService extends GenericService<Sector> {
  constructor() {
    super('Sector');
  }
}
