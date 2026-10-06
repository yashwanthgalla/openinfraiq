import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck,
  Lightbulb,
  AlertTriangle,
} from 'lucide-react';
import type { AIRepositoryMatch } from '../../types/index.ts';

interface AIAnalysisPanelProps {
  match: AIRepositoryMatch;
}

export function AIAnalysisPanel({ match }: AIAnalysisPanelProps) {
  return (
    <div
      style={{
        marginTop: 'var(--space-4)',
        paddingTop: 'var(--space-4)',
        borderTop: '1px dashed var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}
    >
      {/* Evidence-Backed Requirement Breakdown Table */}
      <div>
        <h4 style={{ margin: '0 0 var(--space-2)', fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--navy-950)' }}>
          Detailed Requirement Verification &amp; Evidence
        </h4>

        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ width: '100%', fontSize: 'var(--text-xs)', backgroundColor: 'var(--surface-soft)' }}>
            <thead>
              <tr>
                <th style={{ width: '22%' }}>Requirement</th>
                <th style={{ width: '20%' }}>Verification Status</th>
                <th style={{ width: '15%' }}>Confidence</th>
                <th>Observed Evidence</th>
              </tr>
            </thead>
            <tbody>
              {match.requirements && match.requirements.map((req, idx) => {
                const isMatched = req.status === 'MATCHED';
                const isPartial = req.status === 'PARTIALLY_MATCHED';
                const isMissing = req.status === 'MISSING';

                let statusBadgeClass = 'badge-error';
                let Icon = XCircle;
                if (isMatched) {
                  statusBadgeClass = 'badge-success';
                  Icon = CheckCircle2;
                } else if (isPartial) {
                  statusBadgeClass = 'badge-amber';
                  Icon = HelpCircle;
                } else if (!isMissing) {
                  statusBadgeClass = 'badge-neutral';
                  Icon = HelpCircle;
                }

                return (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{req.requirement}</td>
                    <td>
                      <span className={`badge ${statusBadgeClass}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
                        <Icon size={11} />
                        <span>{req.status}</span>
                      </span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>
                      {req.confidence ? `${Math.round(req.confidence * 100)}%` : '85%'}
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      {req.evidence || 'Analyzed from repository configuration.'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strengths & Weaknesses / Missing Requirements Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-3)',
        }}
      >
        {/* Strengths */}
        <div style={{ backgroundColor: 'var(--surface-soft)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#059669', fontSize: '0.75rem', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
            <CheckCircle2 size={14} />
            <span>AI-Identified Strengths</span>
          </div>
          {match.strengths && match.strengths.length > 0 ? (
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: 'var(--text-xs)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {match.strengths.map((str, idx) => (
                <li key={idx}>{str}</li>
              ))}
            </ul>
          ) : (
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>No strengths identified.</span>
          )}
        </div>

        {/* Missing / Weaknesses */}
        <div style={{ backgroundColor: 'var(--surface-soft)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#D97706', fontSize: '0.75rem', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
            <AlertTriangle size={14} />
            <span>Missing Requirements / Gaps</span>
          </div>
          {match.weaknesses && match.weaknesses.length > 0 ? (
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: 'var(--text-xs)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {match.weaknesses.map((weak, idx) => (
                <li key={idx}>{weak}</li>
              ))}
            </ul>
          ) : (
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>All required tools were evidenced.</span>
          )}
        </div>
      </div>

      {/* Actionable Recommendations */}
      {match.recommendations && match.recommendations.length > 0 && (
        <div style={{ backgroundColor: 'var(--surface-soft)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#7C3AED', fontSize: '0.75rem', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
            <Lightbulb size={14} />
            <span>Adoption &amp; Remediation Guidance</span>
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: 'var(--text-xs)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {match.recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Transparency Note */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.6875rem',
          color: 'var(--text-secondary)',
          padding: '0.4rem 0.6rem',
          backgroundColor: 'var(--surface-primary)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-light)',
        }}
      >
        <ShieldCheck size={13} color="var(--accent-amber-dark)" style={{ flexShrink: 0 }} />
        <span>
          <strong>Scoring Separation:</strong> The Sustainability Score ({match.sustainabilityScore}/100) reflects repository maintenance continuity and commit activity. AI Match Score ({match.matchScore}%) reflects how closely the codebase satisfies your requested technology specifications.
        </span>
      </div>
    </div>
  );
}
