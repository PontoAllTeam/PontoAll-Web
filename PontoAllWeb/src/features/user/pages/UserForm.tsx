import { useState, useCallback, useEffect } from 'react';
import { FaUser, FaCamera } from 'react-icons/fa';
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
import { useAuth } from '@/features/auth';

export default function UserForm() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
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
    companyId: user?.companyId || 0,
    userStatus: UserStatus.ACTIVE,
    userType: UserType.EMPLOYEE,
  });

  const [photos, setPhotos] = useState<string[]>([]);

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

  const handlePhotoUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      const newPhotos = [...photos];
      newPhotos[index] = base64;
      setPhotos(newPhotos);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isEditing) {
      const validPhotos = photos.filter(photo => photo && photo.trim() !== '');
      if (validPhotos.length < 3) {
        showAlert('É obrigatório enviar pelo menos 3 fotos para o cadastro', 'error');
        return;
      }
    }
    
    setIsSubmitting(() => true);

    const validPhotos = !isEditing ? photos.filter(photo => photo && photo.trim() !== '') : undefined;
    const userData = { ...data, photos: validPhotos };

    const res = isEditing
      ? await UserService.update(userData.id, userData)
      : await UserService.create(userData);

    if (res.success) {
      showAlert(
        `Colaborador ${
          isEditing ? 'atualizado' : 'cadastrado'
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

          {!isEditing && (
            <div className='mt-6'>
              <div className='flex items-center gap-2 mb-4'>
                <FaCamera className='text-text-secondary text-xl' />
                <h3 className='text-text-secondary font-semibold text-lg'>
                  Fotos para Reconhecimento Facial
                </h3>
                <span className='text-sm text-text-primary'>(3-5 fotos obrigatórias)</span>
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                {[...Array(5)].map((_, index) => (
                  <div key={index} className='border-2 border-dashed border-shadow rounded-lg p-4 text-center'>
                    {photos[index] ? (
                      <div className='relative'>
                        <img
                          src={photos[index]}
                          alt={`Foto ${index + 1}`}
                          className='w-full h-32 object-cover rounded-lg mb-2'
                        />
                        <button
                          type='button'
                          onClick={() => removePhoto(index)}
                          className='absolute top-1 right-1 bg-red text-white rounded-full w-6 h-6 flex items-center justify-center text-xs'
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className='h-32 flex flex-col items-center justify-center'>
                        <FaCamera className='text-text-primary text-2xl mb-2' />
                        <span className='text-sm text-text-primary mb-2'>
                          Foto {index + 1}
                          {index < 3 && <span className='text-red'>*</span>}
                        </span>
                        <input
                          type='file'
                          accept='image/jpeg,image/jpg,image/png'
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handlePhotoUpload(index, file);
                          }}
                          className='hidden'
                          id={`photo-${index}`}
                          disabled={isSubmitting}
                        />
                        <label
                          htmlFor={`photo-${index}`}
                          className='cursor-pointer bg-blue text-white px-3 py-1 rounded text-xs hover:bg-primary'
                        >
                          Selecionar
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className='mt-3 text-sm text-text-primary'>
                <p>• Envie de 3 a 5 fotos com o rosto claramente visível</p>
                <p>• Use diferentes ângulos e expressões para melhor precisão</p>
                <p>• Formatos aceitos: JPG, JPEG, PNG</p>
              </div>
            </div>
          )}

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
