import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ProceduralSneaker({ colorHex = '#121212', isDragging = false, hoverTilt = true }) {
  const groupRef = useRef();

  // Color specs based on active hex
  const mainColor = useMemo(() => new THREE.Color(colorHex), [colorHex]);
  const isLight = useMemo(() => {
    const hsl = {};
    mainColor.getHSL(hsl);
    return hsl.l > 0.6;
  }, [mainColor]);

  const soleColor = useMemo(() => (isLight ? '#1e293b' : '#f8fafc'), [isLight]);
  const accentColor = useMemo(() => (isLight ? '#0284c7' : '#e11d48'), [isLight]);

  // Subtle ambient hover animation if not dragging
  useFrame((state) => {
    if (groupRef.current && !isDragging && hoverTilt) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.08;
      groupRef.current.rotation.z = Math.cos(t * 1.2) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.25}>
      {/* OUTSOLE BASE */}
      <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.25, 1.2]} />
        <meshStandardMaterial color={soleColor} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* MIDSOLE CUSHIONING PODS */}
      <mesh position={[0, -0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 0.2, 1.1]} />
        <meshPhysicalMaterial
          color={accentColor}
          roughness={0.2}
          transmission={0.5}
          thickness={0.8}
          clearcoat={0.8}
        />
      </mesh>

      {/* SNEAKER UPPER (BODY) */}
      <mesh position={[-0.2, 0.2, 0]} rotation={[0, 0, -0.15]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.7, 1.05]} />
        <meshStandardMaterial color={mainColor} roughness={0.6} metalness={0.2} />
      </mesh>

      {/* TOE BOX CURVE */}
      <mesh position={[1.0, -0.05, 0]} rotation={[0, 0, -0.3]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.45, 1.0]} />
        <meshStandardMaterial color={mainColor} roughness={0.7} />
      </mesh>

      {/* HEEL COUNTER & COLLAR */}
      <mesh position={[-1.1, 0.45, 0]} rotation={[0, 0, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.85, 0.95]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* TONGUE & LACES AREA */}
      <mesh position={[0.2, 0.55, 0]} rotation={[0, 0, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.25, 0.85]} />
        <meshStandardMaterial color={isLight ? '#334155' : '#e2e8f0'} roughness={0.5} />
      </mesh>

      {/* LACES - 4 METALLIC BARS */}
      {[-0.1, 0.15, 0.4, 0.65].map((xPos, idx) => (
        <mesh key={idx} position={[xPos, 0.68 - idx * 0.05, 0]} rotation={[0, 0, -0.4]}>
          <cylinderGeometry args={[0.03, 0.03, 0.88, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* AERON GEOMETRIC EMBLEM PLATE (SIDE) */}
      <mesh position={[0.1, 0.25, 0.53]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[1.2, 0.2, 0.02]} />
        <meshStandardMaterial color={accentColor} metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0.1, 0.25, -0.53]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[1.2, 0.2, 0.02]} />
        <meshStandardMaterial color={accentColor} metalness={0.95} roughness={0.1} />
      </mesh>

      {/* REAR HEEL PULL TAB */}
      <mesh position={[-1.5, 0.7, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.1, 0.4, 0.2]} />
        <meshStandardMaterial color={accentColor} metalness={0.8} />
      </mesh>
    </group>
  );
}
