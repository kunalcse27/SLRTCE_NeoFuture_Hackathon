import { motion } from 'framer-motion';

export default function NoticesPage() {
  const notices = [
    {
      id: 1,
      title: "Mid-Term Examination Schedule Released",
      date: "2026-04-12",
      description: "The schedule for the upcoming mid-term examinations for all engineering branches has been published. Please review your personalized timetable.",
      priority: "Highest",
      type: "Academic",
      icon: "event_note"
    },
    {
      id: 2,
      title: "Hackathon Stage 2 Submissions",
      date: "2026-04-10",
      description: "Reminder: All teams must push their final commits for round 2 of the NeoFuture Hackathon before midnight today.",
      priority: "High",
      type: "Event",
      icon: "code"
    },
    {
      id: 3,
      title: "Library Maintenance Setup",
      date: "2026-04-09",
      description: "The digital resource library will undergo scheduled maintenance from 2:00 AM to 4:00 AM. Expect brief interruptions.",
      priority: "Medium",
      type: "System",
      icon: "build"
    },
    {
      id: 4,
      title: "New Web Designing Course Material",
      date: "2026-04-05",
      description: "New adaptive learning materials have been uploaded for the UI/UX fundamentals module. Explore them in your active tasks.",
      priority: "Low",
      type: "Update",
      icon: "update"
    }
  ];

  return (
    <div className="p-8 text-[#EAEAEA] min-h-screen font-manrope">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#1DB954]/10 flex items-center justify-center border border-[#1DB954]/20">
            <span className="material-symbols-outlined text-[#1DB954] text-2xl" data-icon="campaign">campaign</span>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">Campus Notices</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Latest Updates & Announcements</p>
          </div>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#1DB954]/20 before:to-transparent">
          {notices.map((notice, i) => (
            <motion.div 
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, ease: "easeOut" }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#121212] bg-[#1a1a1a] group-hover:bg-[#1DB954]/20 group-hover:border-[#1DB954]/30 shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-300 z-10">
                 <span className={`material-symbols-outlined text-sm ${notice.priority === 'Highest' || notice.priority === 'High' ? 'text-[#FF5722]' : 'text-[#1DB954]'}`} data-icon={notice.icon}>{notice.icon}</span>
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-[#1a1a1a] border border-white/5 shadow-lg shadow-black/40 group-hover:border-[#1DB954]/20 group-hover:shadow-[#1DB954]/5 transition-all duration-300 cursor-default">
                 <div className="flex justify-between items-start mb-3">
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#1DB954] bg-[#1DB954]/10 px-3 py-1 rounded-full">{notice.type}</span>
                   <span className="text-xs font-bold text-slate-500 bg-black/40 px-3 py-1 rounded-full">{notice.date}</span>
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-[#1DB954] transition-colors">{notice.title}</h3>
                 <p className="text-sm font-medium text-slate-400 leading-relaxed">{notice.description}</p>
                 
                 {notice.priority === 'Highest' && (
                     <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-[#FF5722]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse"></span>
                        Action Required
                     </div>
                 )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
