import Cookies from 'js-cookie';
import { api } from '@/features/api';
import { Login } from '@/types';

const AuthService = {
  login: async (credentials: Login, rememberMe = false): Promise<void> => {
    // try {
    //   const response = await api.post<Login>('User/Login', credentials);
    //   if (!response.data.success || !response.data.data) {
    //     throw new Error(response.data.message || 'Falha no login');
    //   }
    //   const token = response.data.data;
    //   Cookies.set('auth_token', token, {
    //     expires: rememberMe ? 7 : undefined,
    //     secure: window.location.protocol === 'https:',
    //     sameSite: 'strict',
    //   });
    // } catch (error) {
    //   console.error('Erro ao realizar login:', error);
    //   throw error;
    // }
  },
};

export default AuthService;
