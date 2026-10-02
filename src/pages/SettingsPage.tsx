import React from 'react';
import { Bell, Moon, Database, RotateCcw, CheckCircle, Shield, LogOut } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { useCareer } from '../context/CareerContext';

interface SettingsPageProps {
  onNavigate: (route: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  const { user, updateUser, resetToDemo, logout, showToast, isAIConfigured, authSession } = useCareer();
  const remindersEnabled = user.studyRemindersEnabled ?? true;

  const handleToggleReminders = () => {
    const nextState = !remindersEnabled;
    updateUser({ studyRemindersEnabled: nextState });
    showToast(
      nextState ? 'Study notifications enabled.' : 'Study notifications paused.',
      'info'
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="pb-6 border-b border-[#1B1E25]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F2F3F5] tracking-tight">
          Platform Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#949BAD] mt-1">
          Manage your authenticated identity, AI intelligence engine, and local roadmap persistence.
        </p>
      </div>

      <div className="space-y-6 max-w-3xl">
        {/* 1. Google Account Session */}
        <Card variant="surface" padding="lg" className="border-[#242832] space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between pb-3 border-b border-[#1B1E25]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#7C5CFF]/15 text-[#8B6CFF]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#F2F3F5]">Google Account Session</h3>
                <p className="text-xs text-[#949BAD]">Identity verified via Google Identity Services (GIS)</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#27D6A0] bg-[#27D6A0]/10 px-2.5 py-1 rounded-full border border-[#27D6A0]/25 flex items-center gap-1.5">
              <CheckCircle className="w-3 h-3" />
              Authenticated
            </span>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#0A0B0F] border border-[#1B1E25]">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full border border-[#242832] object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#F2F3F5] truncate">
                {user.name}
              </div>
              <div className="text-[11px] text-[#949BAD] truncate">
                {authSession?.user?.email || user.email || 'aarav.patel@student.edu'}
              </div>
            </div>
            <div className="text-right text-[10px] text-[#687083] font-mono">
              OAuth 2.0
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[#949BAD]">End your active SkillBridge session</span>
            <Button
              variant="outline"
              size="sm"
              icon={<LogOut className="w-3.5 h-3.5" />}
              onClick={() => {
                logout();
                onNavigate('/login');
              }}
              className="text-[#E15C62] hover:text-[#E15C62] border-[#E15C62]/30 hover:border-[#E15C62] hover:bg-[#E15C62]/10 transition-colors"
            >
              Sign Out
            </Button>
          </div>
        </Card>

        {/* 2. Gemini AI Backend Status */}
        <Card variant="surface" padding="lg" className="border-[#242832] space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between pb-3 border-b border-[#1B1E25]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#7C5CFF]/15 text-[#8B6CFF]">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#F2F3F5]">Gemini AI Backend Engine</h3>
                <p className="text-xs text-[#949BAD]">Server-side integration via official @google/genai SDK</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#27D6A0] bg-[#27D6A0]/10 px-2.5 py-1 rounded-full border border-[#27D6A0]/25 flex items-center gap-1.5">
              <CheckCircle className="w-3 h-3" />
              {isAIConfigured ? 'Operational' : 'Simulated Context'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#0A0B0F] border border-[#1B1E25]">
              <span className="text-[#687083] uppercase text-[10px] font-semibold block mb-1">
                Active Provider & Model
              </span>
              <span className="font-bold text-[#F2F3F5] font-mono">
                Google Gemini (gemini-3.5-flash-lite)
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#0A0B0F] border border-[#1B1E25]">
              <span className="text-[#687083] uppercase text-[10px] font-semibold block mb-1">
                Context Injection Status
              </span>
              <span className="font-bold text-[#27D6A0]">
                Active ({user.targetCareer || 'Career'}, Stage 02, Skills)
              </span>
            </div>
          </div>

          <p className="text-xs text-[#949BAD] leading-relaxed">
            API keys remain securely isolated in server-side configuration. Prompt requests dynamically inject the candidate's roadmap progress and skill bottlenecks.
          </p>
        </Card>

        {/* 3. Study Reminders */}
        <Card variant="surface" padding="lg" className="border-[#242832] space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-3 pb-3 border-b border-[#1B1E25]">
            <div className="p-2 rounded-lg bg-[#EAB04B]/15 text-[#EAB04B]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F2F3F5]">Study Reminders & Habits</h3>
              <p className="text-xs text-[#949BAD]">Keep your {user.streakDays}-day learning streak active with pacing notifications.</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#F2F3F5]">Daily Habit Pacing Notifications</span>
            <Button
              variant={remindersEnabled ? 'primary' : 'outline'}
              size="sm"
              onClick={handleToggleReminders}
            >
              {remindersEnabled ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </Card>

        {/* 4. Local State & Demo Reset */}
        <Card variant="surface" padding="lg" className="border-[#242832] space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-3 pb-3 border-b border-[#1B1E25]">
            <div className="p-2 rounded-lg bg-[#8B6CFF]/15 text-[#8B6CFF]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F2F3F5]">Demo State & Local Storage</h3>
              <p className="text-xs text-[#949BAD]">All checklist toggles, customized skills, and chat logs are stored in your browser.</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-[#949BAD]">Restore Aarav's default demo state</span>
            <Button
              variant="outline"
              size="sm"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={() => {
                resetToDemo();
                onNavigate('/dashboard');
              }}
            >
              Reset to Aarav Demo
            </Button>
          </div>
        </Card>

        {/* 5. Theme Palette */}
        <Card variant="surface" padding="lg" className="border-[#242832] space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-3 pb-3 border-b border-[#1B1E25]">
            <div className="p-2 rounded-lg bg-[#7C5CFF]/15 text-[#8B6CFF]">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F2F3F5]">Quantix Dark Aesthetic</h3>
              <p className="text-xs text-[#949BAD]">Obsidian charcoal palette with restrained purple ambient illumination.</p>
            </div>
          </div>
          <div className="text-xs text-[#27D6A0] font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Active: #07080B Deep Black, #101217 Elevated Surface, #7C5CFF Purple Accent
          </div>
        </Card>
      </div>
    </div>
  );
};
