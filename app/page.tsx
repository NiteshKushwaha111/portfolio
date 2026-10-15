// app/page.tsx
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import CommandPalette from "./components/CommandPalette";
import KeyboardShortcutsModal from "./components/KeyboardShortcutsModal";
import dynamic from "next/dynamic";

const StatsCounter = dynamic(() => import("./components/sections/StatsCounter"), { ssr: true });
const Projects = dynamic(() => import("./components/sections/Projects"), { ssr: true });
const Skills = dynamic(() => import("./components/sections/Skills"), { ssr: true });
const Experience = dynamic(() => import("./components/sections/experience"), { ssr: true });
const InteractivePlayground = dynamic(() => import("./components/sections/InteractivePlayground"), { ssr: true });
const PerformanceScorecard = dynamic(() => import("./components/sections/PerformanceScorecard"), { ssr: true });
const Education = dynamic(() => import("./components/sections/Education"), { ssr: true });
const Contact = dynamic(() => import("./components/sections/Contact"), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen bg-background bg-ambient-grid text-foreground selection:bg-blue-500/20 relative">
      <CommandPalette />
      <KeyboardShortcutsModal />
      <Navbar />
      
      {/* 1. Hero and Primary CTAs */}
      <Hero />

      {/* Verified Achievement Metrics Strip */}
      <StatsCounter />

      {/* 2. Selected Projects (Visually Prominent) */}
      <Projects />

      {/* 3. Technical Skills */}
      <Skills />

      {/* 4. Professional Experience */}
      <Experience />

      {/* 5. Engineering Playground & Interactive Demos */}
      <InteractivePlayground />
      <PerformanceScorecard />

      {/* 6. About Me & Education */}
      <Education />

      {/* 7. Contact */}
      <Contact />

      <Footer />
    </main>
  );
}