import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useRouteError,
} from 'react-router-dom';
import { routes } from './routes';

import SidebarLayout from '@/components/Layout/SidebarLayout';
import HeaderFooterLayout from '@/components/Layout/HeaderFooterLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path=''
        element={<SidebarLayout />}
        errorElement={<GlobalErrorBoundary />}
      >
        <Route
          path=''
          element={<HeaderFooterLayout />}
          errorElement={<GlobalErrorBoundary />}
        >
          <Route {...routes.USER} />
          <Route {...routes.SECTOR} />
          <Route {...routes.DEPARTMENT} />
          <Route {...routes.COMPANY} />
          <Route {...routes.COMPANY_EDIT} />
          <Route {...routes.COMPANY_REGISTRATION} />
          <Route {...routes.WORK_SCHEDULE} />
          <Route {...routes.WORK_SCHEDULE_REGISTRATION} />
          <Route {...routes.WORK_SCHEDULE_EDIT} />
        </Route>
      </Route>

      <Route
        path=''
        element={<HeaderFooterLayout />}
        errorElement={<GlobalErrorBoundary />}
      >
        <Route {...routes.LANDING} />
      </Route>

      <Route {...routes.LOGIN} />
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
