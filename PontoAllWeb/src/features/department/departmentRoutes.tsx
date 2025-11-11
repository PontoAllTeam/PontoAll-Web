import { createRoutes } from '@/utils/routesUtils';
import DepartmentOverview from './pages/DepartmentOverview';

export const departmentRoutes = createRoutes({
  DEPARTMENT: {
    path: '/department',
    displayName: 'Departamentos',
    element: <DepartmentOverview />,
  },
});
