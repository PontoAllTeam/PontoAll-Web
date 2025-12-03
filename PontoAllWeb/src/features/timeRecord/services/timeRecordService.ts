import { TimeRecord } from '@/types';
import generateGenericMethods from '@/utils/serviceUtils';

const genericMethods = generateGenericMethods<TimeRecord>('TimeRecord');

const TimeRecordService = {
  ...genericMethods,
};

export default TimeRecordService;