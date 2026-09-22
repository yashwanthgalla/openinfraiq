/* ==========================================================================
   InfraMaturity - Landing Page
   Restrained, engineering-first aesthetic.
   Strict adherence to non-fabricated analytics: authentic capstone tone.
   ========================================================================== */

import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import {
  WORKFLOW_STEPS,
  WHY_SUSTAINABILITY_MATTERS,
  RESEARCH_METHODOLOGY,
  SUSTAINABILITY_DIMENSIONS,
} from '../data/projectData.ts';

export function LandingPage() {
  return (
    <div>
      {/* ----------------------------------------------------------------------
          1. Hero Section
         ---------------------------------------------------------------------- */}
      <section
        style={{
          position: 'relative',
          padding: 'var(--space-16) 0 var(--space-12)',
          backgroundColor: 'var(--navy-950)',
          color: 'var(--text-inverse)',
          overflow: 'hidden',
        }}
        className="bg-dark-grid-pattern"
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-12)',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Value Proposition */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-amber)',
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                <Compass size={14} />
                <span>Capstone Engineering Project</span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  color: 'var(--text-inverse)',
                  lineHeight: 1.15,
                  marginBottom: 'var(--space-4)',
                  letterSpacing: '-0.02em',
                }}
              >
                Assess infrastructure projects beyond popularity.
              </h1>

              <p
                style={{
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: 'var(--space-8)',
                  maxWidth: '540px',
                }}
              >
                Evaluate maintenance sustainability using repository activity, maintainer distribution, release history, and evidence-based project signals.
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <Link to="/assess" className="btn btn-primary btn-lg">
                  <Search size={18} />
                  <span>Assess a Repository</span>
                  <ArrowRight size={16} />
                </Link>

                <a href="#how-it-works" className="btn btn-outline-dark btn-lg">
                  <span>How It Works</span>
                </a>
              </div>
            </div>

            {/* Right Column: Abstract Infrastructure Workflow Visual */}
            <div>
              <div
                style={{
                  backgroundColor: 'var(--navy-900)',
                  border: '1px solid var(--navy-800)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-6)',
                  boxShadow: 'var(--shadow-dark)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 'var(--space-3)',
                    borderBottom: '1px solid var(--navy-800)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-amber)' }} />
                    <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-inverse)' }}>
                      METHODOLOGY ARCHITECTURE
                    </span>
                  </div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    Reference Model
                  </span>
                </div>

                {/* Workflow Sequence Diagram */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {/* Stage 1 */}
                  <div
                    style={{
                      padding: 'var(--space-3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--navy-800)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                        color: 'var(--accent-amber)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                      }}
                    >
                      01
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-inverse)' }}>
                        Public Repository
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Verifiable commit history, release tags & triage streams
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', color: 'var(--accent-amber)', fontSize: '0.8rem', lineHeight: 1 }}>
                    ↓
                  </div>

                  {/* Stage 2 */}
                  <div
                    style={{
                      padding: 'var(--space-3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--navy-800)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                        color: 'var(--accent-amber)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                      }}
                    >
                      02
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-inverse)' }}>
                        Repository Analytics
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Maintainer distribution & release cadence extraction
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', color: 'var(--accent-amber)', fontSize: '0.8rem', lineHeight: 1 }}>
                    ↓
                  </div>

                  {/* Stage 3 */}
                  <div
                    style={{
                      padding: 'var(--space-3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--navy-800)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                        color: 'var(--accent-amber)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                      }}
                    >
                      03
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-inverse)' }}>
                        Sustainability Indicators
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Multi-dimensional indicators independent of star popularity
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', color: 'var(--accent-amber)', fontSize: '0.8rem', lineHeight: 1 }}>
                    ↓
                  </div>

                  {/* Stage 4 */}
                  <div
                    style={{
                      padding: 'var(--space-3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--navy-800)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                        color: 'var(--accent-amber)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                      }}
                    >
                      04
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-inverse)' }}>
                        Maintenance Continuity
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Validated against historical stalled project baselines
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', color: 'var(--accent-amber)', fontSize: '0.8rem', lineHeight: 1 }}>
                    ↓
                  </div>

                  {/* Stage 5 */}
                  <div
                    style={{
                      padding: 'var(--space-3)',
                      backgroundColor: 'rgba(245, 158, 11, 0.1)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                    }}
                  >
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
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                      }}
                    >
                      05
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--accent-amber)' }}>
                        Adoption Decision Support
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-inverse)' }}>
                        Evidence-backed engineering confidence for infrastructure
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          2. Trust / Purpose Section (The Problem Statement)
         ---------------------------------------------------------------------- */}
      <section
        style={{
          padding: 'var(--space-12) 0',
          backgroundColor: 'var(--surface-primary)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--accent-amber-dark)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'block',
                marginBottom: 'var(--space-2)',
              }}
            >
              The Research Problem
            </span>
            <h2
              style={{
                fontSize: 'var(--text-3xl)',
                fontWeight: 700,
                color: 'var(--navy-950)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Popularity is not the same as maintenance sustainability.
            </h2>
            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}
            >
              {RESEARCH_METHODOLOGY.problemStatement}
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          3. Why Section: Why maintenance sustainability matters
         ---------------------------------------------------------------------- */}
      <section
        style={{
          padding: 'var(--space-16) 0',
          backgroundColor: 'var(--surface-soft)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--accent-amber-dark)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Core Principles
            </span>
            <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--navy-950)', marginTop: 'var(--space-1)' }}>
              Why maintenance sustainability matters
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', maxWidth: '640px' }}>
              Examining four structural indicators that distinguish lasting infrastructure foundations from transient popularity.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {WHY_SUSTAINABILITY_MATTERS.map((item) => (
              <div
                key={item.index}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: '3px solid var(--navy-900)',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 700,
                      color: 'var(--accent-amber-dark)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {item.index}
                  </div>
                  <h3
                    style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: 600,
                      color: 'var(--navy-950)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      lineHeight: 1.5,
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {item.summary}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    paddingTop: 'var(--space-3)',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          4. How It Works: 5-Step Visual Workflow
         ---------------------------------------------------------------------- */}
      <section
        id="how-it-works"
        style={{
          padding: 'var(--space-16) 0',
          backgroundColor: 'var(--surface-primary)',
          borderTop: '1px solid var(--border-light)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--accent-amber-dark)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              System Methodology
            </span>
            <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--navy-950)', marginTop: 'var(--space-1)' }}>
              How the assessment workflow operates
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', maxWidth: '640px' }}>
              A five-stage evaluation pipeline mapping raw repository evidence into structured adoption confidence.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {WORKFLOW_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="card"
                style={{
                  backgroundColor: 'var(--surface-soft)',
                  border: '1px solid var(--border-light)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      color: 'var(--accent-amber-dark)',
                    }}
                  >
                    {step.step}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    0{idx + 1}/05
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 600,
                    color: 'var(--navy-950)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {step.description}
                </p>

                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.4,
                    paddingTop: 'var(--space-2)',
                    borderTop: '1px dashed var(--border-light)',
                  }}
                >
                  {step.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Integration Status Notice */}
          <div
            style={{
              marginTop: 'var(--space-6)',
              padding: 'var(--space-4)',
              backgroundColor: 'var(--surface-soft)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <ShieldCheck size={20} color="var(--accent-amber-dark)" />
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                Analysis will appear in the assessment shell when repository analysis is connected.
              </span>
            </div>
            <Link to="/assess" className="btn btn-outline btn-sm">
              Launch Assessment Shell
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          5. Core Assessment Dimensions
         ---------------------------------------------------------------------- */}
      <section
        style={{
          padding: 'var(--space-16) 0',
          backgroundColor: 'var(--surface-soft)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--accent-amber-dark)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Analytical Scope
            </span>
            <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--navy-950)', marginTop: 'var(--space-1)' }}>
              Core assessment dimensions
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', maxWidth: '640px' }}>
              Independent parameters characterizing project continuity risk before infrastructure deployment.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {SUSTAINABILITY_DIMENSIONS.map((dim, idx) => (
              <div key={dim.id} className="card" style={{ height: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(245, 158, 11, 0.15)',
                      color: 'var(--accent-amber-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                    }}
                  >
                    0{idx + 1}
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    DIMENSION
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 600,
                    color: 'var(--navy-950)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {dim.name}
                </h3>

                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {dim.scope}
                </p>

                <div
                  style={{
                    marginTop: 'auto',
                    padding: 'var(--space-2) var(--space-3)',
                    backgroundColor: 'var(--surface-soft)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {dim.statusPlaceholder}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          6. Evidence & Reproducibility (Validation Section)
         ---------------------------------------------------------------------- */}
      <section
        style={{
          padding: 'var(--space-16) 0',
          backgroundColor: 'var(--navy-950)',
          color: 'var(--text-inverse)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-12)',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--accent-amber)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Validation & Evidence
              </span>
              <h2
                style={{
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 700,
                  color: 'var(--text-inverse)',
                  marginBottom: 'var(--space-4)',
                  lineHeight: 1.2,
                }}
              >
                Validated against infrastructure projects that later stalled.
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: 'var(--space-6)',
                }}
              >
                {RESEARCH_METHODOLOGY.validationPhilosophy}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {RESEARCH_METHODOLOGY.evidencePrinciples.map((principle) => (
                  <div key={principle.title} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-inverse)' }}>
                        {principle.title}
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                        {principle.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--navy-900)',
                border: '1px solid var(--navy-800)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
              }}
            >
              <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--text-inverse)', marginBottom: 'var(--space-4)' }}>
                System Scope & Safe Operation
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                OpenInfra IQ produces evidence-based characterizations to assist human review panels. The project does not assert automated guarantees or absolute maturity ratings.
              </p>
              <div
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--accent-amber)',
                  fontFamily: 'var(--font-mono)',
                  lineHeight: 1.5,
                }}
              >
                "Assessment results should be interpreted within the validated evidence and operating conditions."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          7. Call To Action
         ---------------------------------------------------------------------- */}
      <section
        style={{
          padding: 'var(--space-16) 0',
          backgroundColor: 'var(--surface-primary)',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '680px' }}>
          <h2
            style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 700,
              color: 'var(--navy-950)',
              marginBottom: 'var(--space-3)',
            }}
          >
            Ready to evaluate an infrastructure dependency?
          </h2>
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: 'var(--space-8)',
            }}
          >
            Enter a public repository to launch the assessment shell and track its maintenance trajectory.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
            <Link to="/assess" className="btn btn-primary btn-lg">
              <Search size={18} />
              <span>Assess a Repository</span>
            </Link>
            <Link to="/about" className="btn btn-outline btn-lg">
              <span>Read About Methodology</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
