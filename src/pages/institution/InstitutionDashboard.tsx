import React from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  Building2,
  Users,
  ShieldCheck,
  AlertTriangle,
  Upload,
  Sliders,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
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
  Cell
} from 'recharts';
import { useNavigate } from 'react-router-dom';

export const InstitutionDashboard: React.FC = () => {
  const {
    institutions,
    students,
    stagingRows,
    submissionBatches,
    findings,
    academicYear
  } = useDemoSession();

  const navigate = useNavigate();

  // Scoped to Western Institute of Technology (Demo)
  const witInst = institutions.find(i => i.id === 'inst-wit-01') || institutions[0];
  const witStudents = students.filter(s => s.institutionId === 'inst-wit-01');

  const blockingErrors = stagingRows.filter(r => !r.isValid).length;
  const reviewFindings = stagingRows.filter(r => r.findings.some(f => !f.isBlocking)).length;
  const committedBatches = submissionBatches.filter(b => b.institutionId === 'inst-wit-01');

  // Chart: Course intake vs enrolled
  const courseCapacityData = witInst.courses.map(c => ({
    name: c.code,
    fullName: c.name,
    intake: c.approvedIntake,
    enrolled: c.actualEnrolment,
    available: Math.max(0, c.approvedIntake - c.actualEnrolment)
  }));

  const validationSummaryData = [
    { name: 'Valid Rows', value: stagingRows.filter(r => r.isValid).length, color: '#0d9488' },
    { name: 'Review Needed', value: reviewFindings, color: '#f59e0b' },
    { name: 'Blocking Errors', value: blockingErrors, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Institution Banner Header */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
              WIT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900">{witInst.name}</h1>
                <Badge variant="teal">{witInst.approvalStatus}</Badge>
              </div>
              <p className="text-xs text-slate-500">
                AICTE Permanent ID: {witInst.code} · Pune, Maharashtra · Reporting Group: {witInst.reportingGroup}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Upload className="w-3.5 h-3.5" />}
            onClick={() => navigate('/institution/upload')}
          >
            Bulk Upload File
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Sliders className="w-3.5 h-3.5" />}
            onClick={() => navigate('/institution/corrections')}
          >
            Fix Before Submit ({blockingErrors})
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <StatCard
          title="Total Student Records"
          value={witStudents.length}
          subtitle="Committed in repository"
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          title="APAAR Linked"
          value={`${witStudents.filter(s => s.apaarId).length}`}
          subtitle={`${Math.round((witStudents.filter(s => s.apaarId).length / (witStudents.length || 1)) * 100)}% coverage`}
          icon={<ShieldCheck className="w-4 h-4" />}
          changeType="positive"
        />
        <StatCard
          title="Staging Valid Rows"
          value={stagingRows.filter(r => r.isValid).length}
          subtitle={`Out of ${stagingRows.length} staged`}
          icon={<CheckCircle className="w-4 h-4" />}
          changeType="positive"
        />
        <StatCard
          title="Blocking Errors"
          value={blockingErrors}
          subtitle="Must fix before commit"
          icon={<AlertTriangle className="w-4 h-4" />}
          alert={blockingErrors > 0}
          changeType={blockingErrors > 0 ? 'negative' : 'positive'}
        />
        <StatCard
          title="Review Findings"
          value={reviewFindings}
          subtitle="Enters review queue"
          icon={<Clock className="w-4 h-4" />}
          changeType="warning"
        />
        <StatCard
          title="Submission Status"
          value={witInst.submissionStatus}
          subtitle={`AY ${academicYear}`}
          icon={<BookOpen className="w-4 h-4" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Approved Intake vs Actual Enrolment */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Course-wise Approved Intake vs Enrolment</CardTitle>
            <CardDescription>
              Compares statutory sanctioned seats against verified student records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseCapacityData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '6px', fontSize: '12px' }}
                    formatter={(val, name, item) => [val, name === 'intake' ? 'Approved Intake' : 'Actual Enrolment']}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="intake" name="Approved Intake" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="enrolled" name="Actual Enrolment" fill="#0d9488" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Staging Validation Doughnut */}
        <Card>
          <CardHeader>
            <CardTitle>Active Batch Staging Status</CardTitle>
            <CardDescription>BATCH-2026-WIT-01 row-level health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={validationSummaryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {validationSummaryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '6px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center">
              <Button
                variant={blockingErrors > 0 ? 'danger' : 'primary'}
                size="sm"
                className="w-full"
                onClick={() => navigate('/institution/corrections')}
              >
                {blockingErrors > 0 ? `Resolve ${blockingErrors} Blocking Errors →` : 'Review & Commit Batch →'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panels: Recent Batches & AICTE Exceptions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Batches */}
        <Card>
          <CardHeader action={
            <button
              onClick={() => navigate('/institution/submissions')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              All Submissions →
            </button>
          }>
            <CardTitle>Recent Upload Batches</CardTitle>
            <CardDescription>Staging batches and promotion transaction history</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {committedBatches.map(batch => (
                <div key={batch.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <span className="font-mono text-xs font-bold text-blue-900 block">{batch.id}</span>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">{batch.courseName}</p>
                    <span className="text-[11px] text-slate-400">
                      {batch.totalRows} rows · Created: {batch.createdAt}
                    </span>
                  </div>
                  <div className="text-right">
                    <Badge variant={batch.status === 'Committed' ? 'teal' : 'red'}>
                      {batch.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AICTE Clarification Inquiries */}
        <Card>
          <CardHeader action={
            <button
              onClick={() => navigate('/institution/exceptions')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              Respond to AICTE →
            </button>
          }>
            <CardTitle>AICTE Inquiries & Findings</CardTitle>
            <CardDescription>Action items raised by AICTE Scrutiny Officers</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {findings
                .filter(f => f.institutionId === 'inst-wit-01')
                .map(f => (
                  <div key={f.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[11px] font-bold text-blue-900">{f.id}</span>
                      <Badge variant={f.severity === 'High' ? 'red' : 'amber'} size="sm">
                        {f.status}
                      </Badge>
                    </div>
                    <p className="text-xs font-semibold text-slate-900">{f.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{f.suggestedAction}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

