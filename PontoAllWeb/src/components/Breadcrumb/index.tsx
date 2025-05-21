import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    user_management: "Funcionários",
  };

  return (
    <nav
      className="flex items-center space-x-2"
      aria-label="Breadcrumb"
    >
      <ul className="flex items-center space-x-1">
        {/* Primeiro item: Início */}
        <li className="flex items-center">
          <Link to="/" className="text-secondary hover:text-accent font-medium underline">
            Início
          </Link>
        </li>

        {/* Renderização dinâmica dos caminhos */}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center">
              {/* Seta entre os itens */}
              <h3 className="text-textSecondary mx-1">/</h3>
              {isLast ? (
                <span className="text-text-primary">
                  {breadcrumbNameMap[value] || value}
                </span>
              ) : (
                <Link
                  to={to}
                  className="text-secondary hover:text-accent font-medium"
                >
                  {breadcrumbNameMap[value] || value}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
