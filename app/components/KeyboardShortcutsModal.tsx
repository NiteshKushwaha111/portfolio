// app/components/KeyboardShortcutsModal.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Command, Moon, Sun, Volume2, VolumeX, FileText, X, Keyboard, ArrowDown, Sparkles } from 'lucide-react'
import { useSound } from './sections/sound-provider'
import { useTheme } from 'next-themes'

interface ShortcutItem {
  keyLabel: string
  actionName: string
  description: string
  category: 'Navigation' | 'Controls' | 'General'
}

const shortcuts: ShortcutItem[] = [
  { keyLabel: '⌘K / Ctrl+K', actionName: 'Command Palette', description: 'Search everything, jump to sections, quick actions', category: 'General' },
  { keyLabel: '?', actionName: 'Shortcuts HUD', description: 'Toggle this keyboard shortcuts cheatsheet modal', category: 'General' },
  { keyLabel: 'T', actionName: 'Toggle Theme', description: 'Switch between Dark and Light mode', category: 'Controls' },
  { keyLabel: 'M', actionName: 'Toggle Audio', description: 'Mute or unmute UI sound effects', category: 'Controls' },
  { keyLabel: 'R', actionName: 'Download Resume', description: 'Get official PDF resume (Nitesh Kushwaha.pdf)', category: 'Controls' },
  { keyLabel: 'P', actionName: 'Go to Projects', description: 'Jump to Selected Projects showcase', category: 'Navigation' },
  { keyLabel: 'S', actionName: 'Go to Skills', description: 'Jump to Technical Competencies & Tooling', category: 'Navigation' },
  { keyLabel: 'E', actionName: 'Go to Experience', description: 'Jump to Career Record & Soluzione IT Services', category: 'Navigation' },
  { keyLabel: 'C', actionName: 'Go to Contact', description: 'Jump to direct messaging and contact info', category: 'Navigation' },
  { keyLabel: 'Esc', actionName: 'Dismiss Modal', description: 'Close any active overlay, modal, or drawer', category: 'General' },
]

export default function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { playHover, playClick, toggleMute } = useSound()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement
      const isInput = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        (activeEl as HTMLElement).isContentEditable
      )

      // Always handle ESC to close
      if (e.key === 'Escape') {
        if (isOpen) {
          e.preventDefault()
          setIsOpen(false)
        }
        return
      }

      // If user is currently typing in an input or textarea, don't trigger single-key hotkeys
      if (isInput) return

      // Handle '?' (Shift + /)
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
        return
      }

      // Navigation shortcuts
      const key = e.key.toLowerCase()
      if (key === 't' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setTheme(theme === 'dark' ? 'light' : 'dark')
        playClick()
      } else if (key === 'm' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        toggleMute()
        playClick()
      } else if (key === 'r' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        playClick()
        const a = document.createElement('a')
        a.href = '/Resume.pdf'
        a.download = 'Nitesh Kushwaha.pdf'
        a.target = '_blank'
        a.click()
      } else if (key === 'p' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        playClick()
        window.location.href = '#projects'
      } else if (key === 's' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        playClick()
        window.location.href = '#skills'
      } else if (key === 'e' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        playClick()
        window.location.href = '#experience'
      } else if (key === 'c' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        playClick()
        window.location.href = '#contact'
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, theme, setTheme, toggleMute, playClick])

  // Prevent background scroll when modal is open
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

  return (
    <>
      {/* Floating Bottom-Right Hotkey Indicator Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-5 right-5 z-40 hidden sm:flex items-center gap-1.5"
      >
        <button
          onClick={() => {
            playClick()
            setIsOpen(true)
          }}
          onMouseEnter={playHover}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-xl border border-border/80 shadow-lg hover:border-blue-500/50 hover:bg-card transition-all text-xs font-mono text-foreground/70 hover:text-foreground"
          title="Press '?' for keyboard shortcuts"
        >
          <Keyboard className="w-3.5 h-3.5 text-blue-500 group-hover:scale-110 transition-transform" />
          <span className="text-[11px] font-sans font-medium">Shortcuts</span>
          <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-[10px] font-mono text-foreground/80 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
            ?
          </kbd>
        </button>
      </motion.div>

      {/* Cheatsheet Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border/90 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500">
                    <Keyboard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-foreground">Keyboard Shortcuts</h3>
                    <p className="text-xs text-foreground/60 font-sans mt-0.5">
                      Fast keyboard navigation engineered for developer power users.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground/60 hover:text-foreground transition-colors"
                  aria-label="Close shortcuts modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Shortcuts List */}
              <div className="max-h-[60vh] overflow-y-auto space-y-2.5 pr-1">
                {shortcuts.map((sc) => (
                  <div
                    key={sc.keyLabel}
                    className="flex items-center justify-between p-3 rounded-2xl bg-secondary/30 border border-border/50 hover:bg-secondary/60 hover:border-border transition-all"
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                        <span>{sc.actionName}</span>
                        <span className="text-[10px] font-mono text-foreground/40 px-1.5 py-0.2 rounded bg-background border border-border/60">
                          {sc.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-foreground/60 mt-0.5 font-sans">
                        {sc.description}
                      </div>
                    </div>

                    <kbd className="px-2.5 py-1 rounded-xl bg-background border border-border shadow-sm text-xs font-mono font-bold text-blue-500 dark:text-blue-400 shrink-0">
                      {sc.keyLabel}
                    </kbd>
                  </div>
                ))}
              </div>

              {/* Footer Tip */}
              <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-foreground/50">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Single keys work anywhere outside inputs
                </span>
                <span className="px-2 py-0.5 rounded bg-secondary border border-border text-[10px]">
                  Press Esc to exit
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
