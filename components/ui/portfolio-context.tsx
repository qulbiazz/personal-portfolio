'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '@/lib/translations'

type Language = 'en' | 'id'
type Theme = 'dark' | 'light'

type PortfolioContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  t: typeof translations.en
  mounted: boolean
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  // Always use the same initial values on both server and client to prevent hydration mismatch
  const [language, setLanguageState] = useState<Language>('en')
  const [theme, setThemeState] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // Only read localStorage AFTER component has mounted on the client
  useEffect(() => {
    const savedLang = localStorage.getItem('portfolio-language') as Language
    if (savedLang === 'en' || savedLang === 'id') {
      setLanguageState(savedLang)
    } else {
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('id')) {
        setLanguageState('id')
      }
    }

    const savedTheme = localStorage.getItem('portfolio-theme') as Theme
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setThemeState(savedTheme)
    } else {
      // Check system preference, default to light
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setThemeState(prefersDark ? 'dark' : 'light')
    }

    setMounted(true)
  }, [])

  // Sync theme to <html> class — only runs on client after mount
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
    }
  }, [theme, mounted])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('portfolio-language', lang)
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('portfolio-theme', newTheme)
  }

  // Always use 'en' translation on server (matches initial state)
  const t = translations[language] as unknown as typeof translations.en

  return (
    <PortfolioContext.Provider value={{ language, setLanguage, theme, setTheme, t, mounted }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolioContext() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error('usePortfolioContext must be used within a PortfolioProvider')
  }
  return context
}
