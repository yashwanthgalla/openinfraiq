/* ==========================================================================
   InfraMaturity - Workspace Dashboard Page
   Clean, engineering analytics workspace without fake dashboard metrics.
   ========================================================================== */

import { Link } from 'react-router-dom';
import {
  Search,
  Bookmark,
  Clock,
  ArrowRight,
  Compass,
  FolderGit2,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.tsx';
import { useRepositoryStore } from '../hooks/useRepositoryStore.ts';
import { RepoCard } from '../components/repository/RepoCard.tsx';
import { EmptyState } from '../components/common/EmptyState.tsx';

export function DashboardPage() {
  const { user } = useAuth();
  const { history, savedRepos, toggleBookmark, deleteHistoryItem, checkIsSaved } =
    useRepositoryStore();

  const recentSearches = history.slice(0, 4);
  const recentSaved = savedRepos.slice(0, 3);

  return (
    <div style={{ padding: 'var(--space-8) 0 var(--space-16)', backgroundColor: 'var(--surface-soft)' }}>
      <div className="container">
        {/* Welcome Header */}
        <div
          className="card"
          style={{
            marginBottom: 'var(--space-8)',
            borderLeft: '4px solid var(--accent-amber)',
            backgroundColor: 'var(--surface-primary)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
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
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                <span>ENGINEERING WORKSPACE</span>
              </div>
              <h1 style={{ fontSize: 'var(--text-2xl)', color: 'var(--navy-950)', marginBottom: 'var(--space-1)' }}>
                Welcome back, {user?.name || 'Engineer'}
              </h1>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Your assessment workspace is ready. Enter a public repository to begin characterization.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Link to="/assess" className="btn btn-primary">
                <Search size={16} />
                <span>Assess a Repository</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Workspace Counts (Authentic user data, not fake metrics) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
          }}
        >
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-soft)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-amber-dark)',
                }}
              >
                <Clock size={18} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--navy-950)', lineHeight: 1.1 }}>
                  {history.length}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  Total Queried Repositories
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-soft)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--navy-900)',
                }}
              >
                <Bookmark size={18} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--navy-950)', lineHeight: 1.1 }}>
                  {savedRepos.length}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  Saved Repositories
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-soft)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                }}
              >
                <Compass size={18} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--navy-950)', lineHeight: 1.2 }}>
                  Baseline Active
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  Stalled Validation Model
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Columns: Recent Repositories & Bookmarked Repositories */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'var(--space-8)',
          }}
        >
          {/* Recent Repositories */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-4)',
              }}
            >
              <h2 style={{ fontSize: 'var(--text-lg)', color: 'var(--navy-950)' }}>
                Recent Search History
              </h2>
              {history.length > 0 && (
                <Link
                  to="/profile?tab=history"
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--accent-amber-dark)',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                  }}
                >
                  <span>View in Profile ({history.length})</span>
                  <ArrowRight size={12} />
                </Link>
              )}
            </div>

            {recentSearches.length === 0 ? (
              <EmptyState
                icon={<FolderGit2 size={20} />}
                title="No repository assessments yet."
                description="Start by entering a public repository to initialize your workspace history."
                action={
                  <Link to="/assess" className="btn btn-outline btn-sm">
                    Assess Repository
                  </Link>
                }
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {recentSearches.map((repo) => (
                  <RepoCard
                    key={repo.id}
                    id={repo.id}
                    owner={repo.owner}
                    name={repo.repositoryName}
                    url={repo.repositoryUrl}
                    status={repo.status}
                    searchedAt={repo.searchedAt}
                    isSaved={checkIsSaved(repo.owner, repo.repositoryName)}
                    onToggleSave={() =>
                      toggleBookmark({
                        owner: repo.owner,
                        repositoryName: repo.repositoryName,
                        repositoryUrl: repo.repositoryUrl,
                        status: repo.status,
                      })
                    }
                    onRemove={() => deleteHistoryItem(repo.id)}
                    variant="compact"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Saved Repositories */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-4)',
              }}
            >
              <h2 style={{ fontSize: 'var(--text-lg)', color: 'var(--navy-950)' }}>
                Saved Repositories
              </h2>
              {savedRepos.length > 0 && (
                <Link
                  to="/profile?tab=saved"
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--accent-amber-dark)',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                  }}
                >
                  <span>View in Profile ({savedRepos.length})</span>
                  <ArrowRight size={12} />
                </Link>
              )}
            </div>

            {recentSaved.length === 0 ? (
              <EmptyState
                icon={<Bookmark size={20} />}
                title="You haven't saved any repositories yet."
                description="Save repositories during assessment to monitor them together in your workspace."
                action={
                  <Link to="/assess" className="btn btn-outline btn-sm">
                    Assess Repository
                  </Link>
                }
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {recentSaved.map((repo) => (
                  <RepoCard
                    key={repo.id}
                    id={repo.id}
                    owner={repo.owner}
                    name={repo.repositoryName}
                    url={repo.repositoryUrl}
                    status={repo.status}
                    savedAt={repo.savedAt}
                    isSaved={true}
                    onToggleSave={() =>
                      toggleBookmark({
                        owner: repo.owner,
                        repositoryName: repo.repositoryName,
                        repositoryUrl: repo.repositoryUrl,
                        status: repo.status,
                      })
                    }
                    variant="compact"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
