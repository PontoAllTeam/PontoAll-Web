import AccessibilityBar from './AccessibilityBar';
import logoPontoAll from '@/assets/images/logoPontoAll.svg';
import useAppRoutes from '@/hooks/useAppRoutes';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const routes = useAppRoutes();

  const LoginPage = () => {
    navigate(routes.LOGIN.path);
  };

  return (
    <header className='w-full z-[5]'>
      <AccessibilityBar />
      <div className='bg-white flex items-center justify-between h-12 shadow z-10 w-full'>
        <div className='w-full px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between'>
          <img
            src={logoPontoAll}
            alt='logo do sistema'
            className='h-full object-cover'
          />
          <button
            className='bg-secondary hover:bg-accent text-white text-sm font-medium py-2 px-6 rounded-full transition duration-300 shadow-md'
            onClick={LoginPage}
          >
            Entrar
          </button>
        </div>
      </div>
    </header>
  );
}
