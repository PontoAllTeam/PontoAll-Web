import { Sector } from '@/types';
import generateGenericMethods from '@/utils/serviceUtils';

const genericMethods = generateGenericMethods<Sector>('Sector');

const SectorService = {
  ...genericMethods,
};

export default SectorService;
