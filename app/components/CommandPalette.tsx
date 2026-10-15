// components/CommandPalette.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Command, FileText, Mail, Moon, Sun, Volume2, VolumeX, Layout, Shield, Award, Terminal, X, ArrowRight, UserCheck } from 'lucide-react'
import { useSound } from './sections/sound-provider'
import { useTheme } from 'next-themes'

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  icon: any
  action: () => void
  category: 'Navigation' | 'Actions' | 'Preferences'
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const { playHover, playClick, isMuted, toggleMute } = useSound()
  const { theme, setTheme } = useTheme()

  // Toggle on Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Listen for custom trigger event
  useEffect(() => {
    const handleOpenCommandPalette = () => setIsOpen(true)
    window.addEventListener('openCommandPalette', handleOpenCommandPalette)
    return () => window.removeEventListener('openCommandPalette', handleOpenCommandPalette)
  }, [])

  const items: CommandItem[] = [
    {
      id: 'nav-projects',
      title: 'Featured Projects',
      subtitle: 'Explore full-stack, enterprise & independent projects',
      icon: Shield,
      category: 'Navigation',
      action: () => {
        window.location.href = '#projects'
        setIsOpen(false)
      }
    },
    {
      id: 'nav-skills',
      title: 'Technical Skills & Arsenal',
      subtitle: 'Frontend, Backend, Database & Delivery tools',
      icon: Terminal,
      category: 'Navigation',
      action: () => {
        window.location.href = '#skills'
        setIsOpen(false)
      }
    },
    {
      id: 'nav-experience',
      title: 'Professional Experience',
      subtitle: 'Soluzione IT Services (June 2023 – July 2026)',
      icon: Award,
      category: 'Navigation',
      action: () => {
        window.location.href = '#experience'
        setIsOpen(false)
      }
    },
    {
      id: 'nav-playground',
      title: 'Interactive Playground',
      subtitle: 'Test RBAC simulation & SSR performance comparison',
      icon: Layout,
      category: 'Navigation',
      action: () => {
        window.location.href = '#playground'
        setIsOpen(false)
      }
    },
    {
      id: 'nav-about',
      title: 'About Me & Education',
      subtitle: 'Background summary & B.Tech credentials',
      icon: UserCheck,
      category: 'Navigation',
      action: () => {
        window.location.href = '#about'
        setIsOpen(false)
      }
    },
    {
      id: 'nav-contact',
      title: 'Contact Me',
      subtitle: 'Send a message or connect via email/LinkedIn',
      icon: Mail,
      category: 'Navigation',
      action: () => {
        window.location.href = '#contact'
        setIsOpen(false)
      }
    },
    {
      id: 'action-resume',
      title: 'Download Resume',
      subtitle: 'Official PDF (Nitesh Kushwaha.pdf)',
      icon: FileText,
      category: 'Actions',
      action: () => {
        const a = document.createElement('a')
        a.href = '/Resume.pdf'
        a.download = 'Nitesh Kushwaha.pdf'
        a.target = '_blank'
        a.click()
        setIsOpen(false)
      }
    },
    {
      id: 'action-email',
      title: copiedEmail ? 'Copied niteshkushwaha603@gmail.com!' : 'Copy Email Address',
      subtitle: 'niteshkushwaha603@gmail.com',
      icon: Mail,
      category: 'Actions',
      action: () => {
        navigator.clipboard.writeText('niteshkushwaha603@gmail.com')
        setCopiedEmail(true)
        setTimeout(() => {
          setCopiedEmail(false)
          setIsOpen(false)
        }, 1200)
      }
    },
    {
      id: 'pref-theme',
      title: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      subtitle: 'Toggle color scheme mode',
      icon: theme === 'dark' ? Sun : Moon,
      category: 'Preferences',
      action: () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        setIsOpen(false)
      }
    },
    {
      id: 'pref-sound',
      title: isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects',
      subtitle: 'Toggle UI audio feedback',
      icon: isMuted ? VolumeX : Volume2,
      category: 'Preferences',
      action: () => {
        toggleMute()
        setIsOpen(false)
      }
    },
  ]

  const filteredItems = items.filter((item) => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    )
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-start justify-center pt-20 sm:pt-28 px-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl bg-card border border-border/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="p-4 border-b border-border/60 flex items-center gap-3">
              <Search className="w-5 h-5 text-blue-500 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search (e.g. Projects, Skills, Resume, Dark Theme)..."
                className="w-full bg-transparent text-sm sm:text-base outline-none text-foreground placeholder:text-foreground/40 font-medium"
                autoFocus
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-foreground/40 hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Close command palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        playClick()
                        item.action()
                      }}
                      onMouseEnter={playHover}
                      className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-secondary/70 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-background border border-border/80 text-foreground/70 group-hover:text-blue-500 group-hover:border-blue-500/30 transition-all">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className="text-[11px] text-foreground/50 font-sans">{item.subtitle}</div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-foreground/40 px-2 py-0.5 rounded bg-secondary border border-border">
                          {item.category}
                        </span>
                        <ArrowRight className="w-4 h-4 text-foreground/30 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  )
                })
              ) : (
                <div className="py-10 text-center text-xs font-mono text-foreground/50">
                  No commands found matching "{query}".
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-secondary/30 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-foreground/50">
              <span className="flex items-center gap-1.5">
                <Command className="w-3.5 h-3.5 text-blue-500" /> Command Palette
              </span>
              <span>Use ↑ ↓ to navigate, Enter to select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
