/** Representa um objeto com informações de erro da api */
export interface ApiError {
  /** Descrição do erro que ocorreu */
  errorMessage: string;

  /** Pilha de chamadas que desencadearam o erro */
  stackTrace?: string;
}
