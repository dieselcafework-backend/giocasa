import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'glass';
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
  iconPosition = 'right',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5 min-h-[38px]',
    md: 'text-sm px-6 py-3 gap-2 min-h-[46px]',
    lg: 'text-base px-8 py-4 gap-2.5 min-h-[54px] uppercase tracking-wider',
  };

  const variantStyles = {
    primary: 'bg-brand-terracotta text-brand-cream hover:bg-brand-terracottaHover shadow-luxury-ember hover:shadow-glow-subtle hover:-translate-y-0.5',
    secondary: 'bg-brand-cream text-brand-dark hover:bg-brand-creamMuted hover:shadow-luxury hover:-translate-y-0.5 font-semibold',
    outline: 'border border-brand-cream/30 text-brand-cream hover:border-brand-terracotta hover:text-brand-terracotta hover:bg-brand-terracotta/5',
    ghost: 'text-brand-cream/80 hover:text-brand-cream hover:bg-brand-cream/5',
    gold: 'bg-brand-gold text-brand-dark hover:bg-[#D4AF37] font-semibold shadow-luxury-gold hover:-translate-y-0.5',
    glass: 'bg-brand-surface/70 backdrop-blur-md border border-brand-border text-brand-cream hover:bg-brand-surfaceElevated hover:border-brand-borderStrong'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      
      {!isLoading && icon && iconPosition === 'left' && (
        <span className="transition-transform duration-200 group-hover:-translate-x-0.5">{icon}</span>
      )}
      
      <span>{children}</span>
      
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>
      )}
    </motion.button>
  );
};
