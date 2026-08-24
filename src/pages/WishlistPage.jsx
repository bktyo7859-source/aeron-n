import React from 'react';
import { Heart } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function WishlistPage({ onSelectProduct, onNavigateShop }) {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <div className="text-xs font-mono text-red-500 uppercase tracking-widest mb-2">
            SAVED FOOTWEAR
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            YOUR WISHLIST ({wishlist.length})
          </h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-24 bg-neutral-900/50 border border-neutral-800 rounded-3xl space-y-4">
            <Heart size={48} className="mx-auto text-neutral-700 stroke-1" />
            <p className="text-neutral-400 font-medium">You haven't saved any AERON sneakers yet.</p>
            <button
              onClick={onNavigateShop}
              className="px-8 py-4 bg-red-600 text-white font-bold text-xs uppercase rounded-full"
            >
              EXPLORE CATALOG
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
