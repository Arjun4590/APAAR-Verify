import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Building2,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

export const NewVerificationRequest: React.FC = () => {
  const {
    students,
    verificationRequests,
    submitStakeholderVerificationRequest,
    setRole
  } = useDemoSession();

  const navigate = useNavigate();

  const [studentToken, setStudentToken] = useState('VRF-2026-8821');
  const [orgName, setOrgName] = useState('Tata Consultancy Services (Talent Acquisition & BGV)');
  const [purpose, setPurpose] = useState('Campus Placement Pre-onboarding Background Verification');
  const [selectedFields, setSelectedFields] = useState<string[]>([
    'Full Legal Name & Date of Birth',
    'Enrolled Institution Name',
    'Degree Programme & Branch',
    'Current Enrolment Status'
  ]);

  const [submittedRequest, setSubmittedRequest] = useState<any | null>(null);

  const handleToggleField = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = verificationRequests.find(r => r.token === studentToken);

    if (existing) {
      setSubmittedRequest(existing);
    } else {
      const created = submitStakeholderVerificationRequest({
        studentReference: studentToken,
        orgName,
        purpose,
        fields: selectedFields
      });
      setSubmittedRequest(created);
    }
  };

  const handleSwitchToStudentToApprove = () => {
    setRole('student');
    navigate('/student/consent');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Initiate Background Verification Request</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Submit candidate reference token to verify authentic academic enrolment via APAAR-Verify.
        </p>
      </div>

      {/* Outcome Banner after submission */}
      {submittedRequest && (
        <Card className={submittedRequest.consentStatus === 'Approved' ? 'border-teal-300 bg-teal-50/30' : 'border-amber-300 bg-amber-50/30'}>
          <CardContent className="p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900">
                Inquiry Status: {submittedRequest.token} ({submittedRequest.studentName})
              </span>
              <Badge variant={submittedRequest.consentStatus === 'Approved' ? 'teal' : 'amber'}>
                {submittedRequest.consentStatus}
              </Badge>
            </div>

            {submittedRequest.consentStatus === 'Approved' ? (
              <div className="space-y-2">
                <p className="text-teal-900 leading-relaxed">
                  Candidate has granted authorization for this inquiry. Verified institutional enrolment credentials are now available.
                </p>
                <Button
                  variant="success"
                  size="sm"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  onClick={() => navigate('/stakeholder/results')}
                >
                  View Verified Results Dossier →
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-amber-900 leading-relaxed">
                  This request is currently <strong>Awaiting Candidate Consent</strong> in the Student Portal. 
                  In accordance with privacy and DPDP Act principles, credentials are protected until the student authorizes access.
                </p>
                <div className="p-2.5 bg-white/80 rounded border border-amber-200 text-slate-700 text-[11px]">
                  <span>Status: Notification dispatched to candidate. Record will become accessible once approved in the Student Portal.</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Request Form */}
      <Card>
        <CardHeader>
          <CardTitle>Inquiry Specification Form</CardTitle>
          <CardDescription>Enter candidate reference token provided on their resume or digital credential</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Candidate Verification Token / Reference ID
              </label>
              <input
                type="text"
                value={studentToken}
                onChange={e => setStudentToken(e.target.value)}
                className="w-full p-2 font-mono text-xs bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none"
                placeholder="e.g. VRF-2026-8821"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Candidate digital credential reference token (e.g. <code className="text-blue-900 font-bold">VRF-2026-8821</code>)
              </span>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Requesting Verifier Organization</label>
              <input
                type="text"
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
                className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Verification Purpose</label>
              <input
                type="text"
                value={purpose}
                onChange={e => setPurpose(e.target.value)}
                className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-2">Requested Academic Attributes</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Full Legal Name & Date of Birth',
                  'Enrolled Institution Name',
                  'Degree Programme & Branch',
                  'Current Enrolment Status',
                  'Year of Admission',
                  'Mode of Instruction (Physical/Online)'
                ].map(field => (
                  <label
                    key={field}
                    className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFields.includes(field)}
                      onChange={() => handleToggleField(field)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-700 text-xs">{field}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="primary" size="md" icon={<Search className="w-3.5 h-3.5" />} type="submit">
                Validate Token & Submit Inquiry
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

