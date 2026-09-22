/* ==========================================================================
   InfraMaturity - Real Assessment Result Shell
   Presents live repository analytics, maintainer distribution, release continuity,
   sustainability indicators, and adoption decision guidance.
   ========================================================================== */

import { useState } from 'react';
import {
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Activity,
  Users,
  GitBranch,
  History,
  ShieldCheck,
  Clock,
  RotateCw,
  Scale,
  Star,
  GitFork,
  Key,
  Calculator,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge.tsx';
import type { RealAssessmentResult } from '../../types/index.ts';
import { getGitHubToken, setGitHubToken } from '../../lib/githubApi.ts';

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
  const [showCalculationDetails, setShowCalculationDetails] = useState(false);
  const [showTokenSettings, setShowTokenSettings] = useState(false);
  const [tokenInput, setTokenInput] = useState(getGitHubToken() || '');
  const [tokenSaved, setTokenSaved] = useState(false);

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    setGitHubToken(tokenInput);
    setTokenSaved(true);
    setTimeout(() => setTokenSaved(false), 2500);
  };

  const getRatingBadgeClass = (rating: string) => {
    switch (rating) {
      case 'Strong':
        return 'badge-success';
      case 'Adequate':
        return 'badge-neutral';
      case 'Attention Needed':
        return 'badge-warning';
      case 'High Risk':
      default:
        return 'badge-error';
    }
  };

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* ----------------------------------------------------------------------
          1. Repository Identity & Live Stats Header
         ---------------------------------------------------------------------- */}
      <div
        className="card"
        style={{
          borderTop: '4px solid var(--accent-amber)',
          boxShadow: 'var(--shadow-md)',
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
                  fontWeight: 700,
                  color: 'var(--navy-950)',
                  lineHeight: 1.2,
                }}
              >
                {data.name}
              </h1>
            </div>

            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                maxWidth: '720px',
                marginBottom: 'var(--space-3)',
                lineHeight: 1.5,
              }}
            >
              {data.description}
            </p>

            {/* Live Repository Badges */}
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
                }}
              >
                <span>{data.url}</span>
                <ExternalLink size={12} />
              </a>

              <span style={{ color: 'var(--border-light)' }}>•</span>

              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                Language: <strong style={{ color: 'var(--navy-950)' }}>{data.language}</strong>
              </span>

              <span style={{ color: 'var(--border-light)' }}>•</span>

              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Scale size={13} />
                <span>{data.governance.licenseName}</span>
              </span>

              <span style={{ color: 'var(--border-light)' }}>•</span>

              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Star size={13} />
                <span>{data.repositoryActivity.starsCount.toLocaleString()}</span>
              </span>

              <span style={{ color: 'var(--border-light)' }}>•</span>

              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <GitFork size={13} />
                <span>{data.repositoryActivity.forksCount.toLocaleString()}</span>
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

            <button
              onClick={() => setShowTokenSettings(!showTokenSettings)}
              className="btn btn-outline btn-sm btn-icon"
              title="Configure GitHub Token"
            >
              <Key size={14} />
            </button>
          </div>
        </div>

        {/* Optional GitHub Token Drawer */}
        {showTokenSettings && (
          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'var(--surface-soft)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              marginBottom: 'var(--space-4)',
            }}
          >
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--navy-950)', marginBottom: 'var(--space-1)' }}>
              Optional: GitHub Personal Access Token
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
              Public requests have a 60/hr limit. Adding a fine-grained or personal token increases this to 5,000 requests/hr. Token is stored locally on this machine only.
            </p>
            <form onSubmit={handleSaveToken} style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="form-input"
                style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Save Token
              </button>
            </form>
            {tokenSaved && (
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', marginTop: '0.5rem' }}>
                GitHub Token saved.
              </div>
            )}
          </div>
        )}

        {/* Live Analysis Summary Banner */}
        <div
          style={{
            padding: 'var(--space-3) var(--space-4)',
            backgroundColor: 'var(--surface-soft)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-3)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <ShieldCheck size={16} color="var(--color-success)" />
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 500 }}>
              Live GitHub data extracted and analyzed.
            </span>
          </div>
          <div
            style={{
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            <Clock size={12} />
            <span>Analyzed at: {new Date(data.analyzedAt).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------------
          2. Live Maintenance Signals
         ---------------------------------------------------------------------- */}
      <div>
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--navy-950)' }}>
            Maintenance Signals (Live GitHub Data)
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Calculated from public commit records, maintainer distribution, and release intervals.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {/* Signal 1: Maintainer Distribution */}
          <div className="card">
            <div className="card-header">
              <div className="card-title" style={{ fontSize: 'var(--text-base)' }}>
                <Users size={16} color="var(--accent-amber-dark)" />
                <span>Maintainer Distribution</span>
              </div>
              <span className={`badge ${data.maintainerDistribution.concentrationRisk === 'Low Concentration' ? 'badge-success' : data.maintainerDistribution.concentrationRisk === 'Moderate Concentration' ? 'badge-amber' : 'badge-warning'}`}>
                {data.maintainerDistribution.concentrationRisk}
              </span>
            </div>

            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
              {data.maintainerDistribution.summary}
            </p>

            {/* Top Maintainers List */}
            {data.maintainerDistribution.topContributors.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--navy-950)', textTransform: 'uppercase' }}>
                  Top Commit Stewards
                </div>
                {data.maintainerDistribution.topContributors.slice(0, 4).map((contrib) => (
                  <div
                    key={contrib.login}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--space-1) var(--space-2)',
                      backgroundColor: 'var(--surface-soft)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <img
                        src={contrib.avatarUrl}
                        alt={contrib.login}
                        style={{ width: '20px', height: '20px', borderRadius: '50%' }}
                      />
                      <span className="font-mono">{contrib.login}</span>
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--navy-950)' }}>
                      {contrib.sharePercentage}% ({contrib.contributions.toLocaleString()})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Signal 2: Release Continuity */}
          <div className="card">
            <div className="card-header">
              <div className="card-title" style={{ fontSize: 'var(--text-base)' }}>
                <History size={16} color="var(--accent-amber-dark)" />
                <span>Release Continuity</span>
              </div>
              <span className={`badge ${data.releaseContinuity.cadenceStability === 'Continuous & Predictable' ? 'badge-success' : 'badge-neutral'}`}>
                {data.releaseContinuity.cadenceStability}
              </span>
            </div>

            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
              {data.releaseContinuity.summary}
            </p>

            {/* Recent Releases List */}
            {data.releaseContinuity.releasesList.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--navy-950)', textTransform: 'uppercase' }}>
                  Recent Releases
                </div>
                {data.releaseContinuity.releasesList.slice(0, 3).map((rel) => (
                  <div
                    key={rel.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--space-1) var(--space-2)',
                      backgroundColor: 'var(--surface-soft)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    <a
                      href={rel.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono"
                      style={{ color: 'var(--accent-amber-dark)', textDecoration: 'none' }}
                    >
                      {rel.tagName}
                    </a>
                    <span style={{ color: 'var(--text-muted)' }}>{rel.daysAgo}d ago</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--surface-soft)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                No GitHub release tags identified.
              </div>
            )}
          </div>

          {/* Signal 3: Repository Activity Dynamics */}
          <div className="card">
            <div className="card-header">
              <div className="card-title" style={{ fontSize: 'var(--text-base)' }}>
                <Activity size={16} color="var(--accent-amber-dark)" />
                <span>Activity Dynamics</span>
              </div>
              <span className={`badge ${data.repositoryActivity.activityState === 'Actively Maintained' ? 'badge-success' : 'badge-neutral'}`}>
                {data.repositoryActivity.activityState}
              </span>
            </div>

            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
              {data.repositoryActivity.summary}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', padding: 'var(--space-1) 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Days since last push:</span>
                <span className="font-mono" style={{ fontWeight: 600 }}>{data.repositoryActivity.daysSinceLastPush} day(s)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', padding: 'var(--space-1) 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Open Issues & Triage:</span>
                <span className="font-mono" style={{ fontWeight: 600 }}>{data.repositoryActivity.openIssuesCount.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', padding: 'var(--space-1) 0' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Default Branch:</span>
                <span className="font-mono" style={{ fontWeight: 600 }}>{data.repositoryActivity.defaultBranch}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------------
          3. Calculated Sustainability Indicators (Scores & Evidence)
         ---------------------------------------------------------------------- */}
      <div>
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--navy-950)' }}>
            Sustainability Indicators (Multi-Dimensional)
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Evaluated independently of popularity and star metrics.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
          {data.sustainabilityIndicators.map((ind, idx) => (
            <div key={ind.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-amber-dark)',
                    fontWeight: 600,
                  }}
                >
                  INDICATOR 0{idx + 1}
                </span>
                <span className={`badge ${getRatingBadgeClass(ind.rating)}`} style={{ fontSize: '0.6875rem' }}>
                  {ind.rating} ({ind.score}/100)
                </span>
              </div>

              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--navy-950)', marginBottom: 'var(--space-2)' }}>
                {ind.name}
              </h3>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-3)' }}>
                {ind.scope}
              </p>

              <div
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  backgroundColor: 'var(--surface-soft)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  color: 'var(--navy-950)',
                  fontFamily: 'var(--font-mono)',
                  borderLeft: '2px solid var(--accent-amber)',
                }}
              >
                {ind.evidence}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ----------------------------------------------------------------------
          4. Maintenance Continuity Projection
         ---------------------------------------------------------------------- */}
      {(() => {
        const maintainerInd = data.sustainabilityIndicators.find((i) => i.id === 'maintainer_distribution') || data.sustainabilityIndicators[0];
        const releaseInd = data.sustainabilityIndicators.find((i) => i.id === 'release_cadence') || data.sustainabilityIndicators[1];
        const activityInd = data.sustainabilityIndicators.find((i) => i.id === 'activity_dynamics') || data.sustainabilityIndicators[2];
        const governanceInd = data.sustainabilityIndicators.find((i) => i.id === 'governance_structure') || data.sustainabilityIndicators[3];

        const mScore = maintainerInd?.score ?? 75;
        const rScore = releaseInd?.score ?? 75;
        const aScore = activityInd?.score ?? 75;
        const gScore = governanceInd?.score ?? 75;

        const mPts = (mScore * 0.3).toFixed(1);
        const rPts = (rScore * 0.3).toFixed(1);
        const aPts = (aScore * 0.25).toFixed(1);
        const gPts = (gScore * 0.15).toFixed(1);

        return (
          <div className="card">
            <div className="card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <div className="card-title">
                <GitBranch size={18} color="var(--accent-amber-dark)" />
                <span>Maintenance Continuity Projection</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                <span className={`badge ${getContinuityBadgeClass(data.maintenanceContinuity.status)}`}>
                  {data.maintenanceContinuity.status} • Score: {data.maintenanceContinuity.score}/100
                </span>
                <button
                  type="button"
                  onClick={() => setShowCalculationDetails(!showCalculationDetails)}
                  className="btn btn-outline btn-sm"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: 'var(--text-xs)',
                    padding: '0.25rem 0.65rem',
                    borderColor: showCalculationDetails ? 'var(--navy-900)' : 'var(--accent-amber)',
                    backgroundColor: showCalculationDetails ? 'var(--navy-900)' : 'rgba(245, 158, 11, 0.08)',
                    color: showCalculationDetails ? '#ffffff' : 'var(--navy-950)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                  title="View metric formulas and weights"
                >
                  <Calculator size={14} color={showCalculationDetails ? '#ffffff' : 'var(--accent-amber-dark)'} />
                  <span>How we calculated</span>
                  {showCalculationDetails ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
              </div>
            </div>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--navy-950)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
              {data.maintenanceContinuity.explanation}
            </p>

            <div
              style={{
                padding: 'var(--space-4)',
                backgroundColor: 'var(--surface-soft)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
              }}
            >
              <div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  PROJECTED STEWARDSHIP CONFIDENCE
                </div>
                <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--navy-950)' }}>
                  {data.maintenanceContinuity.score}% Sustainability Confidence Index
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', maxWidth: '360px' }}>
                  Validated against historical project transition patterns. Indicates relative probability of uninterrupted release cycles.
                </div>
                <button
                  type="button"
                  onClick={() => setShowCalculationDetails(!showCalculationDetails)}
                  className="btn btn-outline btn-sm"
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.6rem',
                    gap: '0.3rem',
                  }}
                >
                  <Calculator size={13} />
                  <span>{showCalculationDetails ? 'Hide Calculation' : 'How we calculated'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Calculation Breakdown */}
            {showCalculationDetails && (
              <div
                style={{
                  marginTop: 'var(--space-4)',
                  padding: 'var(--space-5)',
                  backgroundColor: 'var(--surface-soft)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--accent-amber)',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 'var(--space-4)',
                    flexWrap: 'wrap',
                    gap: 'var(--space-2)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: 'var(--text-xs)',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--accent-amber-dark)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}
                    >
                      <HelpCircle size={14} />
                      <span>Empirical Scoring Formula</span>
                    </div>
                    <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--navy-950)', marginTop: '0.2rem' }}>
                      Multi-Signal Weighted Continuity Model
                    </h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.2rem', maxWidth: '640px' }}>
                      Continuity score is calculated across four empirical dimensions derived directly from public GitHub activity signals.
                    </p>
                  </div>

                  <div
                    style={{
                      padding: '0.4rem 0.8rem',
                      backgroundColor: 'var(--surface-primary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--text-xs)',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--navy-950)',
                      fontWeight: 600,
                    }}
                  >
                    Composite Score: {data.maintenanceContinuity.score}/100
                  </div>
                </div>

                {/* Formula Equation Banner */}
                <div
                  style={{
                    backgroundColor: 'var(--navy-950)',
                    color: 'var(--text-inverse)',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    marginBottom: 'var(--space-4)',
                    overflowX: 'auto',
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: 'var(--accent-amber)' }}>Continuity Score</span> = ({mScore} × <span style={{ color: '#60a5fa' }}>0.30</span>) + ({rScore} × <span style={{ color: '#60a5fa' }}>0.30</span>) + ({aScore} × <span style={{ color: '#60a5fa' }}>0.25</span>) + ({gScore} × <span style={{ color: '#60a5fa' }}>0.15</span>) = <strong style={{ color: 'var(--accent-amber)' }}>{data.maintenanceContinuity.score}</strong>
                </div>

                {/* 4 Dimension Breakdown Cards */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: 'var(--space-3)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {/* Maintainer Distribution */}
                  <div
                    style={{
                      backgroundColor: 'var(--surface-primary)',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--navy-950)' }}>
                        Maintainer Distribution
                      </span>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontFamily: 'var(--font-mono)',
                          backgroundColor: 'rgba(96, 165, 250, 0.15)',
                          color: '#2563eb',
                          padding: '0.15rem 0.4rem',
                          borderRadius: 'var(--radius-sm)',
                          fontWeight: 600,
                        }}
                      >
                        30% Weight
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--navy-950)' }}>{mScore}</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>/ 100</span>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--accent-amber-dark)', marginLeft: 'auto' }}>
                        +{mPts} pts
                      </span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                      Measures bus factor and contributor commit concentration. Top 3 hold {data.maintainerDistribution.top3SharePercentage}% share across {data.maintainerDistribution.totalContributorsSampled} sampled maintainers.
                    </p>
                  </div>

                  {/* Release Cadence */}
                  <div
                    style={{
                      backgroundColor: 'var(--surface-primary)',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--navy-950)' }}>
                        Release Cadence
                      </span>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontFamily: 'var(--font-mono)',
                          backgroundColor: 'rgba(96, 165, 250, 0.15)',
                          color: '#2563eb',
                          padding: '0.15rem 0.4rem',
                          borderRadius: 'var(--radius-sm)',
                          fontWeight: 600,
                        }}
                      >
                        30% Weight
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--navy-950)' }}>{rScore}</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>/ 100</span>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--accent-amber-dark)', marginLeft: 'auto' }}>
                        +{rPts} pts
                      </span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                      Evaluates predictable intervals between versions. Latest release {data.releaseContinuity.latestRelease ? `${data.releaseContinuity.latestRelease.tagName} (${data.releaseContinuity.latestRelease.daysAgo}d ago)` : 'not tagged'}. Average cadence: {data.releaseContinuity.averageIntervalDays}d.
                    </p>
                  </div>

                  {/* Activity Dynamics */}
                  <div
                    style={{
                      backgroundColor: 'var(--surface-primary)',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--navy-950)' }}>
                        Activity Dynamics
                      </span>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontFamily: 'var(--font-mono)',
                          backgroundColor: 'rgba(96, 165, 250, 0.15)',
                          color: '#2563eb',
                          padding: '0.15rem 0.4rem',
                          borderRadius: 'var(--radius-sm)',
                          fontWeight: 600,
                        }}
                      >
                        25% Weight
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--navy-950)' }}>{aScore}</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>/ 100</span>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--accent-amber-dark)', marginLeft: 'auto' }}>
                        +{aPts} pts
                      </span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                      Evaluates recency of code commits, default branch pushes, and issue backlog. Last push was {data.repositoryActivity.daysSinceLastPush}d ago ({data.repositoryActivity.openIssuesCount.toLocaleString()} open issues).
                    </p>
                  </div>

                  {/* Governance & Structure */}
                  <div
                    style={{
                      backgroundColor: 'var(--surface-primary)',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--navy-950)' }}>
                        Governance Structure
                      </span>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontFamily: 'var(--font-mono)',
                          backgroundColor: 'rgba(96, 165, 250, 0.15)',
                          color: '#2563eb',
                          padding: '0.15rem 0.4rem',
                          borderRadius: 'var(--radius-sm)',
                          fontWeight: 600,
                        }}
                      >
                        15% Weight
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--navy-950)' }}>{gScore}</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>/ 100</span>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--accent-amber-dark)', marginLeft: 'auto' }}>
                        +{gPts} pts
                      </span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                      Evaluates SPDX open-source license legal safety ({data.governance.licenseName}) and organizational backing ({data.governance.ownerType === 'Organization' ? 'Organization backing' : 'Individual maintainer'}).
                    </p>
                  </div>
                </div>

                {/* Threshold Reference */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 'var(--space-2)',
                    paddingTop: 'var(--space-3)',
                    borderTop: '1px solid var(--border-light)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                    <span><strong>High Continuity:</strong> ≥ 78</span>
                    <span><strong>Moderate Continuity:</strong> 60 - 77</span>
                    <span><strong>Continuity at Risk:</strong> &lt; 60</span>
                    <span><strong>Stalled / Dormant:</strong> Push &gt; 365d or Archived</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCalculationDetails(false)}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}
                  >
                    Close breakdown
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* ----------------------------------------------------------------------
          5. Adoption Assessment Panel
         ---------------------------------------------------------------------- */}
      <div
        className="card"
        style={{
          backgroundColor: 'var(--navy-950)',
          color: 'var(--text-inverse)',
          borderColor: 'var(--navy-800)',
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
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-inverse)' }}>
              Adoption Assessment & Decision Guidance
            </h3>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--navy-950)',
              backgroundColor: 'var(--accent-amber)',
              fontWeight: 600,
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)',
            }}
          >
            {data.adoptionAssessment.recommendation}
          </span>
        </div>

        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-inverse)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
          {data.adoptionAssessment.verdict}
        </p>

        <div style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
            Key Evidence Observations:
          </div>
          <ul style={{ listStylePosition: 'inside', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.8 }}>
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
          }}
        >
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--text-inverse)', fontWeight: 500 }}>Repository:</span> {data.owner}/{data.name}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--text-inverse)', fontWeight: 500 }}>License:</span> {data.governance.licenseName}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--text-inverse)', fontWeight: 500 }}>Evidence Type:</span> Live GitHub REST Verification
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------------
          6. Traceability Note
         ---------------------------------------------------------------------- */}
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
          <strong style={{ color: 'var(--text-primary)' }}>Validation Context:</strong> Assessment results should be interpreted within the validated evidence and operating conditions. Infrastructure adoption decisions should cross-reference organizational maintenance requirements.
        </div>
      </div>
    </div>
  );
}
