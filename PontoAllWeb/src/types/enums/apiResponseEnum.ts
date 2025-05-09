/** Enumeração representando os códigos de status da resposta da WebAPI. */
export enum ApiResponseEnum {
  /** Indica que a requisição foi bem-sucedida. */
  SUCCESS = 1,

  /** Indica que a requisição era inválida, geralmente devido a erros de validação. */
  INVALID = 2,

  /** Indica que o recurso solicitado não foi encontrado. */
  NOT_FOUND = 3,

  /** Indica que a requisição não pôde ser concluída devido a um conflito com o estado atual do recurso. */
  CONFLICT = 4,

  /** Indica que o cliente não está autorizado a acessar o recurso. */
  UNAUTHORIZED = 5,

  /** Indica que ocorreu um erro genérico no servidor ao processar a requisição. */
  ERROR = 6,
}
