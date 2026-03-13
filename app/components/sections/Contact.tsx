// components/sections/contact.tsx
'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, MapPin, Phone } from 'lucide-react'
import { useSound } from './sound-provider'

export default function Contact() {
  const { playHover, playClick } = useSound()

  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <span className="text-sm font-mono text-foreground/40 mb-4 block tracking-widest uppercase">
            {`/ Let's Connect`}
          </span>
          <h2 className="font-serif text-5xl md:text-6xl tracking-tight mb-6">
            Ready to Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Impactful?</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            {`I'm currently available for freelance projects, open-source collaborations, and exciting frontend roles. Let's create scalable platforms and modern user experiences together.`}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info - takes up 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-4">
              {[
                { icon: Mail, title: "Email", text: "niteshkushwaha603@gmail.com", href: "mailto:niteshkushwaha603@gmail.com", hoverStr: "hover:border-blue-500/50 hover:bg-blue-500/5" },
                { icon: Phone, title: "Phone", text: "+91 83499 45280", href: "tel:+918349945280", hoverStr: "hover:border-green-500/50 hover:bg-green-500/5" },
                { icon: MapPin, title: "Location", text: "Bhopal, MP, India", href: "#", hoverStr: "hover:border-purple-500/50 hover:bg-purple-500/5" },
              ].map((item) => (
                <motion.a
                  key={item.text}
                  href={item.href}
                  className={`flex flex-col gap-2 p-6 rounded-2xl border border-border/50 bg-secondary/10 transition-all duration-300 group ${item.hoverStr}`}
                  whileHover={{ y: -4, scale: 1.01 }}
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-background border border-border shadow-sm group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-foreground/70 group-hover:text-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground/50">{item.title}</div>
                      <div className="text-foreground/90 font-medium">{item.text}</div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-4 pt-4">
              {[
                { icon: Github, href: "https://github.com/niteshwebdev", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/niteshkushwaha", label: "LinkedIn" },
              ].map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 rounded-2xl border border-border/50 bg-secondary/10 hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 group shadow-sm"
                  whileHover={{ y: -5, scale: 1.05 }}
                  onMouseEnter={playHover}
                  onClick={playClick}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Premium Contact Form - takes up 3 cols */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 p-8 md:p-10 rounded-3xl border border-border/50 bg-secondary/5 backdrop-blur-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />
            
            <h3 className="text-2xl font-serif mb-8 relative z-10">Send a Message</h3>
            <form className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/70 pl-2">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full p-4 rounded-2xl bg-background/50 border border-border focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/70 pl-2">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full p-4 rounded-2xl bg-background/50 border border-border focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/70 pl-2">Message</label>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="w-full p-4 rounded-2xl bg-background/50 border border-border focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full py-4 rounded-2xl bg-foreground text-background font-semibold hover:opacity-90 transition-all flex justify-center items-center gap-2 group/btn shadow-lg"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={playHover}
                onClick={playClick}
              >
                Send Message
                <Mail className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}