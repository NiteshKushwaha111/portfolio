// components/sections/experience.tsx
'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Award, Zap, Shield, BarChart, CheckCircle } from 'lucide-react'
import { useSound } from './sound-provider'
import { resumeData } from '../../lib/resume'

const iconMap = [Zap, Shield, BarChart, CheckCircle, Award, Calendar];

export default function Experience() {
  const { playHover } = useSound()

  return (
    <section id="experience" className="py-28 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-mono text-foreground/50 mb-3 block tracking-widest uppercase">
            / CAREER RECORD
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground drop-shadow-sm">
            Professional Experience
          </h2>
        </motion.div>

        <div className="space-y-12">
          {resumeData.experience.map((exp, idx) => (
            <motion.div
              key={exp.company + idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative p-8 md:p-10 rounded-3xl bg-card/60 border border-border/70 hover:border-border hover:bg-card transition-all duration-300 group shadow-sm"
              onMouseEnter={playHover}
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-foreground/70 transition-all">
                      {exp.role}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm md:text-base font-medium">
                      <span className="flex items-center gap-2 text-blue-500 dark:text-blue-400 font-semibold">
                        <Award className="w-5 h-5" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-2 text-foreground/50">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-xs font-mono text-foreground/80 shadow-sm shrink-0">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    {exp.period}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                  {exp.achievements.map((achievementText, i) => {
                    const Icon = iconMap[i % iconMap.length];
                    const highlightedText = achievementText.replace(
                        /(Next\.js|Angular|React\.js|167% increase|167%|Lighthouse|SSR optimization|60%|RBAC|25%|Chart\.js|TanStack Table|JWT)/g,
                        '<span className="font-semibold text-foreground bg-secondary/80 px-1 rounded-md">$1</span>'
                    );

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + (i * 0.08) }}
                        className="flex gap-4 group/item"
                      >
                        <div className="mt-1 shrink-0 p-2 rounded-xl bg-background border border-border/50 shadow-sm group-hover/item:border-blue-500/30 group-hover/item:shadow-blue-500/10 transition-all">
                          <Icon className="w-4 h-4 text-foreground/40 group-hover/item:text-blue-500 transition-colors" />
                        </div>
                        <p 
                          className="text-foreground/70 leading-relaxed text-xs sm:text-sm"
                          dangerouslySetInnerHTML={{ __html: highlightedText }}
                        />
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact metric highlight banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center justify-center p-8 bg-card/80 rounded-3xl border border-border shadow-lg max-w-lg mx-auto">
            <div className="text-4xl sm:text-6xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-2 tracking-tighter">
              167%
            </div>
            <p className="text-sm sm:text-base font-medium text-foreground/80">
              Lighthouse Performance Gain via Next.js SSR Migration
            </p>
            <p className="text-xs text-foreground/50 mt-1">
              (Lighthouse score 30 → 80+ across enterprise modules)
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}