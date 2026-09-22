/* ==========================================================================
   InfraMaturity - Forgot Password Page
   Authentic password reset dispatch state.
   ========================================================================== */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Mail,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.tsx';

export function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid registered email address.');
      return;
    }

    setIsLoading(true);
    await resetPassword(email);
    setIsLoading(false);
    setIsSubmitted(true);
  };

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
          maxWidth: '440px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-light)',
          padding: 'var(--space-8)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              textDecoration: 'none',
              marginBottom: 'var(--space-3)',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--navy-950)',
                color: 'var(--accent-amber)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Layers size={20} strokeWidth={2.4} />
            </div>
            <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--navy-950)' }}>
              OpenInfra IQ
            </span>
          </Link>
          <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--navy-950)' }}>
            Reset password
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
            Enter your registered email address to receive password recovery instructions.
          </p>
        </div>

        {isSubmitted ? (
          <div>
            <div
              style={{
                backgroundColor: 'var(--color-success-bg)',
                border: '1px solid var(--color-success-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                textAlign: 'center',
                marginBottom: 'var(--space-6)',
              }}
            >
              <CheckCircle2
                size={36}
                color="var(--color-success)"
                style={{ margin: '0 auto var(--space-2)' }}
              />
              <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-success)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                Instructions Dispatched
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', lineHeight: 1.5 }}>
                If an account exists for <strong style={{ fontFamily: 'var(--font-mono)' }}>{email}</strong>, password reset instructions have been dispatched.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link to="/login" className="btn btn-outline" style={{ width: '100%' }}>
                <ArrowLeft size={16} />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="alert alert-error" style={{ marginBottom: 'var(--space-4)' }}>
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="reset-email">
                Registered Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="engineer@domain.com"
                className="form-input"
                required
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: 'var(--space-4)' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Dispatching...</span>
              ) : (
                <>
                  <Mail size={16} />
                  <span>Send Recovery Instructions</span>
                </>
              )}
            </button>

            <div style={{ textAlign: 'center' }}>
              <Link
                to="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                }}
              >
                <ArrowLeft size={14} />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
