import { WorkSchedule } from '@/types';
import generateGenericMethods from '@/utils/serviceUtils';

const genericMethods = generateGenericMethods<WorkSchedule>('WorkSchedule');

const WorkScheduleService = {
  ...genericMethods,
};

export default WorkScheduleService;
