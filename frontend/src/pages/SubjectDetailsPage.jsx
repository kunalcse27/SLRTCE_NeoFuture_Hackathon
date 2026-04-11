import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SubjectDetailsPage() {
    const params = useParams();
    const subjectId = params.subjectId || params.subjectName; 
    const navigate = useNavigate();
    
    const storedUser = localStorage.getItem('user') || localStorage.getItem('alws_session');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?._id || user?.id || 'unknown';

    const [tasks, setTasks] = useState([]);
    const [subjectTitle, setSubjectTitle] = useState('Workspace');
    
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token || !subjectId) return;
                
                const response = await fetch(`http://localhost:3000/api/tasks?subjectId=${subjectId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setTasks(data);
                } else {
                    console.error("Failed to fetch tasks");
                }
                
                const subRes = await fetch('http://localhost:3000/api/subjects', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (subRes.ok) {
                    const subs = await subRes.json();
                    const targetSub = subs.find(s => s._id === subjectId);
                    if (targetSub) setSubjectTitle(targetSub.name);
                }
            } catch (err) {
                console.error("Network error fetching tasks:", err);
            }
        };
        fetchTasks();

        const storedCompleted = JSON.parse(localStorage.getItem(`completedTasks_${userId}_${subjectId}`) || '[]');
        setCompletedTasks(storedCompleted);
    }, [subjectId, userId]);

    const [completedTasks, setCompletedTasks] = useState([]);
    
    const toggleTask = (taskId, status) => {
        let newCompleted;
        if (status === 'completed') {
            if (!completedTasks.includes(taskId)) {
                newCompleted = [...completedTasks, taskId];
            } else {
                return;
            }
        } else {
            newCompleted = completedTasks.filter(id => id !== taskId);
        }
        setCompletedTasks(newCompleted);
        localStorage.setItem(`completedTasks_${userId}_${subjectId}`, JSON.stringify(newCompleted));
    };

    const progress = tasks.length === 0 ? 0 : Math.round((completedTasks.length / tasks.length) * 100);

    return (
        <div className="p-8 text-[#EAEAEA] min-h-screen font-manrope">
            {/* Header with Back Button */}
            <div className="flex items-center gap-6 mb-10">
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/dashboard')}
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors shadow-lg"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </motion.button>
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white">{subjectTitle}</h1>
                    <p className="text-slate-400 font-medium mt-1">Detailed subject overview and assigned tasks</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 max-w-5xl">
                {/* Subject Progress Section */}
                <section className="bg-[#1a1a1a] rounded-[2rem] p-8 shadow-xl shadow-black/40 border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#1DB954]/10 rounded-full blur-[80px]" />
                    
                    <div className="flex-grow w-full relative z-10">
                       <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                           <span className="material-symbols-outlined text-[#1DB954] bg-[#1DB954]/10 p-2 rounded-xl">donut_large</span>
                           Subject Mastery
                       </h2>
                       <div className="w-full">
                           <div className="flex justify-between text-sm font-bold mb-3">
                               <span className="text-slate-300 tracking-wide uppercase">Current Progress</span>
                               <span className="text-slate-300 text-lg">{progress}%</span>
                           </div>
                           <div className="h-4 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                               <motion.div 
                                   initial={{ width: 0 }}
                                   animate={{ width: `${progress}%` }}
                                   transition={{ duration: 1.2, ease: "easeOut" }}
                                   className="h-full rounded-full bg-gradient-to-r from-teal-500 to-[#1DB954]" 
                               />
                           </div>
                       </div>
                    </div>
                </section>

                {/* Assigned Tasks Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white tracking-tight">
                        <span className="material-symbols-outlined text-[#FF5722] bg-[#FF5722]/10 p-2 rounded-xl">checklist</span>
                        Teacher Assigned Tasks
                    </h2>
                    
                    <div className="space-y-4">
                        {tasks.map((task) => {
                            const isCompleted = completedTasks.includes(task._id);
                            return (
                                <motion.div 
                                    key={task._id}
                                    whileHover={{ x: 5 }}
                                    className={`bg-[#1a1a1a] border p-6 rounded-2xl shadow-lg shadow-black/20 flex flex-col md:flex-row md:items-center justify-between gap-6 group transition-colors ${isCompleted ? 'border-[#1DB954]/30 bg-[#1DB954]/5' : 'border-white/5 hover:border-white/10'}`}
                                >
                                    <div className="flex items-start gap-4 flex-grow">
                                        <div className={`p-3 rounded-xl mt-1 ${isCompleted ? 'bg-[#1DB954]/10 text-[#1DB954]' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                            <span className="material-symbols-outlined">{isCompleted ? 'check_circle' : 'pending_actions'}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`material-symbols-outlined p-1 rounded text-sm ${isCompleted ? 'text-[#1DB954] bg-[#1DB954]/10' : 'text-[#1DB954] bg-[#1DB954]/10'}`}>
                                                    article
                                                </span>
                                                <h3 className={`text-xl font-bold group-hover:text-[#1DB954] transition-colors ${isCompleted ? 'text-slate-300' : 'text-white'}`}>
                                                    {task.title}
                                                </h3>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-400 mt-2">
                                                {task.description && (
                                                    <p className="opacity-80">{task.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        {task.fileUrl && (
                                          <motion.a 
                                              href={task.fileUrl} target="_blank" rel="noreferrer"
                                              whileHover={{ scale: 1.05 }}
                                              whileTap={{ scale: 0.95 }}
                                              className={`px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg mr-2 ${isCompleted ? 'bg-[#1DB954]/20 text-[#1DB954] border border-[#1DB954]/30' : 'bg-[#1DB954] hover:brightness-110 text-[#121212] shadow-[#1DB954]/20'}`}
                                          >
                                              <span className="material-symbols-outlined text-sm">link</span>
                                              File
                                          </motion.a>
                                        )}
                                        
                                        <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border hidden md:block ${isCompleted ? 'bg-[#1DB954]/10 text-[#1DB954] border-[#1DB954]/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                                            {isCompleted ? 'Understood' : 'Pending'}
                                        </span>
                                        
                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                                            <motion.button 
                                                onClick={() => toggleTask(task._id, 'completed')}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                title="Mark as understood"
                                                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all shadow-lg cursor-pointer ${isCompleted ? 'bg-[#1DB954] text-[#121212] border-[#1DB954] shadow-[#1DB954]/20' : 'border-[#1DB954]/30 hover:bg-[#1DB954] hover:text-[#121212] text-[#1DB954] hover:shadow-[#1DB954]/20'}`}
                                            >
                                                <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                                            </motion.button>
                                            
                                            <motion.button 
                                                onClick={() => toggleTask(task._id, 'not_understood')}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                title="Did not understand"
                                                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all shadow-lg cursor-pointer ${!isCompleted ? 'border-red-500/30 hover:bg-red-500 hover:text-white text-red-500 hover:shadow-red-500/20' : 'border-red-500/10 text-red-500/50 hover:bg-red-500 hover:text-white hover:border-red-500 shadow-none'}`}
                                            >
                                                <span className="material-symbols-outlined text-[18px] font-bold">close</span>
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                        {tasks.length === 0 && (
                            <p className="text-slate-400 mt-2">No tasks assigned for this subject yet.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
