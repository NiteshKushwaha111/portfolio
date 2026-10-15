'use client'

import { motion } from 'framer-motion'
import { resumeData } from '../../lib/resume'
import { GraduationCap, MapPin, Calendar, UserCheck, Layers, Code2, Server, ShieldCheck } from 'lucide-react'
import { useSound } from './sound-provider'

export default function Education() {
  const { playHover } = useSound()

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-secondary/5">
      <div id="education" className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-foreground/50 mb-3 block tracking-widest uppercase">
            / BACKGROUND & CREDENTIALS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground">
            About Me & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Education</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {/* Concise Professional About Me Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={playHover}
            className="p-8 md:p-10 rounded-3xl border border-border/70 bg-card/70 backdrop-blur-xl shadow-sm hover:border-border transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shadow-sm">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                  Full Stack JavaScript & MERN Engineer
                </h3>
                <p className="text-xs font-mono text-foreground/50">
                  3+ Years Production Experience • Soluzione IT Services
                </p>
              </div>
            </div>

            <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-sans mb-6">
              I am a Full Stack JavaScript Developer with 3+ years of professional experience building production web applications using React.js, Next.js, Angular, Node.js, Express.js, and MongoDB. My engineering background covers building and integrating REST APIs, architecting enterprise workflows with 80+ dynamic reactive forms, implementing granular Role-Based Access Control (RBAC), and optimizing frontend rendering via Server-Side Rendering (SSR). I take pride in crafting performant, maintainable architectures that solve concrete business challenges.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/50 text-xs font-medium text-foreground/80">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>React.js, Next.js & SSR Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Node.js, Express & MongoDB APIs</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Enterprise RBAC & Workflows</span>
              </div>
            </div>
          </motion.div>

          {/* Academic Background / Education Card */}
          {resumeData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onMouseEnter={playHover}
              className="relative p-8 md:p-10 rounded-3xl border border-border/60 bg-card/60 backdrop-blur-xl hover:bg-card hover:border-border transition-all duration-300 group overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-purple-500/20 transition-colors" />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                <div className="flex gap-6">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary border border-border shrink-0 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-7 h-7 text-foreground/80 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-foreground/50 block mb-1 uppercase tracking-wider">
                      Academic Degree
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1.5">
                      {edu.institution}
                    </h3>
                    <div className="text-base text-foreground/80 font-medium mb-3">
                      {edu.degree}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-foreground/60">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" />
                        {edu.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-purple-500" />
                        {edu.period}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-xs font-mono font-medium text-foreground/80 whitespace-nowrap shadow-sm">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
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
