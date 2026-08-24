import React, { Suspense, useState, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float, useGLTF } from '@react-three/drei';
import ProceduralSneaker from './ProceduralSneaker.jsx';
import { WebGLBoundary, isWebGLSupported } from './WebGLBoundary.jsx';
import FallbackSneaker from './FallbackSneaker.jsx';
import * as THREE from 'three';

function RealSneakerModel({ colorHex, scale = 1 }) {
  try {
    const { scene } = useGLTF('/assets/3d/aeron-x1.glb');
    const clonedScene = useMemo(() => scene.clone(true), [scene]);

    useEffect(() => {
      if (clonedScene && colorHex) {
        const color = new THREE.Color(colorHex);
        clonedScene.traverse((child) => {
          if (child.isMesh && child.material) {
            child.castShadow = true;
            child.receiveShadow = true;
            // Target upper/body materials if present
            if (child.name.toLowerCase().includes('upper') || child.name.toLowerCase().includes('leather') || child.name.toLowerCase().includes('body')) {
              child.material.color = color;
            }
          }
        });
      }
    }, [clonedScene, colorHex]);

    return (
      <primitive
        object={clonedScene}
        scale={scale * 3.2}
        position={[0, -0.5, 0]}
        rotation={[0.1, Math.PI / 4, 0]}
      />
    );
  } catch (e) {
    return <ProceduralSneaker colorHex={colorHex} />;
  }
}

function CanvasInternal({ colorHex, rotation, scale, enableOrbit, autoRotate }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 0.8, 4.5], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false
      }}
      shadows
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 15, 10]} intensity={2.5} castShadow />
      <directionalLight position={[-10, 10, -5]} intensity={1.5} color="#ffffff" />
      <spotLight position={[0, 10, 5]} angle={0.4} penumbra={1} intensity={2} color="#ffffff" />
      <directionalLight position={[5, -5, 5]} intensity={0.8} color="#ff3366" />
      <directionalLight position={[-5, -5, -5]} intensity={0.8} color="#00ccff" />

      <Suspense fallback={<ProceduralSneaker colorHex={colorHex} />}>
        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
          <group rotation={rotation} scale={scale}>
            <RealSneakerModel colorHex={colorHex} scale={1} />
          </group>
        </Float>

        <ContactShadows
          position={[0, -1.1, 0]}
          opacity={0.8}
          scale={10}
          blur={1.8}
          far={4.5}
        />

        <Environment preset="studio" />
      </Suspense>

      {enableOrbit && (
        <OrbitControls
          enableZoom={true}
          minDistance={2}
          maxDistance={7}
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
          onStart={() => setIsDragging(true)}
          onEnd={() => setIsDragging(false)}
        />
      )}
    </Canvas>
  );
}

export default function Aeron3DCanvas({
  colorHex = '#121212',
  rotation = [0.2, -0.6, 0],
  scale = 1,
  enableOrbit = true,
  autoRotate = false,
  className = "w-full h-full"
}) {
  if (!isWebGLSupported()) {
    return (
      <FallbackSneaker
        colorHex={colorHex}
        rotation={rotation}
        scale={scale}
        className={className}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      <WebGLBoundary colorHex={colorHex} rotation={rotation} scale={scale} className={className}>
        <CanvasInternal
          colorHex={colorHex}
          rotation={rotation}
          scale={scale}
          enableOrbit={enableOrbit}
          autoRotate={autoRotate}
        />
      </WebGLBoundary>
    </div>
  );
}

try {
  useGLTF.preload('/assets/3d/aeron-x1.glb');
} catch (e) {}
