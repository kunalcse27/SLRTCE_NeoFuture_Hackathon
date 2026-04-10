import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SubjectDetailsPage() {
    const { subjectName } = useParams();
    const navigate = useNavigate();
    
    // Decode subject name in case it has spaces
    const title = decodeURIComponent(subjectName || 'Subject');

    // Mock data for progress and tasks
    const progress = 65;
    
    const tasks = [
        { id: 1, title: 'Introduction to Core Concepts', type: 'video', date: 'Feb 2, 2024', status: 'Completed', teacher: 'Dr. Smith' },
        { id: 2, title: 'Primary Source Reading', type: 'pdf', date: 'Feb 15, 2024', status: 'Pending', teacher: 'Prof. Johnson' },
        { id: 3, title: 'Advanced Theory Quiz', type: 'quiz', date: 'March 1, 2024', status: 'Not Understood', teacher: 'Dr. Smith' },
        { id: 4, title: 'Final Project Guidelines', type: 'pdf', date: 'March 20, 2024', status: 'Pending', teacher: 'Dr. Smith' },
    ];

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
                    <h1 className="text-4xl font-extrabold tracking-tight text-white">{title}</h1>
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
                        {tasks.map((task) => (
                            <motion.div 
                                key={task.id}
                                whileHover={{ x: 5 }}
                                className="bg-[#1a1a1a] border border-white/5 p-6 rounded-2xl shadow-lg shadow-black/20 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-white/10 transition-colors"
                            >
                                <div className="flex items-start gap-4 flex-grow">
                                    <div className={`p-3 rounded-xl mt-1 ${
                                        task.status === 'Completed' ? 'bg-[#1DB954]/10 text-[#1DB954]' : 
                                        task.status === 'Not Understood' ? 'bg-red-500/10 text-red-500' : 
                                        'bg-yellow-500/10 text-yellow-500'
                                    }`}>
                                        <span className="material-symbols-outlined">
                                            {task.status === 'Completed' ? 'check_circle' : 
                                             task.status === 'Not Understood' ? 'cancel' : 'pending_actions'}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="material-symbols-outlined text-[#1DB954] bg-[#1DB954]/10 p-1 rounded text-sm">
                                                {task.type === 'video' ? 'play_circle' : task.type === 'quiz' ? 'quiz' : 'picture_as_pdf'}
                                            </span>
                                            <h3 className="text-xl font-bold text-white group-hover:text-[#1DB954] transition-colors cursor-pointer" onClick={() => navigate(`/dashboard/task/${task.id}?type=${task.type}&title=${encodeURIComponent(task.title)}`)}>{task.title}</h3>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-400 mt-2">
                                            <span className="flex items-center gap-1.5 opacity-80">
                                                <span className="material-symbols-outlined text-[16px]">calendar_month</span> {task.date}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                            <span className="flex items-center gap-1.5 opacity-80">
                                                <span className="material-symbols-outlined text-[16px]">person</span> {task.teacher}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <motion.button 
                                        onClick={() => navigate(`/dashboard/task/${task.id}?type=${task.type}&title=${encodeURIComponent(task.title)}`)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 rounded-xl bg-[#1DB954] hover:brightness-110 text-[#121212] flex items-center gap-2 font-bold transition-all shadow-lg shadow-[#1DB954]/20 mr-2"
                                    >
                                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                                        Open
                                    </motion.button>
                                    
                                    <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border hidden md:block ${
                                        task.status === 'Completed' ? 'bg-[#1DB954]/10 text-[#1DB954] border-[#1DB954]/20' : 
                                        task.status === 'Not Understood' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                                        'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                    }`}>
                                        {task.status}
                                    </span>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            title="Mark as understood"
                                            className="w-8 h-8 rounded-full border border-[#1DB954]/30 hover:bg-[#1DB954] hover:text-[#121212] text-[#1DB954] flex items-center justify-center transition-all shadow-lg hover:shadow-[#1DB954]/20 cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                                        </motion.button>
                                        
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            title="Did not understand"
                                            className="w-8 h-8 rounded-full border border-red-500/30 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition-all shadow-lg hover:shadow-red-500/20 cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-[18px] font-bold">close</span>
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
