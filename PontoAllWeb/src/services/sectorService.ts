import GenericService from './genericService';
import { Sector } from '@/types/models/sector'; // Importe a interface

export default class SectorService extends GenericService<Sector> {
  constructor() {
    super('Sector'); // O nome do seu Controller
  }
}
