import React from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  CheckCircle2,
  ShieldCheck,
  Building2,
  Calendar,
  Lock,
  Download,
  AlertTriangle,
  QrCode,
  ArrowRight,
  FileCheck2,
  Info
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { maskApaar } from '../../utils/formatters';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const VerificationResults: React.FC = () => {
  const { students, enrolments, institutions, verificationRequests, setRole } = useDemoSession();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const tokenParam = searchParams.get('token') || 'VRF-2026-8821';
  const request = verificationRequests.find(r => r.token === tokenParam) || verificationRequests[0];

  const student = students.find(s => s.id === request?.studentId) || students[0];
  const enrolment = enrolments.find(e => e.studentId === student.id);
  const institution = institutions.find(i => i.id === student.institutionId);

  const isConsentApproved = request?.consentStatus === 'Approved';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Academic Credential Verification Dossier</h1>
            <Badge variant={isConsentApproved ? 'teal' : 'amber'}>
              Token: {request?.token || 'VRF-2026-8821'}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Authorized verification outcome retrieved for candidate {student.name}.
          </p>
        </div>

        {!isConsentApproved && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setRole('student');
              navigate('/student/consent');
            }}
          >
            Switch to Student Portal to Approve →
          </Button>
        )}
      </div>

      {/* Mandatory Accuracy & Simulation Notice */}
      <div className="p-4 bg-slate-900 text-slate-200 rounded-lg text-xs space-y-1 border border-slate-800">
        <div className="flex items-center gap-2 font-bold text-white">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Verified Demonstration Outcome (Simulated Source Adapter):</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          Source: <strong className="text-teal-400">Local Reference Repository (Simulated APAAR Connector)</strong>. 
          This report reflects verified records in the prototype database. It is not an actual live MoE APAAR, ABC, or DigiLocker API response.
        </p>
      </div>

      {/* If Consent is NOT Approved */}
      {!isConsentApproved ? (
        <Card className="border-amber-300 bg-amber-50/20">
          <CardContent className="p-8 text-center space-y-3">
            <Lock className="w-10 h-10 text-amber-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">
              Access Restricted: Candidate Consent Pending
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              In compliance with data protection requirements, third-party verifiers cannot inspect 
              institutional enrolment details until the candidate approves the inquiry in their Student Portal.
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setRole('student');
                  navigate('/student/consent');
                }}
              >
                Switch to Student Portal & Approve Consent (Scenario F Demo) →
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* If Consent IS Approved: Display Limited Authorized Fields */
        <Card className="border-teal-300 shadow-md">
          <CardHeader action={
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold border border-teal-300">
                <CheckCircle2 className="w-4 h-4 text-teal-700" />
                VERIFIED AUTHENTIC RECORD
              </span>
            </div>
          }>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-sm">
                AS
              </div>
              <div>
                <CardTitle>{student.name}</CardTitle>
                <CardDescription>
                  Verified Candidate Reference: {student.studentNumber}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 text-xs">
            {/* Authorized Academic Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Enrolled Institution</span>
                <span className="font-bold text-slate-900 text-sm block mt-0.5">{institution?.name}</span>
                <span className="text-[11px] text-slate-500">AICTE Permanent Code: {institution?.code} ({institution?.state})</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Degree Programme</span>
                <span className="font-bold text-blue-900 text-sm block mt-0.5">B.Tech Computer Science & Engineering</span>
                <span className="text-[11px] text-slate-500">Faculty of Engineering & Technology</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Academic Enrolment Status</span>
                <span className="font-bold text-teal-700 text-sm block mt-0.5">Active & Enrolled</span>
                <span className="text-[11px] text-slate-500">Academic Year: {enrolment?.academicYear || '2026-27'}</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Admission Year & Instruction Mode</span>
                <span className="font-bold text-slate-900 text-sm block mt-0.5">{student.admissionYear} · Physical Full-Time</span>
                <span className="text-[11px] text-slate-500">Day Shift: 09:00 - 16:30</span>
              </div>
            </div>

            {/* Verification Metadata Dossier */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Verification Metadata & Audit Signature
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px]">Verification Source</span>
                  <span className="font-semibold text-slate-800">Local Reference Repository</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Connector Mode</span>
                  <span className="font-semibold text-amber-700">Simulated Adapter</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Verification Timestamp</span>
                  <span className="font-mono text-slate-800">{new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Information Scope Constraint */}
            <div className="p-3 bg-slate-100 rounded text-slate-500 text-[11px] flex items-center justify-between">
              <span>Scope: Authorized strictly for employment pre-onboarding background check.</span>
              <span className="font-mono text-slate-400">Token: {request.token}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

