'use client'

import { motion } from 'framer-motion'
import { resumeData } from '../../lib/resume'
import { GraduationCap, MapPin, Calendar } from 'lucide-react'
import { useSound } from './sound-provider'

export default function Education() {
  const { playHover } = useSound()

  return (
    <section id="education" className="py-32 relative overflow-hidden bg-secondary/5">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-foreground/40 mb-4 block tracking-widest uppercase">
            {`/ Academic Background`}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-6 hidden md:block">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Credentials</span>
          </h2>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-6 md:hidden">
            Education
          </h2>
        </motion.div>

        <div className="space-y-8">
          {resumeData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              onMouseEnter={playHover}
              className="relative p-8 md:p-10 rounded-3xl border border-border/50 bg-background/50 backdrop-blur-xl hover:bg-secondary/10 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-blue-500/20 transition-colors" />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                <div className="flex gap-6">
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/50 border border-border shrink-0 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-8 h-8 text-foreground/70 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                      {edu.institution}
                    </h3>
                    <div className="text-lg text-foreground/80 font-medium mb-4">
                      {edu.degree}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </div>
                      <div className="flex items-center gap-1.5 md:hidden">
                        <Calendar className="w-4 h-4" />
                        {edu.period}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium text-foreground/80 whitespace-nowrap">
                  <Calendar className="w-4 h-4" />
                  {edu.period}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
