import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import { Finding } from '../../types';
import {
  CheckCheck,
  Search,
  Filter,
  Eye,
  Send,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  ArrowUpRight,
  RotateCcw,
  UserCheck,
  Split,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Tabs } from '../../components/common/Tabs';
import { Drawer } from '../../components/common/Drawer';
import { Modal } from '../../components/common/Modal';
import { getStatusBadgeClass } from '../../utils/formatters';

export const ExceptionsReview: React.FC = () => {
  const {
    findings,
    updateFindingStatus,
    confirmFuzzyIdentity,
    reverseFuzzyIdentityMerge,
    loadScenario
  } = useDemoSession();

  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedCase, setSelectedCase] = useState<Finding | null>(null);
  const [clarificationModalOpen, setClarificationModalOpen] = useState(false);
  const [clarificationText, setClarificationText] = useState('');

  const tabs = [
    { id: 'ALL', label: 'All Cases', count: findings.length },
    { id: 'New', label: 'New', count: findings.filter(f => f.status === 'New').length },
    { id: 'Awaiting Institution', label: 'Awaiting Institution', count: findings.filter(f => f.status === 'Awaiting Institution').length },
    { id: 'Institution Responded', label: 'Institution Responded', count: findings.filter(f => f.status === 'Institution Responded').length },
    { id: 'Under Review', label: 'Under Review', count: findings.filter(f => f.status === 'Under Review').length },
    { id: 'Resolved', label: 'Resolved', count: findings.filter(f => f.status === 'Resolved').length }
  ];

  const filteredCases = findings.filter(f => {
    if (activeTab === 'ALL') return true;
    return f.status === activeTab;
  });

  const handleRequestClarification = () => {
    if (!selectedCase) return;
    updateFindingStatus(
      selectedCase.id,
      'Awaiting Institution',
      `Clarification Requested: "${clarificationText}"`
    );
    setClarificationModalOpen(false);
    setClarificationText('');
    alert(`Clarification request sent to ${selectedCase.institutionName || 'the institution'}.`);
  };

  const handleAcceptExplanation = () => {
    if (!selectedCase) return;
    updateFindingStatus(
      selectedCase.id,
      'Resolved',
      'Reviewer accepted institutional clarification and supporting evidentiary documents.'
    );
    alert(`Case ${selectedCase.id} marked as Resolved (Explanation Accepted).`);
  };

  const handleConfirmPotentialIssue = () => {
    if (!selectedCase) return;
    updateFindingStatus(
      selectedCase.id,
      'Under Review',
      'AICTE Officer confirmed potential regulatory discrepancy. Case flagged for scrutiny.'
    );
    alert(`Case ${selectedCase.id} confirmed for regulatory assessment.`);
  };

  const handleEscalate = () => {
    if (!selectedCase) return;
    updateFindingStatus(
      selectedCase.id,
      'Escalated',
      'Escalated to AICTE Senior Scrutiny Reviewer & Approval Committee.'
    );
    alert(`Case ${selectedCase.id} escalated to Senior Reviewer.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">AICTE Exceptions & Human Review</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent case review queue, institution clarifications, and reviewer-authorized identity merge resolutions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5 text-amber-600" />}
            onClick={() => loadScenario('C')}
          >
            Load Scenario C (Fuzzy Identity Review)
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="px-4" />
        </CardContent>
      </Card>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-teal-500 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">No cases currently in "{activeTab}" state.</p>
              <p className="text-xs text-slate-400 mt-1">Select "All Cases" to view all records in the human review queue.</p>
            </CardContent>
          </Card>
        ) : (
          filteredCases.map(c => (
            <Card key={c.id} className="hover:border-slate-300 transition-all">
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {c.id}
                      </span>
                      <Badge variant={c.severity === 'High' ? 'red' : c.severity === 'Medium' ? 'amber' : 'slate'} size="sm">
                        {c.severity} Severity
                      </Badge>
                      <Badge variant="indigo" size="sm">{c.type}</Badge>
                      <span className={`text-[11px] px-2 py-0.5 rounded border ${getStatusBadgeClass(c.status)}`}>
                        {c.status}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{c.description}</p>

                    <div className="pt-1 flex items-center gap-4 text-xs text-slate-500">
                      <span><strong>Institution:</strong> {c.institutionName || 'Western Institute of Technology (Demo)'}</span>
                      {c.studentNames && (
                        <span><strong>Student(s):</strong> {c.studentNames.join(', ')}</span>
                      )}
                      <span><strong>Logged:</strong> {c.createdAt}</span>
                    </div>

                    {c.institutionResponse && (
                      <div className="mt-2 p-2.5 bg-blue-50/60 rounded border border-blue-200 text-xs">
                        <span className="font-semibold text-blue-950 block">Institution Clarification Provided:</span>
                        <p className="text-blue-900 mt-0.5">{c.institutionResponse.text}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<Eye className="w-3.5 h-3.5" />}
                      onClick={() => setSelectedCase(c)}
                    >
                      Review & Take Action
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Case Review Drawer */}
      <Drawer
        isOpen={selectedCase !== null}
        onClose={() => setSelectedCase(null)}
        title={`Review Case: ${selectedCase?.id}`}
        subtitle={selectedCase?.title}
        width="2xl"
      >
        {selectedCase && (
          <div className="space-y-6 text-xs">
            {/* Finding Overview */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">{selectedCase.title}</span>
                <Badge variant={selectedCase.severity === 'High' ? 'red' : 'amber'}>
                  {selectedCase.severity} Severity
                </Badge>
              </div>
              <p className="text-slate-600 leading-relaxed">{selectedCase.description}</p>
              <div className="pt-2 flex justify-between text-slate-500 border-t border-slate-200 text-[11px]">
                <span>Status: <strong className="text-slate-800">{selectedCase.status}</strong></span>
                <span>Rule: <strong className="text-slate-800">{selectedCase.ruleId || 'N/A'}</strong></span>
                <span>Source: <strong className="text-teal-700">{selectedCase.sourceMode}</strong></span>
              </div>
            </div>

            {/* Special Action Box for Scenario C: Fuzzy Identity Candidate */}
            {selectedCase.type === 'FUZZY_IDENTITY' && (
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <Split className="w-4 h-4 text-amber-700" />
                  <h4 className="font-bold text-amber-950 text-xs uppercase tracking-wider">
                    Candidate Identity Match Resolution (Scenario C)
                  </h4>
                </div>
                <p className="text-amber-900 leading-relaxed">
                  Both records share <strong>identical Date of Birth (2004-07-14)</strong> and <strong>92.5% phonetic token similarity</strong>. 
                  Surviving identity: <strong>Rohit Verma (DMEC, APAAR 9948 1234 5678)</strong>.
                </p>
                <div className="p-3 bg-white rounded-lg border border-amber-200 text-slate-800 space-y-1">
                  <p><strong>Candidate 1:</strong> Rohit S. Verma (WIT, CSE) · APAAR Missing · Shift 08:30-15:30</p>
                  <p><strong>Candidate 2:</strong> Rohit Verma (DMEC, ECE) · APAAR: 9948 1234 5678 · Shift 09:00-16:00</p>
                  <p className="text-[11px] text-red-600 font-semibold mt-1">
                    Conflict: Overlapping physical shift times in different states.
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2 flex-wrap">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<UserCheck className="w-3.5 h-3.5" />}
                    onClick={() => {
                      confirmFuzzyIdentity(selectedCase.id, true);
                      alert('Human confirmation executed: Records merged under APAAR 9948 1234 5678. Audit entry recorded.');
                      setSelectedCase(null);
                    }}
                  >
                    Confirm Same Person (Execute Identity Merge)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<XCircle className="w-3.5 h-3.5" />}
                    onClick={() => {
                      confirmFuzzyIdentity(selectedCase.id, false);
                      alert('Recorded in Do-Not-Match Registry. Identities kept distinct.');
                      setSelectedCase(null);
                    }}
                  >
                    Mark as Different People
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<RotateCcw className="w-3.5 h-3.5" />}
                    onClick={() => {
                      reverseFuzzyIdentityMerge(selectedCase.id);
                      alert('Identity merge reversed. Original separate student rows restored.');
                      setSelectedCase(null);
                    }}
                  >
                    Reverse Previous Merge
                  </Button>
                </div>
              </div>
            )}

            {/* Standard Reviewer Action Toolbar */}
            <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-3">
              <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
                Reviewer Actions & Decision Controls
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<MessageSquare className="w-3.5 h-3.5 text-blue-600" />}
                  onClick={() => setClarificationModalOpen(true)}
                >
                  Request Clarification
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                  onClick={handleAcceptExplanation}
                >
                  Accept Explanation
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                  onClick={handleConfirmPotentialIssue}
                >
                  Confirm Issue
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                  onClick={handleEscalate}
                >
                  Escalate Case
                </Button>
              </div>
            </div>

            {/* Institution Response (if already provided) */}
            {selectedCase.institutionResponse && (
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-blue-800 block">Institution Clarification</span>
                <p className="font-semibold text-slate-900 mt-1">{selectedCase.institutionResponse.text}</p>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Responded on: {selectedCase.institutionResponse.respondedAt} · Doc: {selectedCase.institutionResponse.supportingDoc}
                </span>
              </div>
            )}

            {/* Action History / Case Timeline */}
            <div>
              <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-2.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Case Action Timeline
              </h4>
              <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 bg-white">
                {selectedCase.history?.map((h, i) => (
                  <div key={i} className="p-3 text-xs">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>{h.by}</span>
                      <span>{h.timestamp}</span>
                    </div>
                    <p className="font-bold text-slate-800 mt-1">{h.action}</p>
                    {h.notes && <p className="text-slate-500 mt-0.5">{h.notes}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Clarification Request Modal */}
      <Modal
        isOpen={clarificationModalOpen}
        onClose={() => setClarificationModalOpen(false)}
        title="Request Institutional Clarification"
        description="Submit an official inquiry to the institution registrar regarding this exception."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setClarificationModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Send className="w-3.5 h-3.5" />}
              onClick={handleRequestClarification}
              disabled={!clarificationText.trim()}
            >
              Send Notice
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs">
          <p className="text-slate-600">
            Specify the regulatory evidence or document upload required from the institution:
          </p>
          <textarea
            rows={4}
            value={clarificationText}
            onChange={e => setClarificationText(e.target.value)}
            placeholder="e.g. Please provide timetable schedule, verified state admission allotment letter, or transfer certificate..."
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
          />
        </div>
      </Modal>
    </div>
  );
};

