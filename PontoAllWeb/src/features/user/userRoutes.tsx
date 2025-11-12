import { createRoutes } from '@/utils/routesUtils';
import UserOverview from './pages/UserOverview';

export const userRoutes = createRoutes({
  USER: {
    path: '/user',
    displayName: 'Colaboradores',
    element: <UserOverview />,
  },
});
