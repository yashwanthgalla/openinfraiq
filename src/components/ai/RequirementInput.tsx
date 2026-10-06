import { Terminal, ArrowRight } from 'lucide-react';
import { GoogleGeminiLogo } from '../common/GoogleAILogo';

interface RequirementInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const EXAMPLE_PROMPTS = [
  'AWS infrastructure project using Terraform, Docker, and Kubernetes with CI/CD',
  'Modern React 19 web application with TypeScript, TailwindCSS, and Vite',
  'Python deep learning project using PyTorch for NLP with HuggingFace transformers',
  'Spring Boot microservices architecture with Kafka, Redis, and PostgreSQL',
  'Kubernetes DevOps cluster with Helm charts, ArgoCD GitOps, and Prometheus monitoring',
  'Full-stack Next.js web application with Prisma, TailwindCSS, and authentication',
  'Apache Kafka real-time stream processing pipeline with Apache Spark',
];

export function RequirementInput({
  value,
  onChange,
  onSubmit,
  isLoading,
}: RequirementInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || isLoading) return;
    onSubmit();
  };

  return (
    <div
      className="card"
      style={{
        padding: 'var(--space-6)',
        borderTop: '4px solid var(--accent-amber)',
        boxShadow: 'var(--shadow-md)',
        backgroundColor: 'var(--surface-primary)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: 'var(--space-2)' }}>
        <GoogleGeminiLogo size={22} />
        <h2 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--navy-950)' }}>
          AI Project Finder
        </h2>
        <span
          style={{
            fontSize: '0.6875rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: '#1a73e8',
            backgroundColor: '#e8f0fe',
            padding: '0.15rem 0.5rem',
            borderRadius: '9999px',
            border: '1px solid #cce0ff',
          }}
        >
          Google 3.5 Flash
        </span>
      </div>
      <p style={{ margin: '0 0 var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
        Describe what kind of project or repository you need in natural language. Whether you need <strong>Cloud Infrastructure</strong>, <strong>DevOps</strong>, <strong>Frontend</strong>, <strong>Backend APIs</strong>, <strong>Machine Learning / AI</strong>, <strong>Full-Stack</strong>, or <strong>Data Pipelines</strong>, Google 3.5 Flash will extract structured specifications tailored to your exact needs.
      </p>

      <form onSubmit={handleSubmit} style={{ marginBottom: 'var(--space-5)' }}>
        <div className="input-group-pill">
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <GoogleGeminiLogo size={18} />
          </div>

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={isLoading}
            placeholder="Describe what kind of project you need (e.g., React 19 with Vite, Kubernetes AWS cluster, PyTorch NLP)..."
          />

          <button
            type="submit"
            disabled={!value.trim() || isLoading}
            className="btn btn-primary"
            style={{
              borderRadius: '9999px',
              padding: '0.55rem 1.35rem',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              flexShrink: 0,
            }}
          >
            {isLoading ? (
              <>
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    border: '2px solid var(--navy-950)',
                    borderTopColor: 'transparent',
                  }}
                  className="spin-slow"
                />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Analyze</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-2)', padding: '0 0.5rem' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
            <span style={{ fontWeight: 600 }}>Tip:</span> Press Enter or click Analyze to extract structured project specs.
          </div>
        </div>
      </form>

      {/* Example Prompt Chips */}
      <div>
        <div
          style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <Terminal size={12} />
          <span>Quick Example Specifications</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {EXAMPLE_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => onChange(prompt)}
              style={{
                fontSize: 'var(--text-xs)',
                backgroundColor: 'var(--surface-soft)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-full)',
                padding: '0.35rem 0.75rem',
                color: 'var(--navy-900)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface-primary)';
                e.currentTarget.style.borderColor = 'var(--accent-amber)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface-soft)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
