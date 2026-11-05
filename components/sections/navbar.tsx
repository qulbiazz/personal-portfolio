'use client'

import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'
import { smoothScrollToId } from '@/lib/scroll-utils'
import { usePortfolioContext } from '@/components/ui/portfolio-context'
import { Sun, Moon, Menu, X } from 'lucide-react'
import Image from 'next/image'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const { language, setLanguage, theme, setTheme, t } = usePortfolioContext()

  const navItems = [
    { label: t.nav.about, href: 'about' },
    { label: t.nav.experience, href: 'experience' },
    { label: t.nav.skills, href: 'skills' },
    { label: t.nav.portfolio, href: 'portfolio' },
    { label: t.nav.contact, href: 'contact' },
  ]

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50
      if (isAtBottom) {
        setActiveSection('contact')
      } else if (window.scrollY < 100) {
        setActiveSection('hero')
      }
    }
    window.addEventListener('scroll', handleScroll)

    const sections = ['about', 'experience', 'skills', 'portfolio', 'contact']
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { rootMargin: '-20% 0px -50% 0px' }
      )

      observer.observe(el)
      return { observer, el }
    })

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el)
      })
    }
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-background/80 border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={() => smoothScrollToId('hero')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <Image
              src="/navbar-logo.png"
              alt="Logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain rounded-lg"
            />
            <span
              className="hidden sm:block font-bold text-base text-foreground group-hover:text-primary transition-colors"
              style={{ fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic' }}
            >
              Qulbi.
            </span>
          </motion.button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => smoothScrollToId(item.href)}
                className={`relative px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  activeSection === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {activeSection === item.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* Language Toggle */}
            <div className="relative flex items-center bg-muted border border-border p-1 rounded-full text-[11px] font-semibold select-none h-8 shrink-0">
              <button
                type="button"
                onClick={() => setLanguage('id')}
                className={`relative w-9 h-6 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                  language === 'id' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label="Switch to Indonesian"
              >
                {language === 'id' && (
                  <motion.div
                    layoutId="active-language"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">ID</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`relative w-9 h-6 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                  language === 'en' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label="Switch to English"
              >
                {language === 'en' && (
                  <motion.div
                    layoutId="active-language"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">EN</span>
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all cursor-pointer shrink-0"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Hire Me CTA */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => smoothScrollToId('contact')}
              className="px-4 lg:px-5 py-2 bg-foreground text-background font-semibold rounded-full hover:opacity-80 hover:-translate-y-0.5 transition-all cursor-pointer text-xs lg:text-sm shadow-sm shrink-0"
            >
              {t.nav.hireMe}
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-muted border border-border text-muted-foreground cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
              className="h-8 px-2.5 flex items-center justify-center rounded-full bg-muted border border-border text-[11px] font-semibold text-foreground cursor-pointer"
            >
              {language === 'en' ? 'EN' : 'ID'}
            </button>
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground p-1 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    smoothScrollToId(item.href)
                    setMobileMenuOpen(false)
                  }}
                  className={`text-left px-4 py-3 rounded-xl font-medium transition-colors cursor-pointer ${
                    activeSection === item.href
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  smoothScrollToId('contact')
                  setMobileMenuOpen(false)
                }}
                className="mt-3 w-full py-3 bg-foreground text-background font-semibold rounded-xl text-center cursor-pointer"
              >
                {t.nav.hireMe}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 origin-left"
        style={{ scaleX }}
      />
    </motion.nav>
  )
}
