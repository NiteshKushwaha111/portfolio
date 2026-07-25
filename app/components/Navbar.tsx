// components/Navbar.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, Volume2, VolumeX, FileText, Sparkles, ChevronDown } from 'lucide-react'
import { useSound } from './sections/sound-provider'
import { ThemeToggle } from './sections/theme-toggle'

const navItems = [
  { href: '#skills', label: 'Skills' },
  { href: '#playground', label: 'Playground' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const { playHover, playClick, isMuted, toggleMute } = useSound()
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showResumeDropdown, setShowResumeDropdown] = useState(false)
  const [activeSection, setActiveSection] = useState('skills')
  const [scrollProgress, setScrollProgress] = useState(0)

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Scroll Progress & Active Section ScrollSpy Observer
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(currentProgress)
      setScrolled(window.scrollY > 30)

      // Section Intersection Logic
      const sections = navItems.map(item => item.href.substring(1))
      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 250) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 pointer-events-none"
    >
      {/* Scroll Progress Bar */}
      <div className="w-full h-[2.5px] bg-transparent pointer-events-auto">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav className={`w-full transition-all duration-500 pointer-events-auto ${
        scrolled 
          ? 'py-3 bg-background/90 backdrop-blur-2xl border-b border-border/80 shadow-md shadow-black/5' 
          : 'py-5 bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* High-Visibility Sharp Logo & Role Brand */}
            <motion.a
              href="#"
              className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onMouseEnter={playHover}
              onClick={playClick}
            >
              {/* High Contrast Solid Gradient Icon Box */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white font-mono text-sm font-extrabold tracking-tight flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all">
                NK
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-bold font-serif leading-tight text-foreground">Nitesh Kushwaha</span>
                <span className="text-[10px] font-mono text-foreground/70 dark:text-foreground/60">Full-Stack & Frontend Engineer</span>
              </div>
            </motion.a>

            {/* Desktop Center Navigation Pill */}
            <div className="hidden md:flex items-center bg-card/90 backdrop-blur-xl border border-border/80 rounded-full px-2 py-1 shadow-md shadow-black/5 relative">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 z-10 ${
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400 font-bold' 
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activePill"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-purple-500/15 border border-blue-500/30 rounded-full -z-10 shadow-sm"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </a>
                )
              })}
            </div>

            {/* Right Actions: Sound Toggle, Theme Toggle, Resume Selector */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Sound Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleMute()}
                onMouseEnter={playHover}
                className="p-2.5 rounded-full bg-secondary/80 border border-border hover:bg-secondary transition-all text-foreground/80 hover:text-foreground shadow-sm"
                title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
                aria-label="Toggle Sound Effects"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-blue-500" />}
              </motion.button>

              <ThemeToggle />

              {/* Desktop Resume Selector Dropdown */}
              <div className="relative hidden lg:block">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    playClick()
                    setShowResumeDropdown(!showResumeDropdown)
                  }}
                  onMouseEnter={playHover}
                  className="px-4 py-2 text-xs font-semibold rounded-full bg-foreground text-background hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showResumeDropdown ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {showResumeDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-3 w-72 bg-card border border-border rounded-2xl shadow-2xl p-2.5 z-50 backdrop-blur-2xl"
                    >
                      <div className="px-3 py-2 text-[10px] font-mono text-foreground/50 uppercase tracking-widest border-b border-border/50 mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500" /> Download Targeted Resume
                      </div>
                      
                      <a
                        href="/Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-secondary transition-colors text-left"
                        onClick={() => setShowResumeDropdown(false)}
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
                        className="group flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-secondary transition-colors text-left"
                        onClick={() => setShowResumeDropdown(false)}
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

              {/* Mobile Hamburger Button */}
              <button
                className="md:hidden p-2.5 rounded-full bg-secondary border border-border hover:bg-secondary/80 transition-colors z-50 relative text-foreground"
                onClick={() => {
                  playClick()
                  setIsOpen(!isOpen)
                }}
                onMouseEnter={playHover}
                aria-label="Toggle Mobile Navigation"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-8 pointer-events-auto min-h-[100dvh]"
          >
            <div className="pt-20 flex flex-col gap-4">
              <span className="text-xs font-mono text-foreground/50 uppercase tracking-widest">Navigation</span>
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: idx * 0.05 + 0.05 } }}
                  exit={{ opacity: 0, x: -15 }}
                  onClick={() => setIsOpen(false)}
                  className="text-xl sm:text-2xl font-serif font-semibold text-foreground hover:text-blue-500 transition-colors py-1"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Mobile Resume Buttons */}
            <div className="space-y-3 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-foreground/50 uppercase tracking-widest block">Resume Downloads</span>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-4 py-3 rounded-xl bg-foreground text-background font-semibold text-xs block shadow-md"
                onClick={() => setIsOpen(false)}
              >
                📄 Download Frontend Resume (React/Next.js)
              </a>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-4 py-3 rounded-xl bg-secondary border border-border text-foreground font-semibold text-xs block"
                onClick={() => setIsOpen(false)}
              >
                ⚡ Download Full-Stack Resume (Angular/MEAN)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}