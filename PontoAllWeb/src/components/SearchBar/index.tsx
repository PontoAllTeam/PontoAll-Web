import { MdSearch } from 'react-icons/md';

interface SearchBarProps {
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  placeholder = 'Pesquisar',
  onChange,
}: SearchBarProps) {
  return (
    <div className='flex items-center bg-white rounded-sm p-2 w-full max-w-sm'>
      <input
        type='search'
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className='flex-1 outline-none text-sm text-primary'
      />
      <MdSearch className='text-secondary text-lg' />
    </div>
  );
}
