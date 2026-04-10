export default function AlertPanel() {
  return (
    <section className="glass-panel rounded-lg p-8 border border-outline-variant/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-error shadow-[0_0_20px_rgba(255,180,171,0.5)]"></div>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-error-container/20 flex items-center justify-center relative">
            <span className="material-symbols-outlined text-error text-3xl" data-icon="emergency_home">emergency_home</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full animate-pulse shadow-[0_0_10px_rgba(255,180,171,0.8)]"></div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-error">Synchronized Alert: Risk Detected</h3>
            <p className="text-on-surface-variant text-sm max-w-lg">We detected an unusual pattern in your quiz performance correlated with late-night activity. Your baseline resilience has decreased by 14%.</p>
          </div>
        </div>
        <button className="text-error font-bold text-sm flex items-center gap-2 hover:underline">
          View Analysis <span className="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
        </button>
      </div>
    </section>
  );
}
