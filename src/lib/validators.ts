/* ==========================================================================
   InfraMaturity - URL Parsing & Validation Utilities
   ========================================================================== */

export interface ParsedRepository {
  isValid: boolean;
  owner: string;
  name: string;
  normalizedUrl: string;
  errorMessage?: string;
}

/**
 * Validates and extracts owner and repository name from a public repository input.
 * Supports standard URLs (e.g., https://github.com/kubernetes/kubernetes)
 * and shorthand identifiers (e.g., kubernetes/kubernetes).
 */
export function parseRepositoryUrl(input: string): ParsedRepository {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      isValid: false,
      owner: '',
      name: '',
      normalizedUrl: '',
      errorMessage: 'Please enter a repository address.',
    };
  }

  // Check if input is shorthand owner/repo format
  const shorthandPattern = /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/;
  if (shorthandPattern.test(trimmed)) {
    const [owner, name] = trimmed.split('/');
    const cleanName = name.replace(/\.git$/, '');
    return {
      isValid: true,
      owner,
      name: cleanName,
      normalizedUrl: `https://github.com/${owner}/${cleanName}`,
    };
  }

  // Handle URL format
  try {
    let urlString = trimmed;
    if (!/^https?:\/\//i.test(urlString)) {
      urlString = `https://${urlString}`;
    }

    const parsedUrl = new URL(urlString);
    const pathParts = parsedUrl.pathname.split('/').filter(Boolean);

    if (pathParts.length < 2) {
      return {
        isValid: false,
        owner: '',
        name: '',
        normalizedUrl: '',
        errorMessage: 'Repository address must specify both owner and repository name.',
      };
    }

    const owner = pathParts[0];
    const name = pathParts[1].replace(/\.git$/, '');

    // Basic sanity check on owner and repo characters
    const validIdentifier = /^[a-zA-Z0-9_.-]+$/;
    if (!validIdentifier.test(owner) || !validIdentifier.test(name)) {
      return {
        isValid: false,
        owner: '',
        name: '',
        normalizedUrl: '',
        errorMessage: 'Invalid characters in repository owner or name.',
      };
    }

    const normalizedUrl = `${parsedUrl.origin}/${owner}/${name}`;

    return {
      isValid: true,
      owner,
      name,
      normalizedUrl,
    };
  } catch {
    return {
      isValid: false,
      owner: '',
      name: '',
      normalizedUrl: '',
      errorMessage: 'Check the repository address format and try again.',
    };
  }
}

/**
 * Validates email address format
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
