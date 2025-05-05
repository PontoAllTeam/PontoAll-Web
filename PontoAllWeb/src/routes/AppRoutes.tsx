import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { routes } from "./routes";

import LoginPage from "../pages/LoginPage";
import CompanyResgistration from "../pages/Registrations/CompanyRegistration";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={routes.LOGIN} element={<LoginPage />} />
      <Route path={routes.COMPANYREGISTRATION} element={<CompanyResgistration />} />
    </Route>
  )
);

function GlobalErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <main className="min-h-screen w-screen p-4">
      <h1 className="text-2xl text-danger">
        Erro ao tentar acessar a página!
      </h1>
    </main>
  );
}

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
