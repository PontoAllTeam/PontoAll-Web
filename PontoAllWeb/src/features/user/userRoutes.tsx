import { createRoutes } from '@/utils/routesUtils';
import UserOverview from './pages/UserOverview';
import UserForm from './pages/UserForm';

export const userRoutes = createRoutes({
  USER: {
    path: '/user',
    displayName: 'Colaboradores',
    element: <UserOverview />,
  },
  USER_REGISTRATION: {
    path: '/user/registration',
    displayName: 'Cadastrar Colaborador',
    element: <UserForm />,
  },
  USER_EDIT: {
    path: '/user/edit/:id',
    displayName: 'Editar Colaborador',
    element: <UserForm />,
  },
});
