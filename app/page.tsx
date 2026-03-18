// app/page.tsx

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import dynamic from "next/dynamic";

// Dynamically import below-the-fold sections to heavily reduce initial JS bundle & increase performance
const Skills = dynamic(() => import("./components/sections/Skills"), { ssr: true });
const Experience = dynamic(() => import("./components/sections/experience"), { ssr: true });
const Projects = dynamic(() => import("./components/sections/Projects"), { ssr: true });
const Education = dynamic(() => import("./components/sections/Education"), { ssr: true });
const Blog = dynamic(() => import("./components/sections/blog"), { ssr: true });
const Contact = dynamic(() => import("./components/sections/Contact"), { ssr: true });


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Blog />
      <Contact />
      <Footer />
    </main>
  )
}