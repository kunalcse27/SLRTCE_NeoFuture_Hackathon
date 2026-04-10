import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InsightsPage from './pages/InsightsPage';
import TeacherPage from './pages/TeacherPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import SubjectDetailsPage from './pages/SubjectDetailsPage';
import TaskViewerPage from './pages/TaskViewerPage';
import NoticesPage from './pages/NoticesPage';
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
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="insights" element={<InsightsPage />} />
            <Route path="teacher" element={<TeacherPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="notices" element={<NoticesPage />} />
            <Route path="subject/:subjectName" element={<SubjectDetailsPage />} />
            <Route path="task/:taskId" element={<TaskViewerPage />} />
            <Route path="progress" element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
