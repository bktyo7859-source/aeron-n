import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';

import Navbar from './components/layout/Navbar.jsx';
import CustomCursor from './components/layout/CustomCursor.jsx';
import Footer from './components/layout/Footer.jsx';
import CartDrawer from './components/shop/CartDrawer.jsx';

import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import NewReleasesPage from './pages/NewReleasesPage.jsx';
import CollectionsPage from './pages/CollectionsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import CartPage from './pages/CartPage.jsx';
import WishlistPage from './pages/WishlistPage.jsx';

import { PRODUCTS } from './data/products.js';

function MainApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);

  const { theme } = useTheme();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProduct]);

  const navigateTo = (page, category = 'all', search = '') => {
    setCurrentPage(page);
    if (category) setSelectedCategory(category);
    if (search !== undefined) setSearchQuery(search);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  return (
    <div className={`min-h-screen bg-black text-white ${theme}`}>
      {/* DESKTOP MICRO-INTERACTION CURSOR */}
      <CustomCursor theme={theme} />

      {/* STICKY GLASS NAVIGATION */}
      <Navbar
        currentPage={currentPage}
        onNavigatePage={navigateTo}
      />

      {/* MAIN VIEW SWITCHER */}
      <main className="relative z-10">
        {currentPage === 'home' && (
          <HomePage
            onSelectProduct={handleSelectProduct}
            onNavigatePage={navigateTo}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            initialCategory={selectedCategory}
            searchQuery={searchQuery}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct}
            onNavigateShop={() => navigateTo('shop')}
          />
        )}

        {currentPage === 'new-releases' && (
          <NewReleasesPage onSelectProduct={handleSelectProduct} />
        )}

        {currentPage === 'collections' && (
          <CollectionsPage onSelectProduct={handleSelectProduct} />
        )}

        {currentPage === 'about' && (
          <AboutPage />
        )}

        {currentPage === 'cart' && (
          <CartPage onNavigateShop={() => navigateTo('shop')} />
        )}

        {currentPage === 'wishlist' && (
          <WishlistPage
            onSelectProduct={handleSelectProduct}
            onNavigateShop={() => navigateTo('shop')}
          />
        )}
      </main>

      {/* SLIDING CART DRAWER */}
      <CartDrawer
        onCheckout={() => navigateTo('cart')}
        onNavigateShop={() => navigateTo('shop')}
      />

      {/* FOOTER */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <MainApp />
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
