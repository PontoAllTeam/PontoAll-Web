import { companyRoutes } from '@/features/company';
import { departmentRoutes } from '@/features/department';
import { sectorRoutes } from '@/features/sector';
import { userRoutes } from '@/features/user';
import { workScheduleRoutes } from '@/features/workSchedule';
import { authRoutes } from '@/features/auth';
import { createRoutes } from '@/utils/routesUtils';
import LandingPage from '@/pages/LandingPage';
import Registrations from '@/pages/Registrations';
import { geofenceRoutes } from '@/features/geofence';
import { timeRecordRoutes } from '@/features/timeRecord';

const appRoutes = createRoutes({
  LANDING: {
    displayName: 'Página Inicial',
    element: <LandingPage />,
    index: true,
    path: '',
  },
  OVERVIEW: {
    path: '/overview',
    displayName: 'Visão Geral',
    element: null,
  },
  REGISTRATIONS: {
    path: '/registrations',
    displayName: 'Cadastros',
    element: <Registrations />,
  },
});

// É a união de todas as definições de rotas da aplicação
export const routes = {
  ...appRoutes,
  ...companyRoutes,
  ...departmentRoutes,
  ...sectorRoutes,
  ...userRoutes,
  ...workScheduleRoutes,
  ...authRoutes,
  ...geofenceRoutes,
  ...timeRecordRoutes,
} as const;
