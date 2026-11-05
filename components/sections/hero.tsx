'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { smoothScrollToId } from '@/lib/scroll-utils'
import { usePortfolioContext } from '@/components/ui/portfolio-context'
import Image from 'next/image'

export function Hero() {
  const { t, language, theme, mounted } = usePortfolioContext()
  const roles = t.hero.roles
  const [typedText, setTypedText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Reset typewriter when language changes
  useEffect(() => {
    setTypedText('')
    setRoleIndex(0)
    setIsDeleting(false)
  }, [language])

  // Typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout
    const currentRole = roles[roleIndex]
    if (!currentRole) return

    const typingSpeed = isDeleting ? 30 : 65

    const handleTyping = () => {
      if (!isDeleting) {
        setTypedText(currentRole.slice(0, typedText.length + 1))
        if (typedText === currentRole) {
          timer = setTimeout(() => setIsDeleting(true), 2200)
        } else {
          timer = setTimeout(handleTyping, typingSpeed)
        }
      } else {
        setTypedText(currentRole.slice(0, typedText.length - 1))
        if (typedText === '') {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
        } else {
          timer = setTimeout(handleTyping, typingSpeed)
        }
      }
    }

    timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [typedText, isDeleting, roleIndex, roles])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  return (
    <section
      id="hero"
      className="min-h-screen relative flex flex-col justify-between pt-24 pb-8 px-4 sm:px-6 bg-background overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Warm glow blob */}
        <div
          className={`absolute top-[15%] right-[5%] w-[500px] h-[500px] rounded-full blur-[140px] transition-opacity duration-700 ${
            mounted && theme === 'dark' ? 'opacity-20 bg-orange-500' : 'opacity-10 bg-orange-400'
          }`}
        />
        <div
          className={`absolute bottom-[10%] left-[0%] w-[400px] h-[400px] rounded-full blur-[120px] transition-opacity duration-700 ${
            mounted && theme === 'dark' ? 'opacity-15 bg-amber-500' : 'opacity-8 bg-amber-300'
          }`}
        />

        {/* Subtle dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: 'radial-gradient(var(--grid-color) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center w-full max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center"
        >
          {/* Left — Text content */}
          <div className="md:col-span-7 flex flex-col text-left order-2 md:order-1">
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-primary rounded-full" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                {t.hero.hello}
              </span>
            </motion.div>

            {/* Name - Serif Display */}
            <motion.h1
              variants={itemVariants}
              className="leading-[1.05] tracking-tight mb-4"
              style={{
                fontFamily: 'var(--font-instrument-serif)',
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                fontWeight: 400,
              }}
            >
              <span className="text-foreground">Qulbi</span>
              <br />
              <span className="text-gradient italic">{language === 'en' ? 'Khutsi Azzumi.' : 'Khutsi Azzumi.'}</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div variants={itemVariants} className="mb-6 h-10 flex items-center">
              <p className="text-lg sm:text-xl text-muted-foreground font-medium">
                {typedText}
                <span
                  className="inline-block w-[2px] h-5 bg-primary ml-0.5 align-middle"
                  style={{ animation: 'blink 1s ease-in-out infinite' }}
                />
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 sm:gap-8 mb-8 py-4 border-y border-border"
            >
              {[
                { value: '2+', label: language === 'en' ? 'Years Exp.' : 'Tahun Pengalaman' },
                { value: '20+', label: language === 'en' ? 'Projects' : 'Proyek' },
                { value: '10+', label: language === 'en' ? 'Clients' : 'Klien' },
              ].map((stat) => (
                <div key={stat.value} className="text-left">
                  <p
                    className="text-2xl sm:text-3xl font-bold text-primary italic leading-none"
                    style={{ fontFamily: 'var(--font-instrument-serif)' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 items-start"
            >
              <a
                href={t.hero.cvLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-foreground text-background font-semibold rounded-xl hover:opacity-85 hover:-translate-y-0.5 transition-all cursor-pointer text-sm shadow-md"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t.hero.viewWork}
              </a>
              <a
                href={t.hero.portfolioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-border rounded-xl text-foreground font-semibold hover:border-primary/50 hover:text-primary hover:-translate-y-0.5 transition-all cursor-pointer text-sm"
              >
                {t.hero.portfolio}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>

            {/* Social links row */}
            <motion.div variants={itemVariants} className="flex items-center gap-5 mt-8 text-sm text-muted-foreground">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/qlbiazzumi/' },
                { label: 'Dribbble', href: 'https://dribbble.com/qulbi-azzumi' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/qulbikhutsiazzumi/' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary hover:-translate-y-0.5 transition-all"
                >
                  {social.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Portrait */}
          <div className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2">
            <motion.div
              variants={itemVariants}
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Decorative frame */}
              <div
                className={`absolute -inset-3 rounded-[2rem] border-2 transition-colors ${
                  mounted && theme === 'dark' ? 'border-white/5' : 'border-black/5'
                }`}
              />

              {/* Orange accent corner */}
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl opacity-80 blur-sm" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl opacity-60 blur-sm" />

              {/* Image */}
              <div className="relative w-[260px] sm:w-[300px] md:w-[340px] h-[320px] sm:h-[380px] md:h-[430px] rounded-[1.75rem] overflow-hidden shadow-2xl">
                <Image
                  src="/profile.png"
                  alt="Qulbi Khutsi Azzumi"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-xl px-3 py-2 border border-border shadow-lg"
                >
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Currently</p>
                  <p className="text-sm font-bold text-foreground">
                    UI/UX & Graphic Designer
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-full flex justify-center pb-2 z-10"
      >
        <button
          onClick={() => smoothScrollToId('about')}
          className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
        >
          <span className="text-xs font-medium tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
            {language === 'en' ? 'Discover' : 'Temukan'}
          </span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </motion.div>
    </section>
  )
}
