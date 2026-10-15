// components/sections/Contact.tsx
'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { Mail, Github, Linkedin, MapPin, Phone, Check, Copy, Send, AlertCircle, ExternalLink, Sparkles } from 'lucide-react'
import { useSound } from './sound-provider'

interface ContactItem {
  icon: any
  title: string
  text: string
  copyText: string
  type: string
}

function ContactCard({
  item,
  copiedItem,
  onCopy
}: {
  item: ContactItem
  copiedItem: string | null
  onCopy: (text: string, type: string) => void
}) {
  const { playHover } = useSound()
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const Icon = item.icon

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => {
        playHover()
        setIsHovered(true)
      }}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative flex items-center justify-between p-5 rounded-2xl border border-border/70 bg-card/60 hover:border-border transition-all duration-300 group overflow-hidden shadow-sm"
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.09), transparent 60%)`
            : '',
        }}
      />

      <div className="flex items-center gap-4 relative z-10">
        <div className="p-3 rounded-2xl bg-background border border-border shadow-sm group-hover:scale-105 transition-transform shrink-0">
          <Icon className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <div className="text-xs font-mono text-foreground/50">{item.title}</div>
          <div className="text-xs sm:text-sm font-semibold text-foreground/90">{item.text}</div>
        </div>
      </div>

      <button
        onClick={() => onCopy(item.copyText, item.type)}
        className="relative z-10 p-2.5 rounded-xl bg-secondary/70 hover:bg-secondary text-foreground/60 hover:text-foreground text-xs transition-colors shrink-0"
        title={`Copy ${item.title}`}
      >
        {copiedItem === item.type ? (
          <Check className="w-4 h-4 text-emerald-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}

export default function Contact() {
  const { playHover, playClick } = useSound()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [copiedProfile, setCopiedProfile] = useState(false)

  // Form values state for mailto fallback
  const [formDataState, setFormDataState] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Form container spotlight
  const formRef = useRef<HTMLDivElement>(null)
  const [formMousePos, setFormMousePos] = useState({ x: 0, y: 0 })
  const [isFormHovered, setIsFormHovered] = useState(false)

  const handleFormMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!formRef.current) return
    const rect = formRef.current.getBoundingClientRect()
    setFormMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleCopy = (text: string, type: string) => {
    playClick()
    navigator.clipboard.writeText(text)
    setCopiedItem(type)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const handleCopyFullProfile = () => {
    playClick()
    const summary = `Nitesh Kushwaha
Role: MERN Stack Developer | Full Stack JavaScript Engineer
Experience: 3+ Years (Soluzione IT Services: June 2023 – July 2026)
Email: niteshkushwaha603@gmail.com
Phone: +91 83499 45280
Location: Bhopal, MP, India
Portfolio: https://niteshwebdev-portfolio.vercel.app/
LinkedIn: https://www.linkedin.com/in/nitesh-kushwaha-dev/
GitHub: https://github.com/NiteshKushwaha111
Availability: Available to Join Immediately
Core Stack: React.js, Next.js, Node.js, Express.js, MongoDB, REST APIs, TypeScript, Angular, SSR`
    
    navigator.clipboard.writeText(summary)
    setCopiedProfile(true)
    setTimeout(() => setCopiedProfile(false), 2500)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    const form = e.currentTarget
    const formData = new FormData(form)
    
    // Check key
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
    if (!accessKey) {
      // If no key is configured in environment, trigger graceful fallback
      setIsSubmitting(false)
      setSubmitStatus("error")
      setErrorMessage("Direct API key not detected in environment. Use the 1-click email client fallback below!")
      return
    }

    formData.append("access_key", accessKey)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()
      if (data.success) {
        setSubmitStatus("success")
        form.reset()
        setFormDataState({ name: '', email: '', message: '' })
      } else {
        console.warn("Form submission API error", data)
        setSubmitStatus("error")
        setErrorMessage(data.message || "Failed to deliver message via Web3Forms API.")
      }
    } catch (error: any) {
      console.warn("Form submission network error", error)
      setSubmitStatus("error")
      setErrorMessage("Network error or connection blocked. You can still send directly via email!")
    } finally {
      setIsSubmitting(false)
    }
  }

  const mailtoUrl = `mailto:niteshkushwaha603@gmail.com?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${formDataState.name || 'Recruiter / Client'}`
  )}&body=${encodeURIComponent(
    `Hi Nitesh,\n\nName: ${formDataState.name || 'Not provided'}\nEmail: ${formDataState.email || 'Not provided'}\n\nMessage:\n${formDataState.message || 'I would like to connect regarding an opportunity.'}`
  )}`

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
          {/* Contact Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="space-y-3.5">
              {[
                { icon: Mail, title: "Email Address", text: "niteshkushwaha603@gmail.com", copyText: "niteshkushwaha603@gmail.com", type: "email" },
                { icon: Phone, title: "Direct Phone", text: "+91 83499 45280", copyText: "+918349945280", type: "phone" },
                { icon: MapPin, title: "Location", text: "Bhopal, MP, India", copyText: "Bhopal, MP, India", type: "location" },
              ].map((item) => (
                <ContactCard
                  key={item.title}
                  item={item}
                  copiedItem={copiedItem}
                  onCopy={handleCopy}
                />
              ))}
            </div>

            {/* Recruiter 1-Click Complete Profile Copy Card */}
            <div className="p-5 rounded-2xl border border-blue-500/30 bg-blue-500/5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Recruiter Quick Kit
                </span>
                <span className="text-[10px] font-mono text-foreground/50">ATS-Ready</span>
              </div>
              <p className="text-xs text-foreground/70 mb-3.5 leading-relaxed">
                Copy complete contact block and verified qualifications in one click for your interview notes.
              </p>
              <button
                onClick={handleCopyFullProfile}
                onMouseEnter={playHover}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {copiedProfile ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Profile Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Full Contact Sheet</span>
                  </>
                )}
              </button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              {[
                { icon: Github, href: "https://github.com/NiteshKushwaha111", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/nitesh-kushwaha-dev", label: "LinkedIn" },
              ].map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-2xl border border-border/70 bg-card/60 hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 shadow-sm"
                  whileHover={{ y: -3, scale: 1.05 }}
                  onMouseEnter={playHover}
                  onClick={playClick}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}

              <a
                href="mailto:niteshkushwaha603@gmail.com"
                className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-border/70 bg-card/60 hover:bg-secondary text-xs font-semibold text-foreground/80 hover:text-foreground transition-all"
                onMouseEnter={playHover}
                onClick={playClick}
              >
                <Mail className="w-4 h-4 text-blue-500" />
                <span>Open Mail App</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsFormHovered(true)}
            onMouseLeave={() => setIsFormHovered(false)}
            onMouseMove={handleFormMouseMove}
            className="lg:col-span-3 p-8 md:p-10 rounded-3xl border border-border/70 bg-card/60 backdrop-blur-xl relative overflow-hidden shadow-sm"
          >
            {/* Spotlight Glow */}
            <div
              className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: isFormHovered
                  ? `radial-gradient(550px circle at ${formMousePos.x}px ${formMousePos.y}px, rgba(59, 130, 246, 0.08), transparent 60%)`
                  : '',
              }}
            />

            <h3 className="text-2xl font-serif mb-2 relative z-10 font-semibold">Send a Direct Message</h3>
            <p className="text-xs sm:text-sm text-foreground/60 mb-6 relative z-10">
              Have an open role or contract opportunity? Leave a message and I'll get back within 24 hours.
            </p>

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
                  Thank you for reaching out. I've received your inquiry and will respond promptly.
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

                {/* Error Banner with Graceful Mailto Fallback */}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-foreground text-xs space-y-2"
                  >
                    <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage || "Direct form submission unavailable."}</span>
                    </div>
                    <p className="text-foreground/75 leading-relaxed">
                      You can instantly send your message via your email app with your entered message pre-filled:
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={mailtoUrl}
                        className="px-4 py-2 rounded-xl bg-foreground text-background font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" /> Launch Default Mail Client
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(formDataState.message || 'Inquiry regarding full stack opportunity')
                          handleCopy(formDataState.message, 'form-msg')
                        }}
                        className="px-3.5 py-2 rounded-xl border border-border bg-background hover:bg-secondary text-xs font-medium text-foreground/80"
                      >
                        {copiedItem === 'form-msg' ? 'Copied Message!' : 'Copy Message Text'}
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/70 pl-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formDataState.name}
                      onChange={(e) => setFormDataState({ ...formDataState, name: e.target.value })}
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
                      value={formDataState.email}
                      onChange={(e) => setFormDataState({ ...formDataState, email: e.target.value })}
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
                    value={formDataState.message}
                    onChange={(e) => setFormDataState({ ...formDataState, message: e.target.value })}
                    placeholder="Tell me about your project, team requirements, or role opportunities..."
                    rows={4}
                    className="w-full p-3.5 rounded-2xl bg-background/60 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-xs sm:text-sm transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 rounded-2xl bg-foreground text-background font-semibold hover:opacity-90 disabled:opacity-70 transition-all flex justify-center items-center gap-2 shadow-md text-xs sm:text-sm"
                    whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    onMouseEnter={playHover}
                    onClick={playClick}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <Send className="w-4 h-4" />}
                  </motion.button>

                  <a
                    href={mailtoUrl}
                    className="px-5 py-3.5 rounded-2xl border border-border bg-secondary/70 hover:bg-secondary text-foreground/80 hover:text-foreground font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
                    title="Send using your default mail app"
                  >
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span>Open in Email App</span>
                  </a>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}