// components/theme-toggle.tsx
'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme } from './theme-provider'
import { useSound } from './sound-provider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { playThemeSwitch, playClick } = useSound()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const handleToggle = () => {
    playClick()
    playThemeSwitch()
    toggleTheme()
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className="w-10 h-10" aria-hidden="true" />
  }

  return (
    <motion.button
      onClick={handleToggle}
      className="relative w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center overflow-hidden group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      aria-label={`Switch to mode`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-blue-400 dark:to-purple-500"
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
        }}
        transition={{ duration: 0.5 }}
      />
      <span className="relative z-10 text-sm" aria-hidden="true">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </motion.button>
  )
}