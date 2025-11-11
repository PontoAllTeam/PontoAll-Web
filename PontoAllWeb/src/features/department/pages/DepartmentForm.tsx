import { useState } from 'react';
import { FaBuilding } from 'react-icons/fa';
import Button from '@/components/Button';
import { Department } from '@/types';
import DepartmentService from '../services/departmentService';

export default function DepartmentForm() {
  const [name, setName] = useState('');
  const [companyId, setCompanyId] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const department: Department = {
      id: 0,
      name,
      companyId: Number(companyId),
    };

    console.log('📦 Dados enviados:', department);

    try {
      const response = await DepartmentService.create(department);

      console.log('📥 Resposta do backend:', response);

      if (response.success) {
        alert('Departamento cadastrado com sucesso!');
        setName('');
        setCompanyId('');
      } else {
        alert('Erro ao cadastrar departamento: ' + response.message);
        console.warn('🔍 Detalhes do erro:', response.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.error('📥 Erro do backend:', error.response.data);
        alert(
          'Erro ao cadastrar departamento: ' + error.response.data?.message ||
            'Erro desconhecido'
        );
      } else {
        alert('Erro inesperado. Verifique o console.');
        console.error('❌ Erro inesperado:', error);
      }
    }
  }

  return (
    <div className='min-h-screen w-full bg-background flex flex-col items-center'>
      <div className='h-full w-[90%] flex flex-col items-center max-w-screen-xl'>
        <h1 className='text-text-secondary font-bold text-3xl mt-10 mb-8 w-full'>
          Cadastro de Departamento
        </h1>
        <form
          onSubmit={handleSubmit}
          className='w-full bg-white rounded-lg shadow-md border border-background p-8 mb-10'
        >
          <div className='flex items-center gap-2 mb-6'>
            <FaBuilding className='text-text-secondary text-2xl' />
            <h1 className='text-text-secondary font-semibold text-2xl'>
              Dados do Departamento
            </h1>
          </div>
          <div className='flex flex-col'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              Nome do Departamento
            </label>
            <input
              type='text'
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              ID da Empresa
            </label>
            <input
              type='number'
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
            />
          </div>
          <div className='w-full mt-6 flex justify-end'>
            <Button
              type='submit'
              label='Cadastrar Departamento'
              color='secondary'
              size='lg'
            />
          </div>
        </form>
      </div>
    </div>
  );
}