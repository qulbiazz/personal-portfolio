'use client'

import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'
import { smoothScrollToId } from '@/lib/scroll-utils'
import { usePortfolioContext } from '@/components/ui/portfolio-context'
import { Sun, Moon, Menu, X } from 'lucide-react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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
      
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50
      if (isAtBottom) {
        setActiveSection('contact')
      } else if (window.scrollY < 100) {
        setActiveSection('hero')
      }
    }
    window.addEventListener('scroll', handleScroll)

    const sections = ['about', 'experience', 'skills', 'portfolio', 'contact']
    const observers = sections.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        {
          rootMargin: '-20% 0px -50% 0px'
        }
      )
      
      observer.observe(el)
      return { observer, el }
    })

    // Initial trigger
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observers.forEach(obs => {
        if (obs) obs.observer.unobserve(obs.el)
      })
    }
  }, [])


  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'dark'
            ? 'backdrop-blur-md bg-black/60 border-b border-orange-600/20'
            : 'backdrop-blur-md bg-white/70 border-b border-orange-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={() => smoothScrollToId('hero')}
            className="h-10 w-10 flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
          >
            <img
              src="/navbar-logo.png"
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </motion.button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <div
                key={item.href}
                className="relative px-3 py-1.5 cursor-pointer rounded-lg"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => smoothScrollToId(item.href)}
                  className={`transition-colors text-sm font-semibold cursor-pointer relative z-10 ${
                    activeSection === item.href
                      ? 'text-orange-500 dark:text-orange-400 font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </motion.button>
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-rose-500/10 rounded-lg -z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Desktop Toggles & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selection Pill */}
            <div className="flex bg-secondary/80 border border-border p-1 rounded-full relative items-center text-[10px] font-bold select-none h-8 w-24">
              <button
                onClick={() => setLanguage('id')}
                className={`flex-1 text-center py-1 z-10 transition-colors cursor-pointer rounded-full ${
                  language === 'id'
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 text-center py-1 z-10 transition-colors cursor-pointer rounded-full ${
                  language === 'en'
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
              <motion.div
                className="absolute top-1 bottom-1 w-[46%] bg-gradient-to-r from-amber-500 to-orange-500 rounded-full -z-0"
                animate={{ x: language === 'id' ? '4%' : '108%' }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            </div>

            {/* Theme Toggle Pill */}
            <div className="flex bg-secondary/80 border border-border p-1 rounded-full relative items-center select-none h-8 w-20">
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 flex justify-center items-center z-10 transition-colors cursor-pointer rounded-full ${
                  theme === 'light'
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 flex justify-center items-center z-10 transition-colors cursor-pointer rounded-full ${
                  theme === 'dark'
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <motion.div
                className="absolute top-1 bottom-1 w-[46%] bg-gradient-to-r from-amber-500 to-orange-500 rounded-full -z-0"
                animate={{ x: theme === 'light' ? '4%' : '108%' }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            </div>

            {/* Hire Me CTA */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => smoothScrollToId('contact')}
              className="px-5 py-2 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-semibold rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:brightness-110 transition-all cursor-pointer text-sm"
            >
              {t.nav.hireMe}
            </motion.button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mini Toggles for Mobile */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 bg-secondary/80 border border-border rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
              className="px-2 py-1 bg-secondary/80 border border-border rounded-full text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'EN' : 'ID'}
            </button>

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-orange-500 hover:text-rose-500 transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden border-t overflow-hidden ${
              theme === 'dark'
                ? 'bg-black/95 border-orange-600/20'
                : 'bg-white/95 border-gray-200'
            }`}
          >
            <div className="px-4 pt-4 pb-6 flex flex-col items-center gap-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    smoothScrollToId(item.href)
                    setMobileMenuOpen(false)
                  }}
                  className={`text-base font-bold py-1.5 transition-colors cursor-pointer ${
                    activeSection === item.href
                      ? 'text-orange-500 dark:text-orange-400'
                      : 'text-muted-foreground hover:text-foreground'
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
                className="w-full max-w-[200px] mt-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-semibold rounded-full shadow-lg text-center cursor-pointer"
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
