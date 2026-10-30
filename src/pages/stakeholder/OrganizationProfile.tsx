import React from 'react';
import {
  Briefcase,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const OrganizationProfile: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Organization Profile & Verification Accreditation</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Authorized verifier credential registration, DPDP compliance agreement and employer account details.
        </p>
      </div>

      <Card>
        <CardHeader action={
          <Badge variant="teal">Authorized Third-Party Verifier</Badge>
        }>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-lg">
              TCS
            </div>
            <div>
              <CardTitle>Tata Consultancy Services Limited</CardTitle>
              <CardDescription>
                Talent Acquisition, Campus Relations & Global Background Verification (BGV)
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Account ID</span>
              <span className="font-mono font-bold text-slate-900 text-sm">TCS-BGV-99120</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Accreditation Tier</span>
              <span className="font-bold text-blue-900 text-sm">Tier 1 Enterprise Verifier</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Audit Compliance</span>
              <span className="font-bold text-teal-700 text-sm">Verified & Active</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-xs">Data Usage & Protection Agreement:</span>
            <p className="text-slate-600 leading-relaxed">
              In accordance with Digital Personal Data Protection principles, all inquiries processed through 
              this portal require prior candidate authorization. Credential data retrieved via APAAR-Verify 
              is restricted strictly to the stated employment verification purpose.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

