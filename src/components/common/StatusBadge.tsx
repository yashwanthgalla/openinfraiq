/* ==========================================================================
   InfraMaturity - Status Badge Component
   Maps assessment states to standardized non-fabricated status labels.
   ========================================================================== */

import type { AssessmentStatus } from '../../types/index.ts';

interface StatusBadgeProps {
  status: AssessmentStatus | string;
  size?: 'sm' | 'md';
}

interface StatusConfig {
  label: string;
  className: string;
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const getStatusConfig = (s: string): StatusConfig => {
    switch (s) {
      case 'available':
        return { label: 'Available', className: 'badge-success' };
      case 'analyzing':
        return { label: 'Analyzing', className: 'badge-amber' };
      case 'insufficient_evidence':
        return { label: 'Insufficient Evidence', className: 'badge-warning' };
      case 'unavailable':
        return { label: 'Analysis Unavailable', className: 'badge-error' };
      case 'needs_review':
        return { label: 'Needs Review', className: 'badge-warning' };
      case 'not_assessed':
      default:
        return { label: 'Not Assessed', className: 'badge-neutral' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`badge ${config.className}`}
      style={{
        fontSize: size === 'sm' ? 'var(--text-xs)' : '0.8125rem',
        padding: size === 'sm' ? '0.15rem 0.5rem' : '0.25rem 0.65rem',
      }}
    >
      <span className="badge-dot" aria-hidden="true" />
      {config.label}
    </span>
  );
}
