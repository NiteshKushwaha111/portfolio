// components/sections/experience.tsx
'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Award, Zap, Shield, BarChart, CheckCircle } from 'lucide-react'
import { useSound } from './sound-provider'
import { resumeData } from '../../lib/resume'

// We map icons dynamically based on keywords or index
const iconMap = [Zap, Shield, BarChart, CheckCircle, Award, Calendar];

export default function Experience() {
  const { playHover } = useSound()

  return (
    <section id="experience" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 text-center"
        >
          <span className="text-sm font-mono text-foreground/40 mb-4 block">
            / CAREER RECORD
          </span>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-foreground drop-shadow-sm">
            Professional Experience
          </h2>
        </motion.div>

        <div className="space-y-12">
          {resumeData.experience.map((exp, idx) => (
            <motion.div
              key={exp.company + idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative p-8 md:p-10 rounded-3xl bg-secondary/10 border border-border/50 hover:border-border/80 hover:bg-secondary/20 transition-all duration-300 group"
              onMouseEnter={playHover}
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-foreground/70 transition-all">
                      {exp.role.split('(')[0].trim()}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm md:text-base font-medium">
                      <span className="flex items-center gap-2 text-blue-500 dark:text-blue-400">
                        <Award className="w-5 h-5" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-2 text-foreground/50">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border text-sm font-mono text-foreground/70 shadow-sm shrink-0">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                  {exp.achievements.map((achievementText, i) => {
                    const Icon = iconMap[i % iconMap.length];
                    // Regex to highlight specific impressive tech/metrics
                    const highlightedText = achievementText.replace(
                        /(Next\.js|Angular|React\.js|150% increase|Lighthouse|SSR optimization|60%|RBAC|25%|Chart\.js|TanStack Table|JWT)/g,
                        '<span className="font-semibold text-foreground bg-secondary/80 px-1 rounded-md">$1</span>'
                    );

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="flex gap-4 group/item"
                      >
                        <div className="mt-1 shrink-0 p-2 rounded-xl bg-background border border-border/50 shadow-sm group-hover/item:border-blue-500/30 group-hover/item:shadow-blue-500/10 transition-all">
                          <Icon className="w-4 h-4 text-foreground/40 group-hover/item:text-blue-500 transition-colors" />
                        </div>
                        <p 
                          className="text-foreground/70 leading-relaxed text-sm md:text-base"
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

        {/* Impact metric extracted to its own bold section below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center justify-center p-10 bg-gradient-to-b from-transparent to-secondary/30 rounded-3xl border border-b-border/0 border-t-border/50 border-x-border/10">
            <div className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4 tracking-tighter">
              150%
            </div>
            <p className="text-xl font-medium text-foreground/80">
              Lighthouse Performance Increase via SSR
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}