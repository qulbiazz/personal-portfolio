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
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  // Safe initial values to prevent Next.js hydration mismatches
  const [language, setLanguageState] = useState<Language>('en')
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  // Initialize state from localStorage after mount
  useEffect(() => {
    const savedLang = localStorage.getItem('portfolio-language') as Language
    if (savedLang === 'en' || savedLang === 'id') {
      setLanguageState(savedLang)
    } else {
      // Default to user browser preference or Indonesian if IP/locale suggests it
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('id')) {
        setLanguageState('id')
      }
    }

    const savedTheme = localStorage.getItem('portfolio-theme') as Theme
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setThemeState(savedTheme)
    } else {
      // Default to system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
      setThemeState(systemTheme)
    }

    setMounted(true)
  }, [])

  // Sync theme changes with DOM classes
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
      root.style.colorScheme = 'light'
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
      root.style.colorScheme = 'dark'
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

  // Reactive translation dictionary
  const t = translations[language] as unknown as typeof translations.en

  return (
    <PortfolioContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>
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
