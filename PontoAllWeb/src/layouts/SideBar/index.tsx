import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdAccountCircle, MdMenu, MdClose, MdAppRegistration } from 'react-icons/md';
import useAppRoutes from '@/hooks/useAppRoutes';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const routes = useAppRoutes();

  const buttons = [
    {
      id: 'home',
      label: 'Visão Geral',
      icon: <MdAccountCircle className='size-7 shrink-0' />,
      route: routes.OVERVIEW.path,
    },
    {
      id: 'registrations',
      label: 'Cadastros',
      icon: <MdAppRegistration className='size-7 shrink-0' />,
      route: routes.REGISTRATIONS.path,
    },
  ];

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`flex flex-col ${
        isOpen ? 'w-60' : 'w-16'
      } h-screen bg-white shadow-lg transition-all duration-500 overflow-hidden cursor-pointer sticky top-0 bottom-0 left-0 shrink-0`}
    >
      <div className='relative h-16 flex items-center justify-center mb-6'>
        <MdMenu
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out text-text-primary
      ${
        isOpen
          ? 'opacity-0 scale-75 -translate-y-2'
          : 'opacity-100 scale-100 translate-y-0'
      }
      text-text-primary`}
          size={28}
        />
        <MdClose
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out text-text-primary
      ${
        isOpen
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-75 -translate-y-2'
      }
      text-text-primary`}
          size={28}
        />
      </div>

      <div className='flex flex-col' onClick={(e) => e.stopPropagation()}>
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => navigate(button.route)}
            className={`flex items-center h-12 whitespace-nowrap border-x-4 text-text-primary pl-4 ${
              isOpen ? 'gap-2' : ''
            } ${
              location.pathname === button.route
                ? 'bg-neutral-light text-secondary border-r-secondary'
                : 'text-text-primary hover:bg-neutral-light hover:border-r-secondary border-x-transparent'
            }`}
          >
            {button.icon}
            {isOpen && <span className='text-sm'>{button.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
