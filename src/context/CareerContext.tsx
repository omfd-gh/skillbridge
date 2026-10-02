import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import type {
  UserProfile,
  RoadmapStage,
  SkillItem,
  ProjectProgress,
  Achievement,
  ChatMessage,
  ExperienceLevel,
  WeeklyHours,
  SkillBridgeUserContext,
  GoogleUser,
  AuthSession,
} from '../types';
import {
  DEFAULT_USER,
  DEFAULT_SKILLS_ASSESSMENT,
  DEFAULT_ACHIEVEMENTS,
  DEFAULT_PROJECTS,
  createFreshUser,
  createFreshRoadmap,
  createFreshProjects,
  createFreshAchievements,
} from '../data/mockUser';
import { DATA_ANALYST_ROADMAP, CAREER_OPTIONS } from '../data/careers';
import { generateSkillGapAnalysis } from '../data/aiResponses';
import { sendChatMessageToBackend, checkAIStatus } from '../services/aiApi';
import { decodeGoogleCredential } from '../services/googleAuth';

interface ToastNotification {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface CareerContextType {
  user: UserProfile;
  roadmapStages: RoadmapStage[];
  skills: SkillItem[];
  projects: ProjectProgress[];
  achievements: Achievement[];
  chatMessages: ChatMessage[];
  isAITyping: boolean;
  isAIConfigured: boolean;
  aiProvider: 'gemini' | 'none';
  authSession: AuthSession | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  toasts: ToastNotification[];
  updateUser: (updates: Partial<UserProfile>) => void;
  toggleSubTask: (stageId: string, subTaskId: string) => void;
  addSkill: (skillName: string) => void;
  removeSkill: (skillId: string) => void;
  setOnboardingData: (
    career: string,
    experience: ExperienceLevel,
    skills: string[],
    weeklyHours: WeeklyHours
  ) => void;
  sendChatMessage: (text: string) => Promise<void>;
  clearChatHistory: () => void;
  resetToDemo: () => void;
  loginWithGoogle: (credential: string) => boolean;
  logout: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  triggerCelebration: () => void;
  getSkillBridgeContext: () => SkillBridgeUserContext;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'skillbridge_app_state_v2';
const AUTH_SESSION_KEY = 'skillbridge_auth_session';

/**
 * Single source of truth calculation for Career Readiness.
 * Combines Roadmap Completion (45%), Skill Proficiencies (35%), and Project Milestones (20%).
 */
export function calculateCareerReadiness(
  skillsList: SkillItem[],
  stagesList: RoadmapStage[],
  projectsList: ProjectProgress[]
): number {
  // 1. Roadmap tasks weight: 45%
  const allTasks = stagesList.flatMap((s) => s.subTasks);
  const totalTasks = allTasks.length || 1;
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const roadmapScore = (completedTasks / totalTasks) * 100;

  // 2. Assessed skills proficiency weight: 35%
  const totalProficiency = skillsList.reduce((acc, curr) => acc + curr.proficiency, 0);
  const avgProficiency = skillsList.length > 0 ? totalProficiency / skillsList.length : 50;

  // 3. Projects progress weight: 20%
  const totalProjectProgress = projectsList.reduce((acc, curr) => acc + curr.progress, 0);
  const avgProjectProgress = projectsList.length > 0 ? totalProjectProgress / projectsList.length : 0;

  // Weighted composite score
  const composite = roadmapScore * 0.45 + avgProficiency * 0.35 + avgProjectProgress * 0.20;

  // Bound between 10% and 100%
  return Math.min(100, Math.max(15, Math.round(composite)));
}

export const CareerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load auth session from localStorage if present
  const [authSession, setAuthSession] = useState<AuthSession | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_SESSION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = Boolean(authSession);

