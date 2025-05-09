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
import TesteLayout from "@/pages/TesteLayout";
import LandingPage from '@/pages/LandingPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={routes.LOGIN} element={<LoginPage />} />
      <Route path={routes.COMPANY_REGISTRATION} element={<CompanyRegistration />}/>
      <Route path={routes.TESTE_LAYOUT} element={<TesteLayout />} />
      <Route path={routes.LANDING_PAGE} element={<LandingPage />} />
    </Route>
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
