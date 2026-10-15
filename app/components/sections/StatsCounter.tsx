// app/components/sections/StatsCounter.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Clock, ShieldCheck, Server } from 'lucide-react'
import { useSound } from './sound-provider'

interface StatItem {
  icon: any
  target: number
  prefix?: string
  suffix: string
  label: string
  subtext: string
  gradient: string
}

const stats: StatItem[] = [
  {
    icon: Zap,
    target: 167,
    suffix: "%",
    label: "Lighthouse Score Boost",
    subtext: "From 30 to 80+ via Next.js SSR migration",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    icon: Clock,
    target: 3,
    suffix: "+ Yrs",
    label: "Professional Experience",
    subtext: "Soluzione IT Services (June 2023 – July 2026)",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: ShieldCheck,
    target: 80,
    suffix: "+",
    label: "Dynamic Forms Engineered",
    subtext: "With 60% reduction in data entry errors",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: Server,
    target: 20,
    suffix: "+",
    label: "REST APIs Developed",
    subtext: "Node.js, Express & MongoDB for 700+ schools",
    gradient: "from-amber-500 to-orange-500"
  }
]

function CounterValue({ target, suffix, prefix = "" }: { target: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 1400 // ms
    const startTime = performance.now()

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic formula
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const currentVal = Math.round(easeProgress * target)
      setCount(currentVal)

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        setCount(target)
      }
    }

    requestAnimationFrame(updateCounter)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

function SpotlightCard({ item, index }: { item: StatItem; index: number }) {
  const { playHover } = useSound()
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const Icon = item.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => {
        playHover()
        setIsHovered(true)
      }}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative p-6 rounded-2xl border border-border/70 bg-card/60 hover:border-border transition-all duration-300 group shadow-sm overflow-hidden"
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.12), transparent 60%)`
            : '',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className={`text-3xl font-bold font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${item.gradient}`}>
            <CounterValue target={item.target} suffix={item.suffix} prefix={item.prefix} />
          </div>
        </div>
        <h3 className="font-semibold text-sm text-foreground mb-1 group-hover:text-blue-500 transition-colors">
          {item.label}
        </h3>
        <p className="text-xs text-foreground/60 leading-relaxed font-sans">
          {item.subtext}
        </p>
      </div>
    </motion.div>
  )
}

export default function StatsCounter() {
  return (
    <section className="py-12 relative border-y border-border/50 bg-secondary/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <SpotlightCard key={item.label} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
