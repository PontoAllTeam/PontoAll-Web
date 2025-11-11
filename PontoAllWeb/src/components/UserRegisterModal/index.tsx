import { useState, FormEvent, useEffect } from 'react';
import Button from '@/components/Button';
import UserService from '@/services/userService';
import { User } from '@/types/models/user';
import { UserStatus, UserType } from '@/types/enums';
import { ApiResponse, ApiResponseEnum } from '@/types/contracts';

interface UserRegisterModalProps {
  onClose: () => void;
  onSave: () => void;
  userToEdit?: User | null;
}

// Instância do serviço
const userService = new UserService();

// --- Lookups (Mock de dados para Relações) ---
const UserTypeLabels: Record<number, string> = {
  [UserType.DIRECTOR]: 'Diretor(a)',
  [UserType.MANAGER]: 'Gerente',
  [UserType.EMPLOYEE]: 'Funcionário(a)',
};
const UserStatusLabels: Record<number, string> = {
  [UserStatus.ACTIVE]: 'Ativo(a)',
  [UserStatus.LEAVE_OF_ABSENCE]: 'Licença',
  [UserStatus.SUSPENDED]: 'Suspenso(a)',
  [UserStatus.INACTIVE]: 'Inativo(a)',
};
const departments = [
  { id: 1, name: 'RH' },
  { id: 2, name: 'TI' },
  { id: 10, name: 'Financeiro' },
];
const sectors = [
  { id: 1, name: 'Pessoal' },
  { id: 11, name: 'Infraestrutura' },
  { id: 20, name: 'Contas a Pagar' },
];
// --- Fim dos Lookups ---

