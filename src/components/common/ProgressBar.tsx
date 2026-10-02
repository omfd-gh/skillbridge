import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  subLabel?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'accent' | 'success' | 'warning' | 'gradient';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  subLabel,
  showPercentage = true,
  size = 'md',
  variant = 'gradient',
  className = '',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantBarStyles = {
    accent: 'bg-[#7C5CFF]',
    success: 'bg-[#27D6A0]',
    warning: 'bg-[#EAB04B]',
    gradient: 'bg-gradient-to-r from-[#7C5CFF] via-[#8B6CFF] to-[#27D6A0]',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5 text-xs">
          <div className="flex items-center gap-2">
            {label && <span className="font-medium text-[#F2F3F5]">{label}</span>}
            {subLabel && <span className="text-[#949BAD]">{subLabel}</span>}
          </div>
          {showPercentage && (
            <span className="font-semibold text-[#F2F3F5] tabular-nums">{clampedProgress}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-[#0A0B0F] border border-[#1B1E25] rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`${sizeStyles[size]} rounded-full transition-all duration-500 ease-out ${variantBarStyles[variant]}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
