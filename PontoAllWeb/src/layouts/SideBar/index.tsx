import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import useAppRoutes from '@/hooks/useAppRoutes';
import {
  PiBuildingFill,
  PiCalendarDotsFill,
  PiUserPlusFill,
  PiUsersFourFill,
} from 'react-icons/pi';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const routes = useAppRoutes();

  const buttons = [
    {
      id: routes.OVERVIEW.displayName,
      label: routes.OVERVIEW.displayName,
      icon: <PiBuildingFill className='size-7 shrink-0' />,
      route: routes.OVERVIEW.path,
    },
    {
      id: routes.USER.displayName,
      label: routes.USER.displayName,
      icon: <PiUsersFourFill className='size-7 shrink-0' />,
      route: routes.USER.path,
    },
    {
      id: routes.WORK_SCHEDULE.displayName,
      label: routes.WORK_SCHEDULE.displayName,
      icon: <PiCalendarDotsFill className='size-7 shrink-0' />,
      route: routes.WORK_SCHEDULE.path,
    },
    {
      id: routes.REGISTRATIONS.displayName,
      label: routes.REGISTRATIONS.displayName,
      icon: <PiUserPlusFill className='size-7 shrink-0' />,
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
      text-primary`}
          size={28}
        />
        <MdClose
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out text-text-primary
      ${
        isOpen
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-75 -translate-y-2'
      }
      text-primary`}
          size={28}
        />
      </div>

      <div className='flex flex-col gap-2' onClick={(e) => e.stopPropagation()}>
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => navigate(button.route)}
            className={`flex items-center h-12 whitespace-nowrap text-text-primary ${
              isOpen ? 'px-4 gap-2' : 'justify-center'
            } ${
              location.pathname === button.route
                ? 'bg-neutral-light text-secondary'
                : 'text-primary hover:bg-neutral-light'
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
