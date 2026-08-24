import React, { useState, useMemo } from 'react';
import ProductFilter from '../components/shop/ProductFilter.jsx';
import ProductCard from '../components/shop/ProductCard.jsx';
import { PRODUCTS } from '../data/products.js';

export default function ShopPage({ initialCategory = 'all', searchQuery = '', onSelectProduct }) {
  const [category, setCategory] = useState(initialCategory);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [maxPrice, setMaxPrice] = useState(25000);
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory) return false;
      }

      // Category filter
      if (category !== 'all') {
        const cat = category.toLowerCase();
        const matchesGender = p.gender?.toLowerCase() === cat;
        const matchesCatStr = p.category.toLowerCase().includes(cat);
        const isNewDrop = cat === 'new-releases' && p.isNewRelease;
        if (!matchesGender && !matchesCatStr && !isNewDrop) return false;
      }

      // Size filter
      if (size && p.sizes && !p.sizes.includes(size)) return false;

      // Color filter
      if (color && p.defaultColor !== color) return false;

      // Price filter
      if (p.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [category, size, color, maxPrice, sortBy, searchQuery]);

  const handleReset = () => {
    setCategory('all');
    setSize(null);
    setColor(null);
    setMaxPrice(25000);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* PAGE HEADER */}
        <div>
          <div className="text-xs font-mono text-red-500 uppercase tracking-widest mb-2">
            AERON FOOTWEAR CATALOG
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            SHOP ALL SNEAKERS
          </h1>
          <p className="text-neutral-400 text-sm md:text-base max-w-xl mt-2">
            Explore our biomechanically engineered collection. {filteredProducts.length} models match your criteria.
          </p>
        </div>

        {/* FILTERS TOOLBAR */}
        <ProductFilter
          selectedCategory={category}
          onSelectCategory={setCategory}
          selectedSize={size}
          onSelectSize={setSize}
          selectedColor={color}
          onSelectColor={setColor}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onResetFilters={handleReset}
        />

        {/* PRODUCTS EDITORIAL GRID (4-col desktop, 3-col tablet, 2-col mobile) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-neutral-900/50 rounded-3xl border border-neutral-800 space-y-4">
            <h3 className="text-xl font-bold text-neutral-300">No sneakers match your exact filters.</h3>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase rounded-full"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
