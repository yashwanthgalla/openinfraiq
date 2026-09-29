/* ==========================================================================
   InfraMaturity - Real Assessment Result Shell
   Presents:
   - 9 Core Sustainability Metrics (Maintainership, Velocity, Continuity, Growth)
   - Supporting Repository Data (Stars, Forks, Watchers, Age, License, etc.)
   - Popularity vs Sustainability Capstone Distinction
   - Transparent Mathematical Scoring Formulation
   - In-Page Interactive Visualizations (SVG Radar & Donut)
   - Standalone Python Graph Generation Script for Review-II PPT
   - ML Maintenance Continuity Prediction & Adoption Guidance
   ========================================================================== */

import { useState } from 'react';
import {
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  GitBranch,
  ShieldCheck,
  Clock,
  RotateCw,
  Scale,
  Star,
  GitFork,
  Eye,
  Calendar,
  Users,
  AlertCircle,
  PieChart,
  Layers,
  Cpu,
  Tag,
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge.tsx';
import { PopularityVsSustainabilityCard } from './PopularityVsSustainabilityCard.tsx';
import { NineMetricsGrid } from './NineMetricsGrid.tsx';
import { ScoreCalculationSection } from './ScoreCalculationSection.tsx';
import { SustainabilityVisualCharts } from './SustainabilityVisualCharts.tsx';
import type { RealAssessmentResult } from '../../types/index.ts';

interface AssessmentShellProps {
  data: RealAssessmentResult;
  isSaved: boolean;
  onToggleSave: () => void;
  onReAssess?: () => void;
}

export function AssessmentShell({
  data,
  isSaved,
  onToggleSave,
  onReAssess,
}: AssessmentShellProps) {
  const [activeTab, setActiveTab] = useState<'metrics' | 'charts' | 'ml'>('metrics');

  const getContinuityBadgeClass = (status: string) => {
    switch (status) {
      case 'High Continuity':
        return 'badge-success';
      case 'Moderate Continuity':
        return 'badge-amber';
      case 'Continuity at Risk':
        return 'badge-warning';
      case 'Stalled / Dormant':
      default:
        return 'badge-error';
    }
  };

  const supporting = data.supportingData;
  const metrics = data.coreMetrics;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* ======================================================================
          1. Repository Identity & Live Supporting Data Header
         ====================================================================== */}
      <div
        className="card"
        style={{
          borderTop: '4px solid var(--accent-amber)',
          boxShadow: 'var(--shadow-md)',
          padding: 'var(--space-6)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-4)',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-1)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                }}
              >
                {data.owner} /
              </span>
              <h1
                style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 800,
                  color: 'var(--navy-950)',
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {data.name}
              </h1>
            </div>

            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                maxWidth: '740px',
                marginBottom: 'var(--space-3)',
                lineHeight: 1.5,
              }}
            >
              {data.description}
            </p>

            {/* Quick Metadata Line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--accent-amber-dark)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                }}
              >
                <span>{data.url}</span>
                <ExternalLink size={12} />
              </a>

              <span style={{ color: 'var(--border-light)' }}>&bull;</span>

              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                Language: <strong style={{ color: 'var(--navy-950)' }}>{data.language}</strong>
              </span>

              <span style={{ color: 'var(--border-light)' }}>&bull;</span>

              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Scale size={13} />
                <span>{data.governance.licenseName}</span>
              </span>

              <span style={{ color: 'var(--border-light)' }}>&bull;</span>

              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <GitBranch size={13} />
                <span>Branch: <strong style={{ color: 'var(--navy-950)' }}>{supporting.defaultBranch}</strong></span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <StatusBadge status={data.status} />

            <button
              onClick={onToggleSave}
              className={`btn ${isSaved ? 'btn-secondary' : 'btn-outline'} btn-sm`}
              title={isSaved ? 'Remove from saved' : 'Save repository to workspace'}
            >
              {isSaved ? <BookmarkCheck size={14} color="var(--accent-amber)" /> : <Bookmark size={14} />}
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            {onReAssess && (
              <button
                onClick={onReAssess}
                className="btn btn-outline btn-sm btn-icon"
                title="Refresh live analysis from GitHub"
              >
                <RotateCw size={14} />
              </button>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------------
            Supporting Repository Data Strip
           ------------------------------------------------------------------ */}
        <div
          style={{
            marginTop: 'var(--space-4)',
            paddingTop: 'var(--space-4)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div
            style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: 'var(--space-2)',
            }}
          >
            Supporting Raw Repository Data (Collected Independently)
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 'var(--space-2)',
            }}
          >
            <div style={{ backgroundColor: 'var(--surface-soft)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#D97706', fontSize: '0.7rem' }}>
                <Star size={12} />
                <span>Stars</span>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--navy-950)', fontFamily: 'var(--font-mono)' }}>
                {supporting.stars.toLocaleString()}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--surface-soft)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#2563EB', fontSize: '0.7rem' }}>
                <GitFork size={12} />
                <span>Forks</span>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--navy-950)', fontFamily: 'var(--font-mono)' }}>
                {supporting.forks.toLocaleString()}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--surface-soft)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#059669', fontSize: '0.7rem' }}>
                <Eye size={12} />
                <span>Watchers</span>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--navy-950)', fontFamily: 'var(--font-mono)' }}>
                {supporting.watchers.toLocaleString()}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--surface-soft)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--navy-700)', fontSize: '0.7rem' }}>
                <Calendar size={12} />
                <span>Repository Age</span>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--navy-950)', fontFamily: 'var(--font-mono)' }}>
                {supporting.repositoryAgeFormatted.split(' ')[0]} yrs
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--surface-soft)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--navy-700)', fontSize: '0.7rem' }}>
                <Users size={12} />
                <span>Contributors</span>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--navy-950)', fontFamily: 'var(--font-mono)' }}>
                {supporting.totalContributors}+
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--surface-soft)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--navy-700)', fontSize: '0.7rem' }}>
                <AlertCircle size={12} />
                <span>Open Issues</span>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--navy-950)', fontFamily: 'var(--font-mono)' }}>
                {supporting.openIssues.toLocaleString()}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--surface-soft)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--navy-700)', fontSize: '0.7rem' }}>
                <Clock size={12} />
                <span>Last Activity</span>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--navy-950)', fontFamily: 'var(--font-mono)' }}>
                {supporting.lastActivityDaysAgo === 0 ? 'Today' : `${supporting.lastActivityDaysAgo}d ago`}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--surface-soft)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--navy-700)', fontSize: '0.7rem' }}>
                <Tag size={12} />
                <span>Releases Found</span>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--navy-950)', fontFamily: 'var(--font-mono)' }}>
                {supporting.releaseHistoryCount} tags
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================================
          2. Capstone Research Distinction: Popularity vs. Sustainability
         ====================================================================== */}
      <PopularityVsSustainabilityCard
        repoName={data.name}
        owner={data.owner}
        popularity={data.popularityMetrics}
        metrics={metrics}
        compositeScore={data.maintenanceContinuity.score}
      />

      {/* ======================================================================
          3. Multi-Tab Navigation for Output Evaluation
         ====================================================================== */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          borderBottom: '2px solid var(--border-light)',
          paddingBottom: '2px',
          overflowX: 'auto',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('metrics')}
          className="btn btn-sm"
          style={{
            borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
            border: 'none',
            borderBottom: activeTab === 'metrics' ? '3px solid var(--accent-amber)' : '3px solid transparent',
            backgroundColor: activeTab === 'metrics' ? 'var(--surface-primary)' : 'transparent',
            color: activeTab === 'metrics' ? 'var(--navy-950)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'metrics' ? 700 : 500,
            padding: '0.6rem 1.1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontSize: 'var(--text-sm)',
            cursor: 'pointer',
          }}
        >
          <Layers size={16} color={activeTab === 'metrics' ? 'var(--accent-amber-dark)' : 'var(--text-secondary)'} />
          <span>9 Core Sustainability Metrics</span>
          <span
            style={{
              fontSize: '0.6875rem',
              backgroundColor: 'var(--accent-amber)',
              color: 'var(--navy-950)',
              padding: '0.1rem 0.4rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
            }}
          >
            {data.maintenanceContinuity.score}/100
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('charts')}
          className="btn btn-sm"
          style={{
            borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
            border: 'none',
            borderBottom: activeTab === 'charts' ? '3px solid var(--accent-amber)' : '3px solid transparent',
            backgroundColor: activeTab === 'charts' ? 'var(--surface-primary)' : 'transparent',
            color: activeTab === 'charts' ? 'var(--navy-950)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'charts' ? 700 : 500,
            padding: '0.6rem 1.1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontSize: 'var(--text-sm)',
            cursor: 'pointer',
          }}
        >
          <PieChart size={16} color={activeTab === 'charts' ? 'var(--accent-amber-dark)' : 'var(--text-secondary)'} />
          <span>Interactive Visualizations</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ml')}
          className="btn btn-sm"
          style={{
            borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
            border: 'none',
            borderBottom: activeTab === 'ml' ? '3px solid var(--accent-amber)' : '3px solid transparent',
            backgroundColor: activeTab === 'ml' ? 'var(--surface-primary)' : 'transparent',
            color: activeTab === 'ml' ? 'var(--navy-950)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'ml' ? 700 : 500,
            padding: '0.6rem 1.1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontSize: 'var(--text-sm)',
            cursor: 'pointer',
          }}
        >
          <Cpu size={16} color={activeTab === 'ml' ? 'var(--accent-amber-dark)' : 'var(--text-secondary)'} />
          <span>ML Continuity Model &amp; Decisions</span>
        </button>
      </div>

      {/* ======================================================================
          TAB 1: 9 SUSTAINABILITY METRICS & SCORING FORMULATION
         ====================================================================== */}
      {activeTab === 'metrics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Nine Metrics Grid & Table */}
          <NineMetricsGrid
            metrics={metrics}
            compositeScore={data.maintenanceContinuity.score}
          />

          {/* Transparent Score Calculation Section */}
          <ScoreCalculationSection
            breakdown={data.scoringBreakdown}
            metrics={metrics}
            continuityStatus={data.maintenanceContinuity.status}
          />
        </div>
      )}

      {/* ======================================================================
          TAB 2: INTERACTIVE VISUALIZATIONS (RADAR, DONUT, MATRICES)
         ====================================================================== */}
      {activeTab === 'charts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <SustainabilityVisualCharts
            repoName={data.name}
            owner={data.owner}
            metrics={metrics}
            popularity={data.popularityMetrics}
            compositeScore={data.maintenanceContinuity.score}
          />
        </div>
      )}

      {/* ======================================================================
          TAB 3: ML CONTINUITY MODEL & ADOPTION DECISION GUIDANCE
         ====================================================================== */}
      {activeTab === 'ml' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* ML Maintenance Continuity Predictor Card */}
          <div
            className="card"
            style={{
              padding: 'var(--space-6)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-4)',
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
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  <Cpu size={13} />
                  <span>Predictive Intelligence Engine</span>
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--navy-950)', margin: 0 }}>
                  ML Maintenance Continuity Predictor
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className={`badge ${getContinuityBadgeClass(data.maintenanceContinuity.status)}`}>
                  {data.maintenanceContinuity.status} • {data.mlContinuityModel.confidenceScore}% Confidence
                </span>
              </div>
            </div>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--navy-950)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
              {data.maintenanceContinuity.explanation}
            </p>

            {/* Model Feature Weights */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  color: 'var(--navy-950)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Model Feature Importance Distribution ({data.mlContinuityModel.algorithm})
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 'var(--space-2)',
                }}
              >
                {data.mlContinuityModel.featureImportance.map((feat) => (
                  <div
                    key={feat.feature}
                    style={{
                      padding: 'var(--space-2) var(--space-3)',
                      backgroundColor: 'var(--surface-soft)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    <span style={{ fontWeight: 600, color: 'var(--navy-950)' }}>{feat.feature}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-amber-dark)', fontWeight: 700 }}>
                      {feat.weight}% model weight
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review-II Presentation Snippet */}
            <div
              style={{
                padding: 'var(--space-3) var(--space-4)',
                backgroundColor: 'var(--surface-soft)',
                borderRadius: 'var(--radius-md)',
                borderLeft: '3px solid var(--accent-amber)',
                fontSize: 'var(--text-xs)',
                color: 'var(--navy-950)',
                lineHeight: 1.6,
              }}
            >
              <strong>Review-II Script Cue:</strong> &ldquo;{data.mlContinuityModel.reviewIIPresentationSnippet}&rdquo;
            </div>
          </div>

          {/* Adoption Assessment & Decision Guidance */}
          <div
            className="card"
            style={{
              backgroundColor: 'var(--navy-950)',
              color: 'var(--text-inverse)',
              borderColor: 'var(--navy-800)',
              padding: 'var(--space-6)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-3)',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-amber)',
                  }}
                />
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-inverse)', margin: 0 }}>
                  Adoption Assessment &amp; Decision Guidance
                </h3>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--navy-950)',
                  backgroundColor: 'var(--accent-amber)',
                  fontWeight: 700,
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                {data.adoptionAssessment.recommendation}
              </span>
            </div>

            <p style={{ fontSize: 'var(--text-sm)', color: '#E2E8F0', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
              {data.adoptionAssessment.verdict}
            </p>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Key Evidence Observations:
              </div>
              <ul style={{ listStylePosition: 'inside', fontSize: 'var(--text-xs)', color: '#CBD5E1', lineHeight: 1.8, margin: 0, paddingLeft: 0 }}>
                {data.adoptionAssessment.keyObservations.map((obs, i) => (
                  <li key={i}>{obs}</li>
                ))}
              </ul>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-3)',
                paddingTop: 'var(--space-3)',
                borderTop: '1px solid var(--navy-800)',
                fontSize: 'var(--text-xs)',
                color: '#94A3B8',
              }}
            >
              <div>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>Repository:</span> {data.owner}/{data.name}
              </div>
              <div>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>License:</span> {data.governance.licenseName}
              </div>
              <div>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>Evidence Type:</span> Live GitHub REST &amp; ML Inference
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================
          4. Validation & Traceability Note
         ====================================================================== */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          padding: 'var(--space-3) var(--space-4)',
          backgroundColor: 'var(--surface-primary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-secondary)',
        }}
      >
        <ShieldCheck size={16} color="var(--accent-amber-dark)" style={{ flexShrink: 0 }} />
        <div>
          <strong style={{ color: 'var(--text-primary)' }}>Validation Context:</strong> The 9 sustainability metrics are calculated directly from active repository commits, releases, and maintainer topology. Popularity measures (Stars, Forks, Watchers) are presented as supporting telemetry for research comparison.
        </div>
      </div>
    </div>
  );
}
