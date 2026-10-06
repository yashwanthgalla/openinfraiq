/* ==========================================================================
   OpenInfraIQ - Centralized Backend API Client
   Manages all communication with the Spring Boot backend on Railway / localhost.
   Automatically attaches verified Firebase ID Tokens in Authorization headers.
   ========================================================================== */

import { auth } from '../firebase.ts';
import type {
  RealAssessmentResult,
  RepositoryHistoryItem,
  SavedRepositoryItem,
  AssessmentStatus,
  User,
  UserProfileUpdate,
  AIInsights,
  AIRequirementResponse,
  AIRepositoryMatch,
  SavedAISearchItem,
} from '../types/index.ts';

export function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_URL?.trim();

  // If explicitly configured with a remote URL (e.g. Railway / Cloud deployment)
  if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
    return envUrl.replace(/\/+$/, '');
  }

  // When running in local browser, use relative path so Vite reverse proxy (/api -> localhost:8080)
  // handles all requests seamlessly without cross-origin friction
  if (typeof window !== 'undefined' && window.location) {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return '';
    }
    // Dynamic host adaptation: If loaded over LAN IP or network hostname
    const protocol = window.location.protocol;
    return `${protocol}//${host}:8080`;
  }

  return (envUrl || 'http://localhost:8080').replace(/\/+$/, '');
}

export interface ApiResponseWrapper<T> {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
  fieldErrors?: Record<string, string>;
}

/**
 * Retrieves the cryptographically signed Firebase ID token for the active user.
 */
export async function getAuthHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  // 1. Try active Firebase SDK session
  if (auth && auth.currentUser) {
    try {
      const token = await auth.currentUser.getIdToken(false);
      headers.Authorization = `Bearer ${token}`;
      headers['X-Firebase-Uid'] = auth.currentUser.uid;
      if (auth.currentUser.email) headers['X-User-Email'] = auth.currentUser.email;
      if (auth.currentUser.displayName) headers['X-User-Name'] = auth.currentUser.displayName;
    } catch (err) {
      console.warn('Failed to obtain Firebase ID token:', err);
    }
  }

  // 2. Fallback to active localStorage session if auth.currentUser is not yet restored or in offline mode
  if (!headers['X-Firebase-Uid']) {
    try {
      const sessionRaw = localStorage.getItem('inframaturity_active_session');
      if (sessionRaw) {
        const sessionUser = JSON.parse(sessionRaw);
        const uid = sessionUser.uid || sessionUser.id;
        if (uid) {
          headers['X-Firebase-Uid'] = uid;
          if (sessionUser.email) headers['X-User-Email'] = sessionUser.email;
          if (sessionUser.name) headers['X-User-Name'] = sessionUser.name;
          if (sessionUser.username) headers['X-User-Username'] = sessionUser.username;
          if (!headers.Authorization) {
            headers.Authorization = `Bearer session_${uid}`;
          }
        }
      }
    } catch {
      // ignore
    }
  }

  return headers;
}

