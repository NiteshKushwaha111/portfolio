// app/components/sections/StatsCounter.tsx
'use client'

import { motion } from 'framer-motion'
import { Zap, Clock, ShieldCheck, Layers } from 'lucide-react'
import { useSound } from './sound-provider'

const stats = [
  {
    icon: Zap,
    metric: "167%",
    label: "Lighthouse Score Increase",
    subtext: "From 30 to 80+ via SSR & lazy loading",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    icon: Clock,
    metric: "3+ Yrs",
    label: "Professional Experience",
    subtext: "Shipping Angular, Next.js & MEAN apps",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: ShieldCheck,
    metric: "60+",
    label: "Dynamic Forms Engineered",
    subtext: "With 60% reduction in data entry errors",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: Layers,
    metric: "25%",
    label: "Dev Speed Acceleration",
    subtext: "Via 30+ reusable component libraries",
    gradient: "from-amber-500 to-orange-500"
  }
]

export default function StatsCounter() {
  const { playHover } = useSound()

  return (
    <section className="py-12 relative border-y border-border/50 bg-secondary/10 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={playHover}
                className="p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md hover:bg-card hover:border-border transition-all duration-300 group shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className={`text-3xl font-bold font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${item.gradient}`}>
                    {item.metric}
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1">
                  {item.label}
                </h3>
                <p className="text-xs text-foreground/60 leading-relaxed font-sans">
                  {item.subtext}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
