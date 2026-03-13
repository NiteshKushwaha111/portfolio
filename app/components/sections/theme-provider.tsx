// components/sections/theme-provider.tsx
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes'

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}

// We expose our own hook so existing code doesn't break
export const useTheme = () => {
  const { theme, setTheme, systemTheme } = useNextTheme()
  
  const currentTheme = theme === 'system' ? systemTheme : theme

  return {
    theme: currentTheme || 'dark',
    toggleTheme: () => setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }
}