// components/sections/Projects.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, TrendingUp, School, Shield, Activity, Lock, X, Layers, Building2, ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react'
import { useSound } from './sound-provider'
import { resumeData, ProjectItem } from '../../lib/resume'

const projectMetaIcons: Record<string, { icon: any; gradient: string }> = {
  'boarding-schools-of-india': { icon: School, gradient: 'from-blue-500 to-indigo-500' },
  'accred-one': { icon: Shield, gradient: 'from-purple-500 to-pink-500' },
  'skybound-construction': { icon: Building2, gradient: 'from-amber-500 to-orange-500' },
  'caneverse': { icon: ShoppingBag, gradient: 'from-emerald-500 to-teal-500' },
  'jaz-anz': { icon: Activity, gradient: 'from-cyan-500 to-blue-500' },
  'ensurite': { icon: Layers, gradient: 'from-indigo-500 to-purple-500' }
}

const filterOptions = [
  { id: "All", label: "All Projects" },
  { id: "Professional", label: "Professional" },
  { id: "Personal", label: "Personal" },
  { id: "FullStack", label: "Full-Stack" }
]

function ProjectCard({
  project,
  idx,
  onOpenCaseStudy
}: {
  project: ProjectItem
  idx: number
  onOpenCaseStudy: (p: ProjectItem) => void
}) {
  const { playHover, playClick } = useSound()
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const meta = projectMetaIcons[project.id] || { icon: Layers, gradient: "from-blue-500 to-indigo-500" }
  const Icon = meta.icon
  const isPersonal = project.projectType === "Personal Project"

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => {
        playHover()
        setIsHovered(true)
      }}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative bg-card border border-border/70 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.08), transparent 60%)`
            : '',
        }}
      />

      <div className="p-7 sm:p-8 flex flex-col h-full justify-between relative z-10">
        <div>
          {/* Header: Icon, Type Badge & Category */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${meta.gradient} p-[1px] shadow-md shrink-0`}>
                <div className="w-full h-full bg-background rounded-[15px] flex items-center justify-center p-2.5">
                  <Icon className="w-5 h-5 text-foreground/80" />
                </div>
              </div>
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border ${
                  isPersonal 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                    : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                }`}>
                  {project.projectType}
                </span>
                <div className="text-[11px] font-mono text-foreground/50 mt-0.5">
                  {project.category}
                </div>
              </div>
            </div>

            {/* Case Study Trigger Badge */}
            <button
              onClick={() => {
                playClick()
                onOpenCaseStudy(project)
              }}
              onMouseEnter={playHover}
              className="px-3.5 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 border border-border text-[11px] font-medium text-foreground/80 hover:text-foreground transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              {project.isNDA ? <Lock className="w-3 h-3 text-amber-500" /> : <TrendingUp className="w-3 h-3 text-blue-500" />}
              <span>Case Study</span>
            </button>
          </div>

          {/* Title & One-Liner */}
          <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-2 group-hover:text-blue-500 transition-colors">
            {project.name}
          </h3>
          <p className="text-xs sm:text-sm text-foreground/70 mb-4 leading-relaxed font-sans">
            {project.oneLiner}
          </p>

          {/* Outcome Highlight Pill */}
          {project.highlight && (
            <div className="mb-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{project.highlight}</span>
            </div>
          )}

          {/* Key Contributions & Features */}
          <ul className="space-y-2 mb-6 text-xs sm:text-sm text-foreground/75 leading-relaxed">
            {project.details.slice(0, 3).map((detail, dIdx) => (
              <li key={dIdx} className="flex items-start gap-2">
                <span className="text-blue-500 font-bold select-none">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer: Tech Stack & Action Links */}
        <div className="pt-4 border-t border-border/40 flex flex-col gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-secondary/70 border border-border/60 text-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-foreground text-background hover:opacity-90 transition-opacity flex items-center gap-1.5 text-xs font-semibold shadow-sm"
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  Live Demo <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl border border-border bg-secondary/50 hover:bg-secondary transition-colors flex items-center gap-1.5 text-xs font-medium text-foreground/80"
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  Code <Github className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <button
              onClick={() => {
                playClick()
                onOpenCaseStudy(project)
              }}
              onMouseEnter={playHover}
              className="text-xs font-mono text-foreground/60 hover:text-foreground underline underline-offset-4 decoration-border/60 hover:decoration-foreground"
            >
              Architecture & Details →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { playHover, playClick } = useSound()
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null)
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'architecture' | 'impact'>('overview')
  const [copiedModalLink, setCopiedModalLink] = useState(false)

  // Background Scroll Lock & Escape Key Handler
  useEffect(() => {
    if (selectedCaseStudy) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedCaseStudy(null)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = 'unset'
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedCaseStudy])

  const counts = {
    All: resumeData.projects.length,
    Professional: resumeData.projects.filter(p => p.projectType === "Professional Project").length,
    Personal: resumeData.projects.filter(p => p.projectType === "Personal Project").length,
    FullStack: resumeData.projects.filter(p => p.category.includes("Full-Stack")).length,
  }

  const filteredProjects = resumeData.projects.filter((project) => {
    if (activeFilter === "All") return true
    if (activeFilter === "Professional") return project.projectType === "Professional Project"
    if (activeFilter === "Personal") return project.projectType === "Personal Project"
    if (activeFilter === "FullStack") return project.category.includes("Full-Stack")
    return true
  })

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-mono text-foreground/50 mb-3 block tracking-widest uppercase">
            / SELECTED PROJECTS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4 text-foreground">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Engineering Work</span>
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Production full-stack platforms, SSR performance migrations, 80+ dynamic form engines, enterprise RBAC architectures, and independent product developments.
          </p>
        </motion.div>

        {/* Filter Category Tabs with Live Counts */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 bg-secondary/40 p-1.5 rounded-2xl border border-border/50 max-w-max mx-auto shadow-sm">
          {filterOptions.map((filter) => {
            const count = counts[filter.id as keyof typeof counts] || 0
            const isActive = activeFilter === filter.id

            return (
              <button
                key={filter.id}
                onClick={() => {
                  playClick()
                  setActiveFilter(filter.id)
                }}
                onMouseEnter={playHover}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                  isActive
                    ? 'bg-foreground text-background shadow-md'
                    : 'text-foreground/70 hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <span>{filter.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isActive ? 'bg-background/20 text-background' : 'bg-secondary text-foreground/50'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              onOpenCaseStudy={(p) => {
                setSelectedCaseStudy(p)
                setActiveModalTab('overview')
              }}
            />
          ))}
        </div>

        {/* Detailed Case Study Modal with Tabs & ESC handler */}
        <AnimatePresence>
          {selectedCaseStudy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
              onClick={() => setSelectedCaseStudy(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ duration: 0.2 }}
                className="bg-card border border-border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground/60 hover:text-foreground transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${
                    selectedCaseStudy.projectType === 'Personal Project'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                      : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                  }`}>
                    {selectedCaseStudy.projectType}
                  </span>
                  <span className="text-xs font-mono text-foreground/50">
                    • {selectedCaseStudy.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-3">
                  {selectedCaseStudy.name}
                </h3>

                <p className="text-xs sm:text-sm text-foreground/75 mb-6 leading-relaxed">
                  {selectedCaseStudy.oneLiner}
                </p>

                {/* Interactive Modal Tabs */}
                <div className="flex gap-2 border-b border-border/60 pb-3 mb-5 text-xs font-mono">
                  {[
                    { id: 'overview', label: '1. Overview & Purpose' },
                    { id: 'architecture', label: '2. Architecture & Decisions' },
                    { id: 'impact', label: '3. Results & Stack' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        playClick()
                        setActiveModalTab(tab.id as any)
                      }}
                      className={`px-3 py-1.5 rounded-xl transition-all ${
                        activeModalTab === tab.id
                          ? 'bg-foreground text-background font-semibold shadow-sm'
                          : 'text-foreground/60 hover:text-foreground hover:bg-secondary'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content Display */}
                <div className="max-h-[50vh] overflow-y-auto pr-2 text-xs sm:text-sm leading-relaxed text-foreground/80">
                  {activeModalTab === 'overview' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50">
                        <h4 className="font-semibold text-foreground mb-1 text-xs uppercase tracking-wider font-mono">
                          Business Problem & Purpose
                        </h4>
                        <p className="text-foreground/75">{selectedCaseStudy.problem}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50">
                        <h4 className="font-semibold text-foreground mb-1 text-xs uppercase tracking-wider font-mono">
                          My Role & Contribution Scope
                        </h4>
                        <p className="text-foreground/75">{selectedCaseStudy.role}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50">
                        <h4 className="font-semibold text-foreground mb-2 text-xs uppercase tracking-wider font-mono">
                          Key Features Delivered
                        </h4>
                        <ul className="space-y-1.5">
                          {selectedCaseStudy.details.map((d, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-500 font-bold">•</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeModalTab === 'architecture' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50">
                        <h4 className="font-semibold text-foreground mb-1 text-xs uppercase tracking-wider font-mono">
                          System Architecture & Technical Strategy
                        </h4>
                        <p className="text-foreground/75">{selectedCaseStudy.architecture}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50">
                        <h4 className="font-semibold text-foreground mb-2 text-xs uppercase tracking-wider font-mono">
                          Technology Stack Implemented
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedCaseStudy.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs font-mono rounded-lg bg-background border border-border text-foreground/90 font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModalTab === 'impact' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30">
                        <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-1 text-xs uppercase tracking-wider font-mono">
                          Verified Results & Measurable Impact
                        </h4>
                        <p className="text-foreground/90 font-medium">{selectedCaseStudy.results}</p>
                      </div>

                      {selectedCaseStudy.ndaNotice && (
                        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-foreground/80 font-mono">
                          <Lock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{selectedCaseStudy.ndaNotice}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Modal Footer CTAs */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    {selectedCaseStudy.link && (
                      <a
                        href={selectedCaseStudy.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
                      >
                        Live Demo <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {selectedCaseStudy.github && (
                      <a
                        href={selectedCaseStudy.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-xs font-medium text-foreground transition-colors flex items-center gap-1.5"
                      >
                        GitHub <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        playClick()
                        navigator.clipboard.writeText(`${window.location.origin}#projects`)
                        setCopiedModalLink(true)
                        setTimeout(() => setCopiedModalLink(false), 2000)
                      }}
                      className="px-3.5 py-2 rounded-xl border border-border bg-background hover:bg-secondary text-xs font-mono text-foreground/80 flex items-center gap-1.5 transition-colors"
                      title="Copy link to project"
                    >
                      {copiedModalLink ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Share</span>
                        </>
                      )}
                    </button>

                    <a
                      href="#contact"
                      onClick={() => setSelectedCaseStudy(null)}
                      className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-xs font-semibold text-foreground transition-colors"
                    >
                      Discuss in Interview →
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}