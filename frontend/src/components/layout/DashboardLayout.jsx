import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#121212] selection:bg-[#1DB954]/30">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen relative">
        <Header />
        <div className="pt-20"> {/* Offset for Fixed Header */}
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      {/* Decorative background gradients */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#1DB954]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-64 w-[400px] h-[400px] bg-[#FF5722]/5 rounded-full blur-[100px] pointer-events-none z-0" />
    </div>
  );
}
