import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Database,
  Code,
  Layout,
  ShieldCheck,
  Cloud,
  Plus,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useCareer } from '../context/CareerContext';
import type { ExperienceLevel, WeeklyHours } from '../types';

interface OnboardingPageProps {
  onNavigate: (route: string) => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onNavigate }) => {
  const { user, setOnboardingData, showToast } = useCareer();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Clean form state for new user
  const [selectedCareer, setSelectedCareer] = useState('');
  const [customCareer, setCustomCareer] = useState('');
  const [isOtherCareer, setIsOtherCareer] = useState(false);

  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Beginner');

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkillInput, setCustomSkillInput] = useState('');

  const [weeklyHours, setWeeklyHours] = useState<WeeklyHours>('4–6 hours');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Available skills specified in prompt
  const standardSkills = [
    'Excel',
    'Python',
    'SQL',
    'Java',
    'JavaScript',
    'Figma',
    'Git',
    'HTML/CSS',
    'Tableau',
    'Data Analysis',
  ];

  const careerOptions = [
    {
      title: 'Data Analyst',
      desc: 'Interpret data, build SQL queries, craft dashboards & guide metrics.',
      icon: Database,
      badge: 'Popular',
    },
    {
      title: 'Software Developer',
      desc: 'Build web applications, backends, APIs, and scalable infrastructure.',
      icon: Code,
    },
    {
      title: 'UI/UX Designer',
      desc: 'Design user-centric interfaces, interactive wireframes & design systems.',
      icon: Layout,
    },
    {
      title: 'Cybersecurity Analyst',
      desc: 'Monitor threats, audit vulnerabilities, configure firewalls & protocols.',
      icon: ShieldCheck,
    },
    {
      title: 'Cloud Engineer',
      desc: 'Deploy and optimize resilient cloud services across AWS, GCP or Azure.',
      icon: Cloud,
    },
  ];

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;
    if (!selectedSkills.includes(customSkillInput.trim())) {
      setSelectedSkills((prev) => [...prev, customSkillInput.trim()]);
    }
    setCustomSkillInput('');
  };

  const handleStepNext = () => {
    if (currentStep === 1) {
      const finalCareer = isOtherCareer && customCareer.trim() ? customCareer.trim() : selectedCareer;
      if (!finalCareer) {
        showToast('Please select a target career path to continue.', 'warning');
        return;
      }
    }
    setCurrentStep((s) => s + 1);
  };

  const handleFinishOnboarding = () => {
    setIsAnalyzing(true);
    const finalCareer = isOtherCareer && customCareer.trim() ? customCareer.trim() : selectedCareer;

    setTimeout(() => {
      setOnboardingData(finalCareer || 'Data Analyst', experienceLevel, selectedSkills, weeklyHours);
      setIsAnalyzing(false);
      onNavigate('/skill-gap');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-[#F2F3F5] flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[340px] bg-[radial-gradient(circle,rgba(124,92,255,0.07)_0%,transparent_70%)] pointer-events-none" />

      {/* Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between z-10">
        <div
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C5CFF] to-[#8B6CFF] flex items-center justify-center">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base text-[#F2F3F5]">
            Skill<span className="text-[#8B6CFF]">Bridge</span>
          </span>
        </div>

        {/* Step Counter */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#687083]">
          <span>Step {currentStep} of {totalSteps}</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-2xl w-full mx-auto my-8 z-10">
        {/* Progress Bar Indicator */}
        <div className="mb-8">
          <div className="w-full bg-[#0A0B0F] h-1.5 rounded-full overflow-hidden border border-[#1B1E25]">
            <div
              className="bg-gradient-to-r from-[#7C5CFF] to-[#27D6A0] h-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card variant="surface" padding="lg" className="border-[#242832] shadow-[0_12px_40px_rgba(0,0,0,0.4)] relative">
          {/* STEP 1: Target Career */}
          {currentStep === 1 && (
            <div className="animate-in fade-in duration-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6CFF] block mb-1.5">
                Career Orientation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F2F3F5] tracking-tight">
                What's your target career?
              </h2>
              <p className="text-xs sm:text-sm text-[#949BAD] mt-1 mb-6">
                Choose the role you want to land an internship or first job in.
              </p>

              <div className="space-y-3">
                {careerOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = !isOtherCareer && selectedCareer === opt.title;

                  return (
                    <div
                      key={opt.title}
                      onClick={() => {
                        setSelectedCareer(opt.title);
                        setIsOtherCareer(false);
                      }}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all select-none ${
                        isSelected
                          ? 'bg-[#13151B] border-[#7C5CFF]/70 shadow-[0_4px_20px_rgba(124,92,255,0.15)]'
                          : 'bg-[#101217] border-[#242832] hover:border-[#7C5CFF]/30 hover:bg-[#13151B]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`p-2.5 rounded-lg border ${
                            isSelected
                              ? 'bg-[#7C5CFF]/15 border-[#7C5CFF]/40 text-[#8B6CFF]'
                              : 'bg-[#13151B] border-[#242832] text-[#949BAD]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#F2F3F5]">
                              {opt.title}
                            </span>
                            {opt.badge && (
                              <Badge variant="accent" size="sm">
                                {opt.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-[#949BAD] mt-0.5">{opt.desc}</p>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#7C5CFF] bg-[#7C5CFF] text-white shadow-[0_0_8px_rgba(124,92,255,0.5)]'
                            : 'border-[#242832]'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}

                {/* Other Option */}
                <div
                  onClick={() => setIsOtherCareer(true)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isOtherCareer
                      ? 'bg-[#13151B] border-[#7C5CFF]/70 shadow-[0_4px_20px_rgba(124,92,255,0.15)]'
                      : 'bg-[#101217] border-[#242832] hover:border-[#7C5CFF]/30 hover:bg-[#13151B]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#F2F3F5]">Other Career Path</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isOtherCareer
                          ? 'border-[#7C5CFF] bg-[#7C5CFF] text-white'
                          : 'border-[#242832]'
                      }`}
                    >
                      {isOtherCareer && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  {isOtherCareer && (
                    <input
                      type="text"
                      placeholder="e.g. AI Engineer, Product Manager..."
                      value={customCareer}
                      onChange={(e) => setCustomCareer(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 w-full bg-[#0A0B0F] border border-[#242832] focus:border-[#7C5CFF] rounded-lg px-3 py-2 text-xs text-[#F2F3F5] placeholder-[#687083] focus:outline-none"
                      autoFocus
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Experience Level */}
          {currentStep === 2 && (
            <div className="animate-in fade-in duration-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6CFF] block mb-1.5">
                Baseline Competency
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F2F3F5] tracking-tight">
                What's your current experience level?
              </h2>
              <p className="text-xs sm:text-sm text-[#949BAD] mt-1 mb-6">
                This helps us calibrate starting modules so you don't repeat fundamentals.
              </p>

              <div className="space-y-4">
                {[
                  {
                    level: 'Beginner' as ExperienceLevel,
                    title: 'Beginner',
                    desc: 'Little to no industry experience. College coursework or self-study basics only.',
                    badge: 'Starting Out',
                  },
                  {
                    level: 'Intermediate' as ExperienceLevel,
                    title: 'Intermediate',
                    desc: 'Built a few personal projects or small scripts. Familiar with standard syntax and tools.',
                    badge: 'Hands-on',
                  },
                  {
                    level: 'Advanced' as ExperienceLevel,
                    title: 'Advanced',
                    desc: 'Prior internship experience or large production portfolio. Looking to bridge specific specialized gaps.',
                    badge: 'Refining',
                  },
                ].map((opt) => {
                  const isSelected = experienceLevel === opt.level;
                  return (
                    <div
                      key={opt.level}
                      onClick={() => setExperienceLevel(opt.level)}
                      className={`p-5 rounded-xl border flex items-center justify-between cursor-pointer transition-all select-none ${
                        isSelected
                          ? 'bg-[#13151B] border-[#7C5CFF]/70 shadow-[0_4px_20px_rgba(124,92,255,0.15)]'
                          : 'bg-[#101217] border-[#242832] hover:border-[#7C5CFF]/30 hover:bg-[#13151B]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#F2F3F5]">
                            {opt.title}
                          </span>
                        </div>
                        <p className="text-xs text-[#949BAD] mt-1">{opt.desc}</p>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'border-[#7C5CFF] bg-[#7C5CFF] text-white shadow-[0_0_8px_rgba(124,92,255,0.5)]'
                            : 'border-[#242832]'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Current Skills */}
          {currentStep === 3 && (
            <div className="animate-in fade-in duration-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6CFF] block mb-1.5">
                Current Inventory
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F2F3F5] tracking-tight">
                What skills do you already have?
              </h2>
              <p className="text-xs sm:text-sm text-[#949BAD] mt-1 mb-6">
                Click chips to toggle. Selected skills will be credited toward your roadmap.
              </p>

              {/* Skills Grid */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                {standardSkills.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 select-none ${
                        isSelected
                          ? 'bg-[#7C5CFF]/15 border-[#7C5CFF]/70 text-[#F2F3F5] shadow-[0_0_12px_rgba(124,92,255,0.2)]'
                          : 'bg-[#13151B] border-[#242832] text-[#949BAD] hover:text-[#F2F3F5] hover:border-[#7C5CFF]/30'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#7C5CFF] bg-[#7C5CFF] text-white'
                            : 'border-[#242832]'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Skill */}
              <form onSubmit={handleAddCustomSkill} className="flex gap-2 pt-2 border-t border-[#1B1E25]">
                <input
                  type="text"
                  placeholder="Add another skill (e.g. Pandas, R, Power BI)..."
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  className="flex-1 bg-[#13151B] border border-[#242832] focus:border-[#7C5CFF] rounded-lg px-3 py-2 text-xs text-[#F2F3F5] placeholder-[#687083] focus:outline-none"
                />
                <Button variant="secondary" size="sm" type="submit" icon={<Plus className="w-3.5 h-3.5" />}>
                  Add
                </Button>
              </form>

              {/* Selected Count */}
              <div className="mt-4 text-xs text-[#949BAD]">
                <strong className="text-[#27D6A0]">{selectedSkills.length}</strong> skills selected.
              </div>
            </div>
          )}

          {/* STEP 4: Weekly Time */}
          {currentStep === 4 && (
            <div className="animate-in fade-in duration-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6CFF] block mb-1.5">
                Pacing & Schedule
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F2F3F5] tracking-tight">
                How much time can you dedicate each week?
              </h2>
              <p className="text-xs sm:text-sm text-[#949BAD] mt-1 mb-6">
                Be realistic with your university workload. SkillBridge builds a sustainable schedule.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    hours: '1–3 hours' as WeeklyHours,
                    title: '1–3 hours',
                    sub: 'Casual pace (~25 mins / day)',
                    timeEstimate: '10–12 weeks to Job Ready',
                  },
                  {
                    hours: '4–6 hours' as WeeklyHours,
                    title: '4–6 hours',
                    sub: 'Steady pace (~45 mins / day)',
                    timeEstimate: '6–8 weeks to Job Ready',
                    recommended: true,
                  },
                  {
                    hours: '7–10 hours' as WeeklyHours,
                    title: '7–10 hours',
                    sub: 'Intensive pace (~1 hr / day)',
                    timeEstimate: '4–5 weeks to Job Ready',
                  },
                  {
                    hours: '10+ hours' as WeeklyHours,
                    title: '10+ hours',
                    sub: 'Sprint pace (Full commitment)',
                    timeEstimate: '3–4 weeks to Job Ready',
                  },
                ].map((item) => {
                  const isSelected = weeklyHours === item.hours;

                  return (
                    <div
                      key={item.hours}
                      onClick={() => setWeeklyHours(item.hours)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all select-none flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#13151B] border-[#7C5CFF]/70 shadow-[0_4px_20px_rgba(124,92,255,0.15)]'
                          : 'bg-[#101217] border-[#242832] hover:border-[#7C5CFF]/30 hover:bg-[#13151B]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-base font-bold text-[#F2F3F5]">
                            {item.title}
                          </span>
                          {item.recommended && (
                            <Badge variant="accent" size="sm">
                              Popular Pace
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-[#949BAD]">{item.sub}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#1B1E25] flex items-center justify-between text-[11px] text-[#27D6A0]">
                        <span>{item.timeEstimate}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#8B6CFF]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-[#1B1E25] flex items-center justify-between">
            {currentStep > 1 ? (
              <Button
                variant="ghost"
                size="md"
                icon={<ArrowLeft className="w-4 h-4" />}
                onClick={() => setCurrentStep((s) => s - 1)}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <Button
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                onClick={handleStepNext}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                icon={<Sparkles className="w-4 h-4" />}
                iconPosition="right"
                onClick={handleFinishOnboarding}
                isLoading={isAnalyzing}
              >
                Analyze My Skills
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Footer info */}
      <div className="text-center text-xs text-[#687083] py-4">
        Creating personalized career roadmap for {user.name || 'your profile'} • SkillBridge Intelligence Engine
      </div>
    </div>
  );
};
