import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import wellbeingService from '../services/wellbeingService';

// ── Chatbot powered by Gemini (via Backend) ──────────────────────────────────
function Chatbot({ mood, subjectsData = [], onClose }) {
   const [messages, setMessages] = useState([
      {
         role: 'assistant',
         content: "Hey there 👋 I'm Mira, your mental wellness companion. How are you feeling right now? You can talk to me about anything — stress, studies, or whatever's on your mind.",
      },
   ]);
   const [input, setInput] = useState('');
   const [loading, setLoading] = useState(false);
   const bottomRef = useRef(null);

   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages, loading]);

   const sendMessage = async () => {
      const text = input.trim();
      if (!text || loading) return;
      setInput('');

      const newMessages = [...messages, { role: 'user', content: text }];
      setMessages(newMessages);
      setLoading(true);

      try {
         // const data = await wellbeingService.getMiraChatResponse(newMessages, mood);
         // const reply = data.data?.reply || "I'm here for you. Could you tell me more?";
         await new Promise(resolve => setTimeout(resolve, 800));

         const lc = text.toLowerCase();
         let reply = "I'm here to support you. Tell me more about what you're going through.";

         const check = (words) => words.some(w => lc.includes(w));

         let matchedSubject = null;
         if (subjectsData) {
             for (const sub of subjectsData) {
                 if (lc.includes(sub.name.toLowerCase())) {
                     matchedSubject = sub;
                     break;
                 }
             }
         }

         const stressWords = ["stress", "anxious", "overwhelmed", "pressure"];
         const examWords = ["exam", "test", "deadline", "study"];
         const tiredWords = ["tired", "exhausted", "burnout", "sleepy"];
         const motivationWords = ["lazy", "no motivation", "procrastinating", "can't study"];
         const confidenceWords = ["can't do", "not good", "fail", "doubt"];
         const positiveWords = ["happy", "good", "great", "productive"];

         const isStressOrExam = check([...stressWords, ...examWords]);

         if (matchedSubject) {
             const prog = matchedSubject.progress;
             if (isStressOrExam) {
                 reply = `You seem stressed about ${matchedSubject.name}. Your progress is ${prog}%. Focus on small topics and take breaks.`;
             } else {
                 if (prog < 25) {
                     reply = `You seem to be struggling with ${matchedSubject.name}. Your progress is ${prog}%. Start with basics and build consistency.`;
                 } else if (prog >= 25 && prog <= 60) {
                     reply = `You're improving in ${matchedSubject.name} (${prog}%). Stay consistent and revise regularly.`;
                 } else {
                     reply = `You're doing great in ${matchedSubject.name} (${prog}%). Keep pushing forward!`;
                 }
             }
         } else if (check(stressWords)) {
             reply = "It seems like you're feeling overwhelmed. Take a short break and try to focus on one task at a time.";
         } else if (check(tiredWords)) {
             reply = "You might be mentally exhausted. Proper rest and small breaks can really help.";
         } else if (check(examWords)) {
             reply = "Exams can feel stressful. Try breaking your syllabus into small achievable goals.";
         } else if (check(motivationWords)) {
             reply = "It's okay to feel unmotivated sometimes. Start with just 10 minutes of focused work.";
         } else if (check(confidenceWords)) {
             reply = "You're capable of improving. Focus on progress, not perfection.";
         } else if (check(positiveWords)) {
             reply = "That's amazing! Keep maintaining this positive momentum.";
         } else if (subjectsData && subjectsData.length > 0 && subjectsData.every(s => s.progress === 0)) {
             reply = "You haven’t started your subjects yet. Begin with one small topic today.";
         }

         setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      } catch {
         setMessages(prev => [...prev, { role: 'assistant', content: "I'm having a little trouble connecting right now, but I'm still here for you. 💙" }]);
      } finally {
         setLoading(false);
      }
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 40, scale: 0.97 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         exit={{ opacity: 0, y: 40, scale: 0.95 }}
         transition={{ type: 'spring', stiffness: 280, damping: 28 }}
         className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[560px] flex flex-col rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] border border-white/10"
         style={{ background: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(20px)' }}
      >
         {/* Header */}
         <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5" style={{ background: 'linear-gradient(90deg, rgba(29, 185, 84, 0.1) 0%, rgba(0, 137, 123, 0.08) 100%)' }}>
            <div className="relative">
               <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1DB954] to-[#00897B] flex items-center justify-center text-xl font-black text-white shadow-lg">
                  M
               </div>
               <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#1DB954] border-2 border-[#141414]" />
            </div>
            <div className="flex-1">
               <p className="font-black text-white text-base tracking-tight leading-none">Mira</p>
               <p className="text-[10px] text-[#1DB954] font-bold uppercase tracking-[0.1em] mt-1 text-glow">Wellness Companion</p>
            </div>
            <button
               onClick={onClose}
               className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-90"
            >
               <span className="material-symbols-outlined text-base">close</span>
            </button>
         </div>

         {/* Messages */}
         <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 scrollbar-hide" style={{ maxHeight: '380px' }}>
            {messages.map((msg, i) => (
               <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
               >
                  {msg.role === 'assistant' && (
                     <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1DB954] to-[#00897B] flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-1 shadow-md">
                        M
                     </div>
                  )}
                  <div
                     className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed font-medium transition-all duration-300 ${msg.role === 'user'
                        ? 'bg-[#1DB954]/15 text-white rounded-br-none border border-[#1DB954]/20 shadow-[0_4px_12px_rgba(29,185,84,0.1)]'
                        : 'bg-white/[0.04] text-slate-200 rounded-bl-none border border-white/5'
                        }`}
                  >
                     {msg.content}
                  </div>
               </motion.div>
            ))}
            {loading && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1DB954] to-[#00897B] flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-1">M</div>
                  <div className="bg-white/[0.04] border border-white/5 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1.5 items-center">
                     {[0, 1, 2].map(j => (
                        <motion.span key={j} className="w-1.5 h-1.5 rounded-full bg-[#1DB954]"
                           animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                           transition={{ duration: 1, repeat: Infinity, delay: j * 0.18 }}
                        />
                     ))}
                  </div>
               </motion.div>
            )}
            <div ref={bottomRef} />
         </div>

         {/* Input */}
         <div className="px-5 pb-6 pt-3 border-t border-white/5 relative">
            <div className="flex gap-2 items-center bg-white/[0.03] rounded-2xl border border-white/10 px-4 py-2.5 focus-within:border-[#1DB954]/40 transition-all duration-300 shadow-inner">
               <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Share what's on your mind..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none font-medium py-1"
               />
               <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 rounded-xl bg-[#1DB954] disabled:opacity-30 flex items-center justify-center shadow-lg shadow-[#1DB954]/20 transition-all hover:bg-[#1DB954]/90 active:scale-95 cursor-pointer"
               >
                  <span className="material-symbols-outlined text-white text-lg" style={{ fontSize: '20px' }}>send</span>
               </motion.button>
            </div>
            <p className="text-center text-[9px] text-slate-600 mt-3 font-bold uppercase tracking-widest opacity-60">Mira is an AI companion for support · beta</p>
         </div>
      </motion.div>
   );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function InsightsPage() {
   const [mood, setMood] = useState('Neutral');
   const [chatOpen, setChatOpen] = useState(false);
   const [chatPulse, setChatPulse] = useState(true);

   const [subjectsWithProgress, setSubjectsWithProgress] = useState([]);

   useEffect(() => {
       const loadDashboardData = async () => {
           try {
               const token = localStorage.getItem('token');
               if (!token) return;
               
               const [subjectsRes, tasksRes] = await Promise.all([
                   fetch('http://localhost:3000/api/subjects', { headers: { 'Authorization': `Bearer ${token}` } }),
                   fetch('http://localhost:3000/api/tasks', { headers: { 'Authorization': `Bearer ${token}` } })
               ]);
               
               let subjects = [];
               let tasks = [];

               if (subjectsRes.ok) subjects = await subjectsRes.json();
               if (tasksRes.ok) tasks = await tasksRes.json();

               const storedUser = localStorage.getItem('user') || localStorage.getItem('alws_session');
               const user = storedUser ? JSON.parse(storedUser) : null;
               const userId = user?._id || user?.id || 'unknown';

               const computed = subjects.map(sub => {
                   const completedMap = JSON.parse(localStorage.getItem(`completedTasks_${userId}_${sub._id}`) || '[]');
                   const subTasks = tasks.filter(t => t.subject === sub._id);
                   const validCompleted = completedMap.filter(id => subTasks.some(t => t._id === id));
                   const progress = subTasks.length === 0 ? 0 : Math.round((validCompleted.length / subTasks.length) * 100);
                   return { ...sub, progress };
               });
               
               setSubjectsWithProgress(computed);
           } catch (err) {
               console.error("Network error fetching dashboard data:", err);
           }
       };
       loadDashboardData();
   }, []);

   // Sentiment detection states
   const [userInput, setUserInput] = useState('');
   const [analysisLoading, setAnalysisLoading] = useState(false);
   const [stressScore, setStressScore] = useState(0); // 1-10 scale
   const [recommendation, setRecommendation] = useState("Type how you feel above, and I'll analyze your stress levels.");

   const trend = [
      { day: 'Mon', state: 'Happy', icon: '😄' },
      { day: 'Tue', state: 'Stressed', icon: '😞' },
      { day: 'Wed', state: 'Neutral', icon: '😐' },
      { day: 'Thu', state: 'Stressed', icon: '😞' },
      { day: 'Fri', state: 'Happy', icon: '😄' },
      { day: 'Sat', state: 'Stressed', icon: '😞' },
      { day: 'Sun', state: mood, icon: mood === 'Happy' ? '😄' : mood === 'Neutral' ? '😐' : '😞' },
   ];

   const getSuggestions = () => {
      switch (mood) {
         case 'Stressed': return [
            { icon: 'self_improvement', text: 'Take a short mindful break' },
            { icon: 'directions_walk', text: 'A short walk clears the mind' },
            { icon: 'backspace', text: 'Avoid overloading yourself' },
         ];
         case 'Happy': return [
            { icon: 'celebration', text: 'Great energy — keep it up!' },
            { icon: 'star_rate', text: 'Tackle that challenging task now!' },
         ];
         default: return [
            { icon: 'task_alt', text: 'Stay consistent with your goals' },
            { icon: 'water_drop', text: 'Stay hydrated and focused' },
         ];
      }
   };

   const moodConfig = {
      Happy: { color: '#1DB954', bg: 'rgba(29,185,84,0.12)', border: 'rgba(29,185,84,0.3)', label: 'text-[#1DB954]' },
      Neutral: { color: '#60A5FA', bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.3)', label: 'text-blue-400' },
      Stressed: { color: '#FF5722', bg: 'rgba(255,87,34,0.12)', border: 'rgba(255,87,34,0.3)', label: 'text-[#FF5722]' },
   };

   const currentMoodColor = moodConfig[mood].color;
   const suggestions = getSuggestions();

   const analyzeMood = async () => {
      if (!userInput.trim() || analysisLoading) return;
      setAnalysisLoading(true);
      try {
         // const data = await wellbeingService.performSentimentAnalysis(userInput);
         // const { stressLevel, sentiment, recommendation } = data.data;

         await new Promise(resolve => setTimeout(resolve, 1000));
         
         const text = userInput.toLowerCase();
         let stressLevel = 5;
         let recommendation = "Everything seems to be balanced.";

         if (text.includes('stress') || text.includes('anxious') || text.includes('overwhelm')) {
             stressLevel = 8;
             recommendation = "Try taking a short break and some breathing exercises.";
         } else if (text.includes('tired') || text.includes('exhaust') || text.includes('sleepy')) {
             stressLevel = 7;
             recommendation = "You seem exhausted. Prioritize getting some mental rest.";
         } else if (text.includes('happy') || text.includes('good') || text.includes('great') || text.includes('excit')) {
             stressLevel = 2;
             recommendation = "You're in a positive mindset! Keep up the great energy.";
         } else if (text.includes('sad') || text.includes('bad') || text.includes('down')) {
             stressLevel = 8;
             recommendation = "I'm sorry you are feeling down. Be kind to yourself today.";
         }

         setStressScore(stressLevel);
         setRecommendation(recommendation);

         // Update broad mood category
         if (stressLevel >= 7) setMood('Stressed');
         else if (stressLevel <= 3) setMood('Happy');
         else setMood('Neutral');

      } catch (err) {
         console.error(err);
      } finally {
         setAnalysisLoading(false);
      }
   };

   useEffect(() => {
      const t = setTimeout(() => setChatPulse(false), 4000);
      return () => clearTimeout(t);
   }, []);

   return (
      <div className="p-6 md:p-8 text-[#EAEAEA] min-h-screen font-manrope relative overflow-x-hidden pb-32">
         {/* Ambient background glow */}
         <div
            className="pointer-events-none fixed inset-0 z-0 transition-all duration-1000"
            style={{
               background: `radial-gradient(ellipse 70% 60% at 80% 10%, ${currentMoodColor}08 0%, transparent 60%),
                       radial-gradient(ellipse 60% 50% at 10% 90%, ${currentMoodColor}05 0%, transparent 50%)`,
            }}
         />

         <div className="max-w-4xl mx-auto space-y-8 relative z-10">

            {/* ── Page Header ── */}
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, ease: "circOut" }}
               className="flex items-center gap-5"
            >
               <div
                  className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] transition-all duration-700"
                  style={{ background: `${currentMoodColor}15`, border: `1px solid ${currentMoodColor}30`, backdropFilter: 'blur(10px)' }}
               >
                  <span className="material-symbols-outlined text-3xl transition-colors duration-700" style={{ color: currentMoodColor, fontVariationSettings: "'FILL' 1" }}>psychology</span>
               </div>
               <div>
                  <h1 className="text-4xl font-black tracking-tight text-white leading-tight">Wellbeing Insights</h1>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: currentMoodColor }} />
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Emotional Health Monitoring</p>
                  </div>
               </div>
            </motion.div>

            {/* ── Automated Tracker Section ── */}
            <motion.section
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="rounded-[2.5rem] p-8 shadow-2xl border relative overflow-hidden group"
               style={{ background: 'rgba(20, 20, 20, 0.4)', borderColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)' }}
            >
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-[120px] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <span className="material-symbols-outlined" style={{ fontSize: '140px' }}>neurology</span>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-3 space-y-5">
                     <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                        Express Yourself
                        <span className="px-2 py-0.5 rounded text-[9px] bg-[#1DB954]/20 text-[#1DB954] uppercase tracking-widest border border-[#1DB954]/30">AI Powered</span>
                     </h2>
                     <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-sm">
                        Tell us how your day went. Our AI will analyze your stress levels and offer tailored support.
                     </p>
                     <div className="relative">
                        <textarea
                           value={userInput}
                           onChange={(e) => setUserInput(e.target.value)}
                           placeholder="I've been feeling a bit overwhelmed with the upcoming hackathon project..."
                           className="w-full h-32 bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm font-medium text-white placeholder-slate-600 outline-none focus:border-[#1DB954]/40 transition-all resize-none shadow-inner"
                        />
                        <motion.button
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                           onClick={analyzeMood}
                           disabled={analysisLoading || !userInput.trim()}
                           className="absolute bottom-4 right-4 bg-white text-black font-black text-[10px] px-5 py-2.5 rounded-xl uppercase tracking-widest shadow-xl disabled:opacity-50 transition-all hover:bg-[#1DB954] hover:text-white"
                        >
                           {analysisLoading ? 'Analyzing...' : 'Detect Mood'}
                        </motion.button>
                     </div>
                  </div>

                  <div className="md:col-span-2 flex flex-col items-center justify-center p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 shadow-xl">
                     <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/[0.05]" />
                           <motion.circle
                              cx="64" cy="64" r="58"
                              stroke={currentMoodColor}
                              strokeWidth="8"
                              fill="transparent"
                              strokeDasharray="364.4"
                              initial={{ strokeDashoffset: 364.4 }}
                              animate={{ strokeDashoffset: 364.4 - (364.4 * (stressScore || (mood === 'Stressed' ? 8 : mood === 'Happy' ? 2 : 5))) / 10 }}
                              transition={{ duration: 1.5, ease: "circOut" }}
                              strokeLinecap="round"
                           />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="text-3xl font-black text-white">{stressScore || (mood === 'Stressed' ? 8 : mood === 'Happy' ? 2 : 5)}</span>
                           <span className="text-[9px] uppercase font-bold text-slate-500 tracking-[0.1em]">Stress Level</span>
                        </div>
                     </div>
                     <div className="mt-6 text-center">
                        <p className="text-xs font-bold text-white mb-2 uppercase tracking-widest">Analysis Result</p>
                        <p className="text-sm font-semibold text-slate-400 leading-relaxed italic">
                           "{recommendation}"
                        </p>
                     </div>
                  </div>
               </div>
            </motion.section>

            {/* ── Two column: Trend + Suggestions ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

               {/* Mood Trend */}
               <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-[2.5rem] p-8 shadow-2xl border flex flex-col"
                  style={{ background: 'rgba(20, 20, 20, 0.4)', borderColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
               >
                  <div className="flex justify-between items-center mb-8">
                     <h2 className="text-base font-black text-white tracking-tight flex items-center gap-3">
                        <span className="material-symbols-outlined text-teal-400 text-lg">timeline</span>
                        Activity Trend
                     </h2>
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">Mental Momentum</span>
                  </div>

                  <div className="flex justify-between items-end flex-grow gap-2 px-1 pb-4">
                     {trend.map((day, i) => (
                        <motion.div
                           key={day.day}
                           className="flex flex-col items-center gap-4 flex-1 group"
                           initial={{ opacity: 0, y: 14 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 + i * 0.08 }}
                        >
                           <div className="relative flex flex-col items-center">
                              <motion.div
                                 whileHover={{ scale: 1.2, y: -4 }}
                                 className="w-10 h-10 rounded-[1rem] flex items-center justify-center text-2xl mb-1 transition-all duration-500 cursor-default"
                                 style={{
                                    background: day.state === 'Happy' ? 'rgba(29,185,84,0.1)' : day.state === 'Stressed' ? 'rgba(255,87,34,0.1)' : 'rgba(96,165,250,0.1)',
                                    border: `1px solid ${day.state === 'Happy' ? 'rgba(29,185,84,0.2)' : day.state === 'Stressed' ? 'rgba(255,87,34,0.2)' : 'rgba(96,165,250,0.2)'}`,
                                    boxShadow: i === 6 ? `0 0 24px ${currentMoodColor}40` : 'none',
                                 }}
                              >
                                 {day.icon}
                              </motion.div>
                              {i === 6 && (
                                 <div className="w-1.5 h-1.5 rounded-full mt-2 animate-bounce" style={{ background: currentMoodColor }} />
                              )}
                           </div>
                           <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-600 group-hover:text-slate-400 transition-colors">{day.day}</span>
                        </motion.div>
                     ))}
                  </div>

                  <div className="flex gap-4 mt-6 pt-6 border-t border-white/5">
                     {[['😄', 'High Vibe', '#1DB954'], ['😐', 'Stable', '#60A5FA'], ['😞', 'Low Point', '#FF5722']].map(([e, l, c]) => (
                        <div key={l} className="flex items-center gap-2">
                           <span className="text-xs opacity-70">{e}</span>
                           <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: c }}>{l}</span>
                        </div>
                     ))}
                  </div>
               </motion.section>

               {/* Suggestions */}
               <motion.section
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-[2.5rem] p-8 shadow-2xl border overflow-hidden relative"
                  style={{ background: 'rgba(20, 20, 20, 0.4)', borderColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
               >
                  <div className="absolute -bottom-6 -right-6 text-[100px] opacity-[0.02] pointer-events-none">
                     <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>spa</span>
                  </div>

                  <h2 className="text-base font-black mb-8 text-white tracking-tight flex items-center gap-3">
                     <span className="material-symbols-outlined text-[#1DB954] text-lg">auto_awesome</span>
                     Personalized Care
                  </h2>
                  <div className="space-y-4">
                     <AnimatePresence mode="wait">
                        {suggestions.map((sug, i) => (
                           <motion.div
                              key={sug.text}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -12 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-4 p-4 rounded-2xl border group cursor-pointer transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 shadow-lg"
                              style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.04)' }}
                           >
                              <div
                                 className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110"
                                 style={{ background: `${currentMoodColor}15`, border: `1px solid ${currentMoodColor}20` }}
                              >
                                 <span className="material-symbols-outlined text-xl" style={{ color: currentMoodColor }}>
                                    {sug.icon}
                                 </span>
                              </div>
                              <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{sug.text}</span>
                           </motion.div>
                        ))}
                     </AnimatePresence>
                  </div>
               </motion.section>
            </div>

            {/* ── Quick Actions ── */}
            <motion.section
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="rounded-[2.5rem] p-8 shadow-2xl border relative overflow-hidden"
               style={{ background: 'linear-gradient(135deg, rgba(20,20,20,0.4) 0%, rgba(30,30,30,0.4) 100%)', borderColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
            >
               <h2 className="text-base font-black mb-8 text-white tracking-tight flex items-center gap-3">
                  <span className="material-symbols-outlined text-white/40 text-lg">energy_savings_leaf</span>
                  Quick Refills
               </h2>
               <div className="flex flex-wrap gap-4">
                  {[
                     { text: '5 min Mindfulness', icon: 'timer' },
                     { text: 'Astro Beats', icon: 'headphones' },
                     { text: 'Somatic Stretch', icon: 'accessibility_new' },
                  ].map((action, i) => (
                     <motion.button
                        key={action.text}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 min-w-[200px] flex items-center justify-center gap-4 py-5 px-6 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all group overflow-hidden relative shadow-inner"
                        style={{
                           background: 'rgba(255,255,255,0.02)',
                           border: '1px solid rgba(255,255,255,0.06)',
                        }}
                        onMouseEnter={e => {
                           e.currentTarget.style.borderColor = `${currentMoodColor}40`;
                           e.currentTarget.style.background = `${currentMoodColor}08`;
                        }}
                        onMouseLeave={e => {
                           e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                           e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                        }}
                     >
                        <span className="material-symbols-outlined transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" style={{ color: currentMoodColor, opacity: 0.7 }}>
                           {action.icon}
                        </span>
                        {action.text}
                     </motion.button>
                  ))}
               </div>
            </motion.section>

            {/* ── Interactive CTA ── */}
            <motion.div
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               whileHover={{ scale: 1.01 }}
               onMouseEnter={() => setChatPulse(true)}
               transition={{ delay: 0.5 }}
               className="rounded-[3rem] p-1 shadow-2xl overflow-hidden cursor-pointer group"
               style={{ background: 'linear-gradient(135deg, rgba(29,185,84,0.3) 0%, rgba(0,137,123,0.3) 100%)' }}
               onClick={() => setChatOpen(true)}
            >
               <div className="rounded-[2.8rem] p-8 bg-black/40 backdrop-blur-3xl flex flex-wrap items-center gap-8 relative">
                  <div className="w-16 h-16 rounded-[1.8rem] bg-gradient-to-br from-[#1DB954] to-[#00897B] flex items-center justify-center text-3xl font-black text-white shadow-[0_4px_24px_rgba(29,185,84,0.4)] shrink-0 transition-all duration-500 group-hover:rotate-6">
                     M
                  </div>
                  <div className="flex-1 min-w-[240px]">
                     <h3 className="font-black text-white text-2xl tracking-tight mb-1">Talk to Mira</h3>
                     <p className="text-sm text-slate-400 font-semibold leading-relaxed">Your always-available mental wellness companion. Reach out if you need someone to listen, guide, or just chat.</p>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-[10px] font-black text-[#1DB954] uppercase tracking-widest leading-none">Open Mira</span>
                     <div
                        className="w-14 h-14 rounded-full flex items-center justify-center bg-[#1DB954]/20 border border-[#1DB954]/30 transition-all duration-500 group-hover:bg-[#1DB954] group-hover:scale-110"
                     >
                        <span className="material-symbols-outlined text-[#1DB954] group-hover:text-white transition-colors" style={{ fontSize: '24px' }}>chat_bubble</span>
                     </div>
                  </div>
               </div>
            </motion.div>

         </div>

         {/* ── Global Floating Chat Trigger ── */}
         <motion.button
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setChatOpen(o => !o); setChatPulse(false); }}
            className="fixed bottom-10 right-10 z-[100] w-16 h-16 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex items-center justify-center group"
            style={{
               background: 'linear-gradient(135deg, #1DB954 0%, #00897B 100%)',
            }}
         >
            <AnimatePresence mode="wait">
               {chatOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                     className="material-symbols-outlined text-white text-3xl leading-none">arrow_downward</motion.span>
               ) : (
                  <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}
                     className="material-symbols-outlined text-white text-3xl leading-none">forum</motion.span>
               )}
            </AnimatePresence>

            {chatPulse && !chatOpen && (
               <motion.span
                  className="absolute inset-0 rounded-[2rem]"
                  animate={{ scale: [1, 1.4, 1.6], opacity: [0.5, 0.2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ border: '2px solid #1DB954' }}
               />
            )}
         </motion.button>

         {/* ── Chat Overlay ── */}
         <AnimatePresence>
            {chatOpen && <Chatbot mood={mood} subjectsData={subjectsWithProgress} onClose={() => setChatOpen(false)} />}
         </AnimatePresence>
      </div>
   );
}
