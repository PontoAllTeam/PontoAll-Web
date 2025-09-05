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
      className={`border-y border-gray-300 text-text-primary text-sm h-12 bg-white`}
    >
      {/* Célula da checkbox */}
      <td>
        <div className='h-full flex items-center justify-center'>
          <input
            type='checkbox'
            className='form-checkbox h-4 w-4 accent-primary'
          />
        </div>
      </td>

      {/* Conteúdo */}
      {keys.map((value, idx) => {
        if (idx > 0) {
          return (
            <td
              key={data[value]}
              className={idx === 1 ? 'text-primary font-semibold' : ''}
            >
              {data[value]}
            </td>
          );
        }
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
