// components/sections/Hero.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, Variants } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Check, Copy, FileText, ArrowRight, Terminal as TerminalIcon, Github, Linkedin, Mail, Play, CornerDownLeft } from 'lucide-react'
import { useSound } from './sound-provider'
import { resumeData } from '../../lib/resume'
import dynamic from 'next/dynamic'

const ParticleBackground = dynamic(() => import('./ParticleCanvas'), {
  ssr: false,
})

const coreTech = [
  { name: 'React.js', badge: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  { name: 'Next.js', badge: 'bg-foreground/10 text-foreground border-foreground/20' },
  { name: 'Node.js', badge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  { name: 'Express.js', badge: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  { name: 'MongoDB', badge: 'bg-green-500/10 text-green-500 border-green-500/20' },
  { name: 'Angular (Additional Strength)', badge: 'bg-rose-500/10 text-rose-500 border-rose-500/20' }
]

interface TerminalHistoryItem {
  command: string
  output: React.ReactNode
}

export default function Hero() {
  const { playHover, playClick } = useSound()
  const [copied, setCopied] = useState(false)
  const [terminalInput, setTerminalInput] = useState('')
  const [history, setHistory] = useState<TerminalHistoryItem[]>([
    {
      command: 'whoami',
      output: (
        <span className="text-foreground/80 font-sans">
          MERN Stack & Full Stack JavaScript Developer with <strong className="text-foreground">3+ years experience</strong> (Soluzione IT Services: June 2023 – July 2026). Production track record in React.js, Next.js, Node.js, Express.js, MongoDB, SSR migrations, and enterprise RBAC.
        </span>
      )
    },
    {
      command: 'cat profile.json',
      output: (
        <span className="text-emerald-500 dark:text-emerald-400 font-mono text-[11px] sm:text-xs">
          {`{ "experience": "3+ Years (June 2023 – July 2026)", "ssr_improvement": "167% (30 → 80+)", "rest_apis_shipped": "20+", "forms_engineered": "80+" }`}
        </span>
      )
    }
  ])

  const terminalEndRef = useRef<HTMLDivElement>(null)

  const handleCopyEmail = () => {
    playClick()
    navigator.clipboard.writeText(resumeData.personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const executeCommand = (cmdStr: string) => {
    playClick()
    const cleanCmd = cmdStr.trim().toLowerCase()
    let response: React.ReactNode = null

    switch (cleanCmd) {
      case 'whoami':
        response = (
          <span className="text-foreground/80 font-sans">
            Nitesh Kushwaha — MERN Stack Developer | Full Stack JavaScript Engineer. 3+ years delivering scalable React, Next.js, Node.js, and MongoDB platforms.
          </span>
        )
        break
      case 'cat profile.json':
      case 'stats':
      case 'status':
        response = (
          <span className="text-emerald-500 dark:text-emerald-400 font-mono text-xs">
            {`{ "status": "Available to Join Immediately", "apis": "20+ REST APIs", "forms": "80+ Forms", "lighthouse_boost": "+167% (30 → 80+)" }`}
          </span>
        )
        break
      case 'stack':
      case 'tech':
        response = (
          <span className="text-blue-400 font-mono text-xs">
            Core Stack: React.js, Next.js (SSR), Node.js, Express.js, MongoDB, Mongoose, REST APIs, TypeScript, Tailwind CSS, Angular, RxJS, NgRx, Azure Blob Storage.
          </span>
        )
        break
      case 'projects':
        response = <span className="text-blue-400 font-mono text-xs">Navigating to Featured Projects section...</span>
        window.location.href = '#projects'
        break
      case 'skills':
        response = <span className="text-blue-400 font-mono text-xs">Navigating to Technical Arsenal...</span>
        window.location.href = '#skills'
        break
      case 'experience':
        response = <span className="text-purple-400 font-mono text-xs">Navigating to Professional Career Record...</span>
        window.location.href = '#experience'
        break
      case 'contact':
        response = (
          <span className="text-emerald-400 font-mono text-xs">
            Email: niteshkushwaha603@gmail.com | Phone: +91 83499 45280 | Navigating to Contact section...
          </span>
        )
        window.location.href = '#contact'
        break
      case 'resume':
      case 'cv':
        response = (
          <span className="text-amber-400 font-mono text-xs">
            Downloading Nitesh Kushwaha.pdf...
          </span>
        )
        window.open('/Resume.pdf', '_blank')
        break
      case 'help':
        response = (
          <span className="text-foreground/70 font-mono text-xs">
            Supported commands: <span className="text-blue-400">whoami</span>, <span className="text-blue-400">stack</span>, <span className="text-blue-400">stats</span>, <span className="text-blue-400">projects</span>, <span className="text-blue-400">skills</span>, <span className="text-blue-400">experience</span>, <span className="text-blue-400">resume</span>, <span className="text-blue-400">contact</span>, <span className="text-blue-400">clear</span>
          </span>
        )
        break
      case 'clear':
        setHistory([])
        setTerminalInput('')
        return
      default:
        response = (
          <span className="text-rose-400 font-mono text-xs">
            Command not recognized: "{cleanCmd}". Type <strong className="text-blue-400">help</strong> for a list of available commands.
          </span>
        )
    }

    setHistory((prev) => [...prev, { command: cmdStr, output: response }])
    setTerminalInput('')
    setTimeout(() => {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && terminalInput.trim()) {
      executeCommand(terminalInput)
    }
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
    <section className="relative min-h-[92vh] pt-28 pb-16 flex flex-col items-center justify-center">
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
        {resumeData.personalInfo.availability && (
          <motion.div variants={itemVariants} className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {resumeData.personalInfo.availability}
          </motion.div>
        )}

        {/* Main Name Heading */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 text-foreground drop-shadow-sm font-sans"
        >
          {resumeData.personalInfo.name}
        </motion.h1>

        {/* Primary Repositioned Headline */}
        <motion.p variants={itemVariants} className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold max-w-3xl mx-auto mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
          {resumeData.personalInfo.title}
        </motion.p>

        {/* Subheading */}
        <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-foreground/75 max-w-2xl mx-auto mb-6 leading-relaxed">
          {resumeData.personalInfo.subheading}
        </motion.p>

        {/* Core Technology Indicators */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-2xl mx-auto">
          {coreTech.map((tech) => (
            <span
              key={tech.name}
              className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${tech.badge}`}
            >
              {tech.name}
            </span>
          ))}
        </motion.div>

        {/* Dynamic Role Animation */}
        <motion.div variants={itemVariants} className="mb-8 h-8 flex justify-center text-xs sm:text-sm font-mono text-foreground/70">
          <TypeAnimation
            sequence={[
              '> MERN Stack Developer', 2000,
              '> Full Stack JavaScript Engineer', 2000,
              '> React.js & Next.js SSR Specialist', 2000,
              '> 20+ Node.js & MongoDB REST APIs', 2000,
              '> Enterprise Workflow & RBAC Architect', 2000,
              '> 167% Lighthouse Score Boost', 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="px-3.5 py-1.5 rounded-lg bg-secondary/70 border border-border/60 shadow-inner"
          />
        </motion.div>

        {/* Interactive Terminal Window */}
        <motion.div 
          variants={itemVariants}
          className="max-w-2xl mx-auto mb-10 text-left rounded-2xl border border-border bg-card/90 backdrop-blur-xl shadow-2xl overflow-hidden font-mono text-xs sm:text-sm"
        >
          {/* Header Bar */}
          <div className="bg-secondary/80 px-4 py-2.5 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            </div>
            <div className="text-foreground/50 text-xs flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-blue-500" /> nitesh@fullstack-dev ~ %
            </div>
            
            {/* Quick Action Chips */}
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-foreground/50">
              <button 
                onClick={() => executeCommand('stats')}
                className="px-2 py-0.5 rounded bg-background/60 hover:bg-background border border-border/60 text-blue-500 transition-colors"
              >
                stats
              </button>
              <button 
                onClick={() => executeCommand('projects')}
                className="px-2 py-0.5 rounded bg-background/60 hover:bg-background border border-border/60 text-purple-500 transition-colors"
              >
                projects
              </button>
              <button 
                onClick={() => executeCommand('clear')}
                className="px-2 py-0.5 rounded bg-background/60 hover:bg-background border border-border/60 text-foreground/60 transition-colors"
              >
                clear
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 max-h-64 overflow-y-auto space-y-3 bg-card/95 text-foreground/90 font-mono text-xs">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 select-none">$</span>
                  <span className="text-purple-400 font-semibold">{item.command}</span>
                </div>
                <div className="pl-4 leading-relaxed">{item.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />

            {/* Live Interactive Command Input */}
            <div className="flex items-center gap-2 pt-2 border-t border-border/40 mt-3">
              <span className="text-blue-500 select-none font-bold">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type 'help', 'stats', 'projects', or 'skills'..."
                className="w-full bg-transparent border-none outline-none text-xs font-mono text-foreground placeholder:text-foreground/40"
              />
              <button
                onClick={() => terminalInput.trim() && executeCommand(terminalInput)}
                className="p-1 rounded text-foreground/40 hover:text-foreground transition-colors"
                title="Execute command"
              >
                <CornerDownLeft className="w-3.5 h-3.5 text-blue-500" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Primary Action CTAs */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3.5 justify-center items-center text-sm font-medium relative z-30">
          {/* View Projects CTA */}
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:scale-105 transition-all shadow-lg flex items-center gap-2 group"
            onMouseEnter={playHover}
            onClick={playClick}
          >
            View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            <span>Download Resume</span>
          </a>

          {/* Contact CTA */}
          <a
            href="#contact"
            onMouseEnter={playHover}
            onClick={playClick}
            className="px-5 py-3 rounded-full border border-border/80 bg-background/60 hover:bg-secondary transition-all flex items-center gap-2 text-foreground font-medium shadow-sm hover:scale-105"
          >
            <Mail className="w-4 h-4 text-purple-500" />
            <span>Contact</span>
          </a>

          {/* Quick Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            onMouseEnter={playHover}
            className="px-4 py-3 rounded-full border border-border/80 bg-background/50 hover:bg-secondary transition-all flex items-center gap-1.5 text-foreground/80 hover:text-foreground text-xs font-mono shadow-sm"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Email</span>
              </>
            )}
          </button>

          {/* GitHub & LinkedIn Social Badges */}
          <div className="flex items-center gap-2 pl-1">
            <a
              href={resumeData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              aria-label="GitHub Profile"
              className="p-3 rounded-full border border-border/80 bg-background/50 hover:bg-secondary text-foreground/75 hover:text-foreground transition-all hover:scale-110 shadow-sm"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={resumeData.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              aria-label="LinkedIn Profile"
              className="p-3 rounded-full border border-border/80 bg-background/50 hover:bg-secondary text-foreground/75 hover:text-foreground transition-all hover:scale-110 shadow-sm"
            >
              <Linkedin className="w-4 h-4 text-blue-500" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}