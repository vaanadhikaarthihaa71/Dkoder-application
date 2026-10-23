import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}, ref) => {
  const baseStyles = 'group relative inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.96] active:translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8.5',
    md: 'text-sm px-4.5 py-2 gap-2 h-10',
    lg: 'text-sm sm:text-base px-6 py-2.5 gap-2.5 h-12',
  };

  const variantStyles = {
    // Primary Yellow with moving sheen reflection on hover & soft glow
    primary: 'bg-[#FFD84D] text-[#211B2B] hover:bg-[#F2C836] focus:ring-[#FFD84D] shadow-sm hover:shadow-md hover:-translate-y-0.5 btn-sheen border border-[#FFD84D]',
    // Deep Purple with white text & purple glow
    secondary: 'bg-[#5425A8] text-white hover:bg-[#461C8E] focus:ring-[#5425A8] shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-[#5425A8]',
    // Clean outline with subtle lavender hover
    outline: 'border border-[#E8E2EF] text-[#211B2B] bg-white hover:bg-[#F3EDFF] hover:border-[#5425A8]/50 hover:text-[#5425A8] focus:ring-[#5425A8] shadow-2xs hover:-translate-y-0.5',
    // Ghost
    ghost: 'text-[#211B2B] hover:bg-[#F3EDFF] hover:text-[#5425A8] focus:ring-[#5425A8] bg-transparent',
    // Danger
    danger: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm hover:-translate-y-0.5',
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : leftIcon ? (
        <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">{leftIcon}</span>
      ) : null}
      
      <span className="relative z-10">{children}</span>
      
      {rightIcon && !isLoading && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">
          {rightIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
