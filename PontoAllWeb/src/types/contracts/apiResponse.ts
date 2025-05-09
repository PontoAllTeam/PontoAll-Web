import { ApiResponseEnum } from '../enums';

/** Objeto padrão retornado pela WebAPI. */
export interface ApiResponse<T> {
  /** Código de status da resposta. */
  readonly code: ApiResponseEnum;

  /** Os dados da resposta. Pode ser nulo em caso de erro ou resposta sem conteúdo. */
  readonly data: T | null;

  /** Uma mensagem descritiva sobre o resultado da requisição. */
  readonly message: string;
}
