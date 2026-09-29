/* ==========================================================================
   InfraMaturity - Popularity vs Sustainability Research Contribution Card
   Clarifies the core capstone distinction: Stars/Forks vs the 9 Sustainability
   Metrics used by the ML Continuity Predictor.
   ========================================================================== */

import { Star, GitFork, Eye, Activity, ShieldCheck, Sparkles, Quote } from 'lucide-react';
import type { PopularityMetricsData, CoreSustainabilityMetricItem } from '../../types/index.ts';

interface PopularityVsSustainabilityCardProps {
  repoName: string;
  owner: string;
  popularity: PopularityMetricsData;
  metrics: CoreSustainabilityMetricItem[];
  compositeScore: number;
}

export function PopularityVsSustainabilityCard({
  repoName,
  owner,
  popularity,
  metrics,
  compositeScore,
}: PopularityVsSustainabilityCardProps) {
  return (
    <div
      className="card"
      style={{
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-md)',
        padding: 'var(--space-6)',
        backgroundColor: 'var(--surface-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Accent Pill */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #F59E0B 0%, #3B82F6 50%, #10B981 100%)',
        }}
      />

      {/* Header & Review-II Presentation Callout */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-5)',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-amber-dark)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 'var(--space-1)',
            }}
          >
            <Sparkles size={13} />
            <span>Research Contribution • Review-II Core Formulation</span>
          </div>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--navy-950)', margin: 0 }}>
            Why Popularity &ne; Sustainability
          </h2>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.25rem', maxWidth: '680px' }}>
            Popularity captures social visibility for <strong style={{ color: 'var(--navy-950)' }}>{owner}/{repoName}</strong>. Sustainability quantifies active maintainer redundancy, commit velocity, release cadence stability, and issue triage health.
          </p>
        </div>

        {/* Review-II Presentation Snippet Pill */}
        <div
          style={{
            padding: '0.5rem 0.85rem',
            backgroundColor: 'var(--surface-soft)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            maxWidth: '340px',
          }}
        >
          <Quote size={18} color="var(--accent-amber-dark)" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.75rem', color: 'var(--navy-900)', lineHeight: 1.4 }}>
            <strong>Review-II Anchor:</strong> &ldquo;The proposed system considers 9 core sustainability metrics... rather than popularity alone.&rdquo;
          </div>
        </div>
      </div>

      {/* Side-by-Side Dual Column Distinction Matrix */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-5)',
        }}
      >
        {/* Left Column: Popularity (Raw Vanity Signals) */}
        <div
          style={{
            backgroundColor: 'var(--surface-soft)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Star size={16} color="#D97706" />
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--navy-950)' }}>
                Popularity Metrics (Surface Vanity)
              </span>
            </div>
            <span
              style={{
                fontSize: '0.6875rem',
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'rgba(217, 119, 6, 0.12)',
                color: 'var(--accent-amber-dark)',
                padding: '0.15rem 0.45rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
              }}
            >
              Excluded from Score
            </span>
          </div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)', lineHeight: 1.45 }}>
            External recognition is susceptible to marketing campaigns, historical legacy, and viral hype. A repository can boast 40,000 stars yet rely on a single maintainer (Bus Factor = 1).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)' }}>
            <div
              style={{
                backgroundColor: 'var(--surface-primary)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                border: '1px solid var(--border-light)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', color: '#D97706', marginBottom: '0.2rem' }}>
                <Star size={14} />
                <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>Stars</span>
              </div>
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--navy-950)' }}>
                {popularity.stars.toLocaleString()}
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--surface-primary)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                border: '1px solid var(--border-light)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', color: '#2563EB', marginBottom: '0.2rem' }}>
                <GitFork size={14} />
                <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>Forks</span>
              </div>
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--navy-950)' }}>
                {popularity.forks.toLocaleString()}
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--surface-primary)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                border: '1px solid var(--border-light)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', color: '#059669', marginBottom: '0.2rem' }}>
                <Eye size={14} />
                <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>Watchers</span>
              </div>
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--navy-950)' }}>
                {popularity.watchers.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sustainability (9 Core Health Dimensions) */}
        <div
          style={{
            backgroundColor: 'rgba(245, 158, 11, 0.04)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Activity size={16} color="var(--accent-amber-dark)" />
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--navy-950)' }}>
                Sustainability Metrics (9 Core Vectors)
              </span>
            </div>
            <span
              style={{
                fontSize: '0.6875rem',
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--accent-amber)',
                color: 'var(--navy-950)',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
              }}
            >
              Score: {compositeScore}/100
            </span>
          </div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--navy-950)', marginBottom: 'var(--space-3)', lineHeight: 1.45 }}>
            Operational dimensions fed directly into the Machine Learning model to forecast multi-year maintenance continuity and risk of abandonment:
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem',
            }}
          >
            {metrics.map((m) => (
              <span
                key={m.id}
                style={{
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '0.2rem 0.45rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--surface-primary)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--navy-950)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <span style={{ color: 'var(--accent-amber-dark)', fontWeight: 700 }}>0{m.order}</span>
                <span>{m.name}</span>
                <strong style={{ color: m.normalizedScore >= 75 ? 'var(--color-success)' : 'var(--color-warning)' }}>
                  ({m.normalizedScore})
                </strong>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Analytical Divergence Conclusion */}
      <div
        style={{
          padding: 'var(--space-3) var(--space-4)',
          backgroundColor: 'var(--surface-soft)',
          borderRadius: 'var(--radius-md)',
          borderLeft: '3px solid var(--accent-amber)',
          fontSize: 'var(--text-xs)',
          color: 'var(--navy-950)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}
      >
        <ShieldCheck size={16} color="var(--accent-amber-dark)" style={{ flexShrink: 0 }} />
        <span>
          <strong>Divergence Diagnostic:</strong> {popularity.divergenceAnalysis}
        </span>
      </div>
    </div>
  );
}
