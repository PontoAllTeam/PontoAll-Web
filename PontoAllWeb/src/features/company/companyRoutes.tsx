import { createRoutes } from '@/utils/routesUtils';
// import CompanyOverview from './pages/CompanyOverview';
import CompanyForm from './pages/CompanyForm';

export const companyRoutes = createRoutes({
  COMPANY: {
    path: '/company',
    displayName: 'Empresas',
    element: null, // <CompanyOverview />,
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
