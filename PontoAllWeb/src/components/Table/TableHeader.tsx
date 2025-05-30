import { JSX } from "react";

interface TableHeaderProps {
  columns: string[];
  actions?: JSX.Element;
}

export default function TableHeader({ columns, actions }: TableHeaderProps) {
  return(
    <thead className="text-text-secondary font-semibold bg-neutral-dark">
      <tr className="h-12">
        {/* Coluna reservada para as checkbox */}
        <th className="w-10"></th>
        {columns.map((column, index) => (
          <th
            key={index}
            className="text-left"
          >
            {column}
          </th>
        ))}
        {actions && (
          <th className="text-center w-2/12">
          </th>
        )}
      </tr>
    </thead>
  );
}