/**
 * Generic API request executor with standardized error extraction.
 */
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = await getAuthHeaders();
  const url = `${getApiBaseUrl()}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  let json: ApiResponseWrapper<T> | null = null;
  try {
    json = (await response.json()) as ApiResponseWrapper<T>;
  } catch {
    // Non-JSON response
  }

  if (!response.ok) {
    const errorMsg =
      json?.message ||
      json?.error ||
      `Request failed with status ${response.status} (${response.statusText})`;
    throw new Error(errorMsg);
  }

  if (json && json.data !== undefined) {
    return json.data;
  }

  return json as unknown as T;
}

// --------------------------------------------------------------------------
// Repository Analysis API (Moved from Frontend into Spring Boot)
// --------------------------------------------------------------------------

/**
 * Triggers backend GitHub fetching, 9 sustainability dimensions analysis,
 * ML continuity prediction, and automatic MySQL persistence.
 */
export async function analyzeRepositoryOnBackend(
  owner: string,
  name: string
): Promise<RealAssessmentResult> {
  return request<RealAssessmentResult>('/api/repositories/analyze', {
    method: 'POST',
    body: JSON.stringify({ owner, name }),
  });
}

// --------------------------------------------------------------------------
// User History API (Backed by MySQL)
// --------------------------------------------------------------------------

export async function fetchBackendHistory(): Promise<RepositoryHistoryItem[]> {
  try {
    return await request<RepositoryHistoryItem[]>('/api/history', { method: 'GET' });
  } catch (err) {
    console.warn('Backend history retrieval failed, falling back to cache:', err);
    return [];
  }
}

export async function recordBackendSearch(
  owner: string,
  repositoryName: string,
  repositoryUrl: string,
  status: AssessmentStatus = 'not_assessed',
  description?: string,
  language?: string,
  assessmentData?: RealAssessmentResult
): Promise<RepositoryHistoryItem> {
  try {
    return await request<RepositoryHistoryItem>('/api/history', {
      method: 'POST',
      body: JSON.stringify({
        owner,
        repositoryName,
        repositoryUrl,
        status,
        description,
        language,
        assessmentData,
      }),
    });
  } catch (err) {
    console.warn('Failed to record search on backend:', err);
    throw err;
  }
}

export async function deleteBackendHistoryItem(id: string): Promise<void> {
  await request<void>(`/api/history/${id}`, { method: 'DELETE' });
}

export async function clearBackendHistory(): Promise<void> {
  await request<void>('/api/history', { method: 'DELETE' });
}

// --------------------------------------------------------------------------
// Saved / Bookmarked Repositories API (Backed by MySQL)
// --------------------------------------------------------------------------

export async function fetchBackendSavedRepositories(): Promise<SavedRepositoryItem[]> {
  try {
    return await request<SavedRepositoryItem[]>('/api/saved', { method: 'GET' });
  } catch (err) {
    console.warn('Backend saved repos retrieval failed:', err);
    return [];
  }
}

export async function toggleBackendSavedRepository(repo: {
  owner: string;
  repositoryName: string;
  repositoryUrl: string;
  status?: AssessmentStatus;
  description?: string;
  language?: string;
}): Promise<boolean> {
  const result = await request<{ saved: boolean }>('/api/saved/toggle', {
    method: 'POST',
    body: JSON.stringify({
      owner: repo.owner,
      repositoryName: repo.repositoryName,
      name: repo.repositoryName,
      repositoryUrl: repo.repositoryUrl,
      url: repo.repositoryUrl,
      status: repo.status,
      description: repo.description,
      language: repo.language,
    }),
  });
  return Boolean(result.saved);
}

export async function syncBackendUser(userData: {
  uid: string;
  email?: string;
  name?: string;
  fullname?: string;
  username?: string;
  password?: string;
  organization?: string;
  role?: string;
}): Promise<User> {
  return request<User>('/api/auth/sync', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function deleteBackendSavedRepository(id: string): Promise<void> {
  await request<void>(`/api/saved/${id}`, { method: 'DELETE' });
}

export async function checkBackendIsSaved(owner: string, name: string): Promise<boolean> {
  try {
    const result = await request<{ saved: boolean }>(
      `/api/saved/check?owner=${encodeURIComponent(owner)}&name=${encodeURIComponent(name)}`,
      { method: 'GET' }
    );
    return Boolean(result.saved);
  } catch {
    return false;
  }
}

// --------------------------------------------------------------------------
// User Profile API
// --------------------------------------------------------------------------

export async function fetchBackendUserProfile(): Promise<User> {
  return request<User>('/api/users/me', { method: 'GET' });
}

export async function updateBackendUserProfile(updates: UserProfileUpdate): Promise<User> {
  return request<User>('/api/users/me', {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export const updateUserProfile = updateBackendUserProfile;
export const fetchUserProfile = fetchBackendUserProfile;

// --------------------------------------------------------------------------
// Google Gemini AI Intelligence API
// --------------------------------------------------------------------------

export async function analyzeAiRequirements(description: string): Promise<AIRequirementResponse> {
  return request<AIRequirementResponse>('/api/ai/requirements/analyze', {
    method: 'POST',
    body: JSON.stringify({ description }),
  });
}

export async function searchAiRepositories(
  requirements: AIRequirementResponse,
  limit: number = 6
): Promise<AIRepositoryMatch[]> {
  return request<AIRepositoryMatch[]>(`/api/ai/requirements/search?limit=${limit}`, {
    method: 'POST',
    body: JSON.stringify(requirements),
  });
}

export async function fetchAiRepositoryInsights(repositoryId: string | number): Promise<AIInsights> {
  return request<AIInsights>(`/api/ai/repository/${repositoryId}/analyze`, {
    method: 'POST',
  });
}

export async function fetchSavedAiSearches(): Promise<SavedAISearchItem[]> {
  try {
    return await request<SavedAISearchItem[]>('/api/ai/searches', { method: 'GET' });
  } catch (err) {
    console.warn('Failed to fetch saved AI searches:', err);
    return [];
  }
}

export async function saveAiSearch(searchData: {
  title?: string;
  description: string;
  category?: string;
  structuredRequirements?: unknown;
}): Promise<{ id: number; title: string }> {
  return request<{ id: number; title: string }>('/api/ai/searches', {
    method: 'POST',
    body: JSON.stringify(searchData),
  });
}

export async function deleteSavedAiSearch(id: number | string): Promise<void> {
  await request<void>(`/api/ai/searches/${id}`, { method: 'DELETE' });
}
