import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const [session, setSession] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('alws_session') || sessionStorage.getItem('alws_session');
    if (raw) {
      const data = JSON.parse(raw);
      setSession(data);
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        username: data.username || data.email?.split('@')[0] || 'student123',
        password: data.password || 'password123'
      });
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const updatedSession = { ...session, ...formData };
    
    // Save to the appropriate storage
    if (localStorage.getItem('alws_session')) {
      localStorage.setItem('alws_session', JSON.stringify(updatedSession));
    } else {
      sessionStorage.setItem('alws_session', JSON.stringify(updatedSession));
    }
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="pt-28 p-10 max-w-7xl mx-auto space-y-10 min-h-screen pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-5xl font-extrabold tracking-tighter text-on-surface font-headline leading-tight">
            Account <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1DB954] to-teal-400">Profile.</span>
          </h2>
          <p className="text-on-surface-variant max-w-md font-label">View and update your personal details, credentials, and account accessibility.</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-8 rounded-[3rem] border border-white/5 flex flex-col items-center text-center gap-6 sticky top-32"
          >
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&auto=format&fit=crop" 
                alt="Profile Large" 
                className="w-40 h-40 rounded-3xl border-2 border-[#1DB954]/30 object-cover shadow-2xl transition-all group-hover:border-[#1DB954]"
              />
              <button className="absolute -bottom-4 right-2 w-12 h-12 rounded-2xl bg-[#1DB954] text-on-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <span className="material-symbols-outlined" data-icon="photo_camera">photo_camera</span>
              </button>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-on-surface font-headline">{formData.firstName} {formData.lastName}</h3>
              <p className="text-sm text-[#1DB954] font-bold uppercase tracking-widest">{session?.courseBranch || 'ALWS Student'}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">BTech CE</span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Semester 6</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-10 rounded-[3rem] border border-white/5"
          >
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">First Name</label>
                  <input 
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-medium focus:border-[#1DB954] focus:ring-4 focus:ring-[#1DB954]/10 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Last Name</label>
                  <input 
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-medium focus:border-[#1DB954] focus:ring-4 focus:ring-[#1DB954]/10 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  disabled
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-slate-500 font-medium cursor-not-allowed italic"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-secondary uppercase tracking-[0.2em] ml-2">Username</label>
                  <div className="relative group">
                    <input 
                      type="text" 
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="w-full bg-[#FF5722]/5 border border-[#FF5722]/20 rounded-2xl px-6 py-4 text-white font-bold tracking-tight focus:border-[#FF5722] focus:ring-4 focus:ring-[#FF5722]/10 transition-all outline-none"
                    />
                    <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-[#FF5722]/40" data-icon="alternate_email">alternate_email</span>
                  </div>
                  <p className="text-[10px] text-slate-500 ml-4">This is your unique identifier for login.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-secondary uppercase tracking-[0.2em] ml-2">Password</label>
                  <div className="relative group">
                    <input 
                      type="text" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full bg-[#FF5722]/5 border border-[#FF5722]/20 rounded-2xl px-6 py-4 text-white font-bold tracking-wider focus:border-[#FF5722] focus:ring-4 focus:ring-[#FF5722]/10 transition-all outline-none"
                    />
                    <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-[#FF5722]/40" data-icon="lock_open">lock_open</span>
                  </div>
                  <p className="text-[10px] text-slate-500 ml-4">Keep your password secure and unique.</p>
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between">
                <button 
                  type="submit" 
                  className="px-10 py-5 bg-[#1DB954] text-on-primary font-black rounded-[2rem] shadow-xl shadow-[#1DB954]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
                >
                  <span className="material-symbols-outlined font-black" data-icon="save">save</span>
                  Save Changes
                </button>

                {isSaved && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-[#1DB954] font-bold"
                  >
                    <span className="material-symbols-outlined font-black" data-icon="task_alt">task_alt</span>
                    Changes saved successfully!
                  </motion.div>
                )}
              </div>
            </form>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
