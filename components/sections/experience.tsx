'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Calendar, Briefcase, ChevronDown } from 'lucide-react'
import { usePortfolioContext } from '@/components/ui/portfolio-context'

export function Experience() {
  const { ref, isVisible } = useScrollAnimation()
  const timelineRef = useRef<HTMLDivElement>(null)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const { t, language } = usePortfolioContext()
  const experiences = t.experience.items

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  })

  const scaleYLine = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
  }

  return (
    <section
      id="experience"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          layout="position"
          className="space-y-14"
        >
          {/* Section heading */}
          <motion.div variants={itemVariants}>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="inline-block w-5 h-[1.5px] bg-primary" />
              {language === 'en' ? 'Work History' : 'Riwayat Kerja'}
            </p>
            <h2
              className="text-foreground leading-tight"
              style={{
                fontFamily: 'var(--font-instrument-serif)',
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 400,
              }}
            >
              {t.experience.title}{' '}
              <span className="italic text-gradient">&amp; Work</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative pl-10 sm:pl-14 space-y-6">
            {/* Timeline track */}
            <div className="absolute left-[15px] sm:left-[23px] top-3 bottom-3 w-[2px] bg-border rounded-full overflow-hidden">
              <motion.div
                className="w-full h-full bg-gradient-to-b from-amber-500 via-orange-500 to-rose-500 origin-top"
                style={{ scaleY: scaleYLine }}
              />
            </div>

            {experiences.map((exp, index) => {
              const isExpanded = expandedCard === exp.id
              return (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className="relative group"
                  layout="position"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      isVisible
                        ? {
                            scale: isExpanded ? 1.3 : 1,
                            opacity: 1,
                          }
                        : { scale: 0, opacity: 0 }
                    }
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      delay: index * 0.1,
                    }}
                    className={`absolute -left-[38px] sm:-left-[54px] top-4 w-7 h-7 rounded-full border-2 border-background flex items-center justify-center z-10 transition-all duration-300 ${
                      isExpanded
                        ? 'bg-gradient-to-br from-amber-500 to-rose-500 shadow-[0_0_12px_rgba(245,158,11,0.45)]'
                        : 'bg-muted group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-500'
                    }`}
                  >
                    <Briefcase
                      className={`w-3 h-3 ${isExpanded ? 'text-white' : 'text-muted-foreground group-hover:text-white'}`}
                    />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    onClick={() => setExpandedCard(isExpanded ? null : exp.id)}
                    className={`p-5 sm:p-6 bg-card rounded-2xl cursor-pointer transition-all duration-200 select-none border ${
                      isExpanded
                        ? 'border-primary/40 shadow-md'
                        : 'border-border hover:border-primary/25'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3
                        className="font-bold text-lg text-gradient"
                        style={{ fontFamily: 'var(--font-instrument-serif)' }}
                      >
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <p className="text-foreground font-semibold text-sm mb-1">
                      {exp.companies.join(' & ')}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>

                    {/* Chevron */}
                    <div className="absolute bottom-4 right-4 text-muted-foreground">
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* Expandable bullets */}
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
                          <ul className="space-y-2.5 text-sm text-muted-foreground">
                            {exp.bullets.map((bullet, bIdx) => (
                              <motion.li
                                key={bIdx}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: bIdx * 0.07 }}
                                className="flex gap-2 items-start leading-relaxed"
                              >
                                <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary/60" />
                                {bullet}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
