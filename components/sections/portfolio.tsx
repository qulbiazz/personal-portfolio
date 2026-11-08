'use client'

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { usePortfolioContext } from '@/components/ui/portfolio-context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLaptopCode,
  faPalette,
  faGlobe,
  faMobileScreen,
  faFolder,
  faClipboardList,
  faCircleCheck,
  faLightbulb,
  faMagnifyingGlass,
  faBullseye,
  faWrench,
  faFlask,
  faRoute,
  faLayerGroup,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

type ProjectItem = {
  id: number
  title: string
  category: string
  categories?: readonly string[] | string[]
  role?: string
  features?: readonly string[] | string[]
  image?: string
  repoUrl?: string
  description: string
  tags: readonly string[] | string[]
  pmJobdesk?: readonly string[] | string[]
  designThinking?: {
    empathize: string
    define: string
    ideate: string
    prototype: string
    test: string
  }
  userFlow?: readonly string[] | string[]
  wireframe?: string
}

function ProjectCategoryIcon({
  category,
  className = 'w-5 h-5 text-primary',
}: {
  category: string
  className?: string
}) {
  const cat = (category || '').toLowerCase()
  if (
    cat.includes('soft') ||
    cat.includes('code') ||
    cat.includes('dev') ||
    cat.includes('program')
  ) {
    return <FontAwesomeIcon icon={faLaptopCode} className={className} />
  }
  if (cat.includes('ui') || cat.includes('ux') || cat.includes('desain')) {
    return <FontAwesomeIcon icon={faPalette} className={className} />
  }
  if (cat.includes('web')) {
    return <FontAwesomeIcon icon={faGlobe} className={className} />
  }
  if (cat.includes('mobile') || cat.includes('app')) {
    return <FontAwesomeIcon icon={faMobileScreen} className={className} />
  }
  return <FontAwesomeIcon icon={faFolder} className={className} />
}

