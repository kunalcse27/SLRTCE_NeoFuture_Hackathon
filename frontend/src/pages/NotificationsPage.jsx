import React from 'react';
import { motion } from 'framer-motion';

export default function NotificationsPage() {
  return (
    <div className="pt-28 p-10 max-w-7xl mx-auto space-y-10 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-5xl font-extrabold tracking-tighter text-on-surface font-headline leading-tight">
            User <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1DB954] to-teal-400">Notifications.</span>
          </h2>
          <p className="text-on-surface-variant max-w-md font-label">Stay updated with the latest alerts, reports, and system announcements.</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-20 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center text-center gap-6"
      >
        <div className="w-24 h-24 rounded-full bg-[#1DB954]/10 border border-[#1DB954]/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-[#1DB954] text-5xl" data-icon="notifications_off">notifications_off</span>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-on-surface font-headline">No new notifications</h3>
          <p className="text-slate-500 max-w-sm mx-auto font-label">You're all caught up! When you have new alerts or updates, they'll appear here.</p>
        </div>
        <button className="mt-4 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
          Refresh Inbox
        </button>
      </motion.div>
    </div>
  );
}
