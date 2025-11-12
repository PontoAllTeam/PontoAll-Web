import AccessibilityBar from './AccessibilityBar';
import miniLogo from '@/assets/images/miniLogo.svg';

export default function Header() {
  return (
    <header className='w-full z-[5]'>
      <AccessibilityBar />
      <div className='bg-white flex items-center justify-between h-12 shadow z-10 w-full'>
        <div className='w-full px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-end'>
          <img
            src={miniLogo}
            alt='logo do sistema'
            className='h-8 aspect-square'
          />
        </div>
      </div>
    </header>
  );
}