function ProjectCard({
  project,
  index,
  onOpenDetails,
}: {
  project: ProjectItem
  index: number
  onOpenDetails: (project: ProjectItem) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { language } = usePortfolioContext()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenDetails(project)}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, delay: index * 0.06 },
        },
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className="group relative overflow-hidden bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-[0_12px_32px_rgba(255,107,53,0.10)] transition-all cursor-pointer select-none"
    >
      {/* Hover bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/4 via-orange-500/4 to-rose-500/4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full" style={{ transform: 'translateZ(30px)' }}>
        {/* Thumbnail / Icon */}
        {project.image ? (
          <div className="w-full h-40 rounded-xl overflow-hidden mb-4 border border-border bg-muted relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all border border-primary/20 shadow-sm">
            <ProjectCategoryIcon category={project.category} className="w-5 h-5 text-primary" />
          </div>
        )}

        {/* Category tags & role */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          {((project.categories && project.categories.length > 0 ? project.categories : [project.category]) as readonly string[]).map((cat) => (
            <span
              key={cat}
              className="text-[10px] font-semibold text-primary uppercase tracking-wider px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20"
            >
              {cat}
            </span>
          ))}
          {project.role && (
            <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-wider px-2 py-0.5 bg-amber-500/10 rounded-full border border-amber-500/20">
              {project.role}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Desc */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 bg-muted text-muted-foreground rounded-lg border border-border font-medium hover:border-primary/30 hover:text-primary transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <motion.button
            whileHover={{ x: 4 }}
            className="text-primary text-xs font-semibold flex items-center gap-1.5 cursor-pointer pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation()
              onOpenDetails(project)
            }}
          >
            {language === 'en' ? 'View Details' : 'Lihat Detail'}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>

          {Boolean(project.repoUrl) && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title={language === 'en' ? 'View Repository' : 'Lihat Repository'}
              className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-primary/10 flex items-center gap-1.5 text-xs font-medium"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Repo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Portfolio() {
  const { ref, isVisible } = useScrollAnimation()
  const { t, language } = usePortfolioContext()

  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const isAllSelected = selectedCategory === 'All' || selectedCategory === t.portfolio.all

  const filteredProjects = isAllSelected
    ? t.portfolio.items
    : t.portfolio.items.filter((p) => {
        const catIdx = (t.portfolio.categories as readonly string[]).indexOf(selectedCategory)
        const enCat = t.portfolio.categories[catIdx]
        const pCats = ((p as any).categories || [p.category]) as readonly string[]
        return (
          pCats.includes(selectedCategory) ||
          pCats.includes(enCat) ||
          p.category === selectedCategory ||
          p.category === enCat
        )
      })

  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  }

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="mb-10">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="inline-block w-5 h-[1.5px] bg-primary" />
              {language === 'en' ? 'Selected Works' : 'Karya Pilihan'}
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
                  My <span className="italic text-gradient">{t.portfolio.title}</span>
                </>
              ) : (
                <>
                  <span className="italic text-gradient">{t.portfolio.title}</span> Saya
                </>
              )}
            </h2>
          </motion.div>

          {/* Category filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-10">
            {t.portfolio.categories.map((category) => {
              const isSelected =
                selectedCategory === category ||
                (category === t.portfolio.all && isAllSelected)
              return (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-5 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer overflow-hidden border ${
                    isSelected
                      ? 'text-white border-transparent'
                      : 'bg-card text-muted-foreground hover:text-foreground border-border hover:border-primary/30'
                  }`}
                >
                  <span className="relative z-10">{category}</span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + '-' + language}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpenDetails={setActiveProject}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative bg-card border border-border rounded-2xl max-w-2xl sm:max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10"
            >
              {/* Close */}
              <button
                onClick={() => setActiveProject(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-muted/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-sm z-20"
              >
                <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
              </button>

              <div className="p-5 sm:p-7">
                {/* Project Image Preview */}
                {activeProject.image && (
                  <div className="relative w-full h-52 sm:h-72 rounded-xl overflow-hidden mb-5 border border-border group/img bg-muted">
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    />
                    <a
                      href={activeProject.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-[2px]"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>{language === 'en' ? 'Open Full Image' : 'Buka Gambar Penuh'}</span>
                    </a>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {(((activeProject.categories && activeProject.categories.length > 0 ? activeProject.categories : [activeProject.category])) as readonly string[]).map((cat) => (
                    <span
                      key={cat}
                      className="text-[11px] px-2.5 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 font-semibold uppercase tracking-wider"
                    >
                      {cat}
                    </span>
                  ))}
                  {activeProject.role && (
                    <span className="text-[11px] px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20 font-semibold uppercase tracking-wider">
                      {activeProject.role}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-2 leading-tight">
                  {activeProject.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {activeProject.description}
                </p>

                {/* PM Jobdesk & Responsibilities (Tanggung Jawab & Kinerja Project Manager) */}
                {activeProject.pmJobdesk && activeProject.pmJobdesk.length > 0 && (
                  <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-orange-500/[0.05] border border-orange-500/25">
                    <div className="flex items-center gap-2 mb-3.5">
                      <div className="w-7 h-7 rounded-lg bg-orange-500/15 text-orange-500 flex items-center justify-center text-sm font-bold">
                        <FontAwesomeIcon icon={faClipboardList} className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                          {language === 'en' ? 'Project Manager Responsibilities & Performance' : 'Jobdesk & Kinerja Project Manager'}
                        </h4>
                        <p className="text-[11px] text-muted-foreground">
                          {language === 'en' ? 'Core leadership, sprint coordination, and project deliverables' : 'Tanggung jawab kepemimpinan proyek, koordinasi sprint, dan pengawalan capaian sistem'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {activeProject.pmJobdesk.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-card/90 border border-border/70 text-xs sm:text-sm">
                          <span className="w-5 h-5 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
                            <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3" />
                          </span>
                          <span className="text-foreground/90 leading-relaxed pt-0.5">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 1: Design Thinking (Metode Riset) */}
                {activeProject.designThinking && (
                  <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-3.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-500 flex items-center justify-center text-sm font-bold">
                        <FontAwesomeIcon icon={faLightbulb} className="w-3.5 h-3.5 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                          {(t.portfolio.modal as any).designThinking || (language === 'en' ? 'Design Thinking & Research' : 'Riset Menggunakan Metode Design Thinking')}
                        </h4>
                        <p className="text-[11px] text-muted-foreground">
                          {language === 'en' ? '5 stages of human-centered product development' : '5 tahapan riset & perancangan berpusat pada pengguna'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-xs sm:text-sm">
                      <div className="p-3 rounded-xl bg-card/90 border border-border/70">
                        <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400 mb-1 text-xs">
                          <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3 h-3 text-amber-500" />
                          <span>1. Empathize</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed pl-5">
                          {activeProject.designThinking.empathize}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-card/90 border border-border/70">
                        <div className="flex items-center gap-2 font-semibold text-orange-600 dark:text-orange-400 mb-1 text-xs">
                          <FontAwesomeIcon icon={faBullseye} className="w-3 h-3 text-orange-500" />
                          <span>2. Define</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed pl-5">
                          {activeProject.designThinking.define}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-card/90 border border-border/70">
                        <div className="flex items-center gap-2 font-semibold text-primary mb-1 text-xs">
                          <FontAwesomeIcon icon={faLightbulb} className="w-3 h-3 text-primary" />
                          <span>3. Ideate</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed pl-5">
                          {activeProject.designThinking.ideate}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-card/90 border border-border/70">
                        <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 mb-1 text-xs">
                          <FontAwesomeIcon icon={faWrench} className="w-3 h-3 text-blue-500" />
                          <span>4. Prototype</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed pl-5">
                          {activeProject.designThinking.prototype}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-card/90 border border-border/70">
                        <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 mb-1 text-xs">
                          <FontAwesomeIcon icon={faFlask} className="w-3 h-3 text-emerald-500" />
                          <span>5. Test</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed pl-5">
                          {activeProject.designThinking.test}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 2: User Flow (Alur Pengguna) */}
                {activeProject.userFlow && activeProject.userFlow.length > 0 && (
                  <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-primary/[0.04] border border-primary/20">
                    <div className="flex items-center gap-2 mb-3.5">
                      <div className="w-7 h-7 rounded-lg bg-primary/15 text-primary flex items-center justify-center text-sm font-bold">
                        <FontAwesomeIcon icon={faRoute} className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                          {(t.portfolio.modal as any).userFlow || (language === 'en' ? 'User Flow (Step-by-Step)' : 'Alur Pengguna (User Flow)')}
                        </h4>
                        <p className="text-[11px] text-muted-foreground">
                          {language === 'en' ? 'End-to-end user journey sequence' : 'Langkah alur interaksi pengguna dari awal hingga akhir'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {activeProject.userFlow.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-card/90 border border-border/70 text-xs sm:text-sm">
                          <span className="w-6 h-6 rounded-lg bg-primary/15 text-primary font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-foreground leading-relaxed pt-0.5 font-medium">
                            {step.replace(/^\d+\.\s*/, '')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 3: Wireframe & UI Architecture */}
                {activeProject.wireframe && (
                  <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-blue-500/[0.04] border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-3.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-500 flex items-center justify-center text-sm font-bold">
                        <FontAwesomeIcon icon={faLayerGroup} className="w-3.5 h-3.5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                          {(t.portfolio.modal as any).wireframe || (language === 'en' ? 'Wireframe & UI Architecture' : 'Wireframe & Perancangan Desain')}
                        </h4>
                        <p className="text-[11px] text-muted-foreground">
                          {language === 'en' ? 'Information hierarchy & layout execution' : 'Hierarki informasi, struktur wireframe, dan tata letak antarmuka'}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-card/90 border border-border/70 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {activeProject.wireframe}
                    </div>
                  </div>
                )}

                {/* Section 4: Key Features & Deliverables */}
                <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/70">
                  <div className="flex items-center gap-2 mb-3.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-sm font-bold">
                      <FontAwesomeIcon icon={faStar} className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                      {t.portfolio.modal.features}
                    </h4>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                    {((activeProject.features && activeProject.features.length > 0
                      ? activeProject.features
                      : language === 'en'
                      ? [
                          'Comprehensive design sprints, user profiles, and interactive user journeys.',
                          'Clean style guides with typographic scales, dynamic shadows, and HSL grids.',
                          'Interactive high-fidelity prototypes tested and approved by stakeholders.',
                        ]
                      : [
                          'Sprint desain komprehensif, profil pengguna, dan alur perjalanan pengguna interaktif.',
                          'Panduan gaya bersih yang berisi skala tipografi, bayangan dinamis, dan kisi HSL.',
                          'Prototipe interaktif high-fidelity yang diuji dan disetujui oleh para pemangku kepentingan proyek.',
                        ]
                    ) as readonly string[]).map((item, i) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-muted text-muted-foreground rounded-lg border border-border font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {activeProject.repoUrl ? (
                    <a
                      href={activeProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow py-2.5 bg-foreground text-background font-semibold rounded-xl hover:opacity-85 transition-all cursor-pointer text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span>{t.portfolio.modal.viewRepo || (language === 'en' ? 'View Repository' : 'Lihat Repository')}</span>
                    </a>
                  ) : activeProject.image ? (
                    <a
                      href={activeProject.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow py-2.5 bg-foreground text-background font-semibold rounded-xl hover:opacity-85 transition-all cursor-pointer text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{t.portfolio.modal.viewLive}</span>
                    </a>
                  ) : null}

                  <button
                    onClick={() => setActiveProject(null)}
                    className={`px-5 py-2.5 border border-border text-muted-foreground hover:text-foreground font-semibold rounded-xl transition-all cursor-pointer text-sm shrink-0 ${!activeProject.repoUrl && !activeProject.image ? 'w-full' : ''}`}
                  >
                    {t.portfolio.modal.close}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
