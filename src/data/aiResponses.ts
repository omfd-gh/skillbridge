import { UserProfile, RoadmapStage, SkillItem } from '../types';

export interface AIAnalysisResult {
  headline: string;
  summary: string;
  strongSkills: string[];
  developingSkills: string[];
  missingSkills: string[];
  priorityTopic: string;
  recommendedProject: {
    title: string;
    description: string;
    skillsApplied: string[];
  };
  weeklyScheduleAdvice: string;
  readinessScore: number;
}

export function generateSkillGapAnalysis(
  career: string,
  userSkills: string[],
  experience: string,
  weeklyHours: string
): AIAnalysisResult {
  const isDataAnalyst = career.toLowerCase().includes('data');

  if (isDataAnalyst) {
    const hasExcel = userSkills.some((s) => s.toLowerCase().includes('excel'));
    const hasPython = userSkills.some((s) => s.toLowerCase().includes('python'));
    const hasSQL = userSkills.some((s) => s.toLowerCase().includes('sql'));
    const hasTableau = userSkills.some((s) => s.toLowerCase().includes('tableau'));

    const strong = [];
    const developing = [];
    const missing = [];

    if (hasExcel) strong.push('Excel & Data Manipulation');
    else missing.push('Excel & Spreadsheets');

    if (userSkills.some((s) => s.toLowerCase().includes('cleaning') || s.toLowerCase().includes('analysis'))) {
      strong.push('Data Cleaning & Quality Assurance');
    }

    if (hasPython) {
      developing.push('Python (Pandas / NumPy)');
    } else {
      missing.push('Python Scripting');
    }

    developing.push('Introductory Statistics');

    if (hasSQL) {
      developing.push('Intermediate SQL');
    } else {
      missing.push('SQL Queries & Relational Schemas');
    }

    if (!hasTableau) {
      missing.push('Tableau / BI Visualizations');
    }

    missing.push('A/B Testing & Hypothesis Testing');

    const score = hasExcel && hasPython && hasSQL ? 78 : hasExcel && hasPython ? 64 : 45;

    return {
      headline: 'Strong spreadsheet foundation with key relational gaps.',
      summary:
        'Your current skills give you a strong foundation for Data Analytics. Your biggest gaps are SQL and data visualization. Focus on SQL next to unlock the next stage of your roadmap.',
      strongSkills: strong.length > 0 ? strong : ['Analytical Reasoning'],
      developingSkills: developing,
      missingSkills: missing,
      priorityTopic: 'SQL JOINs & Multi-table Queries',
      recommendedProject: {
        title: 'Subscription Churn & Revenue Analysis (SQL)',
        description: 'Analyze real-world customer churn, lifetime value, and cohort retention across 3 relational tables using PostgreSQL and window functions.',
        skillsApplied: ['SQL JOINs', 'Aggregations', 'Data Cleaning', 'Cohort Analysis'],
      },
      weeklyScheduleAdvice: `With your commitment of ${weeklyHours}, prioritize 2 hours of hands-on query writing and 1 hour reviewing relational database schemas.`,
      readinessScore: score,
    };
  }

  // General software / tech role fallback
  return {
    headline: `Personalized skill profile for ${career}`,
    summary: `Based on your ${experience.toLowerCase()} level and chosen time commitment (${weeklyHours}), we have calibrated your roadmap to prioritize high-impact fundamental competencies first.`,
    strongSkills: userSkills.slice(0, 2),
    developingSkills: userSkills.slice(2, 4).length > 0 ? userSkills.slice(2, 4) : ['Core Algorithms'],
    missingSkills: ['System Design Basics', 'Industry Best Practices', 'Production Testing'],
    priorityTopic: 'Core Technical Workflows & Git Collaboration',
    recommendedProject: {
      title: `${career} Starter Portfolio Project`,
      description: 'An industry-aligned project showcasing end-to-end implementation and documentation.',
      skillsApplied: userSkills.slice(0, 3),
    },
    weeklyScheduleAdvice: `Dedicate ${weeklyHours} focusing 60% on project building and 40% on theory.`,
    readinessScore: 58,
  };
}

