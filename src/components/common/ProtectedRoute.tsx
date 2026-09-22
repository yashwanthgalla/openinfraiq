/* ==========================================================================
   InfraMaturity - Protected Route Guard
   ========================================================================== */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.tsx';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            className="skeleton"
            style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '0 auto 1rem' }}
          />
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Verifying session state...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
