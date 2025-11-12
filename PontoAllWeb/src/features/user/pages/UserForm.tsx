import { useState, useCallback, useEffect } from 'react';
import Button from '@/components/Button';
import { User } from '@/types/models/user';
import {
  Department,
  getUserStatusOptions,
  getUserTypeOptions,
  Sector,
  UserStatus,
  UserType,
} from '@/types';
import useFormData from '@/hooks/useFormData';
import UserService from '../services/userService';
import { useNavigate, useParams } from 'react-router-dom';
import useAppRoutes from '@/hooks/useAppRoutes';
import { SelectInput, TextInput } from '@/components/FormControls';
import { SectorService } from '@/features/sector';
import { DepartmentService } from '@/features/department';
import { AlertModal } from '@/components/Modal';

export default function UserForm() {
  const { id } = useParams<{ id: string }>();
  const routes = useAppRoutes();
  const navigate = useNavigate();
  const isEditing = id !== undefined && id !== '0';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number>(0);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'info' | 'success' | 'error'>(
    'info'
  );

  const { data, reset, setData, updateField } = useFormData<User>({
    id: 0,
    cpf: '',
    email: '',
    name: '',
    password: '',
    phone: '',
    recoveryEmail: '',
    registration: '',
    sectorId: 0,
    // TODO o id da empresa deve ser definido automaticamente com base no usuário que realizar o cadastro
    companyId: 1,
    userStatus: UserStatus.ACTIVE,
    userType: UserType.EMPLOYEE,
  });

  const title = isEditing ? 'Editar Colaborador' : 'Cadastrar Colaborador';
  const submitLabel = isEditing ? 'Atualizar' : 'Cadastrar';

  const getSectors = useCallback(async () => {
    const res = await SectorService.getAll();
    if (res.success && res.data) {
      setSectors(res.data);
    } else {
      showAlert(res.message, 'error');
    }
  }, []);

  const getDepartments = useCallback(async () => {
    const res = await DepartmentService.getAll();
    if (res.success && res.data) {
      setDepartments(res.data);
    } else {
      showAlert(res.message, 'error');
    }
  }, []);

  const showAlert = (message: string, type: 'info' | 'success' | 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertModalOpen(true);
  };

  const fetchUser = useCallback(
    async (userId: string) => {
      const res = await UserService.getById(Number(userId));
      if (res.success && res.data) {
        setData(res.data);
      } else {
        showAlert('Colaborador não encontrado!', 'error');
        navigate(routes.USER.path);
      }
    },
    [navigate, routes.USER.path, setData]
  );

  useEffect(() => {
    getSectors();
    getDepartments();
  }, [getDepartments, getSectors]);

  useEffect(() => {
    if (isEditing) {
      fetchUser(id);
    } else {
      reset();
    }
  }, [fetchUser, id, isEditing, reset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(() => true);

    const userData = data;

    const res = isEditing
      ? await UserService.update(userData.id, userData)
      : await UserService.create(userData);

    if (res.success) {
      showAlert(
        `Transportadora ${
          isEditing ? 'atualizada' : 'cadastrada'
        } com sucesso!`,
        'success'
      );
      navigate(routes.USER.path);
    } else {
      showAlert(res.message, 'error');
    }
    setIsSubmitting(() => false);
  };

  return (
    <div className='flex-col'>
      <h3 className='text-xl text-text-secondary font-semibold'>{title}</h3>
      <hr className='border-t border-gray-300' />

      <form className='flex flex-col' onSubmit={handleSubmit}>
        <TextInput<User>
          label='Nome'
          name='name'
          placeholder='Digite o nome do colaborador'
          value={data.name}
          onChange={updateField}
          disabled={isSubmitting}
          required
        />

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <TextInput<User>
              label='CPF'
              name='cpf'
              placeholder='Digite o CPF do colaborador'
              value={data.cpf}
              onChange={updateField}
              disabled={isSubmitting}
              required
            />
          </div>
          <div className='flex-1'>
            <TextInput<User>
              label='Telefone'
              name='phone'
              placeholder='Digite o telefone do colaborador'
              value={data.phone}
              onChange={updateField}
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        <TextInput<User>
          label='Email'
          name='email'
          placeholder='Digite o email do colaborador'
          value={data.email}
          onChange={updateField}
          disabled={isSubmitting}
          required
        />

        <TextInput<User>
          label='Email de recuperação'
          name='recoveryEmail'
          placeholder='Digite o email de recuperação do colaborador'
          value={data.recoveryEmail}
          onChange={updateField}
          disabled={isSubmitting}
          required
        />

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <TextInput<User>
              label='Registro'
              name='registration'
              placeholder='Digite o registro do colaborador'
              value={data.registration}
              onChange={updateField}
              disabled={isSubmitting}
              required
            />
          </div>
          <div className='flex-1'>
            <SelectInput<User>
              label='Tipo de Colaborador'
              name='userType'
              value={data.userType}
              options={getUserTypeOptions()}
              onChange={updateField}
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <SelectInput<Department>
              name='id'
              label='Departamento'
              value={selectedDepartment}
              onChange={(_, value) => setSelectedDepartment(Number(value))}
              options={departments.map((group) => ({
                label: group.name,
                value: group.id,
              }))}
              required
            />
          </div>
          <div className='flex-1'>
            <SelectInput<User>
              name='sectorId'
              label='Setor'
              value={data.sectorId}
              onChange={updateField}
              options={sectors
                .filter((sector) => sector.departmentId === selectedDepartment)
                .map((sector) => ({
                  label: sector.name,
                  value: sector.id,
                }))}
              required
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <TextInput<User>
              label='Senha'
              name='password'
              type='password'
              placeholder='Digite a senha do colaborador'
              value={data.password}
              onChange={updateField}
              disabled={isSubmitting}
              required={!isEditing}
            />
          </div>
          <div className='flex-1'>
            <SelectInput<User>
              label='Status do Colaborador'
              name='userStatus'
              value={data.userStatus}
              options={getUserStatusOptions()}
              onChange={updateField}
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className='flex justify-end gap-4 py-2 mt-8'>
          <Button
            label={isSubmitting ? 'Salvando...' : submitLabel}
            color='secondary'
            size='md'
            type='submit'
            disabled={isSubmitting}
          />
        </div>
      </form>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        message={alertMessage}
        type={alertType}
      />
    </div>
  );
}
