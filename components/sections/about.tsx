'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Calendar, GraduationCap, Award, Compass, Heart } from 'lucide-react'
import { usePortfolioContext } from '@/components/ui/portfolio-context'

// Sub-component for 3D flipping card
function FlipCard({ title, icon, backContent }: { title: string; icon: React.ReactNode; backContent: string }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const { t, theme } = usePortfolioContext()

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
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full bg-card/60 border border-border rounded-lg p-4 flex flex-col items-center justify-center text-center [backface-visibility:hidden] hover:border-orange-500/30 transition-all">
          <div className="text-orange-400 mb-2">{icon}</div>
          <h4 className="text-foreground font-semibold text-base">{title}</h4>
          <span className="text-[10px] text-muted-foreground mt-2 font-mono uppercase tracking-wider">{t.about.flipHint}</span>
        </div>

        {/* Back Face */}
        <div className={`absolute inset-0 w-full h-full border rounded-lg p-4 flex items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-amber-950/40 via-orange-950/40 to-rose-950/40 border-orange-500/40 text-gray-200'
            : 'bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-rose-500/10 border-orange-500/30 text-gray-800'
        }`}>
          <p className="text-xs sm:text-sm leading-relaxed font-medium">
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
  const [expandedOrg, setExpandedOrg] = useState(false)
  const { t } = usePortfolioContext()

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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative"
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
            {t.about.title} <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">{t.about.titleAccent}</span>
          </motion.h2>

          {/* Main Description */}
          <motion.div variants={itemVariants} className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>{t.about.desc1}</p>
            <p>{t.about.desc2}</p>
          </motion.div>

          {/* Interactive Flip Cards */}
          <motion.div 
            variants={itemVariants} 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <FlipCard 
              title={t.about.cards.philosophy.title} 
              icon={<Compass className="w-8 h-8" />} 
              backContent={t.about.cards.philosophy.back}
            />
            <FlipCard 
              title={t.about.cards.collaboration.title} 
              icon={<Award className="w-8 h-8" />} 
              backContent={t.about.cards.collaboration.back}
            />
            <FlipCard 
              title={t.about.cards.interests.title} 
              icon={<Heart className="w-8 h-8" />} 
              backContent={t.about.cards.interests.back}
            />
          </motion.div>

          {/* Education Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent w-fit">
              {t.about.educationTitle}
            </h3>
            
            <motion.div layout className="space-y-4">
              {educationDetails.map((edu) => {
                const isExpanded = expandedCard === edu.id
                return (
                  <motion.div
                    key={edu.id}
                    layout="position"
                    onClick={() => setExpandedCard(isExpanded ? null : edu.id)}
                    whileHover={{ scale: 1.01, x: 4 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="p-5 bg-card/50 border border-border rounded-lg hover:border-orange-500/40 transition-colors cursor-pointer relative overflow-hidden group select-none"
                  >
                    <div className="absolute top-0 right-0 p-3 text-xs text-muted-foreground font-mono">
                      {isExpanded ? t.about.clickToClose : t.about.clickToDetails}
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-orange-500/10 rounded-lg text-orange-400 group-hover:bg-orange-500/20 transition-all duration-300">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-grow">
                        <h4 className="text-lg font-bold text-foreground leading-tight group-hover:text-orange-400 transition-colors">
                          {edu.degree}
                        </h4>
                        <p className="text-orange-400 font-medium text-sm mt-1">{edu.school}</p>
                        
                        <div className="flex flex-wrap items-center gap-1.5 text-muted-foreground text-xs mt-1">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground/80" />
                          <span>{edu.period}</span>
                          <span className="mx-1.5">•</span>
                          <span>{edu.summary}</span>
                        </div>

                        {/* Expandable details with smooth animation */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden border-t border-border/80 pt-4"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                                {edu.details.map((detail, index) => (
                                  <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                    className="leading-relaxed hover:text-foreground transition-colors"
                                  >
                                    <span className="ml-1 text-muted-foreground hover:text-foreground transition-colors">{detail}</span>
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

          {/* Organizational Experience Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent w-fit">
              {t.about.orgTitle}
            </h3>
            
            <motion.div layout className="space-y-4">
              <motion.div
                onClick={() => setExpandedOrg(!expandedOrg)}
                whileHover={{ scale: 1.01, x: 4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="p-5 bg-card/50 border border-border rounded-lg hover:border-orange-500/40 transition-colors cursor-pointer relative overflow-hidden group select-none"
              >
                <div className="absolute top-0 right-0 p-3 text-xs text-muted-foreground font-mono">
                  {expandedOrg ? t.about.clickToClose : t.about.clickToDetails}
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-orange-500/10 rounded-lg text-orange-400 group-hover:bg-orange-500/20 transition-all duration-300">
                    <Compass className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-lg font-bold text-foreground leading-tight group-hover:text-orange-400 transition-colors">
                      {t.about.orgCard.title}
                    </h4>
                    <p className="text-orange-400 font-medium text-sm mt-1">{t.about.orgCard.school}</p>
                    
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs mt-1">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground/80" />
                      <span>{t.about.orgCard.period}</span>
                    </div>

                    <AnimatePresence initial={false}>
                      {expandedOrg && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden border-t border-border/80 pt-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                            {t.about.orgCard.details.map((detail, index) => {
                              const parts = detail.split(':')
                              if (parts.length > 1) {
                                return (
                                  <li key={index} className="leading-relaxed hover:text-foreground transition-colors">
                                    <strong>{parts[0]}:</strong>
                                    <span>{parts.slice(1).join(':')}</span>
                                  </li>
                                )
                              }
                              return (
                                <li key={index} className="leading-relaxed hover:text-foreground transition-colors">
                                  {detail}
                                </li>
                              )
                            })}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
