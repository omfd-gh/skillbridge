import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'success' | 'warning' | 'neutral' | 'outline' | 'error';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide';

  const variantStyles = {
    accent: 'bg-[#7C5CFF]/10 text-[#8B6CFF] border border-[#7C5CFF]/25',
    success: 'bg-[#27D6A0]/10 text-[#27D6A0] border border-[#27D6A0]/25',
    warning: 'bg-[#EAB04B]/10 text-[#EAB04B] border border-[#EAB04B]/25',
    error: 'bg-[#E15C62]/10 text-[#E15C62] border border-[#E15C62]/25',
    neutral: 'bg-[#13151B] text-[#949BAD] border border-[#242832]',
    outline: 'bg-transparent text-[#F2F3F5] border border-[#242832]',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
