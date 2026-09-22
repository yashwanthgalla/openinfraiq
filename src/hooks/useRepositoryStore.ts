
import { useState, useEffect, useCallback } from 'react';
import type {
  RepositoryHistoryItem,
  SavedRepositoryItem,
  AssessmentStatus,
  RealAssessmentResult,
} from '../types/index.ts';
import {
  fetchUserHistory,
  recordUserSearch,
  deleteUserHistoryItem,
  clearUserHistory,
  fetchUserSavedRepositories,
  toggleUserSavedRepository,
  deleteUserSavedRepository,
  isUserRepoSaved,
} from '../lib/repositoryService.ts';
import { useAuth } from './useAuth.tsx';

const SYNC_EVENT = 'inframaturity_repository_sync';

export function useRepositoryStore() {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id || 'guest_workspace';

  const [history, setHistory] = useState<RepositoryHistoryItem[]>([]);
  const [savedRepos, setSavedRepos] = useState<SavedRepositoryItem[]>([]);

  const refresh = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setHistory([]);
      setSavedRepos([]);
      return;
    }
    const userHistory = await fetchUserHistory(user.id);
    const userSaved = await fetchUserSavedRepositories(user.id);
    setHistory(userHistory);
    setSavedRepos(userSaved);
  }, [isAuthenticated, user]);

  useEffect(() => {
    refresh();

    const handleSync = () => {
      refresh();
    };

    window.addEventListener(SYNC_EVENT, handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener(SYNC_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [refresh]);

  const notifyChange = () => {
    window.dispatchEvent(new CustomEvent(SYNC_EVENT));
  };

  const recordSearch = useCallback(
    async (
      owner: string,
      repositoryName: string,
      repositoryUrl: string,
      status: AssessmentStatus = 'not_assessed',
      description?: string,
      language?: string,
      assessmentData?: RealAssessmentResult
    ) => {
      const activeId = user?.id || 'guest_workspace';
      const item = await recordUserSearch(
        activeId,
        owner,
        repositoryName,
        repositoryUrl,
        status,
        description,
        language,
        assessmentData
      );
      refresh();
      notifyChange();
      return item;
    },
    [user?.id, refresh]
  );

  const deleteHistoryItem = useCallback(
    async (id: string) => {
      const activeId = user?.id || 'guest_workspace';
      await deleteUserHistoryItem(activeId, id);
      refresh();
      notifyChange();
    },
    [user?.id, refresh]
  );

  const clearHistory = useCallback(async () => {
    const activeId = user?.id || 'guest_workspace';
    await clearUserHistory(activeId);
    refresh();
    notifyChange();
  }, [user?.id, refresh]);

  const toggleBookmark = useCallback(
    async (repo: {
      owner: string;
      repositoryName: string;
      repositoryUrl: string;
      status?: AssessmentStatus;
      description?: string;
      language?: string;
    }) => {
      const activeId = user?.id || 'guest_workspace';
      const isSaved = await toggleUserSavedRepository(activeId, repo);
      refresh();
      notifyChange();
      return isSaved;
    },
    [user?.id, refresh]
  );

  const deleteSavedRepo = useCallback(
    async (id: string) => {
      const activeId = user?.id || 'guest_workspace';
      await deleteUserSavedRepository(activeId, id);
      refresh();
      notifyChange();
    },
    [user?.id, refresh]
  );

  const checkIsSaved = useCallback(
    (owner: string, repositoryName: string) => {
      return isUserRepoSaved(userId, owner, repositoryName);
    },
    [userId]
  );

  return {
    history,
    savedRepos,
    recordSearch,
    deleteHistoryItem,
    clearHistory,
    toggleBookmark,
    deleteSavedRepo,
    checkIsSaved,
    refresh,
  };
}
