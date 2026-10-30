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
    resetDemoData,
    activeScenario,
    loadScenario
  } = useDemoSession();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [scenarioMenuOpen, setScenarioMenuOpen] = useState(false);
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
      label: 'Institution Admin (WIT)',
      portal: 'Institution Portal',
      icon: Building2,
      color: 'bg-blue-800 text-white'
    },
    institution_operator: {
      label: 'Institution Data Operator',
      portal: 'Institution Portal',
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
      label: 'TCS Background Verifier',
      portal: 'Stakeholder Verification Portal',
      icon: Briefcase,
      color: 'bg-slate-800 text-white'
    }
  };

  const currentRoleMeta = roleLabels[currentRole];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* Persistent Synthetic Notice Banner */}
      <div className="bg-slate-900 text-slate-200 text-[11px] px-4 py-1 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="font-semibold tracking-wide text-white">DEMO DATA · SYNTHETIC RECORDS</span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">
            SIH 2026 Problem Statement 263 · Simulated Government Connectors (No Live DB/Auth)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm('Reset all demo state, scenarios and staged batches back to original synthetic seed?')) {
                resetDemoData();
              }
            }}
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors underline-offset-2 hover:underline text-[11px]"
            title="Reset demo data to initial state"
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

        {/* Center: Quick Scenario Switcher */}
        <div className="hidden xl:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <span className="px-2 py-1 text-slate-500 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Demo Scenarios:
          </span>
          <button
            onClick={() => loadScenario('A')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeScenario === 'A' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Scenario A: Fix Before Submit (11-digit APAAR, duplicate, TFW cap)"
          >
            Scenario A (Fix-Submit)
          </button>
          <button
            onClick={() => loadScenario('B')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeScenario === 'B' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Scenario B: Exact APAAR Match across Physical + Online"
          >
            Scenario B (Dual Mode)
          </button>
          <button
            onClick={() => loadScenario('C')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeScenario === 'C' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Scenario C: Fuzzy Identity Candidate with Overlapping Shift Timing"
          >
            Scenario C (Fuzzy Match)
          </button>
          <button
            onClick={() => loadScenario('D')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeScenario === 'D' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Scenario D: Institutional Anomaly (Fill-Rate Cliff)"
          >
            Scenario D (Anomaly)
          </button>
          <button
            onClick={() => loadScenario('E')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeScenario === 'E' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Scenario E: Legitimate Lateral Entry"
          >
            Scenario E (Lateral)
          </button>
          <button
            onClick={() => loadScenario('F')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeScenario === 'F' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Scenario F: Student Consent & Stakeholder Verification"
          >
            Scenario F (Consent)
          </button>
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

          {/* Demo Role Switcher Dropdown */}
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
                <span className="text-[10px] text-slate-500 font-normal">Switch Demo Role</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {roleMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setRoleMenuOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Demo Role Switcher</p>
                  <p className="text-[11px] text-slate-500">Switches portal view & permissions locally</p>
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

