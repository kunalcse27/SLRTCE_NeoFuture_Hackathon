import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// ─── Read session from either localStorage (Remember Me) or sessionStorage ───
function getSession() {
  try {
    const raw = localStorage.getItem('alws_session') || sessionStorage.getItem('alws_session');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function Header() {
  const navigate = useNavigate();
  const session = getSession();
  const [searchQuery, setSearchQuery] = useState('');

  const displayName = session?.firstName
    ? `${session.firstName} ${session.lastName || ''}`.trim()
    : session?.email?.split('@')[0] || 'Student';

  const searchItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Teacher', path: '/dashboard/teacher' },
    { name: 'Progress', path: '/dashboard/progress' },
    { name: 'Resources', path: '/dashboard/resources' },
    { name: 'Profile', path: '/dashboard/profile' },
    { name: 'Settings', path: '/dashboard/settings' },
    { name: 'Notifications', path: '/dashboard/notifications' },
    // Academic Resources keywords
    { name: 'Operating Systems', path: '/dashboard/resources' },
    { name: 'Process Synchronization', path: '/dashboard/resources' },
    { name: 'Graph Algorithms', path: '/dashboard/resources' },
    { name: 'TCP/IP', path: '/dashboard/resources' },
    { name: 'Database Architecture', path: '/dashboard/resources' },
    { name: 'DBMS Optimization', path: '/dashboard/resources' },
    { name: 'Theory of Computation', path: '/dashboard/resources' },
    { name: 'Machine Learning', path: '/dashboard/resources' },
  ];

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const match = searchItems.find(item => 
        item.name.toLowerCase().includes(query)
      );

      if (match) {
        navigate(match.path);
        setSearchQuery('');
      } else if (query.includes('resource') || query.includes('note') || query.includes('lecture')) {
        navigate('/dashboard/resources');
        setSearchQuery('');
      }
    }
  };

  const handleLogout = () => {
    // Clear all persisted session data
    localStorage.removeItem('alws_session');
    sessionStorage.removeItem('alws_session');
    navigate('/login', { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 bg-[#121212]/80 backdrop-blur-2xl border-b border-[#222] px-8 py-4 flex justify-between items-center font-manrope tracking-tight font-medium">
      <div className="flex items-center gap-8">
        <div className="text-xl font-bold tracking-tighter text-[#1DB954] lg:hidden">ALWS</div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:flex items-center bg-[#1a1a1a] rounded-2xl px-4 py-2 border border-white/5 focus-within:border-[#1DB954]/50 transition-all">
          <span className="material-symbols-outlined text-slate-400 mr-2 text-xl" data-icon="search">search</span>
          <input 
            className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-slate-500 w-48" 
            placeholder="Search pages or resources..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <motion.button 
            whileHover={{ scale: 1.1, color: '#1DB954' }} 
            onClick={() => navigate('/dashboard/notifications')}
            className="p-2 rounded-xl bg-white/5"
          >
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, color: '#1DB954' }} 
            onClick={() => navigate('/dashboard/settings')}
            className="p-2 rounded-xl bg-white/5"
          >
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
          </motion.button>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{displayName || 'Student'}</p>
            <p className="text-xs font-bold text-[#1DB954]">{session?.courseBranch || 'Student Dashboard'}</p>
          </div>
          <div className="relative group cursor-pointer">
            <img 
              alt="User Profile" 
              className="w-10 h-10 rounded-xl border border-[#1DB954]/30 object-cover shadow-lg shadow-black/20 group-hover:border-[#1DB954] transition-colors" 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&h=150&auto=format&fit=crop"
            />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout} 
            className="ml-2 bg-red-500/10 text-red-400 p-2 rounded-xl border border-red-500/10 hover:bg-red-500 hover:text-white transition-all shadow-lg" 
            title="Log Out"
          >
            <span className="material-symbols-outlined text-xl" data-icon="logout">logout</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
