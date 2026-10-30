import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'amber' | 'red' | 'blue' | 'slate' | 'indigo' | 'outline';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  className = '',
  size = 'md'
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  const variantClasses = {
    teal: 'bg-teal-50 text-teal-800 border-teal-200/80',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/80',
    red: 'bg-red-50 text-red-800 border-red-200/80',
    blue: 'bg-blue-50 text-blue-800 border-blue-200/80',
    indigo: 'bg-indigo-50 text-indigo-800 border-indigo-200/80',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    outline: 'bg-white text-slate-700 border-slate-300'
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-md ${variantClasses} ${sizeClasses} ${className}`}
    >
      {children}
    </span>
  );
};

