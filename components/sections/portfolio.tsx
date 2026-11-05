'use client'

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { usePortfolioContext } from '@/components/ui/portfolio-context'

type ProjectItem = {
  id: number
  title: string
  category: string
  description: string
  tags: readonly string[] | string[]
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

  // Category emoji map
  const categoryEmoji: Record<string, string> = {
    'UI/UX Design': '🎨',
    'Graphic Design': '✏️',
    'Social Media': '📱',
    'Web Design': '🖥️',
    'Desain UI/UX': '🎨',
    'Desain Grafis': '✏️',
    'Media Sosial': '📱',
    'Desain Web': '🖥️',
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
        {/* Icon */}
        <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
          <span className="text-xl">
            {categoryEmoji[project.category] || '📁'}
          </span>
        </div>

        {/* Category tag */}
        <p className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-1">
          {project.category}
        </p>

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
        <motion.button
          whileHover={{ x: 4 }}
          className="text-primary text-xs font-semibold flex items-center gap-1.5 cursor-pointer pointer-events-auto mt-auto"
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
        return p.category === selectedCategory || p.category === enCat
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
              className="relative bg-card border border-border rounded-2xl max-w-md w-full overflow-hidden shadow-2xl z-10"
            >
              {/* Close */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-sm"
              >
                ✕
              </button>

              <div className="p-7">
                <span className="text-[11px] px-2.5 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 font-semibold uppercase tracking-wider">
                  {activeProject.category}
                </span>

                <h3
                  className="text-2xl mt-3 mb-2 text-foreground leading-tight"
                  style={{ fontFamily: 'var(--font-instrument-serif)' }}
                >
                  {activeProject.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {activeProject.description}
                </p>

                <div className="space-y-3 mb-5 border-t border-border/60 pt-4">
                  <h4 className="text-[11px] font-bold text-primary uppercase tracking-widest">
                    {t.portfolio.modal.features}
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {(language === 'en'
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
                    ).map((item, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary/60" />
                        {item}
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
                  <button
                    onClick={() =>
                      alert(language === 'en' ? 'Demo launched!' : 'Demo diluncurkan!')
                    }
                    className="flex-grow py-2.5 bg-foreground text-background font-semibold rounded-xl hover:opacity-85 transition-all cursor-pointer text-sm"
                  >
                    {t.portfolio.modal.viewLive}
                  </button>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="px-5 py-2.5 border border-border text-muted-foreground hover:text-foreground font-semibold rounded-xl transition-all cursor-pointer text-sm"
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
