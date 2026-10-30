import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import { StudentCorrectionRequest } from '../../types';
import {
  Send,
  AlertCircle,
  CheckCircle2,
  Paperclip,
  Clock,
  History,
  FileCheck2,
  Lock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const CorrectionRequest: React.FC = () => {
  const { correctionRequests, submitStudentCorrection } = useDemoSession();

  const [category, setCategory] = useState<StudentCorrectionRequest['category']>('DOB');
  const [description, setDescription] = useState('');
  const [correctValue, setCorrectValue] = useState('');
  const [fileName, setFileName] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !correctValue.trim()) {
      alert('Please fill in the description and correct value.');
      return;
    }

    submitStudentCorrection(category, description, correctValue, fileName || 'Supporting_Document.pdf');
    setSubmittedSuccess(true);
    setDescription('');
    setCorrectValue('');
    setFileName('');
    setTimeout(() => setSubmittedSuccess(false), 5000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Report Inaccurate Academic Record</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Request factual corrections to institutional enrolment submissions, misspelled names, or dates of birth.
        </p>
      </div>

      {/* Regulatory Scope Notice */}
      <div className="p-4 bg-slate-900 text-slate-200 rounded-lg text-xs space-y-1 border border-slate-800">
        <div className="flex items-center gap-2 font-bold text-white">
          <Lock className="w-4 h-4 text-teal-400" />
          <span>Statutory Reporting Governance Boundary:</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          Students cannot directly alter authoritative institutional enrolment records or delete statutory regulatory reporting. 
          Your request is routed directly to the Registrar's verification desk at Western Institute of Technology for evidentiary review.
        </p>
      </div>

      {/* Success Banner */}
      {submittedSuccess && (
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-950 flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
          <div>
            <p className="font-bold">Correction Request Submitted Successfully!</p>
            <p className="text-teal-900 mt-0.5">
              Ticket has been assigned to the institutional registrar's desk under status "Submitted to Institution".
            </p>
          </div>
        </div>
      )}

      {/* Submission Form */}
      <Card>
        <CardHeader>
          <CardTitle>New Correction Ticket</CardTitle>
          <CardDescription>Submit supporting evidence to amend your institutional record</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Inaccuracy Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none"
                >
                  <option value="DOB">Incorrect Date of Birth (DOB)</option>
                  <option value="Name">Misspelled / Incomplete Name</option>
                  <option value="Course">Incorrect Degree Course / Branch</option>
                  <option value="Institution">Incorrect Institution / Campus</option>
                  <option value="Admission Year">Incorrect Year of Admission</option>
                  <option value="Status">Outdated Enrolment Status</option>
                  <option value="Duplicate">Duplicate Enrolment Record</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Correct Value / Requested Rectification</label>
                <input
                  type="text"
                  value={correctValue}
                  onChange={e => setCorrectValue(e.target.value)}
                  placeholder="e.g. Correct Date of Birth: 12-05-2005"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Factual Description & Reason</label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Explain the factual basis for the correction (e.g. Aadhaar / 10th marksheet discrepancy)..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Attach Supporting Evidentiary Document</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  id="student-doc"
                  className="hidden"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                />
                <label
                  htmlFor="student-doc"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded text-slate-700 cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Choose PDF / Scan</span>
                </label>
                <span className="font-mono text-slate-500">{fileName || 'No file selected (Optional demo document)'}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="primary" size="md" icon={<Send className="w-3.5 h-3.5" />} type="submit">
                Submit Correction Ticket
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Ticket History */}
      <Card>
        <CardHeader>
          <CardTitle>My Correction Ticket History</CardTitle>
          <CardDescription>Status of past rectification requests</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 text-xs">
            {correctionRequests.map(ticket => (
              <div key={ticket.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-blue-900">{ticket.id}</span>
                  <Badge variant={ticket.status === 'Accepted' ? 'teal' : 'amber'}>
                    {ticket.status}
                  </Badge>
                </div>
                <p className="font-semibold text-slate-900">
                  {ticket.category} Amendment: Requested value "{ticket.correctValue}"
                </p>
                <p className="text-slate-500 text-[11px] mt-0.5">{ticket.description}</p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Submitted: {ticket.submittedAt}</span>
                  {ticket.supportingDocName && <span>Attachment: {ticket.supportingDocName}</span>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

