export function maskApaar(apaar: string | null | undefined): string {
  if (!apaar) return '— Not Linked —';
  const clean = apaar.replace(/\s+/g, '');
  if (clean.length === 12) {
    return `${clean.slice(0, 4)} •••• ${clean.slice(8)}`;
  }
  return `•••• •••• ${clean.slice(-4)}`;
}

export function formatApaarFull(apaar: string | null | undefined): string {
  if (!apaar) return '—';
  const clean = apaar.replace(/\s+/g, '');
  if (clean.length === 12) {
    return `${clean.slice(0, 4)} ${clean.slice(4, 8)} ${clean.slice(8, 12)}`;
  }
  return clean;
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function getSeverityBadgeClass(severity: 'Info' | 'Low' | 'Medium' | 'High'): string {
  switch (severity) {
    case 'High':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'Medium':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Low':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Info':
      return 'bg-slate-50 text-slate-700 border-slate-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
}

export function getStatusBadgeClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'verified':
    case 'within cap':
    case 'committed':
    case 'approved':
    case 'active':
    case 'accepted':
    case 'valid':
      return 'bg-teal-50 text-teal-700 border-teal-200 font-medium';
    case 'partially verified':
    case 'warning':
    case 'needs review':
    case 'review required':
    case 'under review':
    case 'institution responded':
    case 'awaiting institution':
    case 'needs correction':
    case 'pending approval':
      return 'bg-amber-50 text-amber-700 border-amber-200 font-medium';
    case 'blocking errors':
    case 'validation failed':
    case 'exceeded cap':
    case 'high':
    case 'rejected':
      return 'bg-red-50 text-red-700 border-red-200 font-medium';
    default:
      return 'bg-slate-50 text-slate-600 border-slate-200 font-medium';
  }
}

