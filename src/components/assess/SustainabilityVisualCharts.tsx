/* ==========================================================================
   InfraMaturity - Interactive Visual Graphs & Charts Component
   Renders in-page SVG visualizations for Review-II presentations:
   1. 9-Axis Radar / Spider Chart (Repo vs Healthy Baseline)
   2. Maintainer Distribution & Bus Factor Donut Chart
   3. Popularity vs Sustainability Dimension Matrix
   ========================================================================== */

import { useState } from 'react';
import { Activity } from 'lucide-react';
import type { CoreSustainabilityMetricItem, PopularityMetricsData } from '../../types/index.ts';

interface SustainabilityVisualChartsProps {
  repoName: string;
  owner: string;
  metrics: CoreSustainabilityMetricItem[];
  popularity: PopularityMetricsData;
  compositeScore: number;
}

export function SustainabilityVisualCharts({
  repoName,
  owner,
  metrics,
  popularity,
  compositeScore,
}: SustainabilityVisualChartsProps) {
  const [activeMetricHover, setActiveMetricHover] = useState<CoreSustainabilityMetricItem | null>(null);

  // ------------------------------------------------------------------------
  // Radar / Spider Chart Geometry Calculations (Pure SVG)
  // ------------------------------------------------------------------------
  const size = 360;
  const center = size / 2;
  const radius = center - 55;
  const totalAxes = metrics.length; // 9
  const angleStep = (2 * Math.PI) / totalAxes;

  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2; // start from top (12 o'clock)
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Build polygon path for actual scores
  const scorePoints = metrics
    .map((m, i) => {
      const { x, y } = getCoordinates(m.normalizedScore, i);
      return `${x},${y}`;
    })
    .join(' ');

  // Build polygon path for healthy benchmark (75)
  const benchmarkPoints = metrics
    .map((_, i) => {
      const { x, y } = getCoordinates(75, i);
      return `${x},${y}`;
    })
    .join(' ');

  // Rings for 25, 50, 75, 100
  const rings = [25, 50, 75, 100];

  // ------------------------------------------------------------------------
  // Donut Chart Calculations (Top 3 Maintainers vs Community)
  // ------------------------------------------------------------------------
  const top3Share = metrics[0]?.rawNumericValue ?? 45;
  const communityShare = Math.max(0, 100 - top3Share);
  const busFactor = metrics[2]?.rawNumericValue ?? 3;

  // Donut circumference (radius 60)
  const donutR = 60;
  const donutCircumference = 2 * Math.PI * donutR;
  const top3Stroke = (top3Share / 100) * donutCircumference;
  const communityStroke = donutCircumference - top3Stroke;

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
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
          <Activity size={18} color="var(--accent-amber-dark)" />
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--navy-950)', margin: 0 }}>
            Visual Analytics & Indicator Charts
          </h2>
        </div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
          Multi-dimensional visual telemetry for <strong style={{ color: 'var(--navy-950)' }}>{owner}/{repoName}</strong> Review-II slides and capstone evaluation.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-5)',
        }}
      >
        {/* ------------------------------------------------------------------
            CHART 1: 9-AXIS RADAR / SPIDER CHART
           ------------------------------------------------------------------ */}
        <div
          style={{
            backgroundColor: 'var(--surface-soft)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
            <div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--navy-950)' }}>
                9-Dimensional Sustainability Radar
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
                Repository Signature vs Healthy Baseline (75+)
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--accent-amber-dark)' }}>
                <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--accent-amber)', borderRadius: '2px' }} />
                <span>Repo ({compositeScore})</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#64748B' }}>
                <span style={{ width: '10px', height: '10px', border: '1px dashed #64748B', borderRadius: '2px' }} />
                <span>Target (75)</span>
              </span>
            </div>
          </div>

          <svg
            viewBox={`0 0 ${size} ${size}`}
            style={{ width: '100%', maxWidth: '340px', height: 'auto', overflow: 'visible' }}
          >
            {/* Concentric Grid Rings */}
            {rings.map((ringVal) => {
              const r = (ringVal / 100) * radius;
              return (
                <circle
                  key={ringVal}
                  cx={center}
                  cy={center}
                  r={r}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray={ringVal === 75 ? '3 3' : undefined}
                />
              );
            })}

            {/* Radial Spoke Lines & Labels */}
            {metrics.map((m, i) => {
              const { x, y } = getCoordinates(100, i);
              const labelCoord = getCoordinates(118, i);

              return (
                <g key={m.id}>
                  <line
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="#E2E8F0"
                    strokeWidth="1"
                  />
                  <text
                    x={labelCoord.x}
                    y={labelCoord.y}
                    fontSize="9.5"
                    fontFamily="var(--font-mono)"
                    fontWeight="600"
                    fill="var(--navy-900)"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    0{m.order}
                  </text>
                </g>
              );
            })}

            {/* Benchmark Polygon (Dashed Gray) */}
            <polygon
              points={benchmarkPoints}
              fill="rgba(148, 163, 184, 0.12)"
              stroke="#64748B"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Repository Score Polygon (Amber) */}
            <polygon
              points={scorePoints}
              fill="rgba(245, 158, 11, 0.28)"
              stroke="var(--accent-amber)"
              strokeWidth="2.5"
            />

            {/* Metric Nodes with Hover Detection */}
            {metrics.map((m, i) => {
              const { x, y } = getCoordinates(m.normalizedScore, i);
              const isHovered = activeMetricHover?.id === m.id;

              return (
                <circle
                  key={m.id}
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4}
                  fill={m.normalizedScore >= 75 ? 'var(--color-success)' : 'var(--accent-amber-dark)'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  style={{ cursor: 'pointer', transition: 'r 0.2s' }}
                  onMouseEnter={() => setActiveMetricHover(m)}
                  onMouseLeave={() => setActiveMetricHover(null)}
                />
              );
            })}
          </svg>

          {/* Radar Hover Diagnostic Callout */}
          <div
            style={{
              width: '100%',
              minHeight: '38px',
              marginTop: 'var(--space-2)',
              padding: '0.35rem 0.6rem',
              backgroundColor: 'var(--surface-primary)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {activeMetricHover ? (
              <>
                <span style={{ fontWeight: 600, color: 'var(--navy-950)' }}>
                  0{activeMetricHover.order}. {activeMetricHover.name}:
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-amber-dark)' }}>
                  {activeMetricHover.normalizedScore}/100 ({activeMetricHover.rating})
                </span>
              </>
            ) : (
              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.7rem' }}>
                Hover any node above to inspect indicator values
              </span>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------------
            CHART 2: MAINTAINER DONUT & BUS FACTOR
           ------------------------------------------------------------------ */}
        <div
          style={{
            backgroundColor: 'var(--surface-soft)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--navy-950)' }}>
              Maintainer Concentration & Bus Factor
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
              Commit volume share distribution among contributors
            </div>
          </div>

          {/* Donut Visual */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <svg width="180" height="180" viewBox="0 0 160 160">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r={donutR}
                fill="transparent"
                stroke="#E2E8F0"
                strokeWidth="22"
              />

              {/* Community Share segment */}
              <circle
                cx="80"
                cy="80"
                r={donutR}
                fill="transparent"
                stroke="#38BDF8"
                strokeWidth="22"
                strokeDasharray={`${communityStroke} ${donutCircumference}`}
                strokeDashoffset="0"
                transform="rotate(-90 80 80)"
              />

              {/* Top 3 Share segment (Amber) */}
              <circle
                cx="80"
                cy="80"
                r={donutR}
                fill="transparent"
                stroke="var(--accent-amber)"
                strokeWidth="22"
                strokeDasharray={`${top3Stroke} ${donutCircumference}`}
                strokeDashoffset={`-${communityStroke}`}
                transform="rotate(-90 80 80)"
              />
            </svg>

            {/* Donut Center Callout */}
            <div
              style={{
                position: 'absolute',
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
                Bus Factor
              </div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--navy-950)', lineHeight: 1 }}>
                {busFactor}
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--accent-amber-dark)', fontWeight: 600 }}>
                {top3Share}% Top 3
              </div>
            </div>
          </div>

          {/* Donut Legend */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              marginTop: 'var(--space-3)',
              padding: 'var(--space-2) var(--space-3)',
              backgroundColor: 'var(--surface-primary)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              fontSize: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--navy-950)' }}>
                <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--accent-amber)', borderRadius: '2px' }} />
                <span>Top 3 Maintainers:</span>
              </span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>{top3Share}%</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--navy-950)' }}>
                <span style={{ width: '10px', height: '10px', backgroundColor: '#38BDF8', borderRadius: '2px' }} />
                <span>Remaining Community:</span>
              </span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>{communityShare}%</strong>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------
            CHART 3: POPULARITY VS SUSTAINABILITY SUMMARY BARS
           ------------------------------------------------------------------ */}
        <div
          style={{
            backgroundColor: 'var(--surface-soft)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--navy-950)' }}>
              Popularity vs Sustainability Ratio
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
              Dual-index comparison illustrating independence of dimensions
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* Index 1: Popularity (Social Visibility) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '0.2rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--navy-950)' }}>Public Popularity Index</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  {popularity.popularityScore}/100 ({popularity.popularityTier})
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${popularity.popularityScore}%`,
                    height: '100%',
                    backgroundColor: '#60A5FA',
                    borderRadius: 'var(--radius-full)',
                  }}
                />
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                {popularity.stars.toLocaleString()} Stars • {popularity.forks.toLocaleString()} Forks
              </div>
            </div>

            {/* Index 2: Sustainability (9 Core Dimensions) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '0.2rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--navy-950)' }}>Engineering Sustainability Index</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-amber-dark)' }}>
                  {compositeScore}/100 (RepoGuard)
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${compositeScore}%`,
                    height: '100%',
                    backgroundColor: 'var(--accent-amber)',
                    borderRadius: 'var(--radius-full)',
                  }}
                />
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Evaluates human maintainership, bus factor, & release continuity
              </div>
            </div>
          </div>

          <div
            style={{
              padding: 'var(--space-2) var(--space-3)',
              backgroundColor: 'var(--surface-primary)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              fontSize: '0.6875rem',
              color: 'var(--navy-950)',
              marginTop: 'var(--space-3)',
            }}
          >
            <strong>Research Insight:</strong> A project may enjoy high popularity while possessing low sustainability (fragile single-point maintainer dependency).
          </div>
        </div>
      </div>
    </div>
  );
}
