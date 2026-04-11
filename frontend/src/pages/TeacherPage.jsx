import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TEACHER_TASKS = [
  { id: 1, text: "Grade Chemistry Lab Reports", completed: false, priority: "High" },
  { id: 2, text: "Prepare Physics Lecture Slides", completed: true, priority: "Medium" },
  { id: 3, text: "Update Attendance Records", completed: false, priority: "Low" },
  { id: 4, text: "Review Mid-term Exam Papers", completed: false, priority: "High" },
];

export default function TeacherPage() {
  const [tasks, setTasks] = useState(TEACHER_TASKS);
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Organic Chemistry Basics", dueDate: "2026-04-15", subject: "Chemistry", format: "PDF", status: "Active" },
    { id: 2, title: "Kinematics Problem Set", dueDate: "2026-04-12", subject: "Physics", format: "JPG", status: "Active" },
    { id: 3, title: "Math Discussion Topic", dueDate: "2026-04-18", subject: "Mathematics", format: "Text", status: "Active" },
  ]);
  const [selectedSubject, setSelectedSubject] = useState('Chemistry');
  const [newTask, setNewTask] = useState('');
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '', format: 'PDF', description: '' });
  const [notification, setNotification] = useState(null);

  const subjects = ['Chemistry', 'Physics', 'Mathematics', 'Biology'];
  const formats = ['PDF', 'Text', 'JPG'];

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };
=======
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TEACHER_TASKS = [
  { id: 1, text: "Grade Chemistry Lab Reports", completed: false, priority: "High" },
  { id: 2, text: "Prepare Physics Lecture Slides", completed: true, priority: "Medium" },
  { id: 3, text: "Update Attendance Records", completed: false, priority: "Low" },
  { id: 4, text: "Review Mid-term Exam Papers", completed: false, priority: "High" },
];

