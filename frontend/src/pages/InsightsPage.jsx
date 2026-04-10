import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InsightsPage() {
  const [mood, setMood] = useState('Neutral');

  // Hardcoded trend for 7 days
  const trend = [
    { day: "Mon", state: "Happy", icon: "😄" },
    { day: "Tue", state: "Stressed", icon: "😞" },
    { day: "Wed", state: "Neutral", icon: "😐" },
    { day: "Thu", state: "Stressed", icon: "😞" },
    { day: "Fri", state: "Happy", icon: "😄" },
    { day: "Sat", state: "Stressed", icon: "😞" },
    { day: "Sun", state: mood, icon: mood === 'Happy' ? '😄' : mood === 'Neutral' ? '😐' : '😞' } // Current day reactive
  ];

  const stressedCount = trend.filter(t => t.state === 'Stressed').length;

  const getSuggestions = () => {
    switch (mood) {
      case 'Stressed':
        return [
          { icon: 'self_improvement', text: 'Take a short break' },
          { icon: 'directions_walk', text: 'Go for a walk' },
          { icon: 'backspace', text: 'Avoid overloading yourself' }
        ];
      case 'Happy':
        return [
          { icon: 'celebration', text: 'Great job, keep going!' },
          { icon: 'star_rate', text: 'Tackle that hard task now!' }
        ];
      case 'Neutral':
      default:
        return [
          { icon: 'task_alt', text: 'Stay consistent' },
          { icon: 'water_drop', text: 'Stay hydrated focus' }
        ];
    }
  };

  const suggestions = getSuggestions();

  return (
    <div className="p-8 text-[#EAEAEA] min-h-screen font-manrope">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1DB954]/10 flex items-center justify-center border border-[#1DB954]/20">
            <span className="material-symbols-outlined text-[#1DB954] text-2xl" data-icon="psychology">psychology</span>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">Mental Wellbeing</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Self Care & Insights</p>
          </div>
        </div>

        {/* 1. Mood Selector (Top Section) */}
        <section className="bg-[#1a1a1a] rounded-[2rem] p-8 shadow-xl shadow-black/40 border border-white/5 relative overflow-hidden">
           <h2 className="text-xl font-black mb-6 text-white tracking-tight flex items-center gap-2">
               How are you feeling today?
           </h2>
           <div className="flex flex-wrap gap-4 relative z-10">
              {[
                  { name: 'Happy', emoji: '😄', color: 'hover:bg-[#1DB954]/20 hover:border-[#1DB954]/30', active: 'bg-[#1DB954]/20 border-[#1DB954] text-[#1DB954]' },
                  { name: 'Neutral', emoji: '😐', color: 'hover:bg-blue-400/20 hover:border-blue-400/30', active: 'bg-blue-400/20 border-blue-400 text-blue-400' },
                  { name: 'Stressed', emoji: '😞', color: 'hover:bg-[#FF5722]/20 hover:border-[#FF5722]/30', active: 'bg-[#FF5722]/20 border-[#FF5722] text-[#FF5722]' }
              ].map(m => (
                  <motion.button 
                      key={m.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setMood(m.name)}
                      className={`flex-1 flex flex-col items-center justify-center py-6 px-4 rounded-2xl border-2 transition-all duration-300 font-bold ${mood === m.name ? m.active : `bg-[#121212] border-white/5 text-slate-400 ${m.color}`}`}
                  >
                      <span className="text-4xl mb-2">{m.emoji}</span>
                      <span className="tracking-wide">{m.name}</span>
                  </motion.button>
              ))}
           </div>
        </section>

        {/* Conditional Stress Alert */}
        <AnimatePresence>
          {stressedCount >= 3 && (
            <motion.section 
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
               className="bg-[#FF5722]/10 border border-[#FF5722]/30 rounded-2xl p-6 flex gap-4 items-start shadow-lg shadow-[#FF5722]/5"
            >
               <div className="w-10 h-10 rounded-full bg-[#FF5722]/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#FF5722]" data-icon="warning">warning</span>
               </div>
               <div>
                  <h3 className="text-[#FF5722] font-black text-lg mb-1 tracking-tight">Wellbeing Alert</h3>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed">
                     You seem stressed for the past few days. It's completely okay to step back and prioritize your mental health right now.
                  </p>
               </div>
            </motion.section>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* 2. Mood Trend (Middle Section) */}
           <section className="bg-[#1a1a1a] rounded-[2rem] p-8 shadow-xl shadow-black/40 border border-white/5 flex flex-col">
              <h2 className="text-lg font-black mb-6 text-white tracking-tight flex items-center gap-2">
                 <span className="material-symbols-outlined text-teal-400" data-icon="history">history</span>
                 Past 7 Days
              </h2>
              <div className="flex justify-between items-end flex-grow gap-2 px-2">
                 {trend.map((day, i) => (
                    <div key={day.day} className="flex flex-col items-center gap-3">
                       <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-2xl filter drop-shadow-md"
                       >
                          {day.icon}
                       </motion.div>
                       <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">{day.day}</span>
                    </div>
                 ))}
              </div>
           </section>

           {/* 4. Suggestions Section */}
           <section className="bg-[#1a1a1a] rounded-[2rem] p-8 shadow-xl shadow-black/40 border border-white/5">
              <h2 className="text-lg font-black mb-6 text-white tracking-tight flex items-center gap-2">
                 <span className="material-symbols-outlined text-[#1DB954]" data-icon="lightbulb">lightbulb</span>
                 Suggestions
              </h2>
              <ul className="space-y-4">
                 {suggestions.map((sug, i) => (
                    <motion.li 
                      key={sug.text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 bg-[#121212] p-4 rounded-xl border border-white/5"
                    >
                       <span className={`material-symbols-outlined ${mood === 'Stressed' ? 'text-[#FF5722]' : mood === 'Happy' ? 'text-[#1DB954]' : 'text-blue-400'}`} data-icon={sug.icon}>{sug.icon}</span>
                       <span className="text-sm font-bold text-slate-300">{sug.text}</span>
                    </motion.li>
                 ))}
              </ul>
           </section>
        </div>

        {/* 5. Quick Actions (Bottom Section) */}
        <section className="bg-[#1a1a1a] rounded-[2rem] p-8 shadow-xl shadow-black/40 border border-white/5 relative overflow-hidden">
           <h2 className="text-lg font-black mb-6 text-white tracking-tight flex items-center gap-2">
               <span className="material-symbols-outlined text-white/50" data-icon="bolt">bolt</span>
               Quick Actions
           </h2>
           <div className="flex flex-wrap gap-4">
              {[
                 { text: "Take a 5 min break", icon: "timer" },
                 { text: "Listen to music", icon: "headphones" },
                 { text: "Stretch for a while", icon: "accessibility_new" }
              ].map(action => (
                 <motion.button 
                    key={action.text}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 min-w-[200px] flex items-center justify-center gap-3 py-4 px-6 bg-[#121212] border border-white/10 hover:border-white/30 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-all shadow-md"
                 >
                    <span className="material-symbols-outlined text-lg" data-icon={action.icon}>{action.icon}</span>
                    {action.text}
                 </motion.button>
              ))}
           </div>
        </section>

      </div>
    </div>
  );
}
