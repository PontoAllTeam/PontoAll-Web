import { lazy } from 'react';
import { createRoutes } from '@/utils/routesUtils';

const LoginPage = lazy(() => import('./pages/LoginPage'));

export const authRoutes = createRoutes({
  LOGIN: {
    path: '/login',
    displayName: 'Login',
    element: <LoginPage />,
  },
});
