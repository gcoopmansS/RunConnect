export interface User {
  id: string;
  name: string;
  email: string;
  role: "coach" | "athlete";
  avatar?: string;
  createdAt: Date;
}

export interface Coach extends User {
  role: "coach";
  specialization: string[];
  experience: number;
  certification?: string;
  bio: string;
  athletes: string[];
}

export interface Athlete extends User {
  role: "athlete";
  age: number;
  experience: string;
  goals: string[];
  coach?: string;
  personalBest?: Record<string, string>;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  type:
    | "easy_run"
    | "tempo"
    | "intervals"
    | "long_run"
    | "recovery"
    | "strength";
  duration: number;
  distance?: number;
  intensity: "low" | "medium" | "high";
  exercises: Exercise[];
  coachId: string;
  assignedTo?: string[];
  scheduledDate?: Date;
  createdAt: Date;
  sport?: "running" | "strength"; // Add sport property
}

// Refactored Exercise type to support block types and repeat (interval) blocks
export type Exercise =
  | {
      id: string;
      type: "warmup" | "cooldown" | "run" | "recovery";
      name: string;
      description: string;
      duration?: number;
      durationStr?: string; // hh:mm:ss format for UI
      distance?: number;
      distanceUnit?: "km" | "m"; // unit for distance
      repetitions?: number;
      restTime?: number;
      intensity?: string;
    }
  | {
      id: string;
      type: "repeat";
      name: string; // e.g., "Repeat Interval"
      description: string;
      repeatCount: number;
      children: Exercise[];
    };

export interface WorkoutLog {
  id: string;
  workoutId: string;
  athleteId: string;
  completedAt: Date;
  duration: number;
  distance?: number;
  notes?: string;
  rating: number;
  heartRate?: {
    avg: number;
    max: number;
  };
}

export interface Connection {
  id: string;
  coachId: string;
  athleteId: string;
  status: "pending" | "accepted" | "declined";
  createdAt: Date;
}
