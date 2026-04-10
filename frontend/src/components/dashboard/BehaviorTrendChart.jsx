export default function BehaviorTrendChart() {
  return (
    <section className="bg-surface-container-low rounded-lg p-8 border border-outline-variant/10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-2xl font-bold font-headline">Behavioral Baseline</h3>
          <p className="text-sm text-on-surface-variant font-label">Sentiment Analysis vs. Quiz Performance (Last 7 Days)</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-secondary"></span>
            <span className="text-xs text-on-surface-variant font-label">Sentiment</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-tertiary"></span>
            <span className="text-xs text-on-surface-variant font-label">Performance</span>
          </div>
        </div>
      </div>
      <div className="h-64 flex items-end justify-between gap-2 px-4 wellbeing-pulse">
        {/* Chart Mockup with Tonal Layering Bars */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-surface-container-highest rounded-t-lg h-24 relative overflow-hidden group">
            <div className="absolute bottom-0 w-full bg-secondary h-16 group-hover:h-20 transition-all duration-500 opacity-80"></div>
            <div className="absolute bottom-0 w-full bg-tertiary h-12 opacity-60"></div>
          </div>
          <span className="text-[10px] text-slate-500 font-label">MON</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-surface-container-highest rounded-t-lg h-32 relative overflow-hidden group">
            <div className="absolute bottom-0 w-full bg-secondary h-24 group-hover:h-28 transition-all duration-500 opacity-80"></div>
            <div className="absolute bottom-0 w-full bg-tertiary h-18 opacity-60"></div>
          </div>
          <span className="text-[10px] text-slate-500 font-label">TUE</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-surface-container-highest rounded-t-lg h-48 relative overflow-hidden group">
            <div className="absolute bottom-0 w-full bg-secondary h-40 group-hover:h-44 transition-all duration-500 opacity-80"></div>
            <div className="absolute bottom-0 w-full bg-tertiary h-36 opacity-60"></div>
          </div>
          <span className="text-[10px] text-slate-500 font-label">WED</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-surface-container-highest rounded-t-lg h-40 relative overflow-hidden group">
            <div className="absolute bottom-0 w-full bg-secondary h-20 group-hover:h-24 transition-all duration-500 opacity-80"></div>
            <div className="absolute bottom-0 w-full bg-tertiary h-30 opacity-60"></div>
          </div>
          <span className="text-[10px] text-slate-500 font-label">THU</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-surface-container-highest rounded-t-lg h-56 relative overflow-hidden group">
            <div className="absolute bottom-0 w-full bg-secondary h-48 group-hover:h-52 transition-all duration-500 opacity-80"></div>
            <div className="absolute bottom-0 w-full bg-tertiary h-50 opacity-60"></div>
          </div>
          <span className="text-[10px] text-slate-500 font-label">FRI</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-surface-container-highest rounded-t-lg h-24 relative overflow-hidden group">
            <div className="absolute bottom-0 w-full bg-secondary h-10 group-hover:h-14 transition-all duration-500 opacity-80"></div>
            <div className="absolute bottom-0 w-full bg-tertiary h-14 opacity-60"></div>
          </div>
          <span className="text-[10px] text-slate-500 font-label">SAT</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-surface-container-highest rounded-t-lg h-36 relative overflow-hidden group">
            <div className="absolute bottom-0 w-full bg-secondary h-24 group-hover:h-28 transition-all duration-500 opacity-80"></div>
            <div className="absolute bottom-0 w-full bg-tertiary h-20 opacity-60"></div>
          </div>
          <span className="text-[10px] text-slate-500 font-label">SUN</span>
        </div>
      </div>
    </section>
  );
}
