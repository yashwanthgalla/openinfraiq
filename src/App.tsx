/* ==========================================================================
   InfraMaturity - Main Application Component & Router Configuration
   ========================================================================== */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.tsx';
import { RootLayout } from './layouts/RootLayout.tsx';
import { ProtectedRoute } from './components/common/ProtectedRoute.tsx';

// Pages
import { LandingPage } from './pages/LandingPage.tsx';
import { AssessPage } from './pages/AssessPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { DashboardPage } from './pages/DashboardPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { LoginPage } from './pages/auth/LoginPage.tsx';
import { RegisterPage } from './pages/auth/RegisterPage.tsx';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<RootLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/assess" element={<AssessPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Redirect /saved and /history exclusively to the dedicated Profile section */}
            <Route
              path="/saved"
              element={<Navigate to="/profile?tab=saved" replace />}
            />
            <Route
              path="/history"
              element={<Navigate to="/profile?tab=history" replace />}
            />

            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Authenticated Workspace Routes */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            {/* Alias /dashboard to /app */}
            <Route path="/dashboard" element={<Navigate to="/app" replace />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Fallback 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
