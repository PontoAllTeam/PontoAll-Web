import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdAccountCircle } from 'react-icons/md';

import miniLogo from '../../assets/images/miniLogo.svg';
import logoPontoAll from '../../assets/images/logoPontoAll.svg';

// Exemplo para eu conseguir visualizar a parte visual
const buttons = [
  {
    id: 'home',
    label: 'Visão Geral',
    icon: <MdAccountCircle className='size-7 shrink-0' />,
    route: '/generalAdministrator',
  },
];

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Obtém a rota atual

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`flex flex-col ${
        isOpen ? 'w-60' : 'w-16'
      } min-h-screen bg-white shadow-lg transition-all duration-500 overflow-hidden cursor-pointer`}
    >
      <div className='relative h-16 flex items-center justify-center mb-6'>
        <img
          src={miniLogo}
          alt='Logo Ícone'
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${
            isOpen
              ? 'opacity-0 scale-75 -translate-y-2'
              : 'opacity-100 scale-100 translate-y-0'
          }`}
          style={{ height: '2rem' }}
        />
        <img
          src={logoPontoAll}
          alt='Logo Completa'
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${
            isOpen
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-75 -translate-y-2'
          }`}
          style={{ height: '3.5rem' }}
        />
      </div>

      <div className='flex flex-col' onClick={(e) => e.stopPropagation()}>
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => navigate(button.route)}
            className={`flex items-center gap-2 h-12 whitespace-nowrap border-x-4 text-primary ${
              isOpen ? 'px-4' : 'justify-center'
            } ${
              location.pathname === button.route
                ? 'bg-neutral-light text-secondary border-r-secondary'
                : 'text-primary hover:bg-neutral-light hover:border-r-secondary border-x-transparent'
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
