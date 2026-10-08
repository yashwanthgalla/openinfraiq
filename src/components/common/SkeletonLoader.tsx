/* ==========================================================================
   InfraMaturity - Skeleton Loaders
   Engineering-grade skeleton states for cards, assessment shells, AI finder, and tables.
   ========================================================================== */

export function CardSkeleton() {
  return (
    <div className="card" aria-hidden="true">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div className="skeleton skeleton-title" style={{ width: '40%' }} />
        <div className="skeleton skeleton-pill" style={{ width: '80px', height: '22px' }} />
      </div>
      <div className="skeleton skeleton-text" style={{ width: '90%' }} />
      <div className="skeleton skeleton-text" style={{ width: '70%' }} />
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
        <div className="skeleton" style={{ width: '100px', height: '32px' }} />
        <div className="skeleton" style={{ width: '80px', height: '32px' }} />
      </div>
    </div>
  );
}

export function AssessmentSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }} aria-hidden="true">
      {/* Header Skeleton */}
      <div className="card" style={{ padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div className="skeleton skeleton-pill" style={{ width: '110px' }} />
              <div className="skeleton skeleton-pill" style={{ width: '80px' }} />
            </div>
            <div className="skeleton skeleton-title" style={{ width: '320px', height: '32px', marginBottom: '0.75rem' }} />
            <div className="skeleton skeleton-text" style={{ width: '85%' }} />
            <div className="skeleton skeleton-text" style={{ width: '60%' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div className="skeleton" style={{ width: '100px', height: '36px', borderRadius: 'var(--radius-md)' }} />
            <div className="skeleton" style={{ width: '120px', height: '36px', borderRadius: 'var(--radius-md)' }} />
          </div>
        </div>

        {/* Quick Meta Pills */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
          <div className="skeleton skeleton-pill" style={{ width: '90px' }} />
          <div className="skeleton skeleton-pill" style={{ width: '100px' }} />
          <div className="skeleton skeleton-pill" style={{ width: '80px' }} />
          <div className="skeleton skeleton-pill" style={{ width: '110px' }} />
        </div>
      </div>

      {/* 4 Score & Key Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card" style={{ padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div className="skeleton" style={{ width: '50%', height: '14px' }} />
              <div className="skeleton skeleton-circle" style={{ width: '28px', height: '28px' }} />
            </div>
            <div className="skeleton" style={{ width: '70px', height: '36px', marginBottom: '0.5rem' }} />
            <div className="skeleton skeleton-text" style={{ width: '80%' }} />
          </div>
        ))}
      </div>

      {/* Detailed Sections (Radar chart & 9-metrics grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-6)' }}>
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <div className="skeleton skeleton-title" style={{ width: '60%' }} />
          <div className="skeleton skeleton-text" style={{ width: '85%' }} />
          <div className="skeleton" style={{ width: '100%', height: '260px', borderRadius: 'var(--radius-lg)', marginTop: '1rem' }} />
        </div>
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <div className="skeleton skeleton-title" style={{ width: '60%' }} />
          <div className="skeleton skeleton-text" style={{ width: '85%' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginTop: '1rem' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ padding: '0.75rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
                <div className="skeleton" style={{ width: '40%', height: '12px', marginBottom: '0.4rem' }} />
                <div className="skeleton" style={{ width: '60%', height: '20px' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AIRequirementSkeleton() {
  return (
    <div
      className="card"
      style={{
        padding: 'var(--space-6)',
        backgroundColor: 'var(--surface-primary)',
        border: '1.5px solid var(--border-light)',
      }}
      aria-hidden="true"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <div className="skeleton skeleton-circle" style={{ width: '20px', height: '20px' }} />
            <div className="skeleton" style={{ width: '220px', height: '22px' }} />
          </div>
          <div className="skeleton skeleton-text" style={{ width: '300px' }} />
        </div>
        <div className="skeleton skeleton-pill" style={{ width: '140px', height: '28px' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: '1.5rem' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', backgroundColor: 'var(--surface-soft)' }}>
            <div className="skeleton" style={{ width: '50%', height: '12px', marginBottom: '0.5rem' }} />
            <div className="skeleton" style={{ width: '80%', height: '18px' }} />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {[70, 90, 85, 110, 65].map((w, idx) => (
          <div key={idx} className="skeleton skeleton-pill" style={{ width: `${w}px` }} />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
        <div className="skeleton" style={{ width: '100px', height: '36px', borderRadius: 'var(--radius-md)' }} />
        <div className="skeleton" style={{ width: '160px', height: '36px', borderRadius: 'var(--radius-md)' }} />
      </div>
    </div>
  );
}

export function AIMatchCardSkeleton() {
  return (
    <div
      className="card"
      style={{
        padding: 'var(--space-6)',
        backgroundColor: 'var(--surface-primary)',
        border: '1px solid var(--border-light)',
      }}
      aria-hidden="true"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div className="skeleton" style={{ width: '180px', height: '22px' }} />
            <div className="skeleton skeleton-pill" style={{ width: '85px', height: '20px' }} />
          </div>
          <div className="skeleton skeleton-text" style={{ width: '90%' }} />
          <div className="skeleton skeleton-text" style={{ width: '70%' }} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div className="skeleton" style={{ width: '90px', height: '38px', borderRadius: 'var(--radius-md)' }} />
          <div className="skeleton" style={{ width: '90px', height: '38px', borderRadius: 'var(--radius-md)' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
        <div className="skeleton skeleton-pill" style={{ width: '80px' }} />
        <div className="skeleton skeleton-pill" style={{ width: '95px' }} />
        <div className="skeleton skeleton-pill" style={{ width: '85px' }} />
        <div className="skeleton skeleton-pill" style={{ width: '75px' }} />
        <div className="skeleton" style={{ marginLeft: 'auto', width: '110px', height: '32px', borderRadius: 'var(--radius-md)' }} />
      </div>
    </div>
  );
}

export function AIRepositoriesSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }} aria-hidden="true">
      {/* Header bar skeleton */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-light)' }}>
        <div>
          <div className="skeleton" style={{ width: '240px', height: '20px', marginBottom: '0.35rem' }} />
          <div className="skeleton skeleton-text" style={{ width: '320px', height: '12px', margin: 0 }} />
        </div>
        <div className="skeleton" style={{ width: '130px', height: '28px', borderRadius: 'var(--radius-sm)' }} />
      </div>

      {/* Match Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {Array.from({ length: count }).map((_, idx) => (
          <AIMatchCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="table-container" aria-hidden="true">
      <table className="table">
        <thead>
          <tr>
            <th><div className="skeleton" style={{ width: '120px', height: '14px' }} /></th>
            <th><div className="skeleton" style={{ width: '180px', height: '14px' }} /></th>
            <th><div className="skeleton" style={{ width: '90px', height: '14px' }} /></th>
            <th><div className="skeleton" style={{ width: '70px', height: '14px' }} /></th>
            <th><div className="skeleton" style={{ width: '60px', height: '14px' }} /></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              <td><div className="skeleton" style={{ width: '140px', height: '18px' }} /></td>
              <td><div className="skeleton" style={{ width: '220px', height: '16px' }} /></td>
              <td><div className="skeleton" style={{ width: '100px', height: '14px' }} /></td>
              <td><div className="skeleton skeleton-pill" style={{ width: '75px', height: '20px' }} /></td>
              <td><div className="skeleton" style={{ width: '50px', height: '28px' }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
