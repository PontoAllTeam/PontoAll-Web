import Cookies from 'js-cookie';
import { api } from '@/features/api';
import { Login, ServiceResult } from '@/types';
import { handleServiceError } from '@/utils/serviceUtils';

const AuthService = {
  login: async (
    credentials: Login,
    rememberMe = false
  ): Promise<ServiceResult<string>> => {
    try {
      const res = await api.post('User/Login', credentials);

      const token = `${res.data.data}`;
      Cookies.set('auth_token', token, {
        expires: rememberMe ? 7 : undefined,
        secure: window.location.protocol === 'https:',
        sameSite: 'strict',
      });
      return {
        success: true,
        message: res.data.message,
        data: token,
      };
    } catch (error) {
      return handleServiceError(error);
    }
  },
};

export default AuthService;
