import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { JSX } from 'react';

interface TableProps {
  columns: string[];
  data: {
    id: number;
    [key: string]: any;
  }[];
  selectedRows: number[];
  onToggleAll: (checked: boolean) => void;
  onToggleRow: (id: number) => void;
  actions?: (id: number) => JSX.Element;
}

export default function Table({
  columns,
  data,
  actions,
  selectedRows,
  onToggleAll,
  onToggleRow,
}: TableProps) {
  const allSelected = data.length > 0 && selectedRows.length === data.length;

  return (
    <table className="w-full bg-white rounded-s-sm shadow-md">
      <TableHeader
        columns={columns}
        actions={actions}
        onToggleAll={onToggleAll}
        allSelected={allSelected}
      />
      <tbody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={row.id}
            data={row}
            index={rowIndex}
            actions={actions ? actions(row.id) : undefined}
            isSelected={selectedRows.includes(row.id)}
            onToggle={onToggleRow}
          />
        ))}
      </tbody>
    </table>
  );
}
