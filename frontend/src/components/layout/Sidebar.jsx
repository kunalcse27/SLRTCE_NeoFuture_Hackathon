import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { name: 'Teacher', icon: 'school', path: '/dashboard/teacher' },
    { name: 'Progress', icon: 'trending_up', path: '/dashboard/progress' },
    { name: 'Insights', icon: 'lightbulb', path: '/dashboard/insights' },
    { name: 'Resources', icon: 'auto_stories', path: '/dashboard/resources' },
    { name: 'Profile', icon: 'person', path: '/dashboard/profile' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-50 bg-[#121212] font-manrope text-sm font-semibold border-r border-[#222] shadow-2xl flex flex-col gap-2 p-6 transition-all duration-300">
      <div className="mb-10 flex items-center gap-3">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 10 }}
          className="w-10 h-10 rounded-xl bg-[#1DB954]/10 flex items-center justify-center border border-[#1DB954]/20 shadow-lg shadow-[#1DB954]/5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[#1DB954]" data-icon="hub">hub</span>
        </motion.div>
        <div>
          <h1 className="text-xl font-extrabold text-[#1DB954] tracking-tight">ALWS</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Adaptive System</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-[#1DB954]/10 text-[#1DB954] border border-[#1DB954]/20 shadow-lg shadow-[#1DB954]/5' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <span className="material-symbols-outlined transition-transform group-hover:scale-110" data-icon={item.icon}>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-br from-[#1DB954] to-teal-600 text-[#121212] py-4 px-4 rounded-3xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#1DB954]/20 hover:brightness-110 transition-all"
        >
          <span className="material-symbols-outlined text-xl wellbeing-pulse" data-icon="heart_pulse">favorite</span>
          Wellbeing Pulse
        </motion.button>
      </div>
    </aside>
  );
}
