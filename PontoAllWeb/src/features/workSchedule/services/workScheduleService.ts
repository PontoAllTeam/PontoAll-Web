import { api } from '@/features/api';
import { ServiceResult, WorkSchedule } from '@/types';
import generateGenericMethods, {
  handleServiceError,
} from '@/utils/serviceUtils';

const genericMethods = generateGenericMethods<WorkSchedule>('WorkSchedule');

interface MultipleWorkSchedules {
  removed: number;
}

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
  deleteBySectorAndDate: async (
    sectorId: number,
    dayOfMonth: number,
    yearMonth: string
  ): Promise<ServiceResult<MultipleWorkSchedules>> => {
    try {
      const res = await api.delete<MultipleWorkSchedules>(
        `WorkSchedule/sector/${sectorId}?dayOfMonth=${dayOfMonth}&yearMonth=${yearMonth}`
      );
      return {
        success: true,
        message: res.data.message,
        data: {
          removed: res.data.data?.removed || 0,
        },
      };
    } catch (error) {
      return handleServiceError(error);
    }
  },
  deleteByDepartmentAndDate: async (
    departmentId: number,
    dayOfMonth: number,
    yearMonth: string
  ): Promise<ServiceResult<MultipleWorkSchedules>> => {
    try {
      const res = await api.delete<MultipleWorkSchedules>(
        `WorkSchedule/department/${departmentId}?dayOfMonth=${dayOfMonth}&yearMonth=${yearMonth}`
      );
      return {
        success: true,
        message: res.data.message,
        data: {
          removed: res.data.data?.removed || 0,
        },
      };
    } catch (error) {
      return handleServiceError(error);
    }
  },
};

export default WorkScheduleService;
