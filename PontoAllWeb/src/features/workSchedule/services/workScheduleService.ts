import { api } from '@/features/api';
import { ServiceResult, WorkSchedule } from '@/types';
import generateGenericMethods, {
  handleServiceError,
} from '@/utils/serviceUtils';

const genericMethods = generateGenericMethods<WorkSchedule>('WorkSchedule');

const WorkScheduleService = {
  ...genericMethods,
  createByDepartment: async (
    departmentId: number,
    schedule: WorkSchedule
  ): Promise<ServiceResult<WorkSchedule>> => {
    try {
      const res = await api.post<WorkSchedule>(
        `WorkSchedule/department/${departmentId}`,
        schedule
      );
      return {
        success: true,
        message: res.data.message,
        data: res.data.data,
      };
    } catch (error) {
      return handleServiceError(error);
    }
  },
  createBySector: async (
    sectorId: number,
    schedule: WorkSchedule
  ): Promise<ServiceResult<WorkSchedule>> => {
    try {
      const res = await api.post<WorkSchedule>(
        `WorkSchedule/sector/${sectorId}`,
        schedule
      );
      return {
        success: true,
        message: res.data.message,
        data: res.data.data,
      };
    } catch (error) {
      return handleServiceError(error);
    }
  },
  deleteByUserAndDate: async (
    userId: number,
    dayOfMonth: number,
    yearMonth: string
  ): Promise<ServiceResult<void>> => {
    try {
      const res = await api.delete(
        `WorkSchedule/user/${userId}/${dayOfMonth}/${yearMonth}`
      );
      return {
        success: true,
        message: res.data.message,
      };
    } catch (error) {
      return handleServiceError(error);
    }
  },
  deleteBySectorAndDate: async (
    sectorId: number,
    dayOfMonth: number,
    yearMonth: string
  ): Promise<ServiceResult<void>> => {
    try {
      const res = await api.delete(
        `WorkSchedule/sector/${sectorId}/${dayOfMonth}/${yearMonth}`
      );
      return {
        success: true,
        message: res.data.message,
      };
    } catch (error) {
      return handleServiceError(error);
    }
  },
  deleteByDepartmentAndDate: async (
    departmentId: number,
    dayOfMonth: number,
    yearMonth: string
  ): Promise<ServiceResult<void>> => {
    try {
      const res = await api.delete(
        `WorkSchedule/department/${departmentId}/${dayOfMonth}/${yearMonth}`
      );
      return {
        success: true,
        message: res.data.message,
      };
    } catch (error) {
      return handleServiceError(error);
    }
  },
};

export default WorkScheduleService;
