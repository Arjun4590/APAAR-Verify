import React from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  History,
  Search,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { exportToCSV } from '../../utils/csvExport';
import { useNavigate } from 'react-router-dom';

export const RequestHistory: React.FC = () => {
  const { verificationRequests } = useDemoSession();
  const navigate = useNavigate();

  const handleExport = () => {
    const data = verificationRequests.map(r => ({
      Token: r.token,
      Candidate: r.studentName,
      Masked_APAAR: r.apaarIdMasked,
      Purpose: r.purpose,
      Request_Date: r.requestDate,
      Expiry_Date: r.expiryDate,
      Consent_Status: r.consentStatus,
      Verification_Status: r.resultStatus
    }));
    exportToCSV('TCS_Background_Verification_History', data);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Organization Verification History</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Historical log of all credential verification inquiries submitted by Tata Consultancy Services.
          </p>
        </div>
        <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={handleExport}>
          Export Inquiries CSV
        </Button>
      </div>

      {/* History Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Verification Token</th>
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4">Verification Purpose</th>
                <th className="py-3 px-4">Submitted Date</th>
                <th className="py-3 px-4">Consent Status</th>
                <th className="py-3 px-4">Result</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {verificationRequests.map(req => (
                <tr key={req.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-blue-900">
                    {req.token}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{req.studentName}</p>
                    <span className="text-[10px] font-mono text-slate-400">{req.apaarIdMasked}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                    {req.purpose}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                    {req.requestDate}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={req.consentStatus === 'Approved' ? 'teal' : req.consentStatus === 'Pending Approval' ? 'amber' : 'red'}>
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
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Eye className="w-3 h-3" />}
                      onClick={() => navigate(`/stakeholder/results?token=${req.token}`)}
                    >
                      Dossier
                    </Button>
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

