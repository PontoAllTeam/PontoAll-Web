import HeaderUser from './HeaderUser';
import HeaderNoUser from './HeaderNoUser';
import { useAuth } from '@/features/auth';

export default function Header() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <HeaderUser /> : <HeaderNoUser />;
}
