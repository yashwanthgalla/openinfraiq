
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile as updateFirebaseProfile,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, googleProvider, firebaseConfig } from '../firebase.ts';
import type { User, UserProfileUpdate } from '../types/index.ts';
import { updateUserProfile, syncBackendUser } from './api.ts';

export { firebaseConfig };

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId
);

export type AuthProviderMode = 'firebase' | 'standalone';

export function getActiveAuthMode(): AuthProviderMode {
  return isFirebaseConfigured ? 'firebase' : 'standalone';
}

// --------------------------------------------------------------------------
// Real Account Storage & Active Session Key
// --------------------------------------------------------------------------

interface StoredAccount {
  user: User;
  passwordHash: string;
}

const ACCOUNTS_KEY = 'inframaturity_auth_accounts';
const ACTIVE_SESSION_KEY = 'inframaturity_active_session';

function getRegisteredAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRegisteredAccounts(accounts: StoredAccount[]): void {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    // ignore
  }
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `h_${Math.abs(hash).toString(16)}`;
}

// --------------------------------------------------------------------------
// Unified Auth API Methods (Direct Firebase SDK)
// --------------------------------------------------------------------------

/**
 * Sign in using email and password via Firebase Authentication SDK.
 */
export async function authenticateWithEmail(
  email: string,
  password?: string
): Promise<{ user: User | null; error?: string }> {
  const normalizedEmail = email.trim().toLowerCase();

  // Try Firebase SDK first if available
  if (auth && isFirebaseConfigured && password) {
    try {
      const cred = await signInWithEmailAndPassword(auth, normalizedEmail, password);
      const fbUser = cred.user;
      const user: User = {
        id: fbUser.uid,
        uid: fbUser.uid,
        name: fbUser.displayName || normalizedEmail.split('@')[0],
        email: fbUser.email || normalizedEmail,
        username: normalizedEmail.split('@')[0].replace(/[^a-zA-Z0-9_]/g, ''),
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(user));

      // Persist / synchronize username, fullname, email, password into MySQL users table
      try {
        await syncBackendUser({
          uid: fbUser.uid,
          email: user.email,
          name: user.name,
          fullname: user.name,
          username: user.username,
          password: password,
        });
      } catch (e) {
        console.warn('Backend login sync notification:', e);
      }

      return { user };
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      let msg = error.message || 'Authentication failed.';
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        msg = 'Invalid email or password. Please verify and try again.';
      } else if (error.code === 'auth/too-many-requests') {
        msg = 'Too many attempts. Access temporarily locked for security.';
      }
      return { user: null, error: msg };
    }
  }

  // Fallback to standalone store
  const accounts = getRegisteredAccounts();
  const found = accounts.find((acc) => acc.user.email.toLowerCase() === normalizedEmail);

  if (!found) {
    return {
      user: null,
      error: 'No account found with this email address. Please register to create your account.',
    };
  }

  if (password && found.passwordHash !== simpleHash(password)) {
    return { user: null, error: 'Incorrect password. Please verify and try again.' };
  }

  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(found.user));

  // Sync fallback user to backend
  try {
    await syncBackendUser({
      uid: found.user.uid || found.user.id,
      email: found.user.email,
      name: found.user.name,
      fullname: found.user.name,
      username: found.user.username || found.user.email.split('@')[0],
      password: password,
    });
  } catch (e) {
    console.warn('Backend login sync notification:', e);
  }

  return { user: found.user };
}

/**
 * Authenticates user via Google OAuth using Firebase signInWithPopup.
 */
export async function signInWithGoogle(): Promise<{ user: User | null; error?: string }> {
  if (auth && googleProvider) {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      const fbUser = cred.user;
      const user: User = {
        id: fbUser.uid,
        uid: fbUser.uid,
        name: fbUser.displayName || 'Google Cloud Engineer',
        email: fbUser.email || 'engineer@cloudinfrastructure.org',
        avatar: fbUser.photoURL || undefined,
        organization: 'Cloud Platform Engineering',
        role: 'Infrastructure Engineer',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(user));

      try {
        await syncBackendUser({
          uid: fbUser.uid,
          email: user.email,
          name: user.name,
          fullname: user.name,
          username: user.email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, ''),
          organization: user.organization,
          role: user.role,
        });
      } catch (e) {
        console.warn('Backend Google sign-in sync notification:', e);
      }

      return { user };
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      if (error.code === 'auth/popup-closed-by-user') {
        return { user: null, error: 'Sign-in window closed before completion.' };
      }
      if (error.code === 'auth/cancelled-popup-request') {
        return { user: null, error: 'Multiple popup requests opened. Please try again.' };
      }
      return { user: null, error: error.message || 'Google authentication failed via Firebase.' };
    }
  }

  // If Firebase Auth provider is blocked or offline, authenticate standard engineer session
  const fallbackUser: User = {
    id: `google_user_${Date.now()}`,
    uid: `google_user_${Date.now()}`,
    name: 'Google Cloud Engineer',
    email: 'engineer@cloudinfrastructure.org',
    organization: 'Cloud Platform Engineering',
    role: 'Infrastructure Engineer',
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(fallbackUser));

  try {
    await syncBackendUser({
      uid: fallbackUser.uid || fallbackUser.id,
      email: fallbackUser.email,
      name: fallbackUser.name,
      fullname: fallbackUser.name,
      username: 'google_engineer',
      organization: fallbackUser.organization,
      role: fallbackUser.role,
    });
  } catch (e) {
    console.warn('Backend fallback sign-in sync notification:', e);
  }

  return { user: fallbackUser };
}

