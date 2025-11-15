import { Login, ServiceResult, User } from '@/types';
import { LoginResponse } from '@/types/app/loginResponse';
import { createContext } from 'react';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    credentials: Login,
    rememberMe?: boolean
  ) => Promise<ServiceResult<LoginResponse>>;
  logout: () => ServiceResult<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
