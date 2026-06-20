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

// Sub-component for 3D tilting project card
function ProjectCard({ 
  project, 
  index, 
  onOpenDetails 
}: { 
  project: ProjectItem
  index: number
  onOpenDetails: (project: ProjectItem) => void 
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { language } = usePortfolioContext()
  
  // Motion values for mouse tilt tracking
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Map coordinates (-0.5 to 0.5) to degrees (-10 to 10)
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    x.set((mouseX / width) - 0.5)
    y.set((mouseY / height) - 0.5)
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
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.05 },
        },
      }}
      whileHover={{
        y: -12,
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(245, 158, 11, 0.2), 0 10px 20px rgba(244, 63, 94, 0.1)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="project-card group relative overflow-hidden bg-card/50 border border-border rounded-lg p-6 hover:border-orange-500/40 transition-all cursor-pointer select-none"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Content wrapper with Z-translation for 3D parallax depth */}
      <div className="relative z-10 pointer-events-none flex flex-col justify-between h-full" style={{ transform: 'translateZ(40px)' }}>
        <div>
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500/10 to-rose-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:from-amber-500/25 group-hover:to-rose-500/25 transition-all duration-350">
            <span className="text-2xl">📁</span>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            {project.category}
          </p>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded border border-orange-500/20 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Details Button */}
          <motion.button
            whileHover={{ x: 5 }}
            className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-350 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer pointer-events-auto mt-2"
            onClick={(e) => {
              e.stopPropagation()
              onOpenDetails(project)
            }}
          >
            {language === 'en' ? 'View Details →' : 'Lihat Detail →'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export function Portfolio() {
  const { ref, isVisible } = useScrollAnimation()
  const { t, language } = usePortfolioContext()
  
  // Use "All" in the local state variable to filter easily, checking translations.en.portfolio.all
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // Find if category is 'All' or translated 'All' (e.g. 'Semua')
  const isAllSelected = selectedCategory === 'All' || selectedCategory === t.portfolio.all

  const filteredProjects = isAllSelected
    ? t.portfolio.items
    : t.portfolio.items.filter(p => {
        // Match English category mappings safely
        // Translations lists category names in the translations dictionary
        // We match by name or index
        const catIdx = (t.portfolio.categories as readonly string[]).indexOf(selectedCategory)
        const enCat = t.portfolio.categories[catIdx]
        return p.category === selectedCategory || p.category === enCat
      })

  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null)

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

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold mb-12 text-foreground transition-colors duration-300">
            {language === 'en' ? (
              <>
                My <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">{t.portfolio.title}</span>
              </>
            ) : (
              <>
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">{t.portfolio.title}</span> Saya
              </>
            )}
          </motion.h2>

          {/* Category Tabs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-12">
            {t.portfolio.categories.map((category) => {
              const isSelected = selectedCategory === category || (category === t.portfolio.all && isAllSelected)
              return (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-6 py-2 rounded-full font-semibold transition-all cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'text-white border-transparent'
                      : 'bg-card text-muted-foreground hover:text-orange-500 hover:border-orange-500/30 border border-border'
                  }`}
                >
                  <span className="relative z-10">{category}</span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-md shadow-orange-500/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + '-' + language}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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

      {/* Modal Details Overlay */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative bg-card border border-border rounded-xl max-w-lg w-full overflow-hidden shadow-2xl z-10 transition-colors duration-300"
            >
              {/* Close button top right */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-lg font-bold p-1 bg-background border border-border hover:border-border/80 rounded-full w-7 h-7 flex items-center justify-center"
              >
                ✕
              </button>

              <div className="p-8">
                {/* Header */}
                <span className="text-xs px-2.5 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full border border-orange-500/20 font-semibold uppercase tracking-wider">
                  {activeProject.category}
                </span>
                
                <h3 className="text-3xl font-bold text-foreground mt-3 mb-2 leading-tight transition-colors duration-300">
                  {activeProject.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed transition-colors duration-300">
                  {activeProject.description}
                </p>

                {/* Detailed Deliverables List */}
                <div className="space-y-4 mb-6 border-t border-border/80 pt-4">
                  <h4 className="text-xs font-bold text-orange-600 dark:text-orange-400/90 uppercase tracking-widest">{t.portfolio.modal.features}</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground list-disc list-inside leading-relaxed transition-colors duration-300">
                    {language === 'en' ? (
                      <>
                        <li>Comprehensive design sprints, user profiles, and interactive user journeys.</li>
                        <li>Clean style guides containing typographic scales, dynamic shadows, and HSL grids.</li>
                        <li>Interactive high-fidelity prototypes tested and approved by project stakeholders.</li>
                      </>
                    ) : (
                      <>
                        <li>Sprint desain komprehensif, profil pengguna, dan alur perjalanan pengguna interaktif.</li>
                        <li>Panduan gaya bersih yang berisi skala tipografi, bayangan dinamis, dan kisi HSL.</li>
                        <li>Prototipe interaktif high-fidelity yang diuji dan disetujui oleh para pemangku kepentingan proyek.</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-background text-foreground/80 rounded border border-border font-medium transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => alert(language === 'en' ? 'Demo prototype launched successfully!' : 'Prototipe demo berhasil diluncurkan!')}
                    className="flex-grow py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-orange-500/15 hover:brightness-110 transition-all cursor-pointer text-center"
                  >
                    {t.portfolio.modal.viewLive}
                  </button>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="px-6 py-3 border border-border text-muted-foreground hover:bg-muted font-semibold rounded-lg hover:text-foreground transition-all cursor-pointer text-center transition-colors duration-300"
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


