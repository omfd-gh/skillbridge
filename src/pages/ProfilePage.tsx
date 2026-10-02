import React, { useState } from 'react';
import {
  Target,
  Award,
  Flame,
  CheckCircle2,
  FolderGit2,
  BookOpen,
  Clock,
  Briefcase,
  Share2,
  RotateCcw,
  Plus,
  Edit2,
  Save,
  Shield,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { SkillChip } from '../components/common/SkillChip';
import { useCareer } from '../context/CareerContext';
import type { ExperienceLevel, WeeklyHours } from '../types';

interface ProfilePageProps {
  onNavigate: (route: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, achievements, skills, roadmapStages, updateUser, addSkill, removeSkill, resetToDemo, showToast, authSession } = useCareer();

  const totalModules = roadmapStages.flatMap((s) => s.subTasks);
  const completedModulesCount = totalModules.filter((t) => t.completed).length;

  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [prefTargetRole, setPrefTargetRole] = useState(user.targetCareer);
  const [prefExperience, setPrefExperience] = useState<ExperienceLevel>(user.experienceLevel);
  const [prefWeeklyHours, setPrefWeeklyHours] = useState<WeeklyHours>(user.weeklyHours);
  const [newSkillInput, setNewSkillInput] = useState('');

  const handleSavePreferences = () => {
    updateUser({
      targetCareer: prefTargetRole,
      experienceLevel: prefExperience,
      weeklyHours: prefWeeklyHours,
    });
    setIsEditingPreferences(false);
    showToast('Career preferences saved successfully!', 'success');
  };

  const handleShareProfile = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Roadmap link copied to clipboard! Share with mentors.', 'success');
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    addSkill(newSkillInput.trim());
    setNewSkillInput('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1B1E25]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6CFF]">
              Candidate Account
            </span>
            <Badge variant="accent" size="sm">
              Portfolio Active
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F2F3F5] tracking-tight">
            My Progress
          </h1>
          <p className="text-xs sm:text-sm text-[#949BAD] mt-1">
            Track your milestones, completed projects, verified skills, and roadmap settings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            icon={<Share2 className="w-3.5 h-3.5" />}
            onClick={handleShareProfile}
          >
            Share Roadmap
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={resetToDemo}
          >
            Reset Demo Data
          </Button>
        </div>
      </div>

      {/* Profile Overview Card (Specified in #17) */}
      <Card variant="surface" padding="lg" className="border-[#242832]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-20 h-20 rounded-2xl border-2 border-[#7C5CFF]/70 shadow-[0_0_20px_rgba(124,92,255,0.25)] object-cover"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-bold text-[#F2F3F5]">
                  {user.name}
                </h2>
                <Badge variant="success" size="sm">
                  Active Student
                </Badge>
                {authSession?.user?.email && (
                  <Badge variant="neutral" size="sm" icon={<Shield className="w-3 h-3 text-[#27D6A0]" />}>
                    Google Verified
                  </Badge>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#949BAD] mt-0.5">
                {user.education} • Age {user.age}
                {user.email && <span className="ml-2 font-mono text-[11px] text-[#687083]">({user.email})</span>}
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-[#F2F3F5] font-medium">
                  <Target className="w-3.5 h-3.5 text-[#8B6CFF]" />
                  Target: {user.targetCareer || 'Career Track'}
                </span>
                <span className="text-[#687083]">•</span>
                <span className="flex items-center gap-1.5 text-[#949BAD]">
                  <Clock className="w-3.5 h-3.5 text-[#27D6A0]" />
                  {user.weeklyHours}
                </span>
                <span className="text-[#687083]">•</span>
                <span className="flex items-center gap-1.5 text-[#EAB04B]">
                  <Flame className="w-3.5 h-3.5" />
                  {user.streakDays}-Day Streak
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-64 p-4 rounded-xl bg-[#13151B] border border-[#1B1E25]">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-[#949BAD]">Overall Career Readiness</span>
              <span className="font-bold text-[#27D6A0] text-sm tabular-nums">
                {user.readinessPercentage}%
              </span>
            </div>
            <ProgressBar progress={user.readinessPercentage} showPercentage={false} size="md" />
            <span className="text-[11px] text-[#949BAD] mt-2 block">
              Stage 02 in progress • 3 projects remaining
            </span>
          </div>
        </div>
      </Card>

      {/* Progress Breakdown Metrics (Specified in #17) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="surface" padding="md" className="border-[#242832]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#687083] uppercase">
              Skills Acquired
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#27D6A0]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#F2F3F5] mt-1.5">
            {user.completedSkillsCount} completed
          </div>
          <p className="text-xs text-[#949BAD] mt-1">
            Out of {user.totalSkillsCount} target competency areas
          </p>
        </Card>

        <Card variant="surface" padding="md" className="border-[#242832]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#687083] uppercase">
              Portfolio Projects
            </span>
            <FolderGit2 className="w-4 h-4 text-[#8B6CFF]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#F2F3F5] mt-1.5">
            {user.completedProjectsCount} completed
          </div>
          <p className="text-xs text-[#949BAD] mt-1">
            Out of {user.totalProjectsCount} recruiter portfolio projects
          </p>
        </Card>

        <Card variant="surface" padding="md" className="border-[#242832]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#687083] uppercase">
              Learning Modules
            </span>
            <BookOpen className="w-4 h-4 text-[#8B6CFF]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#F2F3F5] mt-1.5">
            {completedModulesCount} completed
          </div>
          <p className="text-xs text-[#949BAD] mt-1">
            Out of {totalModules.length} curriculum deliverables
          </p>
        </Card>
      </div>

      {/* Achievements Badges (Specified in #17) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#F2F3F5] uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-[#8B6CFF]" />
            Achievements & Badges
          </h3>
          <span className="text-xs text-[#949BAD]">
            {achievements.filter((a) => a.isUnlocked).length} / {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <Card
              key={ach.id}
              variant={ach.isUnlocked ? 'surface' : 'secondary'}
              padding="md"
              className={`border transition-all ${
                ach.isUnlocked
                  ? 'border-[#7C5CFF]/30 hover:border-[#7C5CFF]/60 shadow-[0_4px_20px_rgba(0,0,0,0.25)]'
                  : 'border-[#1B1E25] opacity-50'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`p-2.5 rounded-xl border flex-shrink-0 ${
                    ach.isUnlocked
                      ? 'bg-[#7C5CFF]/15 border-[#7C5CFF]/40 text-[#8B6CFF]'
                      : 'bg-[#101217] border-[#1B1E25] text-[#687083]'
                  }`}
                >
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#F2F3F5]">
                      {ach.title}
                    </h4>
                    {ach.isUnlocked && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#27D6A0]/10 text-[#27D6A0] font-medium border border-[#27D6A0]/25">
                        Earned
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#949BAD] mt-1">
                    {ach.description}
                  </p>
                  {ach.unlockedAt && (
                    <span className="text-[10px] text-[#687083] mt-2 block font-mono">
                      Unlocked: {ach.unlockedAt}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Career Preferences Section (Specified in #17) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#F2F3F5] uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#8B6CFF]" />
            Career Preferences & Roadmap Settings
          </h3>
          {!isEditingPreferences ? (
            <Button
              variant="outline"
              size="sm"
              icon={<Edit2 className="w-3.5 h-3.5" />}
              onClick={() => setIsEditingPreferences(true)}
            >
              Edit Preferences
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingPreferences(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<Save className="w-3.5 h-3.5" />}
                onClick={handleSavePreferences}
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <Card variant="surface" padding="lg" className="border-[#242832]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <span className="text-xs font-semibold text-[#687083] uppercase block mb-1.5">
                Target Role
              </span>
              {isEditingPreferences ? (
                <input
                  type="text"
                  value={prefTargetRole}
                  onChange={(e) => setPrefTargetRole(e.target.value)}
                  className="w-full bg-[#13151B] border border-[#242832] focus:border-[#7C5CFF] rounded-lg px-3 py-2 text-xs text-[#F2F3F5] focus:outline-none"
                />
              ) : (
                <div className="text-sm font-bold text-[#F2F3F5]">
                  {user.targetCareer}
                </div>
              )}
            </div>

            <div>
              <span className="text-xs font-semibold text-[#687083] uppercase block mb-1.5">
                Experience Level
              </span>
              {isEditingPreferences ? (
                <select
                  value={prefExperience}
                  onChange={(e) => setPrefExperience(e.target.value as ExperienceLevel)}
                  className="w-full bg-[#13151B] border border-[#242832] focus:border-[#7C5CFF] rounded-lg px-3 py-2 text-xs text-[#F2F3F5] focus:outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              ) : (
                <div className="text-sm font-bold text-[#F2F3F5]">
                  {user.experienceLevel}
                </div>
              )}
            </div>

            <div>
              <span className="text-xs font-semibold text-[#687083] uppercase block mb-1.5">
                Weekly Time Budget
              </span>
              {isEditingPreferences ? (
                <select
                  value={prefWeeklyHours}
                  onChange={(e) => setPrefWeeklyHours(e.target.value as WeeklyHours)}
                  className="w-full bg-[#13151B] border border-[#242832] focus:border-[#7C5CFF] rounded-lg px-3 py-2 text-xs text-[#F2F3F5] focus:outline-none"
                >
                  <option value="1–3 hours">1–3 hours</option>
                  <option value="4–6 hours">4–6 hours</option>
                  <option value="7–10 hours">7–10 hours</option>
                  <option value="10+ hours">10+ hours</option>
                </select>
              ) : (
                <div className="text-sm font-bold text-[#F2F3F5]">
                  {user.weeklyHours}
                </div>
              )}
            </div>

            <div>
              <span className="text-xs font-semibold text-[#687083] uppercase block mb-1.5">
                Interests & Focus
              </span>
              <div className="text-sm font-bold text-[#F2F3F5]">
                Analytics, Business Intelligence, Cohorts
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Current Skill Inventory Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#F2F3F5] uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#27D6A0]" />
            Current Skill Inventory
          </h3>
          <span className="text-xs text-[#687083]">
            Click 'x' to remove or add below to update skill gap calculation
          </span>
        </div>

        <Card variant="surface" padding="md" className="border-[#242832] space-y-4">
          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill) => (
              <SkillChip
                key={skill.id}
                name={skill.name}
                status={skill.status}
                proficiency={skill.proficiency}
                showProficiency
                onRemove={() => removeSkill(skill.id)}
              />
            ))}
          </div>

          <form onSubmit={handleAddSkill} className="flex gap-2 pt-3 border-t border-[#1B1E25]">
            <input
              type="text"
              placeholder="Add skill (e.g. Git, Docker, Snowflake, Power BI)..."
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              className="flex-1 bg-[#13151B] border border-[#242832] focus:border-[#7C5CFF] rounded-lg px-3 py-2 text-xs text-[#F2F3F5] placeholder-[#687083] focus:outline-none"
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
        </Card>
      </div>
    </div>
  );
};
