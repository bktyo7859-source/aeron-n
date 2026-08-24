import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HeroObject({
  theme = 'dark',
  materialPreset = 'metallic', // 'metallic' | 'glass' | 'wireframe' | 'iridescent'
  accentColor = '#ccff00',
  wireframe = false,
  rotationSpeed = 1,
  scrollProgress = 0,
}) {
  const groupRef = useRef();
  const sneakerGroupRef = useRef();
  const soleGlowRef = useRef();
  const swooshRef = useRef();

  // Target mouse position lerp
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    targetRotation.current.x = mouseY * 0.35;
    targetRotation.current.y = mouseX * 0.5;

    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x,
      targetRotation.current.x,
      0.06
    );
    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y,
      targetRotation.current.y,
      0.06
    );

    if (groupRef.current) {
      groupRef.current.rotation.x = currentRotation.current.x + 0.12;
      groupRef.current.rotation.y =
        currentRotation.current.y + state.clock.getElapsedTime() * 0.22 * rotationSpeed;

      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        Math.sin(state.clock.getElapsedTime() * 1.1) * 0.15 - scrollProgress * 0.4,
        0.06
      );
    }

    if (soleGlowRef.current) {
      soleGlowRef.current.intensity = 2.5 + Math.sin(state.clock.getElapsedTime() * 3.5) * 1.0;
    }
  });

  const isDark = theme === 'dark';

  // Upper Material preset handler
  const upperMaterial = useMemo(() => {
    if (wireframe || materialPreset === 'wireframe') {
      return (
        <meshStandardMaterial
          wireframe
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.9}
        />
      );
    }
    if (materialPreset === 'glass') {
      return (
        <meshPhysicalMaterial
          color={accentColor}
          transmission={0.85}
          transparent={true}
          roughness={0.1}
          ior={1.5}
          thickness={0.5}
          clearcoat={1}
        />
      );
    }
    if (materialPreset === 'iridescent') {
      return (
        <meshPhysicalMaterial
          color={isDark ? '#0f172a' : '#f1f5f9'}
          roughness={0.15}
          metalness={0.85}
          clearcoat={1}
          iridescence={1}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 400]}
        />
      );
    }
    // Default Nike Premium Leather / Flyknit
    return (
      <meshStandardMaterial
        color={isDark ? '#09090b' : '#f8fafc'}
        metalness={0.8}
        roughness={0.25}
      />
    );
  }, [materialPreset, wireframe, accentColor, isDark]);

  return (
    <group ref={groupRef} scale={[0.9, 0.9, 0.9]} position={[0, 0.2, 0]}>
      {/* Sneaker Main Geometry Group */}
      <group ref={sneakerGroupRef} rotation={[0, -Math.PI / 4, 0]}>
        {/* 1. OUTSOLE (Rubber Base Tread) */}
        <mesh position={[0, -0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.35, 0.22, 3.3]} />
          <meshStandardMaterial
            color={isDark ? '#000000' : '#1e293b'}
            roughness={0.4}
            metalness={0.2}
          />
        </mesh>

        {/* Nike Volt Rubber Tread Stripes */}
        {[-1.1, -0.6, -0.1, 0.4, 0.9].map((zPos, idx) => (
          <mesh key={idx} position={[0, -0.77, zPos]} castShadow>
            <boxGeometry args={[1.38, 0.05, 0.12]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={isDark ? 0.8 : 0.3}
            />
          </mesh>
        ))}

        {/* 2. MIDSOLE AIR MAX CUSHION UNIT (Heel Air Bubble) */}
        <mesh position={[0, -0.45, 0.85]} castShadow>
          <boxGeometry args={[1.28, 0.26, 1.35]} />
          <meshPhysicalMaterial
            color={accentColor}
            transmission={0.85}
            transparent={true}
            roughness={0.1}
            ior={1.45}
            thickness={0.4}
          />
        </mesh>

        {/* Internal Nitrogen Air Coil inside heel bubble */}
        <mesh position={[0, -0.45, 0.85]}>
          <cylinderGeometry args={[0.38, 0.38, 0.16, 16]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={isDark ? 1.5 : 0.6}
          />
        </mesh>

        {/* Midsole Front Foam */}
        <mesh position={[0, -0.45, -0.75]} castShadow>
          <boxGeometry args={[1.24, 0.26, 1.65]} />
          <meshStandardMaterial
            color={isDark ? '#18181b' : '#e2e8f0'}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        {/* 3. SNEAKER UPPER BODY */}
        {/* Forefoot / Toe Cap */}
        <mesh position={[0, -0.14, -0.95]} castShadow>
          <boxGeometry args={[1.18, 0.42, 1.35]} />
          {upperMaterial}
        </mesh>

        {/* Midfoot Main Body */}
        <mesh position={[0, 0.06, 0]} castShadow>
          <boxGeometry args={[1.2, 0.62, 1.45]} />
          {upperMaterial}
        </mesh>

        {/* Heel Counter / High-Top Collar */}
        <mesh position={[0, 0.48, 0.85]} castShadow>
          <boxGeometry args={[1.12, 0.82, 1.05]} />
          {upperMaterial}
        </mesh>

        {/* Padded Ankle Collar Opening */}
        <mesh position={[0, 0.82, 0.75]} castShadow>
          <torusGeometry args={[0.4, 0.13, 16, 32]} />
          <meshStandardMaterial color={isDark ? '#27272a' : '#cbd5e1'} roughness={0.5} />
        </mesh>

        {/* Sneaker Tongue */}
        <mesh position={[0, 0.48, -0.1]} rotation={[-0.32, 0, 0]} castShadow>
          <boxGeometry args={[0.72, 0.95, 0.12]} />
          <meshStandardMaterial color={isDark ? '#09090b' : '#64748b'} roughness={0.4} />
        </mesh>

        {/* Tongue Brand Tag (NIKE x SNEAKX) */}
        <mesh position={[0, 0.88, -0.22]} rotation={[-0.32, 0, 0]}>
          <boxGeometry args={[0.42, 0.22, 0.04]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={1.0}
          />
        </mesh>

        {/* 4. OFFICIAL NIKE SWOOSH EMBLEM (Both Sides) */}
        <group ref={swooshRef}>
          {/* Right Side Swoosh */}
          <mesh position={[0.62, 0.08, 0.1]} rotation={[0.2, 0.1, -0.38]} castShadow>
            <boxGeometry args={[0.06, 0.26, 1.65]} />
            <meshStandardMaterial
              color={accentColor}
              metalness={0.9}
              roughness={0.1}
              emissive={accentColor}
              emissiveIntensity={isDark ? 1.0 : 0.4}
            />
          </mesh>

          {/* Left Side Swoosh */}
          <mesh position={[-0.62, 0.08, 0.1]} rotation={[0.2, -0.1, 0.38]} castShadow>
            <boxGeometry args={[0.06, 0.26, 1.65]} />
            <meshStandardMaterial
              color={accentColor}
              metalness={0.9}
              roughness={0.1}
              emissive={accentColor}
              emissiveIntensity={isDark ? 1.0 : 0.4}
            />
          </mesh>
        </group>

        {/* 5. LACING MATRIX */}
        {[-0.52, -0.32, -0.12, 0.08, 0.28].map((zPos, idx) => (
          <group key={idx} position={[0, 0.3 + idx * 0.08, zPos]}>
            {/* Left Eyelet */}
            <mesh position={[-0.4, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.05, 12]} />
              <meshStandardMaterial color={accentColor} metalness={0.95} />
            </mesh>
            {/* Right Eyelet */}
            <mesh position={[0.4, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.05, 12]} />
              <meshStandardMaterial color={accentColor} metalness={0.95} />
            </mesh>
            {/* Cross Lace Strand */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.022, 0.022, 0.76, 8]} />
              <meshStandardMaterial color={isDark ? '#ffffff' : '#000000'} roughness={0.3} />
            </mesh>
          </group>
        ))}

        {/* Point Light under Air Sole */}
        <pointLight
          ref={soleGlowRef}
          position={[0, -0.65, 0.85]}
          color={accentColor}
          distance={3.5}
        />
      </group>

      {/* Halo Orbital Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.3, 0.02, 16, 80]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={isDark ? 0.7 : 0.3}
          wireframe
        />
      </mesh>
    </group>
  );
}
