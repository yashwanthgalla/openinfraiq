/* ==========================================================================
   InfraMaturity - Transparent Score Formulation & Calculation Breakdown
   Presents the complete mathematical formulation, normalized weight vectors,
   points contributed, and continuity status tier classification.
   ========================================================================== */

import { useState } from 'react';
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  FileCode2,
} from 'lucide-react';
import type { ScoringBreakdownData, CoreSustainabilityMetricItem } from '../../types/index.ts';

interface ScoreCalculationSectionProps {
  breakdown: ScoringBreakdownData;
  metrics: CoreSustainabilityMetricItem[];
  continuityStatus: string;
}

export function ScoreCalculationSection({
  breakdown,
  metrics,
  continuityStatus,
}: ScoreCalculationSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className="card"
      style={{
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-md)',
        padding: 'var(--space-6)',
        backgroundColor: 'var(--surface-primary)',
      }}
    >
      {/* Header with Toggle */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          marginBottom: isExpanded ? 'var(--space-4)' : 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              color: 'var(--accent-amber-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Calculator size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--navy-950)', margin: 0 }}>
                How We Calculated the Sustainability Score
              </h2>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  backgroundColor: 'var(--navy-900)',
                  color: '#ffffff',
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 600,
                }}
              >
                Score: {breakdown.compositeScore}/100
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
              Empirical multi-vector weighted formulation evaluating the 9 non-popularity core dimensions.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn btn-outline btn-sm"
          style={{
            fontSize: 'var(--text-xs)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          {isExpanded ? (
            <>
              <span>Collapse Breakdown</span>
              <ChevronUp size={14} />
            </>
          ) : (
            <>
              <span>View Calculation Formula</span>
              <ChevronDown size={14} />
            </>
          )}
        </button>
      </div>

      {/* Expanded Breakdown */}
      {isExpanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Mathematical Formula Banner */}
          <div
            style={{
              backgroundColor: 'var(--navy-950)',
              color: 'var(--text-inverse)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4)',
              border: '1px solid var(--navy-800)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.6875rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-amber)',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: 'var(--space-2)',
              }}
            >
              <FileCode2 size={13} />
              <span>Multi-Linear Additive Scoring Formulation</span>
            </div>

            {/* General Formula */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                marginBottom: 'var(--space-3)',
                paddingBottom: 'var(--space-2)',
                borderBottom: '1px solid var(--navy-800)',
                color: '#E2E8F0',
              }}
            >
              <span style={{ color: 'var(--accent-amber)' }}>Composite Sustainability Score</span> ={' '}
              <span style={{ color: '#60A5FA' }}>&sum;</span>
              <sub>i=1..9</sub> ( <span style={{ color: '#FCD34D' }}>NormalizedScore<sub>i</sub></span> &times;{' '}
              <span style={{ color: '#34D399' }}>Weight<sub>i</sub></span> )
            </div>

            {/* Injected Numerical Equation */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78125rem',
                color: '#94A3B8',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                lineHeight: 1.6,
                padding: 'var(--space-2) 0',
              }}
            >
              {metrics.map((m, idx) => (
                <span key={m.id}>
                  (
                  <span style={{ color: '#FCD34D', fontWeight: 600 }}>{m.normalizedScore}</span>
                  {' \u00D7 '}
                  <span style={{ color: '#34D399' }}>{m.weight}</span>
                  )
                  {idx < metrics.length - 1 ? ' + ' : ''}
                </span>
              ))}
              {' = '}
              <strong style={{ color: 'var(--accent-amber)', fontSize: '0.95rem' }}>
                {breakdown.compositeScore}
              </strong>
              {' / 100'}
            </div>
          </div>

          {/* 9 Dimensions Weight Distribution & Points Contributed Grid */}
          <div>
            <div
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                color: 'var(--navy-950)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: 'var(--space-2)',
              }}
            >
              Weight Distribution & Points Contribution Breakdown
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-2)',
              }}
            >
              {metrics.map((m) => (
                <div
                  key={m.id}
                  style={{
                    backgroundColor: 'var(--surface-soft)',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--navy-950)' }}>
                      0{m.order}. {m.name}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        color: '#2563EB',
                        padding: '0.1rem 0.35rem',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      {Math.round(m.weight * 100)}% wt
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '0.35rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Score: <strong style={{ color: 'var(--navy-900)' }}>{m.normalizedScore}</strong>
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                        color: 'var(--accent-amber-dark)',
                      }}
                    >
                      +{m.weightedScore.toFixed(1)} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Classification Tiers & Review-II Standards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-3)',
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            {(breakdown.thresholds || []).map((tier) => {
              const isActive = tier.status === continuityStatus;

              return (
                <div
                  key={tier.status}
                  style={{
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    border: isActive ? '2px solid var(--accent-amber)' : '1px solid var(--border-light)',
                    backgroundColor: isActive ? 'rgba(245, 158, 11, 0.06)' : 'var(--surface-primary)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--navy-950)' }}>
                      {tier.status}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      {tier.range}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                    {tier.description}
                  </p>
                  {isActive && (
                    <div
                      style={{
                        marginTop: '0.35rem',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        color: 'var(--accent-amber-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <CheckCircle2 size={12} />
                      <span>Current repository classification tier</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
