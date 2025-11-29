import { createRoutes } from '@/utils/routesUtils';
import GeofenceOverview from './pages/GeofenceOverview';

export const geofenceRoutes = createRoutes({
  GEOFENCE: {
    path: '/geofence',
    displayName: 'Cercas virtuais',
    element: <GeofenceOverview />,
  },
});

export default geofenceRoutes;
