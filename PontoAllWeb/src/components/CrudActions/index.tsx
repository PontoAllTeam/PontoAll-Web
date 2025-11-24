import { useState, useRef, useEffect } from 'react';
import { MdDelete, MdEdit, MdMoreVert } from 'react-icons/md';
import Button from '../Button';

interface CrudActionProps {
  onEdit?: () => Promise<void>;
  onDelete?: () => Promise<void>;
}

export default function CrudAction({ onEdit, onDelete }: CrudActionProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className='relative' ref={dropdownRef}>
      <Button
        label='Ações'
        color='white'
        size='sm'
        icon={<MdMoreVert size={16} />}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />
      {isDropdownOpen && (
        <div className='absolute top-full mt-1 w-40 bg-white rounded shadow-lg z-10'>
          {onEdit && (
            <button
              className='flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-neutral-dark'
              onClick={onEdit}
            >
              <MdEdit size={16} />
              <span>Editar</span>
            </button>
          )}
          {onDelete && (
            <button
              className='flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-neutral-dark'
              onClick={onDelete}
            >
              <MdDelete size={16} />
              <span>Excluir</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
