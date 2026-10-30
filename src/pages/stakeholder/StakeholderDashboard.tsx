import React from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  Briefcase,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  ShieldCheck,
  ArrowRight,
  FileText,
  Building2,
  Sparkles
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

export const StakeholderDashboard: React.FC = () => {
  const { verificationRequests, loadScenario } = useDemoSession();
  const navigate = useNavigate();

  const totalRequests = verificationRequests.length;
  const pendingCount = verificationRequests.filter(r => r.consentStatus === 'Pending Approval').length;
  const approvedCount = verificationRequests.filter(r => r.consentStatus === 'Approved').length;
  const verifiedCount = verificationRequests.filter(r => r.resultStatus === 'Verified').length;
  const rejectedCount = verificationRequests.filter(r => r.consentStatus === 'Rejected' || r.consentStatus === 'Revoked').length;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            TCS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900">Tata Consultancy Services</h1>
              <Badge variant="teal">Authorized Background Verifier</Badge>
            </div>
            <p className="text-xs text-slate-500">
              Talent Acquisition & Global Background Verification (BGV) Desk · Verification Account #TC-99120
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5 text-blue-600" />}
            onClick={() => loadScenario('F')}
          >
            Scenario F (Consent)
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Search className="w-3.5 h-3.5" />}
            onClick={() => navigate('/stakeholder/new-request')}
          >
            New Verification Request
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatCard
          title="Total Inquiries"
          value={totalRequests}
          subtitle="Processed requests"
          icon={<Briefcase className="w-4 h-4" />}
        />
        <StatCard
          title="Pending Student Consent"
          value={pendingCount}
          subtitle="Awaiting authorization"
          icon={<Clock className="w-4 h-4" />}
          alert={pendingCount > 0}
          changeType={pendingCount > 0 ? 'warning' : 'neutral'}
        />
        <StatCard
          title="Consent Approved"
          value={approvedCount}
          subtitle="Authorized by student"
          icon={<ShieldCheck className="w-4 h-4" />}
          changeType="positive"
        />
        <StatCard
          title="Completed Verifications"
          value={verifiedCount}
          subtitle="Record matched"
          icon={<CheckCircle2 className="w-4 h-4" />}
          changeType="positive"
        />
        <StatCard
          title="Rejected / Expired"
          value={rejectedCount}
          subtitle="Denied by candidate"
          icon={<XCircle className="w-4 h-4" />}
          changeType="negative"
        />
      </div>

      {/* Requests Table Panel */}
      <Card>
        <CardHeader action={
          <button
            onClick={() => navigate('/stakeholder/history')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            View Complete History →
          </button>
        }>
          <CardTitle>Recent Background Verification Inquiries</CardTitle>
          <CardDescription>Status of student consent authorization and credential verification</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Verification Token</th>
                  <th className="py-3 px-4">Candidate Name</th>
                  <th className="py-3 px-4">Purpose</th>
                  <th className="py-3 px-4">Consent Status</th>
                  <th className="py-3 px-4">Verification Outcome</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {verificationRequests.map(req => {
                  const isApproved = req.consentStatus === 'Approved';
                  const isPending = req.consentStatus === 'Pending Approval';

                  return (
                    <tr key={req.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-blue-900">
                        {req.token}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {req.studentName}
                        <span className="block text-[10px] font-mono text-slate-400">{req.apaarIdMasked}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                        {req.purpose}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={isApproved ? 'teal' : isPending ? 'amber' : 'red'}>
                          {req.consentStatus}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {req.resultStatus === 'Verified' ? (
                          <span className="text-teal-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                          </span>
                        ) : (
                          <span className="text-amber-700 font-medium flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Awaiting Consent
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant={isApproved ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => navigate('/stakeholder/results')}
                        >
                          {isApproved ? 'Inspect Results →' : 'View Status'}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

