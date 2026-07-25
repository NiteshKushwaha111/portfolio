// components/sections/Hero.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Check, Copy, FileText, ArrowRight, Terminal as TerminalIcon, ChevronDown, Sparkles } from 'lucide-react'
import { useSound } from './sound-provider'
import { resumeData } from '../../lib/resume'
import dynamic from 'next/dynamic'

const ParticleBackground = dynamic(() => import('./ParticleCanvas'), {
  ssr: false,
})

export default function Hero() {
  const { playHover, playClick } = useSound()
  const [copied, setCopied] = useState(false)
  const [resumeDropdown, setResumeDropdown] = useState(false)

  const handleCopyEmail = () => {
    playClick()
    navigator.clipboard.writeText(resumeData.personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  }

  return (
    <section className="relative min-h-[92vh] pt-24 pb-16 flex flex-col items-center justify-center">
      {/* 3D Particle Background Wrapper with isolated overflow clipping */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <ParticleBackground />
      </div>

      <motion.div 
        className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          {resumeData.personalInfo.availability}
        </motion.div>

        {/* Main Name Heading */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 text-foreground drop-shadow-sm"
        >
          {resumeData.personalInfo.name}
        </motion.h1>

        {/* Unified Positioning Title */}
        <motion.p variants={itemVariants} className="text-lg sm:text-2xl font-serif font-medium max-w-3xl mx-auto mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
          Full-Stack & Frontend Engineer specializing in Angular, React & Next.js — with MEAN experience shipping production APIs.
        </motion.p>

        {/* Dynamic Role Animation */}
        <motion.div variants={itemVariants} className="mb-8 h-8 flex justify-center text-sm sm:text-base font-mono text-foreground/70">
          <TypeAnimation
            sequence={[
              '> Angular 14+ Specialist', 2200,
              '> Next.js & React Architect', 2200,
              '> MEAN Stack API Engineer', 2200,
              '> 167% Lighthouse Score Boost', 2200,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="px-3 py-1 rounded-md bg-secondary/60 border border-border/50"
          />
        </motion.div>

        {/* Terminal Motif Window (LinkedIn Branding Alignment) */}
        <motion.div 
          variants={itemVariants}
          className="max-w-2xl mx-auto mb-10 text-left rounded-2xl border border-border bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden font-mono text-xs sm:text-sm"
        >
          <div className="bg-secondary/80 px-4 py-2.5 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            </div>
            <div className="text-foreground/40 text-xs flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5" /> nitesh@dev-portfolio ~ %
            </div>
            <div className="w-10"></div>
          </div>
          <div className="p-5 space-y-3 bg-card/95 text-foreground/90">
            <div className="flex items-start gap-2">
              <span className="text-blue-500 select-none">$</span>
              <div>
                <span className="text-purple-400 font-semibold">whoami</span>
              </div>
            </div>
            <div className="pl-4 text-foreground/70 leading-relaxed font-sans text-xs sm:text-sm">
              Full-Stack & Frontend Engineer with <span className="font-semibold text-foreground">3+ years experience</span>. Architect of 60+ dynamic forms, 30+ reusable UI component libraries, and enterprise RBAC systems.
            </div>

            <div className="flex items-start gap-2 pt-1">
              <span className="text-blue-500 select-none">$</span>
              <div>
                <span className="text-purple-400 font-semibold">cat</span> stats.json
              </div>
            </div>
            <div className="pl-4 text-emerald-500 dark:text-emerald-400 font-mono text-xs">
              {`{ "experience": "3+ Years", "lighthouse_gain": "167% (30 → 80+)", "error_reduction": "60%", "dev_speedup": "25%" }`}
            </div>
          </div>
        </motion.div>

        {/* Action CTAs */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center items-center text-sm font-medium relative z-30">
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:scale-105 transition-all shadow-lg flex items-center gap-2 group"
            onMouseEnter={playHover}
            onClick={playClick}
          >
            Explore Selected Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          
          {/* Dual Resume Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                playClick()
                setResumeDropdown(!resumeDropdown)
              }}
              onMouseEnter={playHover}
              className="px-6 py-3 rounded-full border border-border bg-secondary/80 hover:bg-secondary transition-all flex items-center gap-2 font-semibold text-foreground shadow-sm"
            >
              <FileText className="w-4 h-4 text-blue-500" />
              <span>Resume Options</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resumeDropdown ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {resumeDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-card border border-border rounded-2xl shadow-2xl p-2.5 z-50 text-left backdrop-blur-2xl"
                >
                  <div className="px-3 py-2 text-[10px] font-mono text-foreground/60 uppercase tracking-widest border-b border-border/60 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Choose Targeted Resume
                  </div>
                  <a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-secondary transition-colors"
                    onClick={() => setResumeDropdown(false)}
                  >
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover:scale-105 transition-transform mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Frontend Role</div>
                      <div className="text-[11px] text-foreground/60">React.js, Next.js & UI Architecture</div>
                    </div>
                  </a>
                  <a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-secondary transition-colors"
                    onClick={() => setResumeDropdown(false)}
                  >
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 border border-purple-500/20 group-hover:scale-105 transition-transform mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Full-Stack Role</div>
                      <div className="text-[11px] text-foreground/60">Angular & MEAN Stack APIs</div>
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Copy Email Toast Button */}
          <button
            onClick={handleCopyEmail}
            onMouseEnter={playHover}
            className="px-5 py-3 rounded-full border border-border/80 bg-background/50 hover:bg-secondary transition-all flex items-center gap-2 text-foreground/80 hover:text-foreground text-xs font-mono shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied Email!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}