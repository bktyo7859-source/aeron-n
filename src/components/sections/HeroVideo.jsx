import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, ChevronDown } from 'lucide-react';
import { BRAND_INFO } from '../../data/products.js';

export default function HeroVideo({ onExplore, onShopNow }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Video autoplay policy fallback handling
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen min-h-[100vh] min-h-[100svh] w-full overflow-hidden bg-black flex flex-col justify-between pt-24 md:pt-28 pb-12 text-white">
      {/* VIDEO BACKGROUND WITH CANVAS / CSS FALLBACK */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          src="/assets/videos/hero-sneaker.mp4"
          poster="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1920&q=80"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-75 transition-transform duration-1000"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        {/* CINEMATIC FALLBACK ANIMATED GRADIENT IF VIDEO ABSENT */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-zinc-950/80 to-red-950/30 animate-pulse" />

        {/* DARK GRADIENT OVERLAYS FOR MAXIMUM READABILITY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black" />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center my-auto">
        {/* BRAND TAGLINE BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs md:text-sm font-mono tracking-widest text-neutral-300 uppercase mb-4 md:mb-6"
        >
          <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
          AERON BIOMECHANICAL LABS
        </motion.div>

        {/* MAIN HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase font-sans leading-none mb-4 md:mb-6 drop-shadow-2xl"
        >
          {BRAND_INFO.tagline}
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-xl md:text-2xl font-light text-neutral-300 max-w-2xl mb-8 md:mb-10 tracking-wide"
        >
          Engineered for motion. Designed for the future. Experience 24% higher energy return with zero compromise.
        </motion.p>

        {/* CALL TO ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onShopNow}
            className="w-full sm:w-auto px-10 py-4 md:py-5 bg-red-600 hover:bg-red-500 text-white font-black text-sm tracking-widest uppercase rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>SHOP NOW</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-10 py-4 md:py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold text-sm tracking-widest uppercase rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play size={16} className="fill-white" />
            <span>EXPLORE 3D X1</span>
          </button>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.button
        onClick={onExplore}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 flex flex-col items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer mt-4"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL TO DISCOVER</span>
        <ChevronDown size={18} className="animate-bounce text-red-500" />
      </motion.button>
    </section>
  );
}
