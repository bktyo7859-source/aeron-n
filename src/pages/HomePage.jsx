import React from 'react';
import HeroVideo from '../components/sections/HeroVideo.jsx';
import FeaturedSneaker from '../components/sections/FeaturedSneaker.jsx';
import Scroll3DSneaker from '../components/3d/Scroll3DSneaker.jsx';
import TechStory from '../components/sections/TechStory.jsx';
import FullscreenMedia from '../components/sections/FullscreenMedia.jsx';
import NewReleases from '../components/sections/NewReleases.jsx';
import HorizontalCollection from '../components/sections/HorizontalCollection.jsx';
import ColorwaySelector from '../components/sections/ColorwaySelector.jsx';
import LifestyleSection from '../components/sections/LifestyleSection.jsx';
import CategoryGrid from '../components/sections/CategoryGrid.jsx';

export default function HomePage({ onSelectProduct, onNavigatePage }) {
  return (
    <div className="w-full bg-black text-white min-h-screen overflow-x-hidden">
      {/* 1. CINEMATIC VIDEO HERO */}
      <HeroVideo
        onExplore={() => {
          const scrollTarget = document.getElementById('3d-scroll-story');
          if (scrollTarget) scrollTarget.scrollIntoView({ behavior: 'smooth' });
        }}
        onShopNow={() => onNavigatePage && onNavigatePage('shop')}
      />

      {/* 2. FEATURED SNEAKER SHOWCASE */}
      <FeaturedSneaker
        onSelectProduct={onSelectProduct}
        onExploreX1={() => {
          const scrollTarget = document.getElementById('3d-scroll-story');
          if (scrollTarget) scrollTarget.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. SCROLL-DRIVEN 3D SNEAKER EXPERIENCE */}
      <div id="3d-scroll-story">
        <Scroll3DSneaker />
      </div>

      {/* 4. PRODUCT TECHNOLOGY STORY */}
      <TechStory />

      {/* 5. FULL-SCREEN PHOTOGRAPHY & PERFORMANCE VIDEO */}
      <FullscreenMedia />

      {/* 6. NEW RELEASES GRID (12+ PRODUCTS) */}
      <NewReleases
        onSelectProduct={onSelectProduct}
        onNavigateShop={() => onNavigatePage && onNavigatePage('shop')}
      />

      {/* 7. HORIZONTAL PRODUCT COLLECTION */}
      <HorizontalCollection onSelectProduct={onSelectProduct} />

      {/* 8. COLORWAY SELECTOR */}
      <ColorwaySelector />

      {/* 9. LIFESTYLE / ATHLETE SECTION */}
      <LifestyleSection onNavigateShop={() => onNavigatePage && onNavigatePage('shop')} />

      {/* 10. CATEGORY SECTION */}
      <CategoryGrid onSelectCategory={(catId) => onNavigatePage && onNavigatePage('shop', catId)} />
    </div>
  );
}
