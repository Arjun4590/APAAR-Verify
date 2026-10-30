import { SubmissionBatch, StagingRow } from '../types';

export const initialSubmissionBatches: SubmissionBatch[] = [
  {
    id: 'BATCH-2026-WIT-01',
    institutionId: 'inst-wit-01',
    institutionName: 'Western Institute of Technology',
    academicYear: '2026-27',
    courseName: 'B.Tech Computer Science & Engineering',
    createdAt: '2026-10-28 10:15',
    totalRows: 12,
    validRows: 9,
    blockingErrors: 2,
    reviewFindings: 1,
    status: 'Validation Failed'
  },
  {
    id: 'BATCH-2026-DMEC-02',
    institutionId: 'inst-dtu-02',
    institutionName: 'Delhi Metropolitan Engineering College',
    academicYear: '2026-27',
    courseName: 'B.Tech Electronics & Communication',
    createdAt: '2026-10-18 11:10',
    totalRows: 120,
    validRows: 119,
    blockingErrors: 0,
    reviewFindings: 1,
    status: 'Committed'
  },
  {
    id: 'BATCH-2026-BIMS-01',
    institutionId: 'inst-bims-03',
    institutionName: 'Bengaluru Institute of Management Studies',
    academicYear: '2026-27',
    courseName: 'Post Graduate Diploma in Management',
    createdAt: '2026-10-20 16:30',
    totalRows: 240,
    validRows: 236,
    blockingErrors: 0,
    reviewFindings: 0,
    status: 'Committed'
  }
];

