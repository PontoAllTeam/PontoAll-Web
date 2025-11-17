import { JSX } from 'react';
import { TableColumn } from './types';

interface TableRowProps<T extends { id: number }> {
  data: T;
  columns: TableColumn<T>[];
  index: number;
  actions?: JSX.Element;
  onSelect: (rowId: number) => void;
  isSelected: boolean;
}

export default function TableRow<T extends { id: number }>({
  data,
  columns,
  actions,
  onSelect,
  isSelected,
}: TableRowProps<T>) {
  const handleClick = () => {
    onSelect(data.id);
  };

  return (
    <tr className='border-y border-neutral-dark text-text-primary text-sm h-12 bg-white'>
      {/* Célula da checkbox */}
      <td>
        <div className='h-full flex items-center justify-center'>
          <input
            type='checkbox'
            checked={isSelected}
            onChange={handleClick}
            className='form-checkbox h-4 w-4 accent-primary cursor-pointer'
          />
        </div>
      </td>
      {/* Conteúdo */}
      {columns.map((column, index) => {
        const value = data[column.attribute];
        const displayValue = column.render
          ? column.render(value, data)
          : String(value);
        return <td key={`${data.id}`} className={index === 0 ? 'text-primary font-semibold' : ''}>{displayValue}</td>;
      })}

      {/* Célula dos botões */}
      {actions && (
        <td className='px-6 text-center'>
          <div className='flex h-full justify-evenly items-center'>
            {actions}
          </div>
        </td>
      )}
    </tr>
  );
}
