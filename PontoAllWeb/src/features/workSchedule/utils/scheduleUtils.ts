import { WorkSchedule } from '@/types';

export function getMarkTimes(schedule?: WorkSchedule) {
  if (!schedule) return [];
  const markTimes = schedule
    ? Object.keys(schedule)
        .filter((key) => key.startsWith('markTime'))
        .map((markTime) => {
          const timeString = schedule[markTime as keyof WorkSchedule] as string;
          if (!timeString) return null;
          return timeString.substring(0, 5); // Extrai HH:MM de HH:MM:SS
        })
        .filter(Boolean) // Remove valores nulos
    : [];

  return markTimes;
}
