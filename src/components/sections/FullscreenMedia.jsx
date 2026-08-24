import React from 'react';
import { motion } from 'framer-motion';

export default function FullscreenMedia() {
  return (
    <div className="w-full bg-black text-white">
      {/* SECTION 1: FULLSCREEN IMAGE WITH "EVERY DETAIL MATTERS." */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=2000&q=80"
            alt="AERON Craftsmanship Detail"
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="text-xs font-mono text-red-500 uppercase tracking-widest">
              PRECISION CRAFTSMANSHIP
            </div>
            <h2 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none font-sans">
              EVERY DETAIL MATTERS.
            </h2>
            <p className="text-lg md:text-xl font-light text-neutral-300 max-w-xl mx-auto">
              From laser-bonded seams to carbon fiber stability shanks, zero compromises are made in our search for speed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: CINEMATIC PERFORMANCE VIDEO WITH "MOVE DIFFERENT." */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center border-t border-neutral-900">
        <div className="absolute inset-0 z-0">
          <video
            src="/assets/videos/performance.mp4"
            poster="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1920&q=80"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover filter brightness-70 scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-zinc-950/70 to-red-950/30 animate-pulse -z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="text-xs font-mono text-red-500 uppercase tracking-widest">
              AERON PERFORMANCE CAMPAIGN
            </div>
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase leading-none">
              MOVE DIFFERENT.
            </h2>
            <p className="text-xl md:text-2xl font-light text-neutral-200 tracking-wide max-w-2xl mx-auto">
              Defy conventional expectations. Walk, run, jump, and sprint with hyper-responsive energy return.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
