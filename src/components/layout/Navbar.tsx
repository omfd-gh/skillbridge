import React, { useState } from 'react';
import { Menu, X, ArrowRight, Compass } from 'lucide-react';
import { Button } from '../common/Button';
import { useCareer } from '../../context/CareerContext';

interface NavbarProps {
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#07080B]/90 backdrop-blur-md border-b border-[#1B1E25]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#7C5CFF] to-[#8B6CFF] flex items-center justify-center shadow-[0_0_15px_rgba(124,92,255,0.3)] group-hover:shadow-[0_0_20px_rgba(124,92,255,0.5)] transition-all">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#F2F3F5] group-hover:text-white transition-colors">
                Skill<span className="text-[#8B6CFF]">Bridge</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#949BAD]">
            <a
              href="#how-it-works"
              onClick={(e) => scrollToSection(e, 'how-it-works')}
              className="hover:text-[#F2F3F5] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={(e) => scrollToSection(e, 'features')}
              className="hover:text-[#F2F3F5] transition-colors"
            >
              Features
            </a>
            <a
              href="#roadmap-preview"
              onClick={(e) => scrollToSection(e, 'roadmap-preview')}
              className="hover:text-[#F2F3F5] transition-colors"
            >
              Roadmap Preview
            </a>
            <a
              href="#problem"
              onClick={(e) => scrollToSection(e, 'problem')}
              className="hover:text-[#F2F3F5] transition-colors"
            >
              Why SkillBridge
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(isAuthenticated ? '/dashboard' : '/login')}
            >
              {isAuthenticated ? 'Dashboard' : 'Sign In'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#949BAD] hover:text-[#F2F3F5] p-2 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1B1E25] bg-[#090A0D] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          <a
            href="#how-it-works"
            onClick={(e) => scrollToSection(e, 'how-it-works')}
            className="block text-sm font-medium text-[#949BAD] hover:text-[#F2F3F5] py-2"
          >
            How It Works
          </a>
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, 'features')}
            className="block text-sm font-medium text-[#949BAD] hover:text-[#F2F3F5] py-2"
          >
            Features
          </a>
          <a
            href="#roadmap-preview"
            onClick={(e) => scrollToSection(e, 'roadmap-preview')}
            className="block text-sm font-medium text-[#949BAD] hover:text-[#F2F3F5] py-2"
          >
            Roadmap Preview
          </a>
          <a
            href="#problem"
            onClick={(e) => scrollToSection(e, 'problem')}
            className="block text-sm font-medium text-[#949BAD] hover:text-[#F2F3F5] py-2"
          >
            Why SkillBridge
          </a>
          <div className="pt-3 border-t border-[#1B1E25] flex flex-col gap-2">
            <Button
              variant="outline"
              size="md"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(isAuthenticated ? '/dashboard' : '/login');
              }}
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Sign In'}
            </Button>
            <Button
              variant="primary"
              size="md"
              className="w-full"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={() => {
                setMobileMenuOpen(false);
                handleGetStarted();
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
