import {
  CheckCircle2,
  Cloud,
  Cpu,
  Layers,
  Search,
  Sparkles,
  Tag,
  Activity,
  Bookmark,
} from 'lucide-react';
import type { AIRequirementResponse } from '../../types/index.ts';

interface RequirementSummaryProps {
  requirements: AIRequirementResponse;
  onSearch: () => void;
  isSearching: boolean;
  onSave?: () => void;
  isSaved?: boolean;
}

export function RequirementSummary({
  requirements,
  onSearch,
  isSearching,
  onSave,
  isSaved,
}: RequirementSummaryProps) {
  const formatCategory = (cat: string) => {
    return cat.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div
      className="card"
      style={{
        padding: 'var(--space-6)',
        backgroundColor: 'var(--surface-primary)',
        border: '1.5px solid var(--accent-amber)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-4)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
            <CheckCircle2 size={18} color="var(--accent-amber-dark)" />
            <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--navy-950)' }}>
              Understood Requirements
            </h3>
            <span
              style={{
                fontSize: '0.6875rem',
                backgroundColor: 'rgba(217, 119, 6, 0.12)',
                color: '#B45309',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
              }}
            >
              Gemini Parsed
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
            Review the extracted specifications before querying GitHub candidate repositories.
          </p>
        </div>

        {onSave && (
          <button
            onClick={onSave}
            type="button"
            className="btn btn-outline btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Bookmark size={14} color={isSaved ? 'var(--accent-amber)' : 'currentColor'} />
            <span>{isSaved ? 'Requirement Saved' : 'Save Search'}</span>
          </button>
        )}
      </div>

      {requirements.summaryText && (
        <div
          style={{
            backgroundColor: 'var(--surface-soft)',
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-md)',
            borderLeft: '3px solid var(--accent-amber)',
            fontSize: 'var(--text-sm)',
            color: 'var(--navy-950)',
            marginBottom: 'var(--space-4)',
            lineHeight: 1.5,
          }}
        >
          {requirements.summaryText}
        </div>
      )}

      {/* Structured Parameters Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-5)',
        }}
      >
        {/* Category & Complexity */}
        <div style={{ backgroundColor: 'var(--surface-soft)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#2563EB', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            <Layers size={13} />
            <span>Target Domain &amp; Level</span>
          </div>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
              {formatCategory(requirements.category || 'other')}
            </span>
            <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>
              {requirements.complexity || 'Intermediate'}
            </span>
          </div>
        </div>

        {/* Cloud or Architectural Features */}
        <div style={{ backgroundColor: 'var(--surface-soft)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#D97706', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            {requirements.cloudProviders && requirements.cloudProviders.length > 0 ? <Cloud size={13} /> : <Tag size={13} />}
            <span>
              {requirements.cloudProviders && requirements.cloudProviders.length > 0 ? 'Target Cloud Platforms' : 'Core Architecture Features'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            {requirements.cloudProviders && requirements.cloudProviders.length > 0 ? (
              requirements.cloudProviders.map((cp, idx) => (
                <span key={idx} style={{ backgroundColor: '#FEF3C7', color: '#92400E', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                  {cp}
                </span>
              ))
            ) : requirements.requiredFeatures && requirements.requiredFeatures.length > 0 ? (
              requirements.requiredFeatures.map((feat, idx) => (
                <span key={idx} style={{ backgroundColor: '#FEF3C7', color: '#92400E', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                  {feat}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Standard specifications</span>
            )}
          </div>
        </div>

        {/* Required Technologies */}
        <div style={{ backgroundColor: 'var(--surface-soft)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#059669', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            <Cpu size={13} />
            <span>Required Technologies</span>
          </div>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            {requirements.requiredTechnologies && requirements.requiredTechnologies.length > 0 ? (
              requirements.requiredTechnologies.map((tech, idx) => (
                <span key={idx} style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                  {tech}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Open-source tools</span>
            )}
          </div>
        </div>

        {/* Monitoring or Preferred Technologies */}
        <div style={{ backgroundColor: 'var(--surface-soft)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#7C3AED', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            {requirements.monitoringRequirements && requirements.monitoringRequirements.length > 0 ? <Activity size={13} /> : <Sparkles size={13} />}
            <span>
              {requirements.monitoringRequirements && requirements.monitoringRequirements.length > 0 ? 'Monitoring & Observability' : 'Preferred Tools / Integrations'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            {requirements.monitoringRequirements && requirements.monitoringRequirements.length > 0 ? (
              requirements.monitoringRequirements.map((mon, idx) => (
                <span key={idx} style={{ backgroundColor: '#EDE9FE', color: '#5B21B6', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                  {mon}
                </span>
              ))
            ) : requirements.preferredTechnologies && requirements.preferredTechnologies.length > 0 ? (
              requirements.preferredTechnologies.map((pref, idx) => (
                <span key={idx} style={{ backgroundColor: '#EDE9FE', color: '#5B21B6', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                  {pref}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Flexible</span>
            )}
          </div>
        </div>
      </div>

      {/* GitHub Keywords Extracted */}
      {requirements.keywords && requirements.keywords.length > 0 && (
        <div style={{ marginBottom: 'var(--space-5)' }}>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Tag size={12} />
            <span>Extracted Search Keywords for GitHub Engine:</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {requirements.keywords.map((kw, idx) => (
              <code
                key={idx}
                style={{
                  backgroundColor: 'var(--surface-soft)',
                  border: '1px solid var(--border-light)',
                  padding: '0.15rem 0.45rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.7rem',
                  color: 'var(--navy-900)',
                }}
              >
                {kw}
              </code>
            ))}
          </div>
        </div>
      )}

      {/* Action Button: Find Matching Repositories */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={onSearch}
          disabled={isSearching}
          className="btn btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.6rem',
            fontWeight: 800,
            fontSize: 'var(--text-sm)',
          }}
        >
          {isSearching ? <Sparkles size={16} className="spin" /> : <Search size={16} />}
          <span>{isSearching ? 'Discovering & Matching Candidates...' : 'Find Matching Repositories'}</span>
        </button>
      </div>
    </div>
  );
}
