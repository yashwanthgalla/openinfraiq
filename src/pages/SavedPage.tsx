/* ==========================================================================
   InfraMaturity - Saved Repositories Route
   Redirects directly to the dedicated authenticated Profile Section.
   ========================================================================== */

import { Navigate } from 'react-router-dom';

export function SavedPage() {
  return <Navigate to="/profile?tab=saved" replace />;
}
