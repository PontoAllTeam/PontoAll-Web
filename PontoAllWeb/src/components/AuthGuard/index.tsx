import { Navigate } from 'react-router-dom';
import useAuth from '@/features/auth/hooks/useAuth';
import useAppRoutes from '@/hooks/useAppRoutes';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth: boolean;
}

export default function AuthGuard({ children, requireAuth }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const routes = useAppRoutes();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={routes.LOGIN.path} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to={routes.OVERVIEW.path} replace />;
  }

  return <>{children}</>;
}
