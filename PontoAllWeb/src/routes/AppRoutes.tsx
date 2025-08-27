import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useRouteError,
} from 'react-router-dom';
import { routes } from './routes';

import LoginPage from '@/pages/LoginPage';
import CompanyRegistration from '@/pages/Registrations/CompanyRegistration';
import LandingPage from '@/pages/LandingPage';
import SidebarLayout from '@/components/Layout/SidebarLayout';
import HeaderFooterLayout from '@/components/Layout/HeaderFooterLayout';
import EmployeeOverview from '@/pages/EmployeeOverview';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<SidebarLayout />} errorElement={<GlobalErrorBoundary />}>
        <Route path="" element={<HeaderFooterLayout />} errorElement={<GlobalErrorBoundary />}>
          <Route path={routes.EMPLOYEE_OVERVIEW} element={<EmployeeOverview />} />
        </Route>
      </Route>
      <Route path="" element={<HeaderFooterLayout />} errorElement={<GlobalErrorBoundary />}>
        <Route index path={routes.LANDING_PAGE} element={<LandingPage />} />
        <Route path={routes.COMPANY_REGISTRATION} element={<CompanyRegistration />}/>
      </Route>
      <Route path={routes.LOGIN} element={<LoginPage />} />
    </>
  )
);

function GlobalErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <main className='min-h-screen w-screen p-4'>
      <h1 className='text-2xl text-danger'>Erro ao tentar acessar a página!</h1>
    </main>
  );
}

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
