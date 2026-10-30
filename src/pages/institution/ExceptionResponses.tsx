import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import { Finding } from '../../types';
import {
  Send,
  AlertTriangle,
  CheckCircle2,
  Paperclip,
  Clock,
  Eye,
  FileText,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Drawer } from '../../components/common/Drawer';
import { getStatusBadgeClass } from '../../utils/formatters';

export const ExceptionResponses: React.FC = () => {
  const { findings, respondToFinding } = useDemoSession();

  // Scoped to Western Institute of Technology
  const witFindings = findings.filter(f => f.institutionId === 'inst-wit-01');

  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);
  const [responseText, setResponseText] = useState('');
  const [attachedFileName, setAttachedFileName] = useState('');

  const handleOpenDrawer = (finding: Finding) => {
    setSelectedFinding(finding);
    setResponseText(finding.institutionResponse?.text || '');
    setAttachedFileName(finding.institutionResponse?.supportingDoc || '');
  };

  const handleSubmitResponse = () => {
    if (!selectedFinding) return;
    if (!responseText.trim()) {
      alert('Please provide an explanatory response before submitting.');
      return;
    }

    respondToFinding(selectedFinding.id, responseText, attachedFileName || 'Affidavit_Allotment_Letter.pdf');
    alert(`Response successfully submitted to AICTE for Case ${selectedFinding.id}.`);
    setSelectedFinding(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">AICTE Exception Inquiries & Clarifications</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Respond to regulatory discrepancy notices, supernumerary cap verifications and AICTE scrutiny queries.
        </p>
      </div>

      {/* Findings List */}
      <div className="space-y-4">
        {witFindings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-teal-500 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">No open AICTE inquiries for Western Institute of Technology.</p>
              <p className="text-xs text-slate-400 mt-1">All institutional submissions currently satisfy regulatory criteria.</p>
            </CardContent>
          </Card>
        ) : (
          witFindings.map(f => (
            <Card key={f.id} className="hover:border-slate-300 transition-all">
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {f.id}
                      </span>
                      <Badge variant={f.severity === 'High' ? 'red' : f.severity === 'Medium' ? 'amber' : 'slate'} size="sm">
                        {f.severity} Severity
                      </Badge>
                      <Badge variant="indigo" size="sm">{f.type}</Badge>
                      <span className={`text-[11px] px-2 py-0.5 rounded border ${getStatusBadgeClass(f.status)}`}>
                        {f.status}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{f.description}</p>

                    <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded text-xs text-amber-900">
                      <strong>AICTE Action Requested:</strong> {f.suggestedAction}
                    </div>

                    {f.institutionResponse && (
                      <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded text-xs text-blue-900">
                        <strong>Submitted Clarification:</strong> {f.institutionResponse.text}
                        <span className="block text-[10px] text-slate-400 mt-0.5">
                          Submitted on {f.institutionResponse.respondedAt} · Doc: {f.institutionResponse.supportingDoc}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="shrink-0">
                    <Button
                      variant={f.status === 'Institution Responded' ? 'outline' : 'primary'}
                      size="sm"
                      icon={<Send className="w-3.5 h-3.5" />}
                      onClick={() => handleOpenDrawer(f)}
                    >
                      {f.status === 'Institution Responded' ? 'Edit Response' : 'Provide Clarification'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Response Drawer */}
      <Drawer
        isOpen={selectedFinding !== null}
        onClose={() => setSelectedFinding(null)}
        title={`Submit Clarification: ${selectedFinding?.id}`}
        subtitle={selectedFinding?.title}
        width="xl"
      >
        {selectedFinding && (
          <div className="space-y-5 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-bold text-slate-900 block text-xs">Finding Diagnostic Summary:</span>
              <p className="text-slate-600 leading-relaxed">{selectedFinding.description}</p>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-500">
                <span>Rule: <strong>{selectedFinding.ruleId}</strong></span>
                <span>Severity: <strong className="text-amber-700">{selectedFinding.severity}</strong></span>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Official Institutional Explanation / Justification
              </label>
              <textarea
                rows={5}
                value={responseText}
                onChange={e => setResponseText(e.target.value)}
                placeholder="Explain the circumstances regarding this finding (e.g. state counselling quota allotment letter, seat surrender, or timetable adjustment)..."
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Simulated Supporting File Attachment */}
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Attach Supporting Document (Affidavit / State Allotment List)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  id="doc-upload"
                  className="hidden"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setAttachedFileName(e.target.files[0].name);
                    }
                  }}
                />
                <label
                  htmlFor="doc-upload"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded text-slate-700 cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Choose PDF Document</span>
                </label>
                <span className="font-mono text-slate-500">
                  {attachedFileName || 'No file selected (Optional demo attachment)'}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedFinding(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<Send className="w-3.5 h-3.5" />}
                onClick={handleSubmitResponse}
              >
                Submit Official Response
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

