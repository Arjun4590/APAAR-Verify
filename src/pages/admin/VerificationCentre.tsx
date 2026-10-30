import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import { Finding } from '../../types';
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Split,
  Eye,
  FileCheck,
  Scale,
  Sparkles
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Tabs } from '../../components/common/Tabs';
import { Drawer } from '../../components/common/Drawer';
import { getStatusBadgeClass } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

export const VerificationCentre: React.FC = () => {
  const { findings, loadScenario } = useDemoSession();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);

  const tabs = [
    { id: 'ALL', label: 'All Findings', count: findings.length },
    {
      id: 'DUAL_ENROLMENT',
      label: 'Exact APAAR & Dual Enrolment',
      count: findings.filter(f => f.type === 'DUAL_ENROLMENT').length
    },
    {
      id: 'FUZZY_IDENTITY',
      label: 'Fuzzy Identity Candidates',
      count: findings.filter(f => f.type === 'FUZZY_IDENTITY').length
    },
    {
      id: 'REGULATORY_CAP',
      label: 'Regulatory Caps',
      count: findings.filter(f => f.type === 'REGULATORY_CAP').length
    },
    {
      id: 'STATISTICAL_ANOMALY',
      label: 'Statistical Signals',
      count: findings.filter(f => f.type === 'STATISTICAL_ANOMALY').length
    }
  ];

  const filteredFindings = findings.filter(f => {
    if (activeTab === 'ALL') return true;
    return f.type === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">AICTE Verification Centre</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated verification results across format, exact duplicate, fuzzy identity, dual-enrolment and regulatory caps.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5 text-blue-600" />}
            onClick={() => loadScenario('B')}
          >
            Load Scenario B (Dual Mode)
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5 text-amber-600" />}
            onClick={() => loadScenario('C')}
          >
            Load Scenario C (Fuzzy Match)
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="px-4" />
        </CardContent>
      </Card>

      {/* Findings List */}
      <div className="space-y-4">
        {filteredFindings.map(finding => {
          const isFuzzy = finding.type === 'FUZZY_IDENTITY';
          const isDual = finding.type === 'DUAL_ENROLMENT';
          const isCap = finding.type === 'REGULATORY_CAP';
          const isAnomaly = finding.type === 'STATISTICAL_ANOMALY';

          return (
            <Card key={finding.id} className="hover:border-slate-300 transition-all">
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {finding.id}
                      </span>
                      <Badge variant={finding.severity === 'High' ? 'red' : finding.severity === 'Medium' ? 'amber' : 'slate'} size="sm">
                        {finding.severity} Severity
                      </Badge>
                      <Badge variant="indigo" size="sm">{finding.type}</Badge>
                      <span className={`text-[11px] px-2 py-0.5 rounded border ${getStatusBadgeClass(finding.status)}`}>
                        {finding.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Source: {finding.sourceMode}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{finding.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{finding.description}</p>

                    <div className="pt-1 flex items-center gap-4 text-xs text-slate-500">
                      <span><strong>Institution:</strong> {finding.institutionName || 'Multi-Institution'}</span>
                      {finding.ruleId && (
                        <span><strong>Rule:</strong> {finding.ruleId} ({finding.ruleVersion})</span>
                      )}
                      <span><strong>Date:</strong> {finding.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Eye className="w-3.5 h-3.5" />}
                      onClick={() => setSelectedFinding(finding)}
                    >
                      Inspect Evidence
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                      onClick={() => navigate('/admin/exceptions')}
                    >
                      Resolve Case
                    </Button>
                  </div>
                </div>

                {/* Inline Side-by-Side Comparison Snippet if Fuzzy or Dual */}
                {(isFuzzy || isDual) && (
                  <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/70 p-3.5 rounded-lg border border-slate-200/80">
                    <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-800">
                      <Split className="w-3.5 h-3.5 text-blue-600" />
                      <span>Side-by-Side Record Comparison:</span>
                    </div>

                    {isDual && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-white rounded border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Record A (Physical)</span>
                          <p className="font-semibold text-slate-900 mt-0.5">Western Institute of Technology</p>
                          <p className="text-slate-600">B.Tech Computer Science (Physical Full-Time Day)</p>
                          <span className="text-teal-700 text-[11px] font-medium block mt-1">Shift: 09:00 - 16:30</span>
                        </div>
                        <div className="p-3 bg-white rounded border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Record B (Online / ODL)</span>
                          <p className="font-semibold text-slate-900 mt-0.5">National Open & Online Learning Academy</p>
                          <p className="text-slate-600">BCA (Online Degree Programme)</p>
                          <span className="text-teal-700 text-[11px] font-medium block mt-1">Shift: Asynchronous LMS</span>
                        </div>
                      </div>
                    )}

                    {isFuzzy && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-white rounded border border-amber-200">
                          <span className="text-[10px] font-bold text-amber-700 uppercase block">Candidate Record 1 (WIT)</span>
                          <p className="font-semibold text-slate-900 mt-0.5">Rohit S. Verma</p>
                          <p className="text-slate-600">DOB: 2004-07-14 · APAAR: Missing</p>
                          <p className="text-slate-600">B.Tech CSE · Shift: 08:30 - 15:30</p>
                        </div>
                        <div className="p-3 bg-white rounded border border-amber-200">
                          <span className="text-[10px] font-bold text-amber-700 uppercase block">Candidate Record 2 (DMEC)</span>
                          <p className="font-semibold text-slate-900 mt-0.5">Rohit Verma</p>
                          <p className="text-slate-600">DOB: 2004-07-14 · APAAR: 9948 1234 5678</p>
                          <p className="text-slate-600">B.Tech ECE · Shift: 09:00 - 16:00 (Overlap!)</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Finding Evidence Detail Drawer */}
      <Drawer
        isOpen={selectedFinding !== null}
        onClose={() => setSelectedFinding(null)}
        title={`Finding Evidence Dossier: ${selectedFinding?.id}`}
        subtitle={selectedFinding?.title}
        width="xl"
      >
        {selectedFinding && (
          <div className="space-y-5 text-xs">
            {/* Meta */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Verification Rule</span>
                <span className="font-mono font-bold text-slate-900">{selectedFinding.ruleId} ({selectedFinding.ruleVersion})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Severity & Status</span>
                <span>
                  <Badge variant={selectedFinding.severity === 'High' ? 'red' : 'amber'} size="sm">
                    {selectedFinding.severity}
                  </Badge>{' '}
                  <span className={`px-2 py-0.5 rounded text-[10px] border ${getStatusBadgeClass(selectedFinding.status)}`}>
                    {selectedFinding.status}
                  </span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Connector Mode</span>
                <span className="text-teal-700 font-semibold">{selectedFinding.sourceMode}</span>
              </div>
            </div>

            {/* Structured Evidence Payload */}
            <div>
              <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-2">
                Structured JSON Evidence Payload
              </h4>
              <pre className="p-3 bg-slate-900 text-teal-300 font-mono text-[11px] rounded-lg overflow-x-auto leading-relaxed border border-slate-800">
                {JSON.stringify(selectedFinding.evidence, null, 2)}
              </pre>
            </div>

            {/* Suggested Next Action */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg">
              <h5 className="font-bold text-blue-950 text-xs mb-1">Recommended Human Review Action:</h5>
              <p className="text-blue-900 leading-relaxed">{selectedFinding.suggestedAction}</p>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedFinding(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedFinding(null);
                  navigate('/admin/exceptions');
                }}
              >
                Go to Review Case →
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

