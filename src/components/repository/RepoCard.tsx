/* ==========================================================================
   InfraMaturity - Reusable Repository Card Component
   Used in Dashboard, Saved Repositories, History, and Profile.
   ========================================================================== */

import { Link } from 'react-router-dom';
import {
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Search,
  Trash2,
  Clock,
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge.tsx';
import type { AssessmentStatus } from '../../types/index.ts';

interface RepoCardProps {
  id: string;
  owner: string;
  name: string;
  url: string;
  status: AssessmentStatus;
  searchedAt?: string;
  savedAt?: string;
  language?: string;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onRemove?: () => void;
  variant?: 'compact' | 'full';
}

export function RepoCard({
  owner,
  name,
  url,
  status,
  searchedAt,
  savedAt,
  language,
  isSaved = false,
  onToggleSave,
  onRemove,
  variant = 'full',
}: RepoCardProps) {
  const timestamp = savedAt || searchedAt;
  const timeLabel = savedAt ? 'Saved' : 'Searched';

  return (
    <div
      className="card card-interactive"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-2)',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {owner}
            </div>
            <Link
              to={`/assess?repo=${encodeURIComponent(url)}`}
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                color: 'var(--navy-950)',
                textDecoration: 'none',
                lineHeight: 1.3,
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </Link>
          </div>

          <StatusBadge status={status} size="sm" />
        </div>

        {variant === 'full' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontSize: 'var(--text-xs)',
              marginBottom: 'var(--space-3)',
            }}
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text-secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.2rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span>Repository URL</span>
              <ExternalLink size={11} />
            </a>
            {language && (
              <>
                <span style={{ color: 'var(--border-light)' }}>•</span>
                <span style={{ color: 'var(--text-muted)' }}>{language}</span>
              </>
            )}
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: 'var(--space-4)',
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
        }}
      >
        {timestamp ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <Clock size={12} />
            <span>
              {timeLabel}: {new Date(timestamp).toLocaleDateString()}
            </span>
          </div>
        ) : (
          <div />
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Link
            to={`/assess?repo=${encodeURIComponent(url)}`}
            className="btn btn-outline btn-sm"
            style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
          >
            <Search size={12} />
            <span>Assess</span>
          </Link>

          {onToggleSave && (
            <button
              onClick={onToggleSave}
              className={`btn ${isSaved ? 'btn-secondary' : 'btn-outline'} btn-sm btn-icon`}
              title={isSaved ? 'Remove from saved' : 'Save repository'}
              style={{ padding: '0.35rem' }}
            >
              {isSaved ? (
                <BookmarkCheck size={13} color="var(--accent-amber)" />
              ) : (
                <Bookmark size={13} />
              )}
            </button>
          )}

          {onRemove && (
            <button
              onClick={onRemove}
              className="btn btn-danger btn-sm btn-icon"
              title="Remove from history"
              style={{ padding: '0.35rem' }}
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
