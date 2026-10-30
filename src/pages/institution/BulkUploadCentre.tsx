import React, { useState } from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Download,
  Layers,
  Settings,
  RefreshCw,
  FileText
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { exportToCSV } from '../../utils/csvExport';

export const BulkUploadCentre: React.FC = () => {
  const {
    academicYear,
    setAcademicYear,
    stagingRows,
    loadScenario,
    revalidateStaging,
    activeScenario
  } = useDemoSession();

  const navigate = useNavigate();

  // Wizard Steps
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCourse, setSelectedCourse] = useState('c-wit-cse');
  const [uploadMode, setUploadMode] = useState<'existing' | 'standard' | 'mapper'>('existing');
  const [uploadedFileName, setUploadedFileName] = useState<string>('WIT_BTech_Admissions_2026.xlsx');
  const [isParsing, setIsParsing] = useState(false);

  // Column Mapping Preview state
  const columnMappings = [
    { uploadedHeader: 'APAAR No / ID', mappedTo: 'apaarId', status: 'Mapped (Auto-detected)' },
    { uploadedHeader: 'Candidate Full Name', mappedTo: 'studentName', status: 'Mapped (Auto-detected)' },
    { uploadedHeader: 'Birth Date (DOB)', mappedTo: 'dateOfBirth', status: 'Mapped (Auto-detected)' },
    { uploadedHeader: 'Gender', mappedTo: 'gender', status: 'Mapped (Auto-detected)' },
    { uploadedHeader: 'Course Branch', mappedTo: 'courseName', status: 'Mapped (Auto-detected)' },
    { uploadedHeader: 'Admission Quota / Category', mappedTo: 'admissionCategory', status: 'Mapped (Auto-detected)' },
    { uploadedHeader: 'Mode of Instruction', mappedTo: 'programmeMode', status: 'Mapped (Auto-detected)' }
  ];

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      setIsParsing(true);
      setTimeout(() => {
        setIsParsing(false);
        setCurrentStep(2);
      }, 600);
    }
  };

  const handleLoadScenarioA = () => {
    loadScenario('A');
    setUploadedFileName('WIT_BTech_CSE_PlantedErrors_Batch.xlsx');
    setCurrentStep(3);
  };

  const handleDownloadErrorReport = () => {
    const errorRows = stagingRows
      .filter(r => r.findings.length > 0)
      .map(r => ({
        Row_Number: r.rowNumber,
        Student_Name: r.studentName,
        APAAR_ID: r.apaarId,
        Error_Code: r.findings[0]?.code,
        Severity: r.findings[0]?.severity,
        Blocking_Flag: r.findings[0]?.isBlocking ? 'BLOCKING_ERROR' : 'REVIEW_FINDING',
        Suggested_Correction: r.findings[0]?.message
      }));
    exportToCSV('WIT_Batch_Validation_Error_Report', errorRows);
  };

  const blockingErrorsCount = stagingRows.filter(r => !r.isValid).length;
  const reviewFindingsCount = stagingRows.filter(r => r.findings.some(f => !f.isBlocking)).length;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Bulk Upload & Ingestion Centre</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Stage, parse, normalize and validate institutional Excel/CSV spreadsheets before central repository commit.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5" />}
            onClick={handleLoadScenarioA}
          >
            Load Scenario A (Planted Batch)
          </Button>
        </div>
      </div>

      {/* Upload Stepper */}
      <div className="grid grid-cols-3 gap-2">
        <div
          onClick={() => setCurrentStep(1)}
          className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
            currentStep === 1
              ? 'bg-blue-50 border-blue-500 font-bold text-blue-900'
              : 'bg-white border-slate-200 text-slate-600'
          }`}
        >
          <span className="block text-[10px] text-slate-400 uppercase">Step 1</span>
          <span>1. Ingestion & Template Mode</span>
        </div>
        <div
          onClick={() => setCurrentStep(2)}
          className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
            currentStep === 2
              ? 'bg-blue-50 border-blue-500 font-bold text-blue-900'
              : 'bg-white border-slate-200 text-slate-600'
          }`}
        >
          <span className="block text-[10px] text-slate-400 uppercase">Step 2</span>
          <span>2. Column Normalization Map</span>
        </div>
        <div
          onClick={() => setCurrentStep(3)}
          className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
            currentStep === 3
              ? 'bg-blue-50 border-blue-500 font-bold text-blue-900'
              : 'bg-white border-slate-200 text-slate-600'
          }`}
        >
          <span className="block text-[10px] text-slate-400 uppercase">Step 3</span>
          <span>3. Staging Validation Summary</span>
        </div>
      </div>

      {/* STEP 1: Upload Configuration */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Academic Cycle & Upload Template Mode</CardTitle>
            <CardDescription>
              Flexible multi-format ingestion accepts existing institutional formats or APAAR-Verify templates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Academic Year</label>
                <select
                  value={academicYear}
                  onChange={e => setAcademicYear(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs focus:bg-white focus:outline-none"
                >
                  <option value="2026-27">Academic Year 2026-27</option>
                  <option value="2025-26">Academic Year 2025-26</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Course / Programme Cohort</label>
                <select
                  value={selectedCourse}
                  onChange={e => setSelectedCourse(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs focus:bg-white focus:outline-none"
                >
                  <option value="c-wit-cse">B.Tech Computer Science & Engineering (Intake: 120)</option>
                  <option value="c-wit-it">B.Tech Information Technology (Intake: 60)</option>
                  <option value="c-wit-ee">B.Tech Electrical Engineering (Intake: 60)</option>
                </select>
              </div>
            </div>

            {/* Ingestion Strategy Options */}
            <div>
              <label className="font-semibold text-slate-700 block mb-2">Ingestion Strategy</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setUploadMode('existing')}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    uploadMode === 'existing'
                      ? 'bg-blue-50/70 border-blue-500 shadow-sm text-blue-900'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <FileSpreadsheet className="w-5 h-5 text-blue-600 mb-1.5" />
                  <span className="font-bold block">Existing College Template</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Upload your institution's existing spreadsheet with auto header recognition.
                  </p>
                </div>

                <div
                  onClick={() => setUploadMode('standard')}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    uploadMode === 'standard'
                      ? 'bg-blue-50/70 border-blue-500 shadow-sm text-blue-900'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <FileText className="w-5 h-5 text-teal-600 mb-1.5" />
                  <span className="font-bold block">Standard APAAR-Verify Template</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Pre-formatted template with standardized fields and data-type hints.
                  </p>
                </div>

                <div
                  onClick={() => setUploadMode('mapper')}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    uploadMode === 'mapper'
                      ? 'bg-blue-50/70 border-blue-500 shadow-sm text-blue-900'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Layers className="w-5 h-5 text-indigo-600 mb-1.5" />
                  <span className="font-bold block">Custom Column Mapper</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Explicitly map arbitrary column aliases to internal normalized schema.
                  </p>
                </div>
              </div>
            </div>

            {/* Dropzone File Selector */}
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50/60 hover:bg-slate-50 transition-colors relative">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleSimulatedFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-bold text-slate-800 text-sm">
                Drop your Excel (.xlsx) or CSV file here, or click to browse
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Selected File: <span className="font-mono text-blue-900 font-semibold">{uploadedFileName}</span>
              </p>
              <p className="text-[10px] text-slate-400 mt-2">
                Simulated local parsing only · No server uploads · Maximum 5,000 rows
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-slate-400">
                Tip: Click "Load Scenario A" in the header to instantly load the planted demonstration batch.
              </span>
              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={() => setCurrentStep(2)}
              >
                Proceed to Column Mapping
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 2: Column Normalization Map */}
      {currentStep === 2 && (
        <Card>
          <CardHeader action={
            <Button variant="outline" size="sm" onClick={() => setCurrentStep(1)}>
              ← Back to File Select
            </Button>
          }>
            <CardTitle>Column Normalization & Mapping Preview</CardTitle>
            <CardDescription>
              Maps source spreadsheet headers to internal canonical student and enrolment schema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 text-xs">
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-teal-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="font-semibold">Automatic Schema Recognition Succeeded: 7 of 7 required attributes mapped.</span>
              </div>
              <Badge variant="teal" size="sm">100% Match Confidence</Badge>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">Uploaded File Column Header</th>
                    <th className="py-2.5 px-4">Internal System Attribute</th>
                    <th className="py-2.5 px-4">Normalization Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {columnMappings.map((m, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-bold text-slate-800">{m.uploadedHeader}</td>
                      <td className="py-2.5 px-4 text-blue-700">{m.mappedTo}</td>
                      <td className="py-2.5 px-4 text-teal-700 font-sans text-[11px] font-medium">
                        {m.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={() => {
                  revalidateStaging();
                  setCurrentStep(3);
                }}
              >
                Execute Validation Checks →
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 3: Staging Validation Summary */}
      {currentStep === 3 && (
        <Card className="border-blue-200">
          <CardHeader action={
            <Button
              variant="outline"
              size="sm"
              icon={<Download className="w-3.5 h-3.5" />}
              onClick={handleDownloadErrorReport}
            >
              Download Error Report (CSV)
            </Button>
          }>
            <CardTitle>Batch Validation Summary: BATCH-2026-WIT-01</CardTitle>
            <CardDescription>
              Pre-submission validation completed for 12 staged student records in B.Tech CSE
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 text-xs">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Staged Rows</span>
                <span className="text-xl font-extrabold text-slate-900">{stagingRows.length}</span>
              </div>
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-teal-700 block">Valid Rows</span>
                <span className="text-xl font-extrabold text-teal-700">
                  {stagingRows.filter(r => r.isValid).length}
                </span>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-red-700 block">Blocking Errors</span>
                <span className="text-xl font-extrabold text-red-700">{blockingErrorsCount}</span>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">Review Findings</span>
                <span className="text-xl font-extrabold text-amber-700">{reviewFindingsCount}</span>
              </div>
            </div>

            {/* Scenario A Finding Alert */}
            {blockingErrorsCount > 0 ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2 text-red-950">
                <span className="font-bold flex items-center gap-1.5 text-red-800">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Commit Gate Engaged: {blockingErrorsCount} Blocking Errors Detected
                </span>
                <p className="leading-relaxed text-red-900">
                  The batch cannot be committed to the central AICTE repository while blocking errors exist. 
                  Row 2 contains an invalid 11-digit APAAR format and Row 5 contains an in-file duplicate.
                </p>
                <div className="pt-2">
                  <Button
                    variant="danger"
                    size="sm"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    onClick={() => navigate('/institution/corrections')}
                  >
                    Open Inline Fix-Before-Submit Editor →
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-2 text-teal-950">
                <span className="font-bold flex items-center gap-1.5 text-teal-800">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  All Blocking Errors Cleared! Ready for Atomic Commit
                </span>
                <p className="leading-relaxed text-teal-900">
                  All rows satisfy mandatory format, duplicate, and required-field rules. Any remaining non-blocking findings 
                  (such as TFW seat cap review) will enter the AICTE review queue upon commit.
                </p>
                <div className="pt-2">
                  <Button
                    variant="success"
                    size="sm"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    onClick={() => navigate('/institution/corrections')}
                  >
                    Proceed to Commit Gate →
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

