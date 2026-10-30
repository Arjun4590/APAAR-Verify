import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DemoRole,
  Institution,
  Student,
  Enrolment,
  Finding,
  RegulatoryRule,
  SubmissionBatch,
  StagingRow,
  AuditEvent,
  ThirdPartyVerificationRequest,
  StudentCorrectionRequest
} from '../types';

import { initialInstitutions } from '../data/institutions';
import { initialRegulatoryRules } from '../data/rules';
import { initialStudents } from '../data/students';
import { initialEnrolments } from '../data/enrolments';
import { initialFindings } from '../data/findings';
import { initialSubmissionBatches, scenarioA_StagingRows, scenarioB_StagingRows, scenarioC_StagingRows } from '../data/submissions';
import { initialVerificationRequests, initialCorrectionRequests } from '../data/verifications';
import { initialAuditLogs } from '../data/auditLogs';
import { revalidateStagingRows } from '../utils/validation';
import { generateSimulatedHash } from '../utils/hashChain';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'danger';
}

interface DemoSessionContextType {
  currentRole: DemoRole;
  setRole: (role: DemoRole) => void;
  academicYear: string;
  setAcademicYear: (year: string) => void;
  selectedInstitutionId: string;
  setSelectedInstitutionId: (id: string) => void;

  institutions: Institution[];
  students: Student[];
  enrolments: Enrolment[];
  findings: Finding[];
  rules: RegulatoryRule[];
  submissionBatches: SubmissionBatch[];
  stagingRows: StagingRow[];
  auditLogs: AuditEvent[];
  verificationRequests: ThirdPartyVerificationRequest[];
  correctionRequests: StudentCorrectionRequest[];
  notifications: NotificationItem[];
  activeScenario: string;

  // Actions
  loadScenario: (scenario: 'A' | 'B' | 'C' | 'D' | 'E' | 'F') => void;
  updateStagingRow: (rowNumber: number, field: string, value: any) => void;
  revalidateStaging: () => void;
  commitStagingBatch: () => { success: boolean; message: string };
  updateFindingStatus: (id: string, newStatus: Finding['status'], notes?: string) => void;
  respondToFinding: (id: string, responseText: string, supportingDoc?: string) => void;
  confirmFuzzyIdentity: (findingId: string, isSamePerson: boolean) => void;
  reverseFuzzyIdentityMerge: (findingId: string) => void;
  updateStudentConsent: (requestId: string, status: 'Approved' | 'Rejected' | 'Revoked') => void;
  submitStudentCorrection: (category: StudentCorrectionRequest['category'], description: string, correctValue: string, docName?: string) => void;
  submitStakeholderVerificationRequest: (req: {
    studentReference: string;
    orgName: string;
    purpose: string;
    fields: string[];
  }) => ThirdPartyVerificationRequest;
  updateRule: (id: string, updatedFields: Partial<RegulatoryRule>) => void;
  resetDemoData: () => void;
  markNotificationsAsRead: () => void;
  addAuditEvent: (action: string, entity: string, description: string, actor?: string, role?: string) => void;
}

const STORAGE_KEY = 'apaar_verify_demo_state_v1';

const DemoSessionContext = createContext<DemoSessionContextType | undefined>(undefined);

