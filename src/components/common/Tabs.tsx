import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  badgeVariant?: 'red' | 'amber' | 'teal' | 'slate';
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = ''
}) => {
  return (
    <div className={`border-b border-slate-200 flex gap-2 overflow-x-auto ${className}`}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              isActive
                ? 'border-blue-600 text-blue-700 bg-blue-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  isActive
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

