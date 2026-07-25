// app/components/sections/Testimonials.tsx
'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { resumeData } from '../../lib/resume'
import { useSound } from './sound-provider'

export default function Testimonials() {
  const { playHover } = useSound()

  if (!resumeData.testimonials || resumeData.testimonials.length === 0) {
    return null
  }

  return (
    <section id="testimonials" className="py-24 relative bg-secondary/10 border-y border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-foreground/50 mb-3 block tracking-widest uppercase">
            / RECOMMENDATIONS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground">
            What Leaders Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {resumeData.testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={playHover}
              className="p-8 rounded-3xl border border-border/70 bg-card/70 backdrop-blur-md hover:bg-card transition-all duration-300 relative flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-blue-500/20 mb-3" />
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed italic mb-6">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-foreground">{item.name}</div>
                  <div className="text-xs text-foreground/50 font-mono">{item.role} • {item.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
