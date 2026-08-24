import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor({ theme }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const outerDotRef = useRef({ x: -100, y: -100 });
  const [outerPos, setOuterPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    // Check touch screen
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check element hover
      const target = e.target;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');
      const is3DCanvas = target.closest('canvas');

      setIsHovered(!!isInteractive || !!is3DCanvas);
      setIsPointer(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Smooth lerp for outer ring
  useEffect(() => {
    if (isTouchDevice) return;

    let animFrame;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      outerDotRef.current.x = lerp(outerDotRef.current.x, position.x, 0.18);
      outerDotRef.current.y = lerp(outerDotRef.current.y, position.y, 0.18);
      setOuterPos({ x: outerDotRef.current.x, y: outerDotRef.current.y });
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [position, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-transform duration-100 ease-out ${
          theme === 'dark' ? 'bg-cyan-400' : 'bg-purple-600'
        }`}
        style={{
          width: isHovered ? '8px' : '6px',
          height: isHovered ? '8px' : '6px',
          transform: `translate3d(${position.x - (isHovered ? 4 : 3)}px, ${position.y - (isHovered ? 4 : 3)}px, 0) scale(${isHovered ? 1.5 : 1})`,
        }}
      />

      {/* Outer Glowing Ring */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border transition-all duration-300 ${
          theme === 'dark'
            ? isHovered
              ? 'border-cyan-400/80 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
              : 'border-purple-500/40 bg-purple-500/5'
            : isHovered
              ? 'border-purple-600/80 bg-purple-600/10 shadow-[0_0_20px_rgba(147,51,234,0.3)]'
              : 'border-slate-400/40 bg-slate-400/5'
        }`}
        style={{
          width: isHovered ? '50px' : '32px',
          height: isHovered ? '50px' : '32px',
          transform: `translate3d(${outerPos.x - (isHovered ? 25 : 16)}px, ${outerPos.y - (isHovered ? 25 : 16)}px, 0) scale(${
            isPointer ? 1.2 : 1
          })`,
        }}
      />
    </>
  );
}
