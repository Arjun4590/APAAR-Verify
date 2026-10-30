import React from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Calendar,
  Lock,
  BookOpen
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const InstitutionProfile: React.FC = () => {
  const { institutions, academicYear } = useDemoSession();
  const witInst = institutions.find(i => i.id === 'inst-wit-01') || institutions[0];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Institution Profile & AICTE Sanctions</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Authoritative institutional accreditation, statutory reporting profile and official contact records.
        </p>
      </div>

      {/* Main Profile Info Card */}
      <Card>
        <CardHeader action={
          <Badge variant="teal">AICTE Approved Profile</Badge>
        }>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold text-lg">
              WIT
            </div>
            <div>
              <CardTitle>{witInst.name}</CardTitle>
              <CardDescription>
                AICTE Permanent Identification Code: {witInst.code}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 text-xs">
          {/* Statutory Fields Notice */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2 text-slate-600">
            <Lock className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Authoritative Profile: Sanctioned intake and approval statuses are synchronized with official AICTE records and cannot be arbitrarily modified locally.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">State & District</span>
              <span className="font-semibold text-slate-900 text-sm">{witInst.district}, {witInst.state}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Institution Category</span>
              <span className="font-semibold text-slate-900 text-sm">{witInst.institutionType}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Reporting Group</span>
              <span className="font-semibold text-blue-900 text-sm">{witInst.reportingGroup}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Official Contact Email</span>
              <span className="font-mono text-slate-800 text-sm">{witInst.contactEmail}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Contact Telephone</span>
              <span className="font-mono text-slate-800 text-sm">{witInst.contactPhone}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Current Academic Cycle</span>
              <span className="font-semibold text-slate-900 text-sm">Academic Year {academicYear}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses and Sanctioned Intake Table */}
      <Card>
        <CardHeader>
          <CardTitle>Approved Programmes & Sanctioned Seat Matrix</CardTitle>
          <CardDescription>Official capacity sanctioned by AICTE Executive Committee</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Course Code & Name</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4 text-right">Approved Intake</th>
                <th className="py-3 px-4 text-right">Actual Enrolled</th>
                <th className="py-3 px-4">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {witInst.courses.map(course => (
                <tr key={course.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{course.name}</p>
                    <span className="text-[10px] font-mono text-slate-400">{course.code}</span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="slate" size="sm">{course.level}</Badge>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{course.department}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                    {course.approvedIntake}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-blue-700">
                    {course.actualEnrolment}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="teal" size="sm">{course.ruleStatus}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

