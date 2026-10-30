import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral' | 'warning';
  icon?: React.ReactNode;
  alert?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  changeType = 'neutral',
  icon,
  alert = false
}) => {
  const changeColors = {
    positive: 'text-teal-600 bg-teal-50',
    negative: 'text-red-600 bg-red-50',
    warning: 'text-amber-600 bg-amber-50',
    neutral: 'text-slate-600 bg-slate-50'
  }[changeType];

  return (
    <div className={`p-4 bg-white border rounded-lg shadow-sm transition-all hover:border-slate-300 ${alert ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
        </div>
        {icon && (
          <div className="p-2 bg-slate-50 text-slate-600 rounded-md border border-slate-100">
            {icon}
          </div>
        )}
      </div>
      {(subtitle || change) && (
        <div className="mt-2.5 flex items-center gap-2 text-xs">
          {change && (
            <span className={`px-1.5 py-0.5 rounded font-medium ${changeColors}`}>
              {change}
            </span>
          )}
          {subtitle && <span className="text-slate-500">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};

