import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <>
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <Header onLogout={() => setIsLoggedIn(false)} />
        <Dashboard />
      </main>
    </>
  );
}
