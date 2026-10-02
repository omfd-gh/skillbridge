import React, { useState, useEffect, useRef } from 'react';
import { Compass, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { useCareer } from '../context/CareerContext';
import { getGoogleClientId, isGoogleClientIdConfigured } from '../services/googleAuth';

interface LoginPageProps {
  onNavigate: (route: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { loginWithGoogle, isAuthenticated, hasCompletedOnboarding, showToast } = useCareer();
  const [isInitializing, setIsInitializing] = useState(true);
  const [gisLoaded, setGisLoaded] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const googleBtnContainerRef = useRef<HTMLDivElement>(null);

  const clientId = getGoogleClientId();
  const isClientIdConfigured = isGoogleClientIdConfigured();

  // If already authenticated, redirect appropriately
  useEffect(() => {
    if (isAuthenticated) {
      if (hasCompletedOnboarding) {
        onNavigate('/dashboard');
      } else {
        onNavigate('/onboarding');
      }
    }
  }, [isAuthenticated, hasCompletedOnboarding, onNavigate]);

  // Initialize Google Identity Services
  useEffect(() => {
    let checkInterval: any;
    let attempts = 0;

    const setupGis = () => {
      if (!isClientIdConfigured) {
        setIsInitializing(false);
        return;
      }

      if (window.google?.accounts?.id) {
        setGisLoaded(true);
        setIsInitializing(false);

        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response: { credential: string }) => {
              if (response?.credential) {
                setAuthError(null);
                const ok = loginWithGoogle(response.credential);
                if (ok) {
                  // Direct to onboarding if profile needs creation, or dashboard if already created
                  const sub = response.credential ? (JSON.parse(atob(response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).sub) : null;
                  const saved = sub ? localStorage.getItem(`skillbridge_app_state_v2_user_${sub}`) : null;
                  const onboarded = saved ? Boolean(JSON.parse(saved).hasCompletedOnboarding && JSON.parse(saved).targetCareer) : false;
                  
                  if (onboarded) {
                    onNavigate('/dashboard');
                  } else {
                    onNavigate('/onboarding');
                  }
                } else {
                  setAuthError('Failed to parse Google credentials. Please try again.');
                }
              } else {
                setAuthError('No credential received from Google.');
              }
            },
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          if (googleBtnContainerRef.current) {
            googleBtnContainerRef.current.innerHTML = '';
            window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
              type: 'standard',
              theme: 'filled_black',
              size: 'large',
              text: 'continue_with',
              shape: 'rectangular',
              width: 360,
              logo_alignment: 'left',
            });
          }
        } catch (err: any) {
          console.error('[SkillBridge GIS init error]:', err);
          setAuthError('Failed to initialize Google Sign-In.');
        }
      } else {
        attempts++;
        if (attempts > 30) {
          setIsInitializing(false);
          if (checkInterval) clearInterval(checkInterval);
        }
      }
    };

    if (window.google?.accounts?.id) {
      setupGis();
    } else {
      checkInterval = setInterval(() => {
        if (window.google?.accounts?.id || !isClientIdConfigured) {
          clearInterval(checkInterval);
          setupGis();
        }
      }, 150);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [clientId, isClientIdConfigured, loginWithGoogle, onNavigate]);

  const handleManualGooglePrompt = () => {
    if (!isClientIdConfigured) {
      showToast('Please set VITE_GOOGLE_CLIENT_ID in your .env file.', 'warning');
      return;
    }
    if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed?.() || notification.isSkippedMoment?.()) {
            console.log('Google prompt not displayed / skipped');
          }
        });
      } catch (e) {
        console.warn('Error invoking GIS prompt', e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-[#F2F3F5] flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[340px] bg-[radial-gradient(circle,rgba(124,92,255,0.07)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <div
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C5CFF] to-[#8B6CFF] flex items-center justify-center shadow-[0_0_15px_rgba(124,92,255,0.25)]">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base text-[#F2F3F5]">
            Skill<span className="text-[#8B6CFF]">Bridge</span>
          </span>
        </div>

        <button
          onClick={() => onNavigate('/')}
          className="text-xs text-[#949BAD] hover:text-[#F2F3F5] transition-colors"
        >
          Back to home
        </button>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full mx-auto my-12 z-10">
        <Card variant="surface" padding="lg" className="border-[#242832] shadow-[0_12px_40px_rgba(0,0,0,0.4)] relative">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#7C5CFF]/10 border border-[#7C5CFF]/25 flex items-center justify-center mx-auto mb-3 text-[#8B6CFF]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-[#F2F3F5] tracking-tight">
              Welcome to SkillBridge
            </h1>
            <p className="text-xs sm:text-sm text-[#949BAD] mt-1.5">
              Sign in with your Google account to access your personalized career roadmap.
            </p>
          </div>

          {authError && (
            <div className="mb-5 p-3 rounded-xl bg-[#181317] border border-[#E15C62]/50 text-[#E15C62] text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Real Google Authentication Container */}
          <div className="space-y-4">
            {isClientIdConfigured ? (
              <div className="flex flex-col items-center justify-center space-y-3">
                {/* Official Google Identity Services rendered button */}
                <div
                  ref={googleBtnContainerRef}
                  className="w-full flex justify-center min-h-[44px] overflow-hidden rounded-lg"
                />

                {/* Prompt trigger if button element is loading */}
                {isInitializing && (
                  <div className="text-xs text-[#687083] animate-pulse">
                    Connecting to Google Identity Services...
                  </div>
                )}

                <div className="flex items-center gap-2 text-[11px] text-[#687083] mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#27D6A0]" />
                  <span>Verified Google OAuth 2.0 Identity Protocol</span>
                </div>
              </div>
            ) : (
              /* Missing VITE_GOOGLE_CLIENT_ID Guidance Box */
              <div className="p-4 rounded-xl bg-[#13151B] border border-[#EAB04B]/30 text-left space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#EAB04B]">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>Google Client ID Setup Required</span>
                </div>
                <p className="text-xs text-[#949BAD] leading-relaxed">
                  Real Google Sign-In is active, but <code className="text-[#F2F3F5] bg-[#0A0B0F] px-1.5 py-0.5 rounded text-[11px] border border-[#242832]">VITE_GOOGLE_CLIENT_ID</code> is missing in your <code className="text-[#F2F3F5] bg-[#0A0B0F] px-1.5 py-0.5 rounded text-[11px] border border-[#242832]">.env</code> file.
                </p>
                <div className="p-3 bg-[#0A0B0F] rounded-lg border border-[#1B1E25] text-[11px] text-[#949BAD] space-y-1.5">
                  <div className="font-semibold text-[#F2F3F5]">Quick Setup:</div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-[#8B6CFF]">1.</span>
                    <span>Create a Web Client ID in Google Cloud Console.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-[#8B6CFF]">2.</span>
                    <span>Add <code className="text-[#F2F3F5]">http://localhost:5173</code> to Authorized JavaScript origins.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-[#8B6CFF]">3.</span>
                    <span>Add <code className="text-[#8B6CFF]">VITE_GOOGLE_CLIENT_ID=&lt;your_id&gt;</code> to your root <code className="text-[#F2F3F5]">.env</code> file.</span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full text-xs border-[#242832] text-[#949BAD]"
                  onClick={handleManualGooglePrompt}
                >
                  Check Google Configuration
                </Button>
              </div>
            )}
          </div>

          {/* New User link */}
          <div className="mt-8 pt-5 border-t border-[#1B1E25] text-center text-xs text-[#949BAD]">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('/onboarding')}
              className="text-[#8B6CFF] hover:underline font-semibold"
            >
              Start onboarding →
            </button>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-[#687083] py-4">
        Protected by SkillBridge Auth • Privacy Policy • Terms of Service
      </div>
    </div>
  );
};
