export default function BehaviorTrendChart() {
  // Chart Data definitions correlating to the visual bar heights
  const chartData = [
    { day: "MON", containerH: "h-24", sentH: "h-16", sentHover: "h-20", sentVal: "65%", perfH: "h-12", perfVal: "50%" },
    { day: "TUE", containerH: "h-32", sentH: "h-24", sentHover: "h-28", sentVal: "75%", perfH: "h-18", perfVal: "60%" },
    { day: "WED", containerH: "h-48", sentH: "h-40", sentHover: "h-44", sentVal: "90%", perfH: "h-36", perfVal: "80%" },
    { day: "THU", containerH: "h-40", sentH: "h-20", sentHover: "h-24", sentVal: "65%", perfH: "h-30", perfVal: "70%" },
    { day: "FRI", containerH: "h-56", sentH: "h-48", sentHover: "h-52", sentVal: "95%", perfH: "h-50", perfVal: "90%" },
    { day: "SAT", containerH: "h-24", sentH: "h-10", sentHover: "h-14", sentVal: "40%", perfH: "h-14", perfVal: "50%" },
    { day: "SUN", containerH: "h-36", sentH: "h-24", sentHover: "h-28", sentVal: "75%", perfH: "h-20", perfVal: "65%" },
  ];

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
        {chartData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className={`w-full bg-surface-container-highest rounded-t-lg ${data.containerH} relative overflow-hidden`}>
              
              {/* Sentiment Bar */}
              <div className={`absolute bottom-0 w-full bg-secondary ${data.sentH} hover:${data.sentHover} transition-all duration-500 opacity-80 hover:opacity-100 flex justify-center group/sent z-10`}>
                 <span className="opacity-0 group-hover/sent:opacity-100 text-[10px] font-bold text-on-secondary-fixed mt-1 transition-opacity duration-300">
                   {data.sentVal}
                 </span>
              </div>
              
              {/* Performance Bar */}
              {/* Higher z-index to naturally interact cleanly on hover if it overlays, and uses pointer-events-auto */}
              <div className={`absolute bottom-0 w-full bg-tertiary ${data.perfH} hover:-translate-y-1 transition-all duration-500 opacity-60 hover:opacity-100 flex justify-center group/perf z-20`}>
                 <span className="opacity-0 group-hover/perf:opacity-100 text-[10px] font-bold text-on-tertiary-fixed mt-1 transition-opacity duration-300">
                   {data.perfVal}
                 </span>
              </div>

            </div>
            <span className="text-[10px] text-slate-500 font-label">{data.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
