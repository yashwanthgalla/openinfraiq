/* ==========================================================================
   InfraMaturity - Repository Input Component
   Captures public repository address with validation and quick presets.
   ========================================================================== */

import { useState } from 'react';
import { Search, AlertCircle, Sparkles } from 'lucide-react';
import { parseRepositoryUrl } from '../../lib/validators.ts';

interface RepositoryInputProps {
  onAnalyze: (owner: string, repo: string, normalizedUrl: string) => void;
  isProcessing?: boolean;
}

const EXAMPLE_REPOSITORIES = [
  { label: 'kubernetes/kubernetes', url: 'https://github.com/kubernetes/kubernetes' },
  { label: 'etcd-io/etcd', url: 'https://github.com/etcd-io/etcd' },
  { label: 'prometheus/prometheus', url: 'https://github.com/prometheus/prometheus' },
  { label: 'envoyproxy/envoy', url: 'https://github.com/envoyproxy/envoy' },
];

export function RepositoryInput({ onAnalyze, isProcessing = false }: RepositoryInputProps) {
  const [inputUrl, setInputUrl] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const parsed = parseRepositoryUrl(inputUrl);
    if (!parsed.isValid) {
      setValidationError(parsed.errorMessage || 'Invalid repository URL.');
      return;
    }

    onAnalyze(parsed.owner, parsed.name, parsed.normalizedUrl);
  };

  const handleSelectPreset = (url: string) => {
    setInputUrl(url);
    setValidationError(null);
    const parsed = parseRepositoryUrl(url);
    if (parsed.isValid) {
      onAnalyze(parsed.owner, parsed.name, parsed.normalizedUrl);
    }
  };

  return (
    <div
      className="card"
      style={{
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border-light)',
        padding: 'var(--space-6)',
      }}
    >
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="repo-url-input"
          className="form-label"
          style={{ marginBottom: 'var(--space-2)' }}
        >
          <span>Repository Address</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontWeight: 400 }}>
            Public cloud infrastructure repositories
          </span>
        </label>

        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
            <div
              style={{
                position: 'absolute',
                left: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              <Search size={18} />
            </div>
            <input
              id="repo-url-input"
              type="text"
              value={inputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="https://github.com/owner/repository or owner/repo"
              className={`form-input ${validationError ? 'has-error' : ''}`}
              style={{
                paddingLeft: '2.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
              }}
              disabled={isProcessing}
              autoComplete="off"
              spellCheck="false"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={isProcessing || !inputUrl.trim()}
            style={{ minWidth: '160px' }}
          >
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <Search size={16} />
                Start Assessment
              </>
            )}
          </button>
        </div>

        {validationError && (
          <div className="form-error" style={{ marginTop: 'var(--space-2)' }}>
            <AlertCircle size={14} />
            <span>{validationError}</span>
          </div>
        )}
      </form>

      {/* Preset Quick Selectors */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          marginTop: 'var(--space-4)',
          paddingTop: 'var(--space-4)',
          borderTop: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            fontWeight: 500,
          }}
        >
          <Sparkles size={13} color="var(--accent-amber-dark)" />
          <span>Reference examples:</span>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {EXAMPLE_REPOSITORIES.map((ex) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => handleSelectPreset(ex.url)}
              disabled={isProcessing}
              className="btn btn-outline btn-sm font-mono"
              style={{
                fontSize: '0.75rem',
                padding: '0.2rem 0.5rem',
                borderColor: 'var(--border-light)',
                backgroundColor: 'var(--surface-soft)',
              }}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