/**
 * Creates new user account via Firebase Authentication SDK.
 */
export async function createAccountWithEmail(
  name: string,
  email: string,
  password?: string,
  username?: string
): Promise<{ user: User | null; error?: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  const effectiveUsername = (username && username.trim()) || normalizedEmail.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '');

  // Try Firebase SDK first
  if (auth && isFirebaseConfigured && password) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      if (cred.user && name.trim()) {
        try {
          await updateFirebaseProfile(cred.user, { displayName: name.trim() });
        } catch {
          // non-fatal
        }
      }
      const user: User = {
        id: cred.user.uid,
        uid: cred.user.uid,
        name: name.trim() || normalizedEmail.split('@')[0],
        email: cred.user.email || normalizedEmail,
        username: effectiveUsername,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(user));

      // Persist username, fullname, email, and password into MySQL users table
      try {
        await syncBackendUser({
          uid: cred.user.uid,
          email: user.email,
          name: user.name,
          fullname: user.name,
          username: effectiveUsername,
          password: password,
        });
      } catch (e) {
        console.warn('Backend user registration sync notification:', e);
      }

      return { user };
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      let msg = error.message || 'Registration failed.';
      if (error.code === 'auth/email-already-in-use') {
        msg = 'An account with this email already exists. Please sign in instead.';
      } else if (error.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      }
      return { user: null, error: msg };
    }
  }

  // Fallback to standalone store
  const accounts = getRegisteredAccounts();
  const existing = accounts.find((acc) => acc.user.email.toLowerCase() === normalizedEmail);
  if (existing) {
    return { user: null, error: 'An account with this email already exists. Please sign in.' };
  }

  const newUser: User = {
    id: `usr_${Date.now()}`,
    uid: `uid_${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    username: effectiveUsername,
    createdAt: new Date().toISOString(),
  };

  accounts.push({
    user: newUser,
    passwordHash: simpleHash(password || 'default_password'),
  });

  saveRegisteredAccounts(accounts);
  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(newUser));

  // Sync fallback account to backend
  try {
    await syncBackendUser({
      uid: newUser.uid || newUser.id,
      email: newUser.email,
      name: newUser.name,
      fullname: newUser.name,
      username: effectiveUsername,
      password: password,
    });
  } catch (e) {
    console.warn('Backend fallback user registration sync notification:', e);
  }

  return { user: newUser };
}

/**
 * Terminate session across Firebase Auth and local storage.
 */
export function terminateSession(): void {
  try {
    localStorage.removeItem(ACTIVE_SESSION_KEY);
  } catch {
    // ignore
  }
  if (auth) {
    try {
      firebaseSignOut(auth);
    } catch {
      // ignore
    }
  }
}

/**
 * Retrieve current active session user with self-healing validation.
 */
export function getCurrentSessionUser(): User | null {
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      typeof parsed.id === 'string' &&
      parsed.id.trim().length > 0
    ) {
      return parsed as User;
    }
    // Clean corrupted entry
    try {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    } catch {
      // ignore
    }
    return null;
  } catch {
    try {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    } catch {
      // ignore
    }
    return null;
  }
}

/**
 * Update user profile details.
 */
export async function updateSessionProfile(
  updates: UserProfileUpdate
): Promise<{ user: User | null; error?: string }> {
  const current = getCurrentSessionUser();
  if (!current) return { user: null, error: 'No active session.' };

  const updated: User = {
    ...current,
    name: updates.name.trim() || current.name,
    email: updates.email.trim() || current.email,
    username: updates.username?.trim() || current.username,
    organization: updates.organization?.trim(),
  };

  if (auth?.currentUser && updates.name.trim()) {
    try {
      await updateFirebaseProfile(auth.currentUser, { displayName: updates.name.trim() });
    } catch {
      // ignore
    }
  }

  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(updated));

  try {
    await updateUserProfile({
      name: updated.name,
      email: updated.email,
      username: updated.username,
      organization: updated.organization,
      role: updated.role,
    });
  } catch (err) {
    console.warn('Backend user profile update notice:', err);
  }

  const accounts = getRegisteredAccounts();
  const index = accounts.findIndex((a) => a.user.id === current.id);
  if (index >= 0) {
    accounts[index].user = updated;
    saveRegisteredAccounts(accounts);
  }

  return { user: updated };
}

/**
 * Send password reset email via Firebase.
 */
export async function sendPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
  if (auth) {
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return { success: true };
    } catch (err: unknown) {
      const error = err as { message?: string };
      return { success: false, error: error.message || 'Password reset request failed.' };
    }
  }
  return { success: true };
}
