import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InsightsPage from './pages/InsightsPage';

/**
 * App Component
 * 
 * Main routing configuration for ALWS.
 * Pages are consolidated into single files for ease of management.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Dashboard Routes with Layout Wrapper */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="insights" element={<InsightsPage />} />
          {/* Add more dashboard sub-pages here */}
        </Route>

        {/* Fallback Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
