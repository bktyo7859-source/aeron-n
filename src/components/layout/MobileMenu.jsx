import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ShoppingBag, Heart, Search } from 'lucide-react';
import { BRAND_INFO } from '../../data/products.js';

export default function MobileMenu({ isOpen, onClose, onNavigate, navLinks }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl text-white flex flex-col justify-between p-6 md:p-12 overflow-y-auto"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter uppercase">{BRAND_INFO.name}</span>
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="my-8 space-y-6">
          <button
            onClick={() => onNavigate('home')}
            className="w-full text-left text-3xl font-extrabold tracking-tight hover:text-red-500 transition-colors flex items-center justify-between py-2 border-b border-neutral-900"
          >
            <span>Home</span>
            <ChevronRight className="text-neutral-600" size={24} />
          </button>

          {navLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(link.page, link.category)}
              className="w-full text-left text-3xl font-extrabold tracking-tight hover:text-red-500 transition-colors flex items-center justify-between py-2 border-b border-neutral-900"
            >
              <span>{link.name}</span>
              <ChevronRight className="text-neutral-600" size={24} />
            </button>
          ))}

          <button
            onClick={() => onNavigate('shop')}
            className="w-full text-left text-3xl font-extrabold tracking-tight text-red-500 hover:text-red-400 transition-colors flex items-center justify-between py-2 border-b border-neutral-900"
          >
            <span>All Products</span>
            <ChevronRight className="text-red-500" size={24} />
          </button>
        </div>

        {/* QUICK ACCESS BUTTONS */}
        <div className="space-y-4 pt-6 border-t border-neutral-800">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate('cart')}
              className="flex items-center justify-center gap-2 p-4 bg-neutral-900 border border-neutral-800 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
            >
              <ShoppingBag size={20} />
              <span>Cart</span>
            </button>
            <button
              onClick={() => onNavigate('wishlist')}
              className="flex items-center justify-center gap-2 p-4 bg-neutral-900 border border-neutral-800 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
            >
              <Heart size={20} />
              <span>Wishlist</span>
            </button>
          </div>

          <p className="text-center text-xs text-neutral-500 font-mono tracking-widest pt-4">
            {BRAND_INFO.tagline} — {BRAND_INFO.secondaryTaglines[0]}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
