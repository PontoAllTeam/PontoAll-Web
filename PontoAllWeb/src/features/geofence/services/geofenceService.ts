import { Geofence } from '@/types';
import generateGenericMethods from '@/utils/serviceUtils';

const genericMethods = generateGenericMethods<Geofence>('Geofence');

const GeofenceService = {
  ...genericMethods,
};

export default GeofenceService;
