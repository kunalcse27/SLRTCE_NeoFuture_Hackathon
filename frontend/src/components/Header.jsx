export default function Header({ onLogout }) {
  return (
    <header className="fixed top-0 left-64 right-0 z-40 bg-slate-900/60 backdrop-blur-xl shadow-xl shadow-slate-950/20 px-8 py-4 flex justify-between items-center font-manrope tracking-tight font-medium">
      <div className="flex items-center gap-8">
        <div className="text-2xl font-bold tracking-tighter text-teal-400">ALWS</div>
        <nav className="hidden md:flex items-center gap-6">
          <a className="text-teal-400 font-bold border-b-2 border-teal-400 hover:text-teal-300 transition-colors duration-300 active:scale-95 duration-200" href="#">Overview</a>
          <a className="text-slate-400 font-medium hover:text-teal-300 transition-colors duration-300 active:scale-95 duration-200" href="#">Insights</a>
          <a className="text-slate-400 font-medium hover:text-teal-300 transition-colors duration-300 active:scale-95 duration-200" href="#">History</a>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative flex items-center bg-slate-800/20 rounded-full px-4 py-2">
          <span className="material-symbols-outlined text-slate-400 mr-2" data-icon="search">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder-slate-500 w-48" placeholder="Search insights..." type="text"/>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <button className="hover:text-teal-300 transition-colors duration-300 active:scale-95 duration-200">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
          </button>
          <button className="hover:text-teal-300 transition-colors duration-300 active:scale-95 duration-200">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
          </button>
        </div>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-800/30">
          <div className="text-right">
            <p className="text-xs text-slate-500 font-label">Login As:</p>
            <p className="text-sm font-bold text-teal-400">Aarav</p>
          </div>
          <img alt="Aarav's Profile Picture" className="w-10 h-10 rounded-full border-2 border-teal-400/30 object-cover" data-alt="Close-up portrait of a young man with a friendly expression and stylish hair, soft studio lighting on dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0jiaA2y45kfdGoqYex1KFBHcL9DDQonEER0BYpVIaKAdt_XP5i8OI8ow_kaCEXbNP1DhyKb6DIlzhhYZZlEhScTXOPz0V1w9aXsvmLz96WgJEw0w1G8E66Wpi4_uQyXC1AtE-i4_yJS65Dymtzu8VRqEgIQy04XnlVxwqQ-5JGKjba69in-uOjPZBVFdaYVmEoFxfFZdXoBY6y06SA7aO5HLtJuYIHtNyDrqHIu-HRjWDI_zgPW2z_pM7evoQWsmdkoaToU8o0mY"/>
          
          {/* Logout Action */}
          <button onClick={onLogout} className="ml-2 bg-error-container/20 text-error hover:bg-error-container hover:text-on-error-container p-2 rounded-full transition-colors flex items-center justify-center active:scale-95" title="Log Out">
            <span className="material-symbols-outlined text-sm" data-icon="logout">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
