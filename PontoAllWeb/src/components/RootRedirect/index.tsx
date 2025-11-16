import { Navigate } from 'react-router-dom';
import useAuth from '@/features/auth/hooks/useAuth';
import useAppRoutes from '@/hooks/useAppRoutes';

export default function RootRedirect() {
  const { isAuthenticated } = useAuth();
  const routes = useAppRoutes();

  return (
    <Navigate
      to={isAuthenticated ? routes.OVERVIEW.path : routes.LANDING.path}
      replace
    />
  );
}
