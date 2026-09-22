/* ==========================================================================
   InfraMaturity - Alert & Notice Banner Component
   ========================================================================== */

import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export type AlertType = 'info' | 'warning' | 'error' | 'success';

interface AlertBannerProps {
  type?: AlertType;
  title?: string;
  children: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export function AlertBanner({
  type = 'info',
  title,
  children,
  onDismiss,
  className = '',
}: AlertBannerProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} className="alert-icon" />;
      case 'warning':
        return <AlertTriangle size={18} className="alert-icon" />;
      case 'error':
        return <AlertCircle size={18} className="alert-icon" />;
      case 'info':
      default:
        return <Info size={18} className="alert-icon" />;
    }
  };

  return (
    <div className={`alert alert-${type} ${className}`} role="alert">
      {getIcon()}
      <div style={{ flex: 1 }}>
        {title && (
          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{title}</div>
        )}
        <div>{children}</div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            padding: '2px',
            color: 'inherit',
            opacity: 0.7,
            cursor: 'pointer',
          }}
          aria-label="Dismiss notice"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
