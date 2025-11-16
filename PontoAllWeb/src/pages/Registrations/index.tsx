import { useState, useEffect, useMemo } from 'react';
import {
  PiUsers,
  PiBuildings,
  PiFactory,
  PiClock,
  PiUserCircle,
} from 'react-icons/pi';
import Card from '@/components/Card';
import SearchBar from '@/components/SearchBar';
import BreadcrumbPageTitle from '@/components/BreadcrumbPageTitle';
import useAppRoutes from '@/hooks/useAppRoutes';

export default function Registrations() {
  const routes = useAppRoutes();

  const originalCards = useMemo(
    () => [
      {
        text: routes.USER.displayName,
        subText: 'Colaboradores cadastrados',
        icon: <PiUsers size={28} className='shrink-0 text-primary' />,
        page: routes.USER.path,
      },
      {
        text: routes.DEPARTMENT.displayName,
        subText: 'Departamentos cadastrados',
        icon: <PiBuildings size={28} className='shrink-0 text-primary' />,
        page: routes.DEPARTMENT.path,
      },
      {
        text: routes.SECTOR.displayName,
        subText: 'Setores cadastrados',
        icon: <PiFactory size={28} className='shrink-0 text-primary' />,
        page: routes.SECTOR.path,
      },
      {
        text: routes.WORK_SCHEDULE.displayName,
        subText: 'Horários de trabalho cadastrados',
        icon: <PiClock size={28} className='shrink-0 text-primary' />,
        page: routes.WORK_SCHEDULE.path,
      },
      {
        text: routes.COMPANY.displayName,
        subText: 'Empresas cadastradas',
        icon: <PiUserCircle size={28} className='shrink-0 text-primary' />,
        page: routes.COMPANY.path,
      },
    ],
    [routes]
  );

  const [cards, setCards] = useState(originalCards);

  useEffect(() => {
    setCards(originalCards);
  }, [originalCards]);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setCards(originalCards);
      return;
    }
    const searchFiltered = originalCards.filter((card) =>
      card.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCards(searchFiltered);
  };

  return (
    <div className='bg-neutral-light'>
      <BreadcrumbPageTitle title='Cadastros' />

      <div className='mt-8 px-4 flex flex-wrap items-center gap-8'>
        <div className='w-full'>
          <SearchBar placeholder='Buscar Cadastro' onChange={handleSearch} />
        </div>
        {cards.map(({ text, icon, page, subText }) => (
          <Card
            key={page}
            subText={subText}
            text={text}
            icon={icon}
            page={page}
          />
        ))}
      </div>
    </div>
  );
}
