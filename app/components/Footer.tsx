// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 bg-card/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-xs sm:text-sm font-mono text-foreground/60">
              © {new Date().getFullYear()} Nitesh Kushwaha • All rights reserved.
            </p>
            <p className="text-[11px] text-foreground/40 mt-1">
              Frontend Engineer specializing in Angular, React, Next.js & Full-Stack MEAN
            </p>
          </div>
          
          <div className="flex gap-6 text-xs font-medium text-foreground/60">
            <a href="#skills" className="hover:text-foreground transition">Skills</a>
            <a href="#experience" className="hover:text-foreground transition">Experience</a>
            <a href="#projects" className="hover:text-foreground transition">Projects</a>
            <a href="#testimonials" className="hover:text-foreground transition">Testimonials</a>
            <a href="#contact" className="hover:text-foreground transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}