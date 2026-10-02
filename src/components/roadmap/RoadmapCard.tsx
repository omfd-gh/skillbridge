import React, { useState } from 'react';
import {
  CheckCircle2,
  CircleDot,
  Lock,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  BookOpen,
  Clock,
  ExternalLink,
  Layers,
} from 'lucide-react';
import type { RoadmapStage } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface RoadmapCardProps {
  stage: RoadmapStage;
  isExpandedByDefault?: boolean;
  onToggleTask?: (taskId: string) => void;
  className?: string;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({
  stage,
  isExpandedByDefault = false,
  onToggleTask,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(
    isExpandedByDefault || stage.status === 'current'
  );

  const completedTasksCount = stage.subTasks.filter((t) => t.completed).length;
  const totalTasksCount = stage.subTasks.length;
  const progressPercent = Math.round((completedTasksCount / (totalTasksCount || 1)) * 100);

  const getStatusBadge = () => {
    switch (stage.status) {
      case 'complete':
        return (
          <Badge variant="success" size="sm" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
            Completed
          </Badge>
        );
      case 'current':
        return (
          <Badge variant="accent" size="sm" icon={<CircleDot className="w-3.5 h-3.5 animate-pulse" />}>
            Current Stage
          </Badge>
        );
      case 'locked':
        return (
          <Badge variant="neutral" size="sm" icon={<Lock className="w-3.5 h-3.5" />}>
            Locked
          </Badge>
        );
    }
  };

  const getStepIndicator = () => {
    switch (stage.status) {
      case 'complete':
        return (
          <div className="w-9 h-9 rounded-full bg-[#27D6A0]/10 border border-[#27D6A0]/30 text-[#27D6A0] flex items-center justify-center font-bold text-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        );
      case 'current':
        return (
          <div className="w-9 h-9 rounded-full bg-[#7C5CFF]/15 border border-[#7C5CFF]/50 text-[#8B6CFF] flex items-center justify-center font-bold text-xs shadow-[0_0_12px_rgba(124,92,255,0.3)]">
            {stage.stepNumber}
          </div>
        );
      case 'locked':
        return (
          <div className="w-9 h-9 rounded-full bg-[#0A0B0F] border border-[#1B1E25] text-[#687083] flex items-center justify-center font-bold text-xs">
            <Lock className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <Card
      variant={stage.status === 'current' ? 'surface' : 'secondary'}
      padding="none"
      className={`border transition-all duration-200 overflow-hidden ${
        stage.status === 'current'
          ? 'border-[#7C5CFF]/60 bg-[#13151B] shadow-[0_8px_30px_rgba(0,0,0,0.25),0_0_24px_rgba(124,92,255,0.08)]'
          : stage.status === 'complete'
          ? 'border-[#27D6A0]/25 bg-[#101217]'
          : 'border-[#1B1E25] bg-[#0A0B0F]/60 opacity-70 hover:opacity-90'
      } ${className}`}
    >
      {/* Header bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4 select-none hover:bg-[#171A21]/30 transition-colors"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-0.5">{getStepIndicator()}</div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
              <span className="text-xs font-mono font-semibold text-[#687083] uppercase">
                Stage {stage.stepNumber}
              </span>
              {getStatusBadge()}
              <span className="text-xs text-[#949BAD] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#687083]" /> ~{stage.estimatedWeeks} weeks
              </span>
              {stage.status === 'locked' && (
                <span className="text-[11px] text-[#687083]">
                  • Unlocks after completing Stage {String(Math.max(1, parseInt(stage.stepNumber, 10) - 1)).padStart(2, '0')}
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#F2F3F5] tracking-tight">
              {stage.title}: <span className="font-medium text-[#949BAD]">{stage.subtitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#949BAD] mt-1 max-w-2xl leading-relaxed">
              {stage.description}
            </p>
          </div>
        </div>

        {/* Right side summary & chevron */}
        <div className="flex items-center gap-3.5 flex-shrink-0">
          <div className="hidden sm:block text-right">
            <div className="text-xs font-semibold text-[#F2F3F5] tabular-nums">
              {completedTasksCount} / {totalTasksCount} tasks ({progressPercent}%)
            </div>
            <div className="w-24 bg-[#0A0B0F] h-1.5 rounded-full mt-1.5 overflow-hidden border border-[#1B1E25]">
              <div
                className={`h-full transition-all duration-300 ${stage.status === 'complete' ? 'bg-[#27D6A0]' : 'bg-[#7C5CFF]'}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            className="p-1.5 text-[#949BAD] hover:text-[#F2F3F5] rounded-lg bg-[#13151B] border border-[#242832] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7C5CFF]"
            aria-label={`Toggle stage ${stage.stepNumber} details`}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-5 pb-6 sm:px-6 border-t border-[#1B1E25] bg-[#0A0B0F]/60 space-y-6 pt-5 animate-in fade-in duration-200">
          {/* Target Skills in this stage */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#687083] mb-2.5">
              <Layers className="w-3.5 h-3.5 text-[#8B6CFF]" />
              Core Competencies Acquired
            </div>
            <div className="flex flex-wrap gap-2">
              {stage.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-1 rounded-md bg-[#13151B] text-[#F2F3F5] border border-[#242832] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Subtasks with checkboxes */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#687083]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#27D6A0]" />
                Actionable Learning Modules
              </div>
              <span className="text-[11px] text-[#687083]">
                Click checkboxes to mark progress
              </span>
            </div>
            <div className="space-y-2">
              {stage.subTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onToggleTask && onToggleTask(task.id)}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                    task.completed
                      ? 'bg-[#27D6A0]/5 border-[#27D6A0]/20 text-[#F2F3F5]'
                      : 'bg-[#101217] border-[#242832] hover:border-[#7C5CFF]/30 text-[#949BAD]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleTask && onToggleTask(task.id)}
                    className="mt-0.5 w-4 h-4 rounded border-[#242832] bg-[#13151B] text-[#7C5CFF] focus:ring-[#7C5CFF] cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs sm:text-sm font-medium ${
                        task.completed ? 'line-through text-[#687083]' : 'text-[#F2F3F5]'
                      }`}
                    >
                      {task.title}
                    </p>
                    {task.resourceTitle && (
                      <span className="text-[11px] text-[#687083] mt-0.5 inline-block">
                        Recommended: {task.resourceTitle} ({task.estimatedHours}h)
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-[#687083] flex-shrink-0">
                    {task.estimatedHours}h
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hands-on Project */}
          {stage.project && (
            <div className="p-4 rounded-xl bg-[#13151B] border border-[#242832] relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-[#8B6CFF]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#F2F3F5]">
                    Hands-On Portfolio Deliverable
                  </span>
                </div>
                <Badge variant="accent" size="sm">
                  {stage.project.difficulty}
                </Badge>
              </div>

              <h4 className="text-sm font-bold text-[#F2F3F5] mb-1">
                {stage.project.title}
              </h4>
              <p className="text-xs text-[#949BAD] mb-3">
                {stage.project.description}
              </p>

              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-[#687083] uppercase">
                  Proof of Work Deliverables:
                </span>
                <ul className="text-xs text-[#949BAD] space-y-1 list-disc list-inside">
                  {stage.project.deliverables.map((deliv, idx) => (
                    <li key={idx} className="text-[#F2F3F5]/90">
                      {deliv}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Free Curated Learning Resources */}
          {stage.resources && stage.resources.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#687083] mb-2.5">
                <BookOpen className="w-3.5 h-3.5 text-[#8B6CFF]" />
                Curated High-Yield Resources
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {stage.resources.map((res, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-[#101217] border border-[#242832] flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-medium text-[#F2F3F5] flex items-center gap-1.5">
                        {res.title}
                      </div>
                      <div className="text-[11px] text-[#949BAD] mt-0.5 flex items-center gap-2">
                        <span>{res.type}</span>
                        <span>•</span>
                        <span>{res.duration}</span>
                        {res.isFree && (
                          <span className="text-[#27D6A0] font-semibold">Free</span>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#687083]" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
