import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'surface' | 'secondary' | 'hoverable';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'surface',
  padding = 'md',
  glow = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-xl border transition-all duration-200';

  const variantStyles = {
    surface: 'bg-[#101217] border-[#242832]',
    secondary: 'bg-[#13151B] border-[#1B1E25]',
    hoverable:
      'bg-[#101217] border-[#242832] hover:border-[#7C5CFF]/35 hover:bg-[#171A21] hover:shadow-[0_8px_30px_rgba(0,0,0,0.30)]',
  };

  const paddingStyles = {
    none: '',
    sm: 'p-3.5',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const glowStyle = glow
    ? 'ring-1 ring-[#7C5CFF]/25 shadow-[0_8px_30px_rgba(0,0,0,0.25),0_0_24px_rgba(124,92,255,0.08)]'
    : 'shadow-[0_4px_20px_rgba(0,0,0,0.20)]';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${glowStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
