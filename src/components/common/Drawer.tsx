import React from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: 'md' | 'lg' | 'xl' | '2xl';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'xl'
}) => {
  if (!isOpen) return null;

  const widthClasses = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  }[width];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 flex pl-10 max-w-full">
        <div className={`w-screen ${widthClasses} bg-white shadow-2xl border-l border-slate-200 flex flex-col`}>
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div>
              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

