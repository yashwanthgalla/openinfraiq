/* ==========================================================================
   InfraMaturity - GitHub REST API Client
   Direct integration with public GitHub endpoints for cloud infrastructure repos.
   Features 1-hour client-side caching & optional token authentication.
   ========================================================================== */

const GITHUB_TOKEN_KEY = 'inframaturity_github_token';
const CACHE_PREFIX = 'inframaturity_gh_cache_';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour TTL

export function getGitHubToken(): string | null {
  return localStorage.getItem(GITHUB_TOKEN_KEY);
}

export function setGitHubToken(token: string): void {
  if (token.trim()) {
    localStorage.setItem(GITHUB_TOKEN_KEY, token.trim());
  } else {
    localStorage.removeItem(GITHUB_TOKEN_KEY);
  }
}

interface CacheWrapper<T> {
  timestamp: number;
  data: T;
}

function getFromCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const item: CacheWrapper<T> = JSON.parse(raw);
    if (Date.now() - item.timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return item.data;
  } catch {
    return null;
  }
}

function saveToCache<T>(key: string, data: T): void {
  try {
    const wrapper: CacheWrapper<T> = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(wrapper));
  } catch {
    // Storage might be full, safe to ignore
  }
}

async function githubFetch<T>(endpoint: string, cacheKey?: string): Promise<T> {
  if (cacheKey) {
    const cached = getFromCache<T>(cacheKey);
    if (cached) {
      return cached;
    }
  }

  const token = getGitHubToken();
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  const url = `https://api.github.com${endpoint}`;
  const response = await fetch(url, { headers });

  if (response.status === 404) {
    throw new Error('Repository was not found on GitHub. Verify the owner and repository name.');
  }

  if (response.status === 403) {
    const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
    if (rateLimitRemaining === '0') {
      throw new Error(
        'GitHub API public rate limit reached (60 requests/hr). You can add a GitHub Personal Access Token in the settings below to increase limit to 5,000 requests/hr.'
      );
    }
    throw new Error('GitHub API access was forbidden (HTTP 403).');
  }

  if (!response.ok) {
    throw new Error(`GitHub API request failed with status: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as T;
  if (cacheKey) {
    saveToCache(cacheKey, data);
  }
  return data;
}

// --------------------------------------------------------------------------
// Public API Methods
// --------------------------------------------------------------------------

export interface RawGitHubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
    type: 'Organization' | 'User';
  };
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  license: {
    key: string;
    name: string;
    spdx_id: string;
  } | null;
  archived: boolean;
  disabled: boolean;
}

export interface RawGitHubContributor {
  login: string;
  contributions: number;
  avatar_url: string;
  html_url: string;
}

export interface RawGitHubRelease {
  id: number;
  tag_name: string;
  name: string | null;
  published_at: string;
  prerelease: boolean;
  draft: boolean;
  html_url: string;
  body: string | null;
}

export interface RawGitHubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
}

export async function fetchRepositoryMetadata(owner: string, repo: string): Promise<RawGitHubRepo> {
  return githubFetch<RawGitHubRepo>(`/repos/${owner}/${repo}`, `repo_${owner}_${repo}`);
}

export async function fetchRepositoryContributors(
  owner: string,
  repo: string
): Promise<RawGitHubContributor[]> {
  try {
    return await githubFetch<RawGitHubContributor[]>(
      `/repos/${owner}/${repo}/contributors?per_page=30`,
      `contribs_${owner}_${repo}`
    );
  } catch {
    // Some large repos might return 202 or disable stats; return empty array gracefully
    return [];
  }
}

export async function fetchRepositoryReleases(
  owner: string,
  repo: string
): Promise<RawGitHubRelease[]> {
  try {
    return await githubFetch<RawGitHubRelease[]>(
      `/repos/${owner}/${repo}/releases?per_page=15`,
      `releases_${owner}_${repo}`
    );
  } catch {
    return [];
  }
}

export async function fetchRepositoryRecentCommits(
  owner: string,
  repo: string
): Promise<RawGitHubCommit[]> {
  try {
    return await githubFetch<RawGitHubCommit[]>(
      `/repos/${owner}/${repo}/commits?per_page=30`,
      `commits_${owner}_${repo}`
    );
  } catch {
    return [];
  }
}
