'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Mail, Phone, Check } from 'lucide-react'
import { Magnetic } from '@/components/ui/magnetic'
import { usePortfolioContext } from '@/components/ui/portfolio-context'

export function Footer() {
  const { ref, isVisible } = useScrollAnimation()
  const [copied, setCopied] = useState(false)
  const { t, language } = usePortfolioContext()

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText('qulbiazzumi29@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer
      id="contact"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background border-t border-border transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground transition-colors duration-300">
              {t.footer.title} <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">{t.footer.titleAccent}</span>
            </h2>
            <p className="text-muted-foreground text-lg transition-colors duration-300">
              {t.footer.desc}
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            {/* Email - Copy on Click */}
            <motion.a
              href="#"
              onClick={handleCopyEmail}
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 p-6 bg-card/50 border border-border rounded-lg hover:border-orange-500/40 transition-colors group cursor-pointer relative overflow-hidden"
            >
              <motion.div
                variants={iconVariants}
                className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500/10 to-rose-500/10 rounded-lg flex items-center justify-center group-hover:from-amber-500/25 group-hover:to-rose-500/25 transition-all duration-300"
              >
                {copied ? (
                  <Check className="w-6 h-6 text-green-500 dark:text-green-400" />
                ) : (
                  <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                )}
              </motion.div>
              <div>
                <h3 className="text-foreground font-semibold transition-colors duration-300">{t.footer.email}</h3>
                <p className="text-muted-foreground text-sm min-w-[150px] transition-colors duration-300">
                  {copied ? (
                    <span className="text-orange-650 dark:text-orange-400 font-bold animate-[fadeIn_0.3s_ease-out]">{t.footer.copied}</span>
                  ) : (
                    'qulbiazzumi29@gmail.com'
                  )}
                </p>
              </div>
              <div className="absolute top-2 right-3 text-[10px] text-muted-foreground/60 group-hover:text-muted-foreground transition-colors font-mono uppercase tracking-wider">
                {language === 'en' ? 'Click to copy' : 'Klik untuk menyalin'}
              </div>
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+6285730013648"
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 p-6 bg-card/50 border border-border rounded-lg hover:border-orange-500/40 transition-colors group cursor-pointer"
            >
              <motion.div
                variants={iconVariants}
                className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500/10 to-rose-500/10 rounded-lg flex items-center justify-center group-hover:from-amber-500/25 group-hover:to-rose-500/25 transition-all duration-300"
              >
                <Phone className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </motion.div>
              <div>
                <h3 className="text-foreground font-semibold transition-colors duration-300">{t.footer.phone}</h3>
                <p className="text-muted-foreground text-sm transition-colors duration-300">+62 857 3001 3648</p>
              </div>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-foreground font-semibold mb-6 transition-colors duration-300">
              {language === 'en' ? 'Follow Me' : 'Ikuti Saya'}
            </h3>
            <div className="flex justify-center gap-6">
              <Magnetic range={45} strength={0.4}>
                <motion.a
                  href="https://www.instagram.com/qlbiazzumi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-card border border-border text-foreground rounded-full flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </motion.a>
              </Magnetic>

              <Magnetic range={45} strength={0.4}>
                <motion.a
                  href="https://dribbble.com/qulbi-azzumi"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-card border border-border text-foreground rounded-full flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer"
                  aria-label="Dribbble"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
                  </svg>
                </motion.a>
              </Magnetic>
              
              <Magnetic range={45} strength={0.4}>
                <motion.a
                  href="https://www.linkedin.com/in/qulbikhutsiazzumi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-card border border-border text-foreground rounded-full flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </motion.a>
              </Magnetic>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.a
              href="mailto:qulbiazzumi29@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white font-semibold rounded-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:brightness-110 transition-all cursor-pointer"
            >
              {language === 'en' ? 'Start Your Project' : 'Mulai Proyek Anda'}
            </motion.a>
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent mb-8" />

          {/* Copyright */}
          <motion.p
            variants={itemVariants}
            className="text-center text-muted-foreground text-sm transition-colors duration-300"
          >
            {language === 'en'
              ? '© 2026 Qulbi Khutsi Azzumi. All rights reserved.'
              : '© 2026 Qulbi Khutsi Azzumi. Hak cipta dilindungi undang-undang.'}
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}

