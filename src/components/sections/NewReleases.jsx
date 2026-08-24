import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../shop/ProductCard.jsx';
import { PRODUCTS } from '../../data/products.js';

export default function NewReleases({ onSelectProduct, onNavigateShop }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'new') return p.isNewRelease;
    if (activeFilter === 'running') return p.category.toLowerCase().includes('running');
    if (activeFilter === 'lifestyle') return p.category.toLowerCase().includes('lifestyle');
    return true;
  });

  return (
    <section className="relative min-h-screen w-full bg-black text-white py-24 px-6 md:px-12 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* HEADER & FILTER TABS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-mono text-red-500 uppercase tracking-widest mb-2">
              LATEST DROP 2026
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              NEW RELEASES
            </h2>
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'ALL MODELS' },
              { id: 'new', label: 'NEW DROPS' },
              { id: 'running', label: 'RUNNING' },
              { id: 'lifestyle', label: 'LIFESTYLE' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-red-600 text-white font-bold shadow-lg'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 12+ PRODUCT CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ProductCard product={product} onSelectProduct={onSelectProduct} />
            </motion.div>
          ))}
        </div>

        {/* VIEW ALL CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onNavigateShop}
            className="px-10 py-5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-black text-sm tracking-widest uppercase rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            VIEW ALL AERON SNEAKERS ({PRODUCTS.length})
          </button>
        </div>
      </div>
    </section>
  );
}
