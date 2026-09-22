/* ==========================================================================
   InfraMaturity - History Route
   Redirects directly to the dedicated authenticated Profile Section.
   ========================================================================== */

import { Navigate } from 'react-router-dom';

export function HistoryPage() {
  return <Navigate to="/profile?tab=history" replace />;
}
