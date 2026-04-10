import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { name: 'Resources', icon: 'auto_stories', path: '/resources' },
    { name: 'Support', icon: 'psychology_alt', path: '/support' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-50 bg-slate-950 font-manrope text-sm font-semibold border-r border-slate-800/15 shadow-2xl flex flex-col gap-2 p-6 transition-all duration-300">
      <div className="mb-10 flex items-center gap-3">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 10 }}
          className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center border border-secondary/20 shadow-lg shadow-secondary/5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-teal-400" data-icon="hub">hub</span>
        </motion.div>
        <div>
          <h1 className="text-xl font-extrabold text-teal-400 tracking-tight">ALWS</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Adaptive System</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-secondary/10 text-teal-400 border border-secondary/20 shadow-lg shadow-secondary/5' 
                  : 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-200'
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
          className="w-full bg-gradient-to-br from-secondary to-tertiary text-on-secondary-fixed py-4 px-4 rounded-3xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-secondary/10 hover:brightness-110 transition-all"
        >
          <span className="material-symbols-outlined text-xl wellbeing-pulse" data-icon="heart_pulse">favorite</span>
          Wellbeing Pulse
        </motion.button>
      </div>
    </aside>
  );
}
