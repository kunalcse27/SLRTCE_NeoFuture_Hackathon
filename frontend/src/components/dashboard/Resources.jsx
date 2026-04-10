export default function Resources() {
  return (
    <section className="space-y-8 pb-20">
      <h3 className="text-2xl font-bold font-headline">Recommended Resources</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cognitive Toolkit Card */}
        <div className="group bg-surface-container-low p-6 rounded-lg border border-outline-variant/10 hover:border-secondary/30 transition-all hover:bg-surface-container-high cursor-pointer relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-secondary" data-icon="extension">extension</span>
            </div>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Toolkit</span>
          </div>
          <h4 className="text-lg font-bold mb-2">Cognitive Toolkit</h4>
          <p className="text-sm text-on-surface-variant font-label mb-6">Advanced mental frameworks for problem solving and focus retention.</p>
          <div className="flex items-center gap-2 text-secondary text-xs font-bold">
            Explore Tools <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
          </div>
          {/* Abstract texture */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-all"></div>
        </div>
        {/* Meditation Card */}
        <div className="group bg-surface-container-low p-6 rounded-lg border border-outline-variant/10 hover:border-tertiary/30 transition-all hover:bg-surface-container-high cursor-pointer relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-tertiary" data-icon="self_improvement">self_improvement</span>
            </div>
            <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Session</span>
          </div>
          <h4 className="text-lg font-bold mb-2">Deep Focus Meditation</h4>
          <p className="text-sm text-on-surface-variant font-label mb-6">15-minute guided audio session designed to realign your focus before deep work.</p>
          <div className="flex items-center gap-2 text-tertiary text-xs font-bold">
            Start Session <span className="material-symbols-outlined text-sm" data-icon="play_circle">play_circle</span>
          </div>
          {/* Abstract texture */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-tertiary/5 rounded-full blur-2xl group-hover:bg-tertiary/10 transition-all"></div>
        </div>
        {/* Personalized Advice Card */}
        <div className="group bg-surface-container-low p-6 rounded-lg border border-outline-variant/10 hover:border-primary/30 transition-all hover:bg-surface-container-high cursor-pointer relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary" data-icon="psychology">psychology</span>
            </div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Intelligence</span>
          </div>
          <h4 className="text-lg font-bold mb-2">Smart Scheduling</h4>
          <p className="text-sm text-on-surface-variant font-label mb-6">Our AI suggests moving your math modules to 10:00 AM for peak alertness.</p>
          <div className="flex items-center gap-2 text-primary text-xs font-bold">
            Apply Suggestion <span className="material-symbols-outlined text-sm" data-icon="auto_mode">auto_mode</span>
          </div>
          {/* Abstract texture */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
        </div>
      </div>
    </section>
  );
}
