/* ==========================================================================
   InfraMaturity - Skeleton Loaders
   Engineering-grade skeleton states for cards, assessment shells, and tables.
   ========================================================================== */

export function CardSkeleton() {
  return (
    <div className="card" aria-hidden="true">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div className="skeleton skeleton-title" style={{ width: '40%' }} />
        <div className="skeleton" style={{ width: '80px', height: '22px', borderRadius: '9999px' }} />
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
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <div className="skeleton" style={{ width: '120px', height: '16px', marginBottom: '0.5rem' }} />
            <div className="skeleton skeleton-title" style={{ width: '280px', height: '28px' }} />
          </div>
          <div className="skeleton" style={{ width: '110px', height: '28px', borderRadius: '9999px' }} />
        </div>
        <div className="skeleton skeleton-text" style={{ width: '80%' }} />
      </div>

      {/* Grid of Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
        <div className="card">
          <div className="skeleton skeleton-title" style={{ width: '50%' }} />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-text" style={{ width: '75%' }} />
          <div className="skeleton skeleton-rect" style={{ height: '90px', marginTop: '1rem' }} />
        </div>
        <div className="card">
          <div className="skeleton skeleton-title" style={{ width: '50%' }} />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-text" style={{ width: '75%' }} />
          <div className="skeleton skeleton-rect" style={{ height: '90px', marginTop: '1rem' }} />
        </div>
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
              <td><div className="skeleton" style={{ width: '75px', height: '20px', borderRadius: '9999px' }} /></td>
              <td><div className="skeleton" style={{ width: '50px', height: '28px' }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
