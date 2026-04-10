import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TaskViewerPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // Fallbacks just in case
    const type = searchParams.get('type') || 'pdf';
    const title = searchParams.get('title') || 'Assigned Material';

    return (
        <div className="p-8 text-[#EAEAEA] min-h-screen font-manrope">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
                <div className="flex items-center gap-6">
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(-1)} // go back
                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors shadow-lg shrink-0"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </motion.button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">{title}</h1>
                        <p className="text-slate-400 font-medium flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-[#1DB954]">
                                {type === 'video' ? 'play_circle' : type === 'quiz' ? 'quiz' : 'picture_as_pdf'}
                            </span>
                            {type === 'video' ? 'Video Lecture' : type === 'quiz' ? 'Interactive Quiz' : 'PDF Document'}
                        </p>
                    </div>
                </div>
                
                <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors">Download</button>
                    <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-[#1DB954] text-[#121212] font-bold hover:brightness-110 transition-all shadow-lg shadow-[#1DB954]/20 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">check</span>
                        Complete
                    </button>
                </div>
            </div>

            {/* Content Viewer Area */}
            <div className="bg-[#1a1a1a] rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden aspect-square md:aspect-video relative flex items-center justify-center">
                {/* Decorative background for the empty state */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#121212]/50 to-[#1DB954]/5 opacity-50 z-0" />
                
                <div className="relative z-10 text-center flex flex-col items-center max-w-lg p-8">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="w-24 h-24 rounded-full bg-[#1DB954]/10 text-[#1DB954] flex items-center justify-center mb-6 border border-[#1DB954]/20 shadow-xl shadow-[#1DB954]/10"
                    >
                        <span className="material-symbols-outlined text-5xl">
                            {type === 'video' ? 'play_arrow' : type === 'quiz' ? 'quiz' : 'menu_book'}
                        </span>
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
                    
                    <p className="text-slate-400 mb-8 leading-relaxed text-sm md:text-base">
                        {type === 'video' 
                            ? "This is a mock video player interface. In a real application, the educational video uploaded by your teacher would stream seamlessly right here."
                            : type === 'quiz' 
                            ? "This is a mock quiz interface. In a real application, your interactive quiz questions and timers would be rendered in this space."
                            : "This is a mock PDF viewer. In a real application, the assigned reading material documents would be rendered here with pagination controls."}
                    </p>
                    
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors flex items-center gap-3 group shadow-lg"
                    >
                        <span className="material-symbols-outlined text-[#1DB954] group-hover:scale-125 transition-transform duration-300">
                             {type === 'video' ? 'play_arrow' : type === 'quiz' ? 'start' : 'visibility'}
                        </span>
                        {type === 'video' ? 'Start Playback' : type === 'quiz' ? 'Begin Quiz' : 'View Document'}
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
