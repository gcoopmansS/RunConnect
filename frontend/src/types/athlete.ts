export interface WorkoutEvent {
  id: number;
  title: string;
  date: string;
  athlete: string;
  status?: string;
}

export interface Athlete {
  id: number;
  name: string;
  email: string;
  status: string;
  weeklyDistance: number;
  events: WorkoutEvent[];
}
