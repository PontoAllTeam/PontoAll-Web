import { companyRoutes } from '@/features/company';
import { createRoutes } from '@/utils/routesUtils';

export const routesAntigo = {
  LANDING_PAGE: '/',
  LOGIN: '/login',
  OVERVIEW: '/overview',

  // Employee
  // Utilizar employee, pois da visão do usuário essa lista será para os funcionários que ele gerencia
  EMPLOYEE_OVERVIEW: '/employee/overview',

  // Sector
  SECTOR_OVERVIEW: '/sector/overview',

  // Department
  DEPARTMENT_OVERVIEW: '/department/overview',

  // WorkSchedule
  WORK_SCHEDULE_OVERVIEW: '/work_schedule/overview',
  WORK_SCHEDULE_REGISTRATION: '/work_schedule/create',
  WORK_SCHEDULE_UPDATE: '/work_schedule/update/:id',
};

const appRoutes = createRoutes({
  ACCESSIBILITY: {
    path: '/accessibility',
    displayName: 'Acessibilidade',
    element: <AccessibilityPage />,
  },
  LANDING: {
    displayName: 'Página Inicial',
    element: <LandingPage />,
    index: true,
    path: '',
  },
  ADMIN_OVERVIEW: {
    path: '/admin',
    displayName: 'Visão Geral',
    element: <AdminOverview />,
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
} as const;
