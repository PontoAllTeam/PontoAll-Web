import { createRoutes } from '@/utils/routesUtils';
import CompanyForm from './pages/CompanyForm';

export const companyRoutes = createRoutes({
  COMPANY: {
    path: '/company',
    displayName: 'Empresas',
    element: null,
  },
  COMPANY_REGISTRATION: {
    path: '/company/registration',
    displayName: 'Cadastrar Empresa',
    element: <CompanyForm />,
  },
  COMPANY_EDIT: {
    path: '/company/edit/:id',
    displayName: 'Editar Empresa',
    element: <CompanyForm />,
  },
});
