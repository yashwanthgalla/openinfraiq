/* ==========================================================================
   InfraMaturity - 9 Core Sustainability Metrics Component
   Displays all 9 sustainability dimensions with:
   - What each measures (verbatim capstone criteria)
   - Raw repository value
   - Benchmark thresholds
   - Normalized score (0-100) and rating badge
   - Weight & points contributed
   - Dual view: Card Grid View & Structured Capstone Table View
   ========================================================================== */

import { useState } from 'react';
import {
  Users,
  UserCheck,
  ShieldAlert,
  GitCommit,
  Tag,
  History,
  AlertCircle,
  GitPullRequest,
  TrendingUp,
  LayoutGrid,
  Table as TableIcon,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import type { CoreSustainabilityMetricItem, MetricRating } from '../../types/index.ts';

interface NineMetricsGridProps {
  metrics: CoreSustainabilityMetricItem[];
  compositeScore: number;
}

export function NineMetricsGrid({ metrics, compositeScore }: NineMetricsGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const getMetricIcon = (order: number) => {
    switch (order) {
      case 1:
        return <Users size={18} color="var(--accent-amber-dark)" />;
      case 2:
        return <UserCheck size={18} color="#2563EB" />;
      case 3:
        return <ShieldAlert size={18} color="#DC2626" />;
      case 4:
        return <GitCommit size={18} color="#059669" />;
      case 5:
        return <Tag size={18} color="#7C3AED" />;
      case 6:
        return <History size={18} color="#D97706" />;
      case 7:
        return <AlertCircle size={18} color="#EA580C" />;
      case 8:
        return <GitPullRequest size={18} color="#0284C7" />;
      case 9:
      default:
        return <TrendingUp size={18} color="#16A34A" />;
    }
  };

  const getRatingBadgeStyle = (rating: MetricRating) => {
    switch (rating) {
      case 'Strong':
        return {
          bg: 'var(--color-success-bg)',
          color: 'var(--color-success)',
          border: 'var(--color-success-border)',
          icon: <CheckCircle2 size={12} />,
        };
      case 'Adequate':
        return {
          bg: '#F1F5F9',
          color: '#334155',
          border: '#CBD5E1',
          icon: <CheckCircle2 size={12} />,
        };
      case 'Attention Needed':
        return {
          bg: 'var(--color-warning-bg)',
          color: 'var(--color-warning)',
          border: 'var(--color-warning-border)',
          icon: <AlertTriangle size={12} />,
        };
      case 'High Risk':
      default:
        return {
          bg: 'var(--color-error-bg)',
          color: 'var(--color-error)',
          border: 'var(--color-error-border)',
          icon: <XCircle size={12} />,
        };
    }
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 80) return 'linear-gradient(90deg, #10B981, #059669)';
    if (score >= 65) return 'linear-gradient(90deg, #3B82F6, #2563EB)';
    if (score >= 45) return 'linear-gradient(90deg, #F59E0B, #D97706)';
    return 'linear-gradient(90deg, #EF4444, #DC2626)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {/* Section Header with Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--navy-950)', margin: 0 }}>
              The 9 Core Sustainability Metrics
            </h2>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                color: 'var(--accent-amber-dark)',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
              }}
            >
              Non-Popularity Features
            </span>
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
              Composite: {compositeScore}/100
            </span>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Evaluates human maintainership, development rhythm, versioning continuity, issue resolution, and community growth.
          </p>
        </div>

        {/* View Toggle */}
        <div
          style={{
            display: 'inline-flex',
            backgroundColor: 'var(--surface-soft)',
            padding: '2px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
          }}
        >
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
            style={{
              padding: '0.25rem 0.6rem',
              fontSize: 'var(--text-xs)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <LayoutGrid size={13} />
            <span>Card Grid</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-outline'}`}
            style={{
              padding: '0.25rem 0.6rem',
              fontSize: 'var(--text-xs)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <TableIcon size={13} />
            <span>Review-II Table</span>
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------------------------
          VIEW 1: CARD GRID VIEW
         ---------------------------------------------------------------------- */}
      {viewMode === 'grid' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {metrics.map((m) => {
            const badge = getRatingBadgeStyle(m.rating);
            const isSelected = selectedMetric === m.id;

            return (
              <div
                key={m.id}
                className="card"
                onClick={() => setSelectedMetric(isSelected ? null : m.id)}
                style={{
                  border: isSelected ? '2px solid var(--accent-amber)' : '1px solid var(--border-light)',
                  boxShadow: isSelected ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 'var(--space-4)',
                  position: 'relative',
                }}
              >
                {/* Card Top: Number, Icon, Name, Rating */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          backgroundColor: 'var(--navy-900)',
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {m.order}
                      </span>
                      {getMetricIcon(m.order)}
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-secondary)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {m.category}
                      </span>
                    </div>

                    {/* Rating Badge */}
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: badge.bg,
                        color: badge.color,
                        border: `1px solid ${badge.border}`,
                      }}
                    >
                      {badge.icon}
                      <span>{m.rating}</span>
                    </span>
                  </div>

                  {/* Metric Name */}
                  <h3
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 700,
                      color: 'var(--navy-950)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {m.name}
                  </h3>

                  {/* "What it measures" quote */}
                  <div
                    style={{
                      fontSize: '0.78125rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.45,
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <strong style={{ color: 'var(--navy-900)' }}>What it measures:</strong> {m.whatItMeasures}
                  </div>

                  {/* Raw Repository Finding Box */}
                  <div
                    style={{
                      backgroundColor: 'var(--surface-soft)',
                      padding: 'var(--space-2) var(--space-3)',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: 'var(--space-3)',
                      borderLeft: '3px solid var(--accent-amber)',
                    }}
                  >
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
                      Measured Signal
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--navy-950)', fontFamily: 'var(--font-mono)' }}>
                      {m.rawValue}
                    </div>
                  </div>
                </div>

                {/* Score Progress Bar & Weight Footnote */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--navy-950)' }}>
                      Normalized Score
                    </span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                      <span style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'var(--navy-950)', fontFamily: 'var(--font-mono)' }}>
                        {m.normalizedScore}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>/ 100</span>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--accent-amber-dark)',
                          fontWeight: 600,
                          marginLeft: '0.3rem',
                        }}
                      >
                        (+{m.weightedScore.toFixed(1)} pts)
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div
                    style={{
                      width: '100%',
                      height: '7px',
                      backgroundColor: 'var(--surface-muted)',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    <div
                      style={{
                        width: `${m.normalizedScore}%`,
                        height: '100%',
                        background: getProgressBarColor(m.normalizedScore),
                        borderRadius: 'var(--radius-full)',
                        transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                  </div>

                  {/* Benchmark & Weight */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.6875rem',
                      color: 'var(--text-secondary)',
                      paddingTop: '0.25rem',
                      borderTop: '1px solid var(--border-subtle)',
                    }}
                  >
                    <span>
                      Model Weight: <strong style={{ color: 'var(--navy-950)' }}>{Math.round(m.weight * 100)}%</strong>
                    </span>
                    <span style={{ fontStyle: 'italic', maxWidth: '180px', textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={m.benchmark}>
                      {m.benchmark}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ----------------------------------------------------------------------
          VIEW 2: STRUCTURED CAPSTONE REVIEW-II TABLE VIEW
         ---------------------------------------------------------------------- */}
      {viewMode === 'table' && (
        <div
          className="card"
          style={{
            padding: 0,
            overflowX: 'auto',
            border: '1px solid var(--border-light)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 'var(--text-xs)',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: 'var(--navy-950)',
                  color: 'var(--text-inverse)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                <th style={{ padding: '0.75rem 1rem', width: '45px' }}>#</th>
                <th style={{ padding: '0.75rem 1rem' }}>Metric</th>
                <th style={{ padding: '0.75rem 1rem' }}>What It Measures</th>
                <th style={{ padding: '0.75rem 1rem' }}>Measured Value</th>
                <th style={{ padding: '0.75rem 1rem' }}>Healthy Benchmark</th>
                <th style={{ padding: '0.75rem 1rem', width: '80px' }}>Weight</th>
                <th style={{ padding: '0.75rem 1rem', width: '90px' }}>Score</th>
                <th style={{ padding: '0.75rem 1rem', width: '100px' }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m, idx) => {
                const badge = getRatingBadgeStyle(m.rating);
                const isEven = idx % 2 === 0;

                return (
                  <tr
                    key={m.id}
                    style={{
                      backgroundColor: isEven ? 'var(--surface-primary)' : 'var(--surface-soft)',
                      borderBottom: '1px solid var(--border-light)',
                      transition: 'background-color var(--transition-fast)',
                    }}
                  >
                    <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--navy-950)' }}>
                      0{m.order}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--navy-950)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {getMetricIcon(m.order)}
                        <span>{m.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', maxWidth: '280px', lineHeight: 1.4 }}>
                      {m.whatItMeasures}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--navy-950)' }}>
                      {m.rawValue}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                      {m.benchmark}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', color: 'var(--navy-950)', fontWeight: 600 }}>
                      {Math.round(m.weight * 100)}%
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--navy-950)' }}>
                          {m.normalizedScore}
                        </span>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>/100</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          padding: '0.15rem 0.45rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: badge.bg,
                          color: badge.color,
                          border: `1px solid ${badge.border}`,
                        }}
                      >
                        {badge.icon}
                        <span>{m.rating}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
