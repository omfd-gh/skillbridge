import React from 'react';
import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: React.ReactNode;
  iconBg?: string;
  trend?: {
    text: string;
    positive?: boolean;
  };
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon,
  iconBg = 'bg-[#7C5CFF]/10 text-[#8B6CFF]',
  trend,
  action,
  className = '',
}) => {
  return (
    <Card variant="surface" padding="md" className={`relative overflow-hidden group hover:border-[#7C5CFF]/30 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-medium text-[#687083] uppercase tracking-wider block mb-1">
            {label}
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-[#F2F3F5] tracking-tight">
            {value}
          </div>
          {subtext && (
            <p className="text-xs text-[#949BAD] mt-1.5 flex items-center gap-1.5">
              {subtext}
            </p>
          )}
          {trend && (
            <div className="mt-2 inline-flex items-center text-xs font-medium text-[#27D6A0]">
              <span>{trend.text}</span>
            </div>
          )}
        </div>
        <div className={`p-2.5 rounded-lg border border-[#242832] ${iconBg}`}>
          {icon}
        </div>
      </div>

      {action && (
        <div className="mt-4 pt-3 border-t border-[#1B1E25] flex items-center justify-between">
          <button
            onClick={action.onClick}
            className="text-xs font-medium text-[#8B6CFF] hover:text-[#A38BFF] transition-colors flex items-center gap-1"
          >
            {action.label} →
          </button>
        </div>
      )}
    </Card>
  );
};
