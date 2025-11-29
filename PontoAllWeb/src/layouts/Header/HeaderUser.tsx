import { useAuth } from '@/features/auth';
import miniLogo from '@/assets/images/miniLogo.svg';
import { useNavigate } from 'react-router-dom';
import useAppRoutes from '@/hooks/useAppRoutes';

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const routes = useAppRoutes();

  const handleLogout = () => {
    logout();
    navigate(routes.LANDING.path);
  };

  return (
    <header className='w-full z-[5]'>
      <div className='bg-white flex items-center justify-between h-12 shadow z-10 w-full'>
        <div className='w-full px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between'>
          <img
            src={miniLogo}
            alt='logo do sistema'
            className='h-8 aspect-square'
          />
          <button
            className='bg-secondary hover:bg-accent text-white text-sm font-medium py-1 px-6 rounded-full transition duration-300 shadow-md'
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
