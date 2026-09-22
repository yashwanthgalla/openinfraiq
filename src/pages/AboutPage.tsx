/* ==========================================================================
   InfraMaturity - About Page & Research Methodology
   Rigorous academic and industry-oriented documentation of project context.
   ========================================================================== */

import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Compass,
  ArrowRight,
  Search,
  CheckCircle2,
} from 'lucide-react';
import {
  SUSTAINABILITY_DIMENSIONS,
  RESEARCH_METHODOLOGY,
  WORKFLOW_STEPS,
} from '../data/projectData.ts';

export function AboutPage() {
  return (
    <div style={{ padding: 'var(--space-8) 0 var(--space-20)', backgroundColor: 'var(--surface-soft)' }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-amber-dark)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 'var(--space-2)',
            }}
          >
            <Compass size={14} />
            <span>Capstone Research Documentation</span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--navy-950)',
              lineHeight: 1.2,
              marginBottom: 'var(--space-4)',
            }}
          >
            Emerging Infrastructure Project Maturity Assessment for Adoption Decisions
          </h1>
          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '820px',
            }}
          >
            OpenInfra IQ investigates how software developers and platform maintainers can evaluate infrastructure projects based on maintenance sustainability rather than relying exclusively on popularity signals.
          </p>
        </div>

        {/* Project Focus Banner */}
        <div
          className="card"
          style={{
            borderLeft: '4px solid var(--accent-amber)',
            marginBottom: 'var(--space-8)',
            backgroundColor: 'var(--surface-primary)',
          }}
        >
          <span
            style={{
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-amber-dark)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'block',
              marginBottom: 'var(--space-1)',
            }}
          >
            Project Focus
          </span>
          <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--navy-950)', marginBottom: 'var(--space-2)' }}>
            Maintenance sustainability independent of popularity
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Modern cloud infrastructure stacks integrate critical open-source subsystems for storage, container orchestration, network routing, and telemetry. Adoption decisions frequently lean on aggregate stars, forks, or recent commit spurts. However, historical precedent proves that widespread popularity does not inherently ensure that maintainers will remain available to patch critical operational bugs, migrate protocols, or resolve zero-day vulnerabilities.
          </p>
        </div>

        {/* Research Problem Statement */}
        <div className="card" style={{ marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--navy-950)', marginBottom: 'var(--space-3)' }}>
            The Research Problem
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
            {RESEARCH_METHODOLOGY.problemStatement}
          </p>
          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'var(--surface-soft)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
            }}
          >
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--navy-950)', marginBottom: 'var(--space-2)' }}>
              Core Investigation Questions:
            </h3>
            <ul style={{ listStylePosition: 'inside', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <li>How does maintainer responsibility concentration (bus factor topology) correlate with multi-year release stability?</li>
              <li>Can historical cadence consistency and patch interval predictability identify maintenance stagnation earlier than public star metrics?</li>
              <li>How can adoption decision frameworks account for organizational stewardship diversity across cloud infrastructure projects?</li>
            </ul>
          </div>
        </div>

        {/* System Workflow */}
        <div className="card" style={{ marginBottom: 'var(--space-8)' }} id="workflow">
          <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--navy-950)', marginBottom: 'var(--space-3)' }}>
            System Methodology & Workflow
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
            The system maps public repository evidence across five structured phases:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {WORKFLOW_STEPS.map((step) => (
              <div
                key={step.number}
                style={{
                  display: 'flex',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-3)',
                  backgroundColor: 'var(--surface-soft)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 700,
                    color: 'var(--accent-amber-dark)',
                    minWidth: '48px',
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--navy-950)', marginBottom: '0.2rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {step.description} {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Assessment Dimensions */}
        <div className="card" style={{ marginBottom: 'var(--space-8)' }} id="dimensions">
          <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--navy-950)', marginBottom: 'var(--space-3)' }}>
            Core Assessment Dimensions
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
            Analytical dimensions defined in the capstone specification:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            {SUSTAINABILITY_DIMENSIONS.map((dim) => (
              <div
                key={dim.id}
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--surface-soft)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                }}
              >
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--navy-950)', marginBottom: 'var(--space-1)' }}>
                  {dim.name}
                </h3>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-amber-dark)', fontFamily: 'var(--font-mono)', marginBottom: 'var(--space-2)' }}>
                  {dim.shortDescription}
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {dim.scope}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Validation Philosophy: Stalled Projects */}
        <div
          className="card"
          style={{
            marginBottom: 'var(--space-8)',
            backgroundColor: 'var(--navy-950)',
            color: 'var(--text-inverse)',
            borderColor: 'var(--navy-800)',
          }}
          id="validation"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            <ShieldCheck size={20} color="var(--accent-amber)" />
            <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--text-inverse)' }}>
              Validation Philosophy: Historical Stalled Projects
            </h2>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
            {RESEARCH_METHODOLOGY.validationPhilosophy}
          </p>
          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--navy-800)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
            }}
          >
            By evaluating projects at historical checkpoints prior to abandonment or severe maintainer burnout, the framework establishes whether identifiable sustainability signals existed months before activity ground to a halt.
          </div>
        </div>

        {/* Evidence & Reproducibility Principles */}
        <div className="card" style={{ marginBottom: 'var(--space-8)' }} id="evidence">
          <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--navy-950)', marginBottom: 'var(--space-3)' }}>
            Evidence Provenance & Reproducibility
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
            Every assessment dimension adheres to strict reproducibility constraints:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
            {RESEARCH_METHODOLOGY.evidencePrinciples.map((principle) => (
              <div
                key={principle.title}
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--surface-soft)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 'var(--space-1)' }}>
                  <CheckCircle2 size={16} color="var(--accent-amber-dark)" />
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--navy-950)' }}>
                    {principle.title}
                  </span>
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scope & Safe Operation */}
        <div className="card" style={{ marginBottom: 'var(--space-10)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--navy-950)', marginBottom: 'var(--space-2)' }}>
            Scope & Operating Boundaries
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-3)' }}>
            The current stage constitutes the frontend application interface. Analytical engines, repository extractors, and predictive models will integrate into this structured shell during subsequent project phases.
          </p>
          <div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              backgroundColor: 'var(--surface-soft)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              borderLeft: '3px solid var(--accent-amber-dark)',
            }}
          >
            "Assessment results should be interpreted within the validated evidence and operating conditions."
          </div>
        </div>

        {/* Assess CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/assess" className="btn btn-primary btn-lg">
            <Search size={18} />
            <span>Launch Repository Assessment</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
