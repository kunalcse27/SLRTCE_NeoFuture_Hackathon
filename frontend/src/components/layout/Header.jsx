import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 bg-slate-900/40 backdrop-blur-2xl border-b border-outline-variant/10 px-8 py-4 flex justify-between items-center font-manrope tracking-tight font-medium">
      <div className="flex items-center gap-8">
        <div className="text-xl font-bold tracking-tighter text-teal-400 lg:hidden">ALWS</div>
        <nav className="hidden xl:flex items-center gap-6">
          <a className="text-teal-400 font-bold relative group" href="#">
            Overview
            <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-400" />
          </a>
          <a className="text-slate-400 hover:text-teal-300 transition-colors" href="#">Insights</a>
          <a className="text-slate-400 hover:text-teal-300 transition-colors" href="#">History</a>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:flex items-center bg-slate-800/20 rounded-2xl px-4 py-2 border border-outline-variant/5 focus-within:border-secondary/30 transition-all">
          <span className="material-symbols-outlined text-slate-400 mr-2 text-xl" data-icon="search">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder-slate-500 w-48" placeholder="Search insights..." type="text"/>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <motion.button whileHover={{ scale: 1.1, color: '#41e4c0' }} className="p-2 rounded-xl bg-slate-800/20">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.1, color: '#41e4c0' }} className="p-2 rounded-xl bg-slate-800/20">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
          </motion.button>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-800/30">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Aarav</p>
            <p className="text-xs font-bold text-teal-400">Lead Admin</p>
          </div>
          <div className="relative group cursor-pointer">
            <img 
              alt="User Profile" 
              className="w-10 h-10 rounded-xl border border-teal-400/30 object-cover shadow-lg shadow-black/20 group-hover:border-secondary transition-colors" 
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