export const DemoSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setRole] = useState<DemoRole>('admin');
  const [academicYear, setAcademicYear] = useState<string>('2026-27');
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>('inst-wit-01');
  const [activeScenario, setActiveScenario] = useState<string>('A');

  const [institutions, setInstitutions] = useState<Institution[]>(initialInstitutions);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [enrolments, setEnrolments] = useState<Enrolment[]>(initialEnrolments);
  const [findings, setFindings] = useState<Finding[]>(initialFindings);
  const [rules, setRules] = useState<RegulatoryRule[]>(initialRegulatoryRules);
  const [submissionBatches, setSubmissionBatches] = useState<SubmissionBatch[]>(initialSubmissionBatches);
  const [stagingRows, setStagingRows] = useState<StagingRow[]>(scenarioA_StagingRows);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(initialAuditLogs);
  const [verificationRequests, setVerificationRequests] = useState<ThirdPartyVerificationRequest[]>(initialVerificationRequests);
  const [correctionRequests, setCorrectionRequests] = useState<StudentCorrectionRequest[]>(initialCorrectionRequests);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Staging Batch Failed Validation',
      message: 'Western Institute of Technology batch BATCH-2026-WIT-01 has 2 blocking errors.',
      timestamp: '10 mins ago',
      read: false,
      type: 'danger'
    },
    {
      id: 'notif-2',
      title: 'New Third-Party Request',
      message: 'Tata Consultancy Services submitted verification token VRF-2026-8821 for Aarav Sharma.',
      timestamp: '1 hour ago',
      read: false,
      type: 'info'
    },
    {
      id: 'notif-3',
      title: 'Statistical Anomaly Flagged',
      message: 'Apex Institute B.Tech fill rate cliff detected (42.2%). Review required.',
      timestamp: '2 hours ago',
      read: false,
      type: 'warning'
    }
  ]);

  // Load from LocalStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentRole) setRole(parsed.currentRole);
        if (parsed.institutions) setInstitutions(parsed.institutions);
        if (parsed.students) setStudents(parsed.students);
        if (parsed.enrolments) setEnrolments(parsed.enrolments);
        if (parsed.findings) setFindings(parsed.findings);
        if (parsed.rules) setRules(parsed.rules);
        if (parsed.submissionBatches) setSubmissionBatches(parsed.submissionBatches);
        if (parsed.stagingRows) setStagingRows(parsed.stagingRows);
        if (parsed.auditLogs) setAuditLogs(parsed.auditLogs);
        if (parsed.verificationRequests) setVerificationRequests(parsed.verificationRequests);
        if (parsed.correctionRequests) setCorrectionRequests(parsed.correctionRequests);
      }
    } catch (e) {
      console.warn('Could not parse localStorage state', e);
    }
  }, []);

  // Sync to LocalStorage on meaningful change
  const saveToStorage = (updates: any) => {
    try {
      const current = localStorage.getItem(STORAGE_KEY);
      const parsed = current ? JSON.parse(current) : {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...parsed, ...updates }));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  };

  const addAuditEvent = (action: string, entity: string, description: string, actor?: string, role?: string) => {
    setAuditLogs(prev => {
      const lastHash = prev.length > 0 ? prev[prev.length - 1].currentHash : '0000000000000000000000000000000000000000000000000000000000000000';
      const newHash = generateSimulatedHash(lastHash, `${action}-${entity}-${Date.now()}`);
      const newEvent: AuditEvent = {
        id: `AUD-${String(prev.length + 1095).padStart(6, '0')}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        actor: actor || (currentRole === 'admin' ? 'Dr. S. Sen (AICTE Officer)' : currentRole === 'student' ? 'Aarav Sharma (Student)' : 'WIT Admin Operator'),
        role: role || (currentRole === 'admin' ? 'AICTE Officer' : currentRole === 'student' ? 'Student' : 'Institution Admin'),
        action,
        entity,
        description,
        previousHash: lastHash,
        currentHash: newHash,
        status: 'Verified Chain'
      };
      const updated = [...prev, newEvent];
      saveToStorage({ auditLogs: updated });
      return updated;
    });
  };

  const loadScenario = (scenario: 'A' | 'B' | 'C' | 'D' | 'E' | 'F') => {
    setActiveScenario(scenario);
    if (scenario === 'A') {
      setStagingRows(scenarioA_StagingRows);
      setRole('institution_admin');
      setSelectedInstitutionId('inst-wit-01');
      addAuditEvent('LOAD_SCENARIO_A', 'BATCH-2026-WIT-01', 'Loaded Scenario A: Fix-Before-Submit (11-digit APAAR, duplicate row, TFW cap).');
    } else if (scenario === 'B') {
      setStagingRows(scenarioB_StagingRows);
      setRole('admin');
      addAuditEvent('LOAD_SCENARIO_B', 'CASE-00042', 'Loaded Scenario B: Exact APAAR Match across Physical + Online institution.');
    } else if (scenario === 'C') {
      setStagingRows(scenarioC_StagingRows);
      setRole('admin');
      addAuditEvent('LOAD_SCENARIO_C', 'CASE-00078', 'Loaded Scenario C: Fuzzy Identity Candidate with Overlapping Shift Timing.');
    } else if (scenario === 'D') {
      setRole('admin');
      addAuditEvent('LOAD_SCENARIO_D', 'inst-apex-04', 'Loaded Scenario D: Institutional Anomaly (Fill-Rate Cliff).');
    } else if (scenario === 'E') {
      setRole('institution_admin');
      setSelectedInstitutionId('inst-wit-01');
      addAuditEvent('LOAD_SCENARIO_E', 'stu-priya-04', 'Loaded Scenario E: Legitimate Lateral Entry Progression.');
    } else if (scenario === 'F') {
      setRole('student');
      addAuditEvent('LOAD_SCENARIO_F', 'VRF-2026-8821', 'Loaded Scenario F: Student Consent & Stakeholder Verification.');
    }
  };

  const updateStagingRow = (rowNumber: number, field: string, value: any) => {
    setStagingRows(prev => {
      const updated = prev.map(r => {
        if (r.rowNumber === rowNumber) {
          return { ...r, [field]: value };
        }
        return r;
      });
      // automatically revalidate on edit
      const validated = revalidateStagingRows(validatedRowsHelper(updated));
      saveToStorage({ stagingRows: validated });
      return validated;
    });
  };

  const validatedRowsHelper = (rows: StagingRow[]) => {
    return rows;
  };

  const revalidateStaging = () => {
    setStagingRows(prev => {
      const validated = revalidateStagingRows(prev);
      saveToStorage({ stagingRows: validated });
      addAuditEvent('REVALIDATE_STAGING', 'BATCH-2026-WIT-01', `Revalidated staging batch: ${validated.filter(r => !r.isValid).length} blocking errors remaining.`);
      return validated;
    });
  };

  const commitStagingBatch = (): { success: boolean; message: string } => {
    const validated = revalidateStagingRows(stagingRows);
    const blockingCount = validated.filter(r => !r.isValid).length;

    if (blockingCount > 0) {
      return {
        success: false,
        message: `Commit Rejected: Staging batch contains ${blockingCount} blocking data error(s). Fix all blocking errors before submitting.`
      };
    }

    // Promotes verified staging rows into repository
    const newStudents: Student[] = [];
    const newEnrolments: Enrolment[] = [];

    validated.forEach(r => {
      // Check if student exists
      const existing = students.find(s => s.apaarId === r.apaarId && r.apaarId !== '');
      const studentId = existing ? existing.id : `stu-comm-${r.rowNumber}-${Date.now().toString().slice(-4)}`;
      
      if (!existing) {
        newStudents.push({
          id: studentId,
          apaarId: r.apaarId || null,
          name: r.studentName,
          dateOfBirth: r.dateOfBirth,
          gender: r.gender,
          institutionId: 'inst-wit-01',
          studentNumber: `WIT-2026-CSE-${String(r.rowNumber).padStart(3, '0')}`,
          admissionYear: 2026,
          currentStatus: 'Active',
          verificationStatus: r.findings.length > 0 ? 'Review Required' : 'Verified',
          sourceMode: 'local-reference'
        });
      }

      newEnrolments.push({
        id: `enr-comm-${r.rowNumber}-${Date.now().toString().slice(-4)}`,
        studentId: studentId,
        institutionId: 'inst-wit-01',
        courseId: 'c-wit-cse',
        academicYear: '2026-27',
        admissionYear: 2026,
        admissionCategory: r.admissionCategory,
        entryType: r.entryType,
        programmeMode: r.programmeMode,
        shiftTiming: '09:00 - 16:30',
        status: 'Active'
      });
    });

    const updatedStudents = [...students, ...newStudents];
    const updatedEnrolments = [...enrolments, ...newEnrolments];

    // Update batch status
    const updatedBatches = submissionBatches.map(b => {
      if (b.id === 'BATCH-2026-WIT-01') {
        return {
          ...b,
          validRows: validated.length,
          blockingErrors: 0,
          reviewFindings: validated.filter(r => r.findings.length > 0).length,
          status: 'Committed' as const
        };
      }
      return b;
    });

    // If review findings existed (e.g. TFW 7th admission), update finding
    const tfwExcessFinding = validated.some(r => r.findings.some(f => f.code === 'WARN_REG_TFW_CAP'));
    if (tfwExcessFinding) {
      setFindings(prev => prev.map(f => {
        if (f.id === 'CASE-00140') {
          return {
            ...f,
            status: 'Awaiting Institution' as const,
            history: [
              ...(f.history || []),
              {
                action: 'Batch Committed to Review Queue',
                by: 'WIT Admin Operator',
                timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
                notes: 'Batch committed with 1 supernumerary category cap review finding.'
              }
            ]
          };
        }
        return f;
      }));
    }

    setStudents(updatedStudents);
    setEnrolments(updatedEnrolments);
    setSubmissionBatches(updatedBatches);

    addAuditEvent(
      'ATOMIC_BATCH_COMMIT',
      'BATCH-2026-WIT-01',
      `Promoted ${validated.length} verified staging rows into repository. Status set to Committed.`
    );

    saveToStorage({
      students: updatedStudents,
      enrolments: updatedEnrolments,
      submissionBatches: updatedBatches
    });

    return {
      success: true,
      message: `Batch BATCH-2026-WIT-01 committed successfully! ${validated.length} records added to Central Student Repository.`
    };
  };

  const updateFindingStatus = (id: string, newStatus: Finding['status'], notes?: string) => {
    setFindings(prev => {
      const updated = prev.map(f => {
        if (f.id === id) {
          const newHistory = [
            ...(f.history || []),
            {
              action: `Status changed to ${newStatus}`,
              by: currentRole === 'admin' ? 'AICTE Reviewer' : 'Institution Admin',
              timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
              notes
            }
          ];
          return {
            ...f,
            status: newStatus,
            reviewerNotes: notes || f.reviewerNotes,
            history: newHistory
          };
        }
        return f;
      });
      saveToStorage({ findings: updated });
      return updated;
    });

    addAuditEvent('FINDING_STATUS_UPDATE', id, `Finding ${id} transitioned to "${newStatus}". Notes: ${notes || 'None'}`);
  };

  const respondToFinding = (id: string, responseText: string, supportingDoc?: string) => {
    setFindings(prev => {
      const updated = prev.map(f => {
        if (f.id === id) {
          return {
            ...f,
            status: 'Institution Responded' as const,
            institutionResponse: {
              text: responseText,
              respondedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
              supportingDoc: supportingDoc || 'Explanatory_Letter.pdf'
            },
            history: [
              ...(f.history || []),
              {
                action: 'Institution Clarification Submitted',
                by: 'WIT Authorized Operator',
                timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
                notes: responseText
              }
            ]
          };
        }
        return f;
      });
      saveToStorage({ findings: updated });
      return updated;
    });

    addAuditEvent('INSTITUTION_RESPONSE', id, `Institution submitted explanation for ${id}: "${responseText.slice(0, 60)}..."`);
  };

  const confirmFuzzyIdentity = (findingId: string, isSamePerson: boolean) => {
    if (isSamePerson) {
      // Identity Merge: STU-rohit-02 merged into STU-rohit-03
      setStudents(prev => {
        const updated = prev.map(s => {
          if (s.id === 'stu-rohit-02') {
            return {
              ...s,
              mergedIntoStudentId: 'stu-rohit-03',
              verificationStatus: 'Verified' as const
            };
          }
          if (s.id === 'stu-rohit-03') {
            return {
              ...s,
              verificationStatus: 'Verified' as const
            };
          }
          return s;
        });
        saveToStorage({ students: updated });
        return updated;
      });

      // Repoint enrolment
      setEnrolments(prev => {
        const updated = prev.map(e => {
          if (e.studentId === 'stu-rohit-02') {
            return {
              ...e,
              originalStudentId: 'stu-rohit-02',
              studentId: 'stu-rohit-03'
            };
          }
          return e;
        });
        saveToStorage({ enrolments: updated });
        return updated;
      });

      updateFindingStatus(findingId, 'Resolved', 'Reviewer confirmed same person. Atomic identity link executed: Rohit S. Verma merged into Rohit Verma (994812345678).');
      addAuditEvent('IDENTITY_MERGE_CONFIRMED', 'stu-rohit-02 -> stu-rohit-03', 'Reviewer confirmed same identity. Linked WIT CSE enrolment to surviving identity Rohit Verma.');
    } else {
      // Mark as different people (do-not-match pair)
      updateFindingStatus(findingId, 'Resolved', 'Reviewer confirmed distinct individuals. Recorded in do-not-match registry.');
      addAuditEvent('IDENTITY_MATCH_REJECTED', 'stu-rohit-02 != stu-rohit-03', 'Reviewer determined records belong to different individuals.');
    }
  };

  const reverseFuzzyIdentityMerge = (findingId: string) => {
    // Revert identity merge
    setStudents(prev => {
      const updated = prev.map(s => {
        if (s.id === 'stu-rohit-02') {
          return {
            ...s,
            mergedIntoStudentId: null,
            verificationStatus: 'Review Required' as const
          };
        }
        return s;
      });
      saveToStorage({ students: updated });
      return updated;
    });

    setEnrolments(prev => {
      const updated = prev.map(e => {
        if (e.originalStudentId === 'stu-rohit-02') {
          return {
            ...e,
            studentId: 'stu-rohit-02',
            originalStudentId: undefined
          };
        }
        return e;
      });
      saveToStorage({ enrolments: updated });
      return updated;
    });

    updateFindingStatus(findingId, 'Under Review', 'Identity merge reversed by Senior Reviewer.');
    addAuditEvent('IDENTITY_MERGE_REVERSED', 'stu-rohit-02', 'Reversed identity merge. Restored original separate student identity records.');
  };

  const updateStudentConsent = (requestId: string, status: 'Approved' | 'Rejected' | 'Revoked') => {
    setVerificationRequests(prev => {
      const updated = prev.map(r => {
        if (r.id === requestId) {
          return {
            ...r,
            consentStatus: status,
            resultStatus: status === 'Approved' ? ('Verified' as const) : ('Pending' as const)
          };
        }
        return r;
      });
      saveToStorage({ verificationRequests: updated });
      return updated;
    });

    addAuditEvent('STUDENT_CONSENT_ACTION', requestId, `Student updated third-party consent status to "${status}" for ${requestId}.`);
  };

  const submitStudentCorrection = (
    category: StudentCorrectionRequest['category'],
    description: string,
    correctValue: string,
    docName?: string
  ) => {
    const newCorr: StudentCorrectionRequest = {
      id: `CORR-2026-${String(correctionRequests.length + 102).padStart(3, '0')}`,
      studentId: 'stu-aarav-01',
      studentName: 'Aarav Sharma',
      category,
      description,
      correctValue,
      submittedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'Submitted to Institution',
      supportingDocName: docName || 'Supporting_Document.pdf'
    };

    const updated = [newCorr, ...correctionRequests];
    setCorrectionRequests(updated);
    saveToStorage({ correctionRequests: updated });
    addAuditEvent('STUDENT_CORRECTION_FILED', newCorr.id, `Student Aarav Sharma reported incorrect ${category}: "${correctValue}".`);
  };

  const submitStakeholderVerificationRequest = (req: {
    studentReference: string;
    orgName: string;
    purpose: string;
    fields: string[];
  }): ThirdPartyVerificationRequest => {
    const isAaravToken = req.studentReference.includes('8821') || req.studentReference.toLowerCase().includes('aarav');
    const student = isAaravToken ? students.find(s => s.id === 'stu-aarav-01') : students[0];

    const newReq: ThirdPartyVerificationRequest = {
      id: `req-stk-${Date.now().toString().slice(-4)}`,
      studentId: student?.id || 'stu-aarav-01',
      studentName: student?.name || 'Aarav Sharma',
      apaarIdMasked: student ? '•••• •••• ' + (student.apaarId?.slice(-4) || '9012') : '•••• •••• 9012',
      token: req.studentReference || `VRF-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      requestingOrg: req.orgName || 'Tata Consultancy Services',
      purpose: req.purpose || 'Employment Verification',
      requestedFields: req.fields.length ? req.fields : ['Full Name', 'Institution', 'Programme', 'Status'],
      requestDate: new Date().toISOString().slice(0, 10),
      expiryDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().slice(0, 10),
      consentStatus: 'Pending Approval',
      resultStatus: 'Pending',
      source: 'Simulated APAAR Connector'
    };

    const updated = [newReq, ...verificationRequests];
    setVerificationRequests(updated);
    saveToStorage({ verificationRequests: updated });
    addAuditEvent('STAKEHOLDER_REQUEST_CREATED', newReq.token, `New background verification request created by ${newReq.requestingOrg}.`);
    return newReq;
  };

  const updateRule = (id: string, updatedFields: Partial<RegulatoryRule>) => {
    setRules(prev => {
      const updated = prev.map(r => (r.id === id ? { ...r, ...updatedFields } : r));
      saveToStorage({ rules: updated });
      return updated;
    });
    addAuditEvent('REGULATORY_RULE_EDITED', id, `Updated regulatory rule parameters for ${id}.`);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setInstitutions(initialInstitutions);
    setStudents(initialStudents);
    setEnrolments(initialEnrolments);
    setFindings(initialFindings);
    setRules(initialRegulatoryRules);
    setSubmissionBatches(initialSubmissionBatches);
    setStagingRows(scenarioA_StagingRows);
    setAuditLogs(initialAuditLogs);
    setVerificationRequests(initialVerificationRequests);
    setCorrectionRequests(initialCorrectionRequests);
    setRole('admin');
    setActiveScenario('A');
    alert('Demo data has been reset to default synthetic state.');
  };

  return (
    <DemoSessionContext.Provider
      value={{
        currentRole,
        setRole,
        academicYear,
        setAcademicYear,
        selectedInstitutionId,
        setSelectedInstitutionId,
        institutions,
        students,
        enrolments,
        findings,
        rules,
        submissionBatches,
        stagingRows,
        auditLogs,
        verificationRequests,
        correctionRequests,
        notifications,
        activeScenario,

        loadScenario,
        updateStagingRow,
        revalidateStaging,
        commitStagingBatch,
        updateFindingStatus,
        respondToFinding,
        confirmFuzzyIdentity,
        reverseFuzzyIdentityMerge,
        updateStudentConsent,
        submitStudentCorrection,
        submitStakeholderVerificationRequest,
        updateRule,
        resetDemoData,
        markNotificationsAsRead,
        addAuditEvent
      }}
    >
      {children}
    </DemoSessionContext.Provider>
  );
};

export const useDemoSession = () => {
  const context = useContext(DemoSessionContext);
  if (!context) {
    throw new Error('useDemoSession must be used within a DemoSessionProvider');
  }
  return context;
};

