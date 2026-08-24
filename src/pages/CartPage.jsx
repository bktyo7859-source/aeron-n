import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function CartPage({ onNavigateShop }) {
  const { cart, removeFromCart, updateQuantity, subtotal, shippingCost, grandTotal, clearCart } = useCart();
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  if (isCheckedOut) {
    return (
      <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12 flex items-center justify-center">
        <div className="max-w-md w-full text-center bg-neutral-900 border border-neutral-800 p-8 rounded-3xl space-y-6">
          <CheckCircle2 size={64} className="text-emerald-500 mx-auto" />
          <h2 className="text-3xl font-black uppercase">ORDER CONFIRMED</h2>
          <p className="text-sm text-neutral-400">
            Thank you for choosing AERON. Your order status updates have been dispatched to your email.
          </p>
          <button
            onClick={() => {
              clearCart();
              setIsCheckedOut(false);
              onNavigateShop();
            }}
            className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase rounded-xl"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <div className="text-xs font-mono text-red-500 uppercase tracking-widest mb-2">
            SHOPPING BAG
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            YOUR CART
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24 bg-neutral-900/50 border border-neutral-800 rounded-3xl space-y-4">
            <ShoppingBag size={48} className="mx-auto text-neutral-700 stroke-1" />
            <p className="text-neutral-400 font-medium">Your AERON shopping bag is empty.</p>
            <button
              onClick={onNavigateShop}
              className="px-8 py-4 bg-red-600 text-white font-bold text-xs uppercase rounded-full"
            >
              EXPLORE CATALOG
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* CART ITEMS */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.key}
                  className="flex flex-col sm:flex-row gap-6 p-6 bg-neutral-900/80 border border-neutral-800 rounded-3xl items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-contain bg-neutral-950 rounded-2xl p-3 shrink-0"
                  />

                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="font-extrabold text-lg uppercase tracking-tight">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="text-neutral-500 hover:text-red-500 p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="text-xs font-mono text-neutral-400">
                      Color: {item.color.toUpperCase()} | Size: {item.size}
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <span className="font-mono font-bold text-lg text-red-500">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>

                      <div className="flex items-center border border-neutral-800 rounded-xl bg-black">
                        <button
                          onClick={() => updateQuantity(item.key, -1)}
                          className="px-3 py-1 text-neutral-400 hover:text-white"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 font-mono font-bold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, 1)}
                          className="px-3 py-1 text-neutral-400 hover:text-white"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CHECKOUT SUMMARY */}
            <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold uppercase tracking-tight">ORDER SUMMARY</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg pt-4 border-t border-neutral-800">
                  <span>Total</span>
                  <span className="text-red-500">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckedOut(true)}
                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>CHECKOUT</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
