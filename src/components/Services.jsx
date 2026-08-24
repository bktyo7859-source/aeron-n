import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Box, Sparkles, Smartphone, Layers } from 'lucide-react';

export default function Services({ theme }) {
  const isDark = theme === 'dark';
  const [activeCard, setActiveCard] = useState(null);

  const techEditions = [
    {
      id: '01',
      title: 'CARBON PROPULSION MATRIX',
      subtitle: 'Aerospace-Grade Curved Plate',
      icon: <Cpu className="w-7 h-7 text-[#ccff00]" />,
      description:
        'Full-length carbon fiber plate engineered with targeted flex zones to propel runners forward with minimal joint exertion.',
      deliverables: ['Energy Return +88%', 'Zero Torsional Flex', 'Aerospace Carbon', 'Sub-30g Plate Mass'],
    },
    {
      id: '02',
      title: '3D-PRINTED LATTICE MIDSOLE',
      subtitle: 'Generative Liquid Resin Geometry',
      icon: <Box className="w-7 h-7 text-cyan-400" />,
      description:
        'Custom 3D-printed lattice cushioning structure tuned to specific pressure points across the heel, arch, and forefoot.',
      deliverables: ['Custom Zonal Density', 'Z-Axis Impact Absorption', '100% Recyclable Resin', 'Hydrophobic Core'],
    },
    {
      id: '03',
      title: 'ADAPTIVE FLYWEAVE UPPER',
      subtitle: 'Precision Engineered 3D Knit',
      icon: <Layers className="w-7 h-7 text-red-500" />,
      description:
        'High-tenacity monofilament thread woven into a single-piece upper offering dynamic lockdown, zero irritation, and maximum airflow.',
      deliverables: ['Seamless Construction', 'Targeted Ventilation', 'Dynamic Midfoot Wrap', 'Water-Resistant Finish'],
    },
    {
      id: '04',
      title: 'SPATIAL AR FITTING SYSTEM',
      subtitle: 'True-To-Size Foot Scanner',
      icon: <Smartphone className="w-7 h-7 text-purple-400" />,
      description:
        'Camera-based spatial AR fitting system allowing customers to scan their foot geometry and preview sneakers live on their feet.',
      deliverables: ['Sub-Millimeter Scan', 'Instant Size Recommendation', 'Real-Time AR Overlay', 'Virtual Fitting Room'],
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full space-y-16 z-10">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#ccff00] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECTION 03 // PROPRIETARY TECH STACK</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight leading-[0.95] uppercase">
            NIKE x SNEAKX <br />
            <span className="text-[#ccff00] glow-volt">
              INNOVATION PILLARS.
            </span>
          </h2>
        </div>

        {/* 3D Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techEditions.map((tech) => {
            const isHovered = activeCard === tech.id;
            return (
              <motion.div
                key={tech.id}
                onMouseEnter={() => setActiveCard(tech.id)}
                onMouseLeave={() => setActiveCard(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`glass-card p-8 rounded-3xl border transition-all duration-500 relative group overflow-hidden ${
                  isHovered
                    ? isDark
                      ? 'border-[#ccff00]/60 shadow-[0_0_35px_rgba(204,255,0,0.25)] bg-slate-900/90 -translate-y-2'
                      : 'border-purple-600/60 shadow-[0_0_35px_rgba(147,51,234,0.15)] bg-white -translate-y-2'
                    : 'border-white/10'
                }`}
              >
                {/* Background Ambient Glow */}
                <div
                  className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none ${
                    isHovered ? 'opacity-100 bg-[#ccff00]/20' : 'opacity-0 bg-transparent'
                  }`}
                />

                <div className="flex items-start justify-between mb-8">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    {tech.icon}
                  </div>
                  <span className="text-4xl font-extrabold font-mono opacity-20 group-hover:opacity-60 transition-opacity">
                    {tech.id}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="text-2xl font-bold font-heading uppercase tracking-wide">
                    {tech.title}
                  </h3>
                  <div className="text-xs font-mono tracking-widest text-[#ccff00] uppercase font-semibold">
                    {tech.subtitle}
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {tech.description}
                  </p>
                </div>

                {/* Deliverables tags */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {tech.deliverables.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-white/5 border border-white/10 text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
