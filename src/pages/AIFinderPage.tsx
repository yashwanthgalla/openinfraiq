import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Sparkles,
  AlertCircle,
  ArrowUpDown,
  History,
  Trash2,
  Lock,
} from 'lucide-react';
import { RequirementInput } from '../components/ai/RequirementInput.tsx';
import { RequirementSummary } from '../components/ai/RequirementSummary.tsx';
import { AIMatchCard } from '../components/ai/AIMatchCard.tsx';
import { AIRecommendations } from '../components/ai/AIRecommendations.tsx';
import { useAuth } from '../hooks/useAuth.tsx';
import {
  analyzeAiRequirements,
  searchAiRepositories,
  fetchSavedAiSearches,
  saveAiSearch,
  deleteSavedAiSearch,
} from '../lib/api.ts';
import type {
  AIRequirementResponse,
  AIRepositoryMatch,
  SavedAISearchItem,
} from '../types/index.ts';

type SortOption = 'rank' | 'match' | 'sustainability' | 'cloud' | 'stars' | 'activity';

export function AIFinderPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q');

  const { isAuthenticated } = useAuth();

  const [inputQuery, setInputQuery] = useState(queryParam || '');
  const [isAnalyzingRequirements, setIsAnalyzingRequirements] = useState(false);
  const [isSearchingRepositories, setIsSearchingRepositories] = useState(false);
  const [currentProgressPhase, setCurrentProgressPhase] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [understoodRequirements, setUnderstoodRequirements] = useState<AIRequirementResponse | null>(null);
  const [matches, setMatches] = useState<AIRepositoryMatch[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('rank');

  // Saved Searches state
  const [savedSearches, setSavedSearches] = useState<SavedAISearchItem[]>([]);
  const [isSavedSearchActive, setIsSavedSearchActive] = useState(false);

  // Load user saved searches if logged in
  useEffect(() => {
    if (isAuthenticated) {
      fetchSavedAiSearches().then((list) => {
        if (list) setSavedSearches(list);
      });
    }
  }, [isAuthenticated]);

  const handleAnalyzeRequirements = useCallback(async (customQuery?: string) => {
    if (!isAuthenticated) {
      setErrorMessage('Please sign in or create an account to use the AI Project Finder. All your searches and matched results are saved to your account in the backend.');
      return;
    }

    const textToAnalyze = customQuery || inputQuery;
    if (!textToAnalyze.trim()) return;

    setIsAnalyzingRequirements(true);
    setErrorMessage(null);
    setUnderstoodRequirements(null);
    setMatches([]);
    setCurrentProgressPhase('Extracting specifications with Google Gemini...');

    try {
      const response = await analyzeAiRequirements(textToAnalyze);
      setUnderstoodRequirements(response);
      setSearchParams({ q: textToAnalyze });
    } catch (err: unknown) {
      setErrorMessage((err as Error).message || 'Failed to extract requirements.');
    } finally {
      setIsAnalyzingRequirements(false);
      setCurrentProgressPhase('');
    }
  }, [inputQuery, setSearchParams]);

  // Handle URL query parameter pre-population
  useEffect(() => {
    if (queryParam && !understoodRequirements && !isAnalyzingRequirements) {
      handleAnalyzeRequirements(queryParam);
    }
  }, [queryParam, handleAnalyzeRequirements, understoodRequirements, isAnalyzingRequirements]);

  const handleSearchRepositories = async () => {
    if (!understoodRequirements) return;

    setIsSearchingRepositories(true);
    setErrorMessage(null);

    const phases = [
      'Searching candidate repositories on GitHub...',
      'Evaluating repository architectures and configuration...',
      'Computing quantitative sustainability metrics...',
      'Running Google Gemini requirement matching & cloud relevance...',
      'Calculating combined ranking scores...',
    ];
    let phaseIdx = 0;
    setCurrentProgressPhase(phases[0]);
    const timer = setInterval(() => {
      phaseIdx = (phaseIdx + 1) % phases.length;
      setCurrentProgressPhase(phases[phaseIdx]);
    }, 1200);

    try {
      const results = await searchAiRepositories(understoodRequirements, 6);
      setMatches(results);
      if (results.length === 0) {
        setErrorMessage('No repositories met the minimum threshold for these specifications. Try refining your keywords.');
      }
    } catch (err: unknown) {
      setErrorMessage((err as Error).message || 'Repository search and matching encountered an error.');
    } finally {
      clearInterval(timer);
      setIsSearchingRepositories(false);
      setCurrentProgressPhase('');
    }
  };

  const handleSaveSearch = async () => {
    if (!understoodRequirements) return;
    try {
      await saveAiSearch({
        title: understoodRequirements.summaryText || understoodRequirements.rawQuery || 'Custom Search',
        description: understoodRequirements.rawQuery || inputQuery,
        category: understoodRequirements.category,
        structuredRequirements: understoodRequirements,
      });
      setIsSavedSearchActive(true);
      if (isAuthenticated) {
        const refreshed = await fetchSavedAiSearches();
        setSavedSearches(refreshed);
      }
    } catch (err) {
      console.warn('Save search failed:', err);
    }
  };

  const handleDeleteSaved = async (id: number | string) => {
    try {
      await deleteSavedAiSearch(id);
      setSavedSearches((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.warn('Failed to delete search:', err);
    }
  };

  const handleSelectSaved = (saved: SavedAISearchItem) => {
    setInputQuery(saved.description);
    if (saved.structuredRequirements) {
      setUnderstoodRequirements(saved.structuredRequirements);
      setMatches([]);
    } else {
      handleAnalyzeRequirements(saved.description);
    }
  };

  // Sort matching candidates
  const sortedMatches = [...matches].sort((a, b) => {
    switch (sortBy) {
      case 'rank':
        return (b.finalRankingScore || 0) - (a.finalRankingScore || 0);
      case 'match':
        return (b.matchScore || 0) - (a.matchScore || 0);
      case 'sustainability':
        return (b.sustainabilityScore || 0) - (a.sustainabilityScore || 0);
      case 'cloud':
        return (((b.domainRelevanceScore ?? b.cloudRelevanceScore) || 0) - ((a.domainRelevanceScore ?? a.cloudRelevanceScore) || 0));
      case 'stars':
        return (b.starsCount || 0) - (a.starsCount || 0);
      case 'activity':
        return (a.daysSinceLastPush || 999) - (b.daysSinceLastPush || 999);
      default:
        return 0;
    }
  });

  return (
    <div style={{ padding: 'var(--space-8) 0 var(--space-16)', backgroundColor: 'var(--surface-soft)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        {/* Authentication Notice Banner for Guests */}
        {!isAuthenticated && (
          <div
            className="card"
            style={{
              padding: 'var(--space-6)',
              marginBottom: 'var(--space-6)',
              backgroundColor: 'var(--surface-primary)',
              border: '2px solid var(--accent-amber)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: 'rgba(217, 119, 6, 0.1)', borderRadius: '50%', marginBottom: 'var(--space-3)' }}>
              <Lock size={28} color="var(--accent-amber-dark)" />
            </div>
            <h3 style={{ margin: '0 0 var(--space-2)', fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--navy-950)' }}>
              Sign In Required to Use AI Project Finder
            </h3>
            <p style={{ margin: '0 auto var(--space-5)', maxWidth: '560px', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              AI-powered repository discovery and requirement matching is exclusively available to authenticated members. Create an account or sign in—everything you search and evaluate will be automatically saved to your profile in the backend.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <Link to="/login?redirect=/ai-finder" className="btn btn-primary" style={{ padding: '0.65rem 1.6rem', fontWeight: 700 }}>
                Sign In to Your Account
              </Link>
              <Link to="/register?redirect=/ai-finder" className="btn btn-outline" style={{ padding: '0.65rem 1.6rem', fontWeight: 700 }}>
                Create Free Account
              </Link>
            </div>
          </div>
        )}

        {/* Main Input Form Card */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <RequirementInput
            value={inputQuery}
            onChange={setInputQuery}
            onSubmit={() => handleAnalyzeRequirements()}
            isLoading={isAnalyzingRequirements || isSearchingRepositories}
          />
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            className="card"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: 'var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              color: '#DC2626',
              fontSize: 'var(--text-sm)',
              marginBottom: 'var(--space-6)',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Loading Progress State */}
        {(isAnalyzingRequirements || isSearchingRepositories) && (
          <div
            className="card"
            style={{
              padding: 'var(--space-6)',
              textAlign: 'center',
              backgroundColor: 'var(--surface-primary)',
              marginBottom: 'var(--space-6)',
            }}
          >
            <Sparkles size={32} color="var(--accent-amber)" className="spin" style={{ margin: '0 auto var(--space-3)' }} />
            <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--navy-950)', marginBottom: 'var(--space-2)' }}>
              {currentProgressPhase || 'Processing...'}
            </div>
            <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
              Combining Google Gemini qualitative analysis with OpenInfraIQ deterministic telemetry.
            </p>
          </div>
        )}

        {/* Understood Requirements Card */}
        {understoodRequirements && !isAnalyzingRequirements && (
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <RequirementSummary
              requirements={understoodRequirements}
              onSearch={handleSearchRepositories}
              isSearching={isSearchingRepositories}
              onSave={isAuthenticated ? handleSaveSearch : undefined}
              isSaved={isSavedSearchActive}
            />
          </div>
        )}

        {/* Candidate Matching Results Section */}
        {matches.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {/* Sorting & Filter Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                paddingBottom: 'var(--space-2)',
                borderBottom: '1px solid var(--border-light)',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 800, color: 'var(--navy-950)' }}>
                  Discovered Candidate Repositories ({matches.length})
                </h3>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  Ranked by Combined Score (Match 40% + Sustainability 30% + Cloud 20% + Activity 10%)
                </span>
              </div>

              {/* Sort Switcher */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 'var(--text-xs)' }}>
                <ArrowUpDown size={14} color="var(--text-secondary)" />
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  style={{
                    padding: '0.3rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--surface-primary)',
                    color: 'var(--navy-950)',
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'inherit',
                  }}
                >
                  <option value="rank">Combined Ranking</option>
                  <option value="match">AI Match %</option>
                  <option value="sustainability">Sustainability Score</option>
                  <option value="cloud">Domain / Tech Relevance %</option>
                  <option value="stars">GitHub Stars</option>
                  <option value="activity">Recent Push Activity</option>
                </select>
              </div>
            </div>

            {/* Candidate Match Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {sortedMatches.map((match, idx) => (
                <AIMatchCard key={idx} match={match} />
              ))}
            </div>

            {/* Cross-Project Advisory */}
            {understoodRequirements && (
              <AIRecommendations
                requirements={understoodRequirements}
                matches={matches}
              />
            )}
          </div>
        )}

        {/* User Saved Searches Sidebar / Card */}
        {isAuthenticated && savedSearches.length > 0 && !matches.length && !understoodRequirements && (
          <div
            className="card"
            style={{
              padding: 'var(--space-5)',
              backgroundColor: 'var(--surface-primary)',
              marginTop: 'var(--space-6)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 'var(--space-3)', color: 'var(--navy-950)' }}>
              <History size={16} />
              <h4 style={{ margin: 0, fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                My Saved AI Searches ({savedSearches.length})
              </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
              {savedSearches.map((s) => (
                <div
                  key={s.id}
                  style={{
                    backgroundColor: 'var(--surface-soft)',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 'var(--space-2)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectSaved(s)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textAlign: 'left',
                      cursor: 'pointer',
                      flex: 1,
                    }}
                  >
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--navy-950)', marginBottom: '0.2rem' }}>
                      {s.title}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '240px' }}>
                      {s.description}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteSaved(s.id)}
                    className="btn btn-outline btn-sm btn-icon"
                    title="Delete saved search"
                    style={{ padding: '0.2rem', color: '#DC2626' }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
