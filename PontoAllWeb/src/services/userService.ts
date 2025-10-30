import GenericService from './genericService';
import { ApiResponse, ApiResponseEnum, Login } from '@/types/contracts';
import { User } from '@/types/models';
import Cookies from 'js-cookie';
import apiClient from './apiClient';

export default class UserService extends GenericService<User> {
  constructor() {
    super('User');

    const token = Cookies.get('auth_token');
    if (token) {
      apiClient.setToken(token);
    }
  }

  async login(credentials: Login, rememberMe = false): Promise<void> {
    try {
      const response = await apiClient
        .getApi()
        .post<ApiResponse<string>>(`${this.url}/Login`, credentials);

      if (response.data.code !== ApiResponseEnum.SUCCESS || !response.data.data) {
        throw new Error(response.data.message || 'Falha no login');
      }

      const token = response.data.data as string;

      Cookies.set('auth_token', token, {
        expires: rememberMe ? 7 : undefined,
        secure: window.location.protocol === 'https:',
        sameSite: 'strict',
      });

      apiClient.setToken(token);
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    const response = await apiClient
      .getApi()
      .get<ApiResponse<User[]>>(`${this.url}`);

    if (response.data.code !== ApiResponseEnum.SUCCESS) {
      console.error('Erro ao buscar usuários:', response.data.message);
      return [];
    }

    return response.data.data as User[];
  }

  async createUser(user: User): Promise<void> {
    const response = await apiClient
      .getApi()
      .post<ApiResponse<User>>(this.url, user);

    if (response.data.code !== ApiResponseEnum.SUCCESS) {
      throw new Error((response.data.data as any)?.errorMessage || response.data.message);
    }
  }

  async updateUser(id: number, user: User): Promise<void> {
    const response = await apiClient
      .getApi()
      .put<ApiResponse<User>>(`${this.url}/${id}`, user);

    if (response.data.code !== ApiResponseEnum.SUCCESS) {
      throw new Error((response.data.data as any)?.errorMessage || response.data.message);
    }
  }

  async deleteUser(id: number): Promise<void> {
    const response = await apiClient
      .getApi()
      .delete<ApiResponse<null>>(`${this.url}/${id}`);

    if (response.data.code !== ApiResponseEnum.SUCCESS) {
      throw new Error((response.data.data as any)?.errorMessage || response.data.message);
    }
  }
}
