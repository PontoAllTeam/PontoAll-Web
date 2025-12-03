import { Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useRouteError,
} from 'react-router-dom';
import { routes } from './routes';
import { AppLayout, HeaderFooterLayout } from '@/layouts';
import ProtectedRoute from '@/components/ProtectedRoute';
import RootRedirect from '@/components/RootRedirect';
import AuthGuard from '@/components/AuthGuard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<RootRedirect />} />

      <Route
        path=''
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
        errorElement={<GlobalErrorBoundary />}
      >
        <Route
          path=''
          element={<HeaderFooterLayout />}
          errorElement={<GlobalErrorBoundary />}
        >
          <Route {...routes.USER} />
          <Route {...routes.USER_REGISTRATION} />
          <Route {...routes.USER_EDIT} />
          <Route {...routes.SECTOR} />
          <Route {...routes.DEPARTMENT} />
          <Route {...routes.COMPANY} />
          <Route {...routes.COMPANY_EDIT} />
          <Route {...routes.COMPANY_REGISTRATION} />
          <Route {...routes.WORK_SCHEDULE} />
          <Route {...routes.WORK_SCHEDULE_REGISTRATION} />
          <Route {...routes.WORK_SCHEDULE_EDIT} />
          <Route {...routes.OVERVIEW} />
          <Route {...routes.REGISTRATIONS} />
          <Route {...routes.GEOFENCE} />
          <Route {...routes.TIME_RECORD} />
        </Route>
      </Route>

      <Route
        path=''
        element={
          <AuthGuard requireAuth={false}>
            <HeaderFooterLayout />
          </AuthGuard>
        }
        errorElement={<GlobalErrorBoundary />}
      >
        <Route {...routes.LANDING} />
      </Route>

      <Route
        {...routes.LOGIN}
        element={
          <Suspense fallback={<div>Carregando...</div>}>
            <AuthGuard requireAuth={false}>{routes.LOGIN.element}</AuthGuard>
          </Suspense>
        }
      />
    </>
  )
);

function GlobalErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <main className='min-h-screen w-screen p-4'>
      <h1 className='text-2xl text-red'>Erro ao tentar acessar a página!</h1>
    </main>
  );
}

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}

