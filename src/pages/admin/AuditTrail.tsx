import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import { AuditEvent } from '../../types';
import {
  History,
  Search,
  ShieldCheck,
  Link,
  Lock,
  Eye,
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Drawer } from '../../components/common/Drawer';
import { exportToCSV } from '../../utils/csvExport';

export const AuditTrail: React.FC = () => {
  const { auditLogs } = useDemoSession();

  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);

  const filteredLogs = auditLogs.filter(log => {
    const term = search.toLowerCase();
    return (
      log.id.toLowerCase().includes(term) ||
      log.actor.toLowerCase().includes(term) ||
      log.action.toLowerCase().includes(term) ||
      log.entity.toLowerCase().includes(term) ||
      log.description.toLowerCase().includes(term)
    );
  });

  const handleExport = () => {
    const data = filteredLogs.map(l => ({
      Event_ID: l.id,
      Timestamp: l.timestamp,
      Actor: l.actor,
      Role: l.role,
      Action: l.action,
      Entity: l.entity,
      Description: l.description,
      Previous_Hash: l.previousHash,
      Current_Hash: l.currentHash,
      Chain_Status: l.status
    }));
    exportToCSV('Tamper_Evident_Audit_Chain', data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Tamper-Evident Audit Trail</h1>
            <Badge variant="teal">Simulated SHA-256 Hash Chain</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically linked chronological ledger of all ingestion, inline correction, review decisions and atomic batch commits.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={handleExport}>
            Export Audit Log
          </Button>
        </div>
      </div>

      {/* Security Disclaimer Banner */}
      <div className="p-4 bg-slate-900 text-slate-200 rounded-lg flex items-start gap-3 text-xs border border-slate-800">
        <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-white">Simulated Hash-Chain Audit Architecture:</p>
          <p className="mt-0.5 leading-relaxed text-slate-300">
            Each event computes <code>current_hash = SHA-256(canonical_payload + previous_hash)</code>. 
            This frontend demonstration simulates PostgreSQL database transaction-level serialization locks for tamper evidence.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search audit events by action, entity ID, actor or description..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Audit Events Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Event ID</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor & Role</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Chain Hash</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...filteredLogs].reverse().map(log => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-900">
                    {log.id}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900 block">{log.actor}</span>
                    <span className="text-[10px] text-slate-400">{log.role}</span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="indigo" size="sm">{log.action}</Badge>
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-800">
                    {log.entity}
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-slate-600" title={log.description}>
                    {log.description}
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">
                    <span className="block truncate w-24 text-teal-700 font-bold" title={log.currentHash}>
                      {log.currentHash.slice(0, 8)}...{log.currentHash.slice(-6)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Eye className="w-3 h-3" />}
                      onClick={() => setSelectedEvent(log)}
                    >
                      Verify
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Audit Detail Drawer */}
      <Drawer
        isOpen={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        title={`Audit Block Verification: ${selectedEvent?.id}`}
        subtitle={`Recorded on ${selectedEvent?.timestamp}`}
        width="lg"
      >
        {selectedEvent && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg flex items-center gap-2 text-teal-900">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="font-semibold">Cryptographic Hash Verification: Block Valid</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Action Executed</span>
                <span className="font-bold text-slate-900 text-sm">{selectedEvent.action}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Actor Identity</span>
                <span className="font-medium text-slate-800">{selectedEvent.actor} ({selectedEvent.role})</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Entity Reference</span>
                <span className="font-mono font-semibold text-blue-900">{selectedEvent.entity}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Detailed Description</span>
                <p className="text-slate-700 leading-relaxed">{selectedEvent.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Previous Block Hash (Parent)
                </span>
                <div className="p-2.5 bg-slate-900 text-slate-300 font-mono text-[10px] rounded break-all">
                  {selectedEvent.previousHash}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Current Block Hash (SHA-256)
                </span>
                <div className="p-2.5 bg-slate-900 text-teal-400 font-mono text-[10px] rounded break-all">
                  {selectedEvent.currentHash}
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

