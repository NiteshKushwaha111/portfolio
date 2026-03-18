// components/sections/ParticleCanvas.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import ParticleHero from './ParticleHero'

export default function ParticleCanvas() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 60 }} 
      dpr={[1, 1.5]} // Performance fix: caps pixel ratio on high-DPI mobile devices to prevent lag
    >
      {/* Optional fog to fade particles in distance */}
      <fog attach="fog" args={['#000', 5, 15]} />
      <ParticleHero />
    </Canvas>
  )
}
