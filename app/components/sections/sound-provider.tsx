// components/sound-provider.tsx
'use client'

import { soundManager } from '@/app/lib/sound-utils'
import { createContext, useContext, useEffect, useRef, ReactNode, useCallback, useState } from 'react'

type SoundContextType = {
  playHover: () => void
  playClick: () => void
  playThemeSwitch: () => void
  isMuted: boolean
  toggleMute: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: ReactNode }) {
  const initialized = useRef(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    // Initialize sound system only after user interaction
    const initSounds = async () => {
      if (!initialized.current) {
        await soundManager.init()
        initialized.current = true
      }
    }

    // Initialize on first user interaction
    const handleUserInteraction = () => {
      initSounds()
      soundManager.enable()
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
    }

    document.addEventListener('click', handleUserInteraction)
    document.addEventListener('keydown', handleUserInteraction)

    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
    }
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev
      if (next) {
        soundManager.disable()
      } else {
        soundManager.enable()
      }
      return next
    })
  }, [])

  const playHover = useCallback(() => {
    if (!isMuted) {
      soundManager.playSound('hover', 0.1)
    }
  }, [isMuted])

  const playClick = useCallback(() => {
    if (!isMuted) {
      soundManager.playSound('click', 0.2)
    }
  }, [isMuted])

  const playThemeSwitch = useCallback(() => {
    if (!isMuted) {
      soundManager.playSound('theme-switch', 0.3)
    }
  }, [isMuted])

  return (
    <SoundContext.Provider value={{ playHover, playClick, playThemeSwitch, isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  )
}

export const useSound = () => {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}