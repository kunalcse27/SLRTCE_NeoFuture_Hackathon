import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InsightsPage from './pages/InsightsPage';
import ResourcesPage from './components/ResourcesPage';
import DashboardLayout from './components/layout/DashboardLayout';

// ─── Auth Guard ─────────────────────────────────────────────────────────────
// Checks both localStorage (Remember Me) and sessionStorage (tab-only session).
function RequireAuth() {
  const session =
    localStorage.getItem('alws_session') || sessionStorage.getItem('alws_session');
  if (!session) return <Navigate to="/login" replace />;
  return <Outlet />;
}

// ─── Root redirect ─────────────────────────────────────────────────────────
function RootRedirect() {
  const session =
    localStorage.getItem('alws_session') || sessionStorage.getItem('alws_session');
  return <Navigate to={session ? '/dashboard' : '/login'} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root: smart redirect */}
        <Route path="/" element={<RootRedirect />} />

        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected: all nested routes go through RequireAuth + DashboardLayout */}
        <Route element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/insights"  element={<InsightsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
