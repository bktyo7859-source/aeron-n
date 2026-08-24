import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function FallbackSneaker({
  colorHex = '#121212',
  rotation = [0, 0, 0],
  scale = 1,
  className = "w-full h-full"
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 30, y: -y * 30 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
    >
      {/* GLOWING AMBIENT HALO */}
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-40 transition-colors duration-500 pointer-events-none"
        style={{ backgroundColor: colorHex === '#121212' ? '#ef4444' : colorHex }}
      />

      {/* SNEAKER DISPLAY WITH TILT INTERACTION */}
      <motion.div
        style={{
          transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${scale})`
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative z-10 flex items-center justify-center p-6 w-full h-full"
      >
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80"
          alt="AERON X1 Sneaker"
          className="max-h-[80%] max-w-[85%] object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] transition-all duration-300"
          style={{
            filter: `drop-shadow(0 25px 35px ${colorHex === '#121212' ? 'rgba(0,0,0,0.8)' : 'rgba(239,68,68,0.4)'})`
          }}
        />
      </motion.div>

      {/* STUDIO FLOOR SHADOW */}
      <div className="absolute bottom-10 w-3/4 h-8 bg-black/60 blur-xl rounded-full pointer-events-none" />
    </div>
  );
}
