// components/CustomCursor.tsx
'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

type CursorVariant = 'default' | 'hover' | 'text' | 'input'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [isClicking, setIsClicking] = useState(false)
  const [isFinePointer, setIsFinePointer] = useState(false)
  const [clickRipples, setClickRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Raw cursor position (zero latency for instant pinpoint dot)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Fluid physics spring for outer follower
  const smoothConfig = { damping: 28, stiffness: 420, mass: 0.25 }
  const smoothX = useSpring(mouseX, smoothConfig)
  const smoothY = useSpring(mouseY, smoothConfig)

  // Velocity stretch & orientation
  const angle = useMotionValue(0)
  const stretchX = useSpring(1, { damping: 22, stiffness: 300 })
  const stretchY = useSpring(1, { damping: 22, stiffness: 300 })

  const prevPos = useRef({ x: -100, y: -100, time: Date.now() })

  useEffect(() => {
    // Only enable on desktop / fine-pointer devices (no mobile / touchscreens)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    const updatePointerType = () => {
      setIsFinePointer(mediaQuery.matches && !('ontouchstart' in window))
    }
    updatePointerType()
    mediaQuery.addEventListener('change', updatePointerType)

    let velocityTimeout: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      const dt = Math.max(now - prevPos.current.time, 1)
      const dx = e.clientX - prevPos.current.x
      const dy = e.clientY - prevPos.current.y
      const dist = Math.hypot(dx, dy)
      const speed = Math.min(dist / dt, 4) // pixels per ms capped

      // Calculate angle and velocity stretch
      if (dist > 2) {
        const rad = Math.atan2(dy, dx)
        angle.set((rad * 180) / Math.PI)
        stretchX.set(1 + speed * 0.22)
        stretchY.set(Math.max(1 - speed * 0.12, 0.7))
      }

      clearTimeout(velocityTimeout)
      velocityTimeout = setTimeout(() => {
        stretchX.set(1)
        stretchY.set(1)
      }, 70)

      prevPos.current = { x: e.clientX, y: e.clientY, time: now }
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true)
      const id = Date.now()
      setClickRipples((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => {
        setClickRipples((prev) => prev.filter((r) => r.id !== id))
      }, 500)
    }

    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Context-aware target scanner (Consistent across all sections)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // Inputs, textareas & editable fields: hide custom follower to preserve clean native caret
      if (target.closest('input, textarea, select, [contenteditable="true"]')) {
        setVariant('input')
        return
      }

      // Clickable elements, links, buttons, and interactive controls: morph into tactile hover ring
      if (
        target.closest('a, button, [role="button"], input[type="submit"], .cursor-pointer')
      ) {
        setVariant('hover')
        return
      }

      // Headings: subtle text aura
      if (target.closest('h1, h2')) {
        setVariant('text')
        return
      }

      setVariant('default')
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      mediaQuery.removeEventListener('change', updatePointerType)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      clearTimeout(velocityTimeout)
    }
  }, [isVisible, mouseX, mouseY, angle, stretchX, stretchY])

  if (!isFinePointer) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
          {/* 1. Click Ripple Shockwave (Zero blur, crisp tactile expansion) */}
          {clickRipples.map((ripple) => (
            <motion.div
              key={ripple.id}
              initial={{ scale: 0.3, opacity: 0.9 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{
                left: ripple.x,
                top: ripple.y,
              }}
              className="fixed -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-blue-500 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
          ))}

          {/* 2. Precision Core Dot (Zero Latency Pinpoint with high contrast) */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.9)]"
            style={{
              x: mouseX,
              y: mouseY,
            }}
            animate={{
              width: variant === 'input' ? 0 : variant === 'hover' ? 8 : 6,
              height: variant === 'input' ? 0 : variant === 'hover' ? 8 : 6,
              opacity: variant === 'input' ? 0 : 1,
              scale: isClicking ? 0.6 : 1,
            }}
            transition={{ duration: 0.15 }}
          />

          {/* 3. Fluid Outer Follower with Velocity Stretch (Unified style everywhere, NO BACKDROP BLUR) */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{
              x: smoothX,
              y: smoothY,
              rotate: variant === 'default' ? angle : 0,
              scaleX: variant === 'default' ? stretchX : 1,
              scaleY: variant === 'default' ? stretchY : 1,
            }}
            animate={{
              width:
                variant === 'hover'
                  ? 54
                  : variant === 'text'
                  ? 46
                  : variant === 'input'
                  ? 0
                  : 34,
              height:
                variant === 'hover'
                  ? 54
                  : variant === 'text'
                  ? 46
                  : variant === 'input'
                  ? 0
                  : 34,
              scale: isClicking ? 0.78 : 1,
              opacity: variant === 'input' ? 0 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 28,
              mass: 0.25,
            }}
          >
            {variant === 'hover' ? (
              /* Magnetic Button Hover Ring - Sharp border with glowing accent, zero blur */
              <div className="w-full h-full rounded-full border-2 border-blue-500 bg-blue-500/10 shadow-[0_0_18px_rgba(59,130,246,0.35)] transition-all duration-200" />
            ) : variant === 'text' ? (
              /* Heading Hover Aura - Elegant accent outline, zero blur */
              <div className="w-full h-full rounded-full border border-purple-500/50 bg-purple-500/5 shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all duration-200" />
            ) : (
              /* Default Clean Dual-Ring */
              <div className="w-full h-full rounded-full border border-blue-500/50 dark:border-blue-400/60 shadow-[0_0_12px_rgba(59,130,246,0.2)] transition-all duration-200" />
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
