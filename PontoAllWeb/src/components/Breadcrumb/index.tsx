import useBreadcrumbs from '@/hooks/useBreadcrumbs';
import { Link } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';

export default function Breadcrumb() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <nav
      className='flex items-center space-x-2 text-sm'
      aria-label='Breadcrumb'
    >
      <ul className='flex items-center space-x-1'>
        {/* Renderização dinâmica dos caminhos */}
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const hasPath = !!crumb.path;

          const item =
            hasPath && !isLast && crumb.hasPage ? (
              <Link
                className='text-secondary hover:text-accent font-medium'
                to={crumb.path}
              >
                {crumb.name}
              </Link>
            ) : (
              <span className='text-text-primary font-medium'>
                {crumb.name}
              </span>
            );

          const separator = !isLast && (
            <MdArrowForwardIos className='text-text-secondary h-5 w-5 mx-1' />
          );

          return (
            <li key={crumb.path} className='flex items-center'>
              {item}
              {separator}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
