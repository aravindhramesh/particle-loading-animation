import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleSwarm({ count = 1000, radius = 2 }) {
  const points = useRef();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [count, radius]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    points.current.rotation.x = Math.sin(time / 4);
    points.current.rotation.y = Math.sin(time / 2);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="blue" sizeAttenuation={true} />
    </points>
  );
}

function LoadingAnimation() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={['#FFFFFF']} />
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}

export default LoadingAnimation;