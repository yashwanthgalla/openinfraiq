/* ==========================================================================
   InfraMaturity - Authentication Hook & Context Provider
   Connected to Firebase Auth architecture. Real user authentication: no demo mode.
   ========================================================================== */

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, UserProfileUpdate } from '../types/index.ts';
import {
  authenticateWithEmail,
  signInWithGoogle,
  createAccountWithEmail,
  terminateSession,
  getCurrentSessionUser,
  updateSessionProfile,
  sendPasswordReset,
  getActiveAuthMode,
  type AuthProviderMode,
} from '../lib/firebaseAuth.ts';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authMode: AuthProviderMode;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: UserProfileUpdate) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getCurrentSessionUser());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authMode = getActiveAuthMode();

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      const res = await authenticateWithEmail(email, password);
      if (res.user) {
        setUser(res.user);
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return { success: false, error: res.error || 'Authentication failed.' };
    } catch (err: unknown) {
      setIsLoading(false);
      return { success: false, error: (err as Error).message };
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const res = await signInWithGoogle();
      if (res.user) {
        setUser(res.user);
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return { success: false, error: res.error || 'Google sign-in failed.' };
    } catch (err: unknown) {
      setIsLoading(false);
      return { success: false, error: (err as Error).message };
    }
  };

  const register = async (name: string, email: string, password?: string) => {
    setIsLoading(true);
    try {
      const res = await createAccountWithEmail(name, email, password);
      if (res.user) {
        setUser(res.user);
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return { success: false, error: res.error || 'Registration failed.' };
    } catch (err: unknown) {
      setIsLoading(false);
      return { success: false, error: (err as Error).message };
    }
  };

  const logout = () => {
    terminateSession();
    setUser(null);
  };

  const updateProfile = async (updates: UserProfileUpdate) => {
    const res = await updateSessionProfile(updates);
    if (res.user) {
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error || 'Failed to update profile.' };
  };

  const resetPassword = async (email: string) => {
    return sendPasswordReset(email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        authMode,
        login,
        loginWithGoogle,
        register,
        logout,
        updateProfile,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
