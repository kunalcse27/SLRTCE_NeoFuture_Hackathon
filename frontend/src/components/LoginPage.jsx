import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center relative overflow-hidden font-body selection:bg-secondary/30">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-tertiary/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="w-full max-w-md glass-panel rounded-2xl p-10 border border-outline-variant/20 shadow-2xl z-10 relative">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center border border-secondary/20 mb-4 shadow-lg shadow-secondary/5">
            <span className="material-symbols-outlined text-teal-400 text-3xl" data-icon="hub">hub</span>
          </div>
          <h1 className="text-3xl font-extrabold text-teal-400 font-headline tracking-tight">ALWS</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Adaptive System</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface-variant font-label block" htmlFor="email">Email</label>
            <div className="relative flex items-center bg-slate-800/30 rounded-xl px-4 py-3 border border-outline-variant/10 focus-within:border-secondary/50 transition-colors">
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
            <div className="relative flex items-center bg-slate-800/30 rounded-xl px-4 py-3 border border-outline-variant/10 focus-within:border-secondary/50 transition-colors">
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
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded border-outline-variant/30 bg-surface-container-highest text-secondary focus:ring-secondary/50 focus:ring-offset-surface" />
              <label htmlFor="remember" className="text-xs text-slate-400 font-label cursor-pointer">Remember me</label>
            </div>
            <a href="#" className="text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-br from-secondary to-tertiary text-on-secondary-fixed py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 hover:brightness-110 transition-all active:scale-95 mt-4 group"
          >
            <span>Access Dashboard</span>
            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
          </button>
        </form>
      </div>
      
      <p className="mt-8 text-xs text-slate-500 font-label z-10">
        New to ALWS? <a href="#" className="text-secondary font-bold hover:underline">Request an invite</a>
      </p>
    </div>
  );
}
