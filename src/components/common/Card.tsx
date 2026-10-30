import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`bg-white border border-slate-200/80 rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}> = ({ children, className = '', action }) => {
  return (
    <div className={`px-5 py-4 border-b border-slate-100 flex items-center justify-between ${className}`}>
      <div className="space-y-0.5">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <h3 className={`text-base font-semibold text-slate-900 ${className}`}>
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <p className={`text-xs text-slate-500 ${className}`}>
      {children}
    </p>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`p-5 ${className}`}>
      {children}
    </div>
  );
};

