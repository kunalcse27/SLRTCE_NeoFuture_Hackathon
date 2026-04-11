import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ subjectId, subjectName, progress, gradient }) => {
    const navigate = useNavigate();
    
    return (
        <motion.div 
            onClick={() => navigate(`/dashboard/subject/${subjectId}`)}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative overflow-hidden rounded-[2rem] bg-[#1a1a1a] p-8 shadow-xl shadow-black/40 border border-white/5 flex flex-col justify-between min-h-[220px] cursor-pointer group"
        >
            {/* Ambient Glow */}
            <div className={`absolute -top-20 -left-20 w-48 h-48 rounded-full blur-[60px] opacity-40 ${gradient} group-hover:opacity-60 transition-opacity duration-500`} />
            
            <div className="relative z-10 flex flex-col h-full justify-center gap-8 text-center pt-2">
                <h3 className="text-3xl font-bold text-[#EAEAEA] tracking-tight">{subjectName}</h3>

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
                            className={`h-full rounded-full ${gradient}`} 
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    )
};

export default function DashboardPage() {
    const [mood, setMood] = useState('Neutral');
    const [subjects, setSubjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                
                const [subjectsRes, tasksRes] = await Promise.all([
                    fetch('http://localhost:3000/api/subjects', { headers: { 'Authorization': `Bearer ${token}` } }),
                    fetch('http://localhost:3000/api/tasks', { headers: { 'Authorization': `Bearer ${token}` } })
                ]);
                
                if (subjectsRes.ok) {
                    setSubjects(await subjectsRes.json());
                }
                if (tasksRes.ok) {
                    setTasks(await tasksRes.json());
                }
            } catch (err) {
                console.error("Network error fetching dashboard data:", err);
            }
        };
        loadDashboardData();
    }, []);

    // session data
    const storedUser = localStorage.getItem('user') || localStorage.getItem('alws_session');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const firstName = user?.name 
      ? user.name.split(' ')[0] 
      : (user?.firstName || 'Student');

    // date
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    const userId = user?._id || user?.id || 'unknown';

    const totalTasks = tasks.length;
    let totalCompleted = 0;
    
    const subjectsWithProgress = subjects.map(sub => {
        const completedMap = JSON.parse(localStorage.getItem(`completedTasks_${userId}_${sub._id}`) || '[]');
        const subTasks = tasks.filter(t => t.subject === sub._id);
        const validCompleted = completedMap.filter(id => subTasks.some(t => t._id === id));
        totalCompleted += validCompleted.length;
        const progress = subTasks.length === 0 ? 0 : Math.round((validCompleted.length / subTasks.length) * 100);
        return { ...sub, progress };
    });

    const overallProgress = totalTasks === 0 ? 0 : Math.round((totalCompleted / totalTasks) * 100);

    const advices = [];
    subjectsWithProgress.forEach((sub, index) => {
        if (sub.progress === 0) {
            advices.push({
                id: `not-started-${sub._id}`,
                title: 'Alert',
                message: `You haven't started. Start ${sub.name}.`,
                icon: 'error',
                colorClass: 'text-red-500',
                bgClass: 'bg-red-500/10',
                borderClass: 'border-red-500/20',
                hoverClass: 'hover:bg-red-500/15'
            });
        } else if (sub.progress < 25) {
            const isBehind = index % 2 === 0;
            if (isBehind) {
                advices.push({
                    id: `behind-${sub._id}`,
                    title: 'Weak Area',
                    message: `You are way behind in ${sub.name}.`,
                    icon: 'warning',
                    colorClass: 'text-[#FF5722]',
                    bgClass: 'bg-[#FF5722]/10',
                    borderClass: 'border-[#FF5722]/20',
                    hoverClass: 'hover:bg-[#FF5722]/15'
                });
            } else {
                advices.push({
                    id: `focus-${sub._id}`,
                    title: 'Alert',
                    message: `Focus on ${sub.name}.`,
                    icon: 'error',
                    colorClass: 'text-red-500',
                    bgClass: 'bg-red-500/10',
                    borderClass: 'border-red-500/20',
                    hoverClass: 'hover:bg-red-500/15'
                });
            }
        }
    });

    if (advices.length === 0 && subjectsWithProgress.length > 0) {
        advices.push({
            id: 'on-track',
            title: 'Suggestion',
            message: 'You are doing great in all your subjects! Keep it up.',
            icon: 'check_circle',
            colorClass: 'text-[#1DB954]',
            bgClass: 'bg-[#1DB954]/10',
            borderClass: 'border-[#1DB954]/20',
            hoverClass: 'hover:bg-[#1DB954]/15'
        });
    }

    return (
        <div className="p-8 text-[#EAEAEA] min-h-screen font-manrope">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-white">Welcome back, {firstName}</h1>
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
                         Your Subjects
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {subjectsWithProgress.map((sub, index) => {
                              const gradients = ['bg-teal-500', 'bg-orange-500', 'bg-red-500', 'bg-blue-500', 'bg-purple-500'];
                              const gradient = gradients[index % gradients.length];

                              return (
                                  <TaskCard 
                                      key={sub._id}
                                      subjectId={sub._id}
                                      subjectName={sub.name}
                                      progress={sub.progress}
                                      gradient={gradient}
                                  />
                              );
                          })}
                          {subjectsWithProgress.length === 0 && (
                              <p className="text-slate-400 mt-2">No subjects assigned yet.</p>
                          )}
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
                           <div className="text-6xl font-extrabold text-[#1DB954] tracking-tighter">{overallProgress}<span className="text-3xl">%</span></div>
                       </div>
                       <p className="text-sm text-slate-400 mb-6 font-medium relative z-10">of assigned goals completed</p>
                       <div className="h-2 bg-slate-800 rounded-full overflow-hidden relative z-10">
                           <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${overallProgress}%` }}
                               transition={{ duration: 1.5, ease: "easeOut" }}
                               className="h-full bg-gradient-to-r from-[#1DB954] to-teal-400 rounded-full" 
                           />
                       </div>
                   </section>

                   {/* Advices Section */}
                   <section className="bg-[#1a1a1a] rounded-[2rem] p-8 shadow-xl shadow-black/40 border border-white/5">
                       <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                          <span className="material-symbols-outlined text-[#FF5722] bg-[#FF5722]/10 p-2 rounded-xl">lightbulb</span>
                          Advices
                       </h2>
                       <div className="space-y-4">
                           {advices.length > 0 ? advices.map(advice => (
                               <div key={advice.id} className={`${advice.bgClass} border ${advice.borderClass} p-5 rounded-2xl flex gap-4 items-start transition-all ${advice.hoverClass}`}>
                                   <span className={`material-symbols-outlined ${advice.colorClass} mt-0.5`}>{advice.icon}</span>
                                   <div>
                                       <p className={`text-sm font-extrabold ${advice.colorClass} mb-1`}>{advice.title}</p>
                                       <p className="text-sm text-slate-300 font-medium leading-relaxed">{advice.message}</p>
                                   </div>
                               </div>
                           )) : (
                               <p className="text-slate-400 text-sm">No advices at the moment.</p>
                           )}
                       </div>
                   </section>
               </div>
            </div>
        </div>
    )
}