export default function UserRegisterModal({
  onClose,
  onSave,
  userToEdit
}: UserRegisterModalProps) {

  // --- Estados do Formulário ---
  const [name, setName] = useState(userToEdit?.name || '');
  const [cpf, setCpf] = useState(userToEdit?.cpf || '');
  const [phone, setPhone] = useState(userToEdit?.phone || '');
  const [email, setEmail] = useState(userToEdit?.email || '');
  const [recoveryEmail, setRecoveryEmail] = useState(userToEdit?.recoveryemail || '');
  const [registration, setRegistration] = useState(userToEdit?.registration || '');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType | 0>(userToEdit?.type || 0);
  const [status, setStatus] = useState<UserStatus | 0>(userToEdit?.status || 0);
  const [departmentId, setDepartmentId] = useState<number>(userToEdit?.departmentid || 0);
  const [sectorId, setSectorId] = useState<number>(userToEdit?.sectorid || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Lógica de Edição ---
  const isEditing = !!userToEdit;
  const title = isEditing ? 'Editar Funcionário' : 'Cadastrar Funcionário';
  const submitLabel = isEditing ? 'Atualizar' : 'Cadastrar';
  const userId = userToEdit?.id || 0;
  const companyId = userToEdit?.companyid || 1;

  /**
   * HandleSubmit SEGUINDO O PADRÃO CompanyRegistration
   */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !email || (!isEditing && !password) || !userType || !status || !departmentId || !sectorId) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setIsSubmitting(false);
      return;
    }

    const userPayload: User = {
      id: userId,
      name,
      cpf,
      phone,
      email,
      recoveryemail: recoveryEmail,
      registration,
      password,
      type: userType,
      status: status,
      departmentid: departmentId,
      sectorid: sectorId,
      companyid: companyId,
    };

    try {
      let response: ApiResponse<User | null>;

      if (isEditing) {
        // (U)PDATE
        response = await userService.update(userId, userPayload);
      } else {
        // (C)REATE
        response = await userService.create(userPayload);
      }

      // ** Lógica "aprendida" do CompanyRegistration e GenericService **
      if (response.code === ApiResponseEnum.SUCCESS) {
        alert(isEditing ? 'Funcionário atualizado com sucesso!' : 'Funcionário cadastrado com sucesso!');
        onSave(); // Avisa o 'pai' (EmployeeOverview) para fechar e recarregar
      } else {
        // Erro de validação ou negócio vindo da API
        alert('Erro ao salvar: ' + response.message);
        console.warn('🔍 Detalhes do erro:', response.data);
      }

    } catch (error: any) {
      // Erro de rede/exceção (Padrão do CompanyRegistration)
      if (error.response) {
        console.error('📥 Erro do backend:', error.response.data);
        alert(
          'Erro ao salvar: ' + error.response.data?.message ||
            'Erro desconhecido'
        );
      } else {
        alert('Erro inesperado. Verifique o console.');
        console.error('❌ Erro inesperado:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='flex-col'>
      <h3 className='text-xl text-text-secondary font-semibold'>
        {title}
      </h3>
      <hr className='border-t border-gray-300' />

      <form className='flex flex-col' onSubmit={handleSubmit}>

        <label className='block text-text-primary text-sm font-extralight mb-2 mt-6'>Nome</label>
        <input type='text' required className='w-full h-10 py-2 p-2' placeholder='Digite o nome do funcionário' value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} />

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <label className='block text-text-primary text-sm font-extralight mb-2'>CPF</label>
            <input type='text' required className='w-full h-10 py-2 p-2' placeholder='Digite o CPF do funcionário' value={cpf} onChange={(e) => setCpf(e.target.value)} disabled={isSubmitting} />
          </div>
          <div className='flex-1'>
            <label className='block text-text-primary text-sm font-extralight mb-2'>Telefone</label>
            <input type='text' className='w-full h-10 py-2 p-2' placeholder='Digite o telefone do funcionário' value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isSubmitting} />
          </div>
        </div>

        <label className='block text-text-primary text-sm font-extralight mb-2'>E-mail</label>
        <input type='email' required className='w-full h-10 py-2 p-2' placeholder='Digite o e-mail do funcionário' value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} />

        <label className='block text-text-primary text-sm font-extralight mb-2'>E-mail de recuperação</label>
        <input type='email' className='w-full h-10 py-2 p-2' placeholder='Digite o e-mail de recuperação' value={recoveryEmail} onChange={(e) => setRecoveryEmail(e.target.value)} disabled={isSubmitting} />

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <label className='block text-text-primary text-sm font-extralight mb-2'>Registro</label>
            <input type='text' className='w-full h-10 py-2 p-2' placeholder='Digite o número do registro' value={registration} onChange={(e) => setRegistration(e.target.value)} disabled={isSubmitting} />
          </div>
          <div className='flex-1'>
            <label className='block text-text-primary text-sm font-extralight mb-2'>Tipo de Funcionário</label>
            <select required className='w-full h-10 p-2' value={userType} onChange={(e) => setUserType(Number(e.target.value) as UserType)} disabled={isSubmitting}>
              <option value={0} disabled>Selecione o tipo</option>
              {Object.entries(UserTypeLabels).map(([value, label]) => (
                <option key={value} value={Number(value)}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <label className='block text-text-primary text-sm font-extralight mb-2'>Departamento</label>
            <select required className='w-full h-10 p-2' value={departmentId} onChange={(e) => setDepartmentId(Number(e.target.value))} disabled={isSubmitting}>
              <option value={0} disabled>Selecione o departamento</option>
              {departments.map(dep => (<option key={dep.id} value={dep.id}>{dep.name}</option>))}
            </select>
          </div>
          <div className='flex-1'>
            <label className='block text-text-primary text-sm font-extralight mb-2'>Setor</label>
            <select required className='w-full h-10 p-2' value={sectorId} onChange={(e) => setSectorId(Number(e.target.value))} disabled={isSubmitting}>
              <option value={0} disabled>Selecione o setor</option>
              {sectors.map(sec => (<option key={sec.id} value={sec.id}>{sec.name}</option>))}
            </select>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <label className='block text-text-primary text-sm font-extralight mb-2'>Senha</label>
            <input
              type='password'
              required={!isEditing}
              className='w-full h-10 py-2 p-2'
              placeholder={isEditing ? 'Deixe em branco para não alterar' : 'Digite a senha'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className='flex-1'>
            <label className='block text-text-primary text-sm font-extralight mb-2'>Status</label>
            <select required className='w-full h-10 p-2' value={status} onChange={(e) => setStatus(Number(e.target.value) as UserStatus)} disabled={isSubmitting}>
              <option value={0} disabled>Selecione o status</option>
              {Object.entries(UserStatusLabels).map(([value, label]) => (
                <option key={value} value={Number(value)}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className='flex justify-end gap-4 py-2 mt-8'>
          <Button
            label='Cancelar'
            color='cancel'
            size='sm'
            onClick={onClose}
            type="button"
            disabled={isSubmitting}
          />
          <Button
            label={isSubmitting ? 'Salvando...' : submitLabel}
            color='secondary'
            size='md'
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
