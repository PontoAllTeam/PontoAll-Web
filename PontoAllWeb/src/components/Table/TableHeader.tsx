import { TableColumn } from './types';

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  actions?: boolean;
  onToggleAll?: (checked: boolean) => void;
  allSelected?: boolean;
}

export default function TableHeader<T>({
  columns,
  actions,
  onToggleAll,
  allSelected,
}: TableHeaderProps<T>) {
  return (
    <thead className='text-text-primary bg-neutral-light'>
      <tr className='h-12'>
        {/* Coluna reservada para as checkbox */}
        <th className='w-10 px-2'>
          <div className='h-full flex items-center justify-center'>
            <input
              type='checkbox'
              checked={!!allSelected}
              onChange={(e) => onToggleAll?.(e.target.checked)}
              className='form-checkbox h-4 w-4 accent-secondary'
            />
          </div>
        </th>
        {columns.map((column, index) => (
          <th key={index} className='text-left'>
            {column.label}
          </th>
        ))}
        {actions && <th className='text-center w-2/12'>Ações</th>}
      </tr>
    </thead>
  );
}
