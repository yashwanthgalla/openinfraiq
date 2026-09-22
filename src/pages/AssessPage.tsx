/* ==========================================================================
   InfraMaturity - Repository Assessment Page
   Coordinates live GitHub REST API querying, real-time indicator computation,
   and dynamic presentation of live sustainability results.
   ========================================================================== */

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  Clock,
  Layers,
  RefreshCw,
  AlertCircle,
  Key,
} from 'lucide-react';
import { RepositoryInput } from '../components/assess/RepositoryInput.tsx';
import { AssessmentShell } from '../components/assess/AssessmentShell.tsx';
import { useRepositoryStore } from '../hooks/useRepositoryStore.ts';
import { parseRepositoryUrl } from '../lib/validators.ts';
import { analyzeRepository } from '../lib/analyzer.ts';
import { getGitHubToken, setGitHubToken } from '../lib/githubApi.ts';
import type { RealAssessmentResult } from '../types/index.ts';

export function AssessPage() {
  const [searchParams] = useSearchParams();
  const repoParam = searchParams.get('repo');

  const { recordSearch, toggleBookmark, checkIsSaved } = useRepositoryStore();

  const [assessmentResult, setAssessmentResult] = useState<RealAssessmentResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Rate limit / token helper
  const [tokenInput, setTokenInput] = useState(getGitHubToken() || '');
  const [showTokenPrompt, setShowTokenPrompt] = useState(false);

  const startAssessment = useCallback(
    async (owner: string, repo: string, normalizedUrl: string) => {
      setIsProcessing(true);
      setErrorMessage(null);
      setShowTokenPrompt(false);
      setCurrentPhase('Initializing GitHub repository query');

      try {
        const result = await analyzeRepository(owner, repo, (phase) => {
          setCurrentPhase(phase);
        });

        setAssessmentResult(result);

        // Record in workspace history with live description and language
        recordSearch(
          owner,
          repo,
          normalizedUrl,
          'available',
          result.description,
          result.language
        );
      } catch (err: unknown) {
        const msg = (err as Error).message || 'Failed to complete repository assessment.';
        setErrorMessage(msg);
        if (msg.includes('rate limit')) {
          setShowTokenPrompt(true);
        }
        // Record as unavailable
        recordSearch(owner, repo, normalizedUrl, 'unavailable');
      } finally {
        setIsProcessing(false);
      }
    },
    [recordSearch]
  );

  // Handle URL query parameter pre-population
  useEffect(() => {
    if (repoParam) {
      const parsed = parseRepositoryUrl(repoParam);
      if (parsed.isValid) {
        startAssessment(parsed.owner, parsed.name, parsed.normalizedUrl);
      }
    }
  }, [repoParam, startAssessment]);

  const handleToggleSave = () => {
    if (!assessmentResult) return;
    toggleBookmark({
      owner: assessmentResult.owner,
      repositoryName: assessmentResult.name,
      repositoryUrl: assessmentResult.url,
      status: assessmentResult.status,
      description: assessmentResult.description,
      language: assessmentResult.language,
    });
  };

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    setGitHubToken(tokenInput);
    setShowTokenPrompt(false);
    if (repoParam) {
      const parsed = parseRepositoryUrl(repoParam);
      if (parsed.isValid) {
        startAssessment(parsed.owner, parsed.name, parsed.normalizedUrl);
      }
    }
  };

  const isCurrentRepoSaved = assessmentResult
    ? checkIsSaved(assessmentResult.owner, assessmentResult.name)
    : false;

  return (
    <div style={{ padding: 'var(--space-8) 0 var(--space-16)', backgroundColor: 'var(--surface-soft)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        {/* Page Header */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
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
              marginBottom: 'var(--space-2)',
            }}
          >
            <Layers size={14} />
            <span>Maturity Evaluation</span>
          </div>
          <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--navy-950)', marginBottom: 'var(--space-2)' }}>
            Assess a repository
          </h1>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
            Enter a public repository to execute real-time sustainability and maintenance continuity analysis.
          </p>
        </div>

        {/* Repository Input Card */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <RepositoryInput onAnalyze={startAssessment} isProcessing={isProcessing} />
        </div>

        {/* Live Processing State Animation */}
        {isProcessing && (
          <div
            className="card"
            style={{
              padding: 'var(--space-8)',
              border: '1px solid var(--accent-amber)',
              backgroundColor: 'var(--surface-primary)',
              boxShadow: 'var(--shadow-md)',
              marginBottom: 'var(--space-8)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245, 158, 11, 0.15)',
                  color: 'var(--accent-amber-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RefreshCw size={18} className="spin-slow" />
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--navy-950)' }}>
                  Extracting Public Repository Signals
                </h3>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  {currentPhase}...
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {[
                'Querying GitHub repository metadata',
                'Analyzing maintainer topology and contributor dispersion',
                'Extracting release cadence and version history',
                'Evaluating recent commit timeline and activity dynamics',
                'Computing sustainability indicators & maintenance continuity',
              ].map((stage) => {
                const isCurrent = currentPhase.toLowerCase().includes(stage.toLowerCase().slice(0, 15));
                return (
                  <div
                    key={stage}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      fontSize: 'var(--text-sm)',
                      color: isCurrent ? 'var(--accent-amber-dark)' : 'var(--text-secondary)',
                      fontWeight: isCurrent ? 600 : 400,
                    }}
                  >
                    {isCurrent ? (
                      <div
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          border: '2px solid var(--accent-amber)',
                          borderTopColor: 'transparent',
                        }}
                        className="spin-slow"
                      />
                    ) : (
                      <CheckCircle2 size={14} color="var(--border-light)" />
                    )}
                    <span>{stage}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Error State Banner */}
        {errorMessage && !isProcessing && (
          <div
            className="alert alert-error"
            style={{ marginBottom: 'var(--space-8)' }}
          >
            <AlertCircle size={20} className="alert-icon" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Unable to Complete Repository Assessment</div>
              <p style={{ fontSize: 'var(--text-sm)' }}>{errorMessage}</p>

              {showTokenPrompt && (
                <form onSubmit={handleSaveToken} style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-2)' }}>
                  <input
                    type="password"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="Enter GitHub Personal Access Token"
                    className="form-input"
                    style={{ fontSize: 'var(--text-xs)', maxWidth: '360px' }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    <Key size={13} />
                    <span>Set Token & Retry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Assessment Results */}
        {!isProcessing && assessmentResult && (
          <div>
            <AssessmentShell
              data={assessmentResult}
              isSaved={isCurrentRepoSaved}
              onToggleSave={handleToggleSave}
              onReAssess={() =>
                startAssessment(assessmentResult.owner, assessmentResult.name, assessmentResult.url)
              }
            />
          </div>
        )}

        {/* Initial Empty State */}
        {!isProcessing && !assessmentResult && !errorMessage && (
          <div
            className="card"
            style={{
              padding: 'var(--space-12) var(--space-6)',
              textAlign: 'center',
              backgroundColor: 'var(--surface-primary)',
              border: '1px dashed var(--border-light)',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--surface-soft)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                margin: '0 auto var(--space-4)',
              }}
            >
              <Search size={22} />
            </div>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--navy-950)', marginBottom: 'var(--space-2)' }}>
              No repository assessed in this session.
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto var(--space-4)' }}>
              Enter a public repository URL above (e.g., <code className="font-mono">kubernetes/kubernetes</code>) or choose one of the reference examples to run a live assessment.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
              }}
            >
              <Clock size={13} />
              <span>Direct integration with public GitHub endpoints • 1-hour client cache</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
