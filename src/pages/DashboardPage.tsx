import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Target,
  Flame,
  CheckCircle2,
  FolderGit2,
  ChevronRight,
  TrendingUp,
  Database,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { StatCard } from '../components/common/StatCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { useCareer } from '../context/CareerContext';

interface DashboardPageProps {
  onNavigate: (route: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { user, roadmapStages, sendChatMessage, toggleSubTask } = useCareer();

  const currentStage = roadmapStages.find((s) => s.status === 'current') || roadmapStages[0];
  const nextPendingTask = currentStage?.subTasks.find((t) => !t.completed) || currentStage?.subTasks[0];

  const handleSuggestedPrompt = (promptText: string) => {
    sendChatMessage(promptText);
    onNavigate('/ai');
  };

  const getReadinessTier = (score: number) => {
    if (score < 30) return { label: 'Foundations Stage', next: 'Reach 50% for core fluency' };
    if (score < 60) return { label: 'Intermediate Fluency', next: 'Reach 75% for internship eligibility' };
    if (score < 85) return { label: 'Internship Ready', next: 'Reach 85%+ for full job readiness' };
    return { label: 'Job Ready', next: 'Ready for recruiter technical screens' };
  };

  const readinessTier = getReadinessTier(user.readinessPercentage);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1B1E25]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F2F3F5] tracking-tight">
            Good morning, {user.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#949BAD] mt-1">
            Here's your progress toward becoming a <span className="text-[#F2F3F5] font-semibold">{user.targetCareer || 'Career Professional'}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('/skill-gap')}
          >
            Review Skill Gaps
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
            onClick={() => onNavigate('/roadmap')}
          >
            Continue Learning
          </Button>
        </div>
      </div>

      {/* Hero Career Readiness Card with Visually Meaningful Milestones */}
      <Card
        variant="surface"
        padding="lg"
        glow
        className="relative overflow-hidden border-[#7C5CFF]/30 bg-[#101217]"
      >
        <div className="absolute -right-12 -top-12 w-80 h-80 bg-[radial-gradient(circle,rgba(124,92,255,0.10)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3.5 max-w-2xl flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent" size="sm" icon={<Target className="w-3.5 h-3.5" />}>
                Target Career Track
              </Badge>
              <span className="text-xs font-mono text-[#687083]">
                Paced for {user.weeklyHours}/week
              </span>
              <span className="text-[11px] font-semibold text-[#27D6A0] bg-[#27D6A0]/10 px-2 py-0.5 rounded border border-[#27D6A0]/25">
                {readinessTier.label}
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F2F3F5] tracking-tight">
                {user.targetCareer || 'Career Path'}
              </h2>
            </div>

            {/* Meaningful Readiness Progress Bar with Milestones */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#949BAD] font-medium">Overall Career Readiness Score</span>
                <span className="font-bold text-[#F2F3F5] text-base tabular-nums">
                  {user.readinessPercentage}%
                </span>
              </div>
              <ProgressBar
                progress={user.readinessPercentage}
                showPercentage={false}
                size="lg"
                variant="gradient"
              />
              
              {/* Milestone Checkpoints */}
              <div className="grid grid-cols-4 text-[10px] sm:text-[11px] pt-1 text-[#687083] font-medium border-t border-[#1B1E25]/80 mt-2">
                <div className={`text-left ${user.readinessPercentage >= 0 ? 'text-[#8B6CFF]' : ''}`}>
                  ● 0% Start
                </div>
                <div className={`text-center ${user.readinessPercentage >= 50 ? 'text-[#8B6CFF]' : ''}`}>
                  ● 50% Intermediate
                </div>
                <div className={`text-center ${user.readinessPercentage >= 75 ? 'text-[#27D6A0]' : ''}`}>
                  ● 75% Internship
                </div>
                <div className={`text-right ${user.readinessPercentage >= 90 ? 'text-[#27D6A0]' : ''}`}>
                  ● 90% Job Ready
                </div>
              </div>

              <p className="text-[11px] text-[#949BAD] mt-1">
                {readinessTier.next}. Next gate unlocks with Stage {currentStage.stepNumber} completion.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0 lg:w-72">
            <div className="p-3.5 rounded-xl bg-[#0A0B0F] border border-[#1B1E25] text-xs">
              <span className="text-[#687083] uppercase font-semibold text-[10px] block">
                Active Focus:
              </span>
              <span className="font-bold text-[#F2F3F5] block mt-1 text-sm truncate">
                Stage {currentStage.stepNumber}: {currentStage.title}
              </span>
              <span className="text-[11px] text-[#8B6CFF] mt-1 block truncate">
                {nextPendingTask ? nextPendingTask.title : 'All stage tasks completed!'}
              </span>
            </div>
            <Button
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={() => onNavigate('/roadmap')}
            >
              Resume Stage {currentStage.stepNumber}
            </Button>
          </div>
        </div>
      </Card>

      {/* 3 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* KPI 1: Skills Acquired */}
        <StatCard
          label="Skills Acquired"
          value={`${user.completedSkillsCount} / ${user.totalSkillsCount}`}
          subtext="Verified competencies in inventory"
          icon={<CheckCircle2 className="w-5 h-5 text-[#27D6A0]" />}
          iconBg="bg-[#27D6A0]/10"
          action={{
            label: 'View skill gaps',
            onClick: () => onNavigate('/skill-gap'),
          }}
        />

        {/* KPI 2: Portfolio Projects */}
        <StatCard
          label="Portfolio Projects"
          value={`${user.completedProjectsCount} / ${user.totalProjectsCount}`}
          subtext="Recruiter proof-of-work case studies"
          icon={<FolderGit2 className="w-5 h-5 text-[#8B6CFF]" />}
          iconBg="bg-[#7C5CFF]/10"
          action={{
            label: 'Open active project',
            onClick: () => onNavigate('/projects'),
          }}
        />

        {/* KPI 3: Learning Consistency & Pacing */}
        <StatCard
          label="Learning Streak"
          value={`${user.streakDays} Days`}
          subtext={`Paced for ${user.weeklyHours}`}
          icon={<Flame className="w-5 h-5 text-[#EAB04B]" />}
          iconBg="bg-[#EAB04B]/10"
          trend={{ text: '🔥 Active streak maintained', positive: true }}
          action={{
            label: 'Adjust schedule',
            onClick: () => onNavigate('/profile'),
          }}
        />
      </div>

      {/* Dedicated Next Up Execution Section */}
      {nextPendingTask && (
        <Card variant="surface" padding="md" className="border-[#242832] bg-[#101217] shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 text-[#8B6CFF] flex-shrink-0 mt-0.5">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B6CFF]">
                    Next Up
                  </span>
                  <Badge variant="accent" size="sm">
                    Stage {currentStage.stepNumber} Focus
                  </Badge>
                  <span className="text-xs text-[#687083] font-mono">
                    ~{nextPendingTask.estimatedHours || 1}h
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#F2F3F5]">
                  {nextPendingTask.title}
                </h3>
                {nextPendingTask.resourceTitle && (
                  <p className="text-xs text-[#949BAD] mt-0.5">
                    Recommended Resource: <span className="text-[#F2F3F5]">{nextPendingTask.resourceTitle}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <label
                onClick={() => toggleSubTask(currentStage.id, nextPendingTask.id)}
                className="flex items-center gap-2 text-xs text-[#949BAD] hover:text-[#F2F3F5] cursor-pointer select-none bg-[#13151B] px-3 py-2 rounded-lg border border-[#242832]"
              >
                <input
                  type="checkbox"
                  checked={nextPendingTask.completed}
                  onChange={() => toggleSubTask(currentStage.id, nextPendingTask.id)}
                  className="w-4 h-4 rounded border-[#242832] bg-[#0A0B0F] text-[#7C5CFF] focus:ring-[#7C5CFF]"
                />
                <span>Mark Done</span>
              </label>

              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
                onClick={() => onNavigate('/roadmap')}
              >
                Open in Roadmap
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Main Grid: Compact Roadmap & AI Insight Assistant Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compact Roadmap View (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#F2F3F5] uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#8B6CFF]" />
              Roadmap Timeline
            </h3>
            <button
              onClick={() => onNavigate('/roadmap')}
              className="text-xs font-semibold text-[#8B6CFF] hover:underline"
            >
              View Full Roadmap →
            </button>
          </div>

          <Card variant="surface" padding="none" className="border-[#242832] divide-y divide-[#1B1E25] shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            {roadmapStages.slice(0, 4).map((stage) => {
              const isCurrent = stage.status === 'current';
              const isComplete = stage.status === 'complete';

              return (
                <div
                  key={stage.id}
                  onClick={() => onNavigate('/roadmap')}
                  className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-[#13151B] hover:bg-[#171A21]'
                      : 'hover:bg-[#13151B]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs font-bold text-[#687083]">
                      {stage.stepNumber}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#F2F3F5]">
                          {stage.title}
                        </span>
                        <span className="text-xs text-[#949BAD] hidden sm:inline">
                          — {stage.subtitle}
                        </span>
                      </div>
                      <p className="text-xs text-[#949BAD] mt-0.5 line-clamp-1">
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {isComplete && (
                      <Badge variant="success" size="sm">
                        Complete
                      </Badge>
                    )}
                    {isCurrent && (
                      <Badge variant="accent" size="sm">
                        Current Focus
                      </Badge>
                    )}
                    {stage.status === 'locked' && (
                      <Badge variant="neutral" size="sm">
                        Locked
                      </Badge>
                    )}
                    <ChevronRight className="w-4 h-4 text-[#687083]" />
                  </div>
                </div>
              );
            })}
          </Card>

          {/* Active Project Highlight Card */}
          <Card variant="secondary" padding="md" className="border-[#242832]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B6CFF]">
                <FolderGit2 className="w-4 h-4 text-[#7C5CFF]" />
                In Progress Portfolio Project
              </div>
              <Badge variant="accent" size="sm">
                45% Completed
              </Badge>
            </div>

            <h4 className="text-base font-bold text-[#F2F3F5] mb-1">
              Subscription Churn & Revenue Analysis (SQL)
            </h4>
            <p className="text-xs text-[#949BAD] mb-4">
              Query PostgreSQL to calculate Monthly Recurring Revenue (MRR), cohort retention rates, and churn triggers.
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-[#1B1E25] text-xs">
              <span className="text-[#949BAD]">Next deliverable: 12 optimized SQL scripts with CTEs</span>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8"
                onClick={() => onNavigate('/roadmap')}
              >
                Open Project Details →
              </Button>
            </div>
          </Card>
        </div>

        {/* AI Insight Assistant Card (Specified in #15) */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#F2F3F5] uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8B6CFF]" />
            Ask SkillBridge AI
          </h3>

          <Card variant="surface" padding="md" glow className="border-[#7C5CFF]/25 space-y-4">
            {/* AI Insight Text */}
            <div className="p-3.5 rounded-xl bg-[#13151B] border border-[#1B1E25] relative">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#8B6CFF]">
                <Sparkles className="w-3.5 h-3.5 text-[#7C5CFF]" />
                AI Career Coach Insight
              </div>
              <p className="text-xs text-[#F2F3F5] leading-relaxed">
                "Your biggest opportunity right now is <strong className="text-[#8B6CFF]">SQL</strong>. Focus on <strong className="text-[#27D6A0]">JOINs</strong> next — they'll unlock your next roadmap stage."
              </p>
            </div>

            {/* Suggested Prompts (Specified in #15) */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#687083] block mb-2">
                Suggested Prompts:
              </span>
              <div className="space-y-2">
                {[
                  'What should I learn next?',
                  'Suggest a project',
                  'Am I internship-ready?',
                  'Why do I need SQL?',
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSuggestedPrompt(prompt)}
                    className="w-full text-left p-2.5 rounded-lg bg-[#13151B] hover:bg-[#171A21] border border-[#242832] hover:border-[#7C5CFF]/40 text-xs text-[#F2F3F5] transition-all flex items-center justify-between group"
                  >
                    <span>{prompt}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#687083] group-hover:text-[#8B6CFF] group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full text-xs"
              icon={<Sparkles className="w-3.5 h-3.5" />}
              onClick={() => onNavigate('/ai')}
            >
              Open Full AI Career Assistant
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
