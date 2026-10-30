import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  AlertTriangle,
  TrendingDown,
  Users,
  Building2,
  HelpCircle,
  Eye,
  CheckCircle,
  FileCheck2,
  Info,
  Sparkles
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Drawer } from '../../components/common/Drawer';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { useNavigate } from 'react-router-dom';

export const AnomalyMonitoring: React.FC = () => {
  const { institutions, findings, updateFindingStatus } = useDemoSession();
  const navigate = useNavigate();

  const [activeAnomaly, setActiveAnomaly] = useState<any | null>(null);

  // Institution with statistical variance: Apex Institute of Advanced Engineering
  const apexInst = institutions.find(i => i.id === 'inst-apex-04') || institutions[3];

  const fillRateComparisonData = [
    { year: '2023-24', apex: 90.0, peerMedian: 78.0 },
    { year: '2024-25', apex: 87.7, peerMedian: 77.5 },
    { year: '2025-26', apex: 77.7, peerMedian: 76.8 },
    { year: '2026-27', apex: 42.2, peerMedian: 76.5 } // Sudden cliff!
  ];

  // Course-level breakdown for Apex
  const apexCourseBreakdown = [
    { course: 'B.Tech Mechanical', intake: 120, enrolled: 44, fillRate: 36.6 },
    { course: 'B.Tech Civil', intake: 60, enrolled: 18, fillRate: 30.0 }
  ];

  const handleResolveAnomaly = () => {
    updateFindingStatus(
      'CASE-00105',
      'Under Review',
      'AICTE Scrutiny Officer issued official inquiry notice to Apex Institute regarding sudden 45.5% enrolment cliff.'
    );
    alert('Case CASE-00105 transitioned to "Under Review". Notice sent to Apex Institute.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Institutional Anomaly Monitoring</h1>
            <Badge variant="amber">Engine A7 (Statistical Signals)</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Peer benchmarking, fill-rate cliffs, withdrawal spikes and contact cluster detection across academic years.
          </p>
        </div>
      </div>

      {/* Regulatory Context Notice */}
      <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg flex items-start gap-3 text-xs text-amber-900">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Important Public-Sector Governance Principle:</p>
          <p className="mt-0.5 leading-relaxed">
            Statistical signals are risk indicators for administrative investigation, <strong>not legal determinations of fraud</strong>. 
            An institution exhibiting a fill-rate cliff may have legitimately downsized unviable branches, surrendered seats, 
            or faced localized regional counselling reallocation.
          </p>
        </div>
      </div>

      {/* Highlighted Case: Apex Institute */}
      <Card className="border-amber-300 ring-1 ring-amber-200">
        <CardHeader action={
          <Badge variant="red" size="md">High Risk Signal · Review Required</Badge>
        }>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-900" />
            <div>
              <CardTitle className="text-base text-slate-900">
                {apexInst.name}
              </CardTitle>
              <CardDescription>
                AICTE Permanent ID: {apexInst.code} · Coimbatore, Tamil Nadu · Reporting Group: Regular Technical
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Key Metric Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Metric Evaluated</span>
              <span className="font-bold text-slate-900 text-sm">Course Fill Rate</span>
              <span className="text-[10px] text-slate-500 block">Reported Enrolment / Approved Intake</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Current AY (2026-27)</span>
              <span className="font-extrabold text-red-600 text-sm">42.2% (62/180)</span>
              <span className="text-[10px] text-red-500 block">▼ 45.5% drop from previous year</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Previous AY (2025-26)</span>
              <span className="font-bold text-slate-800 text-sm">87.7% (158/180)</span>
              <span className="text-[10px] text-slate-500 block">Baseline: 90.0% in 2023-24</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Peer Cohort Median</span>
              <span className="font-bold text-blue-800 text-sm">76.5%</span>
              <span className="text-[10px] text-slate-500 block">IQR Lower Threshold: 58.0%</span>
            </div>
          </div>

          {/* Chart: Apex vs Peer Median */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              4-Year Fill Rate Comparison vs Regional Peer Median (%)
            </h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fillRateComparisonData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '6px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line
                    type="monotone"
                    dataKey="apex"
                    name="Apex Institute (Observed)"
                    stroke="#dc2626"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="peerMedian"
                    name="Peer Group Median"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Explanatory Assessment Card */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
            <h5 className="font-bold text-slate-900">System Assessment & Investigation Checklist:</h5>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 leading-relaxed">
              <li><strong>Individual Record Validation (A1-A6):</strong> All individual student records submitted by Apex Institute are valid (valid 12-digit APAARs, no duplicates, within individual intake).</li>
              <li><strong>Core Finding:</strong> Abrupt 45.5% fill-rate cliff in Mechanical Engineering (36.6%) and Civil Engineering (30.0%) during 2026-27 admission cycle.</li>
              <li><strong>Actionable Review Steps:</strong> Verify whether the institution formally applied to surrender unviable branches or if seat matrix was omitted during state single-window counselling.</li>
            </ul>

            <div className="pt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Related Case ID: CASE-00105</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/admin/exceptions')}
                >
                  View Case in Exceptions Queue →
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleResolveAnomaly}
                >
                  Issue Administrative Scrutiny Notice
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Signal 2: Year 1 to Year 2 Continuation Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Year-1 to Year-2 Progression & Retention</CardTitle>
            <CardDescription>Detects unusual drop-out or bulk withdrawal spikes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-teal-900">
              <span className="font-bold block">Western Institute of Technology: 94.2% Continuation</span>
              <span className="text-[11px] text-teal-700">Healthy retention rate across CSE, IT & EE cohorts.</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800">
              <span className="font-bold block">Delhi Metropolitan Engineering College: 96.1% Continuation</span>
              <span className="text-[11px] text-slate-500">Above national average of 88.4%.</span>
            </div>
          </CardContent>
        </Card>

        {/* Signal 3: Shared Contact Ratio Contextual Indicator */}
        <Card>
          <CardHeader>
            <CardTitle>Shared-Contact Clustering Signal</CardTitle>
            <CardDescription>Contextual data-quality metric (family vs bulk agent registrations)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600">
            <p className="leading-relaxed">
              Phone and email repetition is evaluated as a secondary contextual signal only, respecting that 
              siblings or rural community centres legitimately share parent contacts.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
                <span>Western Institute of Technology</span>
                <span className="text-teal-700">1.2% Shared Ratio (Normal)</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '12%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

