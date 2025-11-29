import { useState, useRef, useEffect } from 'react';
import CrudActionsDropdown from './CrudActionsDropdown';
import { MdMoreVert } from 'react-icons/md';
import Button from '../Button';

interface CrudActionsButtonProps {
  onEdit?: () => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
}

export default function CrudActionsButton({
  onEdit,
  onDelete,
}: CrudActionsButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
        <CrudActionsDropdown onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  );
}
