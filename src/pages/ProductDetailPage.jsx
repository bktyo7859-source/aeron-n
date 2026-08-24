import React, { useState } from 'react';
import { Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Star, Check, Ruler, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import SizeGuideModal from '../components/shop/SizeGuideModal.jsx';

export default function ProductDetailPage({ product, onNavigateShop }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(product?.defaultColor || 'black');
  const [selectedSize, setSelectedSize] = useState(42);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const isFavorite = isInWishlist(product?.id);

  // Gallery angles
  const galleryImages = [
    { label: "Side", url: product.images?.[selectedColor]?.side || product.images?.black?.side || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80" },
    { label: "Front", url: product.images?.[selectedColor]?.front || product.images?.black?.front || "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80" },
    { label: "Back", url: product.images?.[selectedColor]?.back || product.images?.black?.back || "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80" },
    { label: "Top", url: product.images?.[selectedColor]?.top || product.images?.black?.top || "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80" },
    { label: "Sole", url: product.images?.[selectedColor]?.sole || product.images?.black?.sole || "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80" },
    { label: "Close-up", url: product.images?.[selectedColor]?.closeUp || product.images?.black?.closeUp || "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=80" }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* BREADCRUMB */}
        <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
          <button onClick={onNavigateShop} className="hover:text-white cursor-pointer">SHOP</button>
          <span>/</span>
          <span>{product.category.toUpperCase()}</span>
          <span>/</span>
          <span className="text-red-500 font-bold">{product.name}</span>
        </div>

        {/* MAIN PRODUCT LAYOUT (2 COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: MULTI-ANGLE IMAGE GALLERY */}
          <div className="lg:col-span-7 space-y-6">
            {/* MAIN IMAGE DISPLAY */}
            <div className="relative h-[400px] md:h-[550px] w-full rounded-3xl overflow-hidden bg-neutral-900/80 border border-neutral-800 p-8 flex items-center justify-center">
              <img
                src={galleryImages[activeImageIndex].url}
                alt={`${product.name} ${galleryImages[activeImageIndex].label}`}
                className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-neutral-300">
                ANGLE: {galleryImages[activeImageIndex].label.toUpperCase()}
              </div>
            </div>

            {/* THUMBNAILS CAROUSEL */}
            <div className="grid grid-cols-6 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-20 rounded-xl overflow-hidden bg-neutral-900 border p-2 flex items-center justify-center transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-red-500 scale-105 bg-neutral-800' : 'border-neutral-800 hover:border-neutral-700 opacity-70'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS, SIZE SELECTOR, BUY ACTIONS */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800 text-red-400 text-xs font-mono uppercase">
                <span>{product.badge || 'PRO PERFORMANCE'}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                {product.name}
              </h1>
              <p className="text-sm font-medium text-neutral-400">
                {product.subtitle}
              </p>

              {/* RATING */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold font-mono text-neutral-300">
                  {product.rating} ({product.reviewCount || 120} Verified Reviews)
                </span>
              </div>

              {/* PRICE */}
              <div className="flex items-baseline gap-4 pt-3">
                <span className="text-3xl md:text-4xl font-extrabold font-mono text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-neutral-500 line-through font-mono">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-md">
                  TAX INCLUDED
                </span>
              </div>
            </div>

            {/* COLORWAY SELECTION */}
            <div className="space-y-3 pt-4 border-t border-neutral-900">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-400 uppercase">COLORWAY:</span>
                <span className="text-white font-bold">{selectedColor.toUpperCase()}</span>
              </div>
              <div className="flex gap-3">
                {product.colors?.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    className={`w-9 h-9 rounded-full border border-neutral-700 transition-all cursor-pointer ${
                      selectedColor === c.id ? 'ring-2 ring-red-500 scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* SIZE SELECTOR */}
            <div className="space-y-3 pt-4 border-t border-neutral-900">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-400 uppercase">SELECT SIZE (EU):</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Ruler size={14} />
                  <span>SIZE GUIDE</span>
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {product.sizes?.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 rounded-xl font-mono text-sm font-bold border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-red-600 text-white border-red-500 shadow-lg'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY & ACTIONS */}
            <div className="space-y-4 pt-6 border-t border-neutral-900">
              <div className="flex gap-4">
                {/* QUANTITY BUTTON */}
                <div className="flex items-center border border-neutral-800 rounded-xl bg-neutral-900 px-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-neutral-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-4 font-mono font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-neutral-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* ADD TO BAG */}
                <button
                  onClick={() => addToCart(product, selectedColor, selectedSize, quantity)}
                  className="flex-1 py-4 bg-red-600 hover:bg-red-500 text-white font-black text-xs tracking-widest uppercase rounded-xl shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <ShoppingBag size={18} />
                  <span>ADD TO BAG</span>
                </button>

                {/* WISHLIST TOGGLE */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isFavorite
                      ? 'bg-red-600 text-white border-red-500'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart size={20} className={isFavorite ? 'fill-white' : ''} />
                </button>
              </div>

              {/* BUY NOW */}
              <button
                onClick={() => {
                  addToCart(product, selectedColor, selectedSize, quantity);
                }}
                className="w-full py-4 bg-white text-black hover:bg-neutral-200 font-black text-xs tracking-widest uppercase rounded-xl cursor-pointer transition-all"
              >
                BUY NOW — EXPRESS CHECKOUT
              </button>
            </div>

            {/* VALUE PROPOSITIONS */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-900 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-red-500" />
                <span>Complimentary Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} className="text-red-500" />
                <span>30-Day Hassle Free Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* TABS FOR TECH SPECS, SHIPPING & REVIEWS */}
        <div className="pt-16 border-t border-neutral-900 space-y-8">
          <div className="flex gap-8 border-b border-neutral-900 pb-4">
            {[
              { id: 'specs', label: 'TECH SPECIFICATIONS' },
              { id: 'shipping', label: 'SHIPPING & RETURNS' },
              { id: 'reviews', label: `CUSTOMER REVIEWS (${product.reviewCount || 120})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-mono tracking-widest uppercase font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-red-500 border-b-2 border-red-500 pb-4 -mb-4'
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENTS */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-300">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white uppercase tracking-tight">SPECS SHEET</h4>
                <ul className="space-y-3 font-mono text-sm">
                  <li className="flex justify-between py-2 border-b border-neutral-900">
                    <span className="text-neutral-500">Weight</span>
                    <span>{product.specs?.weight || "185g"}</span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-neutral-900">
                    <span className="text-neutral-500">Heel-To-Toe Drop</span>
                    <span>{product.specs?.drop || "8mm"}</span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-neutral-900">
                    <span className="text-neutral-500">Upper Mesh</span>
                    <span>{product.specs?.upper || "AeroKnit 3D Monofilament"}</span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-neutral-900">
                    <span className="text-neutral-500">Midsole Foam</span>
                    <span>{product.specs?.midsole || "AeroCell Dual Nitrogen Pods"}</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white uppercase tracking-tight">INNOVATION STORY</h4>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {product.description}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 text-sm text-neutral-300 max-w-2xl">
              <h4 className="text-xl font-bold text-white uppercase tracking-tight">GLOBAL LOGISTICS</h4>
              <p>All AERON orders are dispatched in signature eco-friendly carbon-balanced packaging within 24 hours.</p>
              <p>Domestic orders qualify for complimentary overnight courier delivery. International shipments take 3–5 business days.</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
                <div className="text-5xl font-black font-mono text-red-500">{product.rating}</div>
                <div>
                  <div className="flex text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">Based on {product.reviewCount || 120} verified runner reviews</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SIZE GUIDE MODAL */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
}
