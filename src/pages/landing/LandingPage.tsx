import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  ShieldCheck,
  Building2,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Layers,
  Database,
  Lock
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const LandingPage: React.FC = () => {
  const { setRole, loadScenario } = useDemoSession();
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'admin' | 'institution_admin' | 'student' | 'stakeholder', targetPath: string) => {
    setRole(role);
    navigate(targetPath);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Header */}
      <div className="border-b border-slate-800 bg-slate-950/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">APAAR-Verify</span>
                <Badge variant="teal" size="sm">SIH 2026 PS 263</Badge>
              </div>
              <p className="text-xs text-slate-400">
                Centralized Student Enrolment Validation & Regulatory Verification Platform
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-400 font-semibold px-2.5 py-1 rounded bg-amber-950/80 border border-amber-800/80">
              SYNTHETIC DEMO DATA · NO LIVE BACKEND
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Smart India Hackathon 2026 · AICTE Regulatory Verification
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Intelligent verification layer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-indigo-300">
              around institutional reporting
            </span>
          </h1>
          <p className="mt-5 text-base text-slate-300 leading-relaxed">
            APAAR helps identify a student. It does not, by itself, prove current institutional enrolment, 
            intake cap adherence, or multi-programme compliance. APAAR-Verify normalizes existing institutional 
            data formats, catches blocking errors before submission, detects cross-institution duplicates, and 
            manages explainable regulatory exceptions.
          </p>
        </div>

        {/* 4 Portal Launch Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. AICTE Portal */}
          <div
            onClick={() => handleRoleSelect('admin', '/admin')}
            className="group cursor-pointer bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-xl p-5 transition-all shadow-lg hover:shadow-blue-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                AICTE Administration Portal
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                National dashboard, student repository, cross-institution anomaly monitoring, reversible identity merges, and regulatory rules.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
              <span>Enter AICTE Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 2. Institution Portal */}
          <div
            onClick={() => handleRoleSelect('institution_admin', '/institution')}
            className="group cursor-pointer bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-teal-500 rounded-xl p-5 transition-all shadow-lg hover:shadow-teal-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-teal-600/30 text-teal-400 flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                Institution Portal
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Western Institute of Technology demo profile, bulk staging upload, inline fix-before-submit editor, and atomic commit gate.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-teal-400 group-hover:translate-x-1 transition-transform">
              <span>Enter Institution Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 3. Student Portal */}
          <div
            onClick={() => handleRoleSelect('student', '/student')}
            className="group cursor-pointer bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-blue-400 rounded-xl p-5 transition-all shadow-lg hover:shadow-blue-400/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                Student Portal
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Aarav Sharma demo account, academic record history, correction request ticket submission, and third-party consent approvals.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
              <span>Enter Student Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 4. Stakeholder Portal */}
          <div
            onClick={() => handleRoleSelect('stakeholder', '/stakeholder')}
            className="group cursor-pointer bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 rounded-xl p-5 transition-all shadow-lg hover:shadow-amber-400/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-600/30 text-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                Stakeholder Verification
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Employer background check (TCS Demo), consent-gated token verification, QR route resolution, and limited record viewer.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Enter Stakeholder Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Six Interactive Scenarios Showcase */}
        <div className="mt-12 p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Featured End-to-End Demo Scenarios
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any scenario below to automatically switch role, load the state, and jump into the live workflow:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => {
                loadScenario('A');
                navigate('/institution/corrections');
              }}
              className="p-3 text-left rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 hover:border-blue-400 transition-all text-xs"
            >
              <span className="font-bold text-blue-300 block mb-1">Scenario A: Fix-Before-Submit Gate</span>
              <span className="text-slate-400">
                WIT uploads 11-digit APAAR, in-file duplicate & 7 TFW admissions (cap: 6). Blocked until fixed.
              </span>
            </button>

            <button
              onClick={() => {
                loadScenario('B');
                navigate('/admin/verification-centre');
              }}
              className="p-3 text-left rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 hover:border-teal-400 transition-all text-xs"
            >
              <span className="font-bold text-teal-300 block mb-1">Scenario B: Exact APAAR Match (Dual Mode)</span>
              <span className="text-slate-400">
                Same APAAR at WIT (Physical) & NOOLA (Online). Evaluated as Informational under UGC 2022 guidelines.
              </span>
            </button>

            <button
              onClick={() => {
                loadScenario('C');
                navigate('/admin/exceptions');
              }}
              className="p-3 text-left rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 hover:border-amber-400 transition-all text-xs"
            >
              <span className="font-bold text-amber-300 block mb-1">Scenario C: Fuzzy Identity & Shift Overlap</span>
              <span className="text-slate-400">
                Rohit S. Verma vs Rohit Verma. Human confirmation required before reversible identity merge.
              </span>
            </button>

            <button
              onClick={() => {
                loadScenario('D');
                navigate('/admin/anomalies');
              }}
              className="p-3 text-left rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 hover:border-red-400 transition-all text-xs"
            >
              <span className="font-bold text-red-300 block mb-1">Scenario D: Institutional Anomaly Signal</span>
              <span className="text-slate-400">
                Apex Institute fill-rate cliff (88% to 42% vs peer median 76%). Treated as risk signal, not fraud.
              </span>
            </button>

            <button
              onClick={() => {
                loadScenario('E');
                navigate('/institution/students');
              }}
              className="p-3 text-left rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 hover:border-blue-400 transition-all text-xs"
            >
              <span className="font-bold text-blue-300 block mb-1">Scenario E: Legitimate Lateral Entry</span>
              <span className="text-slate-400">
                Direct 2nd year entry with diploma record. Stateful capacity calculation verifies no violation.
              </span>
            </button>

            <button
              onClick={() => {
                loadScenario('F');
                navigate('/student/consent');
              }}
              className="p-3 text-left rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 hover:border-teal-400 transition-all text-xs"
            >
              <span className="font-bold text-teal-300 block mb-1">Scenario F: Student Consent & Stakeholder QR</span>
              <span className="text-slate-400">
                Aarav Sharma approves TCS BGV request; Stakeholder verifies record & inspects QR route.
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 py-4 px-6 text-center text-xs text-slate-500">
        Smart India Hackathon 2026 · Problem Statement SIH26263 · APAAR-Verify Frontend Demonstration · Strictly Synthetic Data
      </div>
    </div>
  );
};

