import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { SkillChip } from '../components/common/SkillChip';
import { ProgressBar } from '../components/common/ProgressBar';
import { useCareer } from '../context/CareerContext';
import type { SkillStatus } from '../types';

interface SkillGapPageProps {
  onNavigate: (route: string) => void;
}

export const SkillGapPage: React.FC<SkillGapPageProps> = ({ onNavigate }) => {
  const { user, skills, addSkill, showToast } = useCareer();

  const [activeFilter, setActiveFilter] = useState<'all' | SkillStatus>('all');
  const [newSkillName, setNewSkillName] = useState('');
  const [selectedSkillForDetail, setSelectedSkillForDetail] = useState(
    skills.find((s) => s.name.toLowerCase().includes('sql')) || skills[0]
  );

  const strongSkills = skills.filter((s) => s.status === 'strong');
  const developingSkills = skills.filter((s) => s.status === 'developing');
  const gapSkills = skills.filter((s) => s.status === 'gap');

  const filteredSkills =
    activeFilter === 'all'
      ? skills
      : skills.filter((s) => s.status === activeFilter);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill(newSkillName.trim());
    setNewSkillName('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1B1E25]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6CFF]">
              Diagnostics & Gap Analysis
            </span>
            <Badge variant="accent" size="sm">
              Target: {user.targetCareer}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F2F3F5] tracking-tight">
            Your Skill Gap
          </h1>
          <p className="text-xs sm:text-sm text-[#949BAD] mt-1">
            Here's what stands between you and your target role.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={() => {
              showToast('Recalibrated gap model against latest job postings!', 'success');
            }}
          >
            Re-scan Market Data
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={() => onNavigate('/roadmap')}
          >
            View My Roadmap
          </Button>
        </div>
      </div>

      {/* AI Insight Card (Specified in Prompt #13) */}
      <Card
        variant="surface"
        padding="lg"
        glow
        className="relative overflow-hidden border-[#7C5CFF]/30 bg-[#101217]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(124,92,255,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8B6CFF] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#7C5CFF]" />
              AI Insight
            </div>
            <p className="text-sm sm:text-base text-[#F2F3F5] font-medium leading-relaxed">
              "Your current skills give you a strong foundation for Data Analytics. Your biggest gaps are <span className="text-[#8B6CFF] underline font-semibold decoration-[#7C5CFF]/40 underline-offset-4">SQL</span> and <span className="text-[#8B6CFF] underline font-semibold decoration-[#7C5CFF]/40 underline-offset-4">data visualization</span>. Focus on SQL next to unlock the next stage of your roadmap."
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[#949BAD]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#27D6A0]" />
                Excel foundation verified
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#EAB04B]" />
                Python syntax developing
              </span>
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#8B6CFF]" />
                SQL is priority bottleneck
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={() => onNavigate('/roadmap')}
            className="flex-shrink-0"
          >
            View My Roadmap
          </Button>
        </div>
      </Card>

      {/* Target Role & Readiness Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Strong */}
        <Card variant="surface" padding="md" className="border-t-2 border-t-[#27D6A0]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#27D6A0]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#27D6A0]">
                Strong ({strongSkills.length})
              </span>
            </div>
            <span className="text-xs text-[#949BAD]">Job Ready Level</span>
          </div>
          <p className="text-xs text-[#949BAD] mb-3">
            You meet or exceed hiring expectations in these areas.
          </p>
          <div className="flex flex-wrap gap-2">
            {strongSkills.map((s) => (
              <SkillChip
                key={s.id}
                name={s.name}
                status={s.status}
                proficiency={s.proficiency}
                showProficiency
                onToggle={() => setSelectedSkillForDetail(s)}
                isSelectable
              />
            ))}
          </div>
        </Card>

        {/* Developing */}
        <Card variant="surface" padding="md" className="border-t-2 border-t-[#EAB04B]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EAB04B]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#EAB04B]">
                Developing ({developingSkills.length})
              </span>
            </div>
            <span className="text-xs text-[#949BAD]">Partial Fluency</span>
          </div>
          <p className="text-xs text-[#949BAD] mb-3">
            You know the concepts but need real project application.
          </p>
          <div className="flex flex-wrap gap-2">
            {developingSkills.map((s) => (
              <SkillChip
                key={s.id}
                name={s.name}
                status={s.status}
                proficiency={s.proficiency}
                showProficiency
                onToggle={() => setSelectedSkillForDetail(s)}
                isSelectable
              />
            ))}
          </div>
        </Card>

        {/* Needs Attention / Gaps */}
        <Card variant="surface" padding="md" className="border-t-2 border-t-[#7C5CFF]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7C5CFF]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B6CFF]">
                Needs Attention ({gapSkills.length})
              </span>
            </div>
            <span className="text-xs text-[#949BAD]">Critical Gaps</span>
          </div>
          <p className="text-xs text-[#949BAD] mb-3">
            High market demand skills you must acquire for callbacks.
          </p>
          <div className="flex flex-wrap gap-2">
            {gapSkills.map((s) => (
              <SkillChip
                key={s.id}
                name={s.name}
                status={s.status}
                proficiency={s.proficiency}
                showProficiency
                onToggle={() => setSelectedSkillForDetail(s)}
                isSelectable
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Deep-Dive Skill Inspection & Market Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Detailed Skill Breakdown list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#F2F3F5] uppercase tracking-wider">
              Comprehensive Skill Matrix
            </h3>
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-[#101217] p-1 rounded-lg border border-[#242832] text-xs">
              {(['all', 'strong', 'developing', 'gap'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                    activeFilter === filter
                      ? 'bg-[#13151B] text-[#F2F3F5] border border-[#7C5CFF]/40 shadow-[0_2px_8px_rgba(0,0,0,0.25)]'
                      : 'text-[#949BAD] hover:text-[#F2F3F5]'
                  }`}
                >
                  {filter === 'gap' ? 'Needs Attention' : filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkillForDetail.id === skill.id;

              return (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkillForDetail(skill)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-[#13151B] border-[#7C5CFF]/70 shadow-[0_4px_20px_rgba(124,92,255,0.12)]'
                      : 'bg-[#101217] border-[#242832] hover:border-[#7C5CFF]/30 hover:bg-[#13151B]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {skill.status === 'strong' && (
                        <CheckCircle2 className="w-5 h-5 text-[#27D6A0] flex-shrink-0" />
                      )}
                      {skill.status === 'developing' && (
                        <Clock className="w-5 h-5 text-[#EAB04B] flex-shrink-0" />
                      )}
                      {skill.status === 'gap' && (
                        <AlertTriangle className="w-5 h-5 text-[#8B6CFF] flex-shrink-0" />
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#F2F3F5]">
                            {skill.name}
                          </span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#0A0B0F] text-[#687083] border border-[#1B1E25]">
                            {skill.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#949BAD] mt-0.5 line-clamp-1">
                          {skill.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <div className="text-xs font-semibold text-[#F2F3F5] tabular-nums">
                          {skill.proficiency}%
                        </div>
                        <div className="text-[10px] text-[#687083] uppercase tracking-wider font-medium">
                          {skill.status === 'strong' ? 'Verified' : skill.status === 'developing' ? 'Developing' : 'High Priority'}
                        </div>
                      </div>
                      <div className="w-20 sm:w-28 bg-[#0A0B0F] h-2 rounded-full overflow-hidden border border-[#1B1E25]">
                        <div
                          className={`h-full transition-all duration-500 ${
                            skill.status === 'strong'
                              ? 'bg-[#27D6A0]'
                              : skill.status === 'developing'
                              ? 'bg-[#EAB04B]'
                              : 'bg-[#7C5CFF]'
                          }`}
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Custom Skill Form */}
          <form
            onSubmit={handleAddSkill}
            className="p-4 rounded-xl bg-[#101217] border border-[#242832] flex gap-3"
          >
            <input
              type="text"
              placeholder="Add another skill to your inventory (e.g., Power BI, Snowflake, Git)..."
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className="flex-1 bg-[#13151B] border border-[#242832] focus:border-[#7C5CFF] rounded-lg px-3.5 py-2 text-xs text-[#F2F3F5] placeholder-[#687083] focus:outline-none"
            />
            <Button
              variant="secondary"
              size="sm"
              type="submit"
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Skill
            </Button>
          </form>
        </div>

        {/* Right: Selected Skill Detail & Recruiter Impact Card */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#F2F3F5] uppercase tracking-wider">
            Recruiter Demand Benchmark
          </h3>

          <Card variant="surface" padding="md" className="border-[#242832] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1B1E25]">
              <div>
                <span className="text-[11px] font-semibold uppercase text-[#687083]">
                  Selected Skill
                </span>
                <h4 className="text-base font-bold text-[#F2F3F5]">
                  {selectedSkillForDetail.name}
                </h4>
              </div>
              <Badge
                variant={
                  selectedSkillForDetail.status === 'strong'
                    ? 'success'
                    : selectedSkillForDetail.status === 'developing'
                    ? 'warning'
                    : 'accent'
                }
                size="sm"
              >
                {selectedSkillForDetail.status === 'gap'
                  ? 'Needs Attention'
                  : selectedSkillForDetail.status}
              </Badge>
            </div>

            <div>
              <span className="text-xs text-[#949BAD] block mb-1">
                Current Proficiency Level:
              </span>
              <ProgressBar
                progress={selectedSkillForDetail.proficiency}
                variant={
                  selectedSkillForDetail.status === 'strong'
                    ? 'success'
                    : selectedSkillForDetail.status === 'developing'
                    ? 'accent'
                    : 'gradient'
                }
              />
            </div>

            <div className="p-3 rounded-lg bg-[#13151B] border border-[#1B1E25] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#949BAD]">Junior Job Postings Requiring This:</span>
                <span className="font-bold text-[#27D6A0]">
                  {selectedSkillForDetail.relevantJobsPercentage}%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#949BAD]">Market Hiring Priority:</span>
                <span className="font-semibold text-[#F2F3F5]">
                  {selectedSkillForDetail.marketDemand}
                </span>
              </div>
            </div>

            <div className="text-xs text-[#949BAD] leading-relaxed">
              <strong className="text-[#F2F3F5] block mb-1">Hiring Manager Perspective:</strong>
              {selectedSkillForDetail.status === 'gap'
                ? `Candidates without ${selectedSkillForDetail.name} are typically screened out before reaching the technical round. Mastering this adds an estimated +25% callback rate.`
                : selectedSkillForDetail.status === 'developing'
                ? `You have the concepts down. Completing one portfolio case study with ${selectedSkillForDetail.name} will elevate this to full interview-ready status.`
                : `Solid asset on your resume. Emphasize metrics and specific tools in your interviews to stand out.`}
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => onNavigate('/roadmap')}
              >
                See Learning Modules for this Skill →
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
