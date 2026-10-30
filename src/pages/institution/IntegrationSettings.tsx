import React, { useState } from 'react';
import {
  Database,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const IntegrationSettings: React.FC = () => {
  const [testing, setTesting] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; message: string; timestamp: string } | null>(null);

  const handleTestConnector = (id: string, name: string) => {
    setTesting(id);
    setTimeout(() => {
      setTesting(null);
      setTestResult({
        id,
        message: `Simulated Handshake Success: ${name} responded with status HTTP 200 OK (Latency: 42ms). Mode: Simulated Mock Adapter.`,
        timestamp: new Date().toLocaleTimeString()
      });
    }, 700);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">External Adapters & Integration Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure simulated adapters for APAAR/ABC, DigiLocker/NAD, ERP systems, and AICTE reporting endpoints.
        </p>
      </div>

      {/* Security Rule Banner */}
      <div className="p-4 bg-slate-900 text-slate-200 rounded-lg text-xs space-y-1 border border-slate-800">
        <div className="flex items-center gap-2 font-bold text-white">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Strict Demo Security Constraint:</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          No live government credentials, API tokens, or Aadhaar numbers are collected or stored. 
          All connectors execute deterministic in-browser mock adapters clearly marked as <strong>Simulated</strong>.
        </p>
      </div>

      {/* Test Result Alert if triggered */}
      {testResult && (
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-950 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <div>
              <p className="font-bold">Connector Test Outcome:</p>
              <p className="text-teal-900 mt-0.5">{testResult.message}</p>
              <span className="text-[10px] text-teal-700 font-mono mt-1 block">Tested at: {testResult.timestamp}</span>
            </div>
          </div>
          <button onClick={() => setTestResult(null)} className="text-teal-700 font-bold hover:text-teal-900">
            ×
          </button>
        </div>
      )}

      {/* Connectors Grid */}
      <div className="space-y-4">
        {/* Connector 1: APAAR / ABC */}
        <Card>
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">MoE APAAR / ABC Identity Connector</h3>
                  <Badge variant="amber">Simulated Adapter</Badge>
                </div>
                <p className="text-xs text-slate-500">
                  Validates 12-digit numeric format and simulates real-time student identity matching against synthetic records.
                </p>
                <span className="text-[10px] text-slate-400 block font-mono">
                  Endpoint: simulated://moe-apaar.gov.in/api/v2/verify (Local Mock)
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={<RefreshCw className={`w-3.5 h-3.5 ${testing === 'apaar' ? 'animate-spin' : ''}`} />}
                onClick={() => handleTestConnector('apaar', 'MoE APAAR Connector')}
                disabled={testing !== null}
              >
                {testing === 'apaar' ? 'Testing...' : 'Test Connection'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Connector 2: DigiLocker / NAD */}
        <Card>
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">DigiLocker / NAD Academic Repository</h3>
                  <Badge variant="amber">Simulated Adapter</Badge>
                </div>
                <p className="text-xs text-slate-500">
                  Retrieves prior diploma and degree certificates for lateral entry verification (with student consent).
                </p>
                <span className="text-[10px] text-slate-400 block font-mono">
                  Endpoint: simulated://nad.digilocker.gov.in/api/v1/certificates (Local Mock)
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={<RefreshCw className={`w-3.5 h-3.5 ${testing === 'nad' ? 'animate-spin' : ''}`} />}
                onClick={() => handleTestConnector('nad', 'DigiLocker/NAD Connector')}
                disabled={testing !== null}
              >
                {testing === 'nad' ? 'Testing...' : 'Test Connection'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Connector 3: Institutional ERP */}
        <Card>
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">Institutional ERP Ingestion Bridge</h3>
                  <Badge variant="teal">Active Staging Area</Badge>
                </div>
                <p className="text-xs text-slate-500">
                  In-memory staging buffer that parses batch files into <code>upload_batch_rows</code> before commit.
                </p>
                <span className="text-[10px] text-slate-400 block font-mono">
                  Mode: Browser LocalSession Persistence
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={<RefreshCw className={`w-3.5 h-3.5 ${testing === 'erp' ? 'animate-spin' : ''}`} />}
                onClick={() => handleTestConnector('erp', 'Local ERP Staging Bridge')}
                disabled={testing !== null}
              >
                {testing === 'erp' ? 'Testing...' : 'Test Pipeline'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

