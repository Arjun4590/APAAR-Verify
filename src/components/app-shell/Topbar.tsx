import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import { DemoRole } from '../../types';
import {
  ShieldCheck,
  Bell,
  RefreshCw,
  ChevronDown,
  Building2,
  GraduationCap,
  Briefcase,
  UserCheck,
  Sparkles,
  ExternalLink,
  Check
} from 'lucide-react';
import { NotificationPanel } from './NotificationPanel';

export const Topbar: React.FC = () => {
  const {
    currentRole,
    setRole,
    academicYear,
    setAcademicYear,
    notifications,
    resetDemoData
  } = useDemoSession();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleLabels: Record<DemoRole, { label: string; portal: string; icon: any; color: string }> = {
    admin: {
      label: 'AICTE Officer',
      portal: 'AICTE Administration Portal',
      icon: ShieldCheck,
      color: 'bg-indigo-900 text-white'
    },
    institution_admin: {
      label: 'Institution Administrator',
      portal: 'Institution Portal (Western Institute of Technology)',
      icon: Building2,
      color: 'bg-blue-800 text-white'
    },
    institution_operator: {
      label: 'Institution Data Operator',
      portal: 'Institution Portal (Western Institute of Technology)',
      icon: Building2,
      color: 'bg-blue-700 text-white'
    },
    student: {
      label: 'Aarav Sharma (Student)',
      portal: 'Student Portal',
      icon: GraduationCap,
      color: 'bg-teal-800 text-white'
    },
    stakeholder: {
      label: 'Background Verifier (TCS)',
      portal: 'Stakeholder Verification Portal',
      icon: Briefcase,
      color: 'bg-slate-800 text-white'
    }
  };

  const currentRoleMeta = roleLabels[currentRole];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* Statutory Status Banner */}
      <div className="bg-slate-900 text-slate-200 text-[11px] px-4 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-teal-400" />
          <span className="font-semibold tracking-wide text-white">AICTE CENTRAL STUDENT VERIFICATION PLATFORM</span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">
            SIH 2026 Problem Statement 263 · Statutory Regulatory Ingestion & Exception Engine
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm('Reset application data and staged records back to initial state?')) {
                resetDemoData();
              }
            }}
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors underline-offset-2 hover:underline text-[11px]"
            title="Reset application data to initial state"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 lg:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Brand & Portal Name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-900 tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <span className="font-extrabold text-blue-950">APAAR</span>
              <span className="text-blue-600 font-medium">-Verify</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
              {currentRoleMeta.portal}
            </span>
          </div>
        </div>

        {/* Right: Academic Year, Notifications & Role Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Academic Year Selector */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-md">
            <span className="font-medium text-slate-500">AY:</span>
            <select
              value={academicYear}
              onChange={e => setAcademicYear(e.target.value)}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="2026-27">2026-27</option>
              <option value="2025-26">2025-26</option>
              <option value="2024-25">2024-25</option>
            </select>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white" />
              )}
            </button>
            {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
          </div>

          {/* User Portal Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg transition-colors text-xs font-semibold text-slate-800"
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center ${currentRoleMeta.color}`}>
                <currentRoleMeta.icon className="w-3.5 h-3.5" />
              </div>
              <div className="text-left hidden md:block">
                <span className="block leading-tight text-slate-900">{currentRoleMeta.label}</span>
                <span className="text-[10px] text-slate-500 font-normal">Switch Portal</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {roleMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setRoleMenuOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Switch Portal & Role</p>
                  <p className="text-[11px] text-slate-500">View platform from different stakeholder perspectives</p>
                </div>

                {(Object.keys(roleLabels) as DemoRole[]).map(r => {
                  const meta = roleLabels[r];
                  const isSelected = currentRole === r;
                  return (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`w-full px-3 py-2 text-left flex items-center gap-3 transition-colors ${
                        isSelected ? 'bg-blue-50 text-blue-900 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${meta.color}`}>
                        <meta.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{meta.label}</p>
                        <p className="text-[10px] text-slate-500 truncate">{meta.portal}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

