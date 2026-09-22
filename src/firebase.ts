/* ==========================================================================
   InfraMaturity - Firebase Initialization & Services
   Official Firebase Web SDK configuration using client project credentials.
   ========================================================================== */

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCMG3ecrAFxrdFy0-n7lFwIaJTArKBuyuU',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'openinfra2-19e9d.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'openinfra2-19e9d',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'openinfra2-19e9d.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '743739557777',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:743739557777:web:af3567e1800f35c7a6bc30',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-C9HVDQH7N5',
};

// Initialize Firebase safely without allowing any top-level uncaught exceptions
let appInstance: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let googleProviderInstance: GoogleAuthProvider | null = null;

try {
  if (typeof window !== 'undefined') {
    appInstance = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    authInstance = getAuth(appInstance);
    googleProviderInstance = new GoogleAuthProvider();
    googleProviderInstance.setCustomParameters({
      prompt: 'select_account',
    });

    // Optional Analytics (safely isolated)
    isSupported()
      .then((supported) => {
        if (supported && appInstance) {
          try {
            getAnalytics(appInstance);
          } catch {
            // non-critical
          }
        }
      })
      .catch(() => {
        // non-critical
      });
  }
} catch (err) {
  console.warn('Firebase initialized in offline/fallback mode:', err);
}

export const app = appInstance;
export const auth = authInstance;
export const googleProvider = googleProviderInstance;
