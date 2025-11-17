import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { JSX, useState } from 'react';
import { TableColumn } from './types';

interface TableProps<T extends { id: number }> {
  columns: TableColumn<T>[];
  data: T[];
  rowsPerPage?: number;
  actions?: (id: number) => JSX.Element;
  selectedRows?: number[];
  onSelectionChange?: (selectedRows: number[]) => void;
}

export default function Table<T extends { id: number }>({
  columns,
  data,
  actions,
  selectedRows: externalSelectedRows,
  onSelectionChange,
}: TableProps<T>) {
  const [internalSelectedRows, setInternalSelectedRows] = useState<number[]>(
    []
  );
  const selectedRows = externalSelectedRows ?? internalSelectedRows;
  const setSelectedRows = onSelectionChange ?? setInternalSelectedRows;
  const allSelected = data.length > 0 && selectedRows.length === data.length;

  const handleRowSelection = (rowId: number) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleToggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(data.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <table className='w-full bg-white rounded-s-sm shadow-md overflow-hidden'>
      {/* Cabeçalho da tabela */}
      <TableHeader<T>
        columns={columns}
        actions={!!actions}
        onToggleAll={handleToggleAll}
        allSelected={allSelected}
      />
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
