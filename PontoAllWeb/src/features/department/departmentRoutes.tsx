import { createRoutes } from '@/utils/routesUtils';
// import DepartmentOverview from './pages/DepartmentOverview';
import DepartmentForm from './pages/DepartmentForm';

export const departmentRoutes = createRoutes({
  DEPARTMENT: {
    path: '/department',
    displayName: 'Departamentos',
    element: null, // <DepartmentOverview />,
  },
  DEPARTMENT_REGISTRATION: {
    path: '/department/registration',
    displayName: 'Cadastrar Departamento',
    element: <DepartmentForm />,
  },
  DEPARTMENT_EDIT: {
    path: '/department/edit/:id',
    displayName: 'Editar Departamento',
    element: <DepartmentForm />,
  },
});