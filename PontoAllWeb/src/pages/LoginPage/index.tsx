import logoPontoAll from '@/assets/images/logoPontoAll.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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
        <form className='w-[90%] md:max-w-[600px] bg-white rounded-lg shadow-md border border-background p-8'>
          <h1 className='text-text-secondary font-semibold text-2xl'>
            Realizar login
          </h1>
          <h3 className='text-text-primary text-base'>Bem-vindo de volta!</h3>
          <div className='mb-4'>
            <label className='block text-text-secondary text-sm font-semibold mt-5 break-all'>
              E-mail
            </label>
            <input
              type='text'
              className='w-full h-10 py-2 p-2 text-sm text-text-primary rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              placeholder='Digite seu e-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-4 relative'>
            <label className='block text-text-secondary text-sm font-semibold mt-5 break-all'>
              Senha
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className='w-full h-10 py-2 pl-4 pr-10 text-sm text-text-primary rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              placeholder='Digite sua senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 bottom-3 text-text-primary cursor-pointer'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className='w-full text-right mt-3'>
            <a
              href=''
              className='text-text-primary text-sm underline hover:text-secondary'
            >
              Esqueci minha senha
            </a>
          </div>
          <div className='w-full mt-4'>
            <label className='flex items-center space-x-2 text-sm text-secondary'>
              <input
                type='checkbox'
                className='form-checkbox h-4 w-4 accent-secondary'
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Lembrar minha conta</span>
            </label>
          </div>
          <div className='w-full mt-6'>
            <button
              type='submit'
              className='w-full bg-secondary text-white py-2 rounded-md font-semibold hover:bg-secondary-dark transition-colors hover:bg-hover-button'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
