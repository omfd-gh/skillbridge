import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080B] active:scale-[0.98] select-none';

  const variantStyles = {
    primary:
      'bg-[#7C5CFF] text-[#F2F3F5] hover:bg-[#8B6CFF] shadow-[0_4px_20px_rgba(124,92,255,0.22)] border border-[#7C5CFF]/50',
    secondary:
      'bg-[#13151B] text-[#F2F3F5] hover:bg-[#171A21] border border-[#242832] hover:border-[#7C5CFF]/30',
    outline:
      'bg-transparent text-[#F2F3F5] border border-[#242832] hover:bg-[#101217] hover:border-[#7C5CFF]/50 hover:text-[#8B6CFF]',
    ghost:
      'bg-transparent text-[#949BAD] hover:text-[#F2F3F5] hover:bg-[#13151B]',
    success:
      'bg-[#27D6A0] text-[#07080B] font-semibold hover:bg-[#22C290] shadow-[0_2px_12px_rgba(39,214,160,0.2)]',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 h-8 gap-1.5',
    md: 'text-sm px-4 h-10 gap-2',
    lg: 'text-base px-6 h-12 gap-2.5 font-semibold',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};
