import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Wind, ShieldCheck, Sparkles } from 'lucide-react';

export default function About({ theme }) {
  const isDark = theme === 'dark';

  const stats = [
    { label: 'ENERGY RETURN RATING', value: '88%' },
    { label: 'ULTRA-LIGHT WEIGHT', value: '280g' },
    { label: 'RECYCLED ECO POLYMER', value: '100%' },
    { label: 'SNKRS INNOVATION AWARDS', value: '12' },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-[#ccff00]" />,
      title: 'Nitrogen Air Cushioning',
      description:
        'Dual-density nitrogen-infused Air Max heel units return 88% of impact energy into explosive forward propulsion.',
    },
    {
      icon: <Wind className="w-6 h-6 text-cyan-400" />,
      title: 'Adaptive Flyweave Upper',
      description:
        'High-tenacity monofilament knit engineered into a single-piece upper offering dynamic midfoot wrap and targeted ventilation.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
      title: 'Carbon Fiber Propulsion Plate',
      description:
        'Aerospace-grade full-length curved carbon plate integrated into the midsole shank for max torsional stiffness.',
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full space-y-20 z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#ccff00] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SECTION 02 // AIR MATRIX ENGINEERING</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight leading-[0.95] uppercase">
              WE DESIGN <br />
              <span className="text-[#ccff00] glow-volt">
                DIGITAL FOOTWEAR.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className={`text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              At SNEAKX Labs, we push the boundaries of modern athletic footwear. Merging spatial WebGL presentation with Nike-grade performance materials for athletes and collectors worldwide.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="glass-card p-6 rounded-2xl border border-white/10 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#ccff00]/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
              <div className="text-3xl sm:text-5xl font-extrabold font-heading text-[#ccff00] mb-2">
                {stat.value}
              </div>
              <div className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.7 }}
              className="glass-card p-8 rounded-3xl border border-white/10 space-y-4 hover:border-[#ccff00]/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-3 rounded-2xl bg-white/5 w-fit border border-white/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold font-heading uppercase tracking-wide">
                {item.title}
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
