import GenericService from './genericService';
import { ApiResponse, Login } from '@/types/contracts';
import { User } from '@/types/models';
import Cookies from 'js-cookie';
import apiClient from './apiClient';

export default class UserService extends GenericService<User> {
  constructor() {
    super('User');

    // Recupera token salvo em cookie (caso o usuário já tenha logado antes)
    const token = Cookies.get('auth_token');
    if (token) {
      apiClient.setToken(token);
    }
  }

  async login(credentials: Login, rememberMe = false): Promise<void> {
    try {
      // Usa apiClient para fazer o login
      const response = await apiClient
        .getApi()
        .post<ApiResponse<string>>(this.url + '/Login', credentials);
      const token = response.data.data;

      if (!token || typeof token !== 'string') throw new Error();

      // Salva token em cookie
      Cookies.set('auth_token', token, {
        expires: rememberMe ? 7 : undefined,
        secure: window.location.protocol === 'https:',
        sameSite: 'strict',
      });

      // Define o token globalmente em TODAS as requests
      apiClient.setToken(token);
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      throw error;
    }
  }

  logout(): void {
    Cookies.remove('auth_token');
    apiClient.removeToken();
  }
}
