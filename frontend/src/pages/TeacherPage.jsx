import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TeacherPage() {
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  
  // Sidebar Add Subject State
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  
  // Right Area Add Task State
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskUrl, setNewTaskUrl] = useState('');
  
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };
  
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await fetch('http://localhost:3000/api/subjects', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setSubjects(data);
        } else {
          console.error("Failed to fetch subjects");
        }
      } catch (err) {
        console.error("Network error while fetching subjects:", err);
      }
    };
    fetchSubjects();
  }, []);

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newSubjectName })
      });
      const data = await response.json();
      if (response.ok) {
        setSubjects([data, ...subjects]);
        setNewSubjectName('');
        setIsAddingSubject(false);
        showToast("Subject created!");
      } else {
        showToast(data.message || "Failed to create subject");
      }
    } catch (err) {
      showToast("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newTaskTitle,
          description: newTaskDesc,
          subject: selectedSubjectId,
          fileUrl: newTaskUrl
        })
      });
      const data = await response.json();
      if (response.ok) {
        setTasks([...tasks, data]); // Appended to end of list
        setNewTaskTitle('');
        setNewTaskDesc('');
        setNewTaskUrl('');
        showToast("Task added!");
      } else {
        showToast(data.message || "Failed to add task");
      }
    } catch (err) {
      showToast("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSubject = async (e, id) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/subjects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setSubjects(subjects.filter(s => s._id !== id));
        if (selectedSubjectId === id) setSelectedSubjectId(null);
        showToast("Subject deleted!");
      } else {
        showToast("Failed to delete subject");
      }
    } catch (err) {
      showToast("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (e, id) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setTasks(tasks.filter(t => t._id !== id));
        showToast("Task deleted!");
      } else {
        showToast("Failed to delete task");
      }
    } catch (err) {
      showToast("Network error");
    }
  };

  const selectedSubject = subjects.find(s => s._id === selectedSubjectId);
  const subjectTasks = tasks.filter(t => t.subject === selectedSubjectId);

  return (
    <div className="p-6 lg:p-10 max-w-[1500px] mx-auto min-h-[90vh] grid grid-cols-1 lg:grid-cols-12 gap-8 text-on-surface">
      
      {/* ========================================================= */}
      {/* 30% LEFT SIDEBAR */}
      {/* ========================================================= */}
      <div className="lg:col-span-4 flex flex-col gap-5 h-[85vh] glass-panel p-8 rounded-[3rem] border border-outline-variant/15 shadow-2xl">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <h2 className="text-2xl font-black font-headline flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                 <span className="material-symbols-outlined text-on-secondary text-[20px]">library_books</span>
             </div>
             Subjects
          </h2>
        </div>
        
        <button 
          onClick={() => setIsAddingSubject(!isAddingSubject)}
          className={`w-full py-4 rounded-3xl font-black transition-all shadow-lg flex items-center justify-center gap-2 text-sm uppercase tracking-widest ${isAddingSubject ? 'bg-surface-container text-slate-300' : 'bg-secondary text-on-secondary shadow-secondary/40 hover:scale-[1.02]'}`}
        >
          <span className="material-symbols-outlined">{isAddingSubject ? 'close' : 'add'}</span>
          {isAddingSubject ? 'Cancel' : 'Add Subject'}
        </button>

        {/* Add Subject Inline Form */}
        <AnimatePresence>
          {isAddingSubject && (
            <motion.form 
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
               className="flex flex-col gap-3 overflow-hidden bg-surface-container-highest/20 p-5 rounded-3xl border border-outline-variant/20 shadow-inner"
               onSubmit={handleCreateSubject}
            >
               <input 
                 type="text" required
                 placeholder="Enter subject name..."
                 value={newSubjectName} onChange={e=>setNewSubjectName(e.target.value)}
                 className="w-full px-5 py-4 bg-surface-container-high/40 border-2 border-outline-variant/20 rounded-2xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none text-sm font-bold text-white transition-all"
               />
               <button disabled={isLoading} type="submit" className="w-full py-4 bg-secondary/10 hover:bg-secondary text-secondary hover:text-on-secondary border-2 border-secondary/30 transition-all rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg disabled:opacity-50">
                 {isLoading ? 'Creating...' : 'Create Subject'}
               </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* List of Subjects */}
        <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-3 mt-2 flex-grow">
          {subjects.map(sub => (
            <button
              key={sub._id}
              onClick={() => setSelectedSubjectId(sub._id)}
              className={`p-5 rounded-2xl text-left font-extrabold transition-all border-2 flex items-center justify-between group ${selectedSubjectId === sub._id ? 'bg-tertiary/10 border-tertiary/50 text-tertiary scale-[1.02] shadow-lg' : 'bg-surface-container-high/30 border-outline-variant/10 text-slate-300 hover:border-outline-variant/40 hover:bg-surface-container-high/60'}`}
            >
              {sub.name}
              <div className="flex items-center gap-1">
                 <button onClick={(e) => handleDeleteSubject(e, sub._id)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-rose-500/20 text-outline-variant hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all z-10 relative">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                 </button>
                 <span className={`material-symbols-outlined text-[18px] transition-all ${selectedSubjectId === sub._id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-50'}`}>chevron_right</span>
              </div>
            </button>
          ))}
          
          {subjects.length === 0 && !isAddingSubject && (
             <div className="flex flex-col items-center justify-center opacity-30 mt-16 pb-12">
               <span className="material-symbols-outlined text-5xl mb-3">auto_stories</span>
               <p className="text-xs uppercase tracking-widest font-black text-center leading-relaxed">No subjects yet<br/>Click add subject</p>
             </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 70% RIGHT MAIN AREA */}
      {/* ========================================================= */}
      <div className="lg:col-span-8 glass-panel p-8 md:p-10 rounded-[3rem] border border-outline-variant/15 flex flex-col h-[85vh] bg-surface-container-low/40 shadow-2xl relative overflow-hidden">
        
        {selectedSubjectId === null ? (
           // CASE 1: NO SUBJECT SELECTED
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center px-4 relative z-10 w-full max-w-md mx-auto">
              <div className="w-24 h-24 rounded-[3rem] bg-secondary/10 border-2 border-secondary/20 flex flex-col items-center justify-center mb-8 shadow-[0_0_80px_rgba(30,215,96,0.15)]">
                 <span className="material-symbols-outlined text-4xl text-secondary">touch_app</span>
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tighter text-white">Select a Subject</h3>
              <p className="text-on-surface-variant font-medium text-sm leading-relaxed">Select or create a subject from the left sidebar to manage its academic tasks and resources.</p>
           </motion.div>
        ) : (
           // CASE 2: SUBJECT SELECTED
           <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col h-full relative z-10">
             
             {/* Header showing Subject Name */}
             <div className="border-b-2 border-outline-variant/10 pb-6 mb-6 flex items-center gap-5 flex-shrink-0">
                 <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-tertiary to-teal-500 flex items-center justify-center shadow-xl shadow-tertiary/20">
                     <span className="material-symbols-outlined text-on-tertiary text-[28px] font-black">class</span>
                 </div>
                 <div>
                    <h3 className="text-4xl font-black text-white leading-tight tracking-tighter">{selectedSubject?.name}</h3>
                    <p className="text-[10px] text-tertiary uppercase tracking-[0.2em] mt-1 font-black flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_10px_rgba(11,210,230,0.8)] animate-pulse"></span> Active Subject Workspace
                    </p>
                 </div>
             </div>

             {/* Task List Section */}
             <div className="flex-grow overflow-y-auto custom-scrollbar pr-4 flex flex-col mb-4">
               <h4 className="font-black uppercase tracking-[0.2em] text-[12px] text-white flex items-center gap-2 Sticky top-0 bg-transparent pt-1 pb-4">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">data_object</span> Task Repository
               </h4>
               
               <div className="flex flex-col gap-4">
                 {subjectTasks.length === 0 && (
                    <div className="p-10 text-center bg-surface-container-highest/10 rounded-[2rem] border-2 border-dashed border-outline-variant/20 flex flex-col items-center gap-3">
                       <span className="material-symbols-outlined text-3xl text-outline-variant/50">draft</span>
                       <p className="text-xs text-on-surface-variant font-bold uppercase tracking-[0.1em]">No tasks here yet.</p>
                    </div>
                 )}

                 {subjectTasks.map(task => (
                   <motion.div key={task._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-[2rem] bg-surface-container-highest/30 border border-outline-variant/20 hover:border-tertiary/40 transition-all flex flex-col gap-2 hover:bg-surface-container-highest/50 group">
                      <div className="flex justify-between items-start">
                        <h5 className="font-extrabold text-white text-lg pr-4">{task.title}</h5>
                        <div className="flex items-center gap-2">
                           <button onClick={(e) => handleDeleteTask(e, task._id)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-rose-500/20 text-outline-variant/30 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all z-10 relative">
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                           </button>
                           <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center group-hover:bg-tertiary/20 transition-colors">
                              <span className="material-symbols-outlined text-tertiary text-sm">task_alt</span>
                           </div>
                        </div>
                      </div>
                      {task.description && <p className="text-[13px] text-slate-400 font-medium leading-relaxed mt-1">{task.description}</p>}
                      {task.fileUrl && (
                         <a href={task.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[11px] font-black tracking-widest text-tertiary bg-tertiary/10 self-start px-4 py-2 rounded-xl hover:bg-tertiary hover:text-on-tertiary transition-all mt-3 border border-tertiary/20">
                           <span className="material-symbols-outlined text-[14px]">link</span> Reference Document
                         </a>
                      )}
                   </motion.div>
                 ))}
               </div>
             </div>

             {/* Add Task Form (Positioned strictly below Task List) */}
             <div className="flex-shrink-0 pt-6 border-t-2 border-outline-variant/10">
               <h4 className="font-black uppercase tracking-[0.2em] text-[12px] text-secondary flex items-center gap-2 mb-4">
                 <span className="material-symbols-outlined text-[16px]">add_task</span> Add New Task
               </h4>
               
               <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-surface-container-highest/10 p-6 rounded-[2rem] border border-outline-variant/10 shadow-lg">
                  <div className="md:col-span-2">
                     <input type="text" required value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder="Task Title..." className="w-full px-5 py-4 bg-surface-container/50 border-2 border-outline-variant/20 rounded-xl focus:border-tertiary focus:ring-4 focus:ring-tertiary/10 outline-none text-sm font-bold text-white transition-all" />
                  </div>
                  <div className="md:col-span-1">
                     <textarea value={newTaskDesc} onChange={(e) => setNewTaskDesc(e.target.value)} placeholder="Description (optional)" rows={1} className="w-full px-5 py-4 bg-surface-container/50 border-2 border-outline-variant/20 rounded-xl focus:border-tertiary focus:ring-4 focus:ring-tertiary/10 outline-none text-sm font-medium text-slate-300 transition-all resize-none" />
                  </div>
                  <div className="md:col-span-1">
                     <input type="url" value={newTaskUrl} onChange={(e) => setNewTaskUrl(e.target.value)} placeholder="File URL (optional)" className="w-full px-5 py-4 bg-surface-container/50 border-2 border-outline-variant/20 rounded-xl focus:border-tertiary focus:ring-4 focus:ring-tertiary/10 outline-none text-sm font-medium text-slate-300 transition-all" />
                  </div>
                  <div className="md:col-span-2">
                     <button disabled={isLoading} type="submit" className="w-full py-4 bg-tertiary text-on-tertiary font-black rounded-xl text-xs uppercase tracking-[0.2em] hover:scale-[1.01] transition-transform disabled:opacity-50 mt-1 shadow-lg shadow-tertiary/20 flex items-center justify-center gap-2">
                         {isLoading ? 'Processing...' : 'Add Task'}
                         {!isLoading && <span className="material-symbols-outlined text-[16px]">playlist_add</span>}
                     </button>
                  </div>
               </form>
             </div>

           </motion.div>
        )}
      </div>

      {/* Premium Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 glass-panel border border-secondary/30 rounded-2xl shadow-[0_20px_40px_-15px_rgba(30,215,96,0.3)] flex items-center gap-4 bg-background/95"
          >
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-on-secondary text-[14px] font-black">check</span>
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
