import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Zap, Wind } from 'lucide-react';
import Aeron3DCanvas from '../3d/Aeron3DCanvas.jsx';
import { PRODUCTS } from '../../data/products.js';

export default function FeaturedSneaker({ onExploreX1, onSelectProduct }) {
  const featuredProduct = PRODUCTS.find((p) => p.id === 'aeron-x1') || PRODUCTS[0];

  return (
    <section className="relative min-h-screen w-full bg-neutral-950 text-white py-24 px-6 md:px-12 flex items-center overflow-hidden border-b border-neutral-900">
      {/* BACKGROUND GRAPHICS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-neutral-900/40 tracking-tighter pointer-events-none select-none uppercase -z-0">
        AERON X1
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* LEFT COLUMN: EDITORIAL CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-mono tracking-widest uppercase">
            <span>FLAGSHIP RELEASE</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            AERON X1
          </h2>

          <p className="text-xl md:text-2xl font-light text-red-500 tracking-wide font-sans">
            THE NEXT STEP FORWARD.
          </p>

          <p className="text-neutral-400 leading-relaxed text-base">
            Engineered with a full-length carbon-infused FlightStrut™ chassis and nitrogen-charged AeroCell™ pods. The X1 delivers explosive propulsive force while preserving joint comfort across long distances.
          </p>

          {/* PRICE & HIGHLIGHT SPECS */}
          <div className="pt-4 border-t border-neutral-800 flex items-baseline gap-4">
            <span className="text-3xl md:text-4xl font-extrabold text-white font-mono">
              ₹{featuredProduct.price.toLocaleString('en-IN')}
            </span>
            <span className="text-neutral-500 line-through font-mono">
              ₹{featuredProduct.originalPrice.toLocaleString('en-IN')}
            </span>
          </div>

          {/* KEY FEATURES LIST */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="bg-neutral-900/80 p-3 rounded-xl border border-neutral-800 text-center">
              <Zap size={20} className="text-red-500 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">24% Rebound</div>
              <div className="text-[10px] text-neutral-500">Energy Return</div>
            </div>
            <div className="bg-neutral-900/80 p-3 rounded-xl border border-neutral-800 text-center">
              <Wind size={20} className="text-red-500 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">185g Weight</div>
              <div className="text-[10px] text-neutral-500">Ultra-Light</div>
            </div>
            <div className="bg-neutral-900/80 p-3 rounded-xl border border-neutral-800 text-center">
              <ShieldCheck size={20} className="text-red-500 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">Full Carbon</div>
              <div className="text-[10px] text-neutral-500">FlightStrut</div>
            </div>
          </div>

          {/* CTA BUTTONS */}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={() => onSelectProduct && onSelectProduct(featuredProduct)}
              className="px-8 py-4 bg-white text-black font-black text-sm tracking-widest uppercase rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>EXPLORE X1</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: 3D SNEAKER CANVAS SHOWCASE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-7 h-[500px] md:h-[650px] relative rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-900/50 to-neutral-950/80 border border-neutral-800/80 p-4"
        >
          <Aeron3DCanvas
            colorHex="#121212"
            scale={1.4}
            rotation={[0.3, -0.8, 0]}
            autoRotate={true}
          />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
            <div className="text-xs font-mono text-neutral-500">
              [3D MODEL INTERACTIVE — DRAG TO ROTATE]
            </div>
            <div className="text-xs font-mono text-red-500 uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-red-500/30">
              AERON BIOMECHANICS 2026
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
