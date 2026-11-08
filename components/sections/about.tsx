'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Calendar, GraduationCap, Compass, Heart, Award } from 'lucide-react'
import { usePortfolioContext } from '@/components/ui/portfolio-context'
import Image from 'next/image'

function FlipCard({
  title,
  icon,
  backContent,
}: {
  title: string
  icon: React.ReactNode
  backContent: string
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const { t, mounted } = usePortfolioContext()

  return (
    <div
      className="w-full h-36 cursor-pointer [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center text-center [backface-visibility:hidden] hover:border-primary/30 transition-all shadow-sm">
          <div className="text-primary mb-2">{icon}</div>
          <h4 className="text-foreground font-semibold text-sm leading-tight">{title}</h4>
          <span className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wider">
            {t.about.flipHint}
          </span>
        </div>

        {/* Back */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-primary/25 rounded-2xl p-4 flex items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-xs sm:text-sm leading-relaxed text-foreground font-medium">
            {backContent}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export function About() {
  const { ref, isVisible } = useScrollAnimation()
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const { t, language } = usePortfolioContext()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  }

  const educationDetails = [
    {
      id: 1,
      degree: t.about.polinema.degree,
      school: t.about.polinema.school,
      period: t.about.polinema.period,
      summary: t.about.polinema.summary,
      details: t.about.polinema.details,
    },
    {
      id: 2,
      degree: t.about.smk.degree,
      school: t.about.smk.school,
      period: t.about.smk.period,
      summary: t.about.smk.summary,
      details: t.about.smk.details,
    },
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="space-y-14"
        >
          {/* Section heading */}
          <motion.div variants={itemVariants}>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="inline-block w-5 h-[1.5px] bg-primary" />
              {language === 'en' ? 'Who I Am' : 'Tentang Saya'}
            </p>
            <h2
              className="text-foreground leading-tight"
              style={{
                fontFamily: 'var(--font-instrument-serif)',
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 400,
              }}
            >
              {t.about.title}{' '}
              <span className="italic text-gradient">{t.about.titleAccent}</span>
            </h2>
          </motion.div>

          {/* About description + profile thumbnail */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>{t.about.desc1}</p>
              <p>{t.about.desc2}</p>
            </div>
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="relative w-40 h-48 rounded-2xl overflow-hidden border border-border shadow-md">
                <Image src="/profile.jpg" alt="Qulbi Khutsi Azzumi" fill className="object-cover object-top" />
              </div>
            </div>
          </motion.div>

          {/* Flip Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FlipCard
              title={t.about.cards.philosophy.title}
              icon={<Compass className="w-7 h-7" />}
              backContent={t.about.cards.philosophy.back}
            />
            <FlipCard
              title={t.about.cards.collaboration.title}
              icon={<Award className="w-7 h-7" />}
              backContent={t.about.cards.collaboration.back}
            />
            <FlipCard
              title={t.about.cards.interests.title}
              icon={<Heart className="w-7 h-7" />}
              backContent={t.about.cards.interests.back}
            />
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h3
              className="text-xl italic text-primary"
              style={{ fontFamily: 'var(--font-instrument-serif)' }}
            >
              {t.about.educationTitle}
            </h3>

            <motion.div layout className="space-y-3">
              {educationDetails.map((edu) => {
                const isExpanded = expandedCard === edu.id
                return (
                  <motion.div
                    key={edu.id}
                    layout="position"
                    onClick={() => setExpandedCard(isExpanded ? null : edu.id)}
                    className={`p-5 bg-card border rounded-2xl cursor-pointer transition-all duration-200 select-none ${
                      isExpanded
                        ? 'border-primary/40 shadow-sm'
                        : 'border-border hover:border-primary/25'
                    }`}
                  >
                    <div className="absolute top-0 right-0 p-3 text-[10px] text-muted-foreground uppercase tracking-wider">
                      {isExpanded ? t.about.clickToClose : t.about.clickToDetails}
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className={`p-2.5 rounded-xl transition-colors ${isExpanded ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="flex-grow">
                        <h4 className={`font-bold text-base leading-tight transition-colors ${isExpanded ? 'text-primary' : 'text-foreground'}`}>
                          {edu.degree}
                        </h4>
                        <p className="text-primary text-sm mt-0.5 font-medium">{edu.school}</p>
                        <div className="flex flex-wrap items-center gap-1.5 text-muted-foreground text-xs mt-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{edu.period}</span>
                          <span className="mx-1">•</span>
                          <span>{edu.summary}</span>
                        </div>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginTop: 14 }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden border-t border-border/60 pt-4"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                                {edu.details.map((detail, index) => (
                                  <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                    className="leading-relaxed"
                                  >
                                    {detail}
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
