import logoPontoAll from '@/assets/images/logoPontoAll.svg';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    try {
      await AuthService.login({ email, password }, rememberMe);
      navigate('/user');
    } catch (error) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
      console.error(error);
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
