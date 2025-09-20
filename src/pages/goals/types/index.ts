// Goals section - Type definitions

export interface GoalCard {
  icon: string;
  title: string;
  description: string;
}

export interface GoalsSection2 {
  title: string;
  description: string;
  ctaButton: string;
}

export interface GoalsData {
  title: string;
  description: string;
  goals: GoalCard[];
  section2: GoalsSection2;
}

export type GoalIconType =
  | "travel"
  | "business"
  | "exam"
  | "conversation"
  | "career"
  | "deadline";

export interface GoalsMetrics {
  studentsHelped: number;
  coursesCompleted: number;
  satisfactionRate: number;
  globalReach: number;
}
