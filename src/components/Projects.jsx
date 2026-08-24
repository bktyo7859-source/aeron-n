import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag } from 'lucide-react';
import ProjectModal from './ProjectModal.jsx';

export default function Projects({ theme }) {
  const isDark = theme === 'dark';
  const [selectedProject, setSelectedProject] = useState(null);

  const sneakerCollection = [
    {
      id: 's1',
      title: 'AIR MAX 3000 VOLT',
      category: 'SNKRS EXCLUSIVE',
      year: '2026 RELEASE',
      price: '$299',
      gradient: 'from-zinc-900 via-black to-[#ccff00]/40',
      description: 'Iconic Nike Volt neon cushioning paired with aerospace carbon propulsion plate and obsidian Flyknit upper.',
      fullDescription:
        'AIR MAX 3000 VOLT is the flagship SNKRS drop. Featuring dual nitrogen-infused air heel units, an aerospace-grade carbon fiber plate, and reactive neon underglow.',
      tech: ['Nitrogen Air Sole', 'Carbon Fiber Plate', 'Volt Neon Underglow', 'Flyknit Upper'],
      highlights: [
        '88% Energy return rating',
        '280g Ultra-lightweight construction',
        'Reflective 3M safety accents',
        'SNKRS certified limited launch',
      ],
    },
    {
      id: 's2',
      title: 'JORDAN SNEAKX CHICAGO',
      category: 'VARSITY RED DROP',
      year: 'HERITAGE ED.',
      price: '$320',
      gradient: 'from-red-950 via-black to-zinc-900',
      description: 'Classic Chicago red leather upper updated with 3D-printed liquid resin midsole and gold lace eyelets.',
      fullDescription:
        'JORDAN SNEAKX CHICAGO honors heritage basketball culture with 2026 spatial technology. Premium varsity red leather, a 3D-printed lattice midsole, and custom wings emblem.',
      tech: ['Varsity Red Leather', '3D Printed Resin Midsole', 'Memory Foam Collar', 'Gold Lace Loops'],
      highlights: [
        'Heritage Chicago colorway aesthetics',
        'Custom pressure-mapped 3D lattice cushioning',
        'Premium full-grain leather upper',
        'Collector numbered release box',
      ],
    },
    {
      id: 's3',
      title: 'STEALTH OBSIDIAN',
      category: 'BLACK MATRIX',
      year: 'STEALTH LAB',
      price: '$350',
      gradient: 'from-slate-950 via-zinc-900 to-purple-950',
      description: 'Matte obsidian synthetic leather upper paired with gold metallic accents and carbon shank.',
      fullDescription:
        'STEALTH OBSIDIAN delivers dark stealth luxury. Crafted from waterproof matte obsidian leather, gold-plated lace eyelets, and an invisible carbon shank for supreme lockdown.',
      tech: ['Matte Obsidian Finish', 'Gold Metallic Eyelets', 'Carbon Fiber Shank', 'Zero-G Foam'],
      highlights: [
        'Waterproof matte obsidian leather',
        'Gold metallic lace eyelet matrix',
        'Stealth carbon shank arch support',
        'Limited to 1,000 units worldwide',
      ],
    },
    {
      id: 's4',
      title: 'CYBER CHROME 2026',
      category: 'FUTURE RACE DAY',
      year: 'MARATHON PRO',
      price: '$280',
      gradient: 'from-cyan-950 via-slate-900 to-indigo-950',
      description: 'Metallic chrome silver marathon shoe with electric blue Air Max sole and hyper-rebound foam.',
      fullDescription:
        'CYBER CHROME 2026 is built for breaking marathon records. Weighing just 240g, it features an aggressive forefoot rocker geometry and hyper-rebound nitrogen foam.',
      tech: ['Hyper-Rebound Foam', 'Aggressive Toe Rocker', 'Monofilament Mesh', 'High-Traction Grip'],
      highlights: [
        '240g Featherweight racing build',
        'Aggressive toe-off rocker geometry',
        'High-traction rubber outsole',
        'Marathon competition certified',
      ],
    },
  ];

  return (
    <>
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full space-y-16 z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#ccff00] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SECTION 04 // SNKRS COLLECTION</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight leading-[0.95] uppercase">
                OFFICIAL NIKE x SNEAKX <br />
                <span className="text-[#ccff00] glow-volt">
                  SNKRS LINEUP.
                </span>
              </h2>
            </div>
            <p className={`text-sm max-w-md ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Select any sneaker to inspect detailed 3D materials, available shoe sizes, performance specs, and SNKRS add-to-cart.
            </p>
          </div>

          {/* Sneaker Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sneakerCollection.map((sneaker, idx) => (
              <motion.div
                key={sneaker.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.7 }}
                onClick={() => setSelectedProject(sneaker)}
                className="group glass-card rounded-3xl overflow-hidden border border-white/10 cursor-pointer hover:border-[#ccff00]/60 transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Visual Thumbnail Banner */}
                <div className={`relative h-64 w-full bg-gradient-to-tr ${sneaker.gradient} overflow-hidden p-6 flex flex-col justify-between`}>
                  <div className="flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md border border-white/20 text-white">
                      {sneaker.category}
                    </span>
                    <span className="text-xs font-mono font-extrabold tracking-widest text-[#ccff00] bg-black/60 px-3.5 py-1 rounded-full border border-[#ccff00]/40">
                      {sneaker.price}
                    </span>
                  </div>

                  <div className="relative z-10 flex items-end justify-between">
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white uppercase tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                      {sneaker.title}
                    </h3>
                    <div className="p-3 rounded-full bg-[#ccff00] text-black group-hover:scale-110 transition-all shadow-[0_0_15px_rgba(204,255,0,0.6)]">
                      <ShoppingBag className="w-5 h-5 fill-black" />
                    </div>
                  </div>

                  {/* Decorative mesh circle */}
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-[#ccff00]/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                </div>

                {/* Content Footer */}
                <div className="p-6 space-y-4">
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {sneaker.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {sneaker.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] font-mono text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/20 px-2.5 py-1 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        theme={theme}
      />
    </>
  );
}
