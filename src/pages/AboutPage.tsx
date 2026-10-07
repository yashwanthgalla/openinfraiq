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
  Database,
  Server,
  Code2,
} from 'lucide-react';
import {
  SUSTAINABILITY_DIMENSIONS,
  RESEARCH_METHODOLOGY,
  WORKFLOW_STEPS,
  AI_AMBASSADOR_GEMINI,
} from '../data/projectData.ts';
import {
  GoogleGeminiLogo,
  GoogleGLogo,
} from '../components/common/GoogleAILogo.tsx';

export function AboutPage() {
  return (
    <div style={{ padding: 'var(--space-8) 0 var(--space-20)', backgroundColor: 'var(--surface-soft)' }}>
      <div className="container">
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
            <span>Capstone Research & Engineering Documentation</span>
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
            OpenInfraIQ investigates how software engineers, platform architects, and DevOps leads can evaluate open infrastructure projects based on empirical maintenance sustainability rather than relying exclusively on deceptive popularity signals.
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
            Maintenance sustainability independent of vanity popularity
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Modern cloud infrastructure stacks integrate critical open-source subsystems for storage, container orchestration, network routing, and telemetry. Adoption decisions frequently lean on aggregate stars, forks, or recent commit spurts. However, historical precedent proves that widespread popularity does not inherently ensure that maintainers will remain available to patch critical operational bugs, migrate protocols, or resolve zero-day vulnerabilities.
          </p>
        </div>

        {/* ==================================================================
            GOOGLE GEMINI: COGNITIVE INTELLIGENCE ENGINE
           ================================================================== */}
        <div
          className="card"
          style={{
            marginBottom: 'var(--space-8)',
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid rgba(217, 119, 6, 0.4)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 243, 199, 0.25) 100%)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(66, 133, 244, 0.08)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(66, 133, 244, 0.25)' }}>
              <GoogleGLogo size={16} />
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 800, color: '#1E3A8A', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Google Gemini
              </span>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--navy-900)', backgroundColor: 'var(--surface-soft)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <GoogleGeminiLogo size={15} />
              <span>Model: <strong>Google 3.5 Flash</strong> (<code style={{ color: '#2563EB', fontWeight: 700 }}>{AI_AMBASSADOR_GEMINI.primaryModel}</code>)</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(66, 133, 244, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(66, 133, 244, 0.15)',
                flexShrink: 0,
              }}
            >
              <GoogleGeminiLogo size={36} />
            </div>

            <div style={{ flex: 1, minWidth: '260px' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--navy-950)', margin: '0 0 var(--space-2)' }}>
                {AI_AMBASSADOR_GEMINI.brandName} &mdash; Our Qualitative Intelligence Partner
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                {AI_AMBASSADOR_GEMINI.description} By pairing deterministic GitHub repository metrics with Google Gemini 3.5 Flash multimodal reasoning, OpenInfraIQ eliminates superficial star hype and equips decision-makers with production-ready architectural assessments.
              </p>
            </div>
          </div>

          {/* 4 Architectural Pillars of Gemini Integration */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            {AI_AMBASSADOR_GEMINI.highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 'var(--space-2)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-amber)' }} />
                  <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--navy-950)', margin: 0 }}>
                    {h.title}
                  </h3>
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {h.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Engine Capabilities Bar */}
          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'rgba(15, 23, 42, 0.03)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
            }}
          >
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--navy-950)', marginBottom: 'var(--space-2)', fontFamily: 'var(--font-mono)' }}>
              CORE ENGINE CHARACTERISTICS & REASONING PIPELINE:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-2)' }}>
              {AI_AMBASSADOR_GEMINI.capabilities.map((cap, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={13} color="var(--accent-amber-dark)" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>
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
              <li>How does Google Gemini qualitative architectural assessment enhance automated quantitative metrics without introducing unverified assumptions?</li>
            </ul>
          </div>
        </div>

        {/* System Methodology & Workflow */}
        <div className="card" style={{ marginBottom: 'var(--space-8)' }} id="workflow">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--navy-950)', margin: 0 }}>
              System Methodology & Working Workflow
            </h2>
            <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--accent-amber-dark)', fontWeight: 700 }}>
              5-STAGE EVALUATION PIPELINE
            </span>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
            The OpenInfraIQ architecture systematically transforms raw public repository evidence into defensible adoption decisions across five structured stages:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {WORKFLOW_STEPS.map((step) => (
              <div
                key={step.number}
                style={{
                  display: 'flex',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--surface-soft)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 800,
                    color: 'var(--accent-amber-dark)',
                    minWidth: '70px',
                    backgroundColor: 'rgba(217, 119, 6, 0.1)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    textAlign: 'center',
                  }}
                >
                  {step.number}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--navy-950)', margin: 0 }}>
                      {step.title}
                    </h3>
                    <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                      {step.step}
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', lineHeight: 1.5, margin: '0 0 var(--space-2)' }}>
                    {step.description}
                  </p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, borderTop: '1px dashed var(--border-light)', paddingTop: 'var(--space-2)' }}>
                    <strong>Implementation Evidence:</strong> {step.detail}
                  </div>
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
            Analytical dimensions defined in the capstone research specification:
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

        {/* Full-Stack Architecture Overview */}
        <div className="card" style={{ marginBottom: 'var(--space-10)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--navy-950)', marginBottom: 'var(--space-2)' }}>
            Full-Stack System Architecture & Production Deployment
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            OpenInfraIQ is deployed as an enterprise-grade full-stack platform with distinct separation of concerns:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--surface-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem', color: 'var(--navy-950)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                <Code2 size={16} color="var(--accent-amber-dark)" />
                <span>Frontend Layer</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>
                React 19, TypeScript, Vite, responsive edge-to-edge canvas with zero wasted side margins.
              </p>
            </div>

            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--surface-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem', color: 'var(--navy-950)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                <Server size={16} color="var(--accent-amber-dark)" />
                <span>Backend Core</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>
                Spring Boot 3, Java 21, Spring Security, RESTful endpoints, HikariCP connection pool.
              </p>
            </div>

            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--surface-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem', color: 'var(--navy-950)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                <GoogleGeminiLogo size={16} />
                <span>Cognitive AI</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>
                Google Gemini 3.5 Flash (gemini-3.5-flash) REST v1beta with automated caching, secret redaction, and schema validation.
              </p>
            </div>

            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--surface-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem', color: 'var(--navy-950)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                <Database size={16} color="var(--accent-amber-dark)" />
                <span>Persistence Tier</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>
                MySQL relational database storing users, analysis runs, search history, and AI requirements.
              </p>
            </div>
          </div>

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
            "Assessments are grounded in verifiable repository evidence, computed deterministically, and cross-analyzed with Google Gemini."
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
