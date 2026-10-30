import { StagingRow } from '../types';

export function validateApaarFormat(apaar: string | null | undefined): {
  isValid: boolean;
  isBlocking: boolean;
  message?: string;
  isWarning?: boolean;
} {
  if (!apaar || apaar.trim() === '') {
    return {
      isValid: false,
      isBlocking: true,
      message: 'Missing mandatory APAAR identifier'
    };
  }

  const clean = apaar.replace(/\s+/g, '');
  if (!/^\d+$/.test(clean)) {
    return {
      isValid: false,
      isBlocking: true,
      message: 'APAAR ID must contain numeric digits only'
    };
  }

  if (clean.length !== 12) {
    return {
      isValid: false,
      isBlocking: true,
      message: `Invalid format: ${clean.length} digits found (exactly 12 numeric digits required)`
    };
  }

  // Soft warnings (non-blocking)
  if (/^(\d)\1{11}$/.test(clean)) {
    return {
      isValid: true,
      isBlocking: false,
      isWarning: true,
      message: 'Data quality notice: Repeated identical digit pattern detected'
    };
  }

  return { isValid: true, isBlocking: false };
}

export function revalidateStagingRows(
  rows: StagingRow[],
  approvedIntake: number = 120,
  tfwCapPercent: number = 0.05
): StagingRow[] {
  const apaarCounts = new Map<string, number[]>();
  rows.forEach((r, idx) => {
    const clean = r.apaarId.replace(/\s+/g, '');
    if (clean) {
      const existing = apaarCounts.get(clean) || [];
      existing.push(idx);
      apaarCounts.set(clean, existing);
    }
  });

  const maxTfwSeats = Math.ceil(approvedIntake * tfwCapPercent);
  let tfwCount = 0;

  return rows.map((row, idx) => {
    const findings: StagingRow['findings'] = [];
    const cleanApaar = row.apaarId.replace(/\s+/g, '');

    // 1. APAAR format check
    const apaarCheck = validateApaarFormat(cleanApaar);
    if (!apaarCheck.isValid) {
      findings.push({
        code: 'ERR_APAAR_FORMAT',
        field: 'apaarId',
        message: apaarCheck.message || 'Invalid APAAR format',
        isBlocking: apaarCheck.isBlocking,
        severity: 'High'
      });
    } else if (apaarCheck.isWarning) {
      findings.push({
        code: 'WARN_APAAR_PATTERN',
        field: 'apaarId',
        message: apaarCheck.message || 'Unusual APAAR pattern',
        isBlocking: false,
        severity: 'Low'
      });
    }

    // 2. In-file duplicate check
    if (cleanApaar && (apaarCounts.get(cleanApaar)?.length || 0) > 1) {
      const occurrences = apaarCounts.get(cleanApaar)!;
      if (occurrences[0] !== idx) {
        // Second or later occurrence is blocking
        findings.push({
          code: 'ERR_INFILE_DUPLICATE',
          field: 'apaarId',
          message: `In-file Duplicate Record: Same APAAR ID already present in Row ${occurrences[0] + 1}`,
          isBlocking: true,
          severity: 'High'
        });
      }
    }

    // 3. TFW Category Cap Check
    if (row.admissionCategory === 'TFW') {
      tfwCount += 1;
      if (tfwCount > maxTfwSeats) {
        findings.push({
          code: 'WARN_REG_TFW_CAP',
          field: 'admissionCategory',
          message: `TFW Supernumerary Cap: Admission #${tfwCount} exceeds configured ${tfwCapPercent * 100}% limit (${maxTfwSeats} seats permitted for intake ${approvedIntake}). Enters review queue upon commit.`,
          isBlocking: false,
          severity: 'Medium'
        });
      }
    }

    const hasBlocking = findings.some(f => f.isBlocking);
    const hasWarnings = findings.length > 0;

    return {
      ...row,
      findings,
      isValid: !hasBlocking,
      status: hasBlocking ? 'Needs Correction' : hasWarnings ? 'Review Required' : 'Valid'
    };
  });
}

