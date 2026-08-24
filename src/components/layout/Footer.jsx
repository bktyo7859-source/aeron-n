import React, { useState } from 'react';
import { ArrowRight, Instagram, Twitter, Youtube, Facebook, CheckCircle2 } from 'lucide-react';
import { BRAND_INFO } from '../../data/products.js';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-black text-neutral-400 border-t border-neutral-800 pt-16 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* BRAND & NEWSLETTER COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black tracking-tighter text-white uppercase">{BRAND_INFO.name}</span>
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
          </div>
          <p className="text-sm leading-relaxed max-w-sm text-neutral-400">
            {BRAND_INFO.description}
          </p>

          {/* NEWSLETTER */}
          <div className="pt-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-3">
              JOIN THE AERON LABS MOVEMENT
            </h4>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl">
                <CheckCircle2 size={18} />
                <span>Thank you. You are now subscribed to priority AERON drops.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold px-5 py-3 rounded-xl flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* SHOP LINKS */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4">SHOP</h4>
          <ul className="space-y-3 text-sm">
            {['New Releases', 'Men', 'Women', 'Kids', 'Collections', 'Sale'].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => onNavigate && onNavigate('shop', item.toLowerCase().replace(' ', '-'))}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* HELP & CUSTOMER SERVICE */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4">HELP & SERVICE</h4>
          <ul className="space-y-3 text-sm">
            {['Order Status', 'Shipping & Delivery', 'Returns & Exchanges', 'Size Guide', 'Payment Options', 'Contact Us'].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => onNavigate && onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ABOUT & LEGAL */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4">ABOUT AERON</h4>
          <ul className="space-y-3 text-sm">
            {['Our Story', 'Biomechanical Lab', 'Sustainability', 'Careers', 'Privacy Policy', 'Terms of Service'].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => onNavigate && onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR & SOCIALS */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xs text-neutral-500 font-mono">
          © {new Date().getFullYear()} AERON Footwear Inc. All Rights Reserved. Built for motion.
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex space-x-6 text-neutral-400">
          <a href="#instagram" className="hover:text-white transition-colors"><Instagram size={20} /></a>
          <a href="#twitter" className="hover:text-white transition-colors"><Twitter size={20} /></a>
          <a href="#youtube" className="hover:text-white transition-colors"><Youtube size={20} /></a>
          <a href="#facebook" className="hover:text-white transition-colors"><Facebook size={20} /></a>
        </div>
      </div>
    </footer>
  );
}
