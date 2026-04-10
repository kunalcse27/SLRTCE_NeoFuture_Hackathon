import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TEACHER_TASKS = [
  { id: 1, text: "Grade Chemistry Lab Reports", completed: false, priority: "High" },
  { id: 2, text: "Prepare Physics Lecture Slides", completed: true, priority: "Medium" },
  { id: 3, text: "Update Attendance Records", completed: false, priority: "Low" },
  { id: 4, text: "Review Mid-term Exam Papers", completed: false, priority: "High" },
];

const STUDENT_DATA = [
  { 
    id: 1, name: "Aarav Sharma", attendance: "94%", assignments: 1,
    performance: { Chemistry: 88, Physics: 76, Mathematics: 92, Biology: 81 }
  },
  { 
    id: 2, name: "Meera Patel", attendance: "88%", assignments: 3,
    performance: { Chemistry: 65, Physics: 58, Mathematics: 72, Biology: 68 }
  },
  { 
    id: 3, name: "Ishaan Gupta", attendance: "96%", assignments: 0,
    performance: { Chemistry: 91, Physics: 89, Mathematics: 95, Biology: 93 }
  },
  { 
    id: 4, name: "Ananya Iyer", attendance: "72%", assignments: 5,
    performance: { Chemistry: 32, Physics: 45, Mathematics: 38, Biology: 29 }
  },
  { 
    id: 5, name: "Rohan Verma", attendance: "82%", assignments: 2,
    performance: { Chemistry: 55, Physics: 62, Mathematics: 48, Biology: 51 }
  },
  { 
    id: 6, name: "Sanya Malhotra", attendance: "91%", assignments: 1,
    performance: { Chemistry: 78, Physics: 82, Mathematics: 75, Biology: 88 }
  }
];

