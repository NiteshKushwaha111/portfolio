// components/sections/Projects.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, TrendingUp, School, Shield, Activity, Lock, Eye, X } from 'lucide-react'
import { useSound } from './sound-provider'
import { resumeData } from '../../lib/resume'

const projectExtras = [
  { icon: Shield, gradient: "from-blue-500 to-purple-500" },
  { icon: Activity, gradient: "from-pink-500 to-rose-500" },
  { icon: ExternalLink, gradient: "from-emerald-500 to-teal-500" },
  { icon: TrendingUp, gradient: "from-orange-500 to-amber-500" },
  { icon: School, gradient: "from-indigo-500 to-cyan-500" }
]

const categories = ["All", "Next.js & React", "Angular & MEAN", "Enterprise Systems"]

export default function Projects() {
  const { playHover, playClick } = useSound()
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any | null>(null)

  const filteredProjects = resumeData.projects.filter((project) => {
    if (activeCategory === "All") return true
    return project.category === activeCategory
  })

  return (
    <section id="projects" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-mono text-foreground/50 mb-3 block tracking-widest uppercase">
            / SELECTED WORK
          </span>
          <h2 className="font-serif text-4xl md:text-5xl gradient-text mb-4">
            Platforms & Applications
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto">
            A curated list of public web applications and internal enterprise systems engineered across React, Next.js, and Angular.
          </p>
        </motion.div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 bg-secondary/40 p-1.5 rounded-2xl border border-border/50 max-w-max mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick()
                setActiveCategory(cat)
              }}
              onMouseEnter={playHover}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                activeCategory === cat
                  ? 'bg-foreground text-background shadow-md'
                  : 'text-foreground/70 hover:text-foreground hover:bg-secondary/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => {
            const extra = projectExtras[idx % projectExtras.length];
            const Icon = extra.icon;

            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative bg-card border border-border/70 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
                onMouseEnter={playHover}
              >
                {/* Gradient background glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${extra.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none`} />
                
                <div className="p-8 h-full flex flex-col justify-between relative z-10">
                  <div>
                    {/* Top Row: Icon & Links / Badges */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${extra.gradient} p-[1px] shadow-md`}>
                        <div className="w-full h-full bg-background rounded-[15px] flex items-center justify-center p-2.5">
                          <Icon className="w-5 h-5 text-foreground/80" />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 items-center justify-end">
                        {project.isNDA ? (
                          <button
                            onClick={() => {
                              playClick()
                              setSelectedCaseStudy(project)
                            }}
                            onMouseEnter={playHover}
                            className="px-3.5 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-foreground/80 hover:text-foreground hover:border-border/80 transition-all flex items-center gap-1.5"
                          >
                            <Lock className="w-3 h-3 text-amber-500" /> Enterprise Case Study
                          </button>
                        ) : (
                          <>
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-1.5 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity flex items-center gap-1.5 text-xs font-semibold shadow-sm"
                                onMouseEnter={playHover}
                                onClick={playClick}
                              >
                                Live Demo <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-1.5 rounded-full border border-border bg-secondary/50 hover:bg-secondary transition-colors flex items-center gap-1.5 text-xs font-medium text-foreground/80"
                                onMouseEnter={playHover}
                                onClick={playClick}
                              >
                                Code <Github className="w-3 h-3" />
                              </a>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                      {project.name.split('–')[0].trim()}
                    </h3>
                    <div className="text-xs font-mono text-foreground/50 mb-4">
                      {project.name.split('–')[1]?.trim() || project.category}
                    </div>

                    {/* Details Bullet List */}
                    <ul className="space-y-2 mb-6 text-xs sm:text-sm text-foreground/70">
                      {project.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold select-none">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {project.isNDA && (
                      <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs flex items-center gap-2">
                        <Lock className="w-4 h-4 shrink-0" />
                        <span>{project.ndaNotice}</span>
                      </div>
                    )}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-secondary/70 border border-border/60 text-foreground/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* NDA Case Study Modal */}
        <AnimatePresence>
          {selectedCaseStudy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-6"
              onClick={() => setSelectedCaseStudy(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card border border-border rounded-3xl max-w-xl w-full p-8 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground/60 hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 text-amber-500 text-xs font-mono mb-2">
                  <Lock className="w-4 h-4" /> Internal Enterprise System Case Study
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                  {selectedCaseStudy.name}
                </h3>
                <div className="space-y-3 text-xs sm:text-sm text-foreground/80 mb-6 leading-relaxed">
                  <p>
                    <strong className="text-foreground">Architecture Highlights:</strong> Engineered for enterprise clients managing sensitive regulatory data and multi-role operations.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                    {selectedCaseStudy.details.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-foreground/50 pt-2 border-t border-border">
                    💡 Due to non-disclosure agreements, live access to production databases is restricted. Detailed architecture diagrams and Loom walkthroughs are available upon request.
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <a
                    href="#contact"
                    onClick={() => setSelectedCaseStudy(null)}
                    className="px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    Request Walkthrough
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}