// components/sections/Skills.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { resumeData } from '../../lib/resume'
import { useSound } from './sound-provider'
import { Terminal, Code2, Database, Layout, Zap, Paintbrush, Accessibility, BarChart, Lock, Wrench, Search, Server, CreditCard, Cloud, Bot, Users } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  frontend: <Layout className="w-5 h-5 text-blue-500" />,
  backend: <Server className="w-5 h-5 text-emerald-500" />,
  languages: <Code2 className="w-5 h-5 text-purple-500" />,
  stateManagement: <Database className="w-5 h-5 text-amber-500" />,
  authentication: <Lock className="w-5 h-5 text-rose-500" />,
  styling: <Paintbrush className="w-5 h-5 text-pink-500" />,
  dataVisualization: <BarChart className="w-5 h-5 text-cyan-500" />,
  paymentsAndIntegrations: <CreditCard className="w-5 h-5 text-teal-500" />,
  accessibility: <Accessibility className="w-5 h-5 text-indigo-500" />,
  performance: <Zap className="w-5 h-5 text-yellow-500" />,
  cloudAndDevOps: <Cloud className="w-5 h-5 text-sky-500" />,
  aiTools: <Bot className="w-5 h-5 text-green-500" />,
  processAndTools: <Wrench className="w-5 h-5 text-gray-500" />
}

const categoryFilterMap: Record<string, string[]> = {
  All: Object.keys(resumeData.skills),
  "Frontend & UI": ["frontend", "languages", "styling", "dataVisualization"],
  "Backend & Data": ["backend", "stateManagement", "authentication", "paymentsAndIntegrations"],
  "DevOps & AI Tools": ["cloudAndDevOps", "aiTools", "performance", "accessibility", "processAndTools"]
}

const formatTitle = (key: string) => {
  const customTitles: Record<string, string> = {
    frontend: "Frontend Libraries & Frameworks",
    backend: "Backend (Node.js & MongoDB)",
    languages: "Languages",
    stateManagement: "State Management & Data Flow",
    authentication: "Authentication & Security",
    styling: "Styling & UI Components",
    dataVisualization: "Data Visualization & Tables",
    paymentsAndIntegrations: "Payments & Integrations",
    accessibility: "Accessibility & Standards",
    performance: "Performance & Rendering",
    cloudAndDevOps: "Cloud & DevOps (Azure)",
    aiTools: "AI-Assisted Development",
    processAndTools: "Process & Developer Tools"
  }
  return customTitles[key] || key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())
}

export default function Skills() {
  const { playHover, playClick } = useSound()
  const [activeTab, setActiveTab] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const allowedCategories = categoryFilterMap[activeTab] || Object.keys(resumeData.skills)

  const filteredCategories = Object.entries(resumeData.skills).filter(([category, skillsList]) => {
    if (!allowedCategories.includes(category)) return false;
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase()
    const matchesCategory = formatTitle(category).toLowerCase().includes(query)
    const matchesSkill = skillsList.some((s) => s.toLowerCase().includes(query))
    return matchesCategory || matchesSkill
  })

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
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
            / Technical Arsenal
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
            Technical Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Tooling</span>
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Frontend-first engineering (React, Next.js, Angular) combined with hands-on Node.js/MongoDB REST API development, Azure fundamentals, and daily AI-assisted tools.
          </p>
        </motion.div>

        {/* Filter Tabs & Search Bar Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 bg-secondary/40 p-1.5 rounded-2xl border border-border/50">
            {Object.keys(categoryFilterMap).map((tab) => (
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

          {/* Real-time Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills (e.g., Shadcn, Azure, Redux...)"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-background border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs outline-none transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-foreground/40 hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map(([category, skillsList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                onMouseEnter={playHover}
                className="p-6 rounded-3xl border border-border/60 bg-card/50 backdrop-blur-md hover:bg-card hover:border-border transition-all duration-300 group shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-3 rounded-2xl bg-background border border-border shadow-sm group-hover:scale-105 transition-transform">
                      {iconMap[category] || <Code2 className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-foreground">{formatTitle(category)}</h3>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {skillsList.map((skill) => (
                      <span 
                        key={skill}
                        className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-colors ${
                          searchQuery && skill.toLowerCase().includes(searchQuery.toLowerCase())
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-secondary/50 border-border/80 text-foreground/80 group-hover:border-border'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-foreground/50 font-mono text-sm">
              No skills found matching "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
