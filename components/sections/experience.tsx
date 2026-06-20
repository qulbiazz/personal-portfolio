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
  const { t, theme } = usePortfolioContext()
  const experiences = t.experience.items

  // Scroll Progress Tracker for Timeline Line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  })
  
  const scaleYLine = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          layout="position"
          className="space-y-12"
        >
          {/* Section Title */}
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold text-foreground">
            {t.experience.title} <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">&</span> Work
          </motion.h2>

          {/* Timeline Container */}
          <div ref={timelineRef} className="relative pl-8 sm:pl-12 space-y-10">
            {/* The single vertical timeline progress line */}
            <div className="absolute left-[15px] sm:left-[23px] top-6 bottom-6 w-1 bg-secondary rounded-full border border-border overflow-hidden">
              <motion.div
                className="w-full h-full bg-gradient-to-b from-amber-500 via-orange-500 to-rose-600 origin-top"
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
                  {/* Timeline dot that changes color/glow when card is expanded */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      isVisible
                        ? { scale: isExpanded ? 1.25 : 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                    }
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.1 }}
                    className={`absolute -left-12 sm:-left-16 top-2 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center z-10 transition-all duration-300 ${
                      isExpanded
                        ? 'bg-gradient-to-r from-amber-500 to-rose-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                        : 'bg-muted group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500'
                    }`}
                  >
                    <Briefcase className={`w-3.5 h-3.5 ${isExpanded ? 'text-black font-bold' : 'text-muted-foreground group-hover:text-black'}`} />
                  </motion.div>

                  {/* Card Content */}
                  <motion.div
                    onClick={() => setExpandedCard(isExpanded ? null : exp.id)}
                    whileHover={{ scale: 1.01, x: 6 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`p-6 bg-card/50 border rounded-lg cursor-pointer transition-all duration-300 relative select-none ${
                      isExpanded
                        ? 'border-orange-500/60 shadow-[0_10px_35px_rgba(245,158,11,0.06)]'
                        : 'border-border hover:border-orange-500/30'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 bg-clip-text text-transparent w-fit">
                        {exp.title}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <p className="text-foreground/80 font-medium text-base mb-2">
                      {exp.companies.join(' & ')}
                    </p>
                    
                    <p className="text-muted-foreground text-sm">
                      {exp.description}
                    </p>

                    {/* Expand Indicator Chevron */}
                    <div className="absolute bottom-4 right-4 text-muted-foreground hover:text-orange-400 transition-colors">
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </div>

                    {/* Expandable detailed bullets list */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden border-t border-border/80 pt-4"
                          onClick={(e) => e.stopPropagation()} // Prevent close on clicking inner text
                        >
                          <ul className="space-y-3 text-sm text-muted-foreground list-disc list-inside">
                            {exp.bullets.map((bullet, bIdx) => (
                              <motion.li
                                key={bIdx}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: bIdx * 0.08 }}
                                className="leading-relaxed hover:text-foreground transition-colors"
                              >
                                <span className="ml-1 text-muted-foreground hover:text-foreground transition-colors">{bullet}</span>
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
