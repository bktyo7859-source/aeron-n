import React from 'react';
import ProductCard from '../components/shop/ProductCard.jsx';
import { PRODUCTS } from '../data/products.js';

export default function NewReleasesPage({ onSelectProduct }) {
  const newReleases = PRODUCTS.filter((p) => p.isNewRelease || p.badge === 'New' || p.badge === 'Flagship');

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <div className="text-xs font-mono text-red-500 uppercase tracking-widest mb-2">
            FRESH FROM AERON LABS
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            NEW RELEASES & DROPS
          </h1>
          <p className="text-neutral-400 text-base max-w-2xl mt-2">
            The newest innovations in biomechanical design. Fresh colorways, upgraded chassis, and zero-compromise speed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newReleases.map((product) => (
            <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}
