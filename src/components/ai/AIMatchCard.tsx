import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  Sparkles,
  Cloud,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Star,
  GitFork,
  Clock,
  Brain,
  Layout,
  Server,
  Database,
  Smartphone,
  Layers,
} from 'lucide-react';
import type { AIRepositoryMatch } from '../../types/index.ts';
import { AIAnalysisPanel } from './AIAnalysisPanel.tsx';

interface AIMatchCardProps {
  match: AIRepositoryMatch;
}

export function AIMatchCard({ match }: AIMatchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#059669';
    if (score >= 60) return '#D97706';
    return '#DC2626';
  };

  const getDomainConfig = () => {
    const cat = (match.category || '').toLowerCase();
    if (cat.includes('machine_learning') || cat.includes('ai')) {
      return { label: match.relevanceLabel || 'AI/ML Relevance', Icon: Brain, color: '#7C3AED' };
    }
    if (cat.includes('frontend')) {
      return { label: match.relevanceLabel || 'Frontend Relevance', Icon: Layout, color: '#0284C7' };
    }
    if (cat.includes('backend') || cat.includes('microservices')) {
      return { label: match.relevanceLabel || 'Backend Relevance', Icon: Server, color: '#0D9488' };
    }
    if (cat.includes('data') || cat.includes('database')) {
      return { label: match.relevanceLabel || 'Data Relevance', Icon: Database, color: '#D97706' };
    }
    if (cat.includes('mobile')) {
      return { label: match.relevanceLabel || 'Mobile Relevance', Icon: Smartphone, color: '#E11D48' };
    }
    if (cat.includes('cloud') || cat.includes('devops')) {
      return { label: match.relevanceLabel || 'Cloud Relevance', Icon: Cloud, color: '#2563EB' };
    }
    return { label: match.relevanceLabel || 'Domain Relevance', Icon: Layers, color: '#2563EB' };
  };

  const domainConfig = getDomainConfig();
  const domainScore = match.domainRelevanceScore ?? match.cloudRelevanceScore;

  return (
    <div
      className="card"
      style={{
        padding: 'var(--space-6)',
        backgroundColor: 'var(--surface-primary)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Header & Badges */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-3)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 800 }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{match.owner} / </span>
              <span style={{ color: 'var(--navy-950)' }}>{match.name}</span>
            </h3>
            <a
              href={match.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm btn-icon"
              title="Open repository on GitHub"
            >
              <ExternalLink size={13} />
            </a>
          </div>

          <p style={{ margin: '0.35rem 0 0', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', maxWidth: '640px', lineHeight: 1.5 }}>
            {match.description || 'No description provided.'}
          </p>
        </div>

        {/* Telemetry info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
            <Star size={13} color="#D97706" /> {match.starsCount?.toLocaleString() || 0}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
            <GitFork size={13} color="#2563EB" /> {match.forksCount?.toLocaleString() || 0}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
            <Clock size={13} /> {match.daysSinceLastPush != null ? `${match.daysSinceLastPush}d ago` : 'recent'}
          </span>
        </div>
      </div>

      {/* Tri-Score Bar (AI Match, Cloud Relevance, OpenInfraIQ Sustainability) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 'var(--space-3)',
          backgroundColor: 'var(--surface-soft)',
          padding: 'var(--space-3) var(--space-4)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--space-4)',
          border: '1px solid var(--border-light)',
        }}
      >
        {/* Final Ranking Score */}
        <div>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Combined Rank
          </div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--navy-950)', fontFamily: 'var(--font-mono)' }}>
            {match.finalRankingScore}/100
          </div>
        </div>

        {/* AI Requirement Match */}
        <div>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Sparkles size={11} /> AI Match
          </div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: getScoreColor(match.matchScore), fontFamily: 'var(--font-mono)' }}>
            {match.matchScore}%
          </div>
        </div>

        {/* Domain / Tech Relevance */}
        <div>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: domainConfig.color, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <domainConfig.Icon size={11} /> {domainConfig.label}
          </div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: getScoreColor(domainScore), fontFamily: 'var(--font-mono)' }}>
            {domainScore}%
          </div>
        </div>

        {/* OpenInfraIQ Sustainability Score */}
        <div>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <ShieldCheck size={11} /> Sustainability
          </div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: getScoreColor(match.sustainabilityScore), fontFamily: 'var(--font-mono)' }}>
            {match.sustainabilityScore}/100
          </div>
        </div>
      </div>

      {/* Requirement Matching Status Pills */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
          Requirement Verification Status:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {match.requirements && match.requirements.map((req, idx) => {
            const isMatched = req.status === 'MATCHED';
            const isPartial = req.status === 'PARTIALLY_MATCHED';
            const isMissing = req.status === 'MISSING';

            let bgColor = 'rgba(239, 68, 68, 0.1)';
            let textColor = '#DC2626';
            let Icon = XCircle;

            if (isMatched) {
              bgColor = 'rgba(16, 185, 129, 0.1)';
              textColor = '#059669';
              Icon = CheckCircle2;
            } else if (isPartial) {
              bgColor = 'rgba(217, 119, 6, 0.1)';
              textColor = '#D97706';
              Icon = HelpCircle;
            } else if (!isMissing) {
              bgColor = 'rgba(148, 163, 184, 0.1)';
              textColor = '#64748B';
              Icon = HelpCircle;
            }

            return (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  backgroundColor: bgColor,
                  color: textColor,
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  border: `1px solid ${textColor}30`,
                }}
              >
                <Icon size={12} />
                <span>{req.requirement}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* AI Summary snippet */}
      {match.summary && (
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', marginBottom: 'var(--space-4)', lineHeight: 1.5 }}>
          {match.summary}
        </div>
      )}

      {/* Card Action Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid var(--border-light)',
        }}
      >
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn btn-outline btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <span>{isExpanded ? 'Hide AI Details' : 'View AI Analysis'}</span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        <Link
          to={`/assess?repo=${encodeURIComponent(match.fullName)}`}
          className="btn btn-primary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
        >
          <span>Deep Sustainability Assessment</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Expanded AI Analysis Panel */}
      {isExpanded && <AIAnalysisPanel match={match} />}
    </div>
  );
}
