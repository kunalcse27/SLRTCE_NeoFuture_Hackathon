import { motion } from 'framer-motion';

// --- Sub-components (Grouped for easier management as requested) ---

const SentimentIndicator = ({ score = 0.72 }) => {
  const getGradient = (val) => {
    if (val < 0.3) return 'from-red-500 to-orange-500';
    if (val < 0.7) return 'from-orange-400 to-teal-400';
    return 'from-teal-400 to-emerald-500';
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-outline-variant/15 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Current Sentiment</h3>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/20">
          {Math.round(score * 100)}% Stability
        </span>
      </div>
      <div className="relative h-4 w-full bg-surface-container-highest rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getGradient(score)} shadow-lg shadow-black/20`}
        />
      </div>
      <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
        <span>Critical</span>
        <span>Neutral</span>
        <span>Optimal</span>
      </div>
      <p className="text-xs text-on-surface-variant leading-relaxed">
        {score < 0.4 ? 'Emotional stability is dipping. Consider early intervention.' : 'Overall sentiment remains in the optimal range.'}
      </p>
    </div>
  );
};

const AlertPanel = () => {
  const alerts = [
    { id: 1, title: "Focus Baseline Shift", student: "Aarav", desc: "Detected an unusual pattern in quiz performance correlated with late-night activity.", impact: "-14% Resilience", severity: "High" },
    { id: 2, title: "Supportive Re-engagement", student: "Meera", desc: "Successfully completed focus exercise. Baseline stability improving.", impact: "+8% Stability", severity: "Low" }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Recent System Alerts</h3>
        <span className="text-teal-400 text-xs font-bold hover:underline cursor-pointer">Clear All</span>
      </div>
      {alerts.map((alert, index) => (
        <motion.section 
          key={alert.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-panel rounded-3xl p-6 border border-outline-variant/10 relative overflow-hidden group cursor-pointer"
        >
          <div className={`absolute top-0 left-0 w-1.5 h-full ${alert.severity === 'High' ? 'bg-red-500' : 'bg-teal-400'} shadow-lg`} />
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center relative ${alert.severity === 'High' ? 'bg-red-500/10' : 'bg-teal-400/10'}`}>
                <span className={`material-symbols-outlined text-2xl ${alert.severity === 'High' ? 'text-red-400' : 'text-teal-400'}`} data-icon={alert.severity === 'High' ? "emergency_home" : "check_circle"}>{alert.severity === 'High' ? "emergency_home" : "check_circle"}</span>
                {alert.severity === 'High' && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className={`text-base font-bold ${alert.severity === 'High' ? 'text-red-400' : 'text-teal-400'}`}>{alert.title}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-highest text-slate-400 border border-outline-variant/10 uppercase tracking-tighter">{alert.student}</span>
                </div>
                <p className="text-on-surface-variant text-xs leading-relaxed max-w-lg">{alert.desc}</p>
              </div>
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              <span className={`text-xs font-bold ${alert.severity === 'High' ? 'text-red-400' : 'text-teal-400'}`}>{alert.impact}</span>
              <button className="text-slate-500 group-hover:text-on-surface transition-colors p-1">
                <span className="material-symbols-outlined text-sm" data-icon="more_vert">more_vert</span>
              </button>
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
};

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
    <section className="glass-panel rounded-3xl p-8 border border-outline-variant/10 mt-8">
      <div className="flex justify-between items-center mb-10">
        <div className="space-y-1">
          <h3 className="text-xl font-bold font-headline text-on-surface">Behavioral Baseline</h3>
          <p className="text-xs text-on-surface-variant font-label uppercase tracking-widest leading-none">Sentiment vs. Performance (7D)</p>
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
      <div className="h-48 flex items-end justify-between gap-3 px-2">
        {chartData.map((item, index) => (
          <div key={item.day} className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-surface-container-highest rounded-2xl h-full relative overflow-hidden group min-h-[100px]">
              <motion.div initial={{ height: 0 }} animate={{ height: `${item.sent}%` }} transition={{ delay: index * 0.05 + 0.3, duration: 0.8, ease: "easeOut" }} className="absolute bottom-0 w-full bg-secondary group-hover:brightness-110 shadow-lg shadow-black/20 opacity-80 z-10 flex justify-center" />
              <motion.div initial={{ height: 0 }} animate={{ height: `${item.perf}%` }} transition={{ delay: index * 0.05 + 0.5, duration: 0.8, ease: "easeOut" }} className="absolute bottom-0 w-full bg-tertiary opacity-40 z-0 flex justify-center pt-4" />
            </div>
            <span className="text-[10px] text-slate-500 font-bold tracking-tighter">{item.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const MoodTracker = () => (
  <section className="glass-panel rounded-3xl p-8 border border-outline-variant/15">
    <div className="flex items-center justify-between mb-8">
      <h3 className="text-lg font-bold font-headline text-on-surface">Mood Tracker</h3>
      <span className="material-symbols-outlined text-tertiary" data-icon="mood">mood</span>
    </div>
    <div className="space-y-10">
      <div className="flex justify-between px-2">
        <span className="text-3xl filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 cursor-pointer transition-all">😔</span>
        <span className="text-3xl filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 cursor-pointer transition-all">😐</span>
        <span className="text-3xl scale-125 filter grayscale-0 opacity-100 cursor-pointer transition-all">😊</span>
        <span className="text-3xl filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 cursor-pointer transition-all">🤩</span>
      </div>
      <div className="relative pt-1">
        <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-secondary to-tertiary" style={{width: '72%'}}></div>
        </div>
        <div className="absolute top-0 left-[72%] -ml-3 -mt-1 h-5 w-5 bg-on-surface rounded-full shadow-lg border-2 border-secondary"></div>
      </div>
      <p className="text-center text-xs font-label text-on-surface-variant italic">"I'm feeling focused and steady today."</p>
    </div>
  </section>
);

const MentalJournal = () => (
  <section className="glass-panel rounded-3xl p-8 border border-outline-variant/15 space-y-6">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-bold font-headline text-on-surface">Mental Journal</h3>
      <div className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-wider">Positivity: 82%</div>
    </div>
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-surface-container-highest/40 border-l-2 border-tertiary">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-label text-slate-500 uppercase font-bold pr-2">MAY 24, 09:15 AM</span>
          <span className="material-symbols-outlined text-tertiary text-xs" data-icon="auto_awesome">auto_awesome</span>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">Reflecting on the study session today. I felt a bit overwhelmed initially but managed to find flow...</p>
      </div>
    </div>
    <button className="w-full mt-4 py-4 rounded-2xl border border-outline-variant/20 text-xs font-bold uppercase tracking-widest hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2">
      <span className="material-symbols-outlined text-lg" data-icon="edit_note">edit_note</span>
      Write Entry
    </button>
  </section>
);

const Resources = () => {
  const resources = [
    { title: "Cognitive Toolkit", label: "Toolkit", icon: "extension", color: "secondary", desc: "Advanced mental frameworks for focus retention." },
    { title: "Deep Focus", label: "Session", icon: "self_improvement", color: "tertiary", desc: "15-minute guided audio to realign your focus." },
    { title: "Smart Schedule", label: "Intelligence", icon: "psychology", color: "primary", desc: "AI suggestions for peak alertness windows." }
  ];

  return (
    <section className="space-y-8 pb-20">
      <h3 className="text-2xl font-bold font-headline text-on-surface">Recommended Resources</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-on-surface">
        {resources.map((res) => (
          <div key={res.title} className="group glass-panel p-6 rounded-3xl border border-outline-variant/10 hover:border-secondary/30 transition-all cursor-pointer relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-2xl bg-${res.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <span className={`material-symbols-outlined text-${res.color}`} data-icon={res.icon}>{res.icon}</span>
              </div>
              <span className={`text-[10px] font-bold text-${res.color} uppercase tracking-widest`}>{res.label}</span>
            </div>
            <h4 className="text-lg font-bold mb-2">{res.title}</h4>
            <p className="text-xs text-on-surface-variant font-label mb-6 leading-relaxed">{res.desc}</p>
            <div className={`flex items-center gap-2 text-${res.color} text-[10px] font-bold uppercase tracking-widest`}>
              Explore <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- Main Dashboard Page ---

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface font-headline leading-tight">
            Morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-tertiary">Aarav.</span>
          </h2>
          <p className="text-on-surface-variant max-w-md font-label text-base">Your cognitive performance is stable, but we've noted a slight shift in your focus baseline.</p>
        </motion.div>
        <div className="flex gap-3">
          <button className="px-6 py-3 rounded-full bg-surface-container-highest border border-outline-variant/15 text-sm font-semibold hover:bg-surface-bright transition-all active:scale-95">Download Report</button>
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-secondary to-tertiary text-on-secondary-fixed text-sm font-bold shadow-lg shadow-secondary/20 hover:brightness-110 transition-all active:scale-95">Action Required</button>
        </div>
      </div>
      
      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <AlertPanel />
          <BehaviorTrendChart />
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <SentimentIndicator score={0.72} />
          <MoodTracker />
          <MentalJournal />
          <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} className="mx-auto mt-4 w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-tertiary text-on-secondary-fixed shadow-2xl flex items-center justify-center group z-10 block">
            <span className="material-symbols-outlined text-3xl" data-icon="add">add</span>
          </motion.button>
        </div>
      </div>
      <Resources />
    </div>
  );
}
