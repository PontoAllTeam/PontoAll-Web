/*
 Padrão para definição do nome das rotas comuns
 - /classe/overview -> Listagem geral
 - /classe/create -> Cadastro
 - /classe/update/:id -> Para páginas com formulários de atualização
 */
export const routes = {
  LANDING_PAGE: '/',
  LOGIN: '/login',

  // Company
  COMPANY_REGISTRATION: '/company/create',

  // Employee
  // Utilizar employee, pois da visão do usuário essa lista será para os funcionários que ele gerencia
  EMPLOYEE_OVERVIEW: '/employee/overview',
};
