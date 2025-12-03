export interface TimeRecord {
  id: number;
  date: string;
  time: string;
  latitude: number;
  longitude: number;
  justification?: string;
  userId: number;
  photo: string;
  dailyRecordId: number;
  workScheduleId: number;
}
