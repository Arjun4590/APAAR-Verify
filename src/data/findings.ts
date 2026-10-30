import { Finding } from '../types';

export const initialFindings: Finding[] = [
  {
    id: 'CASE-00042',
    type: 'DUAL_ENROLMENT',
    title: 'Cross-Institution Enrolment — Dual Mode (Physical + Online)',
    description: 'Exact APAAR ID 123456789012 detected across Western Institute of Technology (Physical) and National Open Academy (Online). Under UGC 2022 simultaneous programme matrix, this is permitted and informational.',
    severity: 'Info',
    status: 'Resolved',
    institutionId: 'inst-wit-01',
    institutionName: 'Western Institute of Technology (Demo)',
    studentIds: ['stu-aarav-01'],
    studentNames: ['Aarav Sharma'],
    ruleId: 'RULE-DUAL-01',
    ruleVersion: 'v1.3-provisional',
    sourceMode: 'local-reference',
    evidence: {
      apaarId: '123456789012',
      institutionA: 'Western Institute of Technology (B.Tech CSE - Physical)',
      institutionB: 'National Open & Online Learning Academy (BCA - Online/ODL)',
      timingOverlap: false,
      regulatoryAssessment: 'Permitted under UGC Simultaneous Degree Guidelines 2022 (One Physical + One Online/ODL)',
      verdict: 'INFORMATIONAL_NO_VIOLATION'
    },
    suggestedAction: 'No adverse action required. Mark as verified concurrent enrolment.',
    createdAt: '2026-10-24 10:30',
    reviewerNotes: 'Verified compliant with UGC 2022 dual programme guidelines. Record marked verified.',
    history: [
      {
        action: 'System Detection',
        by: 'Engine A3/A5',
        timestamp: '2026-10-24 10:30',
        notes: 'Cross-institution exact APAAR match detected.'
      },
      {
        action: 'Reviewer Review',
        by: 'AICTE Scrutiny Officer (S. Sen)',
        timestamp: '2026-10-24 14:10',
        notes: 'Confirmed one mode is asynchronous online. Closed as informational.'
      }
    ]
  },
  {
    id: 'CASE-00078',
    type: 'FUZZY_IDENTITY',
    title: 'Fuzzy Identity Candidate with Overlapping Physical Shift Timing',
    description: 'Possible duplicate student identity across two institutions with identical DOB, 92.5% phonetic token similarity, but one record lacks APAAR. Both enrolments are regular physical programmes with overlapping morning shifts.',
    severity: 'High',
    status: 'Under Review',
    institutionId: 'inst-wit-01',
    institutionName: 'Western Institute of Technology (Demo)',
    studentIds: ['stu-rohit-02', 'stu-rohit-03'],
    studentNames: ['Rohit S. Verma', 'Rohit Verma'],
    ruleId: 'RULE-DUAL-01',
    ruleVersion: 'v1.3-provisional',
    sourceMode: 'local-reference',
    evidence: {
      similarityScore: 92.5,
      dobMatch: true,
      dob: '2004-07-14',
      record1: {
        id: 'stu-rohit-02',
        name: 'Rohit S. Verma',
        apaar: 'Missing',
        institution: 'Western Institute of Technology',
        course: 'B.Tech CSE (Physical)',
        shift: '08:30 - 15:30'
      },
      record2: {
        id: 'stu-rohit-03',
        name: 'Rohit Verma',
        apaar: '994812345678',
        institution: 'Delhi Metropolitan Engineering College',
        course: 'B.Tech ECE (Physical)',
        shift: '09:00 - 16:00'
      },
      shiftConflict: 'High overlap: both are physical full-time day shifts situated in different states (Maharashtra & Delhi)',
      humanConfirmationRequired: true
    },
    suggestedAction: 'Require human confirmation before identity merge. Request official biometric/photo or 10th marksheet verification from both institutions.',
    createdAt: '2026-10-25 11:45',
    history: [
      {
        action: 'Blocked Candidate Generated',
        by: 'Engine A4 (RapidFuzz + Phonetic Token)',
        timestamp: '2026-10-25 11:45',
        notes: 'Shared DOB (2004-07-14) + shared phonetic token ("verma").'
      }
    ]
  },
  {
    id: 'CASE-00105',
    type: 'STATISTICAL_ANOMALY',
    title: 'Institutional Fill-Rate Cliff Against Peer Group',
    description: 'Institution passed individual format and regulatory checks (A1-A6 clean), but exhibits an abrupt 45.5% drop in B.Tech Mechanical & Civil fill rate compared to 76.5% peer median.',
    severity: 'Medium',
    status: 'Awaiting Institution',
    institutionId: 'inst-apex-04',
    institutionName: 'Apex Institute of Advanced Engineering (Demo)',
    ruleId: 'STAT-PEER-03',
    ruleVersion: 'v2.0',
    sourceMode: 'local-reference',
    evidence: {
      metric: 'Course Fill Rate (Enrolled / Approved Intake)',
      currentYearFillRate: '42.2%',
      previousYearFillRate: '87.7%',
      historicalBaseline: '90.0% (2023-24)',
      peerMedian: '76.5%',
      iqrThreshold: '58.0% (Lower boundary)',
      affectedCourses: ['B.Tech Mechanical Engineering', 'B.Tech Civil Engineering'],
      contextualNote: 'Not a determination of fraud. Risk signal for scrutiny regarding faculty strength, lab infrastructure, or unannounced intake changes.'
    },
    suggestedAction: 'Request institutional explanation regarding admission counselling allocation and branch surrender status.',
    createdAt: '2026-10-26 15:20',
    history: [
      {
        action: 'Statistical Signal Flagged',
        by: 'Engine A7 (Multi-Year Anomaly Detector)',
        timestamp: '2026-10-26 15:20',
        notes: 'Fill rate dropped below IQR lower boundary.'
      }
    ]
  },
  {
    id: 'CASE-00140',
    type: 'REGULATORY_CAP',
    title: 'TFW Supernumerary Category Intake Cap Exceeded',
    description: 'Western Institute of Technology uploaded 7 Tuition Fee Waiver (TFW) admissions for B.Tech CSE against a configured 5% supernumerary ceiling of 6 seats (approved intake: 120).',
    severity: 'Medium',
    status: 'New',
    institutionId: 'inst-wit-01',
    institutionName: 'Western Institute of Technology (Demo)',
    ruleId: 'RULE-TFW-01',
    ruleVersion: 'v1.4',
    sourceMode: 'local-reference',
    evidence: {
      course: 'B.Tech Computer Science & Engineering',
      approvedIntake: 120,
      configuredTfwCapPercentage: '5%',
      maxPermittedTfwSeats: 6,
      reportedTfwAdmissions: 7,
      excessSeats: 1,
      sourceClause: 'AICTE APH 2024-27 Clause 2.15'
    },
    suggestedAction: 'Institution must verify state counselling quota allotment letter or reclassify unapproved 7th seat to General / Management category.',
    createdAt: '2026-10-28 09:15',
    history: [
      {
        action: 'Regulatory Engine Trigger',
        by: 'Engine A2 (Category Cap Evaluator)',
        timestamp: '2026-10-28 09:15',
        notes: 'Seat count (7) exceeds permitted cap (6).'
      }
    ]
  }
];

