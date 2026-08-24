import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';

export default function ProjectModal({ project, onClose, theme }) {
  if (!project) return null;
  const isDark = theme === 'dark';
  const [selectedSize, setSelectedSize] = useState('US 10');
  const [addedToCart, setAddedToCart] = useState(false);

  const sizes = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12', 'US 13'];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className={`relative w-full max-w-4xl rounded-3xl overflow-hidden glass-panel border shadow-2xl z-10 my-8 ${
            isDark ? 'bg-[#09090b] border-white/15 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header Image banner */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-gradient-to-br from-zinc-950 via-black to-zinc-900 flex items-center justify-center">
            {/* Synthetic Generative Graphic */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${project.gradient} opacity-50 mix-blend-overlay`} />

            <div className="relative z-10 text-center p-6 space-y-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-black/60 border border-[#ccff00]/40 text-[#ccff00]">
                {project.category} // {project.year}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading uppercase text-white tracking-wide">
                {project.title}
              </h2>
              <div className="text-2xl font-extrabold font-mono text-[#ccff00]">
                {project.price}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-[#ccff00] hover:text-black transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-mono tracking-widest text-[#ccff00] uppercase font-semibold">
                SNKRS SPECIFICATIONS & OVERVIEW
              </h3>
              <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {project.fullDescription}
              </p>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono tracking-widest uppercase">
                <span className="text-[#ccff00]">SELECT SNEAKER SIZE</span>
                <span className="text-slate-400">TRUE TO SIZE FIT</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      selectedSize === sz
                        ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.5)] border border-[#ccff00]'
                        : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Stack & Key Innovations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div className="space-y-3">
                <h4 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                  MATERIAL & TECH BREAKDOWN
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono tracking-widest text-[#ccff00] uppercase">
                  PERFORMANCE HIGHLIGHTS
                </h4>
                <ul className="space-y-2 text-sm">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Guarantee badges */}
            <div className="flex items-center gap-6 text-xs font-mono text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#ccff00]" />
                <span>EXPRESS GLOBAL SHIPPING</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>AUTHENTICITY GUARANTEED</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-full font-mono text-xs tracking-widest border border-white/15 hover:bg-white/5 transition-colors"
              >
                BACK TO COLLECTION
              </button>

              <button
                onClick={handleAddToCart}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-mono text-xs tracking-widest font-extrabold uppercase flex items-center justify-center gap-2 shadow-xl transition-all ${
                  addedToCart
                    ? 'bg-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                    : 'bg-[#ccff00] text-black shadow-[0_0_25px_rgba(204,255,0,0.5)] hover:shadow-[0_0_40px_rgba(204,255,0,0.8)]'
                }`}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ADDED TO CART ({selectedSize})</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>SNKRS ADD TO CART — {project.price}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
