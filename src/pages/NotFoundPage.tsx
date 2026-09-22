/* ==========================================================================
   InfraMaturity - 404 Page Not Found
   ========================================================================== */

import { Link } from 'react-router-dom';
import { Layers, ArrowLeft, Search } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - var(--header-height) - 150px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-8) var(--space-4)',
        backgroundColor: 'var(--surface-soft)',
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '480px',
          textAlign: 'center',
          padding: 'var(--space-10) var(--space-6)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--surface-soft)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-amber-dark)',
            margin: '0 auto var(--space-4)',
          }}
        >
          <Layers size={24} />
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            fontWeight: 700,
            color: 'var(--accent-amber-dark)',
            marginBottom: 'var(--space-2)',
          }}
        >
          404 — ROUTE NOT FOUND
        </div>

        <h1 style={{ fontSize: 'var(--text-2xl)', color: 'var(--navy-950)', marginBottom: 'var(--space-3)' }}>
          Requested page does not exist
        </h1>

        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.5 }}>
          The path you navigated to is not part of the OpenInfra IQ platform. Verify the URL or return to the workspace.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
          <Link to="/" className="btn btn-outline">
            <ArrowLeft size={16} />
            <span>Return Home</span>
          </Link>
          <Link to="/assess" className="btn btn-primary">
            <Search size={16} />
            <span>Assess Repository</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
