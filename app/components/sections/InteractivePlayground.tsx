// app/components/sections/InteractivePlayground.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ShieldAlert, ShieldCheck, Zap, Plus, Trash2, CheckCircle2, Lock, Layout, RefreshCw, Terminal, Eye, Code, Flame } from 'lucide-react'
import { useSound } from './sound-provider'

type Role = 'Admin' | 'Assessor' | 'Applicant' | 'Viewer'

const rolesConfig: Record<Role, { permissions: string[]; badgeColor: string; description: string }> = {
  Admin: {
    permissions: [
      'Read Platform Analytics',
      'Submit Qualification Forms',
      'Approve Enterprise Qualifications',
      'Write & Modify Configurations',
      'Manage RBAC User Roles',
      'Execute Production Deployments'
    ],
    badgeColor: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
    description: 'Full administrative rights with write, approval, deployment, and security controls.'
  },
  Assessor: {
    permissions: [
      'Read Platform Analytics',
      'Approve Enterprise Qualifications',
      'Export Audit Logs'
    ],
    badgeColor: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
    description: 'Technical evaluation rights to review, score, and certify enterprise applications.'
  },
  Applicant: {
    permissions: [
      'Read Platform Analytics',
      'Submit Qualification Forms'
    ],
    badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    description: 'End-user access to fill multi-step dynamic forms and upload compliance credentials.'
  },
  Viewer: {
    permissions: [
      'Read Platform Analytics'
    ],
    badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
    description: 'Read-only access for external compliance auditors and non-editing stakeholders.'
  }
}

