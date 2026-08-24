import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme mode"
      className={`relative p-2.5 rounded-full backdrop-blur-xl border transition-all duration-500 flex items-center justify-center ${
        isDark
          ? 'bg-slate-900/80 border-slate-800 text-amber-300 hover:border-amber-400/50 hover:shadow-[0_0_15px_rgba(251,191,36,0.2)]'
          : 'bg-white/90 border-slate-200 text-indigo-600 hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]'
      }`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-600" />}
      </motion.div>
    </button>
  );
}
