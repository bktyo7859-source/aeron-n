import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, User, Menu, X, Sun, Moon } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import MobileMenu from './MobileMenu.jsx';

export default function Navbar({ onNavigatePage, currentPage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "New & Featured", page: "new-releases" },
    { name: "Men", page: "shop", category: "men" },
    { name: "Women", page: "shop", category: "women" },
    { name: "Kids", page: "shop", category: "kids" },
    { name: "Collections", page: "collections" },
    { name: "About", page: "about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-black/75 dark:bg-black/75 light:bg-white/80 backdrop-blur-xl border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200/80 shadow-2xl'
            : 'py-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* BRAND LOGO */}
          <button
            onClick={() => onNavigatePage && onNavigatePage('home')}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-white dark:text-white light:text-black font-sans uppercase group-hover:scale-105 transition-transform duration-300">
              AERON
            </span>
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
          </button>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => onNavigatePage && onNavigatePage(link.page, link.category)}
                className={`text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:text-red-500 cursor-pointer ${
                  currentPage === link.page
                    ? 'text-red-500 font-bold border-b-2 border-red-500 pb-0.5'
                    : 'text-neutral-300 dark:text-neutral-300 light:text-neutral-800'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* ACTION BUTTONS: SEARCH, WISHLIST, BAG, THEME, MOBILE BURGER */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* SEARCH ICON / BAR */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full text-neutral-300 hover:text-white dark:hover:text-white light:text-neutral-800 hover:bg-white/10 transition-colors"
                title="Search"
              >
                <Search size={20} />
              </button>

              {isSearchOpen && (
                <div className="absolute right-0 top-12 w-72 md:w-80 bg-neutral-900 border border-neutral-800 rounded-xl p-3 shadow-2xl flex items-center gap-2 z-50">
                  <Search size={16} className="text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search AERON sneakers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onNavigatePage && onNavigatePage('shop', null, searchQuery);
                        setIsSearchOpen(false);
                      }
                    }}
                    autoFocus
                    className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="text-neutral-400 hover:text-white">
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* WISHLIST BUTTON */}
            <button
              onClick={() => onNavigatePage && onNavigatePage('wishlist')}
              className="relative p-2 rounded-full text-neutral-300 hover:text-white dark:hover:text-white light:text-neutral-800 hover:bg-white/10 transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* SHOPPING BAG BUTTON */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full text-neutral-300 hover:text-white dark:hover:text-white light:text-neutral-800 hover:bg-white/10 transition-colors cursor-pointer"
              title="Shopping Bag"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-neutral-300 hover:text-white dark:hover:text-white light:text-neutral-800 hover:bg-white/10 transition-colors cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-700" />}
            </button>

            {/* MOBILE HAMBURGER BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-full text-neutral-300 hover:text-white dark:hover:text-white light:text-neutral-800 hover:bg-white/10 transition-colors"
              title="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN MOBILE MENU */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={(page, category) => {
          setIsMobileMenuOpen(false);
          if (onNavigatePage) onNavigatePage(page, category);
        }}
        navLinks={navLinks}
      />
    </>
  );
}
