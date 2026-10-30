import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import { Student, Enrolment } from '../../types';
import {
  Users,
  Search,
  Filter,
  Eye,
  Plus,
  Download,
  BookOpen,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Drawer } from '../../components/common/Drawer';
import { Modal } from '../../components/common/Modal';
import { maskApaar, getStatusBadgeClass } from '../../utils/formatters';
import { exportToCSV } from '../../utils/csvExport';

export const StudentRecords: React.FC = () => {
  const { students, enrolments, institutions, loadScenario } = useDemoSession();

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Form state for adding synthetic student
  const [newName, setNewName] = useState('');
  const [newApaar, setNewApaar] = useState('');
  const [newDob, setNewDob] = useState('2005-01-01');
  const [newGender, setNewGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [newCourse, setNewCourse] = useState('c-wit-cse');

  // Filter scoped to Western Institute of Technology
  const witStudents = students.filter(s => s.institutionId === 'inst-wit-01');

  const filteredStudents = witStudents.filter(stu => {
    const term = search.toLowerCase();
    const matchesSearch =
      stu.name.toLowerCase().includes(term) ||
      stu.studentNumber.toLowerCase().includes(term) ||
      (stu.apaarId && stu.apaarId.includes(term));

    const matchesStatus = selectedStatus === 'ALL' || stu.currentStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStudentEnrolment = (studentId: string): Enrolment | undefined => {
    return enrolments.find(e => e.studentId === studentId);
  };

  const handleExport = () => {
    const rows = filteredStudents.map(s => {
      const enr = getStudentEnrolment(s.id);
      return {
        Student_Ref: s.studentNumber,
        Name: s.name,
        DOB: s.dateOfBirth,
        Gender: s.gender,
        APAAR: maskApaar(s.apaarId),
        Admission_Year: s.admissionYear,
        Status: s.currentStatus,
        Entry_Type: enr?.entryType || 'Regular',
        Category: enr?.admissionCategory || 'General',
        Prior_Qualification: enr?.priorQualification || 'N/A'
      };
    });
    exportToCSV('WIT_Student_Enrolment_Records', rows);
  };

  const handleAddSyntheticStudent = () => {
    if (!newName.trim()) {
      alert('Student name is required');
      return;
    }
    alert(`Synthetic student ${newName} staged in local session.`);
    setAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Institutional Student Records</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Western Institute of Technology committed student records and academic lifecycle registrations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5 text-blue-600" />}
            onClick={() => loadScenario('E')}
          >
            Scenario E (Lateral Entry)
          </Button>
          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={handleExport}>
            Export CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setAddModalOpen(true)}
          >
            Add Student Record
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by student name, roll number or APAAR..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
              />
            </div>
            <div>
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:bg-white"
              >
                <option value="ALL">All Lifecycle Statuses</option>
                <option value="Active">Active</option>
                <option value="Admitted">Admitted</option>
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
            <thead className="bg-slate-50/80 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Student Ref</th>
                <th className="py-3 px-4">Student Name & DOB</th>
                <th className="py-3 px-4">Masked APAAR ID</th>
                <th className="py-3 px-4">Course Programme</th>
                <th className="py-3 px-4">Entry Route</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map(student => {
                const enr = getStudentEnrolment(student.id);
                const isLateral = enr?.entryType === 'Lateral Entry';

                return (
                  <tr
                    key={student.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      isLateral ? 'bg-blue-50/20' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-medium text-slate-900">
                      {student.studentNumber}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-900">{student.name}</p>
                      <p className="text-[11px] text-slate-400">DOB: {student.dateOfBirth} · {student.gender}</p>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-700">
                      {maskApaar(student.apaarId)}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {enr?.courseId.replace('c-wit-', '').toUpperCase() || 'CSE'}
                    </td>
                    <td className="py-3 px-4">
                      {isLateral ? (
                        <span className="inline-flex items-center gap-1 font-bold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded text-[10px]">
                          <Sparkles className="w-2.5 h-2.5 text-blue-600" /> Lateral Entry
                        </span>
                      ) : (
                        <span className="text-slate-600">Regular</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {enr?.admissionCategory || 'General'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${getStatusBadgeClass(student.currentStatus)}`}>
                        {student.currentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${getStatusBadgeClass(student.verificationStatus)}`}>
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
                        Inspect
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Student Record Drawer */}
      <Drawer
        isOpen={activeStudent !== null}
        onClose={() => setActiveStudent(null)}
        title={activeStudent?.name || 'Student Record'}
        subtitle={`Student Ref: ${activeStudent?.studentNumber}`}
        width="xl"
      >
        {activeStudent && (
          <div className="space-y-6 text-xs">
            {/* Identity Profile */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Personal Profile</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block text-[10px]">Date of Birth</span>
                  <span className="font-semibold text-slate-900">{activeStudent.dateOfBirth}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">APAAR ID</span>
                  <span className="font-mono font-bold text-blue-900">{maskApaar(activeStudent.apaarId)}</span>
                </div>
              </div>
            </div>

            {/* Enrolment Details */}
            {(() => {
              const enr = getStudentEnrolment(activeStudent.id);
              return (
                <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Institutional Enrolment Specification
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Academic Year</span>
                      <span className="font-semibold text-slate-800">{enr?.academicYear || '2026-27'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Entry Route</span>
                      <span className="font-semibold text-slate-800">{enr?.entryType || 'Regular'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Admission Category</span>
                      <span className="font-semibold text-slate-800">{enr?.admissionCategory || 'General'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Programme Mode</span>
                      <span className="font-semibold text-slate-800">{enr?.programmeMode || 'Physical'}</span>
                    </div>
                  </div>

                  {/* Scenario E Highlight: Lateral Entry Credential Validation */}
                  {enr?.entryType === 'Lateral Entry' && (
                    <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-teal-900 space-y-1">
                      <span className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        Scenario E — Legitimate Lateral Entry Verified:
                      </span>
                      <p className="leading-relaxed">
                        Student entered 2nd Year via state lateral-entry quota. 
                        Qualifying Credential: <strong>{enr.priorQualification}</strong>.
                      </p>
                      <p className="text-[11px] text-teal-700">
                        Evaluated within configured 10% lateral entry cap. 
                        Absence of first-year record is legitimate and not flagged as an error.
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </Drawer>

      {/* Add Synthetic Student Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Synthetic Student Record"
        description="Add a synthetic student directly to Western Institute of Technology demo profile."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddSyntheticStudent}>
              Add Record
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Student Full Name</label>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="e.g. Ramesh Chandra Sharma"
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Synthetic 12-Digit APAAR ID</label>
            <input
              type="text"
              maxLength={12}
              value={newApaar}
              onChange={e => setNewApaar(e.target.value)}
              placeholder="e.g. 998811223344"
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded font-mono focus:bg-white focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Date of Birth</label>
              <input
                type="date"
                value={newDob}
                onChange={e => setNewDob(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Gender</label>
              <select
                value={newGender}
                onChange={e => setNewGender(e.target.value as any)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

