import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import { RegulatoryRule } from '../../types';
import {
  Sliders,
  Search,
  Filter,
  Edit2,
  BookOpen,
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { getStatusBadgeClass } from '../../utils/formatters';

export const RegulatoryRules: React.FC = () => {
  const { rules, updateRule } = useDemoSession();

  const [selectedRule, setSelectedRule] = useState<RegulatoryRule | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedCap, setEditedCap] = useState('');
  const [editedNotes, setEditedNotes] = useState('');
  const [editedStatus, setEditedStatus] = useState<RegulatoryRule['status']>('Active');

  const handleOpenEdit = (rule: RegulatoryRule) => {
    setSelectedRule(rule);
    setEditedCap(rule.capOrCondition);
    setEditedNotes(rule.notes);
    setEditedStatus(rule.status);
    setEditModalOpen(true);
  };

  const handleSaveRule = () => {
    if (!selectedRule) return;
    updateRule(selectedRule.id, {
      capOrCondition: editedCap,
      notes: editedNotes,
      status: editedStatus
    });
    setEditModalOpen(false);
    alert(`Rule ${selectedRule.ruleCode} updated successfully.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Regulatory Rules Configuration</h1>
            <Badge variant="teal">AICTE Handbook Engine</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configurable, versioned statutory limits and validation clauses evaluated by the APAAR-Verify intelligence engine.
          </p>
        </div>
      </div>

      {/* Principle Banner */}
      <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-lg flex items-start gap-3 text-xs text-blue-950">
        <Scale className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Transparent Regulatory Governance Principle:</p>
          <p className="mt-0.5 leading-relaxed text-blue-900">
            Regulatory caps must not be hardcoded in application logic. Rules are stored as versioned, configurable records 
            linked directly to specific AICTE Approval Process Handbook (APH) clauses and effective dates.
          </p>
        </div>
      </div>

      {/* Rules Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Rule Code & Version</th>
                <th className="py-3 px-4">Rule Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Applicable Scope</th>
                <th className="py-3 px-4">Configured Cap / Condition</th>
                <th className="py-3 px-4">Source Handbook Clause</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rules.map(rule => (
                <tr key={rule.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono">
                    <span className="font-bold text-blue-900 block">{rule.ruleCode}</span>
                    <span className="text-[10px] text-slate-400">{rule.version} · AY {rule.academicYear}</span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{rule.name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{rule.notes}</p>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="indigo" size="sm">{rule.category}</Badge>
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    <span className="line-clamp-2">{rule.applicableScope}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">
                    <span className="line-clamp-2">{rule.capOrCondition}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                    <span className="line-clamp-2">{rule.sourceHandbookClause}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${getStatusBadgeClass(rule.status)}`}>
                      {rule.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Edit2 className="w-3 h-3" />}
                      onClick={() => handleOpenEdit(rule)}
                    >
                      Configure
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Rule Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={`Configure Rule: ${selectedRule?.ruleCode}`}
        description="Update statutory parameters, handbook clauses, and engine enforcement status."
        maxWidth="lg"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveRule}>
              Save Rule Configuration
            </Button>
          </>
        }
      >
        {selectedRule && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Rule Name</label>
              <input
                type="text"
                disabled
                value={selectedRule.name}
                className="w-full p-2 bg-slate-100 border border-slate-200 rounded text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Configured Cap or Enforcement Condition</label>
              <textarea
                rows={3}
                value={editedCap}
                onChange={e => setEditedCap(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Handbook Reference & Source Clause</label>
              <input
                type="text"
                disabled
                value={selectedRule.sourceHandbookClause}
                className="w-full p-2 bg-slate-100 border border-slate-200 rounded text-slate-500 cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Enforcement Status</label>
                <select
                  value={editedStatus}
                  onChange={e => setEditedStatus(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none"
                >
                  <option value="Active">Active (Live Enforcement)</option>
                  <option value="Pending Confirmation">Pending Confirmation (Review Flag)</option>
                  <option value="Draft">Draft (Disabled)</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Rule Version</label>
                <input
                  type="text"
                  disabled
                  value={selectedRule.version}
                  className="w-full p-2 bg-slate-100 border border-slate-200 rounded text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Administrative Notes & Caveats</label>
              <textarea
                rows={2}
                value={editedNotes}
                onChange={e => setEditedNotes(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

