import React from 'react';
import { Filter, RotateCcw, ChevronDown } from 'lucide-react';
import { COLORWAYS } from '../../data/products.js';

export default function ProductFilter({
  selectedCategory,
  onSelectCategory,
  selectedSize,
  onSelectSize,
  selectedColor,
  onSelectColor,
  maxPrice,
  onMaxPriceChange,
  sortBy,
  onSortByChange,
  onResetFilters
}) {
  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'kids', label: 'Kids' },
    { id: 'running', label: 'Running' },
    { id: 'lifestyle', label: 'Lifestyle' }
  ];

  const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 mb-12 space-y-6 text-white">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2 font-extrabold uppercase tracking-tight text-lg">
          <Filter size={18} className="text-red-500" />
          <span>REFINE CATALOG</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs font-mono text-neutral-400 hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw size={14} />
          <span>RESET FILTERS</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* CATEGORY FILTER */}
        <div>
          <label className="block text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm font-semibold text-white focus:outline-none focus:border-red-500 cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* SIZE FILTER */}
        <div>
          <label className="block text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
            Size (EU)
          </label>
          <select
            value={selectedSize || ''}
            onChange={(e) => onSelectSize(e.target.value ? Number(e.target.value) : null)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm font-semibold text-white focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="">All Sizes</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                EU {s}
              </option>
            ))}
          </select>
        </div>

        {/* COLORWAY FILTER */}
        <div>
          <label className="block text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
            Colorway
          </label>
          <select
            value={selectedColor || ''}
            onChange={(e) => onSelectColor(e.target.value || null)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm font-semibold text-white focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="">All Colorways</option>
            {COLORWAYS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* PRICE RANGE FILTER */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              Max Price
            </label>
            <span className="text-xs font-mono text-red-500 font-bold">
              ₹{maxPrice.toLocaleString('en-IN')}
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="25000"
            step="1000"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            className="w-full accent-red-600 cursor-pointer"
          />
        </div>

        {/* SORT BY */}
        <div>
          <label className="block text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm font-semibold text-white focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}
