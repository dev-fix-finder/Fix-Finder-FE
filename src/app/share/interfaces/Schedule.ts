export interface Schedule {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  description?: string;
}
