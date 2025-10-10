/*
 Padrão para definição do nome das rotas comuns
 - /classe/overview -> Listagem geral
 - /classe/create -> Cadastro
 - /classe/update/:id -> Para páginas com formulários de atualização
 */
export const routes = {
  LANDING_PAGE: '/',
  LOGIN: '/login',
  OVERVIEW: '/overview',

  // Company
  COMPANY_REGISTRATION: '/company/create',

  // Employee
  // Utilizar employee, pois da visão do usuário essa lista será para os funcionários que ele gerencia
  EMPLOYEE_OVERVIEW: '/employee/overview',

  // Sector
  SECTOR_OVERVIEW: '/sector/overview',

  // Department
  DEPARTMENT_OVERVIEW: '/department/overview',

  // WorkSchedule
  WORK_SCHEDULE_OVERVIEW: '/work_schedule/overview',
  WORK_SCHEDULE_REGISTRATION: '/work_schedule/create',
  WORK_SCHEDULE_UPDATE: '/work_schedule/update/:id'
};
