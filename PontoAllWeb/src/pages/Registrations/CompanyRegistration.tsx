import { useState } from 'react';
import { FaBuilding } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Button from '@/components/Button';
import CompanyService from '@/services/companyService';
import { Company, CompanyStatus } from '@/types';

export default function CompanyRegistration() {
  const [corporateName, setCorporateName] = useState('');
  const [fantasyName, setFantasyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const company: Company = {
      id: 0,
      corporateName,
      fantasyName,
      cnpj,
      businessPhone,
      email,
      state,
      city,
      cep,
      street,
      neighborhood,
      number: Number(number),
      status: CompanyStatus.ACTIVE
    };

    console.log("📦 Dados enviados:", company);

    try {
      const service = new CompanyService();
      const response = await service.create(company);

      console.log("📥 Resposta do backend:", response);

      if (response.code === 1) {
        alert('Empresa cadastrada com sucesso!');
        setCorporateName('');
        setFantasyName('');
        setCnpj('');
        setBusinessPhone('');
        setEmail('');
        setState('');
        setCity('');
        setCep('');
        setStreet('');
        setNumber('');
        setNeighborhood('');
      } else {
        alert('Erro ao cadastrar empresa: ' + response.message);
        console.warn('🔍 Detalhes do erro:', response.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.error("📥 Erro do backend:", error.response.data);
        alert("Erro ao cadastrar empresa: " + error.response.data?.message || "Erro desconhecido");
      } else {
        alert("Erro inesperado. Verifique o console.");
        console.error("❌ Erro inesperado:", error);
      }
    }
  }

  return (
    <div className='min-h-screen w-full bg-background flex flex-col items-center'>
      <div className='h-full w-[90%] flex flex-col items-center max-w-screen-xl'>
        <h1 className='text-text-secondary font-bold text-3xl mt-10 mb-8 w-full'>
          Cadastro de Empresa
        </h1>
        <form onSubmit={handleSubmit} className='w-full bg-white rounded-lg shadow-md border border-background p-8 mb-10'>
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
              value={fantasyName}
              onChange={(e) => setFantasyName(e.target.value)}
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
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </div>
            <div className='flex-1'>
              <label className='block text-text-secondary text-sm font-semibold mb-2'>
                Telefone Corporativo
              </label>
              <input
                type='text'
                className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
                value={businessPhone}
                onChange={(e) => setBusinessPhone(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <Button type='submit' label='Cadastrar Empresa' color='secondary' size='lg' />
          </div>
        </form>
      </div>
    </div>
  );
}
