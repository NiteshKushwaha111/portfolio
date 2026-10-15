// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 bg-card/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-xs sm:text-sm font-mono text-foreground/70">
              © {new Date().getFullYear()} Nitesh Kushwaha • All rights reserved.
            </p>
            <p className="text-[11px] text-foreground/50 mt-1">
              MERN Stack Developer | Full Stack JavaScript Engineer
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-xs font-medium text-foreground/60">
            <a href="#projects" className="hover:text-foreground transition">Projects</a>
            <a href="#skills" className="hover:text-foreground transition">Skills</a>
            <a href="#experience" className="hover:text-foreground transition">Experience</a>
            <a href="#playground" className="hover:text-foreground transition">Playground</a>
            <a href="#about" className="hover:text-foreground transition">About</a>
            <a href="#contact" className="hover:text-foreground transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}