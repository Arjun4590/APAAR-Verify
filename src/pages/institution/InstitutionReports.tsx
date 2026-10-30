import React from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  FileText,
  Download,
  BookOpen,
  CheckCircle,
  Users,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { exportToCSV } from '../../utils/csvExport';

export const InstitutionReports: React.FC = () => {
  const { institutions, students } = useDemoSession();
  const witInst = institutions.find(i => i.id === 'inst-wit-01') || institutions[0];
  const witStudents = students.filter(s => s.institutionId === 'inst-wit-01');

  const handleExportCourseReport = () => {
    const data = witInst.courses.map(c => ({
      Course_Code: c.code,
      Course_Name: c.name,
      Level: c.level,
      Approved_Intake: c.approvedIntake,
      Actual_Enrolment: c.actualEnrolment,
      Available_Capacity: Math.max(0, c.approvedIntake - c.actualEnrolment),
      Rule_Status: c.ruleStatus
    }));
    exportToCSV('WIT_Course_Capacity_Report', data);
  };

  const handleExportStudentCensus = () => {
    const data = witStudents.map(s => ({
      Student_Number: s.studentNumber,
      Name: s.name,
      DOB: s.dateOfBirth,
      Gender: s.gender,
      APAAR_ID: s.apaarId ? `•••• •••• ${s.apaarId.slice(-4)}` : 'Missing',
      Admission_Year: s.admissionYear,
      Status: s.currentStatus,
      Verification_Status: s.verificationStatus
    }));
    exportToCSV('WIT_Student_Census_Report', data);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Institutional Compliance & Intake Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Western Institute of Technology internal enrolment roll-ups, intake capacity audits and CSV exports.
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Report 1 */}
        <Card>
          <CardHeader action={
            <Button variant="primary" size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={handleExportCourseReport}>
              Download CSV
            </Button>
          }>
            <CardTitle>Course-wise Capacity & Seat Utilization</CardTitle>
            <CardDescription>Approved intake vs actual admitted students per programme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {witInst.courses.map(c => (
              <div key={c.id} className="p-3 bg-slate-50 rounded-lg flex items-center justify-between border border-slate-100">
                <div>
                  <span className="font-semibold text-slate-900 block">{c.name}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{c.code} · Intake: {c.approvedIntake}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-blue-900 block">{c.actualEnrolment} Enrolled</span>
                  <span className="text-[10px] text-teal-700 font-medium">
                    {Math.max(0, c.approvedIntake - c.actualEnrolment)} Available
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Report 2 */}
        <Card>
          <CardHeader action={
            <Button variant="primary" size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={handleExportStudentCensus}>
              Download CSV
            </Button>
          }>
            <CardTitle>Student Census & APAAR Completeness</CardTitle>
            <CardDescription>Coverage ratio of verified APAAR numeric identifiers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg text-center">
              <span className="text-[10px] uppercase font-bold text-teal-800 block">APAAR Identifier Linkage</span>
              <span className="text-3xl font-extrabold text-teal-900 block mt-1">
                {Math.round((witStudents.filter(s => s.apaarId).length / (witStudents.length || 1)) * 100)}%
              </span>
              <span className="text-[11px] text-teal-700 block mt-1">
                {witStudents.filter(s => s.apaarId).length} of {witStudents.length} students linked with 12-digit APAAR
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Verified Records (A1-A6 Pass):</span>
                <span className="font-bold text-teal-700">{witStudents.filter(s => s.verificationStatus === 'Verified').length}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Review Required:</span>
                <span className="font-bold text-amber-700">{witStudents.filter(s => s.verificationStatus === 'Review Required').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

