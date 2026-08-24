import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, ShoppingBag, Zap } from 'lucide-react';

export default function Hero({ theme, onExplore, onViewProjects }) {
  const isDark = theme === 'dark';

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-24 pb-12 overflow-hidden pointer-events-none">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
        {/* Left Headline & Content */}
        <div className="lg:col-span-7 space-y-8 z-10 pointer-events-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-white/15 text-xs font-mono tracking-widest uppercase"
          >
            <Zap className="w-3.5 h-3.5 text-[#ccff00] fill-[#ccff00]" />
            <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
              [ NIKE x SNEAKX LABS // LIMITED SNKRS RELEASE ]
            </span>
          </motion.div>

          {/* Main Nike Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="space-y-1"
          >
            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-extrabold tracking-tight font-heading leading-[0.88] uppercase">
              <span className="block text-white">JUST BUILD</span>
              <span className="block text-[#ccff00] glow-volt">
                THE FUTURE.
              </span>
            </h1>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`text-base sm:text-lg max-w-xl font-normal leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Engineering the next era of spatial footwear.{' '}
            <strong className={isDark ? 'text-white' : 'text-slate-900'}>NIKE x SNEAKX AIR 3000</strong>{' '}
            unites full-length carbon matrix plates, 3D-printed liquid resin midsoles, and reactive nitrogen air cushioning.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <button
              onClick={onExplore}
              className="group px-8 py-4 rounded-full font-mono text-xs tracking-widest font-extrabold uppercase transition-all duration-300 flex items-center gap-3 transform hover:-translate-y-0.5 shadow-2xl bg-[#ccff00] text-black shadow-[0_0_30px_rgba(204,255,0,0.5)] hover:shadow-[0_0_50px_rgba(204,255,0,0.8)]"
            >
              <span>EXPLORE SNEAKER</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onViewProjects}
              className={`px-8 py-4 rounded-full font-mono text-xs tracking-widest font-bold uppercase glass-panel border transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 ${
                isDark
                  ? 'border-white/20 text-white hover:border-[#ccff00] hover:text-[#ccff00]'
                  : 'border-slate-300 text-slate-800 hover:border-purple-600 hover:text-purple-700'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#ccff00]" />
              <span>SNKRS COLLECTION</span>
            </button>
          </motion.div>
        </div>

        {/* Right side background zone for 3D Sneaker object */}
        <div className="lg:col-span-5 h-[300px] lg:h-full flex items-center justify-center">
          <div className="w-full max-w-[340px] aspect-square rounded-full border border-[#ccff00]/15 animate-pulse pointer-events-none" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto cursor-pointer"
        onClick={onExplore}
      >
        <span className={`text-[10px] font-mono tracking-[0.25em] uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          SCROLL TO EXPLORE SNEAKER TECH
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className={`p-2 rounded-full border ${
            isDark ? 'border-slate-800 text-[#ccff00]' : 'border-slate-300 text-purple-600'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
