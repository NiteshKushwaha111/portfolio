// app/components/sections/PerformanceScorecard.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gauge, Zap, CheckCircle2, AlertTriangle, ArrowUpRight, Cpu } from 'lucide-react'
import { useSound } from './sound-provider'

interface MetricComparison {
  name: string
  legacy: string
  optimized: string
  improvement: string
  unit: string
  description: string
  status: 'good' | 'needs-improvement' | 'poor'
}

const metrics: MetricComparison[] = [
  {
    name: 'Lighthouse Performance Score',
    legacy: '30',
    optimized: '84+',
    improvement: '+167%',
    unit: '/ 100',
    description: 'Overall Lighthouse audit score after SSR migration, image optimization, and code splitting.',
    status: 'good'
  },
  {
    name: 'First Contentful Paint (FCP)',
    legacy: '3.4s',
    optimized: '0.9s',
    improvement: '73% Faster',
    unit: 'seconds',
    description: 'Time until the user sees the first DOM element rendered on screen.',
    status: 'good'
  },
  {
    name: 'Largest Contentful Paint (LCP)',
    legacy: '4.8s',
    optimized: '1.2s',
    improvement: '75% Faster',
    unit: 'seconds',
    description: 'Time until the main hero content and primary UI text finishes loading.',
    status: 'good'
  },
  {
    name: 'Total Blocking Time (TBT)',
    legacy: '850ms',
    optimized: '45ms',
    improvement: '94% Lower',
    unit: 'milliseconds',
    description: 'Amount of main-thread CPU blocking time before interactive event handlers respond.',
    status: 'good'
  },
  {
    name: 'JavaScript Payload Size',
    legacy: '820 KB',
    optimized: '195 KB',
    improvement: '76% Smaller',
    unit: 'kilobytes',
    description: 'Initial JS bundle downloaded by client browser on initial page visit.',
    status: 'good'
  }
]

export default function PerformanceScorecard() {
  const { playHover, playClick } = useSound()
  const [activeMetricIndex, setActiveMetricIndex] = useState(0)

  const activeMetric = metrics[activeMetricIndex]

  return (
    <section className="py-20 relative bg-secondary/5 border-y border-border/40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-foreground/50 mb-3 block tracking-widest uppercase">
            / PERFORMANCE BENCHMARK
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
            Core Web Vitals & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">SSR Scorecard</span>
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Real performance telemetry measuring the Boarding Schools of India Angular → Next.js SSR migration.
          </p>
        </motion.div>

        {/* Interactive Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {metrics.map((item, idx) => {
            const isActive = activeMetricIndex === idx
            return (
              <button
                key={item.name}
                onClick={() => {
                  playClick()
                  setActiveMetricIndex(idx)
                }}
                onMouseEnter={playHover}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isActive
                    ? 'bg-card border-blue-500 shadow-md shadow-blue-500/10'
                    : 'bg-card/40 border-border/60 hover:border-border hover:bg-card/80'
                }`}
              >
                <div className="text-[11px] font-mono text-foreground/50 truncate mb-1">{item.name.split('(')[0]}</div>
                <div className="text-xl font-bold font-mono text-emerald-500">{item.optimized}</div>
                <div className="text-[10px] font-mono text-blue-500 mt-1 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" /> {item.improvement}
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected Metric Deep Dive Box */}
        <div className="p-8 rounded-3xl border border-border/80 bg-card shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border/50">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-blue-500 mb-1">
                <Gauge className="w-4 h-4" /> Selected Metric Telemetry
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground">{activeMetric.name}</h3>
              <p className="text-xs sm:text-sm text-foreground/60 mt-1 max-w-xl">{activeMetric.description}</p>
            </div>

            <div className="flex items-center gap-4 bg-secondary/60 p-3 rounded-2xl border border-border/60 shrink-0">
              <div className="text-center px-3 border-r border-border/50">
                <div className="text-[10px] font-mono text-foreground/50 uppercase">Legacy Client SPA</div>
                <div className="text-lg font-bold font-mono text-rose-500">{activeMetric.legacy}</div>
              </div>
              <div className="text-center px-3">
                <div className="text-[10px] font-mono text-foreground/50 uppercase">Next.js SSR</div>
                <div className="text-2xl font-extrabold font-mono text-emerald-500">{activeMetric.optimized}</div>
              </div>
            </div>
          </div>

          <div className="pt-6 grid sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-foreground/70 bg-secondary/30 p-3 rounded-xl border border-border/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>100% Core Web Vitals Passing</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/70 bg-secondary/30 p-3 rounded-xl border border-border/40">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Edge CDN Caching Enabled</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/70 bg-secondary/30 p-3 rounded-xl border border-border/40">
              <Cpu className="w-4 h-4 text-purple-500 shrink-0" />
              <span>Zero Main-Thread Blocking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
