import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseEnum } from '@/types';

interface RequestOptions {
  headers?: Record<string, string>;
}

export default class ApiService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para tratamento de erros globais (opcional)
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error('Erro na requisição:', error);
        // Aqui você pode tratar erros globais, como exibir uma mensagem genérica
        return Promise.reject(error);
      }
    );
  }

  private async handleResponse<T>(
    promise: Promise<AxiosResponse<T>>
  ): Promise<ApiResponse<T>> {
    try {
      const response = await promise;
      return {
        code:
          response.status >= 200 && response.status < 300
            ? ApiResponseEnum.SUCCESS
            : response.status,
        data: response.data,
        message: 'Sucesso', // Uma mensagem padrão de sucesso, pode ser customizada
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          code: error.response?.status || ApiResponseEnum.ERROR,
          data: null,
          message:
            error.response?.data?.message ||
            error.message ||
            'Erro na requisição',
        };
      } else {
        return {
          code: ApiResponseEnum.ERROR,
          data: null,
          message: 'Erro inesperado',
        };
      }
    }
  }

  public async get<T>(
    url: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.handleResponse<T>(this.api.get<T>(url, options));
  }

  public async post<T, D = any>(
    url: string,
    data?: D,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.handleResponse<T>(this.api.post<T>(url, data, options));
  }

  public async put<T, D = any>(
    url: string,
    data?: D,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.handleResponse<T>(this.api.put<T>(url, data, options));
  }

  public async delete<T>(
    url: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.handleResponse<T>(this.api.delete<T>(url, options));
  }
}
