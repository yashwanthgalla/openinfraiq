/* ==========================================================================
   OpenInfraIQ - Repository Store & Persistence Service
   Seamlessly integrates with Spring Boot backend endpoints while maintaining
   instant local caching for smooth UI transitions and offline resilience.
   ========================================================================== */

import type {
  RepositoryHistoryItem,
  SavedRepositoryItem,
  AssessmentStatus,
  RealAssessmentResult,
} from '../types/index.ts';
import {
  fetchBackendHistory,
  recordBackendSearch,
  deleteBackendHistoryItem,
  clearBackendHistory,
  fetchBackendSavedRepositories,
  toggleBackendSavedRepository,
  deleteBackendSavedRepository,
} from './api.ts';

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
 * Retrieves repository search history for the authenticated user from the backend.
 */
export async function fetchUserHistory(userId: string): Promise<RepositoryHistoryItem[]> {
  try {
    const backendHistory = await fetchBackendHistory();
    if (backendHistory && backendHistory.length > 0) {
      safeSet(getUserHistoryKey(userId), backendHistory);
      return backendHistory;
    }
  } catch (err) {
    console.warn('Backend history fetch failed, returning cached history:', err);
  }
  return safeParse<RepositoryHistoryItem[]>(getUserHistoryKey(userId), []);
}

/**
 * Records a repository search on the backend and updates local workspace cache.
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
  const localHistory = safeParse<RepositoryHistoryItem[]>(getUserHistoryKey(userId), []);
  const normalizedKey = `${owner.toLowerCase()}/${repositoryName.toLowerCase()}`;
  const now = new Date().toISOString();

  let localItem: RepositoryHistoryItem;
  const existingIndex = localHistory.findIndex(
    (item) => `${item.owner.toLowerCase()}/${item.repositoryName.toLowerCase()}` === normalizedKey
  );

  if (existingIndex >= 0) {
    const existing = localHistory[existingIndex];
    localItem = {
      ...existing,
      repositoryUrl,
      lastViewedAt: now,
      status: status !== 'not_assessed' ? status : existing.status,
      description: description || existing.description,
      language: language || existing.language,
      assessmentData: assessmentData || existing.assessmentData,
    };
    localHistory.splice(existingIndex, 1);
    localHistory.unshift(localItem);
  } else {
    localItem = {
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
    localHistory.unshift(localItem);
  }
  safeSet(getUserHistoryKey(userId), localHistory);

  // Sync with backend asynchronously
  try {
    const backendItem = await recordBackendSearch(
      owner,
      repositoryName,
      repositoryUrl,
      status,
      description,
      language,
      assessmentData
    );
    if (backendItem) {
      return backendItem;
    }
  } catch (err) {
    console.warn('Backend search recording error, saved locally:', err);
  }

  return localItem;
}

/**
 * Deletes a single history item on the backend and updates local cache.
 */
export async function deleteUserHistoryItem(userId: string, id: string): Promise<void> {
  const history = safeParse<RepositoryHistoryItem[]>(getUserHistoryKey(userId), []);
  const filtered = history.filter((item) => item.id !== id);
  safeSet(getUserHistoryKey(userId), filtered);

  try {
    await deleteBackendHistoryItem(id);
  } catch (err) {
    console.warn('Failed to delete history item on backend:', err);
  }
}

/**
 * Clears entire search history on the backend and updates local cache.
 */
export async function clearUserHistory(userId: string): Promise<void> {
  safeSet(getUserHistoryKey(userId), []);

  try {
    await clearBackendHistory();
  } catch (err) {
    console.warn('Failed to clear search history on backend:', err);
  }
}

/**
 * Retrieves bookmarked repositories from the backend with local cache fallback.
 */
export async function fetchUserSavedRepositories(userId: string): Promise<SavedRepositoryItem[]> {
  try {
    const backendSaved = await fetchBackendSavedRepositories();
    if (backendSaved && backendSaved.length > 0) {
      safeSet(getUserSavedKey(userId), backendSaved);
      return backendSaved;
    }
  } catch (err) {
    console.warn('Backend saved repos fetch failed, returning cached saved repos:', err);
  }
  return safeParse<SavedRepositoryItem[]>(getUserSavedKey(userId), []);
}

/**
 * Toggles bookmark status of a repository on the backend.
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
  const saved = safeParse<SavedRepositoryItem[]>(getUserSavedKey(userId), []);
  const normalizedKey = `${repo.owner.toLowerCase()}/${repo.repositoryName.toLowerCase()}`;
  const index = saved.findIndex(
    (item) => `${item.owner.toLowerCase()}/${item.repositoryName.toLowerCase()}` === normalizedKey
  );

  let newSavedState = false;
  if (index >= 0) {
    saved.splice(index, 1);
    safeSet(getUserSavedKey(userId), saved);
    newSavedState = false;
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
    newSavedState = true;
  }

  // Sync with backend
  try {
    return await toggleBackendSavedRepository(repo);
  } catch (err) {
    console.warn('Backend toggle bookmark failed, using local state:', err);
    return newSavedState;
  }
}

/**
 * Deletes a saved repository from the backend and updates cache.
 */
export async function deleteUserSavedRepository(userId: string, id: string): Promise<void> {
  const saved = safeParse<SavedRepositoryItem[]>(getUserSavedKey(userId), []);
  const filtered = saved.filter((item) => item.id !== id);
  safeSet(getUserSavedKey(userId), filtered);

  try {
    await deleteBackendSavedRepository(id);
  } catch (err) {
    console.warn('Backend delete saved repository failed:', err);
  }
}

/**
 * Checks bookmark state using cache and backend check.
 */
export function isUserRepoSaved(userId: string, owner: string, repositoryName: string): boolean {
  const saved = safeParse<SavedRepositoryItem[]>(getUserSavedKey(userId), []);
  const normalizedKey = `${owner.toLowerCase()}/${repositoryName.toLowerCase()}`;
  return saved.some(
    (item) => `${item.owner.toLowerCase()}/${item.repositoryName.toLowerCase()}` === normalizedKey
  );
}
