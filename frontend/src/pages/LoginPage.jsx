import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center relative overflow-hidden font-body selection:bg-secondary/30">
      {/* Background decorations - Animated */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-tertiary/10 rounded-full blur-[150px] pointer-events-none"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md glass-panel rounded-3xl p-10 border border-outline-variant/20 shadow-2xl z-10 relative"
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center border border-secondary/20 mb-4 shadow-lg shadow-secondary/5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-teal-400 text-3xl" data-icon="hub">hub</span>
          </motion.div>
          <h1 className="text-3xl font-extrabold text-teal-400 font-headline tracking-tight">ALWS</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Adaptive System</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface-variant font-label block" htmlFor="email">Email</label>
            <div className="relative flex items-center bg-slate-800/20 rounded-xl px-4 py-3 border border-outline-variant/10 focus-within:border-secondary/50 focus-within:bg-slate-800/40 transition-all duration-300">
              <span className="material-symbols-outlined text-slate-400 mr-3 text-[20px]" data-icon="mail">mail</span>
              <input 
                id="email"
                type="email" 
                required
                className="bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder-slate-500 w-full p-0" 
                placeholder="aarav@example.com" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface-variant font-label block" htmlFor="password">Password</label>
            <div className="relative flex items-center bg-slate-800/20 rounded-xl px-4 py-3 border border-outline-variant/10 focus-within:border-secondary/50 focus-within:bg-slate-800/40 transition-all duration-300">
              <span className="material-symbols-outlined text-slate-400 mr-3 text-[20px]" data-icon="lock">lock</span>
              <input 
                id="password"
                type="password" 
                required
                className="bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder-slate-500 w-full p-0" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 group cursor-pointer">
              <input type="checkbox" id="remember" className="rounded border-outline-variant/30 bg-surface-container-highest text-secondary focus:ring-secondary/50 focus:ring-offset-surface transition-all cursor-pointer" />
              <label htmlFor="remember" className="text-xs text-slate-400 font-label cursor-pointer group-hover:text-slate-300 transition-colors">Remember me</label>
            </div>
            <a href="#" className="text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors hover:underline underline-offset-4">Forgot Password?</a>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, brightness: 1.1 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="w-full bg-gradient-to-br from-secondary to-tertiary text-on-secondary-fixed py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 transition-all mt-4 group"
          >
            <span>Access Dashboard</span>
            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
          </motion.button>
        </form>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-xs text-slate-500 font-label z-10"
      >
        New to ALWS? <a href="#" className="text-secondary font-bold hover:underline underline-offset-4">Request an invite</a>
      </motion.p>
    </div>
  );
}
