import React, { useState } from 'react';
import { Heart, ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';

export default function ProductCard({ product, onSelectProduct, onQuickView }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);
  const defaultColor = product.defaultColor || 'black';

  const primaryImage =
    product.images?.[defaultColor]?.side ||
    product.images?.white?.side ||
    product.images?.black?.side ||
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80';

  const altImage =
    product.images?.[defaultColor]?.front ||
    product.images?.white?.front ||
    product.images?.black?.front ||
    primaryImage;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="product-card group relative bg-neutral-900/60 dark:bg-neutral-900/60 light:bg-neutral-100 rounded-3xl overflow-hidden border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-950/20 flex flex-col justify-between"
    >
      {/* BADGE (FLAGSHIP / NEW / BEST SELLER) */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-20 bg-red-600 text-white text-[10px] font-black uppercase font-mono tracking-widest px-3 py-1 rounded-full shadow-lg">
          {product.badge}
        </div>
      )}

      {/* WISHLIST BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer ${
          isFavorite
            ? 'bg-red-600 text-white shadow-lg scale-110'
            : 'bg-black/40 text-neutral-300 hover:text-white hover:bg-black/70'
        }`}
        title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart size={18} className={isFavorite ? 'fill-white' : ''} />
      </button>

      {/* PRODUCT IMAGE CONTAINER WITH HOVER ALTERNATE SWAP */}
      <div
        onClick={() => onSelectProduct && onSelectProduct(product)}
        className="relative h-64 md:h-72 w-full overflow-hidden bg-neutral-950/40 cursor-pointer flex items-center justify-center p-6"
      >
        <img
          src={isHovered ? altImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-contain transform transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* QUICK ADD OVERLAY BUTTON */}
        <div className="absolute bottom-4 left-4 right-4 z-10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full py-3 bg-white text-black hover:bg-neutral-200 font-bold text-xs tracking-widest uppercase rounded-xl shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <ShoppingBag size={16} />
            <span>QUICK ADD</span>
          </button>
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mb-1">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={12} className="fill-amber-400" />
              <span className="font-bold">{product.rating}</span>
            </div>
          </div>

          <h3
            onClick={() => onSelectProduct && onSelectProduct(product)}
            className="text-lg md:text-xl font-extrabold tracking-tight text-white dark:text-white light:text-black group-hover:text-red-500 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-500 line-clamp-1 mt-1">
            {product.subtitle}
          </p>
        </div>

        {/* PRICE & ARROW ACTION */}
        <div className="pt-3 border-t border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg md:text-xl font-bold font-mono text-white dark:text-white light:text-black">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-500 line-through font-mono">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={() => onSelectProduct && onSelectProduct(product)}
            className="p-2 rounded-full text-neutral-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all cursor-pointer"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
