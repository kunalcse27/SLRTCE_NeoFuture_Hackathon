import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEACHER_TASKS = [
  {
    id: 1,
    text: "Grade Chemistry Lab Reports",
    completed: false,
    priority: "High",
  },
  {
    id: 2,
    text: "Prepare Physics Lecture Slides",
    completed: true,
    priority: "Medium",
  },
  {
    id: 3,
    text: "Update Attendance Records",
    completed: false,
    priority: "Low",
  },
  {
    id: 4,
    text: "Review Mid-term Exam Papers",
    completed: false,
    priority: "High",
  },
];

const STUDENT_DATA = [
  {
    id: 1,
    name: "Aarav Sharma",
    attendance: "94%",
    assignments: 1,
    performance: { Chemistry: 88, Physics: 76, Mathematics: 92, Biology: 81 },
  },
  {
    id: 2,
    name: "Meera Patel",
    attendance: "88%",
    assignments: 3,
    performance: { Chemistry: 65, Physics: 58, Mathematics: 72, Biology: 68 },
  },
  {
    id: 3,
    name: "Ishaan Gupta",
    attendance: "96%",
    assignments: 0,
    performance: { Chemistry: 91, Physics: 89, Mathematics: 95, Biology: 93 },
  },
  {
    id: 4,
    name: "Ananya Iyer",
    attendance: "72%",
    assignments: 5,
    performance: { Chemistry: 32, Physics: 45, Mathematics: 38, Biology: 29 },
  },
  {
    id: 5,
    name: "Rohan Verma",
    attendance: "82%",
    assignments: 2,
    performance: { Chemistry: 55, Physics: 62, Mathematics: 48, Biology: 51 },
  },
  {
    id: 6,
    name: "Sanya Malhotra",
    attendance: "91%",
    assignments: 1,
    performance: { Chemistry: 78, Physics: 82, Mathematics: 75, Biology: 88 },
  },
];

export default function TeacherPage() {
  const [tasks, setTasks] = useState(TEACHER_TASKS);
  const [selectedSubject, setSelectedSubject] = useState("Chemistry");
  const [newTask, setNewTask] = useState("");
  const [subjects, setSubjects] = useState([]);

  const [addingSubject, setAddingSubject] = useState(false);

  const [newTaskText, setNewTaskText] = useState("");

  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(null);
  const subjectOptions = ["Chemistry", "Physics", "Mathematics", "Biology"];

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority: "Medium",
    };
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const getStatus = (percent) => {
    if (percent > 70)
      return {
        label: "Good",
        border: "border-emerald-500/50",
        text: "text-emerald-400",
        bg: "bg-emerald-500/10",
      };
    if (percent < 35)
      return {
        label: "Bad",
        border: "border-rose-500/50",
        text: "text-rose-400",
        bg: "bg-rose-500/10",
      };
    return {
      label: "Average",
      border: "border-amber-500/50",
      text: "text-amber-400",
      bg: "bg-amber-500/10",
    };
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
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
          <p className="text-on-surface-variant max-w-md font-label text-base">
            Manage your daily tasks and subjects.
          </p>
        </motion.div>
        <div className="flex gap-3">
          <div className="relative group">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-6 py-3 rounded-full bg-surface-container-highest border border-outline-variant/15 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all cursor-pointer"
            >
              {subjectOptions.map((sub) => (
                <option
                  key={sub}
                  value={sub}
                  className="bg-surface-container-highest"
                >
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Pending Tasks Section */}
        <div className="space-y-6">
          <section className="glass-panel p-8 rounded-[2.5rem] border border-outline-variant/15 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-headline text-on-surface flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-secondary"
                  data-icon="checklist"
                >
                  checklist
                </span>
                Pending Tasks
              </h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/20 text-slate-400">
                {tasks.filter((t) => !t.completed).length} Pending
              </span>
            </div>

            <form onSubmit={addTask} className="relative group">
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full px-5 py-4 bg-surface-container-high/40 border border-outline-variant/30 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all duration-300 text-white font-medium placeholder:text-on-surface-variant/40 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shadow-lg shadow-secondary/20 hover:scale-105 transition-transform active:scale-95"
              >
                <span className="material-symbols-outlined" data-icon="add">
                  add
                </span>
              </button>
            </form>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
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
                        ? "bg-surface-container/20 border-outline-variant/10 opacity-60"
                        : "bg-surface-container-highest/40 border-outline-variant/20 hover:border-secondary/30"
                    }`}
                    onClick={() => toggleTask(task.id)}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                        task.completed
                          ? "bg-secondary border-secondary"
                          : "border-outline-variant/40"
                      }`}
                    >
                      {task.completed && (
                        <span
                          className="material-symbols-outlined text-sm text-on-secondary font-bold"
                          data-icon="check"
                        >
                          check
                        </span>
                      )}
                    </div>
                    <span
                      className={`flex-grow text-sm font-medium ${task.completed ? "line-through text-slate-500" : "text-on-surface"}`}
                    >
                      {task.text}
                    </span>
                    {!task.completed && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                          task.priority === "High"
                            ? "bg-rose-500/10 text-rose-400"
                            : task.priority === "Medium"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-teal-500/10 text-teal-400"
                        }`}
                      >
                        {task.priority}
                      </span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </div>

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
                      if (!newTaskText.trim()) return;
                      const newTask = {
                        id: Date.now(),
                        text: newTaskText,
                        completed: false,
                      };
                      const updatedSubjects = [...subjects];
                      updatedSubjects[index].tasks.push(newTask);
                      setSubjects(updatedSubjects);
                      setNewTaskText("");
                      setCurrentSubjectIndex(null);
                    }}
                    className="relative group mb-4"
                  >
                    <input
                      type="text"
                      placeholder="Add a new task..."
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      className="w-full px-5 py-4 bg-surface-container-high/40 border border-outline-variant/30 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all duration-300 text-white font-medium placeholder:text-on-surface-variant/40 backdrop-blur-sm"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shadow-lg shadow-secondary/20 hover:scale-105 transition-transform active:scale-95"
                    >
                      <span
                        className="material-symbols-outlined"
                        data-icon="add"
                      >
                        add
                      </span>
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
                      <span
                        className={`flex-grow text-sm font-medium ${
                          task.completed
                            ? "line-through text-slate-500"
                            : "text-on-surface"
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
