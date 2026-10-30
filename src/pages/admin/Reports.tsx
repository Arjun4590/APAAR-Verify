import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  FileText,
  Download,
  Building2,
  BookOpen,
  MapPin,
  CheckCircle,
  AlertTriangle,
  History,
  TrendingDown,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { exportToCSV } from '../../utils/csvExport';

export const Reports: React.FC = () => {
  const { institutions, students, findings, auditLogs } = useDemoSession();

  const [activeReportKey, setActiveReportKey] = useState<string>('INSTITUTION_ENROLMENT');

  const reportCards = [
    {
      id: 'INSTITUTION_ENROLMENT',
      title: 'Institution-wise Enrolment',
      description: 'Approved intake capacity versus student-level verified admissions per institution.',
      icon: Building2,
      count: `${institutions.length} Institutions`
    },
    {
      id: 'COURSE_ENROLMENT',
      title: 'Course-wise Intake Compliance',
      description: 'Discipline-level regular and supernumerary enrolment breakdown against statutory caps.',
      icon: BookOpen,
      count: 'All Approved Programmes'
    },
    {
      id: 'STATE_ENROLMENT',
      title: 'State-wise Regional Distribution',
      description: 'Geographical macro-aggregates across Maharashtra, Delhi, Karnataka, Tamil Nadu, etc.',
      icon: MapPin,
      count: '6 States'
    },
    {
      id: 'APAAR_SUMMARY',
      title: 'APAAR Validation Summary',
      description: '12-digit format check accuracy, missing identifiers, and simulated identity verification.',
      icon: CheckCircle,
      count: `${students.length} Records`
    },
    {
      id: 'DUPLICATE_FINDINGS',
      title: 'Duplicate & Dual Enrolment Log',
      description: 'Cross-institutional exact APAAR matches and fuzzy identity candidates.',
      icon: Layers,
      count: `${findings.filter(f => f.type === 'DUAL_ENROLMENT' || f.type === 'FUZZY_IDENTITY').length} Findings`
    },
    {
      id: 'ANOMALY_REPORT',
      title: 'Institutional Anomaly Signals',
      description: 'Multi-year fill-rate cliff warnings, withdrawal spikes, and peer benchmarking metrics.',
      icon: TrendingDown,
      count: 'Risk Signals'
    }
  ];

  const handleExportCurrent = () => {
    if (activeReportKey === 'INSTITUTION_ENROLMENT') {
      const data = institutions.map(i => ({
        Code: i.code,
        Name: i.name,
        State: i.state,
        Group: i.reportingGroup,
        Courses: i.courses.length,
        Total_Approved_Intake: i.courses.reduce((acc, c) => acc + c.approvedIntake, 0),
        Total_Enrolment: i.courses.reduce((acc, c) => acc + c.actualEnrolment, 0),
        Validation_Status: i.validationStatus
      }));
      exportToCSV('Report_Institution_Enrolment', data);
    } else if (activeReportKey === 'COURSE_ENROLMENT') {
      const data: any[] = [];
      institutions.forEach(i => {
        i.courses.forEach(c => {
          data.push({
            Institution: i.name,
            Course_Code: c.code,
            Course_Name: c.name,
            Level: c.level,
            Approved_Intake: c.approvedIntake,
            Actual_Enrolment: c.actualEnrolment,
            Compliance_Status: c.ruleStatus
          });
        });
      });
      exportToCSV('Report_Course_Compliance', data);
    } else if (activeReportKey === 'APAAR_SUMMARY') {
      const data = students.map(s => ({
        Student_ID: s.studentNumber,
        Name: s.name,
        DOB: s.dateOfBirth,
        APAAR_ID: s.apaarId ? `•••• •••• ${s.apaarId.slice(-4)}` : 'Missing',
        Status: s.currentStatus,
        Verification: s.verificationStatus
      }));
      exportToCSV('Report_APAAR_Validation_Summary', data);
    } else {
      const data = findings.map(f => ({
        Case_ID: f.id,
        Type: f.type,
        Title: f.title,
        Severity: f.severity,
        Status: f.status,
        Institution: f.institutionName,
        Date: f.createdAt
      }));
      exportToCSV('Report_Findings_Export', data);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Compliance & Analytics Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-grade reporting modules with filtered tabular views and instant CSV dataset exports.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<Download className="w-3.5 h-3.5" />}
          onClick={handleExportCurrent}
        >
          Export Active Report to CSV
        </Button>
      </div>

      {/* Report Selector Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {reportCards.map(r => {
          const Icon = r.icon;
          const isSelected = activeReportKey === r.id;
          return (
            <div
              key={r.id}
              onClick={() => setActiveReportKey(r.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50/70 border-blue-500 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <Badge variant={isSelected ? 'indigo' : 'slate'} size="sm">
                    {r.count}
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{r.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{r.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Report Preview Table */}
      <Card>
        <CardHeader action={
          <span className="text-xs text-slate-500">Live Preview from Seed Dataset</span>
        }>
          <CardTitle>
            Active Preview: {reportCards.find(r => r.id === activeReportKey)?.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto max-h-96">
            {activeReportKey === 'INSTITUTION_ENROLMENT' && (
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase border-b border-slate-200 sticky top-0">
                  <tr>
                    <th className="py-2.5 px-4">Code</th>
                    <th className="py-2.5 px-4">Institution Name</th>
                    <th className="py-2.5 px-4">State</th>
                    <th className="py-2.5 px-4">Group</th>
                    <th className="py-2.5 px-4 text-right">Approved Intake</th>
                    <th className="py-2.5 px-4 text-right">Reported Enrolment</th>
                    <th className="py-2.5 px-4">Validation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {institutions.map(i => {
                    const intake = i.courses.reduce((acc, c) => acc + c.approvedIntake, 0);
                    const enrolled = i.courses.reduce((acc, c) => acc + c.actualEnrolment, 0);
                    return (
                      <tr key={i.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-mono font-medium">{i.code}</td>
                        <td className="py-2.5 px-4 font-semibold text-slate-900">{i.name}</td>
                        <td className="py-2.5 px-4">{i.state}</td>
                        <td className="py-2.5 px-4">{i.reportingGroup}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold">{intake}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-blue-700">{enrolled}</td>
                        <td className="py-2.5 px-4">
                          <Badge variant={i.validationStatus === 'Verified' ? 'teal' : 'amber'} size="sm">
                            {i.validationStatus}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {activeReportKey === 'COURSE_ENROLMENT' && (
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase border-b border-slate-200 sticky top-0">
                  <tr>
                    <th className="py-2.5 px-4">Institution</th>
                    <th className="py-2.5 px-4">Course Name & Code</th>
                    <th className="py-2.5 px-4">Level</th>
                    <th className="py-2.5 px-4 text-right">Approved Intake</th>
                    <th className="py-2.5 px-4 text-right">Actual Enrolled</th>
                    <th className="py-2.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {institutions.flatMap(i =>
                    i.courses.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-medium text-slate-800">{i.name}</td>
                        <td className="py-2.5 px-4">
                          <span className="font-semibold block">{c.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">{c.code}</span>
                        </td>
                        <td className="py-2.5 px-4">{c.level}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold">{c.approvedIntake}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-blue-700">{c.actualEnrolment}</td>
                        <td className="py-2.5 px-4">
                          <Badge variant={c.ruleStatus === 'Within Cap' ? 'teal' : 'amber'} size="sm">
                            {c.ruleStatus}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {(activeReportKey === 'APAAR_SUMMARY' || activeReportKey === 'DUPLICATE_FINDINGS' || activeReportKey === 'ANOMALY_REPORT') && (
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase border-b border-slate-200 sticky top-0">
                  <tr>
                    <th className="py-2.5 px-4">Case Ref</th>
                    <th className="py-2.5 px-4">Type</th>
                    <th className="py-2.5 px-4">Title & Description</th>
                    <th className="py-2.5 px-4">Severity</th>
                    <th className="py-2.5 px-4">Review Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {findings.map(f => (
                    <tr key={f.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-mono font-bold text-blue-900">{f.id}</td>
                      <td className="py-2.5 px-4 font-medium">{f.type}</td>
                      <td className="py-2.5 px-4">
                        <span className="font-semibold block">{f.title}</span>
                        <span className="text-[11px] text-slate-500 line-clamp-1">{f.description}</span>
                      </td>
                      <td className="py-2.5 px-4">
                        <Badge variant={f.severity === 'High' ? 'red' : 'amber'} size="sm">
                          {f.severity}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-4">{f.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

