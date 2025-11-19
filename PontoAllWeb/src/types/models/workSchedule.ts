import { ScheduleDayType } from '../enums/scheduleDayType';

export interface WorkSchedule {
  id: number;
  dayOfMonth: number;
  yearMonth: string;
  dayType: ScheduleDayType;
  markTime1: string;
  markTime2: string;
  markTime3?: string;
  markTime4?: string;
  markTime5?: string;
  markTime6?: string;
  markTime7?: string;
  markTime8?: string;
  markTime9?: string;
  markTime10?: string;
  userId: number;
  geofenceId: number;
}
