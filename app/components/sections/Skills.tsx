// components/sections/Skills.tsx
'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { resumeData } from '../../lib/resume'
import { useSound } from './sound-provider'
import { Layout, Server, Database, Wrench, Search, Code2 } from 'lucide-react'

const categoryMeta: Record<string, { title: string; subtitle: string; icon: any; gradient: string }> = {
  frontend: {
    title: "Frontend Development",
    subtitle: "React.js, Next.js, TypeScript & Angular ecosystems",
    icon: Layout,
    gradient: "from-blue-500 to-indigo-500"
  },
  backend: {
    title: "Backend Development",
    subtitle: "Node.js, Express.js REST APIs & security architectures",
    icon: Server,
    gradient: "from-emerald-500 to-teal-500"
  },
  database: {
    title: "Database Engineering",
    subtitle: "MongoDB & Mongoose schema design and aggregation pipelines",
    icon: Database,
    gradient: "from-amber-500 to-orange-500"
  },
  toolsAndDelivery: {
    title: "Tools & Delivery",
    subtitle: "Git, Cloud storage, SSR, and production performance",
    icon: Wrench,
    gradient: "from-purple-500 to-pink-500"
  }
}

const tabOptions = ["All", "Frontend", "Backend", "Database", "Tools & Delivery"]

const tabToKeyMap: Record<string, string[]> = {
  All: ["frontend", "backend", "database", "toolsAndDelivery"],
  Frontend: ["frontend"],
  Backend: ["backend"],
  Database: ["database"],
  "Tools & Delivery": ["toolsAndDelivery"]
}

function SkillCard({
  category,
  index,
  searchQuery
}: {
  category: {
    key: string
    title: string
    subtitle: string
    Icon: any
    gradient: string
    skills: string[]
  }
  index: number
  searchQuery: string
}) {
  const { playHover } = useSound()
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const Icon = category.Icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onMouseEnter={() => {
        playHover()
        setIsHovered(true)
      }}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative p-8 rounded-3xl border border-border/70 bg-card/60 hover:border-border transition-all duration-300 group shadow-sm flex flex-col justify-between overflow-hidden"
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.09), transparent 60%)`
            : '',
        }}
      />

      <div className="relative z-10">
        {/* Category Title Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-md group-hover:scale-105 transition-transform shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-blue-500 transition-colors">
              {category.title}
            </h3>
            <p className="text-xs text-foreground/50 font-sans mt-0.5">
              {category.subtitle}
            </p>
          </div>
        </div>
        
        {/* Skills Pills */}
        <div className="flex flex-wrap gap-2 pt-3">
          {category.skills.map((skill) => (
            <span 
              key={skill}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-xl border transition-colors ${
                searchQuery && skill.toLowerCase().includes(searchQuery.toLowerCase())
                  ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                  : 'bg-secondary/60 border-border/80 text-foreground/80 group-hover:border-border hover:text-foreground'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { playHover, playClick } = useSound()
  const [activeTab, setActiveTab] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const allowedKeys = tabToKeyMap[activeTab] || Object.keys(resumeData.skills)

  const skillEntries = Object.entries(resumeData.skills)
    .filter(([key]) => allowedKeys.includes(key))
    .map(([key, list]) => {
      const meta = categoryMeta[key] || {
        title: key,
        subtitle: "",
        icon: Code2,
        gradient: "from-blue-500 to-purple-500"
      }
      return {
        key,
        title: meta.title,
        subtitle: meta.subtitle,
        Icon: meta.icon,
        gradient: meta.gradient,
        skills: list
      }
    })
    .filter((cat) => {
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      const titleMatch = cat.title.toLowerCase().includes(q)
      const skillMatch = cat.skills.some((s) => s.toLowerCase().includes(q))
      return titleMatch || skillMatch
    })

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-foreground/50 mb-3 block tracking-widest uppercase">
            / CORE COMPETENCIES
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4 text-foreground">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Skills & Tooling</span>
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Full-stack JavaScript engineering centered around React.js, Next.js, Node.js, Express.js, and MongoDB, backed by enterprise Angular experience and production SSR optimization.
          </p>
        </motion.div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 bg-secondary/40 p-1.5 rounded-2xl border border-border/50">
            {tabOptions.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  playClick()
                  setActiveTab(tab)
                }}
                onMouseEnter={playHover}
                className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                  activeTab === tab
                    ? 'bg-foreground text-background shadow-md'
                    : 'text-foreground/70 hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills (e.g. Next.js, MongoDB, JWT...)"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-background border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs outline-none transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-foreground/40 hover:text-foreground"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 4 Clean Categories Grid with Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillEntries.length > 0 ? (
            skillEntries.map((category, index) => (
              <SkillCard
                key={category.key}
                category={category}
                index={index}
                searchQuery={searchQuery}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-foreground/50 font-mono text-xs">
              No matching skills found for "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
