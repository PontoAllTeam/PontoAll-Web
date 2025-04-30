import { useState } from 'react';
import miniLogo from '../../assets/images/miniLogo.svg';
import { FaBuilding } from 'react-icons/fa';

export default function CompanyResgistration() {
  const [corporateName, setCorporateName] = useState('');
  const [socialName, setSocialName] = useState('');

  return (
    <div className='h-screen w-screen bg-background flex flex-col items-center'>
      <header className='bg-white flex flex-col overflow-hidden items-center justify-center w-full flex-shrink-0 shadow z-10'>
        <div className='h-16 w-full p-6 flex items-center justify-between overflow-hidden'>
          <img src={miniLogo} alt='logo do sistema' />
        </div>
      </header>
      <h1 className='text-text-secondary font-bold text-3xl mt-10 pl-20 mb-8 w-full'>
        Cadastro de Empresa
      </h1>
      <form className='w-[90%] md:max-w-[2500px] bg-white rounded-lg shadow-md border border-background p-8'>
        <div className='flex items-center gap-2 mb-6'>
          <FaBuilding className='text-text-secondary text-2xl' />
          <h1 className='text-text-secondary font-semibold text-2xl'>
            Perfil da Empresa
          </h1>
        </div>
        <div className='flex flex-col'>
          <label className='block text-text-secondary text-sm font-semibold mb-2'>
            Nome Corporativo
          </label>
          <input
            type='text'
            className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
            value={corporateName}
            onChange={(e) => setCorporateName(e.target.value)}
          />
          <label className='block text-text-secondary text-sm font-semibold mb-2'>
            Nome Social
          </label>
          <input
            type='text'
            className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
            value={socialName}
            onChange={(e) => setSocialName(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}
