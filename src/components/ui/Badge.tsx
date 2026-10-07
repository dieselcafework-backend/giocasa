import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'terracotta' | 'gold' | 'olive' | 'dark' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'outline',
  size = 'sm',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 uppercase tracking-widest font-semibold',
    md: 'text-xs px-3.5 py-1 uppercase tracking-widest font-semibold',
  };

  const variantStyles = {
    terracotta: 'bg-brand-terracotta/15 text-brand-terracotta border border-brand-terracotta/30',
    gold: 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30',
    olive: 'bg-brand-olive/20 text-brand-oliveLight border border-brand-olive/40',
    dark: 'bg-brand-surfaceElevated text-brand-cream/80 border border-brand-border',
    outline: 'border border-brand-border text-brand-subtle bg-brand-surface/40',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
