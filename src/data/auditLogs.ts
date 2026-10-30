import { AuditEvent } from '../types';

export const initialAuditLogs: AuditEvent[] = [
  {
    id: 'AUD-001091',
    timestamp: '2026-10-24 10:30:14',
    actor: 'System Ingestion Worker',
    role: 'System',
    action: 'BATCH_STAGING_INGEST',
    entity: 'BATCH-2026-WIT-01',
    description: 'Parsed 12 staging records for Western Institute of Technology (CSE-101). Staged in upload_batch_rows.',
    previousHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    currentHash: '7a8f9021bde4c89134a01c77f09314eb881249b1ca489110d7ef902bca489101',
    status: 'Verified Chain'
  },
  {
    id: 'AUD-001092',
    timestamp: '2026-10-24 10:30:19',
    actor: 'Engine A1-A6 Validator',
    role: 'System',
    action: 'VALIDATION_EXECUTION',
    entity: 'BATCH-2026-WIT-01',
    description: 'Validation failed with 2 blocking errors (11-digit APAAR, in-file duplicate) and 1 category cap finding (TFW limit).',
    previousHash: '7a8f9021bde4c89134a01c77f09314eb881249b1ca489110d7ef902bca489101',
    currentHash: '31cb8944f019a84210e34c90d810294bdf19024bca81902478a01948bca01948',
    status: 'Verified Chain'
  },
  {
    id: 'AUD-001093',
    timestamp: '2026-10-24 14:10:45',
    actor: 'Dr. S. Sen (Scrutiny Officer)',
    role: 'AICTE Officer',
    action: 'FINDING_RESOLVED',
    entity: 'CASE-00042',
    description: 'Resolved cross-institution dual enrolment as informational under UGC 2022 physical+online matrix.',
    previousHash: '31cb8944f019a84210e34c90d810294bdf19024bca81902478a01948bca01948',
    currentHash: '849104bce90148ad01928374019284758190248aef0192847102948bca019284',
    status: 'Verified Chain'
  },
  {
    id: 'AUD-001094',
    timestamp: '2026-10-26 15:20:00',
    actor: 'Engine A7 Anomaly Detector',
    role: 'System',
    action: 'ANOMALY_SIGNAL_RAISED',
    entity: 'inst-apex-04',
    description: 'Flagged course fill-rate cliff (42.2% vs 76.5% peer median) for Apex Institute of Advanced Engineering.',
    previousHash: '849104bce90148ad01928374019284758190248aef0192847102948bca019284',
    currentHash: 'b102948ca901847102938471092847102948bca901847102948bcaf019284710',
    status: 'Verified Chain'
  }
];

