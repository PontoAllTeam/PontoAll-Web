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
};

export default WorkScheduleService;
