
import type {
  User,
  UserProfileUpdate,
  RepositoryHistoryItem,
  SavedRepositoryItem,
  AssessmentStatus,
} from '../types/index.ts';

const STORAGE_KEYS = {
  USER_SESSION: 'inframaturity_user_session',
  USER_PROFILE: 'inframaturity_user_profile',
  SEARCH_HISTORY: 'inframaturity_search_history',
  SAVED_REPOS: 'inframaturity_saved_repositories',
} as const;

// Default demo user profile for frontend demonstration
export const DEFAULT_DEMO_USER: User = {
  id: 'usr_demo_01',
  name: 'Alex Chen',
  email: 'alex.chen@cloudinfrastructure.org',
  username: 'alexchen',
  avatar: '',
  organization: 'Infrastructure Architecture Group',
  role: 'Software Architect',
  createdAt: '2025-01-15T09:00:00Z',
};

// Safe JSON parser helper
function safeJsonParse<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeJsonSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Storage operation failed', error);
  }
}

// --------------------------------------------------------------------------
// User & Auth Storage
// --------------------------------------------------------------------------

export function getStoredUser(): User | null {
  return safeJsonParse<User | null>(STORAGE_KEYS.USER_PROFILE, null);
}

export function saveStoredUser(user: User): void {
  safeJsonSet(STORAGE_KEYS.USER_PROFILE, user);
}

export function updateStoredUserProfile(updates: UserProfileUpdate): User | null {
  const current = getStoredUser();
  if (!current) return null;
  const updated: User = {
    ...current,
    name: updates.name.trim() || current.name,
    email: updates.email.trim() || current.email,
    username: updates.username?.trim() || current.username,
    organization: updates.organization?.trim(),
  };
  saveStoredUser(updated);
  return updated;
}

export function isSessionActive(): boolean {
  return localStorage.getItem(STORAGE_KEYS.USER_SESSION) === 'true';
}

export function setSessionActive(active: boolean): void {
  if (active) {
    localStorage.setItem(STORAGE_KEYS.USER_SESSION, 'true');
    if (!getStoredUser()) {
      saveStoredUser(DEFAULT_DEMO_USER);
    }
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
  }
}

// --------------------------------------------------------------------------
// Repository Search History Abstraction
// --------------------------------------------------------------------------

export function getRepositoryHistory(): RepositoryHistoryItem[] {
  return safeJsonParse<RepositoryHistoryItem[]>(STORAGE_KEYS.SEARCH_HISTORY, []);
}

export function recordRepositorySearch(
  owner: string,
  repositoryName: string,
  repositoryUrl: string,
  status: AssessmentStatus = 'not_assessed',
  description?: string,
  language?: string
): RepositoryHistoryItem {
  const history = getRepositoryHistory();
  const normalizedKey = `${owner.toLowerCase()}/${repositoryName.toLowerCase()}`;
  const now = new Date().toISOString();

  // Deduplicate: check if this repository was searched before
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
    };
    // Move to top of history
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
    };
    history.unshift(updatedItem);
  }

  safeJsonSet(STORAGE_KEYS.SEARCH_HISTORY, history);
  return updatedItem;
}

export function removeHistoryItem(id: string): void {
  const history = getRepositoryHistory();
  const filtered = history.filter((item) => item.id !== id);
  safeJsonSet(STORAGE_KEYS.SEARCH_HISTORY, filtered);
}

export function clearRepositoryHistory(): void {
  safeJsonSet(STORAGE_KEYS.SEARCH_HISTORY, []);
}

// --------------------------------------------------------------------------
// Saved / Bookmarked Repositories Abstraction
// --------------------------------------------------------------------------

export function getSavedRepositories(): SavedRepositoryItem[] {
  return safeJsonParse<SavedRepositoryItem[]>(STORAGE_KEYS.SAVED_REPOS, []);
}

export function isRepositorySaved(owner: string, repositoryName: string): boolean {
  const saved = getSavedRepositories();
  const normalizedKey = `${owner.toLowerCase()}/${repositoryName.toLowerCase()}`;
  return saved.some(
    (item) => `${item.owner.toLowerCase()}/${item.repositoryName.toLowerCase()}` === normalizedKey
  );
}

export function toggleSaveRepository(repo: {
  owner: string;
  repositoryName: string;
  repositoryUrl: string;
  status?: AssessmentStatus;
  description?: string;
  language?: string;
}): boolean {
  const saved = getSavedRepositories();
  const normalizedKey = `${repo.owner.toLowerCase()}/${repo.repositoryName.toLowerCase()}`;
  const index = saved.findIndex(
    (item) => `${item.owner.toLowerCase()}/${item.repositoryName.toLowerCase()}` === normalizedKey
  );

  if (index >= 0) {
    // Remove from saved
    saved.splice(index, 1);
    safeJsonSet(STORAGE_KEYS.SAVED_REPOS, saved);
    return false; // Now unsaved
  } else {
    // Add to saved
    const newItem: SavedRepositoryItem = {
      id: `saved_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      owner: repo.owner,
      repositoryName: repo.repositoryName,
      repositoryUrl: repo.repositoryUrl,
      savedAt: new Date().toISOString(),
      lastAssessmentDate: undefined,
      status: repo.status || 'not_assessed',
      description: repo.description,
      language: repo.language,
    };
    saved.unshift(newItem);
    safeJsonSet(STORAGE_KEYS.SAVED_REPOS, saved);
    return true; // Now saved
  }
}

export function removeSavedRepository(id: string): void {
  const saved = getSavedRepositories();
  const filtered = saved.filter((item) => item.id !== id);
  safeJsonSet(STORAGE_KEYS.SAVED_REPOS, filtered);
}
