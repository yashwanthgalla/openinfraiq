import { Lightbulb, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { AIRequirementResponse, AIRepositoryMatch } from '../../types/index.ts';

interface AIRecommendationsProps {
  requirements: AIRequirementResponse;
  matches: AIRepositoryMatch[];
}

export function AIRecommendations({ requirements, matches }: AIRecommendationsProps) {
  if (!matches || matches.length === 0) return null;

  // Identify frequently missing requirements across candidates
  const missingMap = new Map<string, number>();
  matches.forEach((m) => {
    m.requirements?.forEach((r) => {
      if (r.status === 'MISSING') {
        missingMap.set(r.requirement, (missingMap.get(r.requirement) || 0) + 1);
      }
    });
  });

  const commonGaps = Array.from(missingMap.entries())
    .filter(([_, count]) => count >= Math.ceil(matches.length / 2))
    .map(([req]) => req);

  return (
    <div
      className="card"
      style={{
        padding: 'var(--space-5)',
        backgroundColor: 'var(--surface-primary)',
        borderLeft: '4px solid #7C3AED',
        border: '1px solid var(--border-light)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: 'var(--space-2)', color: '#7C3AED' }}>
        <Lightbulb size={18} />
        <h4 style={{ margin: 0, fontSize: 'var(--text-sm)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Platform Engineering Adoption Advisory
        </h4>
      </div>

      <p style={{ margin: '0 0 var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        Cross-repository analysis for <strong>{requirements.category}</strong>:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-primary)' }}>
        {commonGaps.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', backgroundColor: 'var(--surface-soft)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ color: '#D97706', fontWeight: 700 }}>• Ecosystem Gap Notice:</span>
            <span>
              Most candidate repositories lack native configuration for <strong>{commonGaps.join(', ')}</strong>. Plan to supplement the selected baseline with separate monitoring or deployment modules.
            </span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', backgroundColor: 'var(--surface-soft)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
          <CheckCircle2 size={14} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>
            Pin infrastructure module versions strictly to avoid breaking changes in upstream provider dependencies (e.g. AWS provider for Terraform, Kubernetes API versions).
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', backgroundColor: 'var(--surface-soft)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
          <ShieldCheck size={14} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>
            Verify continuous maintenance health via OpenInfraIQ's 9 Sustainability Metrics before committing to enterprise production infrastructure.
          </span>
        </div>
      </div>
    </div>
  );
}
