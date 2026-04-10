import { motion } from 'framer-motion';

// --- Sub-components (Grouped for self-contained page) ---

const BehaviorTrendChart = () => {
  const chartData = [
    { day: "MON", sent: 65, perf: 50 },
    { day: "TUE", sent: 75, perf: 60 },
    { day: "WED", sent: 90, perf: 80 },
    { day: "THU", sent: 65, perf: 70 },
    { day: "FRI", sent: 95, perf: 90 },
    { day: "SAT", sent: 40, perf: 50 },
    { day: "SUN", sent: 75, perf: 65 },
  ];

  return (
    <section className="glass-panel rounded-3xl p-8 border border-outline-variant/10">
      <div className="flex justify-between items-center mb-10">
        <div className="space-y-1">
          <h3 className="text-xl font-bold font-headline text-on-surface">Behavioral Baseline</h3>
          <p className="text-xs text-on-surface-variant font-label uppercase tracking-widest leading-none">Long-term Trend Analysis (7D)</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tight">Sentiment</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tight">Performance</span>
          </div>
        </div>
      </div>
      <div className="h-64 flex items-end justify-between gap-3 px-2">
        {chartData.map((item, index) => (
          <div key={item.day} className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-surface-container-highest rounded-2xl h-full relative overflow-hidden group min-h-[100px]">
              <motion.div initial={{ height: 0 }} animate={{ height: `${item.sent}%` }} transition={{ delay: index * 0.05 + 0.3, duration: 0.8, ease: "easeOut" }} className="absolute bottom-0 w-full bg-secondary group-hover:brightness-110 opacity-80 z-10" />
              <motion.div initial={{ height: 0 }} animate={{ height: `${item.perf}%` }} transition={{ delay: index * 0.05 + 0.5, duration: 0.8, ease: "easeOut" }} className="absolute bottom-0 w-full bg-tertiary opacity-40 z-0" />
            </div>
            <span className="text-[10px] text-slate-500 font-bold tracking-tighter">{item.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- Main Insights Page ---

export default function InsightsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface font-headline leading-tight">
            Cognitive <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-tertiary">Insights.</span>
          </h2>
          <p className="text-on-surface-variant max-w-md font-label text-base">Actionable recommendations based on your long-term behavioral trends.</p>
        </motion.div>
      </div>
      
      {/* Behavior Trend Chart */}
      <div className="w-full">
        <BehaviorTrendChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
        {/* Weekly Context */}
        <section className="glass-panel rounded-3xl p-8 border border-outline-variant/10 shadow-lg h-full">
           <h3 className="text-xl font-bold font-headline mb-6 text-on-surface">Weekly Progression Context</h3>
           <ul className="space-y-4 font-label text-sm text-on-surface-variant">
             {[
               { icon: 'trending_up', color: 'tertiary', text: 'Overall resilience increased by <span class="text-tertiary font-bold">12%</span> last week.' },
               { icon: 'show_chart', color: 'secondary', text: 'Focus baseline peaked during scheduled deep-work blocks.' },
               { icon: 'trending_down', color: 'red-400', text: 'Emotional stability dipped matching late-night activity patterns.' },
               { icon: 'balance', color: 'secondary', text: 'Current trajectory identifies a <span class="text-secondary font-bold">stabilizing metric</span> compared to last 7 days.' }
             ].map((item, i) => (
               <li key={i} className="flex gap-4 p-3 rounded-2xl bg-surface-container-highest/20">
                 <span className={`material-symbols-outlined text-${item.color}`}>{item.icon}</span>
                 <span dangerouslySetInnerHTML={{ __html: item.text }} />
               </li>
             ))}
           </ul>
        </section>

        {/* Actionable Recommendations */}
        <section className="glass-panel rounded-3xl border border-outline-variant/10 shadow-lg h-full overflow-hidden flex flex-col">
          <div className="p-8 pb-4">
             <h3 className="text-xl font-bold font-headline mb-2 text-on-surface">Targeted Recommendations</h3>
             <p className="text-xs text-slate-500 font-label uppercase tracking-widest font-bold">AI Generated Insights</p>
          </div>
          
          <div className="flex-grow grid grid-rows-2">
            <div className="p-8 bg-secondary/5 border-t border-secondary/10 flex gap-4 transition-colors hover:bg-secondary/10">
              <div className="mt-1">
                 <span className="material-symbols-outlined text-secondary text-3xl">add_circle</span>
              </div>
              <div>
                <h4 className="text-secondary font-bold uppercase tracking-widest text-xs mb-3">Start Doing</h4>
                <ul className="list-disc list-inside text-sm text-on-surface-variant font-label space-y-2">
                  <li>Exercise and stay physically active.</li>
                  <li>Discipline your time and avoid delays.</li>
                  <li>Strict time for entertainment.</li>
                </ul>
              </div>
            </div>

            <div className="p-8 bg-red-500/5 border-t border-red-500/10 flex gap-4 transition-colors hover:bg-red-500/10">
               <div className="mt-1">
                 <span className="material-symbols-outlined text-red-400 text-3xl">remove_circle</span>
              </div>
              <div>
                <h4 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-3">Stop Doing</h4>
                <ul className="list-disc list-inside text-sm text-on-surface-variant font-label space-y-2">
                  <li>Tension and unnecessary stress.</li>
                  <li>Overthinking simple decisions.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
