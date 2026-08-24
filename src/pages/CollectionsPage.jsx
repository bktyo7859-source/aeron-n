import React from 'react';
import ProductCard from '../components/shop/ProductCard.jsx';
import { PRODUCTS } from '../data/products.js';

export default function CollectionsPage({ onSelectProduct }) {
  const collections = [
    { title: "FLIGHTSTRUT™ SPEED SERIES", desc: "Carbon-infused long-distance competition shoes.", items: PRODUCTS.filter(p => p.category.includes("Running") || p.category.includes("Speed")) },
    { title: "URBAN ARCHITECTURE", desc: "Minimalist streetwear sneakers built for high-cadence city living.", items: PRODUCTS.filter(p => p.category.includes("Lifestyle")) },
    { title: "PRO COURT & TRAINING", desc: "High-top lockdown and lateral stability shanks.", items: PRODUCTS.filter(p => p.category.includes("Court") || p.category.includes("Training")) }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        <div>
          <div className="text-xs font-mono text-red-500 uppercase tracking-widest mb-2">
            CURATED CAPSULES
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            AERON COLLECTIONS
          </h1>
        </div>

        {collections.map((col, idx) => (
          <div key={idx} className="space-y-6 pt-6 border-t border-neutral-900">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase text-white">
                {col.title}
              </h2>
              <p className="text-sm text-neutral-400 font-mono mt-1">{col.desc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {col.items.map((product) => (
                <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
