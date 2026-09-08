// components/sections/experience.tsx
'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Award, Zap, Code, Server, CheckCircle2 } from 'lucide-react'
import { useSound } from './sound-provider'
import { resumeData } from '../../lib/resume'

export default function Experience() {
  const { playHover } = useSound()

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-mono text-foreground/50 mb-3 block tracking-widest uppercase">
            / CAREER RECORD
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground drop-shadow-sm">
            Professional Work Experience
          </h2>
        </motion.div>

        <div className="space-y-12">
          {resumeData.experience.map((exp, idx) => (
            <motion.div
              key={exp.company + idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative p-8 md:p-10 rounded-3xl bg-card/60 border border-border/70 hover:border-border hover:bg-card transition-all duration-300 group shadow-sm"
              onMouseEnter={playHover}
            >
              <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4 border-b border-border/50 pb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-foreground group-hover:text-blue-500 transition-colors">
                      {exp.role}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
                      <span className="flex items-center gap-2 text-blue-500 dark:text-blue-400 font-semibold">
                        <Award className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1.5 text-foreground/60">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-xs font-mono text-foreground/80 shadow-sm shrink-0">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    {exp.period}
                  </div>
                </div>

                {/* Sub-Tracks from Resume */}
                <div className="space-y-8">
                  {exp.tracks ? (
                    exp.tracks.map((track, tIdx) => (
                      <div key={tIdx} className="space-y-4">
                        <h4 className="text-base font-semibold text-foreground flex items-center gap-2 font-mono border-l-2 border-blue-500 pl-3">
                          {tIdx === 0 && <Code className="w-4 h-4 text-blue-500" />}
                          {tIdx === 1 && <Zap className="w-4 h-4 text-amber-500" />}
                          {tIdx === 2 && <Server className="w-4 h-4 text-emerald-500" />}
                          {track.name}
                        </h4>

                        <div className="grid gap-3 pl-3">
                          {track.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                              <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : null}
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
            <p className="text-sm sm:text-base font-medium text-foreground/90">
              Lighthouse Score Improvement (30 → 80+) via Next.js SSR Migration
            </p>
            <p className="text-xs text-foreground/50 mt-1">
              Boarding Schools of India & Enterprise Accreditation Platforms
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}