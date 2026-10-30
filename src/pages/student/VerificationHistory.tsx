import React from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  History,
  Building2,
  CheckCircle2,
  Lock,
  Download,
  Calendar
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { exportToCSV } from '../../utils/csvExport';

export const VerificationHistory: React.FC = () => {
  const { verificationRequests, students } = useDemoSession();
  const student = students.find(s => s.id === 'stu-aarav-01') || students[0];
  const myRequests = verificationRequests.filter(r => r.studentId === student.id);

  const handleExport = () => {
    const data = myRequests.map(r => ({
      Token: r.token,
      Organization: r.requestingOrg,
      Purpose: r.purpose,
      Date: r.requestDate,
      Consent_Status: r.consentStatus,
      Verification_Outcome: r.resultStatus,
      Source: r.source
    }));
    exportToCSV('Student_Verification_Access_Log', data);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Third-Party Verification Access History</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit trail of authorized employers and third-party credential inquiries processed under your consent.
          </p>
        </div>
        <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={handleExport}>
          Export Access Log
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Verification Token</th>
                <th className="py-3 px-4">Requesting Organization</th>
                <th className="py-3 px-4">Purpose</th>
                <th className="py-3 px-4">Requested On</th>
                <th className="py-3 px-4">Consent</th>
                <th className="py-3 px-4">Outcome</th>
                <th className="py-3 px-4">Verification Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myRequests.map(req => (
                <tr key={req.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-blue-900">
                    {req.token}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {req.requestingOrg}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {req.purpose}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                    {req.requestDate}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={req.consentStatus === 'Approved' ? 'teal' : req.consentStatus === 'Pending Approval' ? 'amber' : 'red'} size="sm">
                      {req.consentStatus}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {req.resultStatus === 'Verified' ? (
                      <span className="text-teal-700 font-bold">Verified</span>
                    ) : (
                      <span className="text-slate-400">Pending Consent</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">
                    {req.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

