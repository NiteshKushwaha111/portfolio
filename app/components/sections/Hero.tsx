// components/sections/Hero.tsx
'use client'

import { motion, Variants } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useSound } from './sound-provider'
import { resumeData } from '../../lib/resume'
import dynamic from 'next/dynamic'

// Dynamically import the Canvas so it doesn't break SSR
const ParticleBackground = dynamic(() => import('./ParticleCanvas'), {
  ssr: false,
})

export default function Hero() {
  const { playHover, playClick } = useSound()

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Particle Background Wrapper */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleBackground />
      </div>

      <motion.div 
        className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
      >
        {/* Top styling branding */}
        <motion.div variants={itemVariants} className="mb-4 inline-flex items-center space-x-2">
          <span className="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 tracking-tighter">
            {"^"} NK Portfolio
          </span>
        </motion.div>

        {/* Main Title mimicking the "You have successfully authenticated" style but with their name */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-4 text-foreground drop-shadow-sm"
        >
          {resumeData.personalInfo.name}
        </motion.h1>

        {/* Dynamic Role */}
        <motion.div variants={itemVariants} className="mb-6 h-10 md:h-12 flex justify-center text-xl md:text-2xl text-foreground/80">
          <TypeAnimation
            sequence={[
              'Frontend Developer', 2000,
              'Angular Specialist', 2000,
              'Next.js Expert', 2000,
              'UI/UX Enthusiast', 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="font-medium"
          />
        </motion.div>

        {/* Minimalist Subtext */}
        <motion.p 
          variants={itemVariants}
          className="text-sm md:text-base text-foreground/60 max-w-xl mx-auto mb-10 leading-relaxed font-sans"
        >
          {resumeData.personalInfo.summary.split('.')[0]}. {resumeData.personalInfo.summary.split('.')[1]}.
        </motion.p>

        {/* CTAs styled like minimal docs/twitter links or buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center items-center text-sm font-medium">
          <a
             href="#projects"
             className="px-6 py-2.5 rounded-full bg-foreground text-background hover:scale-105 transition-transform shadow-md"
             onMouseEnter={playHover}
             onClick={playClick}
          >
            Explore Projects
          </a>
          
          <div className="w-px h-6 bg-border mx-2 hidden sm:block"></div>
          
          <a
            href="/Resume.pdf"
            className="text-blue-500 hover:text-blue-600 transition-colors"
            onMouseEnter={playHover}
            onClick={playClick}
          >
            Download Resume
          </a>
          <span className="text-border mx-1">|</span>
          <a
            href={`mailto:${resumeData.personalInfo.email}`}
            className="text-blue-500 hover:text-blue-600 transition-colors"
            onMouseEnter={playHover}
            onClick={playClick}
          >
            Contact
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}