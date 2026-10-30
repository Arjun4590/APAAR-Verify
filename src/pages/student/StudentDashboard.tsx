import React from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  Lock,
  History,
  QrCode,
  ArrowRight,
  FileCheck2,
  Clock,
  Send,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { maskApaar } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

export const StudentDashboard: React.FC = () => {
  const {
    students,
    enrolments,
    institutions,
    verificationRequests,
    correctionRequests,
    loadScenario
  } = useDemoSession();

  const navigate = useNavigate();

  // Scoped to demo student Aarav Sharma
  const student = students.find(s => s.id === 'stu-aarav-01') || students[0];
  const studentEnrolments = enrolments.filter(e => e.studentId === student.id);
  const primaryEnrolment = studentEnrolments[0];
  const institution = institutions.find(i => i.id === student.institutionId);

  const pendingRequests = verificationRequests.filter(
    r => r.studentId === student.id && r.consentStatus === 'Pending Approval'
  );

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Student Profile Card Header */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            AS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900">{student.name}</h1>
              <Badge variant="teal">Verified Identity</Badge>
            </div>
            <p className="text-xs text-slate-500">
              Student Ref: <span className="font-mono text-slate-700 font-semibold">{student.studentNumber}</span> · 
              APAAR: <span className="font-mono text-blue-900 font-bold">{maskApaar(student.apaarId)}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<QrCode className="w-3.5 h-3.5" />}
            onClick={() => navigate('/student/qr')}
          >
            Digital QR Pass
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5" />}
            onClick={() => loadScenario('F')}
          >
            Demo Scenario F (Consent)
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          title="Academic Status"
          value={student.currentStatus}
          subtitle="Enrolled & Active"
          icon={<GraduationCap className="w-4 h-4" />}
          changeType="positive"
        />
        <StatCard
          title="Verification Status"
          value={student.verificationStatus}
          subtitle="A1-A6 Validation Pass"
          icon={<ShieldCheck className="w-4 h-4" />}
          changeType="positive"
        />
        <StatCard
          title="Consent Requests"
          value={pendingRequests.length}
          subtitle="Third-party verifications"
          icon={<Lock className="w-4 h-4" />}
          alert={pendingRequests.length > 0}
          changeType={pendingRequests.length > 0 ? 'warning' : 'neutral'}
        />
        <StatCard
          title="Correction Tickets"
          value={correctionRequests.length}
          subtitle="Report inaccuracies"
          icon={<Send className="w-4 h-4" />}
        />
      </div>

      {/* Primary Enrolment Details & Pending Consents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrolment Record Summary */}
        <Card className="lg:col-span-2">
          <CardHeader action={
            <button
              onClick={() => navigate('/student/records')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              Full Enrolment History →
            </button>
          }>
            <CardTitle>Authoritative Institutional Enrolment</CardTitle>
            <CardDescription>Official record submitted by institution to AICTE</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">
                  {institution?.name || 'Western Institute of Technology'}
                </span>
                <Badge variant="teal">{primaryEnrolment?.status || 'Active'}</Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Degree Programme</span>
                  <span className="font-semibold text-slate-900">B.Tech Computer Science & Engg</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Academic Year</span>
                  <span className="font-semibold text-slate-900">{primaryEnrolment?.academicYear || '2026-27'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Admission Year</span>
                  <span className="font-semibold text-slate-900">{student.admissionYear}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Programme Mode</span>
                  <span className="font-semibold text-slate-900">{primaryEnrolment?.programmeMode || 'Physical'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Admission Category</span>
                  <span className="font-semibold text-slate-900">{primaryEnrolment?.admissionCategory || 'General'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Scheduled Shift</span>
                  <span className="font-semibold text-slate-900">09:00 - 16:30 (Day)</span>
                </div>
              </div>
            </div>

            {/* Scenario B Notice: Simultaneous Online Enrolment */}
            {studentEnrolments.length > 1 && (
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-blue-950">
                <span className="font-bold block">Concurrent Online Degree Enrolment (UGC 2022 Guidelines):</span>
                <p className="text-[11px] text-blue-900 mt-0.5">
                  You also hold a registered online enrolment at <strong>National Open Academy (Online BCA)</strong>. 
                  Under UGC simultaneous degree regulations, one physical degree plus one online degree is verified and permitted.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Third-Party Consent Action Box (Scenario F) */}
        <Card className={pendingRequests.length > 0 ? 'border-amber-300 ring-1 ring-amber-200' : ''}>
          <CardHeader>
            <CardTitle>Third-Party Verification Requests</CardTitle>
            <CardDescription>Grant or deny employer access to your record</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {pendingRequests.length > 0 ? (
              <div className="space-y-3">
                {pendingRequests.map(req => (
                  <div key={req.id} className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-950 space-y-2">
                    <div>
                      <span className="font-bold text-xs block text-slate-900">{req.requestingOrg}</span>
                      <p className="text-[11px] text-slate-600 mt-0.5">{req.purpose}</p>
                    </div>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-slate-500">Token: {req.token}</span>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/student/consent')}
                      >
                        Review Consent →
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-slate-400 space-y-1">
                <CheckCircle2 className="w-6 h-6 text-teal-600 mx-auto" />
                <p className="font-semibold text-slate-700">No pending verification requests</p>
                <p className="text-[11px]">All third-party requests have been resolved.</p>
              </div>
            )}

            <div className="pt-2 text-center">
              <button
                onClick={() => navigate('/student/consent')}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                Manage All Consent Permissions →
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
