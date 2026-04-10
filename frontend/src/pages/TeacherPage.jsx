import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TeacherPage() {
  const [subjects, setSubjects] = useState([]);

  const [addingSubject, setAddingSubject] = useState(false);

  const [newTaskText, setNewTaskText] = useState("");

  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(null);
  const subjectOptions = ["Chemistry", "Physics", "Mathematics", "Biology"];

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
      </div>
    </div>
  );
}
