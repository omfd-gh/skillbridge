import React from 'react';
import {
  LayoutDashboard,
  Map,
  Compass,
  Sparkles,
  User,
  Settings,
  Flame,
  RotateCcw,
  LogOut,
  FolderGit2,
  Sliders,
  Target,
} from 'lucide-react';
import { useCareer } from '../../context/CareerContext';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentRoute, onNavigate }) => {
  const { user, resetToDemo, logout } = useCareer();

  const navItems = [
    { id: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: '/roadmap', label: 'Roadmap', icon: Map, badge: 'Active' },
    { id: '/skill-gap', label: 'Skill Gap', icon: Sliders },
    { id: '/projects', label: 'Projects', icon: FolderGit2, count: `${user.completedProjectsCount}/${user.totalProjectsCount}` },
    { id: '/ai', label: 'AI Assistant', icon: Sparkles, highlight: true },
    { id: '/profile', label: 'Profile & Progress', icon: User },
    { id: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#090A0D] border-r border-[#1B1E25] flex flex-col justify-between h-screen sticky top-0 select-none relative overflow-hidden">
      {/* Subtle purple ambient lighting inspired by Quantix */}
      <div className="absolute top-0 left-0 w-full h-80 bg-[radial-gradient(circle_at_20%_0%,rgba(124,92,255,0.08)_0%,transparent_65%)] pointer-events-none" />

      {/* Brand Header */}
      <div className="p-5 border-b border-[#1B1E25] relative z-10">
        <div
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#7C5CFF] to-[#8B6CFF] flex items-center justify-center shadow-[0_0_15px_rgba(124,92,255,0.25)] group-hover:shadow-[0_0_20px_rgba(124,92,255,0.4)] transition-all">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-[#F2F3F5] tracking-tight">
                Skill<span className="text-[#8B6CFF]">Bridge</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#7C5CFF]/15 text-[#A38BFF] border border-[#7C5CFF]/25">
                AI MVP
              </span>
            </div>
            <p className="text-[11px] text-[#949BAD] truncate max-w-[130px]">
              {user.targetCareer || 'Career Platform'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="px-3 py-3 flex-1 overflow-y-auto space-y-1 relative z-10">
        <div className="px-3 pb-2 text-[11px] font-semibold text-[#687083] uppercase tracking-wider">
          Platform
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF] ${
                isActive
                  ? 'bg-[#13151B] text-[#F2F3F5] border border-[#7C5CFF]/40 shadow-[0_4px_20px_rgba(124,92,255,0.10)]'
                  : 'text-[#8B93A7] hover:text-[#F2F3F5] hover:bg-[#101217] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-[#8B6CFF]'
                      : item.highlight
                      ? 'text-[#8B6CFF] group-hover:text-[#A38BFF]'
                      : 'text-[#8B93A7] group-hover:text-[#F2F3F5]'
                  }`}
                />
                <span className={item.highlight && !isActive ? 'text-[#F2F3F5]' : ''}>
                  {item.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#7C5CFF]/15 text-[#8B6CFF] border border-[#7C5CFF]/25">
                    {item.badge}
                  </span>
                )}

                {item.count && (
                  <span className="text-[11px] font-mono text-[#687083] px-1.5 py-0.5 rounded bg-[#0A0B0F]">
                    {item.count}
                  </span>
                )}

                {/* Refined illuminated vertical active pill */}
                {isActive && (
                  <div className="w-1 h-3.5 bg-gradient-to-b from-[#8B6CFF] to-[#7C5CFF] rounded-full shadow-[0_0_8px_rgba(124,92,255,0.6)]" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Visually Distinct Current Goal Section */}
      <div className="px-3 pb-2 relative z-10">
        <div
          onClick={() => onNavigate('/roadmap')}
          className="p-3 rounded-xl bg-[#101217] border border-[#242832] hover:border-[#7C5CFF]/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider mb-1.5">
            <span className="flex items-center gap-1.5 text-[#8B6CFF]">
              <Target className="w-3.5 h-3.5 text-[#7C5CFF]" />
              Current Goal
            </span>
            <span className="font-bold text-[#27D6A0] font-mono tabular-nums">
              {user.readinessPercentage}%
            </span>
          </div>
          <div className="text-xs font-bold text-[#F2F3F5] truncate group-hover:text-[#8B6CFF] transition-colors">
            {user.targetCareer || 'Career Track'}
          </div>
          <div className="w-full bg-[#07080B] h-1.5 rounded-full overflow-hidden mt-2 border border-[#1B1E25]">
            <div
              className="bg-gradient-to-r from-[#7C5CFF] to-[#27D6A0] h-full transition-all duration-500"
              style={{ width: `${user.readinessPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Info & User */}
      <div className="p-3 border-t border-[#1B1E25] space-y-2.5 bg-[#090A0D] relative z-10">
        {/* Streak & Demo badge */}
        <div className="p-2.5 rounded-lg bg-[#101217] border border-[#1B1E25] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-[#EAB04B]/15 text-[#EAB04B]">
              <Flame className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#F2F3F5]">
                {user.streakDays}-Day Streak
              </div>
              <div className="text-[10px] text-[#687083]">Keep learning today</div>
            </div>
          </div>
          <button
            onClick={resetToDemo}
            title="Reset to default demo data (Aarav)"
            className="p-1.5 text-[#687083] hover:text-[#8B6CFF] rounded hover:bg-[#13151B] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7C5CFF]"
            aria-label="Reset to default demo data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[#101217] transition-colors">
          <div
            onClick={() => onNavigate('/profile')}
            className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full border border-[#242832] object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-[#F2F3F5] truncate">
                {user.name}
              </div>
              <div className="text-[10px] text-[#949BAD] truncate">
                {user.readinessPercentage}% Career Ready
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              onNavigate('/login');
            }}
            title="Sign Out"
            className="p-1 text-[#687083] hover:text-[#E15C62] rounded transition-colors ml-1"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
