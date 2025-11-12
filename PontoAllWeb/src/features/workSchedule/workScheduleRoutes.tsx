import { createRoutes } from '@/utils/routesUtils';
import WorkScheduleOverview from './pages/WorkScheduleOverview';
import WorkScheduleForm from './pages/WorkScheduleForm';

export const workScheduleRoutes = createRoutes({
  WORK_SCHEDULE: {
    path: '/work-schedule',
    displayName: 'Escala de Trabalho',
    element: <WorkScheduleOverview />,
  },
  WORK_SCHEDULE_REGISTRATION: {
    path: '/work-schedule/registration',
    displayName: 'Cadastrar Escala',
    element: <WorkScheduleForm />,
  },
  WORK_SCHEDULE_EDIT: {
    path: '/work-schedule/edit/:id',
    displayName: 'Editar Escala',
    element: <WorkScheduleForm />,
  },
});
