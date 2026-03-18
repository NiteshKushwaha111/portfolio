// components/navbar.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useSound } from './sections/sound-provider'
import { ThemeToggle } from './sections/theme-toggle'

const navItems = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const { playHover, playClick } = useSound()
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Prevent scroll when mobile menu is open
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-serif font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={playHover}
            onClick={playClick}
          >
            NK
          </motion.a>

          {/* Navigation */}
          <div className="hidden md:flex items-center bg-secondary/50 backdrop-blur-md border border-border/50 rounded-full px-6 py-2 gap-8 shadow-sm">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors relative group py-1"
                onMouseEnter={playHover}
                onClick={playClick}
                whileHover={{ y: -1 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-foreground group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-full bg-secondary border border-border hover:bg-secondary/80 transition-colors z-50 relative"
              onClick={() => {
                playClick()
                setIsOpen(!isOpen)
              }}
              onMouseEnter={playHover}
            >
              <span className="sr-only">Menu</span>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center min-h-[100dvh]"
          >
            <div className="flex flex-col items-center justify-center gap-6 w-full px-6 mt-10">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    transition: { delay: index * 0.1 + 0.1 } 
                  }}
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.1 } }}
                  className="text-xl font-medium text-foreground/80 hover:text-foreground transition-colors py-2 relative group"
                  onClick={() => {
                    playClick()
                    setIsOpen(false)
                  }}
                  onMouseEnter={playHover}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-foreground group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
              
              {/* Optional: Add extra mobile CTAs here */}
              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.4 } }}
                exit={{ opacity: 0, scale: 0.9 }}
                href="/Resume.pdf"
                className="mt-6 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:scale-105 transition-transform text-sm"
                onClick={() => {
                  playClick()
                  setIsOpen(false)
                }}
              >
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}