import React from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  Settings as SettingsIcon,
  RefreshCw,
  Users,
  Database,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const Settings: React.FC = () => {
  const { resetDemoData, academicYear, setAcademicYear, currentRole } = useDemoSession();

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Platform Settings & Simulation Control</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Local demonstration configuration, simulated integration endpoints and synthetic dataset controls.
        </p>
      </div>

      {/* Integration Status Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Government Connectors & External Adapters</CardTitle>
          <CardDescription>All external interfaces operate in mock adapter mode</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-semibold text-xs text-slate-900 block">MoE APAAR / ABC Connector</span>
              <p className="text-[11px] text-slate-500">
                12-digit format validator and simulated name/DOB identity verification response.
              </p>
            </div>
            <Badge variant="amber">Simulated Adapter</Badge>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-semibold text-xs text-slate-900 block">DigiLocker / NAD Academic Repository</span>
              <p className="text-[11px] text-slate-500">
                Simulated diploma & prior degree qualification credential retrieval.
              </p>
            </div>
            <Badge variant="amber">Simulated Adapter</Badge>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-semibold text-xs text-slate-900 block">Institutional ERP & AICTE Portal Adapter</span>
              <p className="text-[11px] text-slate-500">
                Bulk Excel/CSV ingestion layer with staging area and atomic commit gate.
              </p>
            </div>
            <Badge variant="teal">Active Staging</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Academic Year Setting */}
      <Card>
        <CardHeader>
          <CardTitle>Active Academic Year Scope</CardTitle>
          <CardDescription>Select the statutory evaluation cycle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            {['2026-27', '2025-26', '2024-25'].map(year => (
              <button
                key={year}
                onClick={() => setAcademicYear(year)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  academicYear === year
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Academic Year {year}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Demo Reset Card */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700">Reset Demo Data & Staging State</CardTitle>
          <CardDescription>
            Purge local browser mutations, reset staging batches, restore original seeded cases, and reset to initial AICTE overview.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="danger"
            size="sm"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={() => {
              if (confirm('Are you sure you want to reset all demo state to the default synthetic seed?')) {
                resetDemoData();
              }
            }}
          >
            Reset All Synthetic Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

