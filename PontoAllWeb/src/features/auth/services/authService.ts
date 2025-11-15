import { api } from '@/features/api';
import { Login, ServiceResult } from '@/types';
import { handleServiceError } from '@/utils/serviceUtils';
import { LoginResponse } from '@/types/app/loginResponse';

const AuthService = {
  login: async (credentials: Login): Promise<ServiceResult<LoginResponse>> => {
    try {
      const res = await api.post<LoginResponse>('User/Login', credentials);
      const loginResponse = res.data.data;

      if (!loginResponse) throw new Error('Login falhou');

      return {
        success: true,
        message: res.data.message,
        data: loginResponse,
      };
    } catch (error) {
      return handleServiceError(error);
    }
  },
};

export default AuthService;
