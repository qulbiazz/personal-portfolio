'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { usePortfolioContext } from '@/components/ui/portfolio-context'
import { SkillLogo } from '@/components/ui/skill-icons'

export function Skills() {
  const { ref, isVisible } = useScrollAnimation()
  const { t, language } = usePortfolioContext()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
  }

  const skillCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.45 } },
  }

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
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
              {language === 'en' ? 'What I Do' : 'Keahlian'}
            </p>
            <h2
              className="text-foreground leading-tight"
              style={{
                fontFamily: 'var(--font-instrument-serif)',
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 400,
              }}
            >
              {language === 'en' ? (
                <>
                  My <span className="italic text-gradient">{t.skills.title}</span>
                </>
              ) : (
                <>
                  <span className="italic text-gradient">{t.skills.title}</span> Saya
                </>
              )}
            </h2>
          </motion.div>

          {/* Skills Grid */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {t.skills.skillsData.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={skillCardVariants}
                whileHover="hover"
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.35}
                dragTransition={{ bounceStiffness: 250, bounceDamping: 18 }}
                className="group p-5 bg-card border border-border rounded-2xl text-center hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(255,107,53,0.10)] transition-all cursor-grab active:cursor-grabbing relative overflow-hidden w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] lg:w-[calc(33.333%-0.75rem)] max-w-[290px]"
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-rose-500/5 opacity-0 pointer-events-none"
                  variants={{ hover: { opacity: 1 } }}
                />

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    y: {
                      duration: 3 + index * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.15,
                    },
                  }}
                  className="relative z-10 select-none pointer-events-none flex flex-col items-center"
                >
                  <div className="h-12 w-12 mb-3 flex items-center justify-center">
                    <SkillLogo
                      name={skill.name}
                      fallbackEmoji={skill.emoji}
                      className="w-10 h-10 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground leading-tight">{skill.name}</h3>

                  {/* Hover reveal */}
                  <motion.div
                    className="mt-3 pt-3 border-t border-border/60 overflow-hidden w-full text-left"
                    initial={{ opacity: 0, height: 0 }}
                    variants={{ hover: { opacity: 1, height: 'auto' } }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-muted-foreground">{t.skills.proficiency}</span>
                      <span className="text-primary font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full origin-left"
                        initial={{ scaleX: 0 }}
                        variants={{ hover: { scaleX: skill.level / 100 } }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">{skill.desc}</p>

                    {'subSkills' in skill && Array.isArray(skill.subSkills) && (
                      <div className="mt-3 pt-2.5 border-t border-border/40">
                        <span className="text-[9px] uppercase tracking-wider text-muted-foreground/80 font-bold block mb-1.5">
                          {language === 'en' ? 'Core Capabilities' : 'Keahlian Dikuasai'}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {(skill.subSkills as readonly string[]).map((sub: string) => (
                            <span
                              key={sub}
                              className="text-[9.5px] px-2 py-0.5 bg-primary/8 text-primary rounded-md border border-primary/15 font-medium"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Additional info panel */}
          <motion.div
            variants={itemVariants}
            className="p-6 bg-card border border-border rounded-2xl hover:border-primary/20 transition-all"
          >
            <h3
              className="text-lg italic text-primary mb-5"
              style={{ fontFamily: 'var(--font-instrument-serif)' }}
            >
              {t.skills.additionalTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                  {t.skills.softSkills}
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {t.skills.softSkillsList}
                </p>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                  {t.skills.languages}
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">{t.skills.languagesList}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                  {t.skills.awardsTitle}
                </h4>
                <ul className="space-y-1">
                  {t.skills.awards.map((award, i) => (
                    <li key={i} className="flex gap-2 items-start text-sm text-foreground/80">
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary/60" />
                      {award}
                    </li>
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
