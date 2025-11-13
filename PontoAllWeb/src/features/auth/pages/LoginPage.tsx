import logoPontoAll from '@/assets/images/logoPontoAll.svg';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import LoginForm from '../components/LoginForm';
import useAppRoutes from '@/hooks/useAppRoutes';

export default function LoginPage() {
  const navigate = useNavigate();
  const routes = useAppRoutes();

  const handleLogin = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    const res = await AuthService.login({ email, password }, rememberMe);

    if (res.success) {
      navigate(routes.USER.path);
    } else {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className='h-screen w-screen bg-background flex'>
      <div className='md:w-[45%] w-full h-full bg-neutral-light flex-col justify-center items-center hidden md:flex px-8'>
        <img
          src={logoPontoAll}
          alt='Logo do Sistema'
          className='w-full max-w-[350px]'
        />
        <h3 className='text-lg font-medium text-secondary'>
          Chegue, registre e trabalhe. <br />O futuro da marcação de ponto está
          aqui!
        </h3>
      </div>

      <div className='md:w-[55%] w-full bg-background flex flex-col justify-center items-center'>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
