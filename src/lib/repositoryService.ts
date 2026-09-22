

import type {
  RepositoryHistoryItem,
  SavedRepositoryItem,
  AssessmentStatus,
  RealAssessmentResult,
} from '../types/index.ts'; 

function getUserHistoryKey(userId: string): string {
  return `inframaturity_user_${userId}_history`;
}

function getUserSavedKey(userId: string): string {
  return `inframaturity_user_${userId}_saved`;
}

function safeParse<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('Failed to persist to storage', err);
  }
}


/**
 * Retrieves repository search history for the authenticated user.
 * [BACKEND INTEGRATION POINT]: Replace with `await fetch('/api/user/history')`
 */
export async function fetchUserHistory(userId: string): Promise<RepositoryHistoryItem[]> {
  // Simulating async network contract
  return safeParse<RepositoryHistoryItem[]>(getUserHistoryKey(userId), []);
}

/**
 * Records or updates a repository search for the authenticated user.
 * [BACKEND INTEGRATION POINT]: Replace with `await fetch('/api/user/history', { method: 'POST', body: ... })`
 */
export async function recordUserSearch(
  userId: string,
  owner: string,
  repositoryName: string,
  repositoryUrl: string,
  status: AssessmentStatus = 'not_assessed',
  description?: string,
  language?: string,
  assessmentData?: RealAssessmentResult
): Promise<RepositoryHistoryItem> {
  const history = await fetchUserHistory(userId);
  const normalizedKey = `${owner.toLowerCase()}/${repositoryName.toLowerCase()}`;
  const now = new Date().toISOString();

  const existingIndex = history.findIndex(
    (item) => `${item.owner.toLowerCase()}/${item.repositoryName.toLowerCase()}` === normalizedKey
  );

  let updatedItem: RepositoryHistoryItem;

  if (existingIndex >= 0) {
    const existing = history[existingIndex];
    updatedItem = {
      ...existing,
      repositoryUrl,
      lastViewedAt: now,
      status: status !== 'not_assessed' ? status : existing.status,
      description: description || existing.description,
      language: language || existing.language,
      assessmentData: assessmentData || existing.assessmentData,
    };
    history.splice(existingIndex, 1);
    history.unshift(updatedItem);
  } else {
    updatedItem = {
      id: `hist_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      repositoryUrl,
      owner,
      repositoryName,
      searchedAt: now,
      lastViewedAt: now,
      status,
      description,
      language,
      assessmentData,
    };
    history.unshift(updatedItem);
  }

  safeSet(getUserHistoryKey(userId), history);
  return updatedItem;
}

/**
 * Deletes a single history item for the authenticated user.
 * [BACKEND INTEGRATION POINT]: Replace with `await fetch('/api/user/history/' + id, { method: 'DELETE' })`
 */
export async function deleteUserHistoryItem(userId: string, id: string): Promise<void> {
  const history = await fetchUserHistory(userId);
  const filtered = history.filter((item) => item.id !== id);
  safeSet(getUserHistoryKey(userId), filtered);
}

/**
 * Clears entire search history for the authenticated user.
 * [BACKEND INTEGRATION POINT]: Replace with `await fetch('/api/user/history', { method: 'DELETE' })`
 */
export async function clearUserHistory(userId: string): Promise<void> {
  safeSet(getUserHistoryKey(userId), []);
}

/**
 * Retrieves bookmarked repositories for the authenticated user.
 * [BACKEND INTEGRATION POINT]: Replace with `await fetch('/api/user/saved')`
 */
export async function fetchUserSavedRepositories(userId: string): Promise<SavedRepositoryItem[]> {
  return safeParse<SavedRepositoryItem[]>(getUserSavedKey(userId), []);
}

/**
 * Toggles bookmark status of a repository for the authenticated user.
 * [BACKEND INTEGRATION POINT]: Replace with `await fetch('/api/user/saved', { method: 'POST', body: ... })`
 */
export async function toggleUserSavedRepository(
  userId: string,
  repo: {
    owner: string;
    repositoryName: string;
    repositoryUrl: string;
    status?: AssessmentStatus;
    description?: string;
    language?: string;
  }
): Promise<boolean> {
  const saved = await fetchUserSavedRepositories(userId);
  const normalizedKey = `${repo.owner.toLowerCase()}/${repo.repositoryName.toLowerCase()}`;
  const index = saved.findIndex(
    (item) => `${item.owner.toLowerCase()}/${item.repositoryName.toLowerCase()}` === normalizedKey
  );

  if (index >= 0) {
    saved.splice(index, 1);
    safeSet(getUserSavedKey(userId), saved);
    return false; // Now unsaved
  } else {
    const newItem: SavedRepositoryItem = {
      id: `saved_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      owner: repo.owner,
      repositoryName: repo.repositoryName,
      repositoryUrl: repo.repositoryUrl,
      savedAt: new Date().toISOString(),
      status: repo.status || 'not_assessed',
      description: repo.description,
      language: repo.language,
    };
    saved.unshift(newItem);
    safeSet(getUserSavedKey(userId), saved);
    return true; // Now saved
  }
}

/**
 * Deletes a saved repository for the authenticated user.
 * [BACKEND INTEGRATION POINT]: Replace with `await fetch('/api/user/saved/' + id, { method: 'DELETE' })`
 */
export async function deleteUserSavedRepository(userId: string, id: string): Promise<void> {
  const saved = await fetchUserSavedRepositories(userId);
  const filtered = saved.filter((item) => item.id !== id);
  safeSet(getUserSavedKey(userId), filtered);
}

/**
 * Synchronous check for bookmark state (using cached local data)
 */
export function isUserRepoSaved(userId: string, owner: string, repositoryName: string): boolean {
  const saved = safeParse<SavedRepositoryItem[]>(getUserSavedKey(userId), []);
  const normalizedKey = `${owner.toLowerCase()}/${repositoryName.toLowerCase()}`;
  return saved.some(
    (item) => `${item.owner.toLowerCase()}/${item.repositoryName.toLowerCase()}` === normalizedKey
  );
}
