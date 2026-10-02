import type { SkillBridgeUserContext } from '../types';

export interface ChatApiMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface ChatApiResponse {
  success: boolean;
  message: string;
  contextTag?: string;
  suggestedActions?: {
    label: string;
    actionType: 'navigate' | 'filter' | 'prompt';
    payload: string;
  }[];
  isError?: boolean;
}

export interface AIStatusResponse {
  configured: boolean;
  provider: 'gemini' | 'none';
  model: string;
}

export async function checkAIStatus(): Promise<AIStatusResponse> {
  try {
    const res = await fetch('/api/ai/status');
    if (!res.ok) {
      return { configured: false, provider: 'gemini', model: 'gemini-3.5-flash-lite' };
    }
    const data = await res.json();
    return data;
  } catch {
    return { configured: false, provider: 'gemini', model: 'gemini-3.5-flash-lite' };
  }
}

export async function sendChatMessageToBackend(
  message: string,
  conversation: ChatApiMessage[],
  context: SkillBridgeUserContext
): Promise<ChatApiResponse> {
  if (!message || message.trim().length === 0) {
    return {
      success: false,
      message: 'Please enter a message before sending.',
      isError: true,
    };
  }

  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message.trim(),
        conversation,
        context,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Backend returned an error response (e.g. 503 missing key, 502 OpenAI failure, 429 quota)
      const errorMsg = data?.error || "SkillBridge AI couldn't respond right now. Please try again.";
      return {
        success: false,
        message: errorMsg,
        contextTag: 'System Alert',
        isError: true,
      };
    }

    return {
      success: true,
      message: data.message,
      contextTag: data.contextTag,
      suggestedActions: data.suggestedActions,
      isError: false,
    };
  } catch (error: any) {
    console.error('[SkillBridge Chat API Network Error]:', error);
    return {
      success: false,
      message: 'Connection failed. Check your connection and try again.',
      contextTag: 'Network Error',
      isError: true,
    };
  }
}