export default function TeacherPage() {
  const [tasks, setTasks] = useState(TEACHER_TASKS);
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Organic Chemistry Basics", dueDate: "2026-04-15", assignedToCount: 3, subject: "Chemistry", status: "Active" },
    { id: 2, title: "Kinematics Problem Set", dueDate: "2026-04-12", assignedToCount: 4, subject: "Physics", status: "Active" },
  ]);
  const [selectedSubject, setSelectedSubject] = useState('Chemistry');
  const [newTask, setNewTask] = useState('');
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '', description: '' });

  const subjects = ['Chemistry', 'Physics', 'Mathematics', 'Biology'];

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task = { id: Date.now(), text: newTask, completed: false, priority: "Medium" };
    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const [notification, setNotification] = useState(null);

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const createAssignment = (e) => {
    e.preventDefault();
    if (!newAssignment.title) return;
    const assgn = {
      id: Date.now(),
      ...newAssignment,
      subject: selectedSubject,
      assignedToCount: STUDENT_DATA.length,
      status: "Active"
    };
    setAssignments([assgn, ...assignments]);
    setShowAssignmentModal(false);
    setNewAssignment({ title: '', dueDate: '', description: '' });
    showToast("Assignment deployed to all students!");
  };

  const assignToStudent = (studentName) => {
    showToast(`Task assigned to ${studentName}`);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const getStatus = (percent) => {
    if (percent > 70) return { label: 'Good', border: 'border-emerald-500/50', text: 'text-emerald-400', bg: 'bg-emerald-500/10' };
    if (percent < 35) return { label: 'Bad', border: 'border-rose-500/50', text: 'text-rose-400', bg: 'bg-rose-500/10' };
    return { label: 'Average', border: 'border-amber-500/50', text: 'text-amber-400', bg: 'bg-amber-500/10' };
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface font-headline leading-tight">
            Teacher <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-tertiary">Workspace.</span>
          </h2>
          <p className="text-on-surface-variant max-w-md font-label text-base">Manage your daily tasks and track class-wide academic performance.</p>
        </motion.div>
        <div className="flex gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAssignmentModal(true)}
            className="px-6 py-3 rounded-full bg-secondary text-on-secondary font-bold flex items-center gap-2 shadow-lg shadow-secondary/20 transition-all"
          >
            <span className="material-symbols-outlined" data-icon="add_task">add_task</span>
            Create Assignment
          </motion.button>
          <div className="relative group">
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-6 py-3 rounded-full bg-surface-container-highest border border-outline-variant/15 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all cursor-pointer h-full"
            >
              {subjects.map(sub => <option key={sub} value={sub} className="bg-surface-container-highest">{sub}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Pending Tasks & Recent Assignments */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Teacher's Personal Tasks */}
          <section className="glass-panel p-8 rounded-[2.5rem] border border-outline-variant/15 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-headline text-on-surface flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary" data-icon="checklist">checklist</span>
                Personal Tasks
              </h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/20 text-slate-400">
                {tasks.filter(t => !t.completed).length} Pending
              </span>
            </div>

            <form onSubmit={addTask} className="relative group">
              <input 
                type="text" 
                placeholder="Add personal task..." 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full px-5 py-4 bg-surface-container-high/40 border border-outline-variant/30 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all duration-300 text-white font-medium placeholder:text-on-surface-variant/40 backdrop-blur-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shadow-lg shadow-secondary/20 hover:scale-105 transition-transform active:scale-95">
                <span className="material-symbols-outlined" data-icon="add">add</span>
              </button>
            </form>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                  <motion.div 
                    key={task.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                      task.completed 
                        ? 'bg-surface-container/20 border-outline-variant/10 opacity-60' 
                        : 'bg-surface-container-highest/40 border-outline-variant/20 hover:border-secondary/30'
                    }`}
                    onClick={() => toggleTask(task.id)}
                  >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      task.completed ? 'bg-secondary border-secondary' : 'border-outline-variant/40'
                    }`}>
                      {task.completed && <span className="material-symbols-outlined text-sm text-on-secondary font-bold" data-icon="check">check</span>}
                    </div>
                    <span className={`flex-grow text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-on-surface'}`}>
                      {task.text}
                    </span>
                    {!task.completed && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                        task.priority === 'High' ? 'bg-rose-500/10 text-rose-400' : 
                        task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 
                        'bg-teal-500/10 text-teal-400'
                      }`}>
                        {task.priority}
                      </span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* Recent Class Assignments */}
          <section className="glass-panel p-8 rounded-[2.5rem] border border-outline-variant/15 flex flex-col gap-6">
            <h3 className="text-xl font-bold font-headline text-on-surface flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary" data-icon="assignment">assignment</span>
              Active Assignments
            </h3>
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="p-4 rounded-2xl bg-surface-container-highest/30 border border-outline-variant/10 space-y-2 hover:bg-surface-container-highest/50 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-on-surface text-sm group-hover:text-tertiary transition-colors">{assignment.title}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-tertiary/10 text-tertiary">{assignment.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-medium">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]" data-icon="group">group</span>
                      {assignment.assignedToCount} Students
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]" data-icon="calendar_today">calendar_today</span>
                      Due {assignment.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Student Performance Table Section */}
        <div className="col-span-12 lg:col-span-8">
          <section className="glass-panel p-8 rounded-[2.5rem] border border-outline-variant/15 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-headline text-on-surface flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary" data-icon="analytics">analytics</span>
                  Student Progress & Assignment
                </h3>
                <p className="text-xs text-on-surface-variant font-label uppercase tracking-widest leading-none">Class Performance Control</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                    <th className="px-6 py-2">Student Name</th>
                    <th className="px-6 py-2">Attendance</th>
                    <th className="px-6 py-2 text-center">Pending</th>
                    <th className="px-6 py-2">Performance</th>
                    <th className="px-6 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {STUDENT_DATA.map((student) => {
                    const perf = student.performance[selectedSubject];
                    const status = getStatus(perf);
                    return (
                      <motion.tr 
                        key={student.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group bg-surface-container-highest/20 hover:bg-surface-container-highest/40 transition-colors"
                      >
                        <td className="px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/10 to-tertiary/10 border border-outline-variant/20 flex items-center justify-center font-bold text-secondary text-xs">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm font-bold text-on-surface group-hover:text-secondary transition-colors">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col gap-1.5">
                            <span className="text-sm font-medium text-slate-300">{student.attendance}</span>
                            <div className="w-24 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-teal-400" 
                                style={{ width: student.attendance }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold ${
                            student.assignments > 2 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                            student.assignments > 0 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                            'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                          }`}>
                            {student.assignments}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex-grow h-2 max-w-[80px] bg-surface-container-highest rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${perf}%` }}
                                className={`h-full ${status.bg.replace('/10', '')}`}
                              />
                            </div>
                            <span className={`text-sm font-black ${status.text}`}>{perf}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center first:rounded-l-2xl last:rounded-r-2xl">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => assignToStudent(student.name)}
                            className="p-2 rounded-xl bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary hover:text-on-secondary transition-all group/btn"
                            title="Assign Task"
                          >
                            <span className="material-symbols-outlined text-[20px]" data-icon="assignment_add">assignment_add</span>
                          </motion.button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      {/* Create Assignment Modal */}
      <AnimatePresence>
        {showAssignmentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAssignmentModal(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-panel p-10 rounded-[2.5rem] border border-outline-variant/20 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-on-surface font-headline">New Assignment</h3>
                  <p className="text-sm text-on-surface-variant font-medium">Create and broadcast task to all students in {selectedSubject}.</p>
                </div>
                <button 
                  onClick={() => setShowAssignmentModal(false)}
                  className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                >
                  <span className="material-symbols-outlined" data-icon="close">close</span>
                </button>
              </div>

              <form onSubmit={createAssignment} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-secondary ml-1">Assignment Title</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g., Week 12 Synthesis Lab"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    className="w-full px-6 py-4 bg-surface-container-high/40 border border-outline-variant/30 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all text-white font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-secondary ml-1">Due Date</label>
                    <input 
                      type="date"
                      required
                      value={newAssignment.dueDate}
                      onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                      className="w-full px-6 py-4 bg-surface-container-high/40 border border-outline-variant/30 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all text-white font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-secondary ml-1">Points</label>
                    <input 
                      type="number"
                      placeholder="100"
                      className="w-full px-6 py-4 bg-surface-container-high/40 border border-outline-variant/30 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all text-white font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-secondary ml-1">Instructions (Optional)</label>
                  <textarea 
                    rows="3"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                    placeholder="Briefly describe the task objectives..."
                    className="w-full px-6 py-4 bg-surface-container-high/40 border border-outline-variant/30 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all text-white font-medium resize-none"
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-5 rounded-2xl bg-secondary text-on-secondary font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-secondary/20 hover:shadow-secondary/40 transition-all mt-4"
                >
                  Deploy Assignment
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 glass-panel border border-secondary/30 rounded-full shadow-2xl flex items-center gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-sm text-on-secondary font-bold" data-icon="check">check</span>
            </div>
            <span className="text-sm font-bold text-on-surface">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
