import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import InsightsPage from './components/InsightsPage';
import LoginPage from './components/LoginPage';

function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <Header />
        {children}
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/insights" element={<DashboardLayout><InsightsPage /></DashboardLayout>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
