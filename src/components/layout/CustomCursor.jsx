import React, { useEffect, useState } from 'react';

export default function CustomCursor({ theme = 'dark' }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate on devices with fine pointer (desktop mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button';

      const isCard = target.closest('.product-card') || target.closest('.interactive-hover');

      setIsPointer(!!isClickable);
      setIsHovered(!!isCard);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden lg:block">
      {/* INNER DOT */}
      <div
        className={`fixed top-0 left-0 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out ${
          theme === 'dark' ? 'bg-red-500' : 'bg-red-600'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 2.5 : isPointer ? 1.5 : 1})`
        }}
      />

      {/* OUTER RING */}
      <div
        className={`fixed top-0 left-0 rounded-full border transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
          isHovered
            ? 'w-16 h-16 bg-red-500/10 border-red-500/50 scale-110'
            : isPointer
            ? 'w-10 h-10 border-red-500/40 scale-105'
            : 'w-8 h-8 border-white/20 dark:border-white/20 light:border-black/30'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`
        }}
      />
    </div>
  );
}
