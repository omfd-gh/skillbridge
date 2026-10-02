import React, { useState } from 'react';
import {
  Sparkles,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { RoadmapCard } from '../components/roadmap/RoadmapCard';
import { useCareer } from '../context/CareerContext';
import type { StageStatus } from '../types';

interface RoadmapPageProps {
  onNavigate: (route: string) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({ onNavigate }) => {
  const { user, roadmapStages, toggleSubTask, showToast } = useCareer();
  const [filter, setFilter] = useState<'all' | StageStatus>('all');

  const completedStages = roadmapStages.filter((s) => s.status === 'complete');
  const currentStage = roadmapStages.find((s) => s.status === 'current');

  const filteredStages =
    filter === 'all'
      ? roadmapStages
      : roadmapStages.filter((s) => s.status === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1B1E25]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6CFF]">
              Personalized Learning Path
            </span>
            <Badge variant="accent" size="sm">
              {roadmapStages.length} Milestones
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F2F3F5] tracking-tight">
            Your {user.targetCareer} Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-[#949BAD] mt-1">
            A personalized path based on your current skills and {user.weeklyHours} weekly availability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5 text-[#8B6CFF]" />}
            onClick={() => onNavigate('/ai')}
          >
            Ask AI Advice
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              showToast('Roadmap recalculated based on latest module completions.', 'info');
            }}
          >
            Recalculate
          </Button>
        </div>
      </div>

      {/* Overview Progress Banner */}
      <Card variant="surface" padding="md" className="border-[#242832] bg-[#101217]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#F2F3F5]">
                Total Career Roadmap Completion
              </span>
              <span className="font-bold text-[#27D6A0]">{user.readinessPercentage}%</span>
            </div>
            <ProgressBar progress={user.readinessPercentage} showPercentage={false} size="lg" />
            <p className="text-[11px] text-[#949BAD]">
              {completedStages.length} of {roadmapStages.length} stages completed • Currently on Stage {currentStage?.stepNumber || '02'} ({currentStage?.title})
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#0A0B0F] border border-[#1B1E25] flex items-center gap-3">
            <div className="p-2 rounded bg-[#7C5CFF]/15 text-[#8B6CFF]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-[#949BAD]">Estimated Time Left</div>
              <div className="text-sm font-bold text-[#F2F3F5]">~5 Weeks</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#0A0B0F] border border-[#1B1E25] flex items-center gap-3">
            <div className="p-2 rounded bg-[#27D6A0]/15 text-[#27D6A0]">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-[#949BAD]">Target Readiness</div>
              <div className="text-sm font-bold text-[#27D6A0]">85%+ for Internships</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-[#101217] p-1 rounded-lg border border-[#242832] text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              filter === 'all'
                ? 'bg-[#13151B] text-[#F2F3F5] border border-[#7C5CFF]/40 shadow-[0_2px_8px_rgba(0,0,0,0.25)]'
                : 'text-[#949BAD] hover:text-[#F2F3F5]'
            }`}
          >
            All Stages ({roadmapStages.length})
          </button>
          <button
            onClick={() => setFilter('current')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              filter === 'current'
                ? 'bg-[#13151B] text-[#F2F3F5] border border-[#7C5CFF]/40 shadow-[0_2px_8px_rgba(0,0,0,0.25)]'
                : 'text-[#949BAD] hover:text-[#F2F3F5]'
            }`}
          >
            Current Focus
          </button>
          <button
            onClick={() => setFilter('complete')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              filter === 'complete'
                ? 'bg-[#13151B] text-[#F2F3F5] border border-[#7C5CFF]/40 shadow-[0_2px_8px_rgba(0,0,0,0.25)]'
                : 'text-[#949BAD] hover:text-[#F2F3F5]'
            }`}
          >
            Completed ({completedStages.length})
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              filter === 'locked'
                ? 'bg-[#13151B] text-[#F2F3F5] border border-[#7C5CFF]/40 shadow-[0_2px_8px_rgba(0,0,0,0.25)]'
                : 'text-[#949BAD] hover:text-[#F2F3F5]'
            }`}
          >
            Upcoming
          </button>
        </div>

        <span className="text-xs text-[#687083] hidden sm:inline">
          Tip: Click any stage card to expand deliverables and free resources
        </span>
      </div>

      {/* Vertical Roadmap Stages */}
      <div className="space-y-4">
        {filteredStages.map((stage) => (
          <RoadmapCard
            key={stage.id}
            stage={stage}
            onToggleTask={(taskId) => toggleSubTask(stage.id, taskId)}
          />
        ))}
      </div>

      {/* Bottom Floating Advice / Callout */}
      <Card variant="secondary" padding="md" className="border-[#242832] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#7C5CFF]/15 text-[#8B6CFF]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#F2F3F5]">
              Need help with a specific SQL JOIN or subquery?
            </h4>
            <p className="text-xs text-[#949BAD]">
              Ask SkillBridge AI for interactive query examples and project scaffolding.
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          iconPosition="right"
          onClick={() => onNavigate('/ai')}
        >
          Ask AI Now
        </Button>
      </Card>
    </div>
  );
};
