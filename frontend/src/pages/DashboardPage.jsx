import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ subject, progress, gradient }) => {
    const navigate = useNavigate();
    
    return (
        <motion.div 
            onClick={() => navigate(`/dashboard/subject/${encodeURIComponent(subject)}`)}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative overflow-hidden rounded-[2rem] bg-[#1a1a1a] p-8 shadow-xl shadow-black/40 border border-white/5 flex flex-col justify-between min-h-[220px] cursor-pointer group"
        >
            {/* Ambient Glow */}
            <div className={`absolute -top-20 -left-20 w-48 h-48 rounded-full blur-[60px] opacity-40 bg-${gradient} group-hover:opacity-60 transition-opacity duration-500`} />
            
            <div className="relative z-10 flex flex-col h-full justify-center gap-8 text-center pt-2">
                <h3 className="text-3xl font-bold text-[#EAEAEA] tracking-tight">{subject}</h3>

                <div className="w-full mt-auto">
                    <div className="flex justify-between text-sm font-bold mb-3">
                        <span className="text-slate-300 tracking-wide uppercase">Progress</span>
                        <span className="text-slate-300">{progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full bg-${gradient}`} 
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    )
};

export default function DashboardPage() {
    const [mood, setMood] = useState('Neutral');
    
    // date
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="p-8 text-[#EAEAEA] min-h-screen font-manrope">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-white">Welcome back, Ajeet</h1>
                    <p className="text-slate-400 font-medium">{today}</p>
                </div>
                {/* Mood Selector */}
                <div className="bg-[#1a1a1a] p-1.5 rounded-2xl flex gap-1 border border-white/5 shadow-xl shadow-black/20">
                    {['Happy', 'Neutral', 'Stressed'].map(m => (
                        <button 
                            key={m} 
                            onClick={() => setMood(m)} 
                            className={`px-5 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold flex items-center gap-2 ${
                                mood === m 
                                ? 'bg-[#1DB954] text-[#121212] shadow-lg shadow-[#1DB954]/20' 
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <span className="text-lg">{m === 'Happy' ? '😊' : m === 'Neutral' ? '😐' : '😫'}</span>
                            {m}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
               <div className="xl:col-span-2 space-y-8">
                  {/* Task Section */}
                  <section>
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white tracking-tight">
                         <span className="material-symbols-outlined text-[#1DB954] bg-[#1DB954]/10 p-2 rounded-xl">task</span>
                         Your Tasks
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <TaskCard 
                              subject="Web Designing"
                              progress={90}
                              gradient="teal-500"
                          />
                          <TaskCard 
                              subject="Mobile App"
                              progress={30}
                              gradient="orange-500"
                          />
                          <TaskCard 
                              subject="Dashboard"
                              progress={50}
                              gradient="red-500"
                          />
                          <TaskCard 
                              subject="Web Designing"
                              progress={20}
                              gradient="blue-500"
                          />
                      </div>
                  </section>
               </div>
               <div className="space-y-6">
                   {/* Progress Section */}
                   <section className="bg-[#1a1a1a] rounded-[2rem] p-8 shadow-xl shadow-black/40 border border-white/5 relative overflow-hidden">
                       <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#1DB954]/20 rounded-full blur-[60px]" />
                       <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white relative z-10">
                           <span className="material-symbols-outlined text-[#1DB954]">trending_up</span>
                           Overall Progress
                       </h2>
                       <div className="flex items-end gap-4 mb-4 relative z-10">
                           <div className="text-6xl font-extrabold text-[#1DB954] tracking-tighter">68<span className="text-3xl">%</span></div>
                       </div>
                       <p className="text-sm text-slate-400 mb-6 font-medium relative z-10">of weekly goals completed</p>
                       <div className="h-2 bg-slate-800 rounded-full overflow-hidden relative z-10">
                           <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: "68%" }}
                               transition={{ duration: 1.5, ease: "easeOut" }}
                               className="h-full bg-gradient-to-r from-[#1DB954] to-teal-400 rounded-full" 
                           />
                       </div>
                   </section>

                   {/* Insights Section */}
                   <section className="bg-[#1a1a1a] rounded-[2rem] p-8 shadow-xl shadow-black/40 border border-white/5">
                       <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                          <span className="material-symbols-outlined text-[#FF5722] bg-[#FF5722]/10 p-2 rounded-xl">lightbulb</span>
                          Insights
                       </h2>
                       <div className="space-y-4">
                           <div className="bg-[#FF5722]/10 border border-[#FF5722]/20 p-5 rounded-2xl flex gap-4 items-start transition-all hover:bg-[#FF5722]/15">
                               <span className="material-symbols-outlined text-[#FF5722] mt-0.5">warning</span>
                               <div>
                                   <p className="text-sm font-extrabold text-[#FF5722] mb-1">Weak Area</p>
                                   <p className="text-sm text-slate-300 font-medium leading-relaxed">You are struggling in SQL. Consider reviewing the basics.</p>
                               </div>
                           </div>
                           <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex gap-4 items-start transition-all hover:bg-red-500/15">
                               <span className="material-symbols-outlined text-red-500 mt-0.5">error</span>
                               <div>
                                   <p className="text-sm font-extrabold text-red-500 mb-1">Alert</p>
                                   <p className="text-sm text-slate-300 font-medium leading-relaxed">Too many pending tasks in Advanced Data Structures.</p>
                               </div>
                           </div>
                           <div className="bg-[#1DB954]/10 border border-[#1DB954]/20 p-5 rounded-2xl flex gap-4 items-start transition-all hover:bg-[#1DB954]/15">
                               <span className="material-symbols-outlined text-[#1DB954] mt-0.5">check_circle</span>
                               <div>
                                   <p className="text-sm font-extrabold text-[#1DB954] mb-1">Suggestion</p>
                                   <p className="text-sm text-slate-300 font-medium leading-relaxed">Revise Arrays before starting Trees. Take a break if needed.</p>
                               </div>
                           </div>
                       </div>
                   </section>
               </div>
            </div>
        </div>
    )
}
