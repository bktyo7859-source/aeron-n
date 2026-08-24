import React from 'react';
import { motion } from 'framer-motion';
import { LIFESTYLE_CONTENT } from '../../data/products.js';

export default function LifestyleSection({ onNavigateShop }) {
  return (
    <section className="relative bg-black text-white py-24 px-6 md:px-12 border-b border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* EDITORIAL HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-mono text-red-500 uppercase tracking-widest">
            AERON ATHLETE MOVEMENT
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-none font-sans">
            FIND YOUR SPEED.
          </h2>
          <p className="text-xl text-neutral-300 font-light max-w-2xl mx-auto">
            BUILT FOR MOTION. ENGINEERED TO SURPASS EVERY BOUNDARY.
          </p>
        </div>

        {/* 4 LIFESTYLE MEDIA CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LIFESTYLE_CONTENT.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => onNavigateShop && onNavigateShop()}
              className="relative h-[450px] rounded-3xl overflow-hidden group cursor-pointer border border-neutral-800"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover filter brightness-75 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="text-[10px] font-mono font-bold bg-red-600 text-white px-2.5 py-1 rounded-full uppercase">
                  AERON ATHLETICS
                </span>
                <h3 className="text-2xl font-black tracking-tight uppercase group-hover:text-red-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-300">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
