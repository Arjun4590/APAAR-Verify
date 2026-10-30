import { Enrolment } from '../types';

export const initialEnrolments: Enrolment[] = [
  {
    id: 'enr-aarav-wit',
    studentId: 'stu-aarav-01',
    institutionId: 'inst-wit-01',
    courseId: 'c-wit-cse',
    academicYear: '2026-27',
    admissionYear: 2024,
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Physical',
    shiftTiming: '09:00 - 16:30 (Full-time Day)',
    status: 'Active'
  },
  {
    // Dual Enrolment: Concurrent Physical + Online Degree (UGC 2022 Guidelines)
    id: 'enr-aarav-noola',
    studentId: 'stu-aarav-01',
    institutionId: 'inst-sol-05',
    courseId: 'c-sol-bca',
    academicYear: '2026-27',
    admissionYear: 2024,
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Online',
    shiftTiming: 'Asynchronous / Self-Paced LMS',
    status: 'Active'
  },
  {
    // Candidate Record 1: WIT CSE Enrolment (APAAR Missing at admission)
    id: 'enr-rohit-wit',
    studentId: 'stu-rohit-02',
    institutionId: 'inst-wit-01',
    courseId: 'c-wit-cse',
    academicYear: '2026-27',
    admissionYear: 2024,
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Physical',
    shiftTiming: '08:30 - 15:30 (Regular Morning)',
    status: 'Active'
  },
  {
    // Candidate Record 2: DMEC ECE Enrolment (Has APAAR, Overlapping Shift Timing)
    id: 'enr-rohit-dmec',
    studentId: 'stu-rohit-03',
    institutionId: 'inst-dtu-02',
    courseId: 'c-dmec-ece',
    academicYear: '2026-27',
    admissionYear: 2024,
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Physical',
    shiftTiming: '09:00 - 16:00 (Regular Morning)',
    status: 'Active'
  },
  {
    // Lateral Entry: 2nd Year Direct Admission with Qualifying Diploma
    id: 'enr-priya-wit',
    studentId: 'stu-priya-04',
    institutionId: 'inst-wit-01',
    courseId: 'c-wit-ee',
    academicYear: '2026-27',
    admissionYear: 2025,
    admissionCategory: 'Lateral Entry',
    entryType: 'Lateral Entry',
    programmeMode: 'Physical',
    shiftTiming: '09:00 - 16:30',
    status: 'Active',
    priorQualification: 'Diploma in Electrical Engineering (MSBTE, 86.4%)'
  },
  {
    id: 'enr-ananya-wit',
    studentId: 'stu-ananya-05',
    institutionId: 'inst-wit-01',
    courseId: 'c-wit-cse',
    academicYear: '2026-27',
    admissionYear: 2024,
    admissionCategory: 'TFW',
    entryType: 'Regular',
    programmeMode: 'Physical',
    shiftTiming: '09:00 - 16:30',
    status: 'Active'
  },
  {
    id: 'enr-vikram-bims',
    studentId: 'stu-vikram-06',
    institutionId: 'inst-bims-03',
    courseId: 'c-bims-pgdm',
    academicYear: '2026-27',
    admissionYear: 2025,
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Physical',
    shiftTiming: '09:30 - 17:30',
    status: 'Active'
  },
  {
    id: 'enr-sneha-wit',
    studentId: 'stu-sneha-07',
    institutionId: 'inst-wit-01',
    courseId: 'c-wit-it',
    academicYear: '2026-27',
    admissionYear: 2024,
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Physical',
    shiftTiming: '09:00 - 16:30',
    status: 'Active'
  },
  {
    id: 'enr-tanvi-gec',
    studentId: 'stu-tanvi-08',
    institutionId: 'inst-gec-06',
    courseId: 'c-gec-cse',
    academicYear: '2026-27',
    admissionYear: 2024,
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Physical',
    shiftTiming: '09:00 - 16:00',
    status: 'Active'
  },
  {
    id: 'enr-devendra-apex',
    studentId: 'stu-devendra-09',
    institutionId: 'inst-apex-04',
    courseId: 'c-apex-mech',
    academicYear: '2026-27',
    admissionYear: 2024,
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Physical',
    shiftTiming: '09:00 - 16:30',
    status: 'Active'
  },
  {
    id: 'enr-kavita-wit',
    studentId: 'stu-kavita-10',
    institutionId: 'inst-wit-01',
    courseId: 'c-wit-mba',
    academicYear: '2026-27',
    admissionYear: 2025,
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Physical',
    shiftTiming: '10:00 - 17:00',
    status: 'Active'
  },
  {
    id: 'enr-rahul-dmec',
    studentId: 'stu-rahul-11',
    institutionId: 'inst-dtu-02',
    courseId: 'c-dmec-cse',
    academicYear: '2026-27',
    admissionYear: 2024,
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Physical',
    shiftTiming: '09:00 - 16:00',
    status: 'Active'
  },
  {
    id: 'enr-siddharth-wit',
    studentId: 'stu-siddharth-12',
    institutionId: 'inst-wit-01',
    courseId: 'c-wit-cse',
    academicYear: '2026-27',
    admissionYear: 2024,
    admissionCategory: 'General',
    entryType: 'Regular',
    programmeMode: 'Physical',
    shiftTiming: '09:00 - 16:30',
    status: 'Active'
  }
];

