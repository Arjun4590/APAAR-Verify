import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  LayoutDashboard,
  Building2,
  Users,
  ShieldAlert,
  Sliders,
  FileText,
  History,
  Settings,
  Upload,
  CheckCircle,
  AlertTriangle,
  Send,
  BookOpen,
  QrCode,
  Lock,
  Layers,
  Search,
  CheckCheck,
  FileCheck2,
  Database
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentRole, findings } = useDemoSession();

  const openExceptionsCount = findings.filter(f => f.status !== 'Resolved').length;

  const getNavLinks = () => {
    switch (currentRole) {
      case 'admin':
        return [
          { to: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
          { to: '/admin/institutions', label: 'Institution Management', icon: Building2 },
          { to: '/admin/students', label: 'Student Repository', icon: Users },
          { to: '/admin/verification-centre', label: 'Verification Centre', icon: ShieldAlert },
          { to: '/admin/anomalies', label: 'Anomaly Monitoring', icon: AlertTriangle },
          { 
            to: '/admin/exceptions', 
            label: 'Exceptions & Reviews', 
            icon: CheckCheck, 
            badge: openExceptionsCount > 0 ? openExceptionsCount : undefined 
          },
          { to: '/admin/rules', label: 'Regulatory Rules', icon: Sliders },
          { to: '/admin/reports', label: 'Reports', icon: FileText },
          { to: '/admin/audit', label: 'Audit Trail', icon: History },
          { to: '/admin/settings', label: 'Settings', icon: Settings }
        ];

      case 'institution_admin':
      case 'institution_operator':
        return [
          { to: '/institution', label: 'Dashboard', icon: LayoutDashboard, exact: true },
          { to: '/institution/profile', label: 'Institution Profile', icon: Building2 },
          { to: '/institution/courses', label: 'Courses & Intake', icon: BookOpen },
          { to: '/institution/students', label: 'Student Records', icon: Users },
          { to: '/institution/upload', label: 'Bulk Upload Centre', icon: Upload },
          { to: '/institution/validation', label: 'Validation Centre', icon: CheckCircle },
          { to: '/institution/corrections', label: 'Corrections (Fix-Submit)', icon: Sliders },
          { to: '/institution/submissions', label: 'Submission History', icon: History },
          { to: '/institution/exceptions', label: 'Exception Responses', icon: Send },
          { to: '/institution/reports', label: 'Reports', icon: FileText },
          { to: '/institution/settings', label: 'Integration Settings', icon: Settings }
        ];

      case 'student':
        return [
          { to: '/student', label: 'My Dashboard', icon: LayoutDashboard, exact: true },
          { to: '/student/records', label: 'My Academic Records', icon: FileCheck2 },
          { to: '/student/correction', label: 'Data Correction Request', icon: Send },
          { to: '/student/consent', label: 'Consent & Sharing', icon: Lock },
          { to: '/student/history', label: 'Verification History', icon: History },
          { to: '/student/qr', label: 'QR Verification', icon: QrCode }
        ];

      case 'stakeholder':
        return [
          { to: '/stakeholder', label: 'Dashboard', icon: LayoutDashboard, exact: true },
          { to: '/stakeholder/new-request', label: 'New Verification Request', icon: Search },
          { to: '/stakeholder/results', label: 'Verification Results', icon: CheckCheck },
          { to: '/stakeholder/history', label: 'Request History', icon: History },
          { to: '/stakeholder/profile', label: 'Organization Profile', icon: Building2 }
        ];

      default:
        return [];
    }
  };

  const links = getNavLinks();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-[calc(100vh-3.5rem)] border-r border-slate-800">
      {/* Navigation List */}
      <div className="flex-1 py-4 px-3 space-y-1">
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </p>
        {links.map(link => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.exact}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-white" />
                <span className="truncate">{link.label}</span>
              </div>
              {link.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950">
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Simulated Connectors Status at Bottom */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 text-[11px] space-y-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Database className="w-3 h-3 text-slate-400" /> Connectors (Demo)
        </p>
        <div className="space-y-1.5 text-slate-400">
          <div className="flex items-center justify-between">
            <span className="truncate">ABC / APAAR API</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-900/60">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Simulated
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="truncate">DigiLocker / NAD</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-900/60">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Simulated
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="truncate">Local Storage State</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-teal-400 bg-teal-950/60 px-1.5 py-0.2 rounded border border-teal-900/60">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" /> Active
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

