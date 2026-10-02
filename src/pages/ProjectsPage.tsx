import React from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { useCareer } from '../context/CareerContext';

interface ProjectsPageProps {
  onNavigate: (route: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const { user, projects, showToast } = useCareer();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1B1E25]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6CFF]">
              Proof of Work
            </span>
            <Badge variant="accent" size="sm">
              {user.completedProjectsCount} of {user.totalProjectsCount} Built
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F2F3F5] tracking-tight">
            Portfolio Projects
          </h1>
          <p className="text-xs sm:text-sm text-[#949BAD] mt-1">
            Real-world deliverables aligned with {user.targetCareer} technical interviews and portfolio reviews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
            onClick={() => onNavigate('/roadmap')}
          >
            Go to Active Stage
          </Button>
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => {
          const isComplete = project.status === 'completed';
          const isInProgress = project.status === 'in_progress';

          return (
            <Card
              key={project.id}
              variant={isInProgress ? 'surface' : 'secondary'}
              padding="lg"
              className={`border transition-all flex flex-col justify-between ${
                isInProgress
                  ? 'border-[#7C5CFF]/60 bg-[#13151B] shadow-[0_8px_30px_rgba(0,0,0,0.25),0_0_24px_rgba(124,92,255,0.08)]'
                  : isComplete
                  ? 'border-[#27D6A0]/30 bg-[#101217]'
                  : 'border-[#1B1E25] bg-[#0A0B0F]/70 opacity-80 shadow-[0_4px_20px_rgba(0,0,0,0.2)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#687083]">
                    {project.stageName}
                  </span>
                  {isComplete ? (
                    <Badge variant="success" size="sm" icon={<CheckCircle2 className="w-3 h-3" />}>
                      Completed
                    </Badge>
                  ) : isInProgress ? (
                    <Badge variant="accent" size="sm" icon={<Clock className="w-3 h-3 animate-pulse" />}>
                      In Progress
                    </Badge>
                  ) : (
                    <Badge variant="neutral" size="sm">
                      Upcoming
                    </Badge>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#F2F3F5] mb-2">
                  {project.title}
                </h3>

                {/* Technologies and Estimated Time Metadata */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] px-2 py-0.5 rounded bg-[#0A0B0F] border border-[#1B1E25] text-[#949BAD] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.estimatedHours && (
                    <span className="text-[11px] text-[#687083] font-mono ml-auto">
                      ~{project.estimatedHours} hrs
                    </span>
                  )}
                </div>

                <div className="my-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#949BAD]">Deliverables Completed</span>
                    <span className="font-semibold text-[#F2F3F5] tabular-nums">
                      {project.completedTasks} / {project.tasksCount} tasks ({project.progress}%)
                    </span>
                  </div>
                  <ProgressBar
                    progress={project.progress}
                    showPercentage={false}
                    variant={isComplete ? 'success' : 'accent'}
                    size="sm"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#1B1E25] flex items-center justify-between text-xs">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#8B6CFF] hover:text-[#F2F3F5] flex items-center gap-1.5 transition-colors font-medium focus:outline-none focus-visible:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast('Demonstration GitHub repository link.', 'info');
                    }}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>View Repository</span>
                  </a>
                ) : (
                  <span className="text-[#687083]">Repo pending milestone start</span>
                )}

                <Button
                  variant={isInProgress ? 'primary' : 'outline'}
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => onNavigate('/roadmap')}
                >
                  {isInProgress ? 'Work on Project →' : 'Stage Details →'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
