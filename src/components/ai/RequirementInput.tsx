import { Sparkles, Terminal, ArrowRight } from 'lucide-react';

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-2)' }}>
        <Sparkles size={20} color="var(--accent-amber-dark)" />
        <h2 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--navy-950)' }}>
          AI Project Finder
        </h2>
      </div>
      <p style={{ margin: '0 0 var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
        Describe what kind of project or repository you need in natural language. Whether you need <strong>Cloud Infrastructure</strong>, <strong>DevOps</strong>, <strong>Frontend</strong>, <strong>Backend APIs</strong>, <strong>Machine Learning / AI</strong>, <strong>Full-Stack</strong>, or <strong>Data Pipelines</strong>, Google Gemini will extract structured specifications tailored to your exact needs.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ position: 'relative', marginBottom: 'var(--space-4)' }}>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={isLoading}
            placeholder="e.g., I need a modern React 19 web application with TailwindCSS and Vite, or an AWS infrastructure project using Terraform and Kubernetes, or a Python PyTorch project for LLM fine-tuning..."
            rows={4}
            style={{
              width: '100%',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-light)',
              backgroundColor: 'var(--surface-soft)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-sm)',
              fontFamily: 'inherit',
              lineHeight: 1.6,
              resize: 'vertical',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.15s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent-amber)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-light)')}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-5)',
          }}
        >
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
            <span style={{ fontWeight: 600 }}>Tip:</span> Specify your target domain, desired languages/frameworks (React, Spring Boot, PyTorch, Terraform), and key features.
          </div>

          <button
            type="submit"
            disabled={!value.trim() || isLoading}
            className="btn btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.4rem',
              fontWeight: 700,
            }}
          >
            <Sparkles size={16} />
            <span>{isLoading ? 'Analyzing Requirements...' : 'Analyze Requirements'}</span>
            {!isLoading && <ArrowRight size={15} />}
          </button>
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
