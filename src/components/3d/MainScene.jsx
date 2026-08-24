import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import HeroObject from './HeroObject.jsx';
import Particles from './Particles.jsx';

function CameraRig({ activeSection, isInspectorActive }) {
  const { camera } = useThree();
  const targetPos = useRef([0, 0, 5]);
  const targetLookAt = useRef([0, 0, 0]);

  useFrame((state, delta) => {
    if (isInspectorActive) return;

    // Defined target camera angles for each section
    switch (activeSection) {
      case 0: // SNKRS HERO — Center Stage 3/4 Floating Angle
        targetPos.current = [0, 0, 5];
        targetLookAt.current = [0, 0, 0];
        break;
      case 1: // AIR MATRIX — Zoomed in on Air Cushion & Carbon Sole
        targetPos.current = [1.4, -0.3, 4.2];
        targetLookAt.current = [0.4, -0.3, 0.5];
        break;
      case 2: // INNOVATION TECH — High 45° angle showing upper flyknit & laces
        targetPos.current = [-1.5, 0.4, 4.6];
        targetLookAt.current = [-0.4, 0.2, 0];
        break;
      case 3: // SNKRS COLLECTION — Shifted right next to product selector
        targetPos.current = [1.8, 0.1, 4.8];
        targetLookAt.current = [0.8, 0, 0];
        break;
      case 4: // 3D CUSTOMIZER LAB — Front stage orbit view
        targetPos.current = [0, 0, 4.0];
        targetLookAt.current = [0, 0, 0];
        break;
      case 5: // RESERVE DROP PASS — Vertical floating spotlight horizon
        targetPos.current = [0, 1.4, 6.5];
        targetLookAt.current = [0, 0, 0];
        break;
      default:
        targetPos.current = [0, 0, 5];
        targetLookAt.current = [0, 0, 0];
    }

    // Smooth lerp camera position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPos.current[0], delta * 3.0);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPos.current[1], delta * 3.0);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPos.current[2], delta * 3.0);

    camera.lookAt(
      THREE.MathUtils.lerp(0, targetLookAt.current[0], 0.1),
      THREE.MathUtils.lerp(0, targetLookAt.current[1], 0.1),
      THREE.MathUtils.lerp(0, targetLookAt.current[2], 0.1)
    );
  });

  return null;
}

// Fallback CSS 3D Graphic if WebGL Context fails
function CSS3DFallback({ theme }) {
  const isDark = theme === 'dark';
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="relative w-72 h-72 rounded-full flex items-center justify-center">
        <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse ${
          isDark ? 'bg-[#ccff00]' : 'bg-purple-600'
        }`} />
        <div className="w-48 h-48 rounded-full border-2 border-dashed border-[#ccff00]/40 animate-spin duration-[10000ms]" />
        <div className="absolute w-36 h-36 rounded-2xl border-2 border-cyan-400/50 animate-spin duration-[7000ms] reverse" />
        <div className="absolute w-20 h-20 rounded-xl bg-gradient-to-tr from-[#ccff00] to-cyan-400 animate-pulse shadow-[0_0_30px_rgba(204,255,0,0.8)]" />
      </div>
    </div>
  );
}

// Inner Error Boundary for Canvas
class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasWebGLError: false };
  }

  static getDerivedStateFromError() {
    return { hasWebGLError: true };
  }

  render() {
    if (this.state.hasWebGLError) {
      return <CSS3DFallback theme={this.props.theme} />;
    }
    return this.props.children;
  }
}

export default function MainScene({
  theme = 'dark',
  activeSection = 0,
  isInspectorActive = false,
  inspectorConfig = {
    materialPreset: 'metallic',
    accentColor: '#ccff00',
    wireframe: false,
    rotationSpeed: 1,
    environmentLighting: 'studio',
  },
}) {
  const isDark = theme === 'dark';
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext('webgl2');
      if (!gl) setWebglSupported(false);
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        <CSS3DFallback theme={theme} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <CanvasErrorBoundary theme={theme}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'default',
            failIfMajorPerformanceCaveat: false,
          }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

            {/* Dynamic Nike Studio Lighting */}
            <ambientLight intensity={isDark ? 0.9 : 1.5} />

            <directionalLight
              position={[5, 8, 5]}
              intensity={isDark ? 3.0 : 4.0}
              color={isDark ? '#ffffff' : '#f8fafc'}
              castShadow
            />

            {/* Accent Point Lights for Nike Volt & Cyan Glow */}
            <pointLight
              position={[-6, -4, -2]}
              intensity={isDark ? 4.0 : 1.2}
              color={isDark ? '#ccff00' : '#84cc16'}
            />
            <pointLight
              position={[6, 4, 2]}
              intensity={isDark ? 4.5 : 1.5}
              color={isDark ? '#00f0ff' : '#0284c7'}
            />

            {/* Floating Particles */}
            <Particles count={isDark ? 250 : 150} theme={theme} />

            {/* Main 3D Sneaker Sculpture */}
            <HeroObject
              theme={theme}
              materialPreset={isInspectorActive ? inspectorConfig.materialPreset : 'metallic'}
              accentColor={isInspectorActive ? inspectorConfig.accentColor : '#ccff00'}
              wireframe={isInspectorActive ? inspectorConfig.wireframe : false}
              rotationSpeed={isInspectorActive ? inspectorConfig.rotationSpeed : 1}
              scrollProgress={activeSection / 5}
            />

            {/* Scroll-Driven Camera Rig */}
            <CameraRig activeSection={activeSection} isInspectorActive={isInspectorActive} />

            {/* Orbit Controls enabled ONLY during Section 05 Inspector */}
            {isInspectorActive && (
              <OrbitControls
                enableZoom={true}
                maxDistance={8}
                minDistance={2.5}
                enablePan={false}
                rotateSpeed={0.8}
                zoomSpeed={0.8}
              />
            )}
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