export function getAIChatResponse(
  query: string,
  user: UserProfile,
  stages: RoadmapStage[],
  _skills: SkillItem[]
): { text: string; contextTag: string; suggestedActions?: any[] } {
  const q = query.toLowerCase();

  // "What should I learn next?"
  if (q.includes('learn next') || q.includes('what should i learn') || q.includes('next step')) {
    return {
      text: `Based on your roadmap for **${user.targetCareer}**, your immediate next priority is **SQL JOINs (INNER, LEFT, and RIGHT)** in Stage 02.

**Why right now?**
1. You have already completed **Stage 01: Foundations (Excel & Data Cleaning)**.
2. 94% of entry-level data analyst job postings require SQL query fluency.
3. Once you complete multi-table queries, you unlock **Stage 03: Statistics** and the **Subscription Churn Analysis** project.

**Recommended action:** Spend 45 minutes on interactive exercises writing \`LEFT JOIN\` conditions on two related tables.`,
      contextTag: 'Roadmap Stage 02: SQL',
      suggestedActions: [
        { label: 'View SQL Stage in Roadmap', actionType: 'navigate', payload: '/roadmap' },
        { label: 'Suggest a practice query', actionType: 'prompt', payload: 'Give me a practice SQL problem on JOINs' },
      ],
    };
  }

  // "Suggest a project"
  if (q.includes('suggest a project') || q.includes('project') || q.includes('portfolio idea')) {
    return {
      text: `Here is a high-impact project perfectly matched to your current skill level (**Excel** + developing **Python** & **SQL**):

### 📊 **SaaS Subscription Churn & MRR Dashboard**
* **The Business Problem:** A subscription company wants to know which customer cohorts are canceling and why.
* **Tools to Use:** PostgreSQL / SQLite + Python (Pandas)
* **What you will build:**
  1. A relational database schema linking \`customers\`, \`subscriptions\`, and \`payments\`.
  2. SQL queries utilizing \`INNER JOIN\` and \`GROUP BY\` to compute Monthly Recurring Revenue (MRR) and Churn Rate.
  3. A quick summary report showing the #1 cause of cancellations by subscription tier.

* **Why recruiters love this:** It solves an actual business revenue metric rather than generic Titanic or Iris dataset problems.`,
      contextTag: 'Project Recommendation',
      suggestedActions: [
        { label: 'Add to My Projects', actionType: 'navigate', payload: '/dashboard' },
        { label: 'What SQL commands are required?', actionType: 'prompt', payload: 'What SQL commands are required for this project?' },
      ],
    };
  }

  // "Am I internship-ready?"
  if (q.includes('internship') || q.includes('ready') || q.includes('job ready')) {
    return {
      text: `Your current **Career Readiness is ${user.readinessPercentage}%**.

**Here is where you stand:**
* ✅ **Excel & Data Cleaning:** Strong! You can confidently handle messy spreadsheet data and pivot tables.
* 🟡 **Python Fundamentals:** Developing (58%). Good start with syntax, but need more Pandas practice.
* ⚠️ **SQL & Database Queries:** Current bottleneck (28%). Most technical screens test SQL first.
* ⏳ **Projects:** You have completed **${user.completedProjectsCount} of 4** target portfolio projects.

**Verdict:**
You are about **3 to 4 weeks away** from being internship-ready. Once you complete the SQL modules and finish the Churn Analysis project, you will be ready to submit applications for Junior Data Analyst and Data Operations internships.`,
      contextTag: 'Readiness Audit: 64%',
      suggestedActions: [
        { label: 'View Skill Gap Breakdown', actionType: 'navigate', payload: '/skill-gap' },
        { label: 'How to practice SQL fast?', actionType: 'prompt', payload: 'How can I learn SQL in under 2 weeks?' },
      ],
    };
  }

  // "Why do I need SQL?"
  if (q.includes('why do i need sql') || q.includes('why sql')) {
    return {
      text: `SQL is the universal language of production databases. While Excel handles thousands of rows, production company data resides in warehouses (Snowflake, BigQuery, PostgreSQL) with millions or billions of records.

**Why SQL is non-negotiable for ${user.targetCareer}s:**
1. **The Primary Gatekeeper:** Over 90% of technical interviews for Data Analysts start with a live SQL query test.
2. **Data Extraction:** Before you can clean data in Python or visualize in Tableau, you must extract it from SQL databases.
3. **Efficiency:** Filtering and aggregating at the database level is 100x faster than loading raw logs into memory.

Mastering SELECT, JOINs, and GROUP BY will give you immediate credibility in student interviews!`,
      contextTag: 'Skill Context: SQL',
      suggestedActions: [
        { label: 'Start SQL Roadmap', actionType: 'navigate', payload: '/roadmap' },
      ],
    };
  }

  // "I only have X hours a week"
  if (q.includes('hour') || q.includes('time') || q.includes('schedule') || q.includes('busy')) {
    return {
      text: `With **${user.weeklyHours}** available, consistency beats intensity. Here is an optimized weekly schedule tailored for you:

* **Session 1 (Mon - 1.5 hrs):** SQL practice on JOINs (write 5 queries on SQLBolt / LeetCode).
* **Session 2 (Wed - 1.5 hrs):** Work on the **Subscription Churn** project schema setup.
* **Session 3 (Sat - 1.5 hrs):** Connect Python/Pandas to the dataset and generate summary plots.

I have adjusted your roadmap pace so you will hit 85% readiness in exactly 5 weeks without burnout.`,
      contextTag: `Schedule: ${user.weeklyHours}`,
      suggestedActions: [
        { label: 'Adjust weekly hours in profile', actionType: 'navigate', payload: '/profile' },
      ],
    };
  }

  // Default thoughtful response
  return {
    text: `Great question regarding your journey toward becoming a **${user.targetCareer}**!

Based on your current progress (**${user.readinessPercentage}% Career Readiness**, Stage 02: SQL), here is my direct recommendation:

1. **Target:** Focus on finishing **SQL JOINs and Aggregations**. This directly removes your primary technical roadblock.
2. **Project:** Continue with the **Subscription Churn Analysis** project to create proof of work for recruiters.
3. **Learning Cadence:** Keep your current streak active! You are at **${user.streakDays} days** and building genuine momentum.

What specific area would you like to explore next?`,
    contextTag: `${user.targetCareer} Roadmap`,
    suggestedActions: [
      { label: 'What should I learn next?', actionType: 'prompt', payload: 'What should I learn next?' },
      { label: 'Suggest a project for me', actionType: 'prompt', payload: 'Suggest a project for me' },
      { label: 'Am I ready for an internship?', actionType: 'prompt', payload: 'Am I ready for an internship?' },
    ],
  };
}
