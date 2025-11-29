import { MdDelete, MdEdit } from 'react-icons/md';

interface CrudActionsDropdownProps {
  onEdit?: () => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
}

export default function CrudActionsDropdown({
  onEdit,
  onDelete,
}: CrudActionsDropdownProps) {
  return (
    <div className='absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32 overflow-clip'>
      {onEdit && (
        <button
          className='w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-text-primary'
          onClick={onEdit}
        >
          <MdEdit size={16} />
          Editar
        </button>
      )}
      {onDelete && (
        <button
          className='w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-text-primary'
          onClick={onDelete}
        >
          <MdDelete size={16} />
          Excluir
        </button>
      )}
    </div>
  );
}
