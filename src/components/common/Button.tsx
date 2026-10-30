import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs font-medium rounded',
    md: 'px-3.5 py-2 text-sm font-medium rounded-md',
    lg: 'px-4 py-2.5 text-base font-medium rounded-md'
  }[size];

  const variantClasses = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm active:bg-slate-950 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm active:bg-blue-800 disabled:bg-blue-300',
    outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 disabled:border-slate-200 disabled:text-slate-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm active:bg-red-800 disabled:bg-red-300',
    success: 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm active:bg-teal-800 disabled:bg-teal-300',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:text-slate-300'
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

