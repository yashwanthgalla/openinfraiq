/* ==========================================================================
   OpenInfraIQ - 404 Page Not Found Route
   Supports both platform route 404 and repository not found / invalid address 404
   ========================================================================== */

import { useLocation, useSearchParams } from 'react-router-dom';
import { NotFoundView } from '../components/common/NotFoundView.tsx';

export function NotFoundPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Extract contextual state or URL query parameters
  const repoParam = searchParams.get('repo') || searchParams.get('query') || searchParams.get('url') || location.state?.repo || '';
  const typeParam = (searchParams.get('type') || location.state?.type) as 'repo' | 'invalid_url' | 'route' | undefined;
  const errorParam = searchParams.get('error') || searchParams.get('message') || location.state?.errorMessage;

  let resolvedType: 'repo' | 'invalid_url' | 'route' = 'route';
  let resolvedQuery = location.pathname;

  if (typeParam) {
    resolvedType = typeParam;
    resolvedQuery = repoParam || location.pathname;
  } else if (repoParam) {
    resolvedType = 'repo';
    resolvedQuery = repoParam;
  } else if (location.pathname === '/404') {
    resolvedType = 'route';
    resolvedQuery = 'Page Not Found';
  }

  return (
    <NotFoundView
      type={resolvedType}
      query={resolvedQuery}
      errorMessage={errorParam}
    />
  );
}
