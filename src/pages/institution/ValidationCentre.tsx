import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Scale
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Tabs } from '../../components/common/Tabs';
import { getStatusBadgeClass } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

export const ValidationCentre: React.FC = () => {
  const { stagingRows, findings } = useDemoSession();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('ALL');

  const blockingCount = stagingRows.filter(r => !r.isValid).length;
  const reviewCount = stagingRows.filter(r => r.findings.some(f => !f.isBlocking)).length;

  const tabs = [
    { id: 'ALL', label: 'All Findings', count: blockingCount + reviewCount },
    { id: 'BLOCKING', label: 'Blocking Data Errors', count: blockingCount },
    { id: 'REGULATORY', label: 'Regulatory & Category Cap', count: reviewCount }
  ];

  const filteredRows = stagingRows.filter(r => {
    if (activeTab === 'BLOCKING') return !r.isValid;
    if (activeTab === 'REGULATORY') return r.findings.some(f => !f.isBlocking);
    return r.findings.length > 0;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Staging Validation Centre</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated pre-submission validation diagnostic results for currently staged upload rows.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={<Sliders className="w-3.5 h-3.5" />}
            onClick={() => navigate('/institution/corrections')}
          >
            Fix Before Submit ({blockingCount})
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Staged Rows</span>
          <span className="text-xl font-extrabold text-slate-900">{stagingRows.length}</span>
        </div>
        <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg">
          <span className="text-[10px] uppercase font-bold text-teal-700 block">Passed Format</span>
          <span className="text-xl font-extrabold text-teal-700">
            {stagingRows.filter(r => r.isValid).length}
          </span>
        </div>
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-[10px] uppercase font-bold text-red-700 block">Blocking Errors</span>
          <span className="text-xl font-extrabold text-red-700">{blockingCount}</span>
        </div>
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <span className="text-[10px] uppercase font-bold text-amber-700 block">Review Queue</span>
          <span className="text-xl font-extrabold text-amber-700">{reviewCount}</span>
        </div>
      </div>

      {/* Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="px-4" />
        </CardContent>
      </Card>

      {/* Detailed Validation Findings Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Row #</th>
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4">Field</th>
                <th className="py-3 px-4">Diagnostic Finding</th>
                <th className="py-3 px-4">Gate Type</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No findings in this category. All staged rows satisfy criteria!
                  </td>
                </tr>
              ) : (
                filteredRows.map(row => {
                  const finding = row.findings[0];
                  return (
                    <tr key={row.rowNumber} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        Row {row.rowNumber}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {row.studentName}
                        <span className="block font-mono text-[10px] text-slate-400">{row.apaarId || 'Blank APAAR'}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-blue-800">
                        {finding?.field}
                      </td>
                      <td className="py-3 px-4 text-slate-700 max-w-md">
                        {finding?.message}
                      </td>
                      <td className="py-3 px-4">
                        {finding?.isBlocking ? (
                          <Badge variant="red" size="sm">BLOCKING GATE</Badge>
                        ) : (
                          <Badge variant="amber" size="sm">REVIEW FINDING</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={finding?.severity === 'High' ? 'red' : 'amber'} size="sm">
                          {finding?.severity}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate('/institution/corrections')}
                        >
                          Edit Row →
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

