import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import useFormData from '@/hooks/useFormData';
import { Login } from '@/types';
import { TextInput } from '@/components/FormControls';

interface LoginFormProps {
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, updateField } = useFormData<Login>({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(() => true);
    onSubmit(data.email, data.password, rememberMe);
    setIsSubmitting(() => false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-[90%] md:max-w-[600px] bg-white rounded-lg shadow-md border border-background p-8'
    >
      <h1 className='text-text-secondary font-semibold text-2xl'>
        Realizar login
      </h1>
      <h3 className='text-text-primary text-base'>Bem-vindo de volta!</h3>

      <div className='mb-4'>
        <TextInput<Login>
          label='E-mail'
          name='email'
          placeholder='Digite seu e-mail'
          value={data.email}
          onChange={updateField}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className='mb-4 relative'>
        <TextInput<Login>
          type={showPassword ? 'text' : 'password'}
          label='Senha'
          name='password'
          placeholder='Digite sua senha'
          value={data.password}
          onChange={updateField}
          disabled={isSubmitting}
          required
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
          href='#'
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
  );
}
