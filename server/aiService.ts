import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import type { SkillBridgeUserContext } from '../src/types/index.ts';

dotenv.config();

// Centralized configuration for the Gemini model
export const DEFAULT_GEMINI_MODEL = 'gemini-3.5-flash-lite';

export interface ChatRequestPayload {
  message: string;
  conversation?: { sender: 'user' | 'ai'; text: string }[];
  context?: SkillBridgeUserContext;
}

export interface ChatResponsePayload {
  message: string;
  contextTag?: string;
  suggestedActions?: {
    label: string;
    actionType: 'navigate' | 'filter' | 'prompt';
    payload: string;
  }[];
  provider: 'gemini';
  model: string;
}

export interface AIStatusPayload {
  configured: boolean;
  provider: 'gemini';
  model: string;
}

class AIService {
  private geminiClient: GoogleGenAI | null = null;

  constructor() {
    this.initClient();
  }

  private initClient() {
    dotenv.config({ override: true });

    const geminiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)?.trim();
    if (geminiKey && geminiKey.length > 0 && geminiKey !== 'your_gemini_api_key_here') {
      try {
        this.geminiClient = new GoogleGenAI({ apiKey: geminiKey });
      } catch (err) {
        console.error('[SkillBridge] Failed to initialize Gemini client:', err);
        this.geminiClient = null;
      }
    } else {
      this.geminiClient = null;
    }
  }

  public isConfigured(): boolean {
    this.initClient();
    return Boolean(this.geminiClient);
  }

  public getStatus(): AIStatusPayload {
    this.initClient();
    const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
    return {
      configured: Boolean(this.geminiClient),
      provider: 'gemini',
      model,
    };
  }

  public async generateResponse(payload: ChatRequestPayload): Promise<ChatResponsePayload> {
    this.initClient();

    if (!this.isConfigured() || !this.geminiClient) {
      const err = new Error("Gemini AI is not configured. Add GEMINI_API_KEY to your environment.");
      (err as any).statusCode = 503;
      throw err;
    }

    const { message, conversation = [], context } = payload;
    if (!message || message.trim().length === 0) {
      const err = new Error('Message cannot be empty.');
      (err as any).statusCode = 400;
      throw err;
    }

    const systemPrompt = this.buildSystemPrompt(context);
    const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;

    // Format previous turns for Gemini multi-turn schema
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    const recentHistory = conversation.slice(-8);

    for (const msg of recentHistory) {
      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      });
    }

    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    try {
      const response = await this.geminiClient.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          maxOutputTokens: 1000,
        },
      });

      const responseText = response.text?.trim();
      if (!responseText) {
        throw new Error('Empty response received from Gemini model.');
      }

      const contextTag = context?.currentRoadmapStage
        ? `Stage ${context.currentRoadmapStage.stepNumber}: ${context.currentRoadmapStage.title}`
        : `${context?.targetRole || 'SkillBridge'} Advisor`;

      const suggestedActions: ChatResponsePayload['suggestedActions'] = [];
      if (context?.currentRoadmapStage) {
        suggestedActions.push({
          label: 'View Stage in Roadmap',
          actionType: 'navigate',
          payload: '/roadmap',
        });
      }

      return {
        message: responseText,
        contextTag,
        suggestedActions: suggestedActions.length > 0 ? suggestedActions : undefined,
        provider: 'gemini',
        model,
      };
    } catch (geminiError: any) {
      console.error('[SkillBridge Gemini API Error]:', geminiError?.message || geminiError);

      const status = geminiError?.status || geminiError?.code;
      if (status === 401 || status === 403 || geminiError?.message?.includes('API_KEY_INVALID')) {
        const err = new Error('Invalid Gemini API key. Please check GEMINI_API_KEY in your environment.');
        (err as any).statusCode = 401;
        throw err;
      }

      if (status === 429) {
        const err = new Error('Gemini API quota or rate limit exceeded. Please try again shortly.');
        (err as any).statusCode = 429;
        throw err;
      }

      if (status === 503 || geminiError?.message?.includes('high demand')) {
        const err = new Error('Gemini is experiencing temporary high demand. Please try again in a few moments.');
        (err as any).statusCode = 503;
        throw err;
      }

      const err = new Error(
        geminiError?.message && geminiError.message.length < 150
          ? geminiError.message
          : "SkillBridge AI couldn't respond right now. Please try again."
      );
      (err as any).statusCode = status && typeof status === 'number' && status >= 400 && status < 600 ? status : 502;
      throw err;
    }
  }

  private buildSystemPrompt(context?: SkillBridgeUserContext): string {
    if (!context) {
      return `You are the SkillBridge Career Advisor, an AI career mentor for college students.
Help the student prepare for tech and analytical roles with structured, practical advice.
Give concise actionable answers formatted in Markdown. Avoid generic motivational filler.`;
    }

    const skillsBreakdown = Array.isArray(context.skills) && context.skills.length > 0
      ? context.skills.map((s) => `${s.name}: ${s.proficiency}% (${s.status})`).join(', ')
      : 'No skills assessed yet';

    const projectsList = Array.isArray(context.projects) && context.projects.length > 0
      ? context.projects.map((p) => `"${p.title}" [Status: ${p.status}, Progress: ${p.progress}%]`).join('; ')
      : 'None started';

    const achievementsList = Array.isArray(context.achievements) && context.achievements.length > 0
      ? context.achievements.join(', ')
      : 'First Milestone, 7-Day Streak';

    const completedMods = context.completedModulesCount ?? 0;
    const totalMods = context.totalModulesCount ?? 0;

    return `You are the "SkillBridge Career Advisor", a specialized career planning and technical mentor for college students.
Your mission is to guide the student to become job-ready by prioritizing their roadmap, addressing skill bottlenecks, and recommending verifiable portfolio projects.

CANDIDATE PROGRESS & SKILLBRIDGE CONTEXT:
- Target Role: ${context.targetRole || 'Data Analyst'}
- Experience Level: ${context.experienceLevel || 'Beginner'}
- Weekly Time Budget: ${context.weeklyHours || '4-6 hrs/week'}
- Overall Career Readiness: ${context.readinessScore ?? 48}%
- Primary Bottleneck / Focus Need: ${context.currentBottleneck || 'Core foundational skills'}
- Current Roadmap Stage: ${context.currentRoadmapStage ? `Stage ${context.currentRoadmapStage.stepNumber}: ${context.currentRoadmapStage.title} (${context.currentRoadmapStage.subtitle})` : 'Stage 02: SQL & Relational Databases'}
- Current Active Task / Module: ${context.currentRoadmapStage?.currentTask || 'Multi-table queries & aggregations'}
- Stage Completion Progress: ${context.currentRoadmapStage ? `${context.currentRoadmapStage.completedTasksCount ?? 0} of ${context.currentRoadmapStage.totalTasksCount ?? 4} modules completed` : '1 of 4 completed'}
- Next Roadmap Milestone: ${context.nextRoadmapStage ? `Stage ${context.nextRoadmapStage.stepNumber}: ${context.nextRoadmapStage.title}` : 'Stage 03: Python for Data Analysis'}
- Assessed Skills & Proficiencies: ${skillsBreakdown}
- Portfolio Projects: ${projectsList}
- Total Learning Modules Completed: ${completedMods} / ${totalMods}
- Earned Achievements: ${achievementsList}

CRITICAL GUIDELINES FOR YOUR RESPONSES:
1. Always ground your advice in their actual SkillBridge data above. If their target role is ${context.targetRole || 'Data Analyst'} and their weekly budget is ${context.weeklyHours || '4-6 hrs/week'}, tailor every recommendation specifically to that.
2. Prioritize weak/bottleneck skills (${context.currentBottleneck || 'SQL'}) and explain WHY that skill is non-negotiable for ${context.targetRole || 'Data Analyst'} interviews.
3. If the user asks what to learn next or how to spend their weekly hours, break it down into an exact time-budgeted plan (e.g. for ${context.weeklyHours || '4-6 hrs/week'}) focusing on their current roadmap stage (${context.currentRoadmapStage?.title || 'Current Stage'}).
4. Avoid generic motivational fluff. Be direct, tactical, technical, and encouraging.
5. NEVER invent completed projects or certifications that are not in the context.
6. Use clean Markdown with headers (##, ###), bullet points, bold key terms, and code snippets or sample query patterns where appropriate.`;
  }
}

export const aiService = new AIService();
