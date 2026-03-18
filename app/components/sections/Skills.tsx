'use client'

import { motion } from 'framer-motion'
import { resumeData } from '../../lib/resume'
import { useSound } from './sound-provider'
import { Terminal, Code2, Database, Layout, Zap, Paintbrush, Accessibility, BarChart, Lock, Wrench } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  frameworks: <Layout className="w-5 h-5" />,
  languages: <Code2 className="w-5 h-5" />,
  stateManagement: <Database className="w-5 h-5" />,
  uiDevelopment: <Terminal className="w-5 h-5" />,
  performance: <Zap className="w-5 h-5" />,
  styling: <Paintbrush className="w-5 h-5" />,
  accessibility: <Accessibility className="w-5 h-5" />,
  dataVisualization: <BarChart className="w-5 h-5" />,
  authentication: <Lock className="w-5 h-5" />,
  tools: <Wrench className="w-5 h-5" />
}

const formatTitle = (key: string) => {
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export default function Skills() {
  const { playHover } = useSound()

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-foreground/40 mb-4 block tracking-widest uppercase">
            {`/ Technical Arsenal`}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-6 hidden md:block">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Expertise</span>
          </h2>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-6 md:hidden">
            Skills
          </h2>
          <p className="text-base text-foreground/60 max-w-2xl mx-auto">
            A comprehensive overview of my technical capabilities, focusing on modern frontend architectures, performance optimization, and scalable UI development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(resumeData.skills).map(([category, skillsList], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={playHover}
              className="p-6 rounded-3xl border border-border/50 bg-secondary/10 backdrop-blur-md hover:bg-secondary/20 hover:border-border transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-background border border-border shadow-sm group-hover:scale-110 transition-transform text-foreground/70 group-hover:text-blue-500">
                  {iconMap[category] || <Code2 className="w-5 h-5" />}
                </div>
                <h3 className="font-semibold text-lg">{formatTitle(category)}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background/50 border border-border text-foreground/80 group-hover:border-blue-500/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