export default function InteractivePlayground() {
  const { playHover, playClick } = useSound()
  const [activeDemo, setActiveDemo] = useState<'rbac' | 'forms' | 'ssr'>('rbac')

  // Container spotlight
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // RBAC State
  const [selectedRole, setSelectedRole] = useState<Role>('Admin')
  const [actionTestResult, setActionTestResult] = useState<{
    action: string
    granted: boolean
    message: string
  } | null>(null)

  const testAction = (actionName: string, requiredPerm: string) => {
    playClick()
    const isAllowed = rolesConfig[selectedRole].permissions.includes(requiredPerm)
    if (isAllowed) {
      setActionTestResult({
        action: actionName,
        granted: true,
        message: `HTTP 200 OK — Authorized by ${selectedRole} permission policy: "${requiredPerm}"`
      })
    } else {
      setActionTestResult({
        action: actionName,
        granted: false,
        message: `HTTP 403 Forbidden — ${selectedRole} lacks required policy: "${requiredPerm}"`
      })
    }
  }

  // Dynamic Form State
  const [formFields, setFormFields] = useState<Array<{ id: number; name: string; type: string; required: boolean }>>([
    { id: 1, name: 'Applicant Legal Entity Name', type: 'text', required: true },
    { id: 2, name: 'Liability Coverage Limit ($)', type: 'number', required: true },
    { id: 3, name: 'Accreditation Review Period', type: 'select', required: false },
  ])
  const [fieldName, setFieldName] = useState('')
  const [showJsonSchema, setShowJsonSchema] = useState(false)

  const handleAddField = () => {
    if (!fieldName.trim()) return
    playClick()
    setFormFields([...formFields, { id: Date.now(), name: fieldName.trim(), type: 'text', required: true }])
    setFieldName('')
  }

  const handleRemoveField = (id: number) => {
    playClick()
    setFormFields(formFields.filter(f => f.id !== id))
  }

  const handleResetForm = () => {
    playClick()
    setFormFields([
      { id: 1, name: 'Applicant Legal Entity Name', type: 'text', required: true },
      { id: 2, name: 'Liability Coverage Limit ($)', type: 'number', required: true },
      { id: 3, name: 'Accreditation Review Period', type: 'select', required: false },
    ])
  }

  // SSR Toggle State & Traffic Spike
  const [isSSRMode, setIsSSRMode] = useState<boolean>(true)
  const [isSpikeSimulated, setIsSpikeSimulated] = useState<boolean>(false)

  return (
    <section id="playground" className="py-28 relative bg-secondary/5 border-y border-border/40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-foreground/50 mb-3 block tracking-widest uppercase">
            / ARCHITECTURAL SIMULATIONS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4 text-foreground">
            Full-Stack Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Playground</span>
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Interactive live demonstrations of core architecture patterns engineered in production: Role-Based Access Control (RBAC), Dynamic Form Engines, and Server-Side Rendering (SSR) Performance.
          </p>
        </motion.div>

        {/* Demo Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 bg-secondary/50 p-2 rounded-2xl border border-border/60 max-w-lg mx-auto shadow-sm">
          {[
            { id: 'rbac', label: 'RBAC Permission Guard', icon: Shield },
            { id: 'forms', label: 'Dynamic Form Array Engine', icon: Layout },
            { id: 'ssr', label: 'SSR Performance Telemetry', icon: Zap },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClick()
                  setActiveDemo(tab.id as any)
                }}
                onMouseEnter={playHover}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                  activeDemo === tab.id
                    ? 'bg-foreground text-background shadow-md'
                    : 'text-foreground/70 hover:text-foreground hover:bg-secondary/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Demo Display Card with Spotlight */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          className="relative bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-xl min-h-[440px] overflow-hidden"
        >
          {/* Spotlight Glow */}
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: isHovered
                ? `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.08), transparent 60%)`
                : '',
            }}
          />

          <AnimatePresence mode="wait">
            {/* DEMO 1: RBAC SIMULATOR */}
            {activeDemo === 'rbac' && (
              <motion.div
                key="rbac"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8 relative z-10"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-foreground flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-blue-500" /> Granular RBAC Permission Gate
                    </h3>
                    <p className="text-xs text-foreground/60 mt-1 font-sans">
                      Simulates route guards, HTTP action dispatchers, and conditional rendering based on active JWT claims.
                    </p>
                  </div>

                  {/* Role Pills */}
                  <div className="flex flex-wrap gap-2">
                    {(['Admin', 'Assessor', 'Applicant', 'Viewer'] as Role[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          playClick()
                          setSelectedRole(r)
                          setActionTestResult(null)
                        }}
                        onMouseEnter={playHover}
                        className={`px-3 py-1.5 text-xs font-mono font-medium rounded-xl border transition-all ${
                          selectedRole === r
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                            : 'bg-secondary/60 border-border text-foreground/70 hover:text-foreground'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Role Profile & Gate Checklist */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-secondary/20 border border-border/60 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-foreground/50">Active Role Policy</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border font-semibold ${rolesConfig[selectedRole].badgeColor}`}>
                          {selectedRole}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-sans mb-6">
                        {rolesConfig[selectedRole].description}
                      </p>
                    </div>

                    {/* Interactive Action Test Dispatcher */}
                    <div className="border-t border-border/50 pt-4 space-y-3">
                      <span className="text-xs font-mono text-foreground/60 block font-semibold">
                        Test Simulated API Request:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => testAction('Deploy to Production', 'Execute Production Deployments')}
                          className="px-3 py-1.5 rounded-xl bg-background border border-border hover:border-blue-500/50 text-xs font-mono text-foreground/80 hover:text-foreground transition-all"
                        >
                          Deploy Prod
                        </button>
                        <button
                          onClick={() => testAction('Modify RBAC Rules', 'Manage RBAC User Roles')}
                          className="px-3 py-1.5 rounded-xl bg-background border border-border hover:border-blue-500/50 text-xs font-mono text-foreground/80 hover:text-foreground transition-all"
                        >
                          Modify RBAC
                        </button>
                        <button
                          onClick={() => testAction('Approve Enterprise Form', 'Approve Enterprise Qualifications')}
                          className="px-3 py-1.5 rounded-xl bg-background border border-border hover:border-blue-500/50 text-xs font-mono text-foreground/80 hover:text-foreground transition-all"
                        >
                          Approve Forms
                        </button>
                      </div>

                      {/* Result Feedback Banner */}
                      {actionTestResult && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`p-3 rounded-xl border text-xs font-mono flex items-start gap-2 ${
                            actionTestResult.granted
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                              : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {actionTestResult.granted ? (
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
                          ) : (
                            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                          )}
                          <div>
                            <div className="font-bold">{actionTestResult.action}</div>
                            <div className="text-[11px] opacity-90">{actionTestResult.message}</div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Permission Gate Checklist */}
                  <div className="p-6 rounded-2xl bg-secondary/20 border border-border/60 space-y-2.5">
                    <div className="text-xs font-mono text-foreground/50 mb-2 flex items-center justify-between">
                      <span>Gate Policy Matrix</span>
                      <span className="text-[10px]">Auto-Evaluated</span>
                    </div>
                    {[
                      'Read Platform Analytics',
                      'Submit Qualification Forms',
                      'Approve Enterprise Qualifications',
                      'Write & Modify Configurations',
                      'Manage RBAC User Roles',
                      'Execute Production Deployments'
                    ].map((perm) => {
                      const isGranted = rolesConfig[selectedRole].permissions.includes(perm)
                      return (
                        <div
                          key={perm}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all ${
                            isGranted
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                              : 'bg-secondary/40 border-border/40 text-foreground/40'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {isGranted ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" /> : <Lock className="w-4 h-4 shrink-0 opacity-40" />}
                            {perm}
                          </span>
                          <span className="font-mono text-[10px] font-bold">
                            {isGranted ? 'GRANTED' : 'DENIED'}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* DEMO 2: DYNAMIC FORM ENGINE */}
            {activeDemo === 'forms' && (
              <motion.div
                key="forms"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 relative z-10"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-foreground flex items-center gap-2">
                      <Layout className="w-5 h-5 text-purple-500" /> Reactive Nested FormArray Builder
                    </h3>
                    <p className="text-xs text-foreground/60 mt-1 font-sans">
                      Engineered for enterprise accreditation platforms managing 80+ dynamic compliance sections.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowJsonSchema(!showJsonSchema)}
                      className="px-3.5 py-1.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-xs font-mono text-foreground flex items-center gap-1.5 transition-colors"
                    >
                      <Code className="w-3.5 h-3.5 text-purple-500" />
                      {showJsonSchema ? 'Hide JSON Schema' : 'View Generated JSON'}
                    </button>
                    <button
                      onClick={handleResetForm}
                      className="px-3 py-1.5 rounded-xl border border-border bg-background hover:bg-secondary text-xs font-mono text-foreground/60 hover:text-foreground transition-colors"
                      title="Reset form to defaults"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddField()}
                    placeholder="Enter dynamic field label (e.g. Audit Policy ID, Insured Amount)..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border text-xs focus:border-purple-500 outline-none"
                  />
                  <button
                    onClick={handleAddField}
                    onMouseEnter={playHover}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add Dynamic Field
                  </button>
                </div>

                {/* Show JSON Schema Viewer */}
                {showJsonSchema ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 rounded-2xl bg-secondary/80 border border-border font-mono text-[11px] text-foreground/80 max-h-56 overflow-y-auto"
                  >
                    <pre>{JSON.stringify(formFields, null, 2)}</pre>
                  </motion.div>
                ) : (
                  <div className="space-y-2.5 pt-1">
                    {formFields.map((field) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/30 border border-border/60 hover:border-border transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-purple-500" />
                          <span className="text-xs font-medium text-foreground">{field.name}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-background text-foreground/50 border border-border">
                            Type: {field.type}
                          </span>
                          {field.required && (
                            <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-semibold">
                              Required
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemoveField(field.id)}
                          className="p-1.5 text-foreground/40 hover:text-rose-500 transition-colors"
                          title="Remove Field"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* DEMO 3: SSR BENCHMARK COMPARATOR */}
            {activeDemo === 'ssr' && (
              <motion.div
                key="ssr"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 relative z-10"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-foreground flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" /> Next.js SSR vs Legacy Client SPA
                    </h3>
                    <p className="text-xs text-foreground/60 mt-1 font-sans">
                      Visualizing the exact 167% Lighthouse score boost achieved on Boarding Schools of India (30 → 80+).
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        playClick()
                        setIsSSRMode(!isSSRMode)
                      }}
                      onMouseEnter={playHover}
                      className="px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Toggle Mode: {isSSRMode ? 'Next.js SSR' : 'Legacy Client SPA'}
                    </button>
                    <button
                      onClick={() => {
                        playClick()
                        setIsSpikeSimulated(!isSpikeSimulated)
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-medium border flex items-center gap-1.5 transition-colors ${
                        isSpikeSimulated 
                          ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40' 
                          : 'bg-secondary border-border text-foreground/70 hover:text-foreground'
                      }`}
                      title="Simulate 10,000 req/min traffic surge"
                    >
                      <Flame className="w-3.5 h-3.5" /> {isSpikeSimulated ? 'Traffic Surge: ON' : 'Simulate Spike'}
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-secondary/20 border border-border/60 text-center">
                    <div className="text-xs font-mono text-foreground/50 mb-2">Lighthouse Score</div>
                    <div className={`text-4xl font-bold font-mono transition-colors ${isSSRMode ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {isSSRMode ? '84 / 100' : '30 / 100'}
                    </div>
                    <div className="text-[11px] text-foreground/60 mt-2 font-mono">
                      {isSSRMode ? '+167% Score Boost' : 'Heavy Client Bundle'}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-secondary/20 border border-border/60 text-center">
                    <div className="text-xs font-mono text-foreground/50 mb-2">First Contentful Paint (FCP)</div>
                    <div className={`text-4xl font-bold font-mono transition-colors ${isSSRMode ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {isSSRMode ? (isSpikeSimulated ? '1.0s' : '0.9s') : (isSpikeSimulated ? '6.8s' : '3.4s')}
                    </div>
                    <div className="text-[11px] text-foreground/60 mt-2 font-mono">
                      {isSSRMode ? '73% Faster Paint' : 'Render-Blocking JS'}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-secondary/20 border border-border/60 text-center">
                    <div className="text-xs font-mono text-foreground/50 mb-2">Total Blocking Time (TBT)</div>
                    <div className={`text-4xl font-bold font-mono transition-colors ${isSSRMode ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {isSSRMode ? (isSpikeSimulated ? '65ms' : '45ms') : (isSpikeSimulated ? '1,820ms' : '850ms')}
                    </div>
                    <div className="text-[11px] text-foreground/60 mt-2 font-mono">
                      {isSSRMode ? 'Edge CDN Cached' : 'Main-thread Freezes'}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
