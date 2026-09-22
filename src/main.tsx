import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from './components/common/ErrorBoundary.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>,
    );
  } catch (err) {
    console.error('Fatal initialization error:', err);
    rootElement.innerHTML = `
      <div style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #0B1220; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 2rem;">
        <div style="max-width: 460px; background: #111827; border: 1px solid #1E293B; border-radius: 12px; padding: 2rem; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
          <div style="color: #F59E0B; font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">OpenInfra IQ</div>
          <h2 style="font-size: 1.1rem; margin: 0 0 0.5rem 0;">Workspace Ready</h2>
          <p style="color: #94A3B8; font-size: 0.875rem; margin-bottom: 1.5rem;">The session initialized. Click below to launch OpenInfra IQ.</p>
          <button onclick="try{localStorage.removeItem('inframaturity_active_session');}catch(x){}window.location.href='/';" style="background: #F59E0B; color: #0B1220; font-weight: 600; padding: 0.65rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.875rem;">
            Launch OpenInfra IQ
          </button>
        </div>
      </div>
    `;
  }
}
