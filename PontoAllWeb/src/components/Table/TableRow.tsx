import { JSX } from 'react';

interface TableRowProps {
  data: { id: number; [key: string]: any };
  index: number;
  actions?: JSX.Element;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

export default function TableRow({
  data,
  index,
  actions,
  isSelected,
  onToggle,
}: TableRowProps) {
  const keys = Object.keys(data).filter((key) => key !== 'id');

  return (
    <tr className='border-y border-gray-300 text-text-primary text-sm h-12 bg-white'>
      <td>
        <div className='h-full flex items-center justify-center'>
          <input
            type='checkbox'
            checked={isSelected}
            onChange={() => onToggle(data.id)}
            className='form-checkbox h-4 w-4 accent-primary'
          />
        </div>
      </td>

      {keys.map((key, idx) => (
        <td
          key={`${data.id}-${key}`}
          className={idx === 0 ? 'text-primary font-semibold' : ''}
        >
          {data[key]}
        </td>
      ))}

      {actions ? (
        <td className='px-6 text-center'>
          <div className='flex h-full justify-evenly items-center'>
            {actions}
          </div>
        </td>
      ) : null}
    </tr>
  );
}
