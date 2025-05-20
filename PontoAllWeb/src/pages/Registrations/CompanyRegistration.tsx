import { useState } from 'react';
import miniLogo from '@/assets/images/miniLogo.svg';
import { FaBuilding } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Button from '@/components/Button';

export default function CompanyRegistration() {
  const [corporateName, setCorporateName] = useState('');
  const [socialName, setSocialName] = useState('');
  const [corporateCnpj, setCorporateCnpj] = useState('');
  const [corporatePhone, setCorporatePhone] = useState('');
  const [corporateEmail, setCorporateEmail] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  return (
    <div className='min-h-screen w-full bg-background flex flex-col items-center overflow-x-hidden'>
      <h1 className='text-text-secondary font-bold text-3xl mt-10 pl-20  ml-20 mb-8 w-full'>
        Cadastro de Empresa
      </h1>
      <form className='w-[90%] max-w-screen-xl bg-white rounded-lg shadow-md border border-background p-8 mb-10'>
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
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              CNPJ
            </label>
            <input
              type='text'
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              value={corporateCnpj}
              onChange={(e) => setCorporateCnpj(e.target.value)}
            />
          </div>
          <div className='flex-1'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              Telefone Corporativo
            </label>
            <input
              type='text'
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              value={corporatePhone}
              onChange={(e) => setCorporatePhone(e.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <label className='block text-text-secondary text-sm font-semibold mb-2'>
            E-mail
          </label>
          <input
            type='text'
            className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
            value={corporateEmail}
            onChange={(e) => setCorporateEmail(e.target.value)}
          />
        </div>
        <div className='w-full border-t border-primary my-8'></div>
        <div className='flex items-center gap-2 mb-6'>
          <FaMapMarkerAlt className='text-text-secondary text-2xl' />
          <h1 className='text-text-secondary font-semibold text-2xl'>
            Endereço da Empresa
          </h1>
        </div>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='w-full md:w-[120px]'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              Estado
            </label>
            <input
              type='text'
              maxLength={2}
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all uppercase'
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className='flex-1'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              Cidade
            </label>
            <input
              type='text'
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className='w-full md:w-[300px]'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              CEP
            </label>
            <input
              type='text'
              maxLength={9}
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              Rua
            </label>
            <input
              type='text'
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className='flex-1'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              Número
            </label>
            <input
              type='text'
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <label className='block text-text-secondary text-sm font-semibold mb-2'>
            Bairro
          </label>
          <input
            type='text'
            className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
        </div>
        <div className='w-full mt-6 flex justify-end'>
          <Button label="Cadastrar Empresa" color="secondary" size="lg"/>
        </div>
      </form>
    </div>
  );
}
