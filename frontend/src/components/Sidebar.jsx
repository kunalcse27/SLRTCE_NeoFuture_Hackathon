export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-50 bg-slate-950 font-manrope text-sm font-semibold border-r border-slate-800/15 shadow-2xl shadow-black flex flex-col gap-2 p-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center border border-secondary/20">
          <span className="material-symbols-outlined text-teal-400" data-icon="hub">hub</span>
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-teal-400">ALWS</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Adaptive System</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1 flex-grow">
        {/* Active: Dashboard */}
        <a className="bg-slate-800/50 text-teal-400 rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-slate-800/30 hover:text-teal-300 transition-all active:translate-x-1 duration-200" href="#">
          <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
          <span>Dashboard</span>
        </a>
        <a className="text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-800/30 hover:text-teal-300 transition-all active:translate-x-1 duration-200" href="#">
          <span className="material-symbols-outlined" data-icon="auto_stories">auto_stories</span>
          <span>Resources</span>
        </a>
        <a className="text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-800/30 hover:text-teal-300 transition-all active:translate-x-1 duration-200" href="#">
          <span className="material-symbols-outlined" data-icon="psychology_alt">psychology_alt</span>
          <span>Support</span>
        </a>
      </nav>
      <div className="mt-auto pt-6">
        <button className="w-full bg-gradient-to-br from-secondary to-tertiary text-on-secondary-fixed py-4 px-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg shadow-secondary/10 hover:brightness-110 transition-all active:scale-95">
          <span className="material-symbols-outlined text-xl" data-icon="heart_pulse" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>pulse_alert</span>
          Wellbeing Pulse
        </button>
      </div>
    </aside>
  );
}
