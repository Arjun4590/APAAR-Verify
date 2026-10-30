import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Download,
  Check,
  Send,
  Sparkles,
  Info,
  ShieldCheck,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { getStatusBadgeClass } from '../../utils/formatters';
import { exportToCSV } from '../../utils/csvExport';
import { useNavigate } from 'react-router-dom';

export const Corrections: React.FC = () => {
  const {
    stagingRows,
    updateStagingRow,
    revalidateStaging,
    commitStagingBatch,
    loadScenario
  } = useDemoSession();

  const navigate = useNavigate();

  const [commitResult, setCommitResult] = useState<{ success: boolean; message: string } | null>(null);

  const blockingErrors = stagingRows.filter(r => !r.isValid);
  const blockingCount = blockingErrors.length;
  const isCommitDisabled = blockingCount > 0;

  // Helper quick-fix buttons for demonstration convenience during presentation
  const handleQuickFixApaar = () => {
    // Row 2 has 11 digits: '98451029381' -> append '0' to make it 12 digits
    updateStagingRow(2, 'apaarId', '984510293810');
  };

  const handleQuickFixDuplicate = () => {
    // Row 5 has duplicate APAAR '449182736450' from Row 4 -> change to '449182736459'
    updateStagingRow(5, 'apaarId', '449182736459');
  };

  const handleFixAllBlocking = () => {
    handleQuickFixApaar();
    handleQuickFixDuplicate();
  };

  const handleCommit = () => {
    const res = commitStagingBatch();
    setCommitResult(res);
  };

  const handleDownloadReport = () => {
    const errorRows = stagingRows
      .filter(r => r.findings.length > 0)
      .map(r => ({
        Row: r.rowNumber,
        Student_Name: r.studentName,
        APAAR_ID: r.apaarId,
        Finding: r.findings[0]?.message,
        Severity: r.findings[0]?.severity,
        Is_Blocking: r.findings[0]?.isBlocking ? 'YES' : 'NO'
      }));
    exportToCSV('Fix_Before_Submit_Errors', errorRows);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Fix-Before-Submit Correction Staging</h1>
            <Badge variant="indigo">Scenario A Workflow</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Resolve blocking format and duplicate errors inline before committing verified rows to the central repository.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={() => loadScenario('A')}
          >
            Reset Scenario A Batch
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={handleDownloadReport}
          >
            Download Errors
          </Button>
          <Button
            variant={isCommitDisabled ? 'outline' : 'success'}
            size="sm"
            icon={<Check className="w-3.5 h-3.5" />}
            onClick={handleCommit}
            disabled={isCommitDisabled}
          >
            Commit Verified Records
          </Button>
        </div>
      </div>

      {/* Commit Result Banner if triggered */}
      {commitResult && (
        <div
          className={`p-4 rounded-xl border flex items-start justify-between gap-3 text-xs ${
            commitResult.success
              ? 'bg-teal-50 border-teal-300 text-teal-950'
              : 'bg-red-50 border-red-300 text-red-950'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {commitResult.success ? (
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <div>
              <p className="font-bold text-sm">{commitResult.success ? 'Atomic Batch Commit Succeeded!' : 'Commit Blocked'}</p>
              <p className="mt-0.5 leading-relaxed">{commitResult.message}</p>
            </div>
          </div>
          {commitResult.success && (
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/institution/students')}
              >
                View Repository →
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/admin/audit')}
              >
                Verify Audit Hash →
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Commit Gate Status Card */}
      <Card className={isCommitDisabled ? 'border-red-300 bg-red-50/20' : 'border-teal-300 bg-teal-50/20'}>
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg shrink-0 ${isCommitDisabled ? 'bg-red-100 text-red-700' : 'bg-teal-100 text-teal-700'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                Commit Gate Status:
                {isCommitDisabled ? (
                  <span className="text-red-700 font-extrabold">LOCKED ({blockingCount} Blocking Error{blockingCount > 1 ? 's' : ''})</span>
                ) : (
                  <span className="text-teal-700 font-extrabold">UNLOCKED (Ready to Commit)</span>
                )}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {isCommitDisabled ? (
                  <>
                    Fix Row 2 (11-digit APAAR) and Row 5 (in-file duplicate). Regulatory category cap findings (Row 12: 7th TFW seat) do not block commit and will enter the AICTE review queue.
                  </>
                ) : (
                  <>
                    All blocking data errors resolved! Staged records will be promoted to the central repository in a single atomic transaction.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Quick Demo Fix Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {isCommitDisabled && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleQuickFixApaar}
                  title="Appends missing 12th digit to Row 2"
                >
                  Fix Row 2 (12 Digits)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleQuickFixDuplicate}
                  title="Changes duplicate APAAR in Row 5"
                >
                  Fix Row 5 (Duplicate)
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<Sparkles className="w-3.5 h-3.5" />}
                  onClick={handleFixAllBlocking}
                >
                  Auto-Fix All Blocking
                </Button>
              </>
            )}
            <Button
              variant={isCommitDisabled ? 'outline' : 'success'}
              size="md"
              icon={<Send className="w-4 h-4" />}
              onClick={handleCommit}
              disabled={isCommitDisabled}
            >
              Commit Verified Records
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Editable Staging Table */}
      <Card>
        <CardHeader action={
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Blocking Error
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Review Finding
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" /> Valid
            </span>
          </div>
        }>
          <CardTitle>Staging Rows: BATCH-2026-WIT-01 (12 Records)</CardTitle>
          <CardDescription>Inline editable table. Changes are re-validated instantly in local staging.</CardDescription>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-3 text-center">Row</th>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3">APAAR ID (12 Digits)</th>
                <th className="py-3 px-3">DOB</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Entry Type</th>
                <th className="py-3 px-4">Validation Finding / Error</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stagingRows.map(row => {
                const hasBlocking = row.findings.some(f => f.isBlocking);
                const hasReview = row.findings.some(f => !f.isBlocking);

                return (
                  <tr
                    key={row.rowNumber}
                    className={`transition-colors ${
                      hasBlocking
                        ? 'bg-red-50/30 hover:bg-red-50/50'
                        : hasReview
                        ? 'bg-amber-50/30 hover:bg-amber-50/50'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-700">
                      #{row.rowNumber}
                    </td>

                    {/* Student Name */}
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={row.studentName}
                        onChange={e => updateStagingRow(row.rowNumber, 'studentName', e.target.value)}
                        className="w-full py-1 px-2 text-xs bg-white border border-slate-200 rounded focus:border-blue-500 focus:outline-none"
                      />
                    </td>

                    {/* APAAR ID (Editable) */}
                    <td className="py-2.5 px-3">
                      <div className="relative">
                        <input
                          type="text"
                          maxLength={12}
                          value={row.apaarId}
                          onChange={e => updateStagingRow(row.rowNumber, 'apaarId', e.target.value)}
                          className={`w-36 py-1 px-2 text-xs font-mono font-medium rounded border ${
                            hasBlocking
                              ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-600 focus:bg-white'
                              : 'border-slate-200 bg-white text-slate-900 focus:border-blue-500'
                          } focus:outline-none`}
                        />
                        <span className="block text-[9px] text-slate-400 mt-0.5">
                          {row.apaarId.length}/12 digits
                        </span>
                      </div>
                    </td>

                    {/* DOB */}
                    <td className="py-2.5 px-3">
                      <input
                        type="date"
                        value={row.dateOfBirth}
                        onChange={e => updateStagingRow(row.rowNumber, 'dateOfBirth', e.target.value)}
                        className="py-1 px-2 text-xs bg-white border border-slate-200 rounded focus:border-blue-500 focus:outline-none"
                      />
                    </td>

                    {/* Category Dropdown */}
                    <td className="py-2.5 px-3">
                      <select
                        value={row.admissionCategory}
                        onChange={e => updateStagingRow(row.rowNumber, 'admissionCategory', e.target.value)}
                        className="py-1 px-2 text-xs bg-white border border-slate-200 rounded focus:border-blue-500 focus:outline-none"
                      >
                        <option value="General">General</option>
                        <option value="TFW">TFW</option>
                        <option value="EWS">EWS</option>
                        <option value="FN/OCI/CIWG">FN/OCI/CIWG</option>
                        <option value="Lateral Entry">Lateral Entry</option>
                      </select>
                    </td>

                    {/* Entry Type */}
                    <td className="py-2.5 px-3">
                      <span className="text-slate-600">{row.entryType}</span>
                    </td>

                    {/* Diagnostic Finding */}
                    <td className="py-2.5 px-4">
                      {row.findings.length > 0 ? (
                        <div className="space-y-1">
                          {row.findings.map((f, fi) => (
                            <div
                              key={fi}
                              className={`text-[11px] font-medium ${
                                f.isBlocking ? 'text-red-700' : 'text-amber-800'
                              }`}
                            >
                              <span className="font-bold">[{f.code}]</span> {f.message}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-teal-700 font-medium flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Passed all checks
                        </span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${getStatusBadgeClass(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

