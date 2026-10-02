import React, { useState, useEffect } from 'react';
import { CareerProvider, useCareer } from './context/CareerContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { DashboardPage } from './pages/DashboardPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AppLayout } from './components/layout/AppLayout';
import { ToastContainer } from './components/common/Toast';

const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/roadmap',
  '/skill-gap',
  '/projects',
  '/ai',
  '/settings',
];

const AppContent: React.FC = () => {
  const { isAuthenticated, hasCompletedOnboarding } = useCareer();

  // Read current pathname from window
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const path = window.location.pathname;
    return path && path !== '' ? path : '/';
  });

  const navigate = (route: string) => {
    if (route !== currentRoute) {
      window.history.pushState({}, '', route);
      setCurrentRoute(route);
      window.scrollTo(0, 0);
    }
  };

  // Listen for browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentRoute(path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Enforce route protection and onboarding redirection
  useEffect(() => {
    if (!isAuthenticated && PROTECTED_ROUTES.includes(currentRoute)) {
      window.history.replaceState({}, '', '/login');
      setCurrentRoute('/login');
    } else if (isAuthenticated) {
      if (!hasCompletedOnboarding && (PROTECTED_ROUTES.includes(currentRoute) || currentRoute === '/login')) {
        // Direct to profile creation onboarding
        window.history.replaceState({}, '', '/onboarding');
        setCurrentRoute('/onboarding');
      } else if (hasCompletedOnboarding && currentRoute === '/login') {
        window.history.replaceState({}, '', '/dashboard');
        setCurrentRoute('/dashboard');
      }
    }
  }, [isAuthenticated, hasCompletedOnboarding, currentRoute]);

  const renderRoute = () => {
    // Immediate render guard to prevent flashing protected content
    if (!isAuthenticated && PROTECTED_ROUTES.includes(currentRoute)) {
      return <LoginPage onNavigate={navigate} />;
    }

    if (isAuthenticated && !hasCompletedOnboarding && (PROTECTED_ROUTES.includes(currentRoute) || currentRoute === '/login')) {
      return <OnboardingPage onNavigate={navigate} />;
    }

    if (isAuthenticated && hasCompletedOnboarding && currentRoute === '/login') {
      return (
        <AppLayout currentRoute="/dashboard" onNavigate={navigate}>
          <DashboardPage onNavigate={navigate} />
        </AppLayout>
      );
    }

    switch (currentRoute) {
      case '/':
        return <LandingPage onNavigate={navigate} />;
      case '/login':
        return <LoginPage onNavigate={navigate} />;
      case '/onboarding':
        return <OnboardingPage onNavigate={navigate} />;
      case '/skill-gap':
        return (
          <AppLayout currentRoute={currentRoute} onNavigate={navigate}>
            <SkillGapPage onNavigate={navigate} />
          </AppLayout>
        );
      case '/roadmap':
        return (
          <AppLayout currentRoute={currentRoute} onNavigate={navigate}>
            <RoadmapPage onNavigate={navigate} />
          </AppLayout>
        );
      case '/dashboard':
        return (
          <AppLayout currentRoute={currentRoute} onNavigate={navigate}>
            <DashboardPage onNavigate={navigate} />
          </AppLayout>
        );
      case '/ai':
        return (
          <AppLayout currentRoute={currentRoute} onNavigate={navigate}>
            <AIAssistantPage onNavigate={navigate} />
          </AppLayout>
        );
      case '/profile':
        return (
          <AppLayout currentRoute={currentRoute} onNavigate={navigate}>
            <ProfilePage onNavigate={navigate} />
          </AppLayout>
        );
      case '/projects':
        return (
          <AppLayout currentRoute={currentRoute} onNavigate={navigate}>
            <ProjectsPage onNavigate={navigate} />
          </AppLayout>
        );
      case '/settings':
        return (
          <AppLayout currentRoute={currentRoute} onNavigate={navigate}>
            <SettingsPage onNavigate={navigate} />
          </AppLayout>
        );
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-[#F2F3F5]">
      {renderRoute()}
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CareerProvider>
      <AppContent />
    </CareerProvider>
  );
};

export default App;
