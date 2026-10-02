import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Target,
  ArrowRight,
  AlertTriangle,
  Zap,
  RotateCcw,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useCareer } from '../context/CareerContext';

interface AIAssistantPageProps {
  onNavigate: (route: string) => void;
}

const renderFormattedMessageText = (text: string) => {
  const paragraphs = text.split('\n\n');
  return paragraphs.map((para, pIdx) => {
    const lines = para.split('\n');
    return (
      <div key={pIdx} className="space-y-1">
        {lines.map((line, lIdx) => {
          const isBullet = line.startsWith('• ') || line.startsWith('* ') || line.startsWith('- ');
          const lineContent = isBullet ? line.replace(/^[•*-]\s*/, '') : line;

          const parts = lineContent.split(/(\*\*.*?\*\*)/g);
          const renderedParts = parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={partIdx} className="font-semibold text-[#F2F3F5]">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <React.Fragment key={partIdx}>{part}</React.Fragment>;
          });

          if (isBullet) {
            return (
              <div key={lIdx} className="flex items-start gap-2 ml-1">
                <span className="text-[#8B6CFF] mt-1 text-xs">•</span>
                <span className="flex-1">{renderedParts}</span>
              </div>
            );
          }
          return <p key={lIdx}>{renderedParts}</p>;
        })}
      </div>
    );
  });
};

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({ onNavigate }) => {
  const {
    user,
    chatMessages,
    isAITyping,
    isAIConfigured,
    aiProvider,
    sendChatMessage,
    clearChatHistory,
    roadmapStages,
  } = useCareer();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentStage = roadmapStages.find((s) => s.status === 'current') || roadmapStages[1];

  const suggestedPrompts = [
    'What should I learn next?',
    'Suggest a project for me',
    'Am I ready for an internship?',
    'Why do I need SQL?',
    'How should I structure my hours this week?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isAITyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  const handlePromptClick = (prompt: string) => {
    sendChatMessage(prompt);
  };

  const handleActionClick = (action: { label: string; actionType: string; payload: string }) => {
    if (action.actionType === 'navigate') {
      onNavigate(action.payload);
    } else if (action.actionType === 'prompt') {
      sendChatMessage(action.payload);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Title & Subtitle (Specified in #16) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1B1E25]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6CFF]">
              Personalized Career Intelligence
            </span>
            <Badge variant="accent" size="sm">
              Synced to Roadmap
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F2F3F5] tracking-tight">
            Ask SkillBridge AI
          </h1>
          <p className="text-xs sm:text-sm text-[#949BAD] mt-1">
            Get guidance based on your career roadmap.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isAIConfigured ? (
            <Badge variant="success" size="md" icon={<div className="w-2 h-2 rounded-full bg-[#27D6A0] animate-pulse" />}>
              Gemini AI Connected (Server-Side)
            </Badge>
          ) : (
            <Badge variant="neutral" size="md" icon={<div className="w-2 h-2 rounded-full bg-[#EAB04B]" />}>
              Offline Fallback • Context Synced
            </Badge>
          )}
        </div>
      </div>

      {/* Main Layout: Context Anchor Sidebar + Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Live Career Context Anchor */}
        <div className="lg:col-span-1 space-y-4">
          <div className="text-xs font-bold text-[#687083] uppercase tracking-wider">
            Live Career Parameters
          </div>

          <Card variant="surface" padding="md" className="border-[#242832] space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            <div>
              <span className="text-[11px] text-[#687083] uppercase font-semibold">
                Candidate Profile
              </span>
              <div className="text-sm font-bold text-[#F2F3F5] mt-0.5">
                {user.name}, {user.age}
              </div>
              <div className="text-xs text-[#949BAD]">{user.education}</div>
            </div>

            <div className="pt-3 border-t border-[#1B1E25]">
              <span className="text-[11px] text-[#687083] uppercase font-semibold">
                Target Role
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Target className="w-3.5 h-3.5 text-[#8B6CFF]" />
                <span className="text-sm font-bold text-[#F2F3F5]">{user.targetCareer}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1B1E25]">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#949BAD]">Readiness Score</span>
                <span className="font-bold text-[#27D6A0]">{user.readinessPercentage}%</span>
              </div>
              <div className="w-full bg-[#0A0B0F] h-1.5 rounded-full overflow-hidden border border-[#1B1E25]">
                <div
                  className="bg-gradient-to-r from-[#7C5CFF] to-[#27D6A0] h-full"
                  style={{ width: `${user.readinessPercentage}%` }}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#1B1E25]">
              <span className="text-[11px] text-[#687083] uppercase font-semibold">
                Current Focus
              </span>
              <div className="text-xs font-semibold text-[#F2F3F5] mt-0.5">
                Stage {currentStage.stepNumber}: {currentStage.title}
              </div>
              <p className="text-[11px] text-[#949BAD] mt-0.5">
                {currentStage.subtitle}
              </p>
            </div>

            <div className="pt-3 border-t border-[#1B1E25]">
              <span className="text-[11px] text-[#687083] uppercase font-semibold">
                Primary Bottleneck
              </span>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-[#8B6CFF] font-medium">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>SQL Queries & Multi-table JOINs</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1B1E25] flex items-center justify-between text-xs text-[#949BAD]">
              <span>Weekly Budget:</span>
              <span className="font-medium text-[#F2F3F5]">{user.weeklyHours}</span>
            </div>
          </Card>
        </div>

        {/* Right Column: AI Chat Panel */}
        <div className="lg:col-span-3 flex flex-col h-[650px] bg-[#101217] border border-[#242832] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.35)] relative">
          {/* Chat Header */}
          <div className="p-4 bg-[#13151B] border-b border-[#1B1E25] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 flex items-center justify-center text-[#8B6CFF]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#F2F3F5]">
                  SkillBridge Career Advisor
                </h3>
                <span className="text-[10px] text-[#27D6A0] flex items-center gap-1">
                  ● Grounded in {user.targetCareer} hiring criteria & your actual progress
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChatHistory}
                className="text-xs text-[#949BAD] hover:text-[#F2F3F5] px-2.5 py-1 rounded-md bg-[#101217] hover:bg-[#171A21] border border-[#242832] transition-colors flex items-center gap-1.5"
                title="Start a fresh conversation"
              >
                <RotateCcw className="w-3 h-3 text-[#949BAD]" />
                <span>Clear Chat</span>
              </button>
              <button
                onClick={() => onNavigate('/roadmap')}
                className="text-xs text-[#949BAD] hover:text-[#8B6CFF] flex items-center gap-1"
              >
                View Roadmap →
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
            {chatMessages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`flex items-start gap-3 max-w-[90%] sm:max-w-[80%] ${
                      isUser ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    {isUser ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-7 h-7 rounded-full border border-[#242832] flex-shrink-0 mt-0.5 object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#7C5CFF] to-[#8B6CFF] flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(124,92,255,0.3)]">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-[#7C5CFF] text-[#F2F3F5] rounded-tr-none shadow-[0_4px_20px_rgba(124,92,255,0.22)]'
                          : msg.isError
                          ? 'bg-[#181317] border border-[#E15C62]/50 text-[#F2F3F5] rounded-tl-none shadow-[0_4px_20px_rgba(225,92,98,0.12)]'
                          : 'bg-[#13151B] border border-[#242832] text-[#F2F3F5] rounded-tl-none shadow-[0_4px_20px_rgba(0,0,0,0.25)]'
                      }`}
                    >
                      {/* Context Tag if AI */}
                      {!isUser && msg.isError && (
                        <div className="mb-2 pb-1.5 border-b border-[#E15C62]/30 flex items-center gap-1.5 text-[10px] uppercase font-semibold text-[#E15C62] tracking-wider">
                          <AlertTriangle className="w-3.5 h-3.5 text-[#E15C62]" />
                          {msg.contextTag || 'Configuration Notice'}
                        </div>
                      )}

                      {!isUser && !msg.isError && msg.contextTag && (
                        <div className="mb-2 pb-1.5 border-b border-[#1B1E25] flex items-center gap-1.5 text-[10px] uppercase font-semibold text-[#8B6CFF] tracking-wider">
                          <Zap className="w-3 h-3 text-[#7C5CFF]" />
                          {msg.contextTag}
                        </div>
                      )}

                      <div className="space-y-2">
                        {renderFormattedMessageText(msg.text)}
                      </div>

                      {/* Suggested Action buttons inside AI response */}
                      {!isUser && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-[#1B1E25] flex flex-wrap gap-2">
                          {msg.suggestedActions.map((action, i) => (
                            <button
                              key={i}
                              onClick={() => handleActionClick(action)}
                              className="text-xs px-2.5 py-1 rounded-md bg-[#101217] hover:bg-[#171A21] text-[#8B6CFF] hover:text-white border border-[#7C5CFF]/30 hover:border-[#7C5CFF] transition-all flex items-center gap-1.5 font-medium"
                            >
                              <span>{action.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ))}
                        </div>
                      )}

                      <div
                        className={`text-[10px] mt-2 text-right ${
                          isUser ? 'text-[#F2F3F5]/70' : 'text-[#687083]'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* AI Typing Indicator */}
            {isAITyping && (
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 flex items-center justify-center text-[#8B6CFF] flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div className="bg-[#13151B] border border-[#242832] p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#7C5CFF] animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 rounded-full bg-[#7C5CFF] animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 rounded-full bg-[#7C5CFF] animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts Pill Bar */}
          <div className="px-4 py-2.5 bg-[#0A0B0F] border-t border-[#1B1E25] overflow-x-auto flex items-center gap-2 no-scrollbar">
            <span className="text-[11px] text-[#687083] font-semibold uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#8B6CFF]" />
              Prompts:
            </span>
            {suggestedPrompts.map((p) => (
              <button
                key={p}
                onClick={() => handlePromptClick(p)}
                className="text-xs px-3 py-1.5 rounded-full bg-[#13151B] hover:bg-[#171A21] text-[#949BAD] hover:text-[#F2F3F5] border border-[#242832] hover:border-[#7C5CFF]/60 hover:shadow-[0_0_12px_rgba(124,92,255,0.15)] transition-all flex-shrink-0 select-none cursor-pointer active:scale-95"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box Form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-[#101217] border-t border-[#1B1E25] flex items-center gap-2.5"
          >
            <input
              type="text"
              placeholder={`Ask SkillBridge AI about your ${user.targetCareer || 'career'} roadmap, SQL gaps, or projects...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-[#13151B] border border-[#242832] focus:border-[#7C5CFF] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#F2F3F5] placeholder-[#687083] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/60 transition-all"
            />
            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={!inputText.trim() || isAITyping}
              icon={<Send className="w-4 h-4" />}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
