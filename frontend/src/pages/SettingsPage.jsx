import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('alws_session');
    sessionStorage.removeItem('alws_session');
    navigate('/login', { replace: true });
  };

  const settingsOptions = [
    { name: 'Profile Account', icon: 'person', desc: 'Change your username, password and details', path: '/dashboard/profile' },
    { name: 'Appearance', icon: 'palette', desc: 'Customize the interface colors and dark mode', path: '#' },
    { name: 'Notifications', icon: 'notifications', desc: 'Manage your alert preferences', path: '/dashboard/notifications' },
    { name: 'Security', icon: 'security', desc: 'Secure your account with 2FA and privacy settings', path: '/dashboard/profile' },
  ];

  return (
    <div className="pt-28 p-10 max-w-7xl mx-auto space-y-10 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-5xl font-extrabold tracking-tighter text-on-surface font-headline leading-tight">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1DB954] to-teal-400">Settings.</span>
          </h2>
          <p className="text-on-surface-variant max-w-md font-label">Manage your account preferences, security, and appearance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsOptions.map((option, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            onClick={() => option.path !== '#' && navigate(option.path)}
            className="group glass-panel p-8 rounded-[2.5rem] border border-white/5 cursor-pointer flex items-center gap-6 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#1DB954]/10 group-hover:border-[#1DB954]/20 transition-all">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-[#1DB954] text-3xl" data-icon={option.icon}>{option.icon}</span>
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-bold text-on-surface font-headline leading-none mb-2">{option.name}</h3>
              <p className="text-sm text-slate-500 font-label">{option.desc}</p>
            </div>
            <span className="material-symbols-outlined text-slate-600 group-hover:text-white transition-all transform group-hover:translate-x-1" data-icon="chevron_right">chevron_right</span>
          </motion.div>
        ))}

        <motion.div 
          whileHover={{ y: -5, backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
          onClick={handleLogout}
          className="group glass-panel p-8 rounded-[2.5rem] border border-red-500/10 cursor-pointer flex items-center gap-6 transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-red-400 text-3xl" data-icon="logout">logout</span>
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-red-400 font-headline leading-none mb-2">Logout</h3>
            <p className="text-sm text-slate-500 font-label">Securely sign out of your ALWS account</p>
          </div>
          <span className="material-symbols-outlined text-red-900 group-hover:text-red-400 transition-all transform group-hover:translate-x-1" data-icon="chevron_right">chevron_right</span>
        </motion.div>
      </div>
    </div>
  );
}
