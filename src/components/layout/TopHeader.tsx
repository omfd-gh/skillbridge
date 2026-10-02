import React, { useState } from 'react';
import {
  Bell,
  Sparkles,
  Menu,
  X,
  Target,
  Clock,
} from 'lucide-react';
import { useCareer } from '../../context/CareerContext';
import { Button } from '../common/Button';

interface TopHeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ currentRoute, onNavigate }) => {
  const { user } = useCareer();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const getPageTitle = (route: string) => {
    switch (route) {
      case '/dashboard':
        return 'Overview';
      case '/roadmap':
        return 'Personalized Roadmap';
      case '/skill-gap':
        return 'Skill Gap Analysis';
      case '/projects':
        return 'Portfolio Projects';
      case '/ai':
        return 'SkillBridge AI Career Assistant';
      case '/profile':
        return 'Profile & Career Progress';
      case '/settings':
        return 'Platform Settings';
      default:
        return 'SkillBridge';
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#07080B]/90 backdrop-blur-md border-b border-[#1B1E25] px-4 sm:px-6 py-3 flex items-center justify-between">
      {/* Left Title / Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-[#949BAD] hover:text-[#F2F3F5] rounded-lg border border-[#242832]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#687083] hidden sm:inline">SkillBridge /</span>
            <h1 className="text-sm sm:text-base font-semibold text-[#F2F3F5]">
              {getPageTitle(currentRoute)}
            </h1>
          </div>
        </div>
      </div>

      {/* Middle Career Target Pill (Desktop) */}
      <div className="hidden lg:flex items-center gap-4 bg-[#101217] border border-[#242832] px-3.5 py-1.5 rounded-full text-xs shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-1.5 text-[#F2F3F5]">
          <Target className="w-3.5 h-3.5 text-[#8B6CFF]" />
          <span className="text-[#949BAD]">Target:</span>
          <span className="font-semibold text-[#F2F3F5]">{user.targetCareer}</span>
        </div>
        <div className="w-1 h-3 bg-[#242832]" />
        <div className="flex items-center gap-1.5 text-[#949BAD]">
          <Clock className="w-3.5 h-3.5 text-[#27D6A0]" />
          <span>{user.weeklyHours}/wk</span>
        </div>
        <div className="w-1 h-3 bg-[#242832]" />
        <div className="flex items-center gap-1.5">
          <span className="text-[#949BAD]">Readiness:</span>
          <span className="font-bold text-[#27D6A0]">{user.readinessPercentage}%</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          icon={<Sparkles className="w-3.5 h-3.5 text-[#8B6CFF]" />}
          onClick={() => onNavigate('/ai')}
          className="hidden sm:inline-flex text-xs"
        >
          Ask AI
        </Button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationToast(!showNotificationToast)}
            className="p-2 text-[#949BAD] hover:text-[#F2F3F5] hover:bg-[#101217] rounded-lg border border-[#242832] relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#7C5CFF]" />
          </button>

          {showNotificationToast && (
            <div className="absolute right-0 mt-2 w-72 bg-[#101217] border border-[#242832] rounded-xl p-3 shadow-2xl z-50 text-xs">
              <div className="font-semibold text-[#F2F3F5] mb-1.5 flex items-center justify-between">
                <span>Notifications</span>
                <span className="text-[10px] text-[#8B6CFF]">1 new</span>
              </div>
              <div className="p-2 rounded-lg bg-[#13151B] border border-[#1B1E25]">
                <p className="font-medium text-[#F2F3F5]">Stage 02 In Progress</p>
                <p className="text-[11px] text-[#949BAD] mt-0.5">
                  Complete 1 more SQL task to reach 70% readiness!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Mini */}
        <div
          onClick={() => onNavigate('/profile')}
          className="flex items-center gap-2 pl-2 cursor-pointer group"
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full border border-[#242832] group-hover:border-[#7C5CFF] transition-colors object-cover"
          />
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bg-[#07080B] border-b border-[#1B1E25] p-4 space-y-2 z-50 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <div className="p-3 bg-[#101217] rounded-lg border border-[#242832] mb-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-[#F2F3F5]">{user.name} ({user.targetCareer})</div>
              <div className="text-[11px] text-[#27D6A0]">{user.readinessPercentage}% Readiness</div>
            </div>
            <Button size="sm" variant="outline" onClick={() => { setMobileMenuOpen(false); onNavigate('/profile'); }}>
              Profile
            </Button>
          </div>
          {[
            { id: '/dashboard', label: 'Dashboard' },
            { id: '/roadmap', label: 'Roadmap' },
            { id: '/skill-gap', label: 'Skill Gap Analysis' },
            { id: '/projects', label: 'Projects' },
            { id: '/ai', label: 'AI Assistant' },
            { id: '/profile', label: 'Profile & Progress' },
            { id: '/settings', label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(item.id);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentRoute === item.id
                  ? 'bg-[#13151B] text-[#8B6CFF] border border-[#242832]'
                  : 'text-[#949BAD] hover:text-[#F2F3F5]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
