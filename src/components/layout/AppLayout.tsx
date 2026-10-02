import React from 'react';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { ToastContainer } from '../common/Toast';

interface AppLayoutProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentRoute,
  onNavigate,
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-[#07080B] text-[#F2F3F5] relative overflow-hidden">
      {/* Subtle top ambient purple lighting */}
      <div className="absolute top-0 right-0 w-2/3 h-96 bg-[radial-gradient(ellipse_at_60%_0%,rgba(124,92,255,0.05)_0%,transparent_65%)] pointer-events-none" />

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar currentRoute={currentRoute} onNavigate={onNavigate} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <TopHeader currentRoute={currentRoute} onNavigate={onNavigate} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};
