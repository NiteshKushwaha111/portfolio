// components/sections/ParticleHero.tsx
/* eslint-disable */
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function ParticleHero() {
  const pointsRef = useRef<THREE.Points>(null!)
  
  // Create a sphere of particles
  const [positions, colors] = useMemo(() => {
    // Number of particles
    const count = 3000
    
    // Arrays for position and color
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    const color = new THREE.Color()
    
    for (let i = 0; i < count; i++) {
      // Golden ratio spiraling for even distribution on sphere
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      
      // Radius of the sphere wave
      const r = 3 + Math.random() * 1.5
      
      // Calculate coordinates
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.cos(phi)
      const z = r * Math.sin(phi) * Math.sin(theta)
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      
      // Antigravity Brand Colors: Blues, Oranges, Purples, Reds
      const palette = [
        '#4285F4', // Google Blue
        '#EA4335', // Google Red
        '#FBBC05', // Google Yellow
        '#34A853', // Google Green
        '#8A2BE2', // Purple vibes
        '#FF7F50', // Coral
      ]
      
      color.set(palette[Math.floor(Math.random() * palette.length)])
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return [positions, colors]
  }, [])

  // Animate the particles
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (pointsRef.current) {
      // Rotate the entire group slowly
      pointsRef.current.rotation.y = time * 0.05
      pointsRef.current.rotation.z = time * 0.02
      
      // Add slight wave motion by moving the group
      pointsRef.current.position.y = Math.sin(time * 0.5) * 0.2
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.035} // Size of the particles
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending} // Creates the glowing effect when overlapping
        />
      </Points>
    </group>
  )
}
