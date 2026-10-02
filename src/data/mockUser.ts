import { UserProfile, SkillItem, Achievement, ProjectProgress } from '../types';

export const DEFAULT_USER: UserProfile = {
  name: 'Aarav',
  age: 21,
  education: 'B.S. in Computer Science, Year 3',
  targetCareer: 'Data Analyst',
  experienceLevel: 'Beginner',
  weeklyHours: '4–6 hours',
  currentSkills: ['Excel', 'Python', 'Data Cleaning'],
  readinessPercentage: 64,
  streakDays: 8,
  completedSkillsCount: 7,
  totalSkillsCount: 12,
  completedProjectsCount: 2,
  totalProjectsCount: 4,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
};

export const DEFAULT_SKILLS_ASSESSMENT: SkillItem[] = [
  // Strong
  {
    id: 'sk-1',
    name: 'Excel & Spreadsheets',
    category: 'core',
    status: 'strong',
    proficiency: 88,
    marketDemand: 'Very High',
    description: 'Expertise in formulas, VLOOKUP/XLOOKUP, and pivot tables.',
    relevantJobsPercentage: 92,
  },
  {
    id: 'sk-2',
    name: 'Data Cleaning',
    category: 'methodology',
    status: 'strong',
    proficiency: 82,
    marketDemand: 'High',
    description: 'Handling missing values, deduplication, formatting and outlier detection.',
    relevantJobsPercentage: 86,
  },
  // Developing
  {
    id: 'sk-3',
    name: 'Python Fundamentals',
    category: 'technical',
    status: 'developing',
    proficiency: 58,
    marketDemand: 'Very High',
    description: 'Basic scripting, loops, data structures, and introductory data frames.',
    relevantJobsPercentage: 80,
  },
  {
    id: 'sk-4',
    name: 'Introductory Statistics',
    category: 'core',
    status: 'developing',
    proficiency: 52,
    marketDemand: 'High',
    description: 'Descriptive stats, distributions, averages, and spread measurements.',
    relevantJobsPercentage: 74,
  },
  // Needs Attention / Gaps
  {
    id: 'sk-5',
    name: 'SQL & Database Queries',
    category: 'technical',
    status: 'gap',
    proficiency: 28,
    marketDemand: 'Very High',
    description: 'Relational database queries, multi-table JOINs, aggregations, and CTEs.',
    relevantJobsPercentage: 94,
  },
  {
    id: 'sk-6',
    name: 'Tableau & Data Viz',
    category: 'tool',
    status: 'gap',
    proficiency: 15,
    marketDemand: 'High',
    description: 'Interactive dashboard creation, storytelling, and visual KPI tracking.',
    relevantJobsPercentage: 78,
  },
  {
    id: 'sk-7',
    name: 'Advanced Statistics & A/B Testing',
    category: 'core',
    status: 'gap',
    proficiency: 10,
    marketDemand: 'High',
    description: 'Hypothesis testing, statistical significance, p-values, and experiment sizing.',
    relevantJobsPercentage: 68,
  },
];

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'First Project Shipped',
    description: 'Completed and documented your first end-to-end spreadsheet data audit.',
    icon: 'Rocket',
    unlockedAt: 'Oct 2, 2026',
    isUnlocked: true,
  },
  {
    id: 'ach-2',
    title: '7-Day Learning Streak',
    description: 'Stayed consistent for 7 consecutive days on your career roadmap.',
    icon: 'Flame',
    unlockedAt: 'Yesterday',
    isUnlocked: true,
  },
  {
    id: 'ach-3',
    title: 'SQL Novice',
    description: 'Wrote your first 20 SELECT queries without syntax errors.',
    icon: 'Database',
    unlockedAt: '3 days ago',
    isUnlocked: true,
  },
  {
    id: 'ach-4',
    title: 'Data Wrangler',
    description: 'Cleaned a dirty dataset with over 10,000 messy records.',
    icon: 'CheckCircle2',
    unlockedAt: '1 week ago',
    isUnlocked: true,
  },
  {
    id: 'ach-5',
    title: 'Portfolio Master',
    description: 'Publish 3 complete industry-grade case studies to GitHub and Tableau Public.',
    icon: 'Briefcase',
    isUnlocked: false,
  },
  {
    id: 'ach-6',
    title: 'Interview Ready',
    description: 'Pass 5 mock technical interview challenges and finalize your tailored resume.',
    icon: 'Award',
    isUnlocked: false,
  },
];

export const DEFAULT_PROJECTS: ProjectProgress[] = [
  {
    id: 'proj-1',
    title: 'E-Commerce Sales Audit & Reporting Sheet',
    stageName: 'Stage 01: Foundations',
    status: 'completed',
    progress: 100,
    tasksCount: 4,
    completedTasks: 4,
    githubUrl: 'https://github.com/aarav/ecommerce-sales-audit',
    technologies: ['Advanced Excel', 'Pivot Tables', 'XLOOKUP', 'Data Cleaning'],
    estimatedHours: 8,
  },
  {
    id: 'proj-2',
    title: 'Subscription Churn & Revenue Analysis (SQL)',
    stageName: 'Stage 02: SQL',
    status: 'in_progress',
    progress: 45,
    tasksCount: 4,
    completedTasks: 2,
    githubUrl: 'https://github.com/aarav/saas-churn-sql',
    technologies: ['PostgreSQL', 'Multi-table JOINs', 'CTEs', 'Window Functions'],
    estimatedHours: 12,
  },
  {
    id: 'proj-3',
    title: 'Checkout Funnel A/B Test Statistical Evaluation',
    stageName: 'Stage 03: Statistics',
    status: 'not_started',
    progress: 0,
    tasksCount: 4,
    completedTasks: 0,
    technologies: ['Python', 'SciPy', 'Hypothesis Testing', 'Data Viz'],
    estimatedHours: 10,
  },
  {
    id: 'proj-4',
    title: 'Interactive Tableau Public Portfolio & Case Study Repo',
    stageName: 'Stage 05: Portfolio',
    status: 'not_started',
    progress: 0,
    tasksCount: 4,
    completedTasks: 0,
    technologies: ['Tableau Public', 'Dashboard Design', 'Storytelling', 'GitHub'],
    estimatedHours: 15,
  },
];

export function createFreshUser(name: string, email: string, avatarUrl: string): UserProfile {
  return {
    name: name || 'Student',
    email: email || '',
    age: 20,
    education: 'University Student',
    targetCareer: '',
    experienceLevel: 'Beginner',
    weeklyHours: '4–6 hours',
    currentSkills: [],
    readinessPercentage: 0,
    streakDays: 1,
    completedSkillsCount: 0,
    totalSkillsCount: 0,
    completedProjectsCount: 0,
    totalProjectsCount: 4,
    avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    studyRemindersEnabled: true,
    hasCompletedOnboarding: false,
  };
}

export function createFreshRoadmap(baseRoadmap: import('../types').RoadmapStage[]): import('../types').RoadmapStage[] {
  return baseRoadmap.map((stage, idx) => ({
    ...stage,
    status: idx === 0 ? 'current' : 'locked',
    subTasks: stage.subTasks.map((t) => ({ ...t, completed: false })),
  }));
}

export function createFreshProjects(baseProjects: ProjectProgress[]): ProjectProgress[] {
  return baseProjects.map((p) => ({
    ...p,
    status: 'not_started',
    progress: 0,
    completedTasks: 0,
  }));
}

export function createFreshAchievements(baseAchievements: Achievement[]): Achievement[] {
  return baseAchievements.map((a) => ({
    ...a,
    isUnlocked: false,
    unlockedAt: undefined,
  }));
}
