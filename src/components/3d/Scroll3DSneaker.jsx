import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, useGLTF } from '@react-three/drei';
import ProceduralSneaker from './ProceduralSneaker.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { WebGLBoundary, isWebGLSupported } from './WebGLBoundary.jsx';
import FallbackSneaker from './FallbackSneaker.jsx';

function RealSneakerScrollModel() {
  try {
    const { scene } = useGLTF('/assets/3d/aeron-x1.glb');
    const clonedScene = useMemo(() => scene.clone(true), [scene]);
    return <primitive object={clonedScene} scale={3.2} position={[0, -0.5, 0]} />;
  } catch (e) {
    return <ProceduralSneaker colorHex="#121212" hoverTilt={false} />;
  }
}

const SCROLL_STEPS = [
  {
    num: "01",
    title: "DESIGNED TO MOVE",
    subtitle: "Biomechanical geometry sculpted for natural movement.",
    desc: "Every curve is mathematically calibrated to minimize friction against air currents and ground impact forces.",
    rotation: [0.3, 0.4, 0],
    scale: 1.3,
    posX: 0,
    bg: "from-zinc-950 via-neutral-900 to-black"
  },
  {
    num: "02",
    title: "ENGINEERED FOR PERFORMANCE",
    subtitle: "Dual nitrogen-infused AeroCell™ foam core.",
    desc: "Delivers 24% higher energy propulsion than traditional EVA while cutting total footprint weight by 35%.",
    rotation: [0.1, 2.2, 0.2],
    scale: 1.6,
    posX: -1.2,
    bg: "from-slate-950 via-zinc-900 to-black"
  },
  {
    num: "03",
    title: "BUILT WITH PRECISION",
    subtitle: "Full-length carbon FlightStrut™ geometry.",
    desc: "Suspended plate architecture snaps back at toe-off, converting downward pressure into forward thrust.",
    rotation: [-0.4, 4.2, -0.2],
    scale: 1.8,
    posX: 1.2,
    bg: "from-red-950/40 via-neutral-900 to-black"
  },
  {
    num: "04",
    title: "READY FOR ANYTHING",
    subtitle: "Vortex multi-directional pavement grip.",
    desc: "Engineered tread geometry grips wet asphalt, indoor courts, and gravel without slippage.",
    rotation: [0.5, 6.28, 0],
    scale: 1.4,
    posX: 0,
    bg: "from-neutral-950 via-zinc-900 to-black"
  }
];

export default function Scroll3DSneaker() {
  const containerRef = useRef(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [webglAvailable] = useState(() => isWebGLSupported());

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance <= 0) return;

      const currentScroll = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollableDistance));
      setScrollProgress(progress);

      const stepIndex = Math.min(
        SCROLL_STEPS.length - 1,
        Math.floor(progress * SCROLL_STEPS.length)
      );
      setActiveStepIndex(stepIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentStep = SCROLL_STEPS[activeStepIndex];

  const currentRotY = scrollProgress * Math.PI * 4;
  const currentRotX = Math.sin(scrollProgress * Math.PI * 2) * 0.4;
  const currentRotZ = Math.cos(scrollProgress * Math.PI) * 0.15;
  const currentScale = 1.3 + Math.sin(scrollProgress * Math.PI) * 0.4;
  const currentPosX = (scrollProgress - 0.5) * 2.5;

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-black text-white">
      {/* PINNED VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 md:p-12">
        <div className={`absolute inset-0 bg-gradient-to-b ${currentStep.bg} transition-colors duration-700 pointer-events-none -z-10`} />

        {/* TOP HEADER */}
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <div className="text-xs font-mono text-neutral-400 tracking-widest uppercase mb-1">
              3D Interactive Anatomy
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tighter">
              AERON X1 <span className="text-neutral-500 font-normal">SPECS</span>
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              Scroll Progress
            </span>
            <div className="text-lg font-bold text-red-500">
              {Math.round(scrollProgress * 100)}%
            </div>
          </div>
        </div>

        {/* 3D / 2D CANVAS IN CENTER */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          {webglAvailable ? (
            <WebGLBoundary colorHex="#121212">
              <Canvas camera={{ position: [0, 0.8, 4.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={1.2} />
                <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow />
                <directionalLight position={[-5, 5, -5]} intensity={1.2} color="#00f0ff" />
                <directionalLight position={[5, -5, 5]} intensity={1.2} color="#ff0055" />

                <group
                  rotation={[currentRotX, currentRotY, currentRotZ]}
                  scale={currentScale}
                  position={[currentPosX, -0.2, 0]}
                >
                  <RealSneakerScrollModel />
                </group>

                <ContactShadows position={[0, -1.3, 0]} opacity={0.8} scale={12} blur={1.8} far={5} />
                <Environment preset="studio" />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </WebGLBoundary>
          ) : (
            <FallbackSneaker colorHex="#121212" scale={currentScale} />
          )}
        </div>

        {/* OVERLAY STORY CONTENT */}
        <div className="relative z-10 max-w-xl my-auto pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStepIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-black/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl"
            >
              <div className="text-5xl md:text-7xl font-black text-red-500/80 mb-2">
                {currentStep.num}
              </div>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2">
                {currentStep.title}
              </h3>
              <p className="text-base md:text-lg font-medium text-neutral-200 mb-2">
                {currentStep.subtitle}
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {currentStep.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM PROGRESS INDICATORS */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex gap-2">
            {SCROLL_STEPS.map((step, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeStepIndex ? 'w-12 bg-red-500' : 'w-4 bg-white/20'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-neutral-400 font-mono animate-bounce">
            ↓ SCROLL TO EXPLORE ANATOMY
          </div>
        </div>
      </div>
    </div>
  );
}
