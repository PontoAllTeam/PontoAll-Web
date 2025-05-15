import AccessibilityBar from "./AccessibilityBar";
import logoPontoAll from "@/assets/images/logoPontoAll.svg";
import { routes } from "@/routes/routes";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const LoginPage = () => {
    navigate(routes.LOGIN);
  };

  return (
    <header className="w-full">
      <AccessibilityBar />
      <div className="bg-white flex items-center justify-between h-24 shadow z-10 w-full">
        <div className='max-w-screen-xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between'>
          <img
            src={logoPontoAll}
            alt='logo do sistema'
            className='h-20 w-auto'
          />
          <button className='bg-secondary hover:bg-accent text-white text-md font-medium py-2 px-12 rounded-4xl transition duration-300 shadow-md' onClick={LoginPage}>
            Entrar
          </button>
        </div>
      </div>
    </header>
  );
}
