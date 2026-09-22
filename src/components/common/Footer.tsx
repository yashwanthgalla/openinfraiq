/* ==========================================================================
   InfraMaturity - Capstone Application Footer
   Factual, professional footer without fabricated certifications or partner links.
   ========================================================================== */

import { Link } from 'react-router-dom';
import { Layers, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer
      style={{
        marginTop: 'auto',
        backgroundColor: 'var(--navy-950)',
        color: 'var(--text-inverse)',
        borderTop: '1px solid var(--navy-800)',
        padding: 'var(--space-12) 0 var(--space-8)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-8)',
            marginBottom: 'var(--space-8)',
          }}
        >
          {/* Brand & Project Identity */}
          <div style={{ maxWidth: '380px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--accent-amber)',
                  color: 'var(--navy-950)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Layers size={18} strokeWidth={2.4} />
              </div>
              <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-inverse)' }}>
                OpenInfra IQ
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 'var(--space-3)' }}>
              Emerging Infrastructure Project Maturity Assessment for Adoption Decisions.
              Evaluating maintenance sustainability using repository activity, maintainer distribution, and evidence-based project signals.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-amber)',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
              }}
            >
              <ShieldCheck size={13} />
              Capstone Engineering Project
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <div
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--text-inverse)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 'var(--space-3)',
              }}
            >
              Platform Navigation
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <li>
                <Link to="/" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/assess" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  Assess Repository
                </Link>
              </li>
              <li>
                <Link to="/profile?tab=saved" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  Saved Repositories
                </Link>
              </li>
              <li>
                <Link to="/profile?tab=history" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  Repository Search History
                </Link>
              </li>
              <li>
                <Link to="/app" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  Workspace Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Research & Methodology */}
          <div>
            <div
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--text-inverse)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 'var(--space-3)',
              }}
            >
              Research Methodology
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <li>
                <Link to="/about" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  Methodology & Objectives
                </Link>
              </li>
              <li>
                <Link to="/about#dimensions" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  Assessment Dimensions
                </Link>
              </li>
              <li>
                <Link to="/about#validation" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  Stalled Project Validation
                </Link>
              </li>
              <li>
                <Link to="/about#evidence" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  Evidence & Reproducibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Scope & Boundaries */}
          <div>
            <div
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--text-inverse)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 'var(--space-3)',
              }}
            >
              System Scope
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Assessment results should be interpreted within the validated evidence and operating conditions.
              Independent validation is required prior to production adoption decisions.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--navy-800)',
            paddingTop: 'var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} OpenInfra IQ — University Capstone Project
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <Link to="/about" style={{ color: 'inherit' }}>
              Project Information
            </Link>
            <Link to="/profile" style={{ color: 'inherit' }}>
              User Workspace
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
