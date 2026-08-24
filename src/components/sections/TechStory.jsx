import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Activity } from 'lucide-react';

const TECH_ITEMS = [
  {
    id: "lightweight",
    title: "LIGHTWEIGHT",
    subtitle: "185 grams of unadulterated speed.",
    desc: "By deploying single-strand AeroKnit monofilament mesh and removing excess structural overlays, the AERON X1 reduces upper mass to near weightlessness without compromising lateral stability.",
    stat: "185g",
    statLabel: "Total Shoe Mass",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "responsive",
    title: "RESPONSIVE",
    subtitle: "Dual nitrogen-infused AeroCell™ propulsion core.",
    desc: "Nitrogen gas pressurized within micro-cellular chambers delivers dynamic elastic snapback, returning 24% more kinetic energy into forward velocity with every footstrike.",
    stat: "+24%",
    statLabel: "Kinetic Energy Rebound",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "breathable",
    title: "BREATHABLE",
    subtitle: "Precision laser micro-perforations.",
    desc: "Thermographic heat mapping directs laser-cut cooling channels precisely over high-temperature foot zones, ensuring optimal microclimate regulation under extreme exertion.",
    stat: "360°",
    statLabel: "Airflow Circulation",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "traction",
    title: "HIGH TRACTION",
    subtitle: "Vortex multi-surface pavement compound.",
    desc: "Computer-optimized tread lugs channel surface water outwards while providing immediate friction against wet asphalt, indoor wooden courts, and synthetic track surfaces.",
    stat: "100%",
    statLabel: "Ground Engagement",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function TechStory() {
  const [activeTechIndex, setActiveTechIndex] = useState(0);
  const currentTech = TECH_ITEMS[activeTechIndex];

  return (
    <section className="relative min-h-screen w-full bg-black text-white pt-6 pb-24 border-b border-neutral-900 overflow-hidden">
      {/* 100% SCREEN-WIDTH INFINITE TELEMETRY MARQUEE */}
      <div className="w-full bg-neutral-950/90 border-y border-neutral-800/80 py-3.5 mb-16 overflow-hidden select-none">
        <div className="animate-marquee gap-8 text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 shrink-0">
              <span className="flex items-center gap-2 text-red-500 font-bold">
                <Activity size={14} className="animate-pulse" />
                TELEMETRY ACTIVE
              </span>
              <span className="text-neutral-700">•</span>
              <span>AEROCELL™ NITROGEN PODS</span>
              <span className="text-neutral-700">•</span>
              <span>CARBON FLIGHTSTRUT™ CHASSIS</span>
              <span className="text-neutral-700">•</span>
              <span>360° LASER COOLING</span>
              <span className="text-neutral-700">•</span>
              <span>VORTEX TREAD GRIP</span>
              <span className="text-neutral-700">•</span>
              <span className="text-red-400 font-semibold">185G FOOTPRINT</span>
              <span className="text-neutral-700">•</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* SECTION TITLE */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-mono uppercase tracking-widest">
            <Cpu size={14} />
            <span>AERON MATERIAL LABS</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase font-sans">
            ENGINEERED TO PERFECTION
          </h2>
          <p className="text-neutral-400 text-base md:text-lg">
            Every component of an AERON sneaker is designed to eliminate drag and amplify athletic potential.
          </p>
        </div>

        {/* TAB BUTTONS */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {TECH_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveTechIndex(idx)}
              className={`px-6 py-3 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                idx === activeTechIndex
                  ? 'bg-red-600 text-white font-bold shadow-xl shadow-red-900/30 scale-105'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* CONTENT & VISUAL DISPLAY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* TEXT DESCRIPTION */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTech.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-6xl md:text-8xl font-black text-red-600/20 font-mono">
                  0{activeTechIndex + 1}
                </div>
                <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  {currentTech.title}
                </h3>
                <p className="text-xl text-neutral-300 font-medium leading-snug">
                  {currentTech.subtitle}
                </p>
                <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                  {currentTech.desc}
                </p>

                {/* STAT HIGHLIGHT BOX */}
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl inline-block">
                  <div className="text-4xl md:text-5xl font-black text-red-500 font-mono mb-1">
                    {currentTech.stat}
                  </div>
                  <div className="text-xs text-neutral-400 uppercase font-mono tracking-wider">
                    {currentTech.statLabel}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* VISUAL IMAGE SHOWCASE WITH ZOOM TRANSITION */}
          <div className="lg:col-span-7 h-[450px] md:h-[600px] relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentTech.id}
                src={currentTech.image}
                alt={currentTech.title}
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.7 }}
                className="w-full h-full object-cover filter brightness-90"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-xs font-mono text-neutral-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-800">
              AERON TECH // LAB SPECS 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
