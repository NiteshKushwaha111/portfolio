// components/sound-provider.tsx
'use client'

import { soundManager } from '@/app/lib/sound-utils'
import { createContext, useContext, useEffect, useRef, ReactNode, useCallback } from 'react'


type SoundContextType = {
  playHover: () => void
  playClick: () => void
  playThemeSwitch: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: ReactNode }) {
  const initialized = useRef(false)

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

  const playHover = useCallback(() => {
    soundManager.playSound('hover', 0.1)
  }, [])

  const playClick = useCallback(() => {
    soundManager.playSound('click', 0.2)
  }, [])

  const playThemeSwitch = useCallback(() => {
    soundManager.playSound('theme-switch', 0.3)
  }, [])

  return (
    <SoundContext.Provider value={{ playHover, playClick, playThemeSwitch }}>
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