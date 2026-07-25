// components/sections/Contact.tsx
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Github, Linkedin, MapPin, Phone, Check, Copy } from 'lucide-react'
import { useSound } from './sound-provider'

export default function Contact() {
  const { playHover, playClick } = useSound()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const handleCopy = (text: string, type: string) => {
    playClick()
    navigator.clipboard.writeText(text)
    setCopiedItem(type)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "fallback_key_missing")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json();
      if (data.success) {
        setSubmitStatus("success")
        form.reset()
      } else {
        console.error("Form submission failed", data)
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Form submission error", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-foreground/50 mb-3 block tracking-widest uppercase">
            / Let's Connect
          </span>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight mb-4">
            Ready to Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Impactful?</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            I'm currently available for full-stack & frontend engineering roles, enterprise platform contracts, and technical collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="space-y-4">
              {[
                { icon: Mail, title: "Email", text: "niteshkushwaha603@gmail.com", copyText: "niteshkushwaha603@gmail.com", type: "email" },
                { icon: Phone, title: "Phone", text: "+91 83499 45280", copyText: "+918349945280", type: "phone" },
                { icon: MapPin, title: "Location", text: "Bhopal, MP, India", copyText: "Bhopal, MP, India", type: "location" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between p-5 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-md hover:border-border transition-all duration-300 group"
                  onMouseEnter={playHover}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-background border border-border shadow-sm group-hover:scale-105 transition-transform">
                      <item.icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-foreground/50">{item.title}</div>
                      <div className="text-xs sm:text-sm font-semibold text-foreground/90">{item.text}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(item.copyText, item.type)}
                    className="p-2 rounded-xl bg-secondary/60 hover:bg-secondary text-foreground/60 hover:text-foreground text-xs transition-colors"
                    title={`Copy ${item.title}`}
                  >
                    {copiedItem === item.type ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-4 pt-2">
              {[
                { icon: Github, href: "https://github.com/NiteshKushwaha111", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/nitesh-kushwaha-dev", label: "LinkedIn" },
              ].map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-2xl border border-border/60 bg-card/60 hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 shadow-sm"
                  whileHover={{ y: -4, scale: 1.05 }}
                  onMouseEnter={playHover}
                  onClick={playClick}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 p-8 md:p-10 rounded-3xl border border-border/70 bg-card/60 backdrop-blur-xl relative overflow-hidden shadow-sm"
          >
            <h3 className="text-2xl font-serif mb-6 relative z-10 font-semibold">Send a Direct Message</h3>

            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 flex flex-col items-center justify-center text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-2">
                  <Check className="w-8 h-8 text-emerald-500" />
                </div>
                <h4 className="text-2xl font-serif text-foreground font-bold">Message Sent Successfully!</h4>
                <p className="text-xs sm:text-sm text-foreground/70 max-w-sm">
                  Thank you for reaching out. I've received your message and will respond within 1-2 business days.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-4 px-5 py-2.5 rounded-xl border border-border hover:bg-secondary transition-colors text-xs font-medium"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <input type="hidden" name="subject" value="New Inquiry from Portfolio - Nitesh Kushwaha" />
                <input type="hidden" name="from_name" value="Nitesh Kushwaha Portfolio" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/70 pl-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name"
                      className="w-full p-3.5 rounded-2xl bg-background/60 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-xs sm:text-sm transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/70 pl-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full p-3.5 rounded-2xl bg-background/60 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-xs sm:text-sm transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground/70 pl-1">Message</label>
                  <textarea
                    name="message"
                    required
                    placeholder="Tell me about your project or role opportunities..."
                    rows={4}
                    className="w-full p-3.5 rounded-2xl bg-background/60 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-xs sm:text-sm transition-all resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-foreground text-background font-semibold hover:opacity-90 disabled:opacity-70 transition-all flex justify-center items-center gap-2 shadow-md text-xs sm:text-sm"
                  whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Mail className="w-4 h-4" />}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}