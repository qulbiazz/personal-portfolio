'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { usePortfolioContext } from '@/components/ui/portfolio-context'

export function Skills() {
  const { ref, isVisible } = useScrollAnimation()
  const { t, language } = usePortfolioContext()

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Section Title */}
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold text-center text-foreground transition-colors duration-300">
            {language === 'en' ? (
              <>
                My <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">{t.skills.title}</span>
              </>
            ) : (
              <>
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">{t.skills.title}</span> Saya
              </>
            )}
          </motion.h2>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {t.skills.skillsData.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover="hover"
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.4}
                dragTransition={{ bounceStiffness: 250, bounceDamping: 18 }}
                className={`draggable-skill p-6 bg-card/50 border border-border rounded-lg text-center hover:border-orange-500/40 hover:shadow-[0_15px_30px_rgba(245,158,11,0.12)] transition-all cursor-grab active:cursor-grabbing relative overflow-hidden ${
                  index === 4 ? 'md:col-start-2' : ''
                }`}
              >
                {/* Glow backdrop on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  variants={{
                    hover: { opacity: 1 }
                  }}
                />

                {/* Inner floating container */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  variants={{
                    hover: { 
                      y: 0,
                      transition: { type: 'spring', stiffness: 200, damping: 20 }
                    }
                  }}
                  transition={{
                    y: {
                      duration: 3 + index * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut' as const,
                      delay: index * 0.15,
                    }
                  }}
                  className="relative z-10 select-none pointer-events-none flex flex-col items-center w-full"
                >
                  <div className="text-5xl mb-4">{skill.emoji}</div>
                  <h3 className="text-lg font-semibold text-foreground transition-colors duration-300">
                    {skill.name}
                  </h3>

                  {/* Skill level details revealed on hover */}
                  <motion.div
                    className="mt-4 pt-4 border-t border-border/80 overflow-hidden text-left w-full"
                    initial={{ opacity: 0, height: 0 }}
                    variants={{
                      hover: { opacity: 1, height: 'auto' }
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
                      <span className="text-muted-foreground transition-colors duration-300">{t.skills.proficiency}</span>
                      <span className="text-orange-400 font-bold">{skill.level}%</span>
                    </div>
                    {/* Progress Bar Track */}
                    <div className="h-1.5 bg-background rounded-full overflow-hidden border border-border/85 transition-colors duration-300">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-full origin-left"
                        initial={{ scaleX: 0 }}
                        variants={{
                          hover: { scaleX: skill.level / 100 }
                        }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2.5 leading-relaxed font-sans transition-colors duration-300">
                      {skill.desc}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Additional Information */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01, boxShadow: '0 10px 30px rgba(245, 158, 11, 0.05)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="mt-12 p-6 bg-card/50 border border-border hover:border-orange-500/20 rounded-lg cursor-pointer transition-all text-left"
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent w-fit mb-4">
              {t.skills.additionalTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h4 className="text-xs font-bold text-muted-foreground/80 uppercase tracking-widest mb-2 transition-colors duration-300">{t.skills.hardSkills}</h4>
                <p className="text-sm text-foreground/80 transition-colors duration-300">
                  {t.skills.skillsData.map((s) => s.name).join(', ')}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-muted-foreground/80 uppercase tracking-widest mb-2 transition-colors duration-300">{t.skills.languages}</h4>
                <p className="text-sm text-foreground/80 transition-colors duration-300">{t.skills.languagesList}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-muted-foreground/80 uppercase tracking-widest mb-2 transition-colors duration-300">{t.skills.awardsTitle}</h4>
                <ul className="text-sm text-foreground/80 list-disc list-inside space-y-1 transition-colors duration-300">
                  {t.skills.awards.map((award, i) => (
                    <li key={i}>{award}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold text-muted-foreground/80 uppercase tracking-widest mb-2 transition-colors duration-300">{t.skills.projectsTitle}</h4>
                <ul className="text-sm text-foreground/80 list-disc list-inside space-y-1 transition-colors duration-300">
                  {t.skills.projects.map((project, i) => (
                    <li key={i}>{project}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

