import BehaviorTrendChart from './dashboard/BehaviorTrendChart';

export default function InsightsPage() {
  return (
    <div className="pt-28 p-10 max-w-7xl mx-auto space-y-10 min-h-screen">
      {/* Page Header Asymmetry */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-5xl font-extrabold tracking-tighter text-on-surface font-headline leading-tight">
            Cognitive <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-tertiary">Insights.</span>
          </h2>
          <p className="text-on-surface-variant max-w-md font-label">Actionable recommendations and long-term behavioral trends based on your weekly activity.</p>
        </div>
      </div>
      
      {/* Top Section: Behavior Trend Chart */}
      <div className="w-full">
        <BehaviorTrendChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
        {/* Mental Health Context */}
        <section className="bg-surface-container-high rounded-lg p-8 border border-outline-variant/10 shadow-lg h-full">
           <h3 className="text-xl font-bold font-headline mb-6 text-on-surface">Weekly Progression Context</h3>
           <ul className="space-y-4 font-label text-sm">
             <li className="flex gap-3">
                <span className="material-symbols-outlined text-tertiary">trending_up</span>
                <span className="text-on-surface-variant">Your overall resilience increased by <span className="text-tertiary font-bold">12%</span> earlier in the week.</span>
             </li>
             <li className="flex gap-3">
                <span className="material-symbols-outlined text-secondary">show_chart</span>
                <span className="text-on-surface-variant">Focus baseline peaked on Wednesday during scheduled deep-work blocks.</span>
             </li>
             <li className="flex gap-3">
                <span className="material-symbols-outlined text-error">trending_down</span>
                <span className="text-on-surface-variant">Noticeable downgrade in emotional stability matching late-night activity patterns on Thursday.</span>
             </li>
             <li className="flex gap-3">
                <span className="material-symbols-outlined text-secondary">balance</span>
                <span className="text-on-surface-variant">Current weekly trajectory identifies a <span className="text-secondary font-bold">stabilizing metric</span> compared to last 7 days.</span>
             </li>
           </ul>
        </section>

        {/* Actionable Recommendations */}
        <section className="bg-surface-container-low rounded-lg border border-outline-variant/10 shadow-lg h-full overflow-hidden flex flex-col">
          <div className="p-8 pb-4">
             <h3 className="text-xl font-bold font-headline mb-2 text-on-surface">Targeted Recommendations</h3>
             <p className="text-xs text-slate-500 font-label">Automatically generated based on recent behavior analysis.</p>
          </div>
          
          <div className="flex-grow grid grid-rows-2">
            {/* Start Doing */}
            <div className="p-8 bg-secondary/5 border-t border-secondary/10 flex gap-4">
              <div className="mt-1">
                 <span className="material-symbols-outlined text-secondary text-3xl">add_circle</span>
              </div>
              <div>
                <h4 className="text-secondary font-bold uppercase tracking-widest text-xs mb-2">Start Doing</h4>
                <ul className="list-disc list-inside text-sm text-on-surface-variant font-label space-y-2">
                  <li>Exercise and stay physically active.</li>
                  <li>Being disciplined about your time.</li>
                  <li>Not delaying tasks unnecessarily.</li>
                  <li>Fixing strict time for entertainment.</li>
                </ul>
              </div>
            </div>

            {/* Stop Doing */}
            <div className="p-8 bg-error-container/10 border-t border-error/10 flex gap-4">
               <div className="mt-1">
                 <span className="material-symbols-outlined text-error text-3xl">remove_circle</span>
              </div>
              <div>
                <h4 className="text-error font-bold uppercase tracking-widest text-xs mb-2">Stop Doing</h4>
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
