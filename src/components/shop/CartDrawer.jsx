import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';

export default function CartDrawer({ onCheckout, onNavigateShop }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingCost,
    grandTotal,
    totalItems
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* BACKDROP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* CART DRAWER PANEL */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-neutral-950 border-l border-neutral-800 text-white p-6 shadow-2xl flex flex-col justify-between"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-900">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-red-500" size={20} />
              <h3 className="text-xl font-extrabold uppercase tracking-tight">YOUR BAG</h3>
              <span className="bg-neutral-800 text-xs font-mono px-2 py-0.5 rounded-full font-bold">
                {totalItems}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* ITEM LIST */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag size={48} className="mx-auto text-neutral-700 stroke-1" />
                <p className="text-neutral-400 font-medium">Your AERON bag is currently empty.</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    if (onNavigateShop) onNavigateShop();
                  }}
                  className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-widest uppercase rounded-full transition-colors cursor-pointer"
                >
                  EXPLORE CATALOG
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-4 p-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain bg-neutral-950 rounded-xl p-2 shrink-0"
                  />

                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-extrabold text-sm uppercase tracking-tight">{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="text-neutral-500 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="text-xs text-neutral-400 font-mono">
                      Color: {item.color.toUpperCase()} | Size: {item.size}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-mono font-bold text-sm text-red-500">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>

                      {/* QUANTITY ADJUSTER */}
                      <div className="flex items-center border border-neutral-800 rounded-lg overflow-hidden bg-black">
                        <button
                          onClick={() => updateQuantity(item.key, -1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white hover:bg-neutral-800"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, 1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white hover:bg-neutral-800"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* SUMMARY & CHECKOUT BUTTON */}
          {cart.length > 0 && (
            <div className="pt-6 border-t border-neutral-900 space-y-4">
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-neutral-800">
                  <span>Total</span>
                  <span className="text-red-500">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  if (onCheckout) onCheckout();
                }}
                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black text-xs tracking-widest uppercase rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-xl transition-all hover:scale-[1.02]"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-mono">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>256-BIT ENCRYPTED SECURE CHECKOUT</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
