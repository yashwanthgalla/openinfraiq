import React, { useId } from 'react';

interface GoogleAILogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'gemini' | 'google' | 'lockup';
}

/**
 * Authentic Google Gemini Sparkle Star Logo
 */
export function GoogleGeminiLogo({
  size = 24,
  className = '',
  style = {},
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const uniqueId = useId().replace(/:/g, '');
  const gradientId = `gemini-sparkle-gradient-${uniqueId}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      aria-label="Google Gemini"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#1B73E8" />
          <stop offset="35%" stopColor="#8E24AA" />
          <stop offset="70%" stopColor="#E52592" />
          <stop offset="100%" stopColor="#FA7B17" />
        </linearGradient>
      </defs>
      <path
        d="M12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

/**
 * Authentic Official Google "G" 4-Color Logo
 */
export function GoogleGLogo({
  size = 20,
  className = '',
  style = {},
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      aria-label="Google"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

/**
 * Authentic Google AI / Google Gemini Lockup Badge
 */
export function GoogleAIBadge({
  size = 20,
  showModel = true,
  className = '',
  style = {},
}: {
  size?: number;
  showModel?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.25rem 0.65rem',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid rgba(66, 133, 244, 0.25)',
        borderRadius: '9999px',
        boxShadow: '0 2px 8px rgba(66, 133, 244, 0.08)',
        ...style,
      }}
    >
      <GoogleGeminiLogo size={size} />
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#1F2937',
          letterSpacing: '-0.01em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem',
        }}
      >
        <span>Google Gemini</span>
        {showModel && (
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 800,
              color: '#1D4ED8',
              backgroundColor: '#EFF6FF',
              padding: '0.1rem 0.4rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            3.5 Flash
          </span>
        )}
      </span>
    </div>
  );
}

export function GoogleAILogo({
  size = 24,
  variant = 'gemini',
  className = '',
  style = {},
}: GoogleAILogoProps) {
  if (variant === 'google') {
    return <GoogleGLogo size={size} className={className} style={style} />;
  }
  if (variant === 'lockup') {
    return <GoogleAIBadge size={size} className={className} style={style} />;
  }
  return <GoogleGeminiLogo size={size} className={className} style={style} />;
}
