import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

extend({ TextGeometry })

function ParticleSwarm({ count = 2000, radius = 1.5 }) {
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

  // CHANGED: Modified useFrame to rotate continuously in one direction
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.2; // Rotate around Y-axis
    points.current.rotation.x = Math.sin(time * 0.2) * 0.1; // Slight wobble on X-axis
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
      <pointsMaterial size={0.02} color="#0000FF" sizeAttenuation={true} />
    </points>
  );
}

// function LoadingText() {
//   const font = new FontLoader().parse(require('three/examples/fonts/helvetiker_bold.typeface.json'));
  
//   return (
//     <mesh position={[-1.5, -1.5, 0]}>
//       <textGeometry args={['LOADING', { font, size: 0.5, height: 0.1 }]} />
//       <meshPhongMaterial color="#0000FF" />
//     </mesh>
//   );
// }

function LoadingAnimation() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={['#FFFFFF']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ParticleSwarm />
        {/* <LoadingText /> */}
      </Canvas>
    </div>
  );
}

export default LoadingAnimation;