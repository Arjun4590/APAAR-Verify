import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import { Course } from '../../types';
import {
  BookOpen,
  Layers,
  Scale,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Users
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Drawer } from '../../components/common/Drawer';
import { getStatusBadgeClass } from '../../utils/formatters';

export const CoursesIntake: React.FC = () => {
  const { institutions, academicYear } = useDemoSession();
  const witInst = institutions.find(i => i.id === 'inst-wit-01') || institutions[0];

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Courses & Intake Capacity Management</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Programmes, statutory capacity limits, available vacant seats and admission category caps.
        </p>
      </div>

      {/* Courses Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Programme / Course Name</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4 text-right">Approved Intake</th>
                <th className="py-3 px-4 text-right">Actual Enrolment</th>
                <th className="py-3 px-4 text-right">Available Capacity</th>
                <th className="py-3 px-4">Academic Year</th>
                <th className="py-3 px-4">Rule Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {witInst.courses.map(course => {
                const available = Math.max(0, course.approvedIntake - course.actualEnrolment);
                return (
                  <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-900">
                      {course.code}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">{course.name}</span>
                      <span className="text-[11px] text-slate-400">{course.department}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="slate" size="sm">{course.level}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                      {course.approvedIntake}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-blue-700">
                      {course.actualEnrolment}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-teal-700">
                      {available} seats
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px]">
                      {academicYear}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${getStatusBadgeClass(course.ruleStatus)}`}>
                        {course.ruleStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Eye className="w-3 h-3" />}
                        onClick={() => setSelectedCourse(course)}
                      >
                        Cap Breakdown
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Course Detail Drawer with Category Caps Breakdown */}
      <Drawer
        isOpen={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
        title={`Category Capacity Drill-Down: ${selectedCourse?.name}`}
        subtitle={`Course Code: ${selectedCourse?.code} · Approved Intake: ${selectedCourse?.approvedIntake} Seats`}
        width="xl"
      >
        {selectedCourse && (
          <div className="space-y-6 text-xs">
            {/* Sanctioned Overview */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-3 gap-3 text-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Sanctioned Intake</span>
                <span className="text-lg font-bold text-slate-900">{selectedCourse.approvedIntake}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Enrolment</span>
                <span className="text-lg font-bold text-blue-700">{selectedCourse.actualEnrolment}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Remaining Capacity</span>
                <span className="text-lg font-bold text-teal-700">
                  {Math.max(0, selectedCourse.approvedIntake - selectedCourse.actualEnrolment)}
                </span>
              </div>
            </div>

            {/* Category Cap Table Calculation */}
            <div>
              <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-2.5 flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-600" />
                Supernumerary & Category-Specific Seat Limits
              </h4>
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Admission Category</th>
                      <th className="py-2.5 px-3">Configured Cap</th>
                      <th className="py-2.5 px-3 text-right">Permitted Seats</th>
                      <th className="py-2.5 px-3">Rule Reference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        Tuition Fee Waiver (TFW)
                      </td>
                      <td className="py-2.5 px-3 font-mono">5% of approved intake</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-blue-900">
                        {Math.ceil(selectedCourse.approvedIntake * 0.05)} seats
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">APH 2024-27 Clause 2.15</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        Foreign Nationals / OCI / Gulf (UG)
                      </td>
                      <td className="py-2.5 px-3 font-mono">15% supernumerary</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-blue-900">
                        {Math.ceil(selectedCourse.approvedIntake * 0.15)} seats
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">APH 2024-27 Clause 2.16</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        Lateral Entry (2nd Year Direct)
                      </td>
                      <td className="py-2.5 px-3 font-mono">10% base + carryover</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-blue-900">
                        {Math.ceil(selectedCourse.approvedIntake * 0.10)} + vacancies
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">Clause 2.14 (Pending confirmation)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Category Quota Monitoring Alert */}
            {selectedCourse.code === 'CSE-101' && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Active Category Quota Alert:
                </span>
                <p className="leading-relaxed">
                  Staging batch BATCH-2026-WIT-01 contains <strong>7 TFW admissions</strong> against the <strong>6 permitted seats</strong> 
                  calculated above (120 × 5%). This triggers an automatic non-blocking regulatory review finding in the validation queue.
                </p>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};

