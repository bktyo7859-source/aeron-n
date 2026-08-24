import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar({ theme, onToggleTheme, activeSection, onNavigate, onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = theme === 'dark';

  const navLinks = [
    { label: 'SNKRS', sectionIndex: 0 },
    { label: 'AIR MATRIX', sectionIndex: 1 },
    { label: 'INNOVATION', sectionIndex: 2 },
    { label: 'COLLECTION', sectionIndex: 3 },
    { label: '3D LAB', sectionIndex: 4 },
    { label: 'RESERVE DROP', sectionIndex: 5 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12 ${
          isScrolled
            ? 'py-3 backdrop-blur-2xl bg-black/85 border-b border-white/10 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Nike Swoosh + SNEAKX Logo */}
          <button
            onClick={() => onNavigate(0)}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="relative w-9 h-9 rounded-xl bg-black border border-[#ccff00]/40 p-1 shadow-lg shadow-[#ccff00]/20 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              {/* Nike Swoosh SVG */}
              <svg viewBox="0 0 100 100" fill="none" className="w-6 h-6">
                <path d="M 15 52 C 35 64, 50 70, 85 25 C 65 48, 45 56, 28 46 Z" fill="#ccff00" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-widest font-heading text-white uppercase">
                NIKE <span className="text-[#ccff00]">x</span> SNEAKX
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-1">
                SNKRS LAB 2026
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 glass-panel px-6 py-2 rounded-full border border-white/10 shadow-lg">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionIndex;
              return (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.sectionIndex)}
                  className={`relative px-4 py-2 text-xs font-mono tracking-widest font-semibold transition-colors duration-300 rounded-full ${
                    isActive
                      ? isDark
                        ? 'text-[#ccff00] font-extrabold'
                        : 'text-purple-600 font-bold'
                      : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full ${
                        isDark ? 'bg-[#ccff00] shadow-[0_0_10px_#ccff00]' : 'bg-purple-600'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-4">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <button
              onClick={onOpenContact}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest font-extrabold bg-[#ccff00] text-black shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:shadow-[0_0_30px_rgba(204,255,0,0.8)] transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase"
            >
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>SNKRS PASS</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full glass-panel border border-white/10 text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-40 lg:hidden flex flex-col justify-center px-8 backdrop-blur-3xl ${
              isDark ? 'bg-black/95 text-white' : 'bg-slate-950/95 text-white'
            }`}
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    onNavigate(link.sectionIndex);
                    setMobileMenuOpen(false);
                  }}
                  className="text-2xl font-extrabold font-heading tracking-widest hover:text-[#ccff00] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-8 border-t border-slate-800 flex justify-center">
                <button
                  onClick={() => {
                    onOpenContact();
                    setMobileMenuOpen(false);
                  }}
                  className="px-8 py-3 rounded-full bg-[#ccff00] text-black font-mono text-sm tracking-widest font-extrabold shadow-xl"
                >
                  SNKRS PASS →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
