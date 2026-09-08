// app/page.tsx
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import CommandPalette from "./components/CommandPalette";
import dynamic from "next/dynamic";

const StatsCounter = dynamic(() => import("./components/sections/StatsCounter"), { ssr: true });
const PerformanceScorecard = dynamic(() => import("./components/sections/PerformanceScorecard"), { ssr: true });
const Skills = dynamic(() => import("./components/sections/Skills"), { ssr: true });
const InteractivePlayground = dynamic(() => import("./components/sections/InteractivePlayground"), { ssr: true });
const Experience = dynamic(() => import("./components/sections/experience"), { ssr: true });
const Projects = dynamic(() => import("./components/sections/Projects"), { ssr: true });
const Testimonials = dynamic(() => import("./components/sections/Testimonials"), { ssr: true });
const Education = dynamic(() => import("./components/sections/Education"), { ssr: true });
const Contact = dynamic(() => import("./components/sections/Contact"), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/20">
      <CommandPalette />
      <Navbar />
      <Hero />
      <StatsCounter />
      <Skills />
      <InteractivePlayground />
      <PerformanceScorecard />
      <Experience />
      <Projects />
      <Testimonials />
      <Education />
      <Contact />
      <Footer />
    </main>
  )
}