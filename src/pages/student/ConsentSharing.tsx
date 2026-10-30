import React from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

export const ConsentSharing: React.FC = () => {
  const {
    students,
    verificationRequests,
    updateStudentConsent,
    setRole
  } = useDemoSession();

  const navigate = useNavigate();

  // Aarav Sharma demo account
  const student = students.find(s => s.id === 'stu-aarav-01') || students[0];
  const myRequests = verificationRequests.filter(r => r.studentId === student.id);

  const handleApproveAndJumpToStakeholder = (requestId: string) => {
    updateStudentConsent(requestId, 'Approved');
    alert('Consent Approved! Switching you to Stakeholder Verification Portal to inspect the verified outcome.');
    setRole('stakeholder');
    navigate('/stakeholder/results');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Consent & Third-Party Record Sharing</h1>
            <Badge variant="indigo">Scenario F (Consent-Gate)</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Authorize or deny prospective employers and background verification teams access to your verified academic records.
          </p>
        </div>
      </div>

      {/* Governance & DPDP Boundary Notice */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5 text-slate-700">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Lock className="w-4 h-4 text-blue-600" />
          <span>Consent Architecture & DPDP Act Alignment:</span>
        </div>
        <p className="leading-relaxed">
          Student consent governs <strong>third-party employer background checks</strong> and <strong>optional external document retrieval</strong>. 
          AICTE mandatory institutional enrolment reporting does <em>not</em> depend on opt-in student consent, 
          ensuring regulatory compliance records cannot be arbitrarily revoked or concealed.
        </p>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {myRequests.map(req => {
          const isPending = req.consentStatus === 'Pending Approval';
          const isApproved = req.consentStatus === 'Approved';
          const isRejected = req.consentStatus === 'Rejected';

          return (
            <Card key={req.id} className={isPending ? 'border-amber-300 ring-1 ring-amber-200' : ''}>
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-600" />
                      <h3 className="text-sm font-bold text-slate-900">{req.requestingOrg}</h3>
                      <Badge variant={isApproved ? 'teal' : isPending ? 'amber' : 'red'}>
                        {req.consentStatus}
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-600">
                      <strong>Purpose:</strong> {req.purpose}
                    </p>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Requested Academic Attributes:
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {req.requestedFields.map((f, fi) => (
                          <span key={fi} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] border border-slate-200">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1 flex items-center gap-4 text-[11px] text-slate-500 font-mono">
                      <span>Token: {req.token}</span>
                      <span>Requested: {req.requestDate}</span>
                      <span>Valid until: {req.expiryDate}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {isPending ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<XCircle className="w-3.5 h-3.5 text-red-600" />}
                          onClick={() => updateStudentConsent(req.id, 'Rejected')}
                        >
                          Deny
                        </Button>
                        <Button
                          variant="success"
                          size="sm"
                          icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                          onClick={() => handleApproveAndJumpToStakeholder(req.id)}
                        >
                          Approve & View Result
                        </Button>
                      </>
                    ) : isApproved ? (
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<RotateCcw className="w-3.5 h-3.5 text-amber-600" />}
                        onClick={() => updateStudentConsent(req.id, 'Revoked')}
                      >
                        Revoke Consent
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStudentConsent(req.id, 'Approved')}
                      >
                        Re-Authorize
                      </Button>
                    )}
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

