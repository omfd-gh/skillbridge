export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type WeeklyHours = '1–3 hours' | '4–6 hours' | '7–10 hours' | '10+ hours';

export type SkillStatus = 'strong' | 'developing' | 'gap';

export interface SkillItem {
  id: string;
  name: string;
  category: 'core' | 'technical' | 'tool' | 'methodology';
  status: SkillStatus;
  proficiency: number; // 0 - 100
  marketDemand: 'Very High' | 'High' | 'Moderate';
  description: string;
  relevantJobsPercentage: number;
}

export type StageStatus = 'complete' | 'current' | 'locked';

export interface RoadmapSubTask {
  id: string;
  title: string;
  completed: boolean;
  estimatedHours: number;
  resourceTitle?: string;
  resourceUrl?: string;
}

export interface RoadmapStage {
  id: string;
  stepNumber: string; // e.g. "01", "02"
  title: string;
  subtitle: string;
  description: string;
  status: StageStatus;
  estimatedWeeks: number;
  skills: string[];
  subTasks: RoadmapSubTask[];
  project: {
    title: string;
    description: string;
    deliverables: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  };
  resources: {
    title: string;
    type: 'Course' | 'Documentation' | 'Practice' | 'Video';
    duration: string;
    isFree: boolean;
    url?: string;
  }[];
}

export interface CareerOption {
  id: string;
  title: string;
  shortDescription: string;
  averageSalary: string;
  jobGrowth: string;
  totalStages: number;
  popularSkills: string[];
  requiredSkills: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

export interface ProjectProgress {
  id: string;
  title: string;
  stageName: string;
  status: 'completed' | 'in_progress' | 'not_started';
  progress: number; // 0-100
  tasksCount: number;
  completedTasks: number;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string[];
  estimatedHours?: number;
}

export interface GoogleUser {
  sub: string;
  email: string;
  name: string;
  picture: string;
  given_name?: string;
  family_name?: string;
  email_verified?: boolean;
}

export interface AuthSession {
  user: GoogleUser;
  token: string;
  loginAt: number;
}

export interface UserProfile {
  name: string;
  email?: string;
  age: number;
  education: string;
  targetCareer: string;
  experienceLevel: ExperienceLevel;
  weeklyHours: WeeklyHours;
  currentSkills: string[];
  readinessPercentage: number;
  streakDays: number;
  completedSkillsCount: number;
  totalSkillsCount: number;
  completedProjectsCount: number;
  totalProjectsCount: number;
  avatarUrl: string;
  studyRemindersEnabled?: boolean;
  hasCompletedOnboarding?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  contextTag?: string;
  isError?: boolean;
  suggestedActions?: {
    label: string;
    actionType: 'navigate' | 'filter' | 'prompt';
    payload: string;
  }[];
}

export interface SkillBridgeUserContext {
  targetRole: string;
  experienceLevel: ExperienceLevel;
  weeklyHours: WeeklyHours;
  interests?: string;
  skills: {
    name: string;
    status: SkillStatus;
    proficiency: number;
    category?: string;
  }[];
  currentRoadmapStage?: {
    stepNumber: string;
    title: string;
    subtitle: string;
    status: StageStatus;
    skills: string[];
    currentTask?: string;
    completedTasksCount: number;
    totalTasksCount: number;
  };
  nextRoadmapStage?: {
    stepNumber: string;
    title: string;
    subtitle: string;
  };
  projects: {
    title: string;
    status: 'completed' | 'in_progress' | 'not_started';
    progress: number;
    stageName: string;
  }[];
  completedModulesCount: number;
  totalModulesCount: number;
  achievements: string[];
  readinessScore: number;
  currentBottleneck: string;
}
