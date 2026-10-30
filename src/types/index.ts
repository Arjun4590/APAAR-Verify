export type DemoRole = 
  | 'admin'                  // AICTE Officer / Senior Reviewer
  | 'institution_admin'      // Institution Admin (Western Institute of Tech)
  | 'institution_operator'   // Institution Data Operator
  | 'student'                // Student (Aarav Sharma)
  | 'stakeholder';           // Stakeholder Verifier (TCS Talent Verification)

export interface Student {
  id: string;
  apaarId: string | null;
  name: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  institutionId: string;
  studentNumber: string;
  admissionYear: number;
  currentStatus: 'Admitted' | 'Active' | 'Transferred' | 'Withdrawn' | 'Graduated';
  verificationStatus: 'Verified' | 'Partially Verified' | 'Pending' | 'Review Required';
  mergedIntoStudentId?: string | null;
  sourceMode?: 'local-reference' | 'simulated';
}

export interface Enrolment {
  id: string;
  studentId: string;
  institutionId: string;
  courseId: string;
  academicYear: string;
  admissionYear: number;
  admissionCategory: 'General' | 'TFW' | 'EWS' | 'FN/OCI/CIWG' | 'Lateral Entry' | 'Management';
  entryType: 'Regular' | 'Lateral Entry';
  programmeMode: 'Physical' | 'Online' | 'ODL';
  shiftTiming?: string;
  status: 'Admitted' | 'Active' | 'Transferred' | 'Withdrawn' | 'Graduated';
  priorQualification?: string;
  originalStudentId?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  level: 'Diploma' | 'UG' | 'PG';
  department: string;
  approvedIntake: number;
  actualEnrolment: number;
  academicYear: string;
  ruleStatus: 'Within Cap' | 'Warning' | 'Exceeded Cap';
}

export interface Institution {
  id: string;
  code: string;
  name: string;
  state: string;
  district: string;
  institutionType: 'Government' | 'Govt-Aided' | 'Private-Unaided' | 'Autonomous';
  reportingGroup: 'PGDM/PGCM' | 'Regular Technical' | 'ODL/Online';
  approvalStatus: 'AICTE Approved' | 'Extension Granted' | 'Under Scrutiny';
  latestAcademicYear: string;
  submissionStatus: 'Committed' | 'Under Review' | 'Draft' | 'Pending Submission';
  validationStatus: 'Verified' | 'Warnings' | 'Blocking Errors' | 'Needs Review';
  lastSubmission: string;
  contactEmail: string;
  contactPhone: string;
  courses: Course[];
  historicalEnrolment?: {
    year: string;
    intake: number;
    enrolled: number;
    fillRate: number;
  }[];
}

export interface Finding {
  id: string;
  type: 
    | 'FORMAT_ERROR'
    | 'DUPLICATE_APAAR'
    | 'FUZZY_IDENTITY'
    | 'DUAL_ENROLMENT'
    | 'REGULATORY_CAP'
    | 'LIFECYCLE_CONFLICT'
    | 'STATISTICAL_ANOMALY';
  title: string;
  description: string;
  severity: 'Info' | 'Low' | 'Medium' | 'High';
  status: 
    | 'New'
    | 'Awaiting Institution'
    | 'Institution Responded'
    | 'Under Review'
    | 'Escalated'
    | 'Resolved';
  institutionId: string;
  institutionName?: string;
  studentIds?: string[];
  studentNames?: string[];
  ruleId?: string;
  ruleVersion?: string;
  sourceMode: 'local-reference' | 'simulated';
  evidence: Record<string, any>;
  suggestedAction: string;
  createdAt: string;
  institutionResponse?: {
    text: string;
    respondedAt: string;
    supportingDoc?: string;
  };
  reviewerNotes?: string;
  history?: {
    action: string;
    by: string;
    timestamp: string;
    notes?: string;
  }[];
}

export interface RegulatoryRule {
  id: string;
  ruleCode: string;
  name: string;
  category: 'APAAR Format' | 'Supernumerary Cap' | 'Lateral Entry' | 'Dual Enrolment' | 'Intake Limit';
  applicableScope: string;
  academicYear: string;
  capOrCondition: string;
  sourceHandbookClause: string;
  effectiveDate: string;
  version: string;
  status: 'Active' | 'Draft' | 'Pending Confirmation';
  notes: string;
}

export interface StagingRow {
  rowNumber: number;
  studentName: string;
  apaarId: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  courseId: string;
  courseName: string;
  admissionCategory: 'General' | 'TFW' | 'EWS' | 'FN/OCI/CIWG' | 'Lateral Entry';
  entryType: 'Regular' | 'Lateral Entry';
  programmeMode: 'Physical' | 'Online';
  findings: {
    code: string;
    field: string;
    message: string;
    isBlocking: boolean;
    severity: 'High' | 'Medium' | 'Low';
  }[];
  isValid: boolean;
  status: 'Valid' | 'Needs Correction' | 'Review Required';
}

export interface SubmissionBatch {
  id: string;
  institutionId: string;
  institutionName: string;
  academicYear: string;
  courseName: string;
  createdAt: string;
  totalRows: number;
  validRows: number;
  blockingErrors: number;
  reviewFindings: number;
  status: 
    | 'Draft'
    | 'Uploaded'
    | 'Validation Failed'
    | 'Validation Passed'
    | 'Committed'
    | 'Under Review'
    | 'Accepted'
    | 'Correction Requested';
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  entity: string;
  description: string;
  previousHash: string;
  currentHash: string;
  status: 'Verified Chain' | 'Appended';
}

export interface ThirdPartyVerificationRequest {
  id: string;
  studentId: string;
  studentName: string;
  apaarIdMasked: string;
  token: string;
  requestingOrg: string;
  purpose: string;
  requestedFields: string[];
  requestDate: string;
  expiryDate: string;
  consentStatus: 'Pending Approval' | 'Approved' | 'Rejected' | 'Revoked';
  resultStatus: 'Pending' | 'Verified' | 'Partial' | 'Mismatched';
  source: 'Local Demo Repository' | 'Simulated APAAR Connector' | 'Simulated NAD Connector';
}

export interface StudentCorrectionRequest {
  id: string;
  studentId: string;
  studentName: string;
  category: 'Name' | 'DOB' | 'Institution' | 'Course' | 'Admission Year' | 'Status' | 'Duplicate';
  description: string;
  correctValue: string;
  submittedAt: string;
  status: 'Submitted to Institution' | 'Under Review' | 'Accepted' | 'Rejected';
  supportingDocName?: string;
}

