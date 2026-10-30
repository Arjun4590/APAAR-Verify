import { RegulatoryRule } from '../types';

export const initialRegulatoryRules: RegulatoryRule[] = [
  {
    id: 'rule-apaar-01',
    ruleCode: 'RULE-APAAR-01',
    name: 'APAAR 12-Digit Numeric Identifier Format Check',
    category: 'APAAR Format',
    applicableScope: 'All AICTE technical, management & diploma programmes',
    academicYear: '2026-27',
    capOrCondition: 'Exactly 12 numeric digits; soft warning for repeating/sequential patterns',
    sourceHandbookClause: 'MoE APAAR Implementation Circular 2024; APH 2024-27 Annexure 3',
    effectiveDate: '2024-06-01',
    version: 'v2.1',
    status: 'Active',
    notes: 'No Verhoeff checksum applied. Non-12-digit strings are blocking errors.'
  },
  {
    id: 'rule-tfw-01',
    ruleCode: 'RULE-TFW-01',
    name: 'Tuition Fee Waiver (TFW) Supernumerary Seat Cap',
    category: 'Supernumerary Cap',
    applicableScope: 'AICTE approved UG Engineering & Technology, Pharmacy, Architecture',
    academicYear: '2026-27',
    capOrCondition: 'Maximum 5% of sanctioned approved intake, supernumerary',
    sourceHandbookClause: 'AICTE Approval Process Handbook (APH) 2024-27, Clause 2.15',
    effectiveDate: '2024-04-01',
    version: 'v1.4',
    status: 'Active',
    notes: 'Requires review if admissions exceed ceil(intake * 0.05). Example: 120 intake allows 6 seats; 7th seat flags review.'
  },
  {
    id: 'rule-fn-ug-01',
    ruleCode: 'RULE-FN-UG-01',
    name: 'Foreign Nationals / OCI / CIWG Supernumerary Cap (UG)',
    category: 'Supernumerary Cap',
    applicableScope: 'Engineering & Technology Diploma and Undergraduate programmes',
    academicYear: '2026-27',
    capOrCondition: 'Maximum 15% of approved intake over and above approved intake',
    sourceHandbookClause: 'AICTE APH 2024-27, Chapter II, Clause 2.16 (Supernumerary)',
    effectiveDate: '2024-04-01',
    version: 'v1.1',
    status: 'Active',
    notes: 'Verify against current handbook for country-specific quotas.'
  },
  {
    id: 'rule-fn-pg-01',
    ruleCode: 'RULE-FN-PG-01',
    name: 'Foreign Nationals / OCI / CIWG Supernumerary Cap (PG/Management)',
    category: 'Supernumerary Cap',
    applicableScope: 'Engineering PG, PGDM, MBA and allied management disciplines',
    academicYear: '2026-27',
    capOrCondition: 'Maximum 25% of approved intake over and above approved intake',
    sourceHandbookClause: 'AICTE APH 2024-27, Chapter II, Clause 2.16 (PG Slabs)',
    effectiveDate: '2024-04-01',
    version: 'v1.0',
    status: 'Active',
    notes: 'Configurable slab for executive and postgraduate cohorts.'
  },
  {
    id: 'rule-lat-01',
    ruleCode: 'RULE-LAT-01',
    name: 'Lateral Entry (2nd Year Direct Admission) Capacity Assessment',
    category: 'Lateral Entry',
    applicableScope: 'Applicable Engineering & Technology undergraduate programmes',
    academicYear: '2026-27',
    capOrCondition: 'Base 10% over approved intake + stateful carry-over of previous year vacancies (pending confirmation)',
    sourceHandbookClause: 'AICTE APH 2024-27, Clause 2.14 & Lateral Entry Annexure',
    effectiveDate: '2024-04-01',
    version: 'v2.0-draft',
    status: 'Pending Confirmation',
    notes: 'Carry-over of unfilled 1st year seats remains subject to handbook confirmation. Displayed as configurable.'
  },
  {
    id: 'rule-dual-01',
    ruleCode: 'RULE-DUAL-01',
    name: 'Concurrent / Dual Enrolment Decision Matrix',
    category: 'Dual Enrolment',
    applicableScope: 'All participating institutions (Technical + Non-Technical/Online)',
    academicYear: '2026-27',
    capOrCondition: 'Physical + Online: Informational; Physical + Physical: Shift timing overlap check required',
    sourceHandbookClause: 'UGC Guidelines on Simultaneous Academic Programmes (April 2022 / June 2025 Modification)',
    effectiveDate: '2022-09-30',
    version: 'v1.3-provisional',
    status: 'Pending Confirmation',
    notes: 'Applicability of UGC dual degree framework to AICTE technical courses is treated as provisional in this demo.'
  },
  {
    id: 'rule-intake-01',
    ruleCode: 'RULE-INTAKE-01',
    name: 'Total Sanctioned Intake Capacity Limit',
    category: 'Intake Limit',
    applicableScope: 'All AICTE Approved Institutions and Courses',
    academicYear: '2026-27',
    capOrCondition: 'Regular admissions must not exceed approved intake without approved supernumerary quota',
    sourceHandbookClause: 'AICTE Act 1987, Regulations Section 10(k)',
    effectiveDate: '2020-01-01',
    version: 'v3.0',
    status: 'Active',
    notes: 'Enrolment counts rolled up strictly from validated student-level records.'
  }
];