export default function TeacherPage() {
  const [tasks, setTasks] = useState(TEACHER_TASKS);
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Organic Chemistry Basics", dueDate: "2026-04-15", subject: "Chemistry", format: "PDF", status: "Active" },
    { id: 2, title: "Kinematics Problem Set", dueDate: "2026-04-12", subject: "Physics", format: "JPG", status: "Active" },
    { id: 3, title: "Math Discussion Topic", dueDate: "2026-04-18", subject: "Mathematics", format: "Text", status: "Active" },
  ]);
  const [selectedSubject, setSelectedSubject] = useState('Chemistry');
  const [newTask, setNewTask] = useState('');
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '', format: 'PDF', description: '' });
  const [notification, setNotification] = useState(null);

  const subjects = ['Chemistry', 'Physics', 'Mathematics', 'Biology'];
  const formats = ['PDF', 'Text', 'JPG'];

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };
>>>>>>> d3337d18c448329257438c974deea2cf4365164b

  const createAssignment = (e) => {
    e.preventDefault();
    if (!newAssignment.title) return;
    const assgn = {
      id: Date.now(),
      ...newAssignment,
      subject: selectedSubject,
      status: "Active"
    };
    setAssignments([assgn, ...assignments]);
    setShowAssignmentModal(false);
    setNewAssignment({ title: '', dueDate: '', format: 'PDF', description: '' });
    showToast(`Task created as ${newAssignment.format}!`);
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
    showToast("Task deleted.");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'PDF': return { icon: 'picture_as_pdf', color: 'text-rose-400', bg: 'bg-rose-500/10' };
      case 'JPG': return { icon: 'image', color: 'text-blue-400', bg: 'bg-blue-500/10' };
      case 'Text': return { icon: 'description', color: 'text-amber-400', bg: 'bg-amber-500/10' };
      default: return { icon: 'article', color: 'text-slate-400', bg: 'bg-slate-500/10' };
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-12 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface font-headline leading-tight">
            Teacher{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-tertiary">
              Workspace.
            </span>
          </h2>
<<<<<<< HEAD
          <p className="text-on-surface-variant max-w-md font-label text-base">
            Manage your daily tasks and subjects.
          </p>
        </motion.div>
        <div className="flex gap-3"></div>
      </div>

      <div className="space-y-8"></div>

      <div className="mt-10">
        <section className="glass-panel p-8 rounded-[2.5rem] border border-outline-variant/15">
          <h3 className="text-xl font-bold font-headline text-on-surface flex items-center gap-3 mb-6">
            <span
              className="material-symbols-outlined text-secondary"
              data-icon="school"
            >
              school
            </span>
            Subjects & Tasks
          </h3>
          {!addingSubject && (
            <button
              onClick={() => setAddingSubject(true)}
              className="px-6 py-3 rounded-full bg-secondary text-on-secondary font-semibold hover:scale-105 transition-transform"
            >
              Add Subject
            </button>
          )}
          {addingSubject && (
            <div className="space-y-4">
              <p className="text-on-surface-variant">
                Select a subject to add:
              </p>
              <div className="flex gap-3 flex-wrap">
                {subjectOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (!subjects.find((s) => s.name === option)) {
                        setSubjects([...subjects, { name: option, tasks: [] }]);
                      }
                      setAddingSubject(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-surface-container-highest border border-outline-variant/20 text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setAddingSubject(false)}
                className="mt-4 px-4 py-2 rounded-xl bg-outline-variant/10 text-on-surface-variant hover:bg-outline-variant/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
          <div className="space-y-6 mt-8">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="bg-surface-container-highest/20 p-6 rounded-2xl border border-outline-variant/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-on-surface">
                    Subject:- {subject.name}
                  </h4>
                  <button
                    onClick={() => setCurrentSubjectIndex(index)}
                    className="px-4 py-2 rounded-xl bg-tertiary text-on-tertiary font-semibold hover:scale-105 transition-transform"
                  >
                    Add Task
                  </button>
                </div>
                {currentSubjectIndex === index && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newTaskTitle.trim()) return;
                      const newTask = {
                        id: Date.now(),
                        title: newTaskTitle,
                        description: newTaskDescription,
                        attachment: newTaskAttachment,
                        completed: false,
                      };
                      const updatedSubjects = [...subjects];
                      updatedSubjects[index].tasks.push(newTask);
                      setSubjects(updatedSubjects);
                      setNewTaskTitle("");
                      setNewTaskDescription("");
                      setNewTaskAttachment(null);
                      setCurrentSubjectIndex(null);
                    }}
                    className="space-y-4 mb-4"
                  >
                    <input
                      type="text"
                      placeholder="Task Title"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="w-full px-5 py-4 bg-surface-container-high/40 border border-outline-variant/30 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all duration-300 text-white font-medium placeholder:text-on-surface-variant/40 backdrop-blur-sm"
                    />
                    <textarea
                      placeholder="Task Description"
                      value={newTaskDescription}
                      onChange={(e) => setNewTaskDescription(e.target.value)}
                      className="w-full px-5 py-4 bg-surface-container-high/40 border border-outline-variant/30 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all duration-300 text-white font-medium placeholder:text-on-surface-variant/40 backdrop-blur-sm resize-none"
                      rows="3"
                    />
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setNewTaskAttachment(e.target.files[0])}
                      className="w-full px-5 py-4 bg-surface-container-high/40 border border-outline-variant/30 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all duration-300 text-white font-medium placeholder:text-on-surface-variant/40 backdrop-blur-sm"
                    />
                    <button
                      type="submit"
                      className="w-full px-6 py-3 rounded-xl bg-secondary text-on-secondary font-semibold hover:scale-105 transition-transform"
                    >
                      Add Task
                    </button>
                  </form>
                )}
                <div className="space-y-3">
                  {subject.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-surface-container/20 border border-outline-variant/10 hover:border-secondary/30 transition-all cursor-pointer"
                      onClick={() => {
                        const updatedSubjects = [...subjects];
                        updatedSubjects[index].tasks = updatedSubjects[
                          index
                        ].tasks.map((t) =>
                          t.id === task.id
                            ? { ...t, completed: !t.completed }
                            : t,
                        );
                        setSubjects(updatedSubjects);
                      }}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          task.completed
                            ? "bg-secondary border-secondary"
                            : "border-outline-variant/40"
                        }`}
                      >
                        {task.completed && (
                          <span
                            className="material-symbols-outlined text-xs text-on-secondary font-bold"
                            data-icon="check"
                          >
                            check
                          </span>
                        )}
                      </div>
                      <div
                        className={`flex-grow space-y-1 ${
                          task.completed ? "line-through text-slate-500" : ""
                        }`}
                      >
                        <p className="font-semibold text-xl text-white">
                          Title:- {task.title}
                        </p>
                        <p className="text-xl text-white">
                          Description:- {task.description}
                        </p>
                        {task.attachment && (
                          <p className="text-xl text-white">
                            Attachment:- {task.attachment.name}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const updatedSubjects = [...subjects];
                          updatedSubjects[index].tasks = updatedSubjects[
                            index
                          ].tasks.filter((t) => t.id !== task.id);
                          setSubjects(updatedSubjects);
                        }}
                        className="w-6 h-6 rounded-full bg-rose-500/10 hover:bg-rose-500/20 flex items-center justify-center transition-colors"
                      >
                        <span
                          className="material-symbols-outlined text-xs text-rose-400"
                          data-icon="cancel"
                        >
                          cancel
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
=======
          <p className="text-on-surface-variant max-w-md font-label text-base">Create and manage academic tasks in multiple formats.</p>
        </motion.div>
        
        <div className="flex flex-wrap gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAssignmentModal(true)}
            className="px-8 py-4 rounded-3xl bg-secondary text-on-secondary font-black text-sm uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-secondary/20 transition-all"
          >
            <span className="material-symbols-outlined font-bold" data-icon="add_box">add_box</span>
            New Task
          </motion.button>
          
          <div className="relative group">
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-6 py-4 rounded-3xl bg-surface-container-highest border border-outline-variant/20 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-secondary/20 transition-all cursor-pointer h-full backdrop-blur-md"
            >
              {subjects.map(sub => <option key={sub} value={sub} className="bg-surface-container-highest">{sub}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Personal To-Do Section */}
        <div className="lg:col-span-1">
          <section className="glass-panel p-8 rounded-[3rem] border border-outline-variant/15 flex flex-col gap-8 h-full">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black font-headline text-on-surface flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary" data-icon="checklist">checklist</span>
                </div>
                My Tasks
              </h3>
              <span className="text-[10px] font-black px-4 py-1 rounded-full bg-surface-container-highest border border-outline-variant/20 text-slate-400 uppercase tracking-widest">
                {tasks.filter(t => !t.completed).length} Left
              </span>
            </div>

            <form onSubmit={addTask} className="relative group">
              <input 
                type="text" 
                placeholder="Next up..." 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full px-6 py-5 bg-surface-container-high/40 border-2 border-outline-variant/20 rounded-3xl focus:ring-8 focus:ring-secondary/5 focus:border-secondary outline-none transition-all duration-500 text-white font-bold placeholder:text-on-surface-variant/30 backdrop-blur-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95">
                <span className="material-symbols-outlined font-bold" data-icon="arrow_forward">arrow_forward</span>
              </button>
            </form>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                  <motion.div 
                    key={task.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`group flex items-center gap-4 p-5 rounded-3xl border-2 transition-all cursor-pointer ${
                      task.completed 
                        ? 'bg-surface-container/10 border-outline-variant/5 opacity-40' 
                        : 'bg-surface-container-highest/20 border-outline-variant/10 hover:border-secondary/40'
                    }`}
                    onClick={() => toggleTask(task.id)}
                  >
                    <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all ${
                      task.completed ? 'bg-secondary border-secondary' : 'border-outline-variant/40'
                    }`}>
                      {task.completed && <span className="material-symbols-outlined text-xs text-on-secondary font-black" data-icon="done">done</span>}
                    </div>
                    <span className={`flex-grow text-sm font-bold ${task.completed ? 'line-through text-slate-500' : 'text-on-surface'}`}>
                      {task.text}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        </div>

        {/* Active Class Assignments Section */}
        <div className="md:col-span-1 lg:col-span-2">
          <section className="glass-panel p-8 rounded-[3rem] border border-outline-variant/15 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black font-headline text-on-surface flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-tertiary" data-icon="workspaces">workspaces</span>
                </div>
                Class Tasks
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {assignments.map((assignment) => {
                  const formatInfo = getFormatIcon(assignment.format);
                  return (
                    <motion.div 
                      key={assignment.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-6 rounded-[2.5rem] bg-surface-container-highest/10 border-2 border-outline-variant/10 space-y-4 hover:bg-surface-container-highest/20 hover:border-tertiary/40 transition-all cursor-pointer group relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-2xl ${formatInfo.bg} flex items-center justify-center ${formatInfo.color}`}>
                            <span className="material-symbols-outlined font-bold">{formatInfo.icon}</span>
                          </div>
                          <div>
                            <h4 className="font-black text-on-surface text-lg leading-tight">{assignment.title}</h4>
                            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{assignment.subject}</span>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteAssignment(assignment.id); }}
                          className="opacity-0 group-hover:opacity-100 p-2 rounded-xl hover:bg-rose-500/20 hover:text-rose-400 transition-all"
                        >
                          <span className="material-symbols-outlined text-sm font-bold" data-icon="delete">delete</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                        <div className="flex items-center gap-2 text-[11px] font-black text-on-surface-variant uppercase tracking-widest">
                          <span className="material-symbols-outlined text-[16px] text-tertiary" data-icon="calendar_month">calendar_month</span>
                          Due {assignment.dueDate}
                        </div>
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full ${formatInfo.bg} ${formatInfo.color} border border-current/20`}>
                          {assignment.format}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </section>
        </div>
>>>>>>> d3337d18c448329257438c974deea2cf4365164b
      </div>

      {/* Simplified Multi-Format Modal */}
      <AnimatePresence>
        {showAssignmentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAssignmentModal(false)}
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-xl glass-panel p-12 rounded-[3.5rem] border border-outline-variant/30 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-on-surface font-headline tracking-tighter">Create New Task</h3>
                  <p className="text-sm text-on-surface-variant font-bold uppercase tracking-widest leading-none">Format: {newAssignment.format}</p>
                </div>
                <button 
                  onClick={() => setShowAssignmentModal(false)}
                  className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center hover:bg-rose-500 text-on-surface hover:text-white transition-all shadow-lg"
                >
                  <span className="material-symbols-outlined font-bold" data-icon="close">close</span>
                </button>
              </div>

              <form onSubmit={createAssignment} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary ml-1">Task Title</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g., Final Lab Report"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    className="w-full px-8 py-5 bg-surface-container-high/40 border-2 border-outline-variant/20 rounded-3xl focus:ring-8 focus:ring-secondary/5 focus:border-secondary outline-none transition-all text-white font-black text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary ml-1">Task Format</label>
                  <div className="grid grid-cols-3 gap-4">
                    {formats.map(f => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setNewAssignment({ ...newAssignment, format: f })}
                        className={`py-4 rounded-2xl border-2 font-black transition-all flex flex-col items-center gap-2 ${
                          newAssignment.format === f 
                          ? 'bg-secondary border-secondary text-on-secondary shadow-lg shadow-secondary/20 scale-105' 
                          : 'bg-surface-container-highest/40 border-outline-variant/20 text-on-surface-variant hover:border-secondary/40'
                        }`}
                      >
                        <span className="material-symbols-outlined">{getFormatIcon(f).icon}</span>
                        <span className="text-xs uppercase tracking-widest">{f}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary ml-1">Due Date</label>
                    <input 
                      type="date"
                      required
                      value={newAssignment.dueDate}
                      onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                      className="w-full px-6 py-5 bg-surface-container-high/40 border-2 border-outline-variant/20 rounded-3xl focus:ring-8 focus:ring-secondary/5 focus:border-secondary outline-none transition-all text-white font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary ml-1">Upload Demo</label>
                    <div className="w-full h-[64px] border-2 border-dashed border-outline-variant/40 rounded-3xl flex items-center justify-center gap-3 text-on-surface-variant/40 hover:border-secondary transition-all cursor-pointer">
                      <span className="material-symbols-outlined" data-icon="cloud_upload">cloud_upload</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">Select File</span>
                    </div>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-6 rounded-[2rem] bg-secondary text-on-secondary font-black text-sm uppercase tracking-[0.4em] shadow-2xl shadow-secondary/30 hover:shadow-secondary/50 transition-all mt-6"
                >
                  Deploy Task
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] px-10 py-5 glass-panel border-2 border-secondary/30 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex items-center gap-5"
          >
            <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined font-black text-on-secondary" data-icon="done_all">done_all</span>
            </div>
            <span className="text-sm font-black text-on-surface uppercase tracking-widest">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

