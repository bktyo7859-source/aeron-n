import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            if (onFinish) onFinish();
          }, 200);
          return 100;
        }
        return prev + 15;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#09090b] text-white selection:bg-purple-500/30"
        >
          {/* Background Ambient Glow */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[140px] pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/20 blur-[100px] pointer-events-none" />

          {/* Wireframe Rotating Core */}
          <div className="relative mb-8 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl border-2 border-purple-500/40 border-t-purple-400 border-r-cyan-400 animate-spin duration-[2000ms]" />
            <div className="absolute w-12 h-12 rounded-xl border-2 border-cyan-500/40 border-b-cyan-300 animate-spin duration-[1500ms] reverse" />
            <div className="absolute w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-500 to-cyan-400 animate-pulse shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
          </div>

          {/* Brand Header */}
          <div className="text-center mb-6 space-y-1">
            <div className="text-3xl font-extrabold tracking-widest font-heading bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
              SNEAKX
            </div>
            <p className="text-xs font-mono text-slate-400 tracking-[0.25em] uppercase">
              LOADING EXPERIENCE
            </p>
          </div>

          {/* Progress Bar Container */}
          <div className="w-56 max-w-[80vw] h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 relative">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 transition-all duration-150 ease-out shadow-[0_0_15px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Numerical Progress */}
          <div className="mt-3 font-mono text-xs text-cyan-400 font-semibold tracking-widest">
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
