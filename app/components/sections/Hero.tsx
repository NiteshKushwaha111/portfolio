// components/sections/Hero.tsx
'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Check, Copy, FileText, ArrowRight, Terminal as TerminalIcon } from 'lucide-react'
import { useSound } from './sound-provider'
import { resumeData } from '../../lib/resume'
import dynamic from 'next/dynamic'

const ParticleBackground = dynamic(() => import('./ParticleCanvas'), {
  ssr: false,
})

export default function Hero() {
  const { playHover, playClick } = useSound()
  const [copied, setCopied] = useState(false)

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
      {/* 3D Particle Background Wrapper */}
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

        {/* Positioning Title */}
        <motion.p variants={itemVariants} className="text-lg sm:text-2xl font-serif font-medium max-w-3xl mx-auto mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
          Frontend Developer | React.js, Next.js, Angular, TypeScript & Node.js
        </motion.p>

        {/* Dynamic Role Animation */}
        <motion.div variants={itemVariants} className="mb-8 h-8 flex justify-center text-sm sm:text-base font-mono text-foreground/70">
          <TypeAnimation
            sequence={[
              '> React.js & Next.js Architect', 2200,
              '> Angular (v12–v18) Developer', 2200,
              '> 20+ REST APIs (Node.js & Express)', 2200,
              '> 167% Lighthouse Score Boost', 2200,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="px-3 py-1 rounded-md bg-secondary/60 border border-border/50"
          />
        </motion.div>

        {/* Terminal Motif Window */}
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
              Frontend-first Developer with <span className="font-semibold text-foreground">3+ years experience</span> (Soluzione IT Services: June 2023 – July 2026). Architect of 80+ multi-step forms, 20+ REST APIs, and enterprise RBAC systems.
            </div>

            <div className="flex items-start gap-2 pt-1">
              <span className="text-blue-500 select-none">$</span>
              <div>
                <span className="text-purple-400 font-semibold">cat</span> stats.json
              </div>
            </div>
            <div className="pl-4 text-emerald-500 dark:text-emerald-400 font-mono text-xs">
              {`{ "experience": "3+ Years (June 2023 – July 2026)", "lighthouse_gain": "167% (30 → 80+)", "apis_built": "20+", "forms_engineered": "80+" }`}
            </div>
          </div>
        </motion.div>

        {/* Action CTAs: Direct Single Resume Link with Nitesh Kushwaha.pdf download attribute */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center items-center text-sm font-medium relative z-30">
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:scale-105 transition-all shadow-lg flex items-center gap-2 group"
            onMouseEnter={playHover}
            onClick={playClick}
          >
            Explore Featured Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          
          {/* Direct Resume Download Link */}
          <a
            href="/Resume.pdf"
            download="Nitesh Kushwaha.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="px-6 py-3 rounded-full border border-border bg-secondary/80 hover:bg-secondary transition-all flex items-center gap-2 font-semibold text-foreground shadow-sm hover:scale-105"
          >
            <FileText className="w-4 h-4 text-blue-500" />
            <span>View Official Resume</span>
          </a>

          {/* Quick Copy Email Button */}
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