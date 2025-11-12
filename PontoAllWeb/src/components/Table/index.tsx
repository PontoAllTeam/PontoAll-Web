import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { JSX, useState } from 'react';
import { TableColumn } from './types';

interface TableProps<T extends { id: number }> {
  columns: TableColumn<T>[];
  data: T[];
  rowsPerPage?: number;
  actions?: (id: number) => JSX.Element;
}

export default function Table<T extends { id: number }>({
  columns,
  data,
  actions,
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleRowSelection = (rowId: number) => {
    setSelectedRows((prevSelectedRows) => {
      if (!prevSelectedRows) return [rowId];

      if (prevSelectedRows.includes(rowId)) {
        // Se a linha já estiver selecionada, desmarque
        return prevSelectedRows.filter((id) => id !== rowId);
      } else {
        // Caso contrário, adicione a linha aos selecionados
        return [...prevSelectedRows, rowId];
      }
    });
  };

  return (
    <table className='w-full bg-white rounded-s-sm shadow-md overflow-hidden'>
      {/* Cabeçalho da tabela */}
      <TableHeader<T> columns={columns} actions={!!actions} />
      {/* Corpo da tabela */}
      <tbody>
        {data.map((row, rowIndex) => (
          <TableRow<T>
            key={row.id}
            data={row}
            columns={columns}
            index={rowIndex}
            actions={actions ? actions(row.id) : undefined}
            onSelect={handleRowSelection}
            isSelected={selectedRows.includes(row.id)}
          />
        ))}
      </tbody>
    </table>
  );
}
