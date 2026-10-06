/* ==========================================================================
   OpenInfraIQ - Reusable 404 Not Found & Diagnostic View
   Telemetry-inspired visual error recovery experience
   ========================================================================== */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  Terminal,
  Copy,
  Check,
  AlertTriangle,
  GitBranch,
  Lock,
  Globe,
  Archive,
  Compass,
  RefreshCw,
  Home,
  LayoutDashboard,
} from 'lucide-react';
import { parseRepositoryUrl } from '../../lib/validators.ts';

export interface NotFoundViewProps {
  type?: 'repo' | 'invalid_url' | 'route';
  query?: string;
  errorMessage?: string;
  onRetry?: (owner: string, name: string, normalizedUrl: string) => void;
  onClear?: () => void;
}

const VERIFIED_PRESETS = [
  { label: 'kubernetes/kubernetes', desc: 'Container Orchestration' },
  { label: 'prometheus/prometheus', desc: 'Monitoring & Alerting' },
  { label: 'envoyproxy/envoy', desc: 'Cloud-Native Proxy' },
  { label: 'etcd-io/etcd', desc: 'Distributed Store' },
  { label: 'open-telemetry/opentelemetry-java', desc: 'Observability' },
];

export function NotFoundView({
  type = 'repo',
  query = '',
  errorMessage,
  onRetry,
  onClear,
}: NotFoundViewProps) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const displayQuery = query.trim();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInputError(null);
    const trimmed = searchInput.trim();
    if (!trimmed) {
      setInputError('Please enter a repository address or shorthand identifier.');
      return;
    }

    const parsed = parseRepositoryUrl(trimmed);
    if (!parsed.isValid) {
      setInputError(parsed.errorMessage || 'Invalid repository format. Use owner/repo or GitHub URL.');
      return;
    }

    if (onRetry) {
      onRetry(parsed.owner, parsed.name, parsed.normalizedUrl);
    } else {
      navigate(`/assess?repo=${encodeURIComponent(parsed.normalizedUrl)}`);
    }
  };

  const handleSelectPreset = (presetName: string) => {
    setInputError(null);
    setSearchInput(presetName);
    const parsed = parseRepositoryUrl(presetName);
    if (parsed.isValid) {
      if (onRetry) {
        onRetry(parsed.owner, parsed.name, parsed.normalizedUrl);
      } else {
        navigate(`/assess?repo=${encodeURIComponent(parsed.normalizedUrl)}`);
      }
    }
  };

  const handleCopyTelemetry = () => {
    const timestamp = new Date().toISOString();
    const probeLog = `[OpenInfraIQ Telemetry Diagnostic]
Timestamp: ${timestamp}
Type: ${type.toUpperCase()}
Attempted Target: ${displayQuery || 'Unknown'}
API Endpoint: https://api.github.com/repos/${displayQuery || 'n/a'}
Status: HTTP 404 Not Found
Message: ${errorMessage || 'Repository resource unresolvable or non-existent'}`;

    navigator.clipboard.writeText(probeLog).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const isRepoError = type === 'repo' || type === 'invalid_url';

  return (
    <div className="notfound-wrapper">
      <div className="notfound-container">
        {/* Hero Section */}
        <div className="notfound-hero">
          <div className="notfound-badge">
            <span className="notfound-badge-dot" />
            <span>
              {type === 'invalid_url'
                ? 'HTTP 400 • MALFORMED REPOSITORY URL'
                : type === 'repo'
                ? 'HTTP 404 • REPOSITORY UNRESOLVABLE'
                : 'HTTP 404 • ROUTE NOT FOUND'}
            </span>
          </div>

          <div className="notfound-code-container">
            <span className="notfound-glitch-number">404</span>
            <div className="notfound-radar" title="Telemetry node probe failed to find target">
              <div className="notfound-radar-crosshair" />
              <div className="notfound-radar-crosshair-v" />
              <div className="notfound-radar-sweep" />
              <div className="notfound-radar-blip" />
            </div>
          </div>

          <h1 className="notfound-title">
            {type === 'invalid_url'
              ? 'Invalid Repository Address'
              : type === 'repo'
              ? 'Repository Not Found on GitHub'
              : 'Requested Route Does Not Exist'}
          </h1>

          <p className="notfound-subtitle">
            {type === 'invalid_url' ? (
              <>
                The repository string provided does not match expected GitHub address patterns.
                {displayQuery && (
                  <div>
                    <span className="notfound-query-chip">
                      <Globe size={13} /> {displayQuery}
                    </span>
                  </div>
                )}
              </>
            ) : type === 'repo' ? (
              <>
                We queried the GitHub public API for the specified repository, but the upstream host returned zero matches.
                {displayQuery && (
                  <div>
                    <span className="notfound-query-chip">
                      <GitBranch size={13} /> {displayQuery}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <>
                The path you navigated to is not part of OpenInfra IQ. Verify your URL or search for an infrastructure repository below.
                {displayQuery && (
                  <div>
                    <span className="notfound-query-chip">
                      <Compass size={13} /> {displayQuery}
                    </span>
                  </div>
                )}
              </>
            )}
          </p>
        </div>

        {/* Live Telemetry Console Log */}
        <div className="notfound-terminal">
          <div className="notfound-terminal-header">
            <div className="notfound-terminal-dots">
              <div className="notfound-terminal-dot red" />
              <div className="notfound-terminal-dot yellow" />
              <div className="notfound-terminal-dot green" />
            </div>
            <div className="notfound-terminal-title">
              <Terminal size={12} />
              <span>telemetry-probe-diagnostic.log</span>
            </div>
            <button
              onClick={handleCopyTelemetry}
              className="btn-ghost"
              style={{
                color: copied ? '#10B981' : '#94A3B8',
                fontSize: '0.7rem',
                padding: '0.2rem 0.5rem',
                gap: '0.3rem',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
              }}
              title="Copy telemetry error trace"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy Log'}</span>
            </button>
          </div>
          <div className="notfound-terminal-body">
            <div className="notfound-term-line">
              <span className="notfound-term-prefix">[SYSTEM]</span>
              <span className="notfound-term-info">
                Initiating upstream probe to GitHub API v3
              </span>
            </div>
            <div className="notfound-term-line">
              <span className="notfound-term-prefix">[TARGET]</span>
              <span className="notfound-term-highlight">
                {displayQuery || 'unspecified/target'}
              </span>
            </div>
            <div className="notfound-term-line">
              <span className="notfound-term-prefix">[RESULT]</span>
              <span className="notfound-term-err">
                {type === 'invalid_url'
                  ? 'ERR_PARSER_REJECT: Input syntax violates GitHub namespace standards'
                  : 'ERR_HTTP_404: Upstream response 404 (Not Found)'}
              </span>
            </div>
            <div className="notfound-term-line">
              <span className="notfound-term-prefix">[DETAIL]</span>
              <span className="notfound-term-warn">
                {errorMessage ||
                  (type === 'invalid_url'
                    ? 'Expected format: https://github.com/:owner/:repo or shorthand :owner/:repo'
                    : 'Repository does not exist, was renamed, or requires private authorization')}
              </span>
            </div>
            <div className="notfound-term-line">
              <span className="notfound-term-prefix">[ACTION]</span>
              <span className="notfound-term-muted">
                Engine awaiting user correction or reference selection
              </span>
            </div>
          </div>
        </div>

        {/* Interactive In-Page Search & Recovery Card */}
        <div className="notfound-recovery-card">
          <form onSubmit={handleSearchSubmit}>
            <div className="notfound-recovery-label">
              <span>
                {isRepoError ? 'Try Another Repository' : 'Assess Any Public Repository'}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                Owner/Repository or full GitHub URL
              </span>
            </div>

            <div className="notfound-search-bar">
              <div className="notfound-search-input-wrap">
                <div className="notfound-search-icon">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    if (inputError) setInputError(null);
                  }}
                  placeholder="e.g. kubernetes/kubernetes or https://github.com/..."
                  className="notfound-search-input"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>

              <button type="submit" className="notfound-search-btn">
                <Search size={15} />
                <span>Assess Repository</span>
              </button>
            </div>

            {inputError && (
              <div
                style={{
                  color: '#EF4444',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginTop: '0.5rem',
                }}
              >
                <AlertTriangle size={13} />
                <span>{inputError}</span>
              </div>
            )}
          </form>

          {/* Preset verified buttons */}
          <div className="notfound-presets">
            <span className="notfound-presets-label">
              <Sparkles size={13} color="var(--accent-amber)" />
              <span>Verified infrastructure benchmarks:</span>
            </span>
            {VERIFIED_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleSelectPreset(preset.label)}
                className="notfound-preset-pill"
                title={`Run assessment for ${preset.label} (${preset.desc})`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Root Cause Diagnostics Matrix */}
        {isRepoError && (
          <div className="notfound-reasons-grid">
            <div className="notfound-reason-card">
              <div className="notfound-reason-icon-wrap">
                <GitBranch size={18} />
              </div>
              <h3 className="notfound-reason-title">Typo in Repository or Owner</h3>
              <p className="notfound-reason-desc">
                GitHub repositories strictly require both the owner namespace and project name separated by a slash.
              </p>
              <div className="notfound-reason-example">
                ✓ kubernetes/kubernetes
                <br />
                ✗ kubernetes (missing repo)
              </div>
            </div>

            <div className="notfound-reason-card">
              <div className="notfound-reason-icon-wrap">
                <Lock size={18} />
              </div>
              <h3 className="notfound-reason-title">Private or Restricted Access</h3>
              <p className="notfound-reason-desc">
                OpenInfra IQ queries public endpoints. If the repository belongs to a private organization, GitHub responds with HTTP 404 to avoid disclosing existence.
              </p>
              <div className="notfound-reason-example">
                Configure Personal Access Token in Assess settings to query authenticated repos.
              </div>
            </div>

            <div className="notfound-reason-card">
              <div className="notfound-reason-icon-wrap">
                <Globe size={18} />
              </div>
              <h3 className="notfound-reason-title">Deep Sub-path in URL</h3>
              <p className="notfound-reason-desc">
                Do not include branch names, commit hashes, or subfolders. OpenInfra IQ requires the top-level repository root.
              </p>
              <div className="notfound-reason-example">
                ✓ github.com/owner/repo
                <br />
                ✗ github.com/owner/repo/tree/main
              </div>
            </div>

            <div className="notfound-reason-card">
              <div className="notfound-reason-icon-wrap">
                <Archive size={18} />
              </div>
              <h3 className="notfound-reason-title">Deleted or Transferred</h3>
              <p className="notfound-reason-desc">
                The repository may have been decommissioned, merged, or transferred to an open-source umbrella foundation (e.g. CNCF, Apache, Linux Foundation).
              </p>
              <div className="notfound-reason-example">
                Verify upstream location on GitHub directly.
              </div>
            </div>
          </div>
        )}

        {/* Global Action Navigation Links */}
        <div className="notfound-actions">
          {onClear && (
            <button onClick={onClear} className="btn btn-outline-dark">
              <RefreshCw size={15} />
              <span>Reset Search Form</span>
            </button>
          )}

          <Link to="/assess" className="btn btn-primary">
            <Search size={15} />
            <span>Assess Hub</span>
          </Link>

          <Link to="/app" className="btn btn-outline-dark">
            <LayoutDashboard size={15} />
            <span>Dashboard</span>
          </Link>

          <Link to="/" className="btn btn-outline-dark">
            <Home size={15} />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
