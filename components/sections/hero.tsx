'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { smoothScrollToId } from '@/lib/scroll-utils'
import { Magnetic } from '@/components/ui/magnetic'
import { InteractiveParticles } from '@/components/ui/interactive-particles'
import { usePortfolioContext } from '@/components/ui/portfolio-context'

export function Hero() {
  const { t, language, theme } = usePortfolioContext()
  const roles = t.hero.roles
  const [typedText, setTypedText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Mouse Parallax values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig)
  const y = useSpring(useTransform(mouseY, [-300, 300], [-15, 15]), springConfig)
  
  // Opposite parallax for background glow spotlight
  const bgX = useSpring(useTransform(mouseX, [-300, 300], [25, -25]), springConfig)
  const bgY = useSpring(useTransform(mouseY, [-300, 300], [25, -25]), springConfig)

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const centerX = rect.left + width / 2
    const centerY = rect.top + height / 2
    mouseX.set(event.clientX - centerX)
    mouseY.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Reset typewriter when language changes
  useEffect(() => {
    setTypedText('')
    setRoleIndex(0)
    setIsDeleting(false)
  }, [language])

  // Typewriter effect logic
  useEffect(() => {
    let timer: NodeJS.Timeout
    const currentRole = roles[roleIndex]
    if (!currentRole) return

    const typingSpeed = isDeleting ? 30 : 60

    const handleTyping = () => {
      if (!isDeleting) {
        setTypedText(currentRole.slice(0, typedText.length + 1))
        if (typedText === currentRole) {
          timer = setTimeout(() => setIsDeleting(true), 2000)
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
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  }

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen relative flex flex-col justify-between pt-28 pb-6 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      {/* Mesh Gradient & Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
        {/* Subtle Designer Grid Texture */}
        <div 
          className="absolute inset-0 opacity-[0.06]" 
          style={{
            backgroundImage: `
              linear-gradient(var(--grid-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Dot Matrix Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.12]" 
          style={{
            backgroundImage: 'radial-gradient(var(--grid-color) 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Organic Noise Grain Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.025] mix-blend-overlay" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <motion.div 
          style={{ x: bgX, y: bgY }}
          className={`absolute top-[20%] left-[50%] -translate-x-1/2 w-full max-w-[1000px] h-[600px] transition-all duration-300 ${
            theme === 'dark' ? 'opacity-70 mix-blend-screen' : 'opacity-30 mix-blend-multiply'
          }`}
        >
          <div className="absolute top-[10%] left-[15%] w-[350px] h-[350px] rounded-full bg-amber-500/25 blur-[100px] animate-[floating_8s_ease-in-out_infinite]" />
          <div className="absolute top-[5%] left-[35%] w-[450px] h-[450px] rounded-full bg-orange-600/35 blur-[120px] animate-[floating_12s_ease-in-out_infinite_1s]" />
          <div className="absolute top-[12%] left-[60%] w-[300px] h-[300px] rounded-full bg-rose-600/20 blur-[90px] animate-[floating_10s_ease-in-out_infinite_2s]" />
        </motion.div>

        {/* Interactive Particles Vector Network */}
        <InteractiveParticles />
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex items-center justify-center w-full max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
        >
          {/* Left Side: Name and details */}
          <div className="md:col-span-6 flex flex-col items-start text-left order-2 md:order-1">
            {/* Main Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight"
            >
              {t.hero.hello}<br />
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent block mt-2">
                {t.hero.name}
              </span>
            </motion.h1>

            {/* Typing Subtitle */}
            <motion.div variants={itemVariants} className="mb-8 h-12 flex items-center justify-start">
              <p className="text-xl sm:text-2xl text-muted-foreground min-h-[2rem]">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-start items-center w-full"
            >
              <Magnetic>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={t.hero.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white font-semibold rounded-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:brightness-110 transition-all cursor-pointer text-center block"
                >
                  {t.hero.viewWork}
                </motion.a>
              </Magnetic>
              <Magnetic>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => smoothScrollToId('contact')}
                  className="w-full sm:w-auto px-8 py-3 border-2 border-orange-500/60 text-orange-500 font-semibold rounded-lg hover:bg-gradient-to-r hover:from-amber-500/10 hover:to-rose-500/10 hover:border-orange-500 transition-all cursor-pointer text-center block dark:text-orange-400"
                >
                  {t.hero.contactMe}
                </motion.button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right Side: Portrait Image */}
          <div className="md:col-span-6 flex justify-center md:justify-end order-1 md:order-2">
            <motion.div
              variants={itemVariants}
              className="relative w-full max-w-[420px] h-[500px] sm:h-[550px] md:h-[590px] overflow-hidden group cursor-pointer"
              style={{ x, y }}
              whileHover="hover"
            >
              {/* Backlight Glow Backdrop */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-orange-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-full"
                variants={{
                  hover: { scale: 1.15, rotate: 15 }
                }}
              />
              
              {/* Photo */}
              <motion.img
                src="/profile.png"
                alt="Qulbi Khutsi Azzumi"
                className="w-full h-full object-cover origin-top translate-y-4 brightness-[1.05] contrast-[1.05]"
                initial={{ filter: 'grayscale(100%)', scale: 1.25 }}
                variants={{
                  hover: {
                    filter: 'grayscale(0%)',
                    scale: 1.32,
                  }
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-full flex justify-center pb-4 z-10"
      >
        <svg
          className="w-6 h-6 text-orange-500 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          onClick={() => smoothScrollToId('about')}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  )
}

