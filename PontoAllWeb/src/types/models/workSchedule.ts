import { ScheduleDayType } from '../enums';

export interface WorkSchedule {
  id: number;
  dayOfMonth: number;
  yearMonth: string;
  dayType: ScheduleDayType;
  markTime1: Date;
  markTime2: Date;
  markTime3: Date;
  markTime4: Date;
  markTime5: Date;
  markTime6: Date;
  markTime7: Date;
  markTime8: Date;
  markTime9: Date;
  markTime10: Date;
  userId: number;
  geofenceId: number;
}
