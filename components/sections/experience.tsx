'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Calendar, Briefcase, ChevronDown, Users, Award } from 'lucide-react'
import { usePortfolioContext } from '@/components/ui/portfolio-context'
import Image from 'next/image'

export function Experience() {
  const { ref, isVisible } = useScrollAnimation()
  const timelineRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<'work' | 'organization' | 'committee'>('work')
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const { t, language } = usePortfolioContext()

  const currentExperiences =
    (activeTab === 'work'
      ? t.experience?.items
      : activeTab === 'organization'
      ? t.experience?.orgItems
      : t.experience?.committeeItems) || []

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
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const timelineContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' as const },
    },
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
          className="space-y-10"
        >
          {/* Section heading */}
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="inline-block w-5 h-[1.5px] bg-primary" />
              {activeTab === 'work'
                ? t.experience.subtitleWork
                : activeTab === 'organization'
                ? t.experience.subtitleOrg
                : t.experience.subtitleCommittee}
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
              <span className="italic text-gradient">
                {activeTab === 'work'
                  ? t.experience.titleWorkAccent
                  : activeTab === 'organization'
                  ? t.experience.titleOrgAccent
                  : t.experience.titleCommitteeAccent}
              </span>
            </h2>
          </div>

          {/* Experience Tabs */}
          <div className="flex flex-wrap gap-2.5">
            {[
              {
                id: 'work' as const,
                label: t.experience.tabWork,
                icon: <Briefcase className="w-4 h-4" />,
              },
              {
                id: 'organization' as const,
                label: t.experience.tabOrg,
                icon: <Users className="w-4 h-4" />,
              },
              {
                id: 'committee' as const,
                label: t.experience.tabCommittee,
                icon: <Award className="w-4 h-4" />,
              },
            ].map((tab) => {
              const isSelected = activeTab === tab.id
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setExpandedCard(null)
                  }}
                  className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer overflow-hidden border ${
                    isSelected
                      ? 'text-white border-transparent'
                      : 'bg-card text-muted-foreground hover:text-foreground border-border hover:border-primary/30'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.icon}
                    {tab.label}
                  </span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeExperienceTab"
                      className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative pl-10 sm:pl-14">
            {/* Timeline track */}
            <div className="absolute left-[15px] sm:left-[23px] top-3 bottom-3 w-[2px] bg-border rounded-full overflow-hidden">
              <motion.div
                className="w-full h-full bg-gradient-to-b from-amber-500 via-orange-500 to-rose-500 origin-top"
                style={{ scaleY: scaleYLine }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + '-' + language}
                variants={timelineContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                {(currentExperiences || []).map((exp) => {
                  const isExpanded = expandedCard === exp.id
                  return (
                    <motion.div
                      key={exp.id}
                      variants={itemVariants}
                      className="relative group"
                    >
                      {/* Timeline dot */}
                      <motion.div
                        animate={{
                          scale: isExpanded ? 1.25 : 1,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 320,
                          damping: 22,
                        }}
                        className={`absolute -left-[38px] sm:-left-[54px] top-4 w-7 h-7 rounded-full border-2 border-background flex items-center justify-center z-10 transition-all duration-300 ${
                          isExpanded
                            ? 'bg-gradient-to-br from-amber-500 to-rose-500 shadow-[0_0_12px_rgba(245,158,11,0.45)]'
                            : 'bg-muted group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-500'
                        }`}
                      >
                        {activeTab === 'work' ? (
                          <Briefcase
                            className={`w-3.5 h-3.5 ${isExpanded ? 'text-white' : 'text-muted-foreground group-hover:text-white'}`}
                          />
                        ) : activeTab === 'organization' ? (
                          <Users
                            className={`w-3.5 h-3.5 ${isExpanded ? 'text-white' : 'text-muted-foreground group-hover:text-white'}`}
                          />
                        ) : (
                          <Award
                            className={`w-3.5 h-3.5 ${isExpanded ? 'text-white' : 'text-muted-foreground group-hover:text-white'}`}
                          />
                        )}
                      </motion.div>

                      {/* Card */}
                      <motion.div
                        onClick={() => setExpandedCard(isExpanded ? null : exp.id)}
                        className={`relative p-5 sm:p-6 bg-card rounded-2xl cursor-pointer transition-all duration-200 select-none border ${
                          isExpanded
                            ? 'border-primary/40 shadow-md'
                            : 'border-border hover:border-primary/25'
                        }`}
                      >
                        <div className="flex gap-4 sm:gap-5 items-start">
                          {'logo' in exp && (exp as any).logo && (
                            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-border/80 bg-white dark:bg-card p-1.5 flex items-center justify-center shadow-xs mt-0.5 group-hover:scale-105 transition-transform duration-300">
                              <Image
                                src={(exp as any).logo}
                                alt={exp.companies.join(' & ')}
                                width={56}
                                height={56}
                                className="w-full h-full object-contain rounded-lg"
                              />
                            </div>
                          )}

                          <div className="flex-1 min-w-0 pr-6 sm:pr-8">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-2 mb-1.5">
                              <h3
                                className="font-bold text-lg text-gradient leading-tight"
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
                                        transition={{ delay: bIdx * 0.05 }}
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
                          </div>
                        </div>

                        {/* Chevron */}
                        <div className="absolute top-5 right-5 text-muted-foreground">
                          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
