import { JSX } from "react";

interface TableHeaderProps {
  columns: string[];
  actions?: (id: number) => JSX.Element;
  onToggleAll?: (checked: boolean) => void;
  allSelected?: boolean;
}

export default function TableHeader({
  columns,
  actions,
  onToggleAll,
  allSelected,
}: TableHeaderProps) {
  return (
    <thead className="text-text-primary text-sm bg-white">
      <tr className="h-12">
        <th className="w-10 px-2">
          <div className="h-full flex items-center justify-center">
            <input
              type="checkbox"
              checked={!!allSelected}
              onChange={(e) => onToggleAll?.(e.target.checked)}
              className="form-checkbox h-4 w-4 accent-primary"
            />
          </div>
        </th>
        {columns.map((column, index) => (
          <th key={index} className="text-left">
            {column}
          </th>
        ))}
        {actions && (
          <th className="text-center w-2/12">Ações</th>
        )}
      </tr>
    </thead>
  );
}
