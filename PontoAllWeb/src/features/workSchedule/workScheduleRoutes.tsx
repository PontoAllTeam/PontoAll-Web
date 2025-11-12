import { createRoutes } from '@/utils/routesUtils';
import WorkScheduleOverview from './pages/WorkScheduleOverview';
import WorkScheduleForm from './pages/WorkScheduleForm';

export const workScheduleRoutes = createRoutes({
  WORK_SCHEDULE_OVERVIEW: {
    path: '/work-schedule',
    displayName: 'Escala de Trabalho',
    element: <WorkScheduleOverview />,
  },
  WORK_SCHEDULE_FORM: {
    path: '/work-schedule/form',
    displayName: 'Formulário de Escala',
    element: <WorkScheduleForm />,
  },
});
