import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import { Institution } from '../../types';
import {
  Building2,
  Search,
  Filter,
  Eye,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  BookOpen,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Drawer } from '../../components/common/Drawer';
import { getStatusBadgeClass } from '../../utils/formatters';
import { exportToCSV } from '../../utils/csvExport';

export const InstitutionManagement: React.FC = () => {
  const { institutions, findings, submissionBatches } = useDemoSession();

  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedGroup, setSelectedGroup] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [activeInstitution, setActiveInstitution] = useState<Institution | null>(null);

  const filteredInstitutions = institutions.filter(inst => {
    const matchesSearch =
      inst.name.toLowerCase().includes(search.toLowerCase()) ||
      inst.code.toLowerCase().includes(search.toLowerCase()) ||
      inst.district.toLowerCase().includes(search.toLowerCase());

    const matchesState = selectedState === 'ALL' || inst.state === selectedState;
    const matchesGroup = selectedGroup === 'ALL' || inst.reportingGroup === selectedGroup;
    const matchesStatus = selectedStatus === 'ALL' || inst.validationStatus === selectedStatus;

    return matchesSearch && matchesState && matchesGroup && matchesStatus;
  });

  const states = Array.from(new Set(institutions.map(i => i.state)));

  const handleExport = () => {
    const rows = filteredInstitutions.map(i => ({
      Institution_Code: i.code,
      Institution_Name: i.name,
      State: i.state,
      District: i.district,
      Type: i.institutionType,
      Reporting_Group: i.reportingGroup,
      Approval_Status: i.approvalStatus,
      Courses_Count: i.courses.length,
      Total_Intake: i.courses.reduce((acc, c) => acc + c.approvedIntake, 0),
      Submission_Status: i.submissionStatus,
      Validation_Status: i.validationStatus,
      Last_Submission: i.lastSubmission
    }));
    exportToCSV('AICTE_Institutions_Report', rows);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Institution Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor AICTE-approved institutions across reporting groups: Regular Technical, PGDM/PGCM and ODL/Online.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={handleExport}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search institution name, code or district..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
              />
            </div>

            {/* State Filter */}
            <div>
              <select
                value={selectedState}
                onChange={e => setSelectedState(e.target.value)}
                className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:bg-white"
              >
                <option value="ALL">All States</option>
                {states.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Reporting Group */}
            <div>
              <select
                value={selectedGroup}
                onChange={e => setSelectedGroup(e.target.value)}
                className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:bg-white"
              >
                <option value="ALL">All Reporting Groups</option>
                <option value="Regular Technical">Regular Technical</option>
                <option value="PGDM/PGCM">PGDM/PGCM</option>
                <option value="ODL/Online">ODL/Online</option>
              </select>
            </div>

            {/* Validation Status */}
            <div>
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:bg-white"
              >
                <option value="ALL">All Validation Statuses</option>
                <option value="Verified">Verified</option>
                <option value="Needs Review">Needs Review</option>
                <option value="Warnings">Warnings</option>
                <option value="Blocking Errors">Blocking Errors</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Institutions Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Code / ID</th>
                <th className="py-3 px-4">Institution Name</th>
                <th className="py-3 px-4">State & Type</th>
                <th className="py-3 px-4">Reporting Group</th>
                <th className="py-3 px-4 text-center">Approved Courses</th>
                <th className="py-3 px-4">Submission Status</th>
                <th className="py-3 px-4">Validation Status</th>
                <th className="py-3 px-4">Last Submission</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInstitutions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No institutions match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredInstitutions.map(inst => (
                  <tr key={inst.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-slate-900">
                      {inst.code}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-900">{inst.name}</p>
                      <p className="text-[11px] text-slate-400">{inst.district}, {inst.state}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-700">{inst.state}</span>
                      <span className="block text-[10px] text-slate-400">{inst.institutionType}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="indigo" size="sm">{inst.reportingGroup}</Badge>
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-slate-800">
                      {inst.courses.length}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] border ${getStatusBadgeClass(inst.submissionStatus)}`}>
                        {inst.submissionStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] border ${getStatusBadgeClass(inst.validationStatus)}`}>
                        {inst.validationStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {inst.lastSubmission}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Eye className="w-3 h-3" />}
                        onClick={() => setActiveInstitution(inst)}
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Institution Detail Drawer */}
      <Drawer
        isOpen={activeInstitution !== null}
        onClose={() => setActiveInstitution(null)}
        title={activeInstitution?.name || 'Institution Details'}
        subtitle={`AICTE Permanent ID: ${activeInstitution?.code} · ${activeInstitution?.district}, ${activeInstitution?.state}`}
        width="2xl"
      >
        {activeInstitution && (
          <div className="space-y-6">
            {/* Quick Profile Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Approval Status</span>
                <span className="text-xs font-bold text-teal-700">{activeInstitution.approvalStatus}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Reporting Group</span>
                <span className="text-xs font-bold text-slate-800">{activeInstitution.reportingGroup}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Institution Type</span>
                <span className="text-xs font-bold text-slate-800">{activeInstitution.institutionType}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Contact Email</span>
                <span className="text-xs font-mono text-slate-700 truncate block">{activeInstitution.contactEmail}</span>
              </div>
            </div>

            {/* Approved Courses and Intake Breakdown */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Approved Courses & Sanctioned Intake Capacity
              </h4>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Course Code & Name</th>
                      <th className="py-2.5 px-3">Level</th>
                      <th className="py-2.5 px-3 text-right">Approved Intake</th>
                      <th className="py-2.5 px-3 text-right">Actual Enrolment</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeInstitution.courses.map(course => (
                      <tr key={course.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3">
                          <p className="font-semibold text-slate-900">{course.name}</p>
                          <span className="text-[10px] font-mono text-slate-400">{course.code}</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <Badge variant="slate" size="sm">{course.level}</Badge>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">
                          {course.approvedIntake}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-semibold text-blue-700">
                          {course.actualEnrolment}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${getStatusBadgeClass(course.ruleStatus)}`}>
                            {course.ruleStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Historical Fill-Rate Trend */}
            {activeInstitution.historicalEnrolment && (
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Historical Enrolment & Fill-Rate Trajectory
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {activeInstitution.historicalEnrolment.map(h => (
                    <div
                      key={h.year}
                      className={`p-3 rounded-lg border text-center ${
                        h.fillRate < 50
                          ? 'bg-red-50/60 border-red-200 text-red-900'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">{h.year}</span>
                      <span className="text-base font-extrabold block mt-0.5">{h.fillRate}%</span>
                      <span className="text-[10px] text-slate-500 block">
                        {h.enrolled} / {h.intake} seats
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Open Findings */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Active Exceptions & Findings for this Institution
              </h4>
              {findings.filter(f => f.institutionId === activeInstitution.id).length === 0 ? (
                <div className="p-4 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>No outstanding exceptions or regulatory cap breaches recorded for this institution.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {findings
                    .filter(f => f.institutionId === activeInstitution.id)
                    .map(finding => (
                      <div key={finding.id} className="p-3 bg-white border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-blue-900">{finding.id}</span>
                          <Badge variant={finding.severity === 'High' ? 'red' : 'amber'} size="sm">
                            {finding.severity}
                          </Badge>
                        </div>
                        <p className="text-xs font-semibold text-slate-900 mt-1">{finding.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{finding.description}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

