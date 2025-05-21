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
import Layout from '@/components/Layout/MainLayout';
import PageLayout from '@/components/Layout/PageLayout';
import UserManagement from '@/pages/UserManagement';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<Layout />} errorElement={<GlobalErrorBoundary />}>
        <Route path="" element={<PageLayout />} errorElement={<GlobalErrorBoundary />}>
          <Route path={routes.USER_MANAGEMENT} element={<UserManagement />} />
        </Route>
      </Route>
      <Route path="" element={<PageLayout />} errorElement={<GlobalErrorBoundary />}>
        <Route path={routes.LANDING_PAGE} element={<LandingPage />} />
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
