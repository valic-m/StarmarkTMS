import { BadgeBg } from 'components/base/Badge';

// Define the Member type
export interface Member {
  id: number;
  name: string;
  avatar?: string; // Optional avatar field
  role?: string; // Optional role field
}

export interface Status {
  ongoing: number;
  critical: number;
  inactive: number;
  completed: number;
}

export interface Project {
  id: number;
  name: string;
  start: string;
  deadline: string;
  calculation?: {
    amount: string;
    label: string;
  };
  assigness: Member[]; // Updated to use the defined Member type
  progress: {
    min: number;
    max: number;
  };
  task: number;
  statusProgress: Status;
  status: {
    label: string;
    type: BadgeBg;
  };
  bg: string;
  budget: number;
}

export const projects: Project[] = [];