  // Load initial state from localStorage if available, or fallback to defaults
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_SESSION_KEY);
      if (savedAuth) {
        const session = JSON.parse(savedAuth);
        const sub = session?.user?.sub;
        if (sub) {
          const userForSub = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user_${sub}`);
          if (userForSub) {
            return JSON.parse(userForSub);
          }
        }
        // If logged in via Google but hasn't completed onboarding yet: clean new user!
        if (session?.user) {
          return createFreshUser(session.user.name, session.user.email, session.user.picture);
        }
      }
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user`);
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const hasCompletedOnboarding = Boolean(user.hasCompletedOnboarding && user.targetCareer);

  const [roadmapStages, setRoadmapStages] = useState<RoadmapStage[]>(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_SESSION_KEY);
      if (savedAuth) {
        const sub = JSON.parse(savedAuth)?.user?.sub;
        if (sub) {
          const savedRoadmap = localStorage.getItem(`${LOCAL_STORAGE_KEY}_roadmap_${sub}`);
          if (savedRoadmap) return JSON.parse(savedRoadmap);
          const savedUser = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user_${sub}`);
          if (savedUser && !JSON.parse(savedUser).hasCompletedOnboarding) {
            return createFreshRoadmap(DATA_ANALYST_ROADMAP);
          }
        }
      }
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_roadmap`);
      return saved ? JSON.parse(saved) : DATA_ANALYST_ROADMAP;
    } catch {
      return DATA_ANALYST_ROADMAP;
    }
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_SESSION_KEY);
      if (savedAuth) {
        const sub = JSON.parse(savedAuth)?.user?.sub;
        if (sub) {
          const savedUser = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user_${sub}`);
          if (savedUser && !JSON.parse(savedUser).hasCompletedOnboarding) {
            return [];
          }
          const savedSkills = localStorage.getItem(`${LOCAL_STORAGE_KEY}_skills_${sub}`);
          if (savedSkills) return JSON.parse(savedSkills);
        }
      }
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_skills`);
      return saved ? JSON.parse(saved) : DEFAULT_SKILLS_ASSESSMENT;
    } catch {
      return DEFAULT_SKILLS_ASSESSMENT;
    }
  });

  const [projects, setProjects] = useState<ProjectProgress[]>(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_SESSION_KEY);
      if (savedAuth) {
        const sub = JSON.parse(savedAuth)?.user?.sub;
        if (sub) {
          const savedProjects = localStorage.getItem(`${LOCAL_STORAGE_KEY}_projects_${sub}`);
          if (savedProjects) return JSON.parse(savedProjects);
          const savedUser = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user_${sub}`);
          if (savedUser && !JSON.parse(savedUser).hasCompletedOnboarding) {
            return createFreshProjects(DEFAULT_PROJECTS);
          }
        }
      }
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_projects`);
      return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_achievements`);
      return saved ? JSON.parse(saved) : DEFAULT_ACHIEVEMENTS;
    } catch {
      return DEFAULT_ACHIEVEMENTS;
    }
  });

  const initialWelcomeMessages: ChatMessage[] = [
    {
      id: 'msg-welcome-1',
      sender: 'ai',
      text: "Hello! I'm your **SkillBridge Career Advisor**.\n\nI'm connected to your live roadmap for **Data Analyst**. Right now, your main bottleneck is **Stage 02: SQL (JOINs & Aggregations)**. How can I guide your learning this week?",
      timestamp: '10:00 AM',
      contextTag: 'Stage 02: SQL',
      suggestedActions: [
        { label: 'What should I learn next?', actionType: 'prompt', payload: 'What should I learn next?' },
        { label: 'Suggest a project for me', actionType: 'prompt', payload: 'Suggest a project for me' },
        { label: 'Am I ready for an internship?', actionType: 'prompt', payload: 'Am I ready for an internship?' },
        { label: 'Why do I need SQL?', actionType: 'prompt', payload: 'Why do I need SQL?' },
      ],
    },
  ];

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_chat`);
      return saved ? JSON.parse(saved) : initialWelcomeMessages;
    } catch {
      return initialWelcomeMessages;
    }
  });

  const [isAITyping, setIsAITyping] = useState(false);
  const [isAIConfigured, setIsAIConfigured] = useState(false);
  const [aiProvider, setAiProvider] = useState<'gemini' | 'none'>('gemini');
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Check backend AI configuration status on load
  useEffect(() => {
    checkAIStatus().then((status) => {
      setIsAIConfigured(status.configured);
      setAiProvider(status.provider);
    });
  }, []);

  // Sync to local storage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(user));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_roadmap`, JSON.stringify(roadmapStages));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_skills`, JSON.stringify(skills));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_projects`, JSON.stringify(projects));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_achievements`, JSON.stringify(achievements));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_chat`, JSON.stringify(chatMessages));
    } catch (e) {
      console.error('Failed to sync to localStorage', e);
    }
  }, [user, roadmapStages, skills, projects, achievements, chatMessages]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#7C5CFF', '#8B6CFF', '#27D6A0', '#F2F3F5'],
    });
  };

  /**
   * Builds the structured SkillBridge user context from the CURRENT live application state.
   */
  const getSkillBridgeContext = useCallback((): SkillBridgeUserContext => {
    const currentStage = roadmapStages.find((s) => s.status === 'current') || roadmapStages[0];
    const currentIndex = roadmapStages.findIndex((s) => s.id === currentStage?.id);
    const nextStage = currentIndex >= 0 && currentIndex + 1 < roadmapStages.length
      ? roadmapStages[currentIndex + 1]
      : undefined;

    const currentPendingTask = currentStage?.subTasks.find((t) => !t.completed);
    const completedTasksCount = currentStage?.subTasks.filter((t) => t.completed).length || 0;
    const totalTasksCount = currentStage?.subTasks.length || 0;

    // Detect bottleneck: lowest proficiency skill with high demand, or current stage focus
    const gapSkill = skills.find((s) => s.status === 'gap') || skills[0];
    const bottleneckDesc = currentStage
      ? `${currentStage.title} (${currentStage.subtitle})`
      : gapSkill?.name || 'Foundational competencies';

    const allSubTasks = roadmapStages.flatMap((s) => s.subTasks);
    const completedModules = allSubTasks.filter((t) => t.completed).length;

    return {
      targetRole: user.targetCareer,
      experienceLevel: user.experienceLevel,
      weeklyHours: user.weeklyHours,
      interests: 'Analytics, Relational Databases, Business Metrics',
      skills: skills.map((s) => ({
        name: s.name,
        status: s.status,
        proficiency: s.proficiency,
        category: s.category,
      })),
      currentRoadmapStage: currentStage
        ? {
            stepNumber: currentStage.stepNumber,
            title: currentStage.title,
            subtitle: currentStage.subtitle,
            status: currentStage.status,
            skills: currentStage.skills,
            currentTask: currentPendingTask?.title,
            completedTasksCount,
            totalTasksCount,
          }
        : undefined,
      nextRoadmapStage: nextStage
        ? {
            stepNumber: nextStage.stepNumber,
            title: nextStage.title,
            subtitle: nextStage.subtitle,
          }
        : undefined,
      projects: projects.map((p) => ({
        title: p.title,
        status: p.status,
        progress: p.progress,
        stageName: p.stageName,
      })),
      completedModulesCount: completedModules,
      totalModulesCount: allSubTasks.length,
      achievements: achievements.filter((a) => a.isUnlocked).map((a) => a.title),
      readinessScore: user.readinessPercentage,
      currentBottleneck: bottleneckDesc,
    };
  }, [user, roadmapStages, skills, projects, achievements]);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      const nextUser = { ...prev, ...updates };
      // Recalculate readiness if skills or preferences changed
      const recalculated = calculateCareerReadiness(skills, roadmapStages, projects);
      return { ...nextUser, readinessPercentage: recalculated };
    });
  };

  const toggleSubTask = (stageId: string, subTaskId: string) => {
    let nowCompleted = false;
    let newlyFinishedStage = false;

    setRoadmapStages((prevStages) => {
      const updated = prevStages.map((stage) => {
        if (stage.id !== stageId) return stage;

        const updatedTasks = stage.subTasks.map((task) => {
          if (task.id === subTaskId) {
            nowCompleted = !task.completed;
            return { ...task, completed: nowCompleted };
          }
          return task;
        });

        const allTasksDone = updatedTasks.every((t) => t.completed);
        const stageStatus = allTasksDone ? 'complete' : 'current';
        if (allTasksDone && stage.status !== 'complete') {
          newlyFinishedStage = true;
        }

        return {
          ...stage,
          subTasks: updatedTasks,
          status: stageStatus as any,
        };
      });

      // Recalculate overall readiness with centralized formula
      const newReadiness = calculateCareerReadiness(skills, updated, projects);
      const allSubTasks = updated.flatMap((s) => s.subTasks);
      const completedModules = allSubTasks.filter((t) => t.completed).length;

      setUser((u) => ({
        ...u,
        readinessPercentage: newReadiness,
        completedSkillsCount: Math.min(u.totalSkillsCount, 5 + Math.floor((completedModules / (allSubTasks.length || 1)) * 7)),
      }));

      return updated;
    });

    if (nowCompleted) {
      showToast('Task marked as completed! +15 XP', 'success');
      if (newlyFinishedStage) {
        triggerCelebration();
        showToast('🎉 Milestone Stage Unlocked! Outstanding work!', 'success');
      }
    }
  };

  const addSkill = (skillName: string) => {
    if (!skillName.trim()) return;
    const exists = skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase());
    if (exists) {
      showToast(`Skill "${skillName}" is already in your profile.`, 'warning');
      return;
    }

    const newSkill: SkillItem = {
      id: `custom-sk-${Date.now()}`,
      name: skillName.trim(),
      category: 'technical',
      status: 'developing',
      proficiency: 45,
      marketDemand: 'High',
      description: 'Recently added competency to track.',
      relevantJobsPercentage: 75,
    };

    const updatedSkills = [newSkill, ...skills];
    setSkills(updatedSkills);

    // Recalculate readiness
    const newReadiness = calculateCareerReadiness(updatedSkills, roadmapStages, projects);
    setUser((prev) => ({
      ...prev,
      currentSkills: [...prev.currentSkills, skillName.trim()],
      readinessPercentage: newReadiness,
      completedSkillsCount: prev.completedSkillsCount + 1,
    }));

    showToast(`Added "${skillName}" to your verified skills!`, 'success');
  };

  const removeSkill = (skillId: string) => {
    const skillToRemove = skills.find((s) => s.id === skillId);
    if (!skillToRemove) return;

    const updatedSkills = skills.filter((s) => s.id !== skillId);
    setSkills(updatedSkills);

    const newReadiness = calculateCareerReadiness(updatedSkills, roadmapStages, projects);
    setUser((prev) => ({
      ...prev,
      currentSkills: prev.currentSkills.filter((s) => s.toLowerCase() !== skillToRemove.name.toLowerCase()),
      readinessPercentage: newReadiness,
      completedSkillsCount: Math.max(1, prev.completedSkillsCount - 1),
    }));

    showToast(`Removed "${skillToRemove.name}" from your skills.`, 'info');
  };

  const setOnboardingData = (
    career: string,
    experience: ExperienceLevel,
    selectedSkills: string[],
    weeklyHours: WeeklyHours
  ) => {
    // Look up required skills for chosen career from CAREER_OPTIONS
    const careerInfo = CAREER_OPTIONS.find((c) => c.title.toLowerCase() === career.toLowerCase());
    const requiredSkillsList = careerInfo?.requiredSkills || ['SQL', 'Python', 'Git', 'Data Analysis', 'Problem Solving'];

    // Build skills list calibrated to chosen career
    const builtSkills: SkillItem[] = requiredSkillsList.map((skillName, idx) => {
      const isSelected = selectedSkills.some((s) => s.toLowerCase() === skillName.toLowerCase());
      return {
        id: `sk-${idx + 1}`,
        name: skillName,
        category: idx < 3 ? 'core' : idx < 7 ? 'technical' : 'tool',
        status: isSelected ? 'strong' : 'gap',
        proficiency: isSelected ? 80 : 15,
        marketDemand: idx < 4 ? 'Very High' : 'High',
        description: `Key competency for ${career}.`,
        relevantJobsPercentage: Math.max(65, 95 - idx * 3),
      };
    });

    // Also include any custom selected skills not in the default required list
    selectedSkills.forEach((skillName, idx) => {
      const alreadyIncluded = builtSkills.some((s) => s.name.toLowerCase() === skillName.toLowerCase());
      if (!alreadyIncluded) {
        builtSkills.push({
          id: `custom-sk-${idx + 1}`,
          name: skillName,
          category: 'technical',
          status: 'strong',
          proficiency: 85,
          marketDemand: 'High',
          description: 'Custom verified competency.',
          relevantJobsPercentage: 80,
        });
      }
    });

    setSkills(builtSkills);

    // Fresh roadmap with stage 1 current and all uncompleted
    const freshRoadmap = createFreshRoadmap(DATA_ANALYST_ROADMAP);
    setRoadmapStages(freshRoadmap);

    const freshProjects = createFreshProjects(DEFAULT_PROJECTS);
    setProjects(freshProjects);

    const initialReadiness = calculateCareerReadiness(builtSkills, freshRoadmap, freshProjects);

    const updatedUser: UserProfile = {
      ...user,
      targetCareer: career,
      experienceLevel: experience,
      currentSkills: selectedSkills,
      weeklyHours: weeklyHours,
      readinessPercentage: initialReadiness,
      completedSkillsCount: selectedSkills.length,
      totalSkillsCount: builtSkills.length,
      hasCompletedOnboarding: true,
    };

    setUser(updatedUser);

    // Persist per-user state in localStorage
    const sub = authSession?.user?.sub;
    if (sub) {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_user_${sub}`, JSON.stringify(updatedUser));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_skills_${sub}`, JSON.stringify(builtSkills));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_roadmap_${sub}`, JSON.stringify(freshRoadmap));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_projects_${sub}`, JSON.stringify(freshProjects));
    }
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(updatedUser));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_skills`, JSON.stringify(builtSkills));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_roadmap`, JSON.stringify(freshRoadmap));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_projects`, JSON.stringify(freshProjects));

    showToast('Your personalized roadmap & skill gap analysis have been generated!', 'success');
  };

  /**
   * Real AI Chat Execution:
   * Sends user query + recent history + live user context to the backend API.
   */
  const sendChatMessage = async (text: string): Promise<void> => {
    if (!text || !text.trim() || isAITyping) return;

    const userMessageText = text.trim();

    // 1. Append user message to conversation immediately
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userMessageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsAITyping(true);

    try {
      // 2. Build current context snapshot from live application state
      const context = getSkillBridgeContext();

      // Format previous conversation turns
      const previousTurns = chatMessages.slice(-6).map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      // 3. Make real HTTP POST request to SkillBridge server API
      const result = await sendChatMessageToBackend(userMessageText, previousTurns, context);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: result.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        contextTag: result.contextTag,
        isError: result.isError,
        suggestedActions: result.suggestedActions,
      };

      setChatMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "Connection failed. Check your connection and try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        contextTag: 'Network Error',
        isError: true,
      };
      setChatMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsAITyping(false);
    }
  };

  const clearChatHistory = () => {
    setChatMessages(initialWelcomeMessages);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_chat`);
    showToast('Chat history cleared.', 'info');
  };

  const loginWithGoogle = (credential: string): boolean => {
    const googleUser = decodeGoogleCredential(credential);
    if (!googleUser) {
      showToast('Could not verify Google account details.', 'warning');
      return false;
    }

    const session: AuthSession = {
      user: googleUser,
      token: credential,
      loginAt: Date.now(),
    };

    setAuthSession(session);
    try {
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.error('Failed to save auth session', e);
    }

    // Check if this specific Google user has an existing saved profile with completed onboarding
    const userStorageKey = `${LOCAL_STORAGE_KEY}_user_${googleUser.sub}`;
    const savedUserProfile = localStorage.getItem(userStorageKey);

    if (savedUserProfile) {
      try {
        const parsed: UserProfile = JSON.parse(savedUserProfile);
        if (parsed.hasCompletedOnboarding && parsed.targetCareer) {
          const updated = {
            ...parsed,
            name: googleUser.name || parsed.name,
            email: googleUser.email || parsed.email,
            avatarUrl: googleUser.picture || parsed.avatarUrl,
          };
          setUser(updated);

          const savedRoadmap = localStorage.getItem(`${LOCAL_STORAGE_KEY}_roadmap_${googleUser.sub}`);
          if (savedRoadmap) setRoadmapStages(JSON.parse(savedRoadmap));

          const savedSkills = localStorage.getItem(`${LOCAL_STORAGE_KEY}_skills_${googleUser.sub}`);
          if (savedSkills) setSkills(JSON.parse(savedSkills));

          const savedProjects = localStorage.getItem(`${LOCAL_STORAGE_KEY}_projects_${googleUser.sub}`);
          if (savedProjects) setProjects(JSON.parse(savedProjects));

          showToast(`Welcome back, ${googleUser.name}!`, 'success');
          return true;
        }
      } catch (e) {
        console.error('Error restoring saved user profile', e);
      }
    }

    // NEW GOOGLE USER: Start with completely clean, empty profile and fresh roadmap!
    const freshUser = createFreshUser(googleUser.name, googleUser.email, googleUser.picture);
    setUser(freshUser);
    setRoadmapStages(createFreshRoadmap(DATA_ANALYST_ROADMAP));
    setSkills([]);
    setProjects(createFreshProjects(DEFAULT_PROJECTS));
    setAchievements(createFreshAchievements(DEFAULT_ACHIEVEMENTS));

    try {
      localStorage.setItem(userStorageKey, JSON.stringify(freshUser));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(freshUser));
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_skills_${googleUser.sub}`);
    } catch (e) {
      console.error('Failed to save fresh user state', e);
    }

    showToast(`Welcome, ${googleUser.name}! Please set up your career profile.`, 'info');
    return true;
  };

  const logout = () => {
    try {
      if (window.google?.accounts?.id?.disableAutoSelect) {
        window.google.accounts.id.disableAutoSelect();
      }
    } catch (e) {
      console.warn('Error disabling auto select', e);
    }

    setAuthSession(null);
    try {
      localStorage.removeItem(AUTH_SESSION_KEY);
    } catch (e) {
      console.error('Failed to remove auth session', e);
    }
    showToast('Signed out successfully.', 'info');
  };

  const resetToDemo = () => {
    setUser(DEFAULT_USER);
    setRoadmapStages(DATA_ANALYST_ROADMAP);
    setSkills(DEFAULT_SKILLS_ASSESSMENT);
    setProjects(DEFAULT_PROJECTS);
    setAchievements(DEFAULT_ACHIEVEMENTS);
    setChatMessages(initialWelcomeMessages);

    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_user`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_roadmap`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_skills`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_projects`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_achievements`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_chat`);

    showToast('Reset to demo user: Aarav (Data Analyst)', 'info');
  };

  return (
    <CareerContext.Provider
      value={{
        user,
        roadmapStages,
        skills,
        projects,
        achievements,
        chatMessages,
        isAITyping,
        isAIConfigured,
        aiProvider,
        authSession,
        isAuthenticated,
        hasCompletedOnboarding,
        toasts,
        updateUser,
        toggleSubTask,
        addSkill,
        removeSkill,
        setOnboardingData,
        sendChatMessage,
        clearChatHistory,
        resetToDemo,
        loginWithGoogle,
        logout,
        showToast,
        removeToast,
        triggerCelebration,
        getSkillBridgeContext,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
};

export const useCareer = () => {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error('useCareer must be used within a CareerProvider');
  }
  return context;
};
