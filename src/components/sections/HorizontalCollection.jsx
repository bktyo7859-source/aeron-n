import React, { useRef, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products.js';

export default function HorizontalCollection({ onSelectProduct }) {
  const scrollRef = useRef(null);

  const collectionProducts = PRODUCTS.slice(0, 9);

  return (
    <section className="relative bg-neutral-950 text-white py-24 border-b border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 flex justify-between items-end">
        <div>
          <div className="text-xs font-mono text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Sparkles size={14} />
            <span>CURATED FOOTWEAR ARCHITECTURE</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            THE COLLECTION
          </h2>
        </div>
        <div className="hidden md:block text-xs font-mono text-neutral-500">
          ← SWIPE OR SCROLL HORIZONTALLY →
        </div>
      </div>

      {/* HORIZONTAL CAROUSEL */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto px-6 md:px-12 pb-8 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {collectionProducts.map((product) => {
          const img =
            product.images?.black?.side ||
            product.images?.white?.side ||
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80';

          return (
            <div
              key={product.id}
              onClick={() => onSelectProduct && onSelectProduct(product)}
              className="snap-center shrink-0 w-[300px] sm:w-[380px] bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 hover:border-red-500/50 transition-all duration-500 hover:-translate-y-3 cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-neutral-950 flex items-center justify-center p-4 mb-6">
                <img
                  src={img}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 text-[10px] font-mono font-bold bg-red-600 text-white px-2.5 py-1 rounded-full uppercase">
                  {product.category.split(' ')[0]}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight uppercase group-hover:text-red-500 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-neutral-400 font-medium">
                  {product.subtitle}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xl font-bold font-mono text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-red-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  EXPLORE <ArrowRight size={14} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
