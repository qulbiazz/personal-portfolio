'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Mail, Phone, Check, Heart } from 'lucide-react'
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
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/qlbiazzumi/',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      label: 'Dribbble',
      href: 'https://dribbble.com/qulbi-azzumi',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/qulbikhutsiazzumi/',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ]

  return (
    <footer
      id="contact"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-background border-t border-border"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {/* Big CTA heading */}
          <motion.div variants={itemVariants} className="mb-14">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="inline-block w-5 h-[1.5px] bg-primary" />
              {language === 'en' ? "Let's Connect" : 'Hubungi Saya'}
            </p>
            <h2
              className="text-foreground leading-tight mb-4"
              style={{
                fontFamily: 'var(--font-instrument-serif)',
                fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                fontWeight: 400,
              }}
            >
              {t.footer.title}{' '}
              <span className="italic text-gradient">{t.footer.titleAccent}</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-lg">{t.footer.desc}</p>
          </motion.div>

          {/* Contact cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
          >
            {/* Email */}
            <motion.a
              href="#"
              onClick={handleCopyEmail}
              whileHover={{ y: -3 }}
              className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-sm transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="flex-shrink-0 w-11 h-11 bg-muted rounded-xl flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary text-muted-foreground transition-all">
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Mail className="w-5 h-5" />}
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="text-foreground font-semibold text-sm">{t.footer.email}</h3>
                <p className="text-muted-foreground text-sm truncate">
                  {copied ? (
                    <span className="text-primary font-semibold">{t.footer.copied}</span>
                  ) : (
                    'qulbiazzumi29@gmail.com'
                  )}
                </p>
              </div>
              <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider shrink-0">
                {language === 'en' ? 'Click to copy' : 'Klik salin'}
              </span>
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+6285730013648"
              whileHover={{ y: -3 }}
              className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-sm transition-all group cursor-pointer"
            >
              <div className="flex-shrink-0 w-11 h-11 bg-muted rounded-xl flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary text-muted-foreground transition-all">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-sm">{t.footer.phone}</h3>
                <p className="text-muted-foreground text-sm">+62 857 3001 3648</p>
              </div>
            </motion.a>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-12">
            <span className="text-sm text-muted-foreground mr-1">
              {language === 'en' ? 'Follow me on' : 'Ikuti saya di'}
            </span>
            {socialLinks.map((social) => (
              <Magnetic key={social.label} range={40} strength={0.35}>
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-card border border-border text-muted-foreground rounded-full flex items-center justify-center hover:border-primary/40 hover:text-primary transition-all cursor-pointer"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              </Magnetic>
            ))}
          </motion.div>

          {/* Main CTA */}
          <motion.div variants={itemVariants} className="mb-14">
            <motion.a
              href="mailto:qulbiazzumi29@gmail.com"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-foreground text-background font-semibold rounded-xl shadow-sm hover:opacity-85 transition-all cursor-pointer text-sm"
            >
              <Mail className="w-4 h-4" />
              {language === 'en' ? 'Start Your Project' : 'Mulai Proyek Anda'}
            </motion.a>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"
          />

          {/* Footer bottom */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground"
          >
            <p>
              {language === 'en'
                ? '© 2026 Qulbi Khutsi Azzumi. All rights reserved.'
                : '© 2026 Qulbi Khutsi Azzumi. Hak cipta dilindungi.'}
            </p>
            <p className="flex items-center gap-1.5">
              {language === 'en' ? 'Built with' : 'Dibangun dengan'}
              <Heart className="w-3.5 h-3.5 text-primary fill-primary inline-block" />
              {language === 'en' ? 'using Next.js' : 'menggunakan Next.js'}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
