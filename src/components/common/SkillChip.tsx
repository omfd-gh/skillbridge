import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, X } from 'lucide-react';
import { SkillStatus } from '../../types';

interface SkillChipProps {
  name: string;
  status?: SkillStatus;
  proficiency?: number;
  isSelected?: boolean;
  isSelectable?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
  showProficiency?: boolean;
  className?: string;
}

export const SkillChip: React.FC<SkillChipProps> = ({
  name,
  status,
  proficiency,
  isSelected = false,
  isSelectable = false,
  onToggle,
  onRemove,
  showProficiency = false,
  className = '',
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'strong':
        return {
          bg: 'bg-[#27D6A0]/10 border-[#27D6A0]/30 text-[#F2F3F5] hover:border-[#27D6A0]/60',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#27D6A0] flex-shrink-0" />,
          dot: 'bg-[#27D6A0]',
          label: 'Strong',
        };
      case 'developing':
        return {
          bg: 'bg-[#EAB04B]/10 border-[#EAB04B]/30 text-[#F2F3F5] hover:border-[#EAB04B]/60',
          icon: <Clock className="w-3.5 h-3.5 text-[#EAB04B] flex-shrink-0" />,
          dot: 'bg-[#EAB04B]',
          label: 'Developing',
        };
      case 'gap':
        return {
          bg: 'bg-[#7C5CFF]/10 border-[#7C5CFF]/35 text-[#F2F3F5] hover:border-[#7C5CFF]/70',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-[#8B6CFF] flex-shrink-0" />,
          dot: 'bg-[#7C5CFF]',
          label: 'Needs Attention',
        };
      default:
        return {
          bg: isSelected
            ? 'bg-[#7C5CFF]/15 border-[#7C5CFF]/60 text-[#F2F3F5] shadow-[0_0_12px_rgba(124,92,255,0.15)]'
            : 'bg-[#13151B] border-[#242832] text-[#949BAD] hover:text-[#F2F3F5] hover:border-[#7C5CFF]/30',
          icon: null,
          dot: isSelected ? 'bg-[#7C5CFF]' : 'bg-[#1B1E25]',
          label: '',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div
      onClick={isSelectable ? onToggle : undefined}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 ${
        config.bg
      } ${isSelectable ? 'cursor-pointer select-none active:scale-[0.98]' : ''} ${className}`}
    >
      {config.icon}
      <span>{name}</span>

      {showProficiency && proficiency !== undefined && (
        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-[#07080B] text-[#949BAD] font-mono border border-[#1B1E25] tabular-nums">
          {proficiency}%
        </span>
      )}

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 text-[#687083] hover:text-[#E15C62] p-0.5 rounded transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E15C62]"
          aria-label={`Remove ${name}`}
          title={`Remove ${name}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
