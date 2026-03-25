// components/sections/Projects.tsx
'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { ExternalLink, Github, TrendingUp, School, Shield, Activity } from 'lucide-react'
import { useSound } from './sound-provider'
import { resumeData } from '../../lib/resume'

// We map the static icons and gradients to the dynamic projects from the resume
const projectExtras = [
  { icon: Shield, gradient: "from-blue-500 to-purple-500" },
  { icon: Activity, gradient: "from-pink-500 to-rose-500" },
  { icon: ExternalLink, gradient: "from-emerald-500 to-teal-500" },
  { icon: TrendingUp, gradient: "from-orange-500 to-amber-500" },
  { icon: School, gradient: "from-indigo-500 to-cyan-500" }
]

function ProjectCard({ project, idx, playHover, playClick, itemVariants }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const extra = projectExtras[idx % projectExtras.length];
  const Icon = extra.icon;

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: idx * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500"
      onMouseEnter={playHover}
    >
      {/* Gradient background glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${extra.gradient} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.08] transition-opacity duration-500`} />
      
      <div className="p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${extra.gradient} p-[1px] shadow-lg`}>
              <div className="w-full h-full bg-background rounded-[15px] flex items-center justify-center p-3">
                  <Icon className={`w-full h-full text-transparent bg-clip-text bg-gradient-to-br ${extra.gradient} drop-shadow-sm`} style={{ color: 'url(#gradient)' }} />
                  {/* SVG Gradient definition for the icon */}
                  <svg width="0" height="0">
                    <linearGradient id={`${project.name}-grad`} x1="100%" y1="100%" x2="0%" y2="0%">
                      <stop stopColor="currentColor" offset="0%" />
                      <stop stopColor="currentColor" offset="100%" />
                    </linearGradient>
                  </svg>
              </div>
          </div>
          <div className="flex flex-col gap-2 items-end relative z-10">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-foreground text-background hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center gap-2 text-sm font-medium shadow-md w-max"
                onMouseEnter={playHover}
                onClick={playClick}
              >
                Visit Live Site <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-border bg-background hover:bg-secondary hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-sm text-foreground/80 w-max"
                onMouseEnter={playHover}
                onClick={playClick}
              >
                Code <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-2xl font-serif mb-3 font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-foreground/70 transition-colors">
          {project.name.split('–')[0].trim()}
        </h3>
        <div className="text-sm font-mono text-foreground/40 mb-4 truncate">
           {project.name.split('–')[1]?.trim() || "Enterprise Application"}
        </div>
        
        <div className="text-foreground/70 mb-8 flex-grow flex flex-col items-start">
          <p className={isExpanded ? "" : "line-clamp-3 overflow-hidden text-ellipsis"}>
              {project.details.join('. ')}.
          </p>
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-sm font-medium hover:text-foreground text-foreground/50 transition-colors mt-3 inline-block relative z-20"
          >
            {isExpanded ? "Read Less ↑" : "Read More ↓"}
          </button>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map((tech: string) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/80 border border-border text-foreground/80 hover:bg-foreground hover:text-background transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { playHover, playClick } = useSound()

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-mono text-foreground/40 mb-4 block">
            / SELECTED WORK
          </span>
          <h2 className="font-serif text-4xl md:text-5xl gradient-text">
            {`Platforms I've Built`}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {resumeData.projects.map((project, idx) => (
            <ProjectCard
              key={project.name}
              project={project}
              idx={idx}
              playHover={playHover}
              playClick={playClick}
              itemVariants={itemVariants}
            />
          ))}
        </div>
      </div>
    </section>
  )
}