import { createRoutes } from '@/utils/routesUtils';
import SectorOverview from './pages/SectorOverview';

export const sectorRoutes = createRoutes({
  SECTOR: {
    path: '/sector',
    displayName: 'Setores',
    element: <SectorOverview />,
  },
});
