// components/sections/blog.tsx
'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { useSound } from './sound-provider'

const blogPosts = [
  {
    title: "How to Fix Dark Mode Flicker in Next.js",
    excerpt: "Learn how to prevent the annoying flash of incorrect theme when implementing dark mode in Next.js applications with SSR.",
    date: "Feb 15, 2026",
    readTime: "5 min read",
    slug: "fix-dark-mode-flicker-nextjs",
    link: "https://medium.com/"
  },
  {
    title: "Building Complex Reactive Forms in Angular",
    excerpt: "A deep dive into creating dynamic, nested forms with FormArrays, custom validators, and cross-field validation.",
    date: "Jan 28, 2026",
    readTime: "8 min read",
    slug: "complex-reactive-forms-angular",
    link: "https://medium.com/"
  },
  {
    title: "RBAC Implementation Guide for Enterprise Apps",
    excerpt: "How to design and implement scalable role-based access control systems in React and Next.js applications.",
    date: "Jan 10, 2026",
    readTime: "6 min read",
    slug: "rbac-implementation-guide",
    link: "https://medium.com/"
  }
]

export default function Blog() {
  const { playHover, playClick } = useSound()

  return (
    <section id="blog" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-mono text-foreground/40 mb-4 block">
            / THOUGHTS & INSIGHTS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl gradient-text">
            Latest Writing
          </h2>
        </motion.div>

        <div className="space-y-6">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ x: 10 }}
              className="group cursor-pointer"
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                if (post.link) window.open(post.link, '_blank');
              }}
            >
              <div className="p-6 rounded-2xl border border-border hover:bg-secondary/30 transition-all duration-300">
                <h3 className="text-2xl font-serif mb-3 group-hover:gradient-text transition-all">
                  {post.title}
                </h3>
                
                <p className="text-foreground/60 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-foreground/40">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>

                {/* Reading indicator */}
                <div className="mt-4 h-px bg-border w-0 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}