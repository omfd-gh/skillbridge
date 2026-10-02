import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Layers,
  Sliders,
  FolderGit2,
  LineChart,
  Brain,
  Check,
  Zap,
  Target,
  Code2,
  Database,
  BarChart3,
  ChevronRight,
  ShieldCheck,
  Clock,
  BookOpen,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useCareer } from '../context/CareerContext';

interface LandingPageProps {
  onNavigate: (route: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { isAuthenticated, hasCompletedOnboarding } = useCareer();

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      onNavigate('/login');
    } else if (!hasCompletedOnboarding) {
      onNavigate('/onboarding');
    } else {
      onNavigate('/dashboard');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-[#F2F3F5] selection:bg-[#7C5CFF]/30 selection:text-white">
      <Navbar onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 overflow-hidden border-b border-[#1B1E25]">
        {/* Ambient atmospheric purple glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[380px] bg-[radial-gradient(circle,rgba(124,92,255,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(39,214,160,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101217] border border-[#242832] text-xs font-medium text-[#8B6CFF] mb-8 hover:border-[#7C5CFF]/40 transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
            <Sparkles className="w-3.5 h-3.5 text-[#7C5CFF]" />
            <span>Personalized AI Career Roadmap • Powered by Google Gemini</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F2F3F5] max-w-4xl mx-auto leading-[1.08]">
            Your skills. <br className="hidden sm:inline" />
            Your career. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C5CFF] via-[#8B6CFF] to-[#27D6A0]">
              Your roadmap.
            </span>
          </h1>

          {/* Value Proposition Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-[#949BAD] max-w-2xl mx-auto leading-relaxed">
            Turn your career goal into a personalized, step-by-step path to job readiness.
            SkillBridge pinpoints your skill gaps, calibrates milestones to your schedule,
            and guides your journey with real-time Gemini AI.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={handleGetStarted}
              className="w-full sm:w-auto shadow-[0_0_25px_rgba(124,92,255,0.25)] hover:shadow-[0_0_35px_rgba(124,92,255,0.45)]"
            >
              Get Started
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={<Compass className="w-4 h-4 text-[#8B6CFF]" />}
              onClick={() => scrollToSection('how-it-works')}
              className="w-full sm:w-auto"
            >
              Explore SkillBridge
            </Button>
          </div>

          {/* Reassurance & Live Demo Link */}
          <div className="mt-5 text-xs text-[#687083] flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#27D6A0]" />
              Google Sign-In ready
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8B6CFF]" />
              Calibrated to 3–15 hrs/week
            </span>
            <span>•</span>
            <button
              onClick={() => onNavigate('/dashboard')}
              className="text-[#8B6CFF] hover:underline font-medium inline-flex items-center gap-1"
            >
              Explore live demo (Data Analyst) →
            </button>
          </div>

          {/* ========================================================================= */}
          {/* HERO PREVIEW: Dark Quantix SaaS Dashboard Mockup */}
          {/* ========================================================================= */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-[#242832] bg-[#0A0B0F] p-2.5 sm:p-5 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.7)] text-left">
              {/* Window Bar */}
              <div className="flex items-center justify-between pb-3 px-2 border-b border-[#1B1E25] text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E15C62]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#EAB04B]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#27D6A0]/80" />
                  <span className="ml-2 font-mono text-[11px] text-[#687083]">
                    skillbridge.app/dashboard
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#101217] border border-[#242832] text-[#8B6CFF] font-medium hidden sm:inline-block">
                    Target: Data Analyst
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#27D6A0]/10 border border-[#27D6A0]/25 text-[#27D6A0] font-semibold">
                    64% Career Ready
                  </span>
                </div>
              </div>

              {/* Mock Dashboard Preview Content */}
              <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* 1. Active Milestone Card */}
                <div className="p-4 rounded-xl bg-[#101217] border border-[#242832] flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-[#687083] uppercase tracking-wider">
                        Active Stage
                      </span>
                      <span className="text-[10px] text-[#8B6CFF] font-semibold bg-[#7C5CFF]/10 px-2 py-0.5 rounded border border-[#7C5CFF]/20">
                        Stage 02 of 06
                      </span>
                    </div>
                    <div className="text-base font-bold text-[#F2F3F5] mt-1.5 flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#8B6CFF]" />
                      SQL & Relational Databases
                    </div>
                    <p className="text-xs text-[#949BAD] mt-1 leading-relaxed">
                      Multi-table JOINs, subqueries & business aggregations.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#1B1E25]">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[#949BAD]">Milestone Progress</span>
                      <span className="font-bold text-[#27D6A0]">2 of 4 tasks</span>
                    </div>
                    <div className="w-full bg-[#07080B] h-2 rounded-full overflow-hidden border border-[#1B1E25]">
                      <div className="bg-gradient-to-r from-[#7C5CFF] to-[#27D6A0] h-full w-[50%]" />
                    </div>
                  </div>
                </div>

                {/* 2. Gemini AI Insight Card */}
                <div className="p-4 rounded-xl bg-[#101217] border border-[#7C5CFF]/35 flex flex-col justify-between relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.25),0_0_25px_rgba(124,92,255,0.08)]">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-[#7C5CFF]/08 rounded-full blur-xl pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#8B6CFF] uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" />
                        Gemini AI Advisor
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#27D6A0]/10 text-[#27D6A0] font-mono border border-[#27D6A0]/20">
                        Online
                      </span>
                    </div>
                    <p className="text-xs text-[#F2F3F5] mt-2 leading-relaxed bg-[#0A0B0F]/80 p-2.5 rounded-lg border border-[#1B1E25]">
                      "Your Excel foundation is strong. Focus on mastering SQL JOINs this week to eliminate your #1 hiring bottleneck for junior analyst roles."
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-[#687083]">Context-aware</span>
                    <button
                      onClick={() => onNavigate('/ai')}
                      className="text-[#8B6CFF] hover:text-white font-medium transition-colors"
                    >
                      Open Assistant →
                    </button>
                  </div>
                </div>

                {/* 3. Skill Gap Diagnostic Preview */}
                <div className="p-4 rounded-xl bg-[#101217] border border-[#242832] flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-[#687083] uppercase tracking-wider">
                        Skill Gap Matrix
                      </span>
                      <span className="text-[10px] text-[#27D6A0] font-semibold">
                        4 Tracked
                      </span>
                    </div>
                    <div className="space-y-2 mt-2.5">
                      <div className="flex items-center justify-between text-xs p-1.5 rounded bg-[#0A0B0F] border border-[#1B1E25]">
                        <span className="font-medium text-[#F2F3F5]">Excel & Stats</span>
                        <span className="text-[10px] text-[#27D6A0] font-semibold px-1.5 py-0.5 rounded bg-[#27D6A0]/10">
                          Strong (85%)
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs p-1.5 rounded bg-[#0A0B0F] border border-[#7C5CFF]/30">
                        <span className="font-medium text-[#F2F3F5]">SQL Queries</span>
                        <span className="text-[10px] text-[#8B6CFF] font-semibold px-1.5 py-0.5 rounded bg-[#7C5CFF]/15">
                          In Focus (55%)
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs p-1.5 rounded bg-[#0A0B0F] border border-[#1B1E25]">
                        <span className="font-medium text-[#949BAD]">Python / Pandas</span>
                        <span className="text-[10px] text-[#EAB04B] font-semibold px-1.5 py-0.5 rounded bg-[#EAB04B]/10">
                          Next Up (20%)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-[#1B1E25]">
                    <span className="text-[#687083]">Tailored to role</span>
                    <button
                      onClick={() => onNavigate('/skill-gap')}
                      className="text-[#8B6CFF] hover:text-white font-medium transition-colors"
                    >
                      View Full Analysis →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE PROBLEM / WHY SKILLBRIDGE SECTION */}
      {/* ========================================================================= */}
      <section id="problem" className="py-20 sm:py-28 border-b border-[#1B1E25] bg-[#0A0B0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6CFF] block mb-2">
              The Reality
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F2F3F5] tracking-tight">
              Career preparation shouldn't feel like guesswork.
            </h2>
            <p className="mt-4 text-base text-[#949BAD] leading-relaxed">
              Students have access to thousands of tutorials, yet struggle to answer a basic question:
              <em> "What should I work on tonight to actually get hired?"</em>
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* The Old Broken Way */}
            <Card variant="surface" padding="lg" className="border-[#E15C62]/20 bg-[#101217]">
              <div className="flex items-center gap-2 text-[#E15C62] text-xs font-semibold uppercase tracking-wider mb-4">
                <AlertTriangle className="w-4 h-4" />
                The Fragmented Reality
              </div>
              <ul className="space-y-3.5 text-sm text-[#949BAD]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E15C62] font-bold">✕</span>
                  Browsing dozens of contradictory job descriptions on LinkedIn
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E15C62] font-bold">✕</span>
                  Hoarding 50-hour tutorial playlists without knowing what matters
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E15C62] font-bold">✕</span>
                  Static roadmaps that ignore what you already learned in class
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E15C62] font-bold">✕</span>
                  Building generic clone apps that recruiters immediately skip
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E15C62] font-bold">✕</span>
                  Zero objective sense of how close you actually are to job-ready
                </li>
              </ul>
            </Card>

            {/* The SkillBridge System */}
            <Card variant="surface" padding="lg" className="border-[#27D6A0]/25 bg-[#101217] shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-2 text-[#27D6A0] text-xs font-semibold uppercase tracking-wider mb-4">
                <CheckCircle2 className="w-4 h-4" />
                The SkillBridge System
              </div>
              <ul className="space-y-3.5 text-sm text-[#F2F3F5]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#27D6A0] font-bold">✓</span>
                  Diagnose exact skill gaps based on real hiring criteria
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#27D6A0] font-bold">✓</span>
                  Sequenced milestones paced to your actual weekly study hours
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#27D6A0] font-bold">✓</span>
                  Prioritize only high-yield concepts—no tutorial bloat
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#27D6A0] font-bold">✓</span>
                  Resume-ready portfolio projects with verifiable deliverables
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#27D6A0] font-bold">✓</span>
                  Google Gemini AI assistant that knows your roadmap context
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HOW IT WORKS SECTION (Concise 4-Step Process) */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-20 sm:py-28 border-b border-[#1B1E25]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6CFF] block mb-2">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F2F3F5] tracking-tight">
              A structured loop from student to job-ready
            </h2>
            <p className="mt-4 text-base text-[#949BAD]">
              Four clear steps designed to keep you progressing with focus and clarity.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Set Target Career',
                desc: 'Select your desired role (e.g. Data Analyst, Software Engineer, Cloud Engineer) to calibrate hiring requirements.',
                icon: Target,
              },
              {
                step: '02',
                title: 'Map Current Skills',
                desc: 'Assess what you already know. SkillBridge credits your existing knowledge so you never repeat fundamentals.',
                icon: Sliders,
              },
              {
                step: '03',
                title: 'Get Adaptive Roadmap',
                desc: 'Receive sequenced milestones calibrated to your weekly schedule (3–15 hours), ordered by recruiter hiring demand.',
                icon: Layers,
              },
              {
                step: '04',
                title: 'Build & Level Up',
                desc: 'Ship resume-worthy portfolio projects and get 24/7 grounded guidance from the Gemini AI career assistant.',
                icon: FolderGit2,
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Card
                  key={s.step}
                  variant="surface"
                  padding="lg"
                  className="relative group hover:border-[#7C5CFF]/40 transition-all hover:-translate-y-1"
                >
                  <div className="text-3xl font-black text-[#1B1E25] group-hover:text-[#7C5CFF]/30 transition-colors font-mono mb-4">
                    {s.step}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[#13151B] border border-[#242832] flex items-center justify-center text-[#8B6CFF] mb-3 group-hover:border-[#7C5CFF]/50 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#F2F3F5] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#949BAD] leading-relaxed">
                    {s.desc}
                  </p>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={handleGetStarted}
            >
              Start With Step 01
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE 5 CORE FEATURES SECTION */}
      {/* ========================================================================= */}
      <section id="features" className="py-20 sm:py-28 border-b border-[#1B1E25] bg-[#0A0B0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6CFF] block mb-2">
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F2F3F5] tracking-tight">
              Engineered for genuine job readiness
            </h2>
            <p className="mt-4 text-base text-[#949BAD]">
              Every capability is designed to bridge the gap between coursework and industry expectations.
            </p>
          </div>

          {/* 5 Features Grid: 2 Hero Features + 3 Supporting Pillars */}
          <div className="mt-16 space-y-6">
            {/* Top Row: Two Prominent Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Feature 1: Personalized Career Roadmap */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#101217] border border-[#242832] hover:border-[#7C5CFF]/40 transition-all flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 flex items-center justify-center text-[#8B6CFF]">
                      <Layers className="w-5 h-5" />
                    </div>
                    <Badge variant="accent" size="sm">Core System</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-[#F2F3F5]">
                    Personalized Career Roadmap
                  </h3>
                  <p className="text-sm text-[#949BAD] mt-2 leading-relaxed">
                    Sequenced milestones calibrated to your target career, baseline skills, and weekly study schedule.
                    Tasks adapt dynamically as you check off competencies, ensuring you focus on what moves the needle.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#1B1E25]">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-lg bg-[#0A0B0F] border border-[#1B1E25]">
                      <div className="text-[#8B6CFF] font-bold">Sequenced</div>
                      <div className="text-[10px] text-[#687083] mt-0.5">By Hiring Demand</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0A0B0F] border border-[#1B1E25]">
                      <div className="text-[#27D6A0] font-bold">Paced</div>
                      <div className="text-[10px] text-[#687083] mt-0.5">3–15 hrs / week</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0A0B0F] border border-[#1B1E25]">
                      <div className="text-[#F2F3F5] font-bold">Dynamic</div>
                      <div className="text-[10px] text-[#687083] mt-0.5">Self-Adjusting</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2: AI Career Assistant powered by Gemini */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#101217] border border-[#7C5CFF]/30 hover:border-[#7C5CFF]/50 transition-all flex flex-col justify-between relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3),0_0_25px_rgba(124,92,255,0.06)]">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#7C5CFF]/10 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 flex items-center justify-center text-[#8B6CFF]">
                      <Brain className="w-5 h-5" />
                    </div>
                    <Badge variant="success" size="sm">Powered by Gemini</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-[#F2F3F5]">
                    AI Career Assistant
                  </h3>
                  <p className="text-sm text-[#949BAD] mt-2 leading-relaxed">
                    Integrated with Google Gemini 2.5 Flash, the assistant understands your exact roadmap stage,
                    career preference, and skill gaps. Receive grounded study advice, code clarifications,
                    and resume tips rather than generic AI responses.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#1B1E25]">
                  <div className="p-3 rounded-lg bg-[#0A0B0F] border border-[#1B1E25] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#27D6A0]" />
                      <span className="text-[#F2F3F5] font-medium">Context-injected prompt pipeline</span>
                    </div>
                    <span className="text-[11px] text-[#8B6CFF] font-semibold">Gemini 2.5 Flash</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Three Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 3: Skill Gap Analysis */}
              <Card variant="surface" padding="lg" className="hover:border-[#7C5CFF]/40 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#27D6A0]/10 border border-[#27D6A0]/25 flex items-center justify-center text-[#27D6A0] mb-4">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#F2F3F5]">
                    Skill Gap Analysis
                  </h3>
                  <p className="text-xs sm:text-sm text-[#949BAD] mt-2 leading-relaxed">
                    Identify exactly where your skills stand relative to job postings. Classify skills into Strong,
                    Developing, and Critical Gaps so your study time is never wasted on redundant topics.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1B1E25] flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#27D6A0]/10 text-[#27D6A0] font-semibold">
                    Strengths
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#7C5CFF]/10 text-[#8B6CFF] font-semibold">
                    Developing
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#EAB04B]/10 text-[#EAB04B] font-semibold">
                    Critical Gaps
                  </span>
                </div>
              </Card>

              {/* Feature 4: Project Guidance */}
              <Card variant="surface" padding="lg" className="hover:border-[#7C5CFF]/40 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#EAB04B]/10 border border-[#EAB04B]/25 flex items-center justify-center text-[#EAB04B] mb-4">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#F2F3F5]">
                    Project Guidance
                  </h3>
                  <p className="text-xs sm:text-sm text-[#949BAD] mt-2 leading-relaxed">
                    Build resume-ready portfolio projects with authentic business context.
                    Follow structured deliverables and verifiable proof-of-work criteria that hiring managers look for.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1B1E25] flex items-center justify-between text-xs text-[#687083]">
                  <span>Real datasets</span>
                  <span className="text-[#8B6CFF] font-medium">GitHub proof of work</span>
                </div>
              </Card>

              {/* Feature 5: Progress Tracking */}
              <Card variant="surface" padding="lg" className="hover:border-[#7C5CFF]/40 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#7C5CFF]/10 border border-[#7C5CFF]/25 flex items-center justify-center text-[#8B6CFF] mb-4">
                    <LineChart className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#F2F3F5]">
                    Progress Tracking
                  </h3>
                  <p className="text-xs sm:text-sm text-[#949BAD] mt-2 leading-relaxed">
                    Monitor your Career Readiness score in real time. Track completed milestones, active study streaks,
                    and unlock achievement badges as you systematically close skill gaps.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1B1E25] flex items-center justify-between text-xs">
                  <span className="text-[#949BAD]">Readiness Index</span>
                  <span className="text-[#27D6A0] font-bold">Live % calculation</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ROADMAP PREVIEW SECTION (Interactive Milestone Chain) */}
      {/* ========================================================================= */}
      <section id="roadmap-preview" className="py-20 sm:py-28 border-b border-[#1B1E25]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6CFF] block mb-2">
              Curriculum Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F2F3F5] tracking-tight">
              Data Analyst Milestone Sequence
            </h2>
            <p className="mt-4 text-base text-[#949BAD]">
              Explore how SkillBridge sequences Aarav's path from beginner to job-ready candidate:
            </p>
          </div>

          {/* Sequential Stage Cards */}
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              {
                stage: '01',
                title: 'Foundations & Business Analysis',
                detail: 'Excel modeling, statistical basics, business metrics',
                status: 'complete',
                badge: 'Completed ✓',
              },
              {
                stage: '02',
                title: 'SQL & Relational Databases',
                detail: 'Queries, multi-table JOINs, aggregations, window functions',
                status: 'current',
                badge: 'Active Focus ←',
              },
              {
                stage: '03',
                title: 'Business Intelligence & Dashboards',
                detail: 'Data storytelling, interactive KPI dashboards, Tableau / PowerBI',
                status: 'locked',
                badge: 'Upcoming',
              },
              {
                stage: '04',
                title: 'Python for Data Analysis',
                detail: 'Pandas data cleaning, NumPy vectorized operations, Matplotlib',
                status: 'locked',
                badge: 'Upcoming',
              },
              {
                stage: '05',
                title: 'Portfolio Case Studies',
                detail: 'Subscription churn model, e-commerce revenue dashboard',
                status: 'locked',
                badge: 'Upcoming',
              },
              {
                stage: '06',
                title: 'Job Ready & Technical Interviews',
                detail: 'Resume alignment, SQL live-coding drills, mock take-homes',
                status: 'locked',
                badge: 'Target Goal 🎯',
              },
            ].map((step, idx) => (
              <div key={step.stage}>
                <div
                  className={`p-4 sm:p-5 rounded-xl border flex items-center justify-between transition-all ${
                    step.status === 'current'
                      ? 'bg-[#13151B] border-[#7C5CFF]/60 shadow-[0_4px_20px_rgba(124,92,255,0.15)]'
                      : step.status === 'complete'
                      ? 'bg-[#101217] border-[#27D6A0]/30'
                      : 'bg-[#0A0B0F] border-[#1B1E25] opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-[#687083]">
                      {step.stage}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#F2F3F5]">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#949BAD] mt-0.5">{step.detail}</p>
                    </div>
                  </div>
                  <div>
                    {step.status === 'complete' && (
                      <Badge variant="success" size="sm">
                        {step.badge}
                      </Badge>
                    )}
                    {step.status === 'current' && (
                      <Badge variant="accent" size="sm">
                        {step.badge}
                      </Badge>
                    )}
                    {step.status === 'locked' && (
                      <Badge variant="neutral" size="sm">
                        {step.badge}
                      </Badge>
                    )}
                  </div>
                </div>

                {idx < 5 && (
                  <div className="flex justify-center py-1">
                    <div className="w-0.5 h-3.5 bg-[#1B1E25]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={() => onNavigate('/roadmap')}
            >
              Open Full Interactive Roadmap
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FINAL CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-[#0A0B0F]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[340px] bg-[radial-gradient(circle,rgba(124,92,255,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C5CFF]/10 border border-[#7C5CFF]/25 text-xs font-semibold text-[#8B6CFF] mb-6">
            <Zap className="w-3.5 h-3.5" />
            <span>Ready in under 2 minutes</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F2F3F5] tracking-tight">
            Stop guessing. Start building.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#949BAD] max-w-xl mx-auto leading-relaxed">
            Take the quick skill assessment and unlock your personalized roadmap to job readiness today.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={handleGetStarted}
              className="w-full sm:w-auto shadow-[0_0_25px_rgba(124,92,255,0.25)] hover:shadow-[0_0_35px_rgba(124,92,255,0.45)]"
            >
              Get Started
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('/dashboard')}
              className="w-full sm:w-auto"
            >
              Explore Live Demo
            </Button>
          </div>

          <div className="mt-6 text-xs text-[#687083] flex items-center justify-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#27D6A0]" />
              Instant Google Sign-In
            </span>
            <span>•</span>
            <span>Free student tier</span>
            <span>•</span>
            <span>No credit card required</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. POLISHED FOOTER */}
      {/* ========================================================================= */}
      <footer className="border-t border-[#1B1E25] bg-[#07080B] pt-14 pb-10 text-xs text-[#687083]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#1B1E25]">
            {/* Brand Column */}
            <div className="md:col-span-1 space-y-3">
              <div
                onClick={() => onNavigate('/')}
                className="flex items-center gap-2.5 cursor-pointer group select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C5CFF] to-[#8B6CFF] flex items-center justify-center shadow-[0_0_12px_rgba(124,92,255,0.3)]">
                  <Compass className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-bold text-[#F2F3F5] tracking-tight">
                  Skill<span className="text-[#8B6CFF]">Bridge</span>
                </span>
              </div>
              <p className="text-xs text-[#949BAD] leading-relaxed">
                Personalized AI-powered career roadmaps and skill guidance for college students.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#27D6A0]">
                <span className="w-2 h-2 rounded-full bg-[#27D6A0] animate-pulse" />
                <span>Gemini 2.5 Flash active</span>
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-[#F2F3F5] uppercase tracking-wider">
                Product
              </div>
              <ul className="space-y-2 text-[#949BAD]">
                <li>
                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    className="hover:text-[#F2F3F5] transition-colors"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('features')}
                    className="hover:text-[#F2F3F5] transition-colors"
                  >
                    Platform Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('roadmap-preview')}
                    className="hover:text-[#F2F3F5] transition-colors"
                  >
                    Roadmap Preview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('problem')}
                    className="hover:text-[#F2F3F5] transition-colors"
                  >
                    Why SkillBridge
                  </button>
                </li>
              </ul>
            </div>

            {/* Platform Column */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-[#F2F3F5] uppercase tracking-wider">
                Platform
              </div>
              <ul className="space-y-2 text-[#949BAD]">
                <li>
                  <button
                    onClick={handleGetStarted}
                    className="hover:text-[#F2F3F5] transition-colors"
                  >
                    Get Started
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('/login')}
                    className="hover:text-[#F2F3F5] transition-colors"
                  >
                    Google Sign-In
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('/dashboard')}
                    className="hover:text-[#F2F3F5] transition-colors"
                  >
                    Live Demo Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('/ai')}
                    className="hover:text-[#F2F3F5] transition-colors"
                  >
                    Gemini AI Assistant
                  </button>
                </li>
              </ul>
            </div>

            {/* Technology Column */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-[#F2F3F5] uppercase tracking-wider">
                Built With
              </div>
              <ul className="space-y-2 text-[#949BAD]">
                <li className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#8B6CFF]" />
                  <span>Google Gemini API</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#27D6A0]" />
                  <span>Google Identity Services</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#949BAD]" />
                  <span>React 19 + TypeScript + Vite</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#949BAD]" />
                  <span>Quantix Design Tokens</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#687083]">
            <div>
              SkillBridge © 2026. Built as an AI Career Platform deliverable.
            </div>
            <div className="flex items-center gap-4">
              <span>Your skills. Your career. Your roadmap.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
