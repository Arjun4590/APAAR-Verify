import React from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  History,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Eye,
  Download,
  Info
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { getStatusBadgeClass } from '../../utils/formatters';
import { exportToCSV } from '../../utils/csvExport';

export const SubmissionHistory: React.FC = () => {
  const { submissionBatches, institutions } = useDemoSession();

  const handleExport = () => {
    const data = submissionBatches.map(b => ({
      Batch_ID: b.id,
      Institution: b.institutionName,
      Academic_Year: b.academicYear,
      Course: b.courseName,
      Total_Rows: b.totalRows,
      Valid_Rows: b.validRows,
      Blocking_Errors: b.blockingErrors,
      Review_Findings: b.reviewFindings,
      Status: b.status,
      Created_At: b.createdAt
    }));
    exportToCSV('WIT_Submission_Batches_History', data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Institutional Submission History</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit log of all uploaded cohorts, staging batches, validation outcomes and AICTE scrutiny statuses.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={handleExport}>
            Export History CSV
          </Button>
        </div>
      </div>

      {/* Status Sequence Notice */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <Info className="w-4 h-4 text-blue-600" />
          <span>APAAR-Verify Staged Submission Lifecycle:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono text-slate-600">
          <span className="bg-slate-200 px-2 py-0.5 rounded">Draft</span>
          <span>→</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Uploaded</span>
          <span>→</span>
          <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded">Validation Failed / Passed</span>
          <span>→</span>
          <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-bold">Committed (Atomic)</span>
          <span>→</span>
          <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Under AICTE Review</span>
          <span>→</span>
          <span className="bg-teal-200 text-teal-900 px-2 py-0.5 rounded font-bold">Accepted</span>
        </div>
        <p className="text-[10px] text-slate-400">
          Note: These reflect the proposed APAAR-Verify validation statuses, not existing official AICTE portal workflow steps.
        </p>
      </div>

      {/* Batches Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Submission Batch ID</th>
                <th className="py-3 px-4">Academic Year</th>
                <th className="py-3 px-4">Course Programme</th>
                <th className="py-3 px-4 text-center">Total Records</th>
                <th className="py-3 px-4 text-center">Valid</th>
                <th className="py-3 px-4 text-center">Blocking Errors</th>
                <th className="py-3 px-4 text-center">Review Findings</th>
                <th className="py-3 px-4">Submission Status</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissionBatches.map(batch => (
                <tr key={batch.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-900">
                    {batch.id}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {batch.academicYear}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {batch.courseName}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold">
                    {batch.totalRows}
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-teal-700 font-bold">
                    {batch.validRows}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold">
                    {batch.blockingErrors > 0 ? (
                      <span className="text-red-600">{batch.blockingErrors}</span>
                    ) : (
                      <span className="text-slate-400">0</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold">
                    {batch.reviewFindings > 0 ? (
                      <span className="text-amber-600">{batch.reviewFindings}</span>
                    ) : (
                      <span className="text-slate-400">0</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] border ${getStatusBadgeClass(batch.status)}`}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                    {batch.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

