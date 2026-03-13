// app/page.tsx

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Blog from "./components/sections/blog";
import Contact from "./components/sections/Contact";
import Experience from "./components/sections/experience";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Blog />
      <Contact />
      <Footer />
    </main>
  )
}