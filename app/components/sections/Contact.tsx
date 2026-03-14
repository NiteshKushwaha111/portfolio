// components/sections/contact.tsx
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Github, Linkedin, MapPin, Phone } from 'lucide-react'
import { useSound } from './sound-provider'

export default function Contact() {
  const { playHover, playClick } = useSound()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const form = e.currentTarget
    const formData = new FormData(form)
    // Use the environment variable, falling back to a dummy string if missing to prevent FormData errors
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

            {/* <h3 className="text-2xl font-serif mb-8 relative z-10">Send a Message</h3> */}
            <h3 className="text-2xl font-serif mb-8 relative z-10">Send a Message</h3>

            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 flex flex-col items-center justify-center text-center py-12 space-y-6"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <Mail className="w-10 h-10 text-green-500" />
                  </motion.div>
                </div>
                <h4 className="text-3xl font-serif text-foreground">Message Sent!</h4>
                <p className="text-foreground/70 max-w-sm">
                  Thank you for reaching out. I've received your message and will get back to you shortly. You should also receive a confirmation email.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-8 px-6 py-3 rounded-xl border border-border/50 hover:bg-secondary/20 transition-colors text-sm font-medium"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Web3Forms Hidden Fields */}
                <input type="hidden" name="subject" value="New Submission from NK Portfolio" />
                <input type="hidden" name="from_name" value="Nitesh Kushwaha Portfolio" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                {/* Auto-response template for the sender */}
                <input type="hidden" name="autoresponse" value="Thank you for reaching out to Nitesh Kushwaha! I have received your message and will review it as soon as possible. Usually, I reply within 1-2 business days. Looking forward to connecting with you!" />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/70 pl-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full p-4 rounded-2xl bg-background/50 border border-border focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/70 pl-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full p-4 rounded-2xl bg-background/50 border border-border focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/70 pl-2">Message</label>
                  <textarea
                    name="message"
                    required
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full p-4 rounded-2xl bg-background/50 border border-border focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-foreground text-background font-semibold hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2 group/btn shadow-lg"
                  whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Mail className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
                </motion.button>

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center"
                  >
                    Something went wrong. Please try again or email me directly at niteshkushwaha603@gmail.com
                  </motion.div>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}