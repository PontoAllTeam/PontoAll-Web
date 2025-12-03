import { createRoutes } from '@/utils/routesUtils';
import TimeRecordOverview from './pages/TimeRecordOverview';

export const timeRecordRoutes = createRoutes({
  TIME_RECORD: {
    path: '/time-record',
    displayName: 'Registros de Ponto',
    element: <TimeRecordOverview />,
  },
});