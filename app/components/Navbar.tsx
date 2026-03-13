// components/navbar.tsx
'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
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
            
            {/* Mobile menu button - we can enhance this later */}
            <button className="md:hidden p-2 rounded-full bg-secondary border border-border">
              <span className="sr-only">Menu</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}