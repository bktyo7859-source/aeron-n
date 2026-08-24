import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Aeron3DCanvas from '../3d/Aeron3DCanvas.jsx';
import { COLORWAYS } from '../../data/products.js';

export default function ColorwaySelector() {
  const [selectedColor, setSelectedColor] = useState(COLORWAYS[0]);

  return (
    <section className="relative min-h-screen w-full bg-neutral-950 text-white py-24 px-6 md:px-12 border-b border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* LEFT: COLOR SELECTION & DESCRIPTION */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="text-xs font-mono text-red-500 uppercase tracking-widest mb-2">
              COLORWAY CUSTOM LAB
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
              CHOOSE YOUR SPECTRUM
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              Explore the AERON X1 in high-impact monochromatic and vibrant colorways. Each finish features anodized metal lace locks and high-contrast cushion pods.
            </p>
          </div>

          {/* ACTIVE COLOR TITLE */}
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-1">
              Active Colorway
            </div>
            <div className="text-2xl font-bold text-white font-mono">
              {selectedColor.name}
            </div>
          </div>

          {/* COLOR SWATCH BUTTONS */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              Select Colorway ({COLORWAYS.length})
            </div>
            <div className="flex flex-wrap gap-4">
              {COLORWAYS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c)}
                  className={`relative p-1 rounded-full transition-all duration-300 cursor-pointer ${
                    selectedColor.id === c.id ? 'ring-2 ring-red-500 scale-110' : 'hover:scale-105'
                  }`}
                  title={c.name}
                >
                  <span
                    className="block w-10 h-10 rounded-full border border-neutral-700 shadow-md"
                    style={{ backgroundColor: c.hex }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: 3D SNEAKER WITH DYNAMIC COLORWAY UPDATE */}
        <div className="lg:col-span-7 h-[500px] md:h-[650px] relative rounded-3xl overflow-hidden bg-neutral-900/60 border border-neutral-800 p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedColor.id}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.3 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <Aeron3DCanvas
                colorHex={selectedColor.hex}
                scale={1.35}
                rotation={[0.2, 0.8, 0]}
                autoRotate={false}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-300">
            {selectedColor.name.toUpperCase()}
          </div>
        </div>
      </div>
    </section>
  );
}