// Initial staging rows for institutional admissions verification
export const initialStagingRows: StagingRow[] = [
  {
    rowNumber: 1,
    studentName: 'Aarav Sharma',
    apaarId: '123456789012',
    dateOfBirth: '2005-05-12',
    gender: 'Male',
    courseId: 'c-wit-cse',
    courseName: 'B.Tech Computer Science & Engineering',
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Physical',
    findings: [],
    isValid: true,
    status: 'Valid'
  },
  {
    rowNumber: 2,
    studentName: 'Rohan Jayant Deshmukh',
    apaarId: '98451029381', // 11 digits format error
    dateOfBirth: '2005-08-20',
    gender: 'Male',
    courseId: 'c-wit-cse',
    courseName: 'B.Tech Computer Science & Engineering',
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Physical',
    findings: [
      {
        code: 'ERR_APAAR_FORMAT',
        field: 'apaarId',
        message: 'Invalid APAAR format: String has 11 digits (exactly 12 numeric digits required)',
        isBlocking: true,
        severity: 'High'
      }
    ],
    isValid: false,
    status: 'Needs Correction'
  },
  {
    rowNumber: 3,
    studentName: 'Megha Sudhakar Rao',
    apaarId: '228491029384',
    dateOfBirth: '2005-11-03',
    gender: 'Female',
    courseId: 'c-wit-cse',
    courseName: 'B.Tech Computer Science & Engineering',
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Physical',
    findings: [],
    isValid: true,
    status: 'Valid'
  },
  {
    rowNumber: 4,
    studentName: 'Aditya K. Kulkarni',
    apaarId: '449182736450',
    dateOfBirth: '2005-03-15',
    gender: 'Male',
    courseId: 'c-wit-cse',
    courseName: 'B.Tech Computer Science & Engineering',
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Physical',
    findings: [],
    isValid: true,
    status: 'Valid'
  },
  {
    rowNumber: 5,
    studentName: 'Aditya K. Kulkarni',
    apaarId: '449182736450', // In-file duplicate of row 4
    dateOfBirth: '2005-03-15',
    gender: 'Male',
    courseId: 'c-wit-cse',
    courseName: 'B.Tech Computer Science & Engineering',
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Physical',
    findings: [
      {
        code: 'ERR_INFILE_DUPLICATE',
        field: 'apaarId',
        message: 'In-file Duplicate Record: Same APAAR ID already present in Row 4',
        isBlocking: true,
        severity: 'High'
      }
    ],
    isValid: false,
    status: 'Needs Correction'
  },
  {
    rowNumber: 6,
    studentName: 'Sunil Joshi',
    apaarId: '550192837461',
    dateOfBirth: '2005-02-10',
    gender: 'Male',
    courseId: 'c-wit-cse',
    courseName: 'B.Tech Computer Science & Engineering',
    admissionCategory: 'TFW',
    entryType: 'Regular',
    programmeMode: 'Physical',
    findings: [],
    isValid: true,
    status: 'Valid'
  },
  {
    rowNumber: 7,
    studentName: 'Pooja Nair',
    apaarId: '550192837462',
    dateOfBirth: '2005-04-18',
    gender: 'Female',
    courseId: 'c-wit-cse',
    courseName: 'B.Tech Computer Science & Engineering',
    admissionCategory: 'TFW',
    entryType: 'Regular',
    programmeMode: 'Physical',
    findings: [],
    isValid: true,
    status: 'Valid'
  },
  {
    rowNumber: 8,
    studentName: 'Kunal Patil',
    apaarId: '550192837463',
    dateOfBirth: '2005-07-22',
    gender: 'Male',
    courseId: 'c-wit-cse',
    courseName: 'B.Tech Computer Science & Engineering',
    admissionCategory: 'TFW',
    entryType: 'Regular',
    programmeMode: 'Physical',
    findings: [],
    isValid: true,
    status: 'Valid'
  },
  {
    rowNumber: 9,
    studentName: 'Shruti Iyer',
    apaarId: '550192837464',
    dateOfBirth: '2005-09-09',
    gender: 'Female',
    courseId: 'c-wit-cse',
    courseName: 'B.Tech Computer Science & Engineering',
    admissionCategory: 'TFW',
    entryType: 'Regular',
    programmeMode: 'Physical',
    findings: [],
    isValid: true,
    status: 'Valid'
  },
  {
    rowNumber: 10,
    studentName: 'Gaurav Shinde',
    apaarId: '550192837465',
    dateOfBirth: '2005-12-01',
    gender: 'Male',
    courseId: 'c-wit-cse',
    courseName: 'B.Tech Computer Science & Engineering',
    admissionCategory: 'TFW',
    entryType: 'Regular',
    programmeMode: 'Physical',
    findings: [],
    isValid: true,
    status: 'Valid'
  },
  {
    rowNumber: 11,
    studentName: 'Neha Kadam',
    apaarId: '550192837466',
    dateOfBirth: '2005-10-14',
    gender: 'Female',
    courseId: 'c-wit-cse',
    courseName: 'B.Tech Computer Science & Engineering',
    admissionCategory: 'TFW',
    entryType: 'Regular',
    programmeMode: 'Physical',
    findings: [],
    isValid: true,
    status: 'Valid'
  },
  {
    rowNumber: 12,
    studentName: 'Naveen R. Gaikwad',
    apaarId: '550192837467',
    dateOfBirth: '2005-06-25',
    gender: 'Male',
    courseId: 'c-wit-cse',
    courseName: 'B.Tech Computer Science & Engineering',
    admissionCategory: 'TFW',
    entryType: 'Regular',
    programmeMode: 'Physical',
    findings: [
      {
        code: 'WARN_REG_TFW_CAP',
        field: 'admissionCategory',
        message: 'Category Cap Finding: 7 TFW admissions exceed configured 5% supernumerary limit (6 seats permitted for 120 intake). Enters human review queue upon commit.',
        isBlocking: false,
        severity: 'Medium'
      }
    ],
    isValid: true,
    status: 'Review Required'
  }
];

// Backwards-compatible aliases for existing references
export const scenarioA_StagingRows = initialStagingRows;
export const scenarioB_StagingRows = initialStagingRows;
export const scenarioC_StagingRows = initialStagingRows;


