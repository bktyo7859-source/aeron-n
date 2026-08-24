import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles({ count = 300, theme = 'dark' }) {
  const meshRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorDark1 = new THREE.Color('#a855f7'); // purple
    const colorDark2 = new THREE.Color('#06b6d4'); // cyan
    const colorLight1 = new THREE.Color('#6366f1'); // indigo
    const colorLight2 = new THREE.Color('#94a3b8'); // slate

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const mixRatio = Math.random();
      const mixedColor = theme === 'dark'
        ? colorDark1.clone().lerp(colorDark2, mixRatio)
        : colorLight1.clone().lerp(colorLight2, mixRatio);

      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, [count, theme]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.03;
      meshRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={theme === 'dark' ? 0.06 : 0.04}
        vertexColors
        transparent
        opacity={theme === 'dark' ? 0.75 : 0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
