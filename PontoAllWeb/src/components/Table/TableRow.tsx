import { JSX } from 'react';

interface TableRowProps {
  data: any;
  index: number;
  actions?: JSX.Element;
}

export default function TableRow({ data, index, actions }: TableRowProps) {
  const keys = Object.keys(data);
  return (
    <tr
      className={`border-y border-text-primary text-text-primary h-12 ${
        index % 2 === 1 ? 'bg-neutral-light' : 'bg-white'
      }`}
    >
      {/* Célula da checkbox */}
      <td>
        <div className='h-full flex items-center justify-center'>
          <input
            type='checkbox'
            className='form-checkbox h-4 w-4 accent-secondary'
          />
        </div>
      </td>

      {/* Conteúdo */}
      {keys.map((value, idx) => {
        if (idx > 0) {
          return (
            <td
              key={data[value]}
              className={idx === 1 ? 'text-secondary font-semibold' : ''}
            >
              {data[value]}
            </td>
          );
        }
      })}

      {/* Célula dos botões */}
      {actions && (
        <td className='px-4 text-center border-l-1 border-text-primary h-full'>
          <div className='flex h-full justify-evenly items-center'>
            {actions}
          </div>
        </td>
      )}
    </tr>
  );
}
