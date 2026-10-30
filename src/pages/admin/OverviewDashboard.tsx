import React from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  Building2,
  Users,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { useNavigate } from 'react-router-dom';

export const OverviewDashboard: React.FC = () => {
  const { institutions, students, enrolments, findings, academicYear, loadScenario } = useDemoSession();
  const navigate = useNavigate();

  // Synthetic roll-up KPI metrics
  const totalInstitutions = institutions.length;
  const totalCourses = institutions.reduce((acc, inst) => acc + inst.courses.length, 0);
  const totalApprovedIntake = institutions.reduce(
    (acc, inst) => acc + inst.courses.reduce((cAcc, c) => cAcc + c.approvedIntake, 0),
    0
  );
  const totalStudents = students.length;
  const apaarLinkedCount = students.filter(s => s.apaarId !== null && s.apaarId !== '').length;
  const verifiedCount = students.filter(s => s.verificationStatus === 'Verified').length;
  const pendingReviewCount = findings.filter(f => f.status !== 'Resolved').length;

  // Chart 1: State-wise Enrolment
  const stateData = [
    { state: 'Maharashtra', intake: 360, enrolled: 345 },
    { state: 'Delhi', intake: 1100, enrolled: 989 },
    { state: 'Karnataka', intake: 240, enrolled: 236 },
    { state: 'Tamil Nadu', intake: 180, enrolled: 62 },
    { state: 'Gujarat', intake: 120, enrolled: 119 },
    { state: 'Uttar Pradesh', intake: 60, enrolled: 52 }
  ];

  // Chart 2: Verification Status Distribution
  const statusData = [
    { name: 'Verified', value: verifiedCount, color: '#0d9488' },
    { name: 'Review Required', value: totalStudents - verifiedCount, color: '#f59e0b' },
    { name: 'Exceptions', value: pendingReviewCount, color: '#ef4444' }
  ];

  // Chart 3: Intake vs Reported Enrolment by Discipline
  const disciplineData = [
    { discipline: 'CSE / IT', intake: 540, enrolled: 523 },
    { discipline: 'Management', intake: 360, enrolled: 351 },
    { discipline: 'Mechanical', intake: 120, enrolled: 44 },
    { discipline: 'Civil', intake: 60, enrolled: 18 },
    { discipline: 'Electrical', intake: 60, enrolled: 54 },
    { discipline: 'Online BCA/MCA', intake: 800, enrolled: 692 }
  ];

  // Chart 4: Monthly Submission Trend
  const monthlyTrend = [
    { month: 'Jun 2026', submissions: 12, records: 1200 },
    { month: 'Jul 2026', submissions: 28, records: 3400 },
    { month: 'Aug 2026', submissions: 45, records: 6100 },
    { month: 'Sep 2026', submissions: 80, records: 12400 },
    { month: 'Oct 2026', submissions: 110, records: 15800 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">AICTE National Overview Dashboard</h1>
            <Badge variant="indigo">Academic Year {academicYear}</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time compliance monitoring, student identity reconciliation and institutional intake verification.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/admin/exceptions')}
            className="px-3 py-1.5 text-xs font-semibold bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span>Open Exceptions ({pendingReviewCount})</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <StatCard
          title="Institutions"
          value={totalInstitutions}
          subtitle="All reporting groups"
          icon={<Building2 className="w-4 h-4" />}
        />
        <StatCard
          title="Approved Courses"
          value={totalCourses}
          subtitle={`Intake: ${totalApprovedIntake.toLocaleString()}`}
          icon={<FileTextIcon className="w-4 h-4" />}
        />
        <StatCard
          title="Students"
          value={totalStudents}
          subtitle="Normalized records"
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          title="APAAR Linked"
          value={`${Math.round((apaarLinkedCount / (totalStudents || 1)) * 100)}%`}
          subtitle={`${apaarLinkedCount} of ${totalStudents}`}
          icon={<ShieldCheck className="w-4 h-4" />}
          changeType="positive"
        />
        <StatCard
          title="Verified"
          value={verifiedCount}
          subtitle="Passed A1-A6"
          icon={<CheckCircle className="w-4 h-4" />}
          changeType="positive"
        />
        <StatCard
          title="Review Required"
          value={totalStudents - verifiedCount}
          subtitle="Needs verification"
          icon={<Clock className="w-4 h-4" />}
          changeType="warning"
        />
        <StatCard
          title="Exceptions"
          value={pendingReviewCount}
          subtitle="Human review queue"
          icon={<AlertTriangle className="w-4 h-4" />}
          alert={pendingReviewCount > 0}
          changeType="negative"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Approved Intake vs Reported Enrolment by Discipline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sanctioned Intake vs Reported Enrolment by Discipline</CardTitle>
            <CardDescription>
              Compares approved capacity against student-level roll-ups (Illustrative synthetic data)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={disciplineData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="discipline" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '6px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="intake" name="Approved Intake" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="enrolled" name="Actual Enrolment" fill="#0d9488" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status Doughnut */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Distribution</CardTitle>
            <CardDescription>Records categorized by verification engine state</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '6px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1 text-center text-xs">
              {statusData.map(d => (
                <div key={d.name} className="p-1 rounded bg-slate-50 border border-slate-100">
                  <span className="block font-bold text-slate-800">{d.value}</span>
                  <span className="text-[10px] text-slate-500">{d.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* State-wise Enrolment */}
        <Card>
          <CardHeader>
            <CardTitle>State-wise Enrolment Comparison</CardTitle>
            <CardDescription>Distribution across top reporting states</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stateData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="state" type="category" tick={{ fontSize: 11 }} width={90} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '6px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="intake" name="Approved Intake" fill="#94a3b8" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="enrolled" name="Reported Enrolment" fill="#1e40af" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Submission Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Upload & Verification Trajectory</CardTitle>
            <CardDescription>Cumulative record ingestion rate leading up to November 30 deadline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '6px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="submissions" name="Institution Batches" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="records" name="Total Records (x100)" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Panels: Institutions Requiring Attention & High-Priority Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Institutions Requiring Attention */}
        <Card>
          <CardHeader action={
            <button
              onClick={() => navigate('/admin/institutions')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              View All Institutions →
            </button>
          }>
            <CardTitle>Institutions Requiring Attention</CardTitle>
            <CardDescription>Flagged for validation anomalies, intake breaches or missing submissions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {institutions
                .filter(i => i.validationStatus !== 'Verified')
                .map(inst => (
                  <div key={inst.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-900">{inst.name}</span>
                        <Badge variant={inst.validationStatus === 'Needs Review' ? 'amber' : 'red'} size="sm">
                          {inst.validationStatus}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {inst.district}, {inst.state} · Code: {inst.code} · Group: {inst.reportingGroup}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/admin/institutions`)}
                      className="text-xs font-medium text-slate-600 hover:text-blue-600 px-2.5 py-1 rounded border border-slate-200 hover:border-blue-300"
                    >
                      Inspect
                    </button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Latest High-Priority Exception Findings */}
        <Card>
          <CardHeader action={
            <button
              onClick={() => navigate('/admin/exceptions')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              Exceptions Queue →
            </button>
          }>
            <CardTitle>Latest High-Priority Findings</CardTitle>
            <CardDescription>Cases requiring AICTE scrutiny officer or senior reviewer decision</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {findings.slice(0, 4).map(f => (
                <div key={f.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] font-bold text-blue-900">{f.id}</span>
                    <Badge variant={f.severity === 'High' ? 'red' : f.severity === 'Medium' ? 'amber' : 'slate'} size="sm">
                      {f.severity} Severity
                    </Badge>
                  </div>
                  <p className="text-xs font-semibold text-slate-900">{f.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{f.description}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Created: {f.createdAt}</span>
                    <button
                      onClick={() => navigate('/admin/exceptions')}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Review Case →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const FileTextIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

