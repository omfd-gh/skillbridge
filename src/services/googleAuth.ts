import type { GoogleUser } from '../types';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string; select_by?: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            context?: string;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type?: 'standard' | 'icon';
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              logo_alignment?: 'left' | 'center';
              width?: number | string;
              locale?: string;
            }
          ) => void;
          prompt: (notification?: (notification: any) => void) => void;
          cancel: () => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

/**
 * Safely decodes a Google JWT credential (base64url) on the client.
 */
export function decodeGoogleCredential(credential: string): GoogleUser | null {
  try {
    if (!credential || typeof credential !== 'string') return null;
    const parts = credential.split('.');
    if (parts.length < 2) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const payload = JSON.parse(jsonPayload);
    if (!payload || !payload.sub || !payload.email) {
      console.warn('[SkillBridge Google Auth] Incomplete credential payload:', payload);
      return null;
    }

    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name || payload.email.split('@')[0],
      picture: payload.picture || '',
      given_name: payload.given_name,
      family_name: payload.family_name,
      email_verified: payload.email_verified,
    };
  } catch (err) {
    console.error('[SkillBridge Google Auth] Error decoding credential:', err);
    return null;
  }
}

/**
 * Gets the configured Google Client ID from Vite environment variables.
 */
export function getGoogleClientId(): string {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return typeof clientId === 'string' ? clientId.trim() : '';
}

/**
 * Checks whether a non-empty Google Client ID is configured.
 */
export function isGoogleClientIdConfigured(): boolean {
  const clientId = getGoogleClientId();
  return Boolean(clientId && clientId.length > 5 && clientId !== 'your_google_client_id_here');
}
