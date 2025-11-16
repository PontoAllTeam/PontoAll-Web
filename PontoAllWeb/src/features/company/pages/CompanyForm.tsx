import { useState, useCallback, useEffect } from 'react';
import { FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import Button from '@/components/Button';
import { Company, CompanyStatus } from '@/types';
import CompanyService from '../services/companyService';
import useFormData from '@/hooks/useFormData';
import { useNavigate, useParams } from 'react-router-dom';
import useAppRoutes from '@/hooks/useAppRoutes';
import { TextInput } from '@/components/FormControls';
import { AlertModal } from '@/components/Modal';

export default function CompanyForm() {
  const { id } = useParams<{ id: string }>();
  const routes = useAppRoutes();
  const navigate = useNavigate();
  const isEditing = id !== undefined && id !== '0';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'info' | 'success' | 'error'>(
    'info'
  );

  const { data, reset, setData, updateField } = useFormData<Company>({
    id: 0,
    corporateName: '',
    fantasyName: '',
    cnpj: '',
    businessPhone: '',
    email: '',
    state: '',
    city: '',
    cep: '',
    street: '',
    neighborhood: '',
    number: 0,
    companyStatus: CompanyStatus.ACTIVE,
  });

  const title = isEditing ? 'Editar Empresa' : 'Cadastrar Empresa';
  const submitLabel = isEditing ? 'Atualizar' : 'Cadastrar';

  const showAlert = (message: string, type: 'info' | 'success' | 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertModalOpen(true);
  };

  const fetchCompany = useCallback(
    async (companyId: string) => {
      const res = await CompanyService.getById(Number(companyId));
      if (res.success && res.data) {
        setData(res.data);
      } else {
        showAlert('Empresa não encontrada!', 'error');
        navigate(routes.COMPANY.path);
      }
    },
    [navigate, routes.COMPANY.path, setData]
  );

  useEffect(() => {
    if (isEditing) {
      fetchCompany(id);
    } else {
      reset();
    }
  }, [fetchCompany, id, isEditing, reset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = isEditing
      ? await CompanyService.update(data.id, data)
      : await CompanyService.create(data);

    if (res.success) {
      showAlert(
        `Empresa ${isEditing ? 'atualizada' : 'cadastrada'} com sucesso!`,
        'success'
      );
      navigate(routes.COMPANY.path);
    } else {
      showAlert(res.message, 'error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className='min-h-screen w-full bg-background flex flex-col items-center'>
      <div className='h-full w-[90%] flex flex-col items-center max-w-screen-xl'>
        <h1 className='text-text-secondary font-bold text-3xl mt-10 mb-8 w-full'>
          {title}
        </h1>
        <form
          onSubmit={handleSubmit}
          className='w-full bg-white rounded-lg shadow-md border border-background p-8 mb-10 flex flex-col gap-4'
        >
          <div className='flex items-center gap-2 mb-6'>
            <FaBuilding className='text-text-secondary text-2xl' />
            <h1 className='text-text-secondary font-semibold text-2xl'>
              Perfil da Empresa
            </h1>
          </div>
          <TextInput<Company>
            label='Nome Corporativo'
            name='corporateName'
            placeholder='Digite o nome corporativo da empresa'
            value={data.corporateName}
            onChange={updateField}
            disabled={isSubmitting}
            required
          />

          <TextInput<Company>
            label='Nome Social'
            name='fantasyName'
            placeholder='Digite o nome social da empresa'
            value={data.fantasyName}
            onChange={updateField}
            disabled={isSubmitting}
            required
          />
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex-1'>
              <TextInput<Company>
                label='CNPJ'
                name='cnpj'
                placeholder='Digite o CNPJ da empresa'
                value={data.cnpj}
                onChange={updateField}
                disabled={isSubmitting}
                required
              />
            </div>
            <div className='flex-1'>
              <TextInput<Company>
                label='Telefone Corporativo'
                name='businessPhone'
                placeholder='Digite o telefone corporativo'
                value={data.businessPhone}
                onChange={updateField}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          <TextInput<Company>
            label='E-mail'
            name='email'
            type='email'
            placeholder='Digite o e-mail da empresa'
            value={data.email}
            onChange={updateField}
            disabled={isSubmitting}
            required
          />
          <div className='w-full border-t border-primary my-8'></div>
          <div className='flex items-center gap-2 mb-6'>
            <FaMapMarkerAlt className='text-text-secondary text-2xl' />
            <h1 className='text-text-secondary font-semibold text-2xl'>
              Endereço da Empresa
            </h1>
          </div>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='w-full md:w-[120px]'>
              <TextInput<Company>
                label='Estado'
                name='state'
                placeholder='UF'
                value={data.state}
                onChange={updateField}
                disabled={isSubmitting}
                maxLength={2}
                required
              />
            </div>
            <div className='flex-1'>
              <TextInput<Company>
                label='Cidade'
                name='city'
                placeholder='Digite a cidade'
                value={data.city}
                onChange={updateField}
                disabled={isSubmitting}
                required
              />
            </div>
            <div className='w-full md:w-[300px]'>
              <TextInput<Company>
                label='CEP'
                name='cep'
                placeholder='00000-000'
                value={data.cep}
                onChange={updateField}
                disabled={isSubmitting}
                maxLength={9}
                required
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex-1'>
              <TextInput<Company>
                label='Rua'
                name='street'
                placeholder='Digite o nome da rua'
                value={data.street}
                onChange={updateField}
                disabled={isSubmitting}
                required
              />
            </div>
            <div className='flex-1'>
              <TextInput<Company>
                label='Número'
                name='number'
                type='number'
                placeholder='Digite o número'
                value={data.number}
                onChange={(att, value) => updateField(att, Number(value))}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          <TextInput<Company>
            label='Bairro'
            name='neighborhood'
            placeholder='Digite o bairro'
            value={data.neighborhood}
            onChange={updateField}
            disabled={isSubmitting}
            required
          />
          <div className='w-full mt-6 flex justify-end'>
            <Button
              type='submit'
              label={isSubmitting ? 'Salvando...' : submitLabel}
              color='secondary'
              size='lg'
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        message={alertMessage}
        type={alertType}
      />
    </div>
  );
}
