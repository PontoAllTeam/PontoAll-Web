import { useState, useCallback, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import Button from '@/components/Button';
import { User } from '@/types';
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
        const user = res.data;
        setData(user);

        // Encontrar o departamento do setor selecionado
        const sector = sectors.find((s) => s.id === user.sectorId);
        if (sector) {
          setSelectedDepartment(sector.departmentId);
        }
      } else {
        showAlert('Colaborador não encontrado!', 'error');
        navigate(routes.USER.path);
      }
    },
    [navigate, routes.USER.path, setData, sectors]
  );

  useEffect(() => {
    getSectors();
    getDepartments();
  }, [getDepartments, getSectors]);

  useEffect(() => {
    if (isEditing && sectors.length > 0 && departments.length > 0) {
      fetchUser(id);
    } else if (!isEditing) {
      reset();
      setSelectedDepartment(0);
    }
  }, [fetchUser, id, isEditing, reset, sectors.length, departments.length]);

  // Resetar setor quando departamento mudar
  useEffect(() => {
    if (selectedDepartment > 0 && sectors.length > 0) {
      const filteredSectors = sectors.filter(
        (sector) => sector.departmentId === selectedDepartment
      );
      if (
        filteredSectors.length > 0 &&
        !filteredSectors.find((s) => s.id === data.sectorId)
      ) {
        updateField('sectorId', filteredSectors[0].id);
      }
    }
  }, [selectedDepartment, sectors, data.sectorId, updateField]);

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
            <FaUser className='text-text-secondary text-2xl' />
            <h1 className='text-text-secondary font-semibold text-2xl'>
              Dados do Colaborador
            </h1>
          </div>
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
            type='email'
            placeholder='Digite o email do colaborador'
            value={data.email}
            onChange={updateField}
            disabled={isSubmitting}
            required
          />

          <TextInput<User>
            label='Email de recuperação'
            name='recoveryEmail'
            type='email'
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
                options={departments.map((dept) => ({
                  label: dept.name,
                  value: dept.id,
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
                  .filter(
                    (sector) => sector.departmentId === selectedDepartment
                  )
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
