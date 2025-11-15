import { Login, ServiceResult, User } from '@/types';
import { ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { AuthService } from '@/features/auth';
import AuthContext from './AuthContext';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials: Login, rememberMe = false) => {
    const res = await AuthService.login(credentials);
    const loginResponse = res.data;

    if (res.success && loginResponse) {
      Cookies.set('auth_token', loginResponse.token, {
        expires: rememberMe ? 7 : undefined,
        secure: window.location.protocol === 'https:',
        sameSite: 'strict',
      });

      setUser(loginResponse.user);
      setIsAuthenticated(true);
    }

    return res;
  };

  const logout = () => {
    Cookies.remove('auth_token');
    setUser(null);
    setIsAuthenticated(false);

    const res: ServiceResult<void> = {
      message: 'Logout realizado com sucesso',
      success: true,
    };

    return res;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
