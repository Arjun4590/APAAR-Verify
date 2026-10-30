import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import { Student, Enrolment } from '../../types';
import {
  Users,
  Search,
  Filter,
  Eye,
  Download,
  ShieldCheck,
  Building2,
  BookOpen,
  Calendar,
  History,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Lock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Drawer } from '../../components/common/Drawer';
import { maskApaar, formatDate, getStatusBadgeClass } from '../../utils/formatters';
import { exportToCSV } from '../../utils/csvExport';

export const StudentRepository: React.FC = () => {
  const { students, enrolments, institutions, findings, auditLogs } = useDemoSession();

  const [search, setSearch] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('ALL');
  const [selectedVerificationStatus, setSelectedVerificationStatus] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter(stu => {
    const term = search.toLowerCase();
    const matchesSearch =
      stu.name.toLowerCase().includes(term) ||
      stu.studentNumber.toLowerCase().includes(term) ||
      (stu.apaarId && stu.apaarId.includes(term));

    const matchesInst = selectedInstitution === 'ALL' || stu.institutionId === selectedInstitution;
    const matchesVStatus = selectedVerificationStatus === 'ALL' || stu.verificationStatus === selectedVerificationStatus;
    const matchesStatus = selectedStatus === 'ALL' || stu.currentStatus === selectedStatus;

    return matchesSearch && matchesInst && matchesVStatus && matchesStatus;
  });

  const getInstitutionName = (id: string) => {
    return institutions.find(i => i.id === id)?.name || id;
  };

  const getStudentEnrolments = (studentId: string): Enrolment[] => {
    return enrolments.filter(e => e.studentId === studentId || e.originalStudentId === studentId);
  };

  const handleExport = () => {
    const rows = filteredStudents.map(s => {
      const enr = getStudentEnrolments(s.id)[0];
      return {
        Student_Ref: s.studentNumber,
        Student_Name: s.name,
        APAAR_ID: maskApaar(s.apaarId),
        Date_of_Birth: s.dateOfBirth,
        Gender: s.gender,
        Institution: getInstitutionName(s.institutionId),
        Admission_Year: s.admissionYear,
        Enrolment_Status: s.currentStatus,
        Verification_Status: s.verificationStatus,
        Programme_Mode: enr?.programmeMode || 'Physical'
      };
    });
    exportToCSV('Central_Student_Repository', rows);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Central Student Repository</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Normalized student identity and multi-programme enrolment registry across participating institutions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={handleExport}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name, APAAR or student ref..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
              />
            </div>

            {/* Institution Filter */}
            <div>
              <select
                value={selectedInstitution}
                onChange={e => setSelectedInstitution(e.target.value)}
                className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:bg-white"
              >
                <option value="ALL">All Institutions</option>
                {institutions.map(i => (
                  <option key={i.id} value={i.id}>{i.name}</option>
                ))}
              </select>
            </div>

            {/* Verification Status */}
            <div>
              <select
                value={selectedVerificationStatus}
                onChange={e => setSelectedVerificationStatus(e.target.value)}
                className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:bg-white"
              >
                <option value="ALL">All Verification Statuses</option>
                <option value="Verified">Verified</option>
                <option value="Review Required">Review Required</option>
                <option value="Partially Verified">Partially Verified</option>
              </select>
            </div>

            {/* Enrolment Status */}
            <div>
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:bg-white"
              >
                <option value="ALL">All Lifecycle Statuses</option>
                <option value="Active">Active</option>
                <option value="Admitted">Admitted</option>
                <option value="Transferred">Transferred</option>
                <option value="Graduated">Graduated</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Student Ref</th>
                <th className="py-3 px-4">Student Name & DOB</th>
                <th className="py-3 px-4">Masked APAAR ID</th>
                <th className="py-3 px-4">Enrolled Institution</th>
                <th className="py-3 px-4">Primary Programme</th>
                <th className="py-3 px-4">Admission</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No student records found matching search filters.
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => {
                  const studentEnrolments = getStudentEnrolments(student.id);
                  const primaryEnr = studentEnrolments[0];

                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-900">
                        {student.studentNumber}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900">{student.name}</p>
                        <p className="text-[11px] text-slate-400">DOB: {student.dateOfBirth} · {student.gender}</p>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-700">
                        {maskApaar(student.apaarId)}
                        {student.mergedIntoStudentId && (
                          <span className="block text-[10px] text-indigo-600 font-semibold">
                            (Merged with {student.mergedIntoStudentId})
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-800">
                        <span className="font-medium line-clamp-1">{getInstitutionName(student.institutionId)}</span>
                      </td>
                      <td className="py-3 px-4">
                        {primaryEnr ? (
                          <div>
                            <span className="font-medium text-slate-800 line-clamp-1">{primaryEnr.courseId.replace('c-', '').toUpperCase()}</span>
                            <span className="text-[10px] text-slate-400">{primaryEnr.programmeMode} · {primaryEnr.admissionCategory}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px]">
                        {student.admissionYear}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] border ${getStatusBadgeClass(student.currentStatus)}`}>
                          {student.currentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] border ${getStatusBadgeClass(student.verificationStatus)}`}>
                          {student.verificationStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Eye className="w-3 h-3" />}
                          onClick={() => setActiveStudent(student)}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Student Detail Drawer */}
      <Drawer
        isOpen={activeStudent !== null}
        onClose={() => setActiveStudent(null)}
        title={activeStudent?.name || 'Student Details'}
        subtitle={`Reference ID: ${activeStudent?.studentNumber} · Institution: ${activeStudent ? getInstitutionName(activeStudent.institutionId) : ''}`}
        width="2xl"
      >
        {activeStudent && (
          <div className="space-y-6">
            {/* Identity Card */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Identity Profile</span>
                <Badge variant={activeStudent.verificationStatus === 'Verified' ? 'teal' : 'amber'}>
                  {activeStudent.verificationStatus}
                </Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Full Legal Name</span>
                  <span className="font-semibold text-slate-900">{activeStudent.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Date of Birth</span>
                  <span className="font-semibold text-slate-900">{activeStudent.dateOfBirth}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Gender</span>
                  <span className="font-semibold text-slate-900">{activeStudent.gender}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">APAAR ID</span>
                  <span className="font-mono font-bold text-blue-900">
                    {maskApaar(activeStudent.apaarId)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Connector Mode</span>
                  <span className="text-teal-700 font-medium">{activeStudent.sourceMode || 'local-reference'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Year of Entry</span>
                  <span className="font-mono text-slate-800">{activeStudent.admissionYear}</span>
                </div>
              </div>
            </div>

            {/* Enrolment History (Separated from Identity) */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Enrolment History ({getStudentEnrolments(activeStudent.id).length} Record(s))
              </h4>
              <div className="space-y-2.5">
                {getStudentEnrolments(activeStudent.id).map((enr, i) => (
                  <div key={enr.id} className="p-3.5 bg-white border border-slate-200 rounded-lg text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">
                        {getInstitutionName(enr.institutionId)}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] border ${getStatusBadgeClass(enr.status)}`}>
                        {enr.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Academic Year</span>
                        <span className="font-medium text-slate-800">{enr.academicYear}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Programme Mode</span>
                        <span className="font-medium text-slate-800">{enr.programmeMode}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Entry Type</span>
                        <span className="font-medium text-slate-800">{enr.entryType}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Category</span>
                        <span className="font-medium text-slate-800">{enr.admissionCategory}</span>
                      </div>
                    </div>
                    {enr.shiftTiming && (
                      <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="font-medium text-slate-700">Scheduled Shift Timing: </span>
                        {enr.shiftTiming}
                      </div>
                    )}
                    {enr.priorQualification && (
                      <div className="text-[11px] text-teal-800 bg-teal-50/60 p-2 rounded border border-teal-200">
                        <span className="font-semibold">Prior Qualifying Credential: </span>
                        {enr.priorQualification}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Related Audit Events */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-600" />
                Immutable Audit Trail for Student
              </h4>
              <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 text-xs">
                {auditLogs
                  .filter(a => a.entity.includes(activeStudent.id) || a.description.includes(activeStudent.name))
                  .slice(0, 3)
                  .map(a => (
                    <div key={a.id} className="p-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{a.timestamp}</span>
                        <span className="font-mono text-slate-500">{a.id}</span>
                      </div>
                      <p className="font-semibold text-slate-800 mt-1">{a.action}</p>
                      <p className="text-slate-500 mt-0.5">{a.description}</p>
                    </div>
                  ))}
                {auditLogs.filter(a => a.entity.includes(activeStudent.id) || a.description.includes(activeStudent.name)).length === 0 && (
                  <div className="p-4 text-center text-slate-400">
                    No specific individual exception audit actions recorded.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

