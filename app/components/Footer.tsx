// components/footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-foreground/40">
              © {new Date().getFullYear()} Nitesh Kushwaha
            </p>
            <p className="text-xs text-foreground/30 mt-1">
              Built with Next.js, Tailwind, and Framer Motion
            </p>
          </div>
          
          <div className="flex gap-8 text-sm text-foreground/40">
            <a href="#experience" className="hover:text-foreground transition">Experience</a>
            <a href="#projects" className="hover:text-foreground transition">Projects</a>
            <a href="#blog" className="hover:text-foreground transition">Blog</a>
          </div>
        </div>
      </div>
    </footer>
  )
}