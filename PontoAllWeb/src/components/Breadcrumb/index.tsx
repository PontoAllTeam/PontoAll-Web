import useBreadcrumbs from '@/hooks/useBreadcrumbs';
import { Link } from 'react-router-dom';

export default function Breadcrumb() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <nav
      className='flex items-center space-x-2 text-sm'
      aria-label='Breadcrumb'
    >
      <ul className='flex items-center'>
        {/* Renderização dinâmica dos caminhos */}
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const hasPath = !!crumb.path;

          const item =
            hasPath && !isLast && crumb.hasPage ? (
              <Link
                className='text-secondary hover:text-accent font-semibold'
                to={crumb.path}
              >
                {crumb.name}
              </Link>
            ) : (
              <span className='text-text-primary font-normal'>
                {crumb.name}
              </span>
            );

          const separator = !isLast && (
            <span className='text-text-primary h-full mx-1'>/</span>
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
