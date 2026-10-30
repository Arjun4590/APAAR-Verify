import React from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  BookOpen,
  Calendar,
  Building2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  Lock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { maskApaar, getStatusBadgeClass } from '../../utils/formatters';

export const AcademicRecords: React.FC = () => {
  const { students, enrolments, institutions } = useDemoSession();

  // Scoped strictly to Aarav Sharma
  const student = students.find(s => s.id === 'stu-aarav-01') || students[0];
  const studentEnrolments = enrolments.filter(e => e.studentId === student.id);

  const getInstitutionName = (id: string) => {
    return institutions.find(i => i.id === id)?.name || id;
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">My Academic Enrolment Records</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Verified academic history and institutional enrolment credentials reported under your APAAR identity.
        </p>
      </div>

      {/* Privacy Notice */}
      <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg flex items-center gap-2 text-xs text-blue-900">
        <Lock className="w-4 h-4 text-blue-600 shrink-0" />
        <span>
          Strict Data Isolation: You have authorized access exclusively to your own personal academic records.
        </span>
      </div>

      {/* Enrolment Cards */}
      <div className="space-y-4">
        {studentEnrolments.map((enr, index) => {
          const isPhysical = enr.programmeMode === 'Physical';

          return (
            <Card key={enr.id} className="border-slate-200">
              <CardHeader action={
                <Badge variant={enr.status === 'Active' ? 'teal' : 'slate'}>
                  {enr.status}
                </Badge>
              }>
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs ${
                    isPhysical ? 'bg-blue-900' : 'bg-teal-700'
                  }`}>
                    {isPhysical ? 'DEG' : 'ODL'}
                  </div>
                  <div>
                    <CardTitle className="text-sm">
                      {isPhysical
                        ? 'B.Tech Computer Science & Engineering'
                        : 'Bachelor of Computer Applications (Online/ODL)'}
                    </CardTitle>
                    <CardDescription>{getInstitutionName(enr.institutionId)}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Enrolment Number</span>
                    <span className="font-mono font-semibold text-slate-900">{student.studentNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Academic Year</span>
                    <span className="font-semibold text-slate-900">{enr.academicYear}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Admission Year</span>
                    <span className="font-semibold text-slate-900">{enr.admissionYear}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Instruction Mode</span>
                    <span className="font-semibold text-slate-900">{enr.programmeMode}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Schedule & Timings</span>
                    <span className="font-medium text-slate-800">{enr.shiftTiming || 'Standard Cohort Shift'}</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Verification Source</span>
                    <span className="font-medium text-teal-700">Authoritative AICTE Central Repository</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

