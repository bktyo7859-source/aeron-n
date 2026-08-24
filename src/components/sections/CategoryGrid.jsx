import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../../data/products.js';

export default function CategoryGrid({ onSelectCategory }) {
  return (
    <section className="relative bg-neutral-950 text-white py-24 px-6 md:px-12 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="text-xs font-mono text-red-500 uppercase tracking-widest mb-2">
              DISCOVER BY CATEGORY
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              SHOP DEPARTMENTS
            </h2>
          </div>
        </div>

        {/* CATEGORY CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => onSelectCategory && onSelectCategory(cat.id)}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer border border-neutral-800 h-80 md:h-96 ${
                idx === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover filter brightness-70 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">
                    AERON DEPARTMENT
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight uppercase group-hover:text-red-500 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-neutral-300 max-w-sm">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="p-3 rounded-full bg-white text-black group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
