import React from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  QrCode,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Info
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { maskApaar } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

export const QRVerification: React.FC = () => {
  const { students, setRole } = useDemoSession();
  const navigate = useNavigate();

  const student = students.find(s => s.id === 'stu-aarav-01') || students[0];
  const mockToken = 'VRF-2026-8821';
  const verificationUrl = `${window.location.origin}/stakeholder/results?token=${mockToken}`;

  const handleOpenStakeholderRoute = () => {
    setRole('stakeholder');
    navigate('/stakeholder/results');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    alert('Verification URL copied to clipboard: ' + verificationUrl);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto text-center">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Digital QR Credential Route</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Dynamic cryptographic route token for employer and institutional background verification.
        </p>
      </div>

      {/* Main QR Card */}
      <Card className="p-6">
        <CardContent className="space-y-6 flex flex-col items-center">
          {/* Simulated QR Code SVG Graphic */}
          <div className="p-4 bg-white border-2 border-slate-900 rounded-2xl shadow-md inline-block">
            <svg
              className="w-48 h-48"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Corner position markers */}
              <rect x="5" y="5" width="25" height="25" rx="3" stroke="#0f172a" strokeWidth="4" fill="none" />
              <rect x="11" y="11" width="13" height="13" rx="1" fill="#0f172a" />

              <rect x="70" y="5" width="25" height="25" rx="3" stroke="#0f172a" strokeWidth="4" fill="none" />
              <rect x="76" y="11" width="13" height="13" rx="1" fill="#0f172a" />

              <rect x="5" y="70" width="25" height="25" rx="3" stroke="#0f172a" strokeWidth="4" fill="none" />
              <rect x="11" y="76" width="13" height="13" rx="1" fill="#0f172a" />

              {/* Data matrix pattern simulation */}
              <rect x="36" y="8" width="6" height="6" fill="#0f172a" />
              <rect x="46" y="8" width="6" height="6" fill="#0f172a" />
              <rect x="56" y="8" width="6" height="6" fill="#0f172a" />

              <rect x="36" y="20" width="6" height="6" fill="#0f172a" />
              <rect x="50" y="20" width="6" height="6" fill="#0f172a" />

              <rect x="8" y="36" width="6" height="6" fill="#0f172a" />
              <rect x="20" y="36" width="6" height="6" fill="#0f172a" />
              <rect x="36" y="36" width="12" height="12" rx="2" fill="#2563eb" />
              <rect x="54" y="36" width="6" height="6" fill="#0f172a" />
              <rect x="66" y="36" width="6" height="6" fill="#0f172a" />
              <rect x="78" y="36" width="6" height="6" fill="#0f172a" />

              <rect x="8" y="50" width="6" height="6" fill="#0f172a" />
              <rect x="20" y="50" width="6" height="6" fill="#0f172a" />
              <rect x="36" y="54" width="6" height="6" fill="#0f172a" />
              <rect x="50" y="50" width="12" height="12" rx="2" fill="#0d9488" />
              <rect x="70" y="50" width="6" height="6" fill="#0f172a" />
              <rect x="84" y="50" width="6" height="6" fill="#0f172a" />

              <rect x="36" y="70" width="6" height="6" fill="#0f172a" />
              <rect x="50" y="74" width="6" height="6" fill="#0f172a" />
              <rect x="66" y="70" width="6" height="6" fill="#0f172a" />
              <rect x="80" y="74" width="6" height="6" fill="#0f172a" />

              <rect x="36" y="84" width="6" height="6" fill="#0f172a" />
              <rect x="46" y="84" width="6" height="6" fill="#0f172a" />
              <rect x="60" y="84" width="6" height="6" fill="#0f172a" />
              <rect x="76" y="84" width="6" height="6" fill="#0f172a" />
            </svg>
          </div>

          {/* Student Identification Meta */}
          <div>
            <p className="font-extrabold text-base text-slate-900">{student.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Ref: <span className="font-mono text-slate-700">{student.studentNumber}</span> · 
              APAAR: <span className="font-mono text-blue-900 font-bold">{maskApaar(student.apaarId)}</span>
            </p>
            <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200 mt-2 inline-block">
              Token: {mockToken}
            </span>
          </div>

          {/* Mandatory Public Sector Integrity Notice */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-950 text-left space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-amber-800">
              <Info className="w-3.5 h-3.5" />
              Essential Public Sector Architectural Principle:
            </span>
            <p className="leading-relaxed">
              <strong>The QR code is a secure routing shortcut to the authorized verification endpoint; it does not independently prove current enrolment.</strong> 
              Scanning or following this route requires active student consent and retrieves live institutional enrolment state.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={<Copy className="w-3.5 h-3.5" />} onClick={handleCopyLink}>
              Copy Verification URL
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              onClick={handleOpenStakeholderRoute}
            >
              Open Stakeholder Verification View →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

