import { ThirdPartyVerificationRequest, StudentCorrectionRequest } from '../types';

export const initialVerificationRequests: ThirdPartyVerificationRequest[] = [
  {
    id: 'req-tcs-01',
    studentId: 'stu-aarav-01',
    studentName: 'Aarav Sharma',
    apaarIdMasked: '•••• •••• 9012',
    token: 'VRF-2026-8821',
    requestingOrg: 'Tata Consultancy Services (Talent Acquisition & BGV)',
    purpose: 'Campus Placement Pre-onboarding Background Check',
    requestedFields: [
      'Full Name & Date of Birth',
      'Enrolled Institution (WIT Demo)',
      'Degree Programme (B.Tech CSE)',
      'Academic Year & Admission Year',
      'Current Enrolment Status (Active)'
    ],
    requestDate: '2026-10-28',
    expiryDate: '2026-11-28',
    consentStatus: 'Pending Approval', // Can be approved in Scenario F
    resultStatus: 'Pending',
    source: 'Local Demo Repository'
  },
  {
    id: 'req-infy-02',
    studentId: 'stu-aarav-01',
    studentName: 'Aarav Sharma',
    apaarIdMasked: '•••• •••• 9012',
    token: 'VRF-2026-7492',
    requestingOrg: 'Infosys Limited (Graduates Programme)',
    purpose: 'Internship Candidacy Verification',
    requestedFields: [
      'Full Name',
      'Institution & Programme',
      'Current Status'
    ],
    requestDate: '2026-10-15',
    expiryDate: '2026-11-15',
    consentStatus: 'Approved',
    resultStatus: 'Verified',
    source: 'Simulated APAAR Connector'
  },
  {
    id: 'req-wipro-03',
    studentId: 'stu-ananya-05',
    studentName: 'Ananya Deshmukh',
    apaarIdMasked: '•••• •••• 4019',
    token: 'VRF-2026-5519',
    requestingOrg: 'Cognizant Technology Solutions',
    purpose: 'Pre-Employment Academic Records Audit',
    requestedFields: [
      'Full Name & DOB',
      'Enrolled Institution',
      'Degree Programme & GPA'
    ],
    requestDate: '2026-10-02',
    expiryDate: '2026-11-02',
    consentStatus: 'Rejected',
    resultStatus: 'Pending',
    source: 'Local Demo Repository'
  }
];

export const initialCorrectionRequests: StudentCorrectionRequest[] = [
  {
    id: 'CORR-2026-101',
    studentId: 'stu-aarav-01',
    studentName: 'Aarav Sharma',
    category: 'DOB',
    description: 'Aadhaar marksheet records 12 May 2005. Initial institutional draft had transposed month and date.',
    correctValue: '12-05-2005',
    submittedAt: '2026-10-12 14:22',
    status: 'Accepted',
    supportingDocName: 'Class_X_Marksheet_Aarav.pdf'
  }
];

