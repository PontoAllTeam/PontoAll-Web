import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';

export default function AppLayout() {
  return (
    <div className='flex min-h-screen min-w-screen bg-background text-text'>
      <Sidebar />
      <Outlet />
    </div>
  );
}
