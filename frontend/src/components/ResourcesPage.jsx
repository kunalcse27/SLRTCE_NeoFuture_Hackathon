import React from 'react';

export default function ResourcesPage() {
  const lectures = [
    { title: "Operating Systems - Process Synchronization", duration: "45 mins", instructor: "Prof. Alan Turing", thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { title: "Data Structures - Graph Algorithms", duration: "50 mins", instructor: "Dr. Grace Hopper", thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { title: "Computer Networks - TCP/IP Protocol Suite", duration: "1 hr 10 mins", instructor: "Prof. Vint Cerf", thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { title: "Database Architecture & Indexing", duration: "55 mins", instructor: "Dr. E.F. Codd", thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  ];

  const notes = [
    { title: "DBMS Optimization Techniques.pdf", size: "2.4 MB" },
    { title: "Theory of Computation Cheatsheet.pdf", size: "1.1 MB" },
    { title: "Advanced Computer Architecture.pdf", size: "4.8 MB" },
    { title: "Machine Learning Foundations.pdf", size: "5.2 MB" }
  ];

  return (
    <div className="pt-28 p-10 max-w-7xl mx-auto space-y-10 min-h-screen">
      {/* Page Header Asymmetry */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-5xl font-extrabold tracking-tighter text-on-surface font-headline leading-tight">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-tertiary">Resources.</span>
          </h2>
          <p className="text-on-surface-variant max-w-md font-label">Access curated video lectures and comprehensive computer engineering notes to supplement your learning.</p>
        </div>
      </div>

      <div className="space-y-12 pb-20">
        {/* Video Lectures Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-2xl font-bold font-headline text-on-surface flex items-center gap-3">
               <span className="material-symbols-outlined text-teal-400">play_circle</span>
               Video Lectures
             </h3>
             <button className="text-sm text-teal-400 font-bold hover:text-teal-300 transition-colors">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lectures.map((lecture, idx) => (
              <div key={idx} className="bg-surface-container-high rounded-xl border border-outline-variant/10 overflow-hidden shadow-lg group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full">
                <div className="relative h-40 overflow-hidden shrink-0">
                  <img src={lecture.thumbnail} alt={lecture.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <span className="material-symbols-outlined text-white text-5xl">play_arrow</span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded font-bold">
                    {lecture.duration}
                  </div>
                </div>
                <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-on-surface line-clamp-2 leading-snug">{lecture.title}</h4>
                  </div>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1 font-label">
                     <span className="material-symbols-outlined text-[14px]">person</span> {lecture.instructor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notes Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-2xl font-bold font-headline text-on-surface flex items-center gap-3">
               <span className="material-symbols-outlined text-secondary">picture_as_pdf</span>
               Study Notes
             </h3>
             <button className="text-sm text-secondary font-bold hover:text-secondary-fixed transition-colors">Browse Library</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {notes.map((note, idx) => (
                <div key={idx} className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 shadow-lg hover:shadow-xl transition-all group cursor-pointer flex flex-col items-center text-center gap-4 hover:-translate-y-1 hover:bg-surface-container-high h-full justify-between">
                   <div className="relative text-error-container group-hover:text-error transition-colors mt-2">
                     <span className="material-symbols-outlined text-6xl">picture_as_pdf</span>
                   </div>
                   <div className="flex-grow flex flex-col justify-center">
                     <p className="text-sm font-bold text-on-surface font-headline leading-tight group-hover:text-teal-400 transition-colors line-clamp-2">{note.title}</p>
                     <p className="text-xs text-slate-500 mt-1 font-label">{note.size}</p>
                   </div>
                   <button className="mt-2 text-xs font-bold bg-secondary/10 text-secondary px-4 py-2 rounded-full w-full group-hover:bg-secondary group-hover:text-on-secondary-fixed transition-colors">
                     Download
                   </button>
                </div>
             ))}
          </div>
        </section>
      </div>
    </div>
  );
}
