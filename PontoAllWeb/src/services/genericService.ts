import { ApiResponse, ApiResponseEnum } from '@/types';
import { AxiosInstance } from 'axios';
import apiClient from './apiClient';

export default abstract class GenericService<T> {
  private readonly api: AxiosInstance;
  protected readonly url: string;

  constructor(modelName: string) {
    this.api = apiClient.getApi();
    this.url = `/${modelName}`;
  }

  public async getAll(): Promise<ApiResponse<T[]>> {
    return await this.api
      .get<ApiResponse<T[]>>(this.url)
      .then((res) => res.data)
      .catch((err) => {
        if (err.response) {
          return err.response.data;
        } else {
          return {
            code: ApiResponseEnum.ERROR,
            data: {
              errorMessage: String(err),
            },
            message: 'Ocorreu um erro desconhecido ao listar',
          };
        }
      });
  }

  public async getById(id: number): Promise<ApiResponse<T>> {
    if (!id) {
      return {
        code: ApiResponseEnum.INVALID,
        data: null,
        message: 'Dados inválidos',
      };
    }

    return await this.api
      .get<ApiResponse<T>>(this.url + `/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        if (err.response) {
          return err.response.data;
        } else {
          return {
            code: ApiResponseEnum.ERROR,
            data: {
              errorMessage: String(err),
            },
            message: 'Ocorreu um erro desconhecido ao listar pelo id',
          };
        }
      });
  }

  public async create(entity: T): Promise<ApiResponse<T>> {
    if (!entity) {
      return {
        code: ApiResponseEnum.INVALID,
        data: null,
        message: 'Dados inválidos',
      };
    }

    return await this.api
      .post<ApiResponse<T>>(this.url, entity)
      .then((res) => res.data)
      .catch((err) => {
        if (err.response) {
          return err.response.data;
        } else {
          return {
            code: ApiResponseEnum.ERROR,
            data: {
              errorMessage: String(err),
            },
            message: 'Ocorreu um erro desconhecido ao cadastrar',
          };
        }
      });
  }

  public async update(id: number, entity: T): Promise<ApiResponse<T>> {
    if (!id || !entity) {
      return {
        code: ApiResponseEnum.INVALID,
        data: null,
        message: 'Dados inválidos',
      };
    }

    return await this.api
      .put<ApiResponse<T>>(this.url + `/${id}`, entity)
      .then((res) => res.data)
      .catch((err) => {
        if (err.response) {
          return err.response.data;
        } else {
          return {
            code: ApiResponseEnum.ERROR,
            data: {
              errorMessage: String(err),
            },
            message: 'Ocorreu um erro desconhecido ao atualizar',
          };
        }
      });
  }

  public async remove(id: number): Promise<ApiResponse<T>> {
    if (!id) {
      return {
        code: ApiResponseEnum.INVALID,
        data: null,
        message: 'Dados inválidos',
      };
    }

    return await this.api
      .delete<ApiResponse<T>>(this.url + `/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        if (err.response) {
          return err.response.data;
        } else {
          return {
            code: ApiResponseEnum.ERROR,
            data: {
              errorMessage: String(err),
            },
            message: 'Ocorreu um erro desconhecido ao remover',
          };
        }
      });
  }
}
