// app/components/sections/InteractivePlayground.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ShieldAlert, ShieldCheck, Zap, Plus, Trash2, CheckCircle2, Lock, Layout, RefreshCw } from 'lucide-react'
import { useSound } from './sound-provider'

type Role = 'Admin' | 'Assessor' | 'Applicant' | 'Viewer'

const rolesConfig: Record<Role, { permissions: string[]; badgeColor: string; description: string }> = {
  Admin: {
    permissions: ['Read Platform Analytics', 'Write & Modify Configurations', 'Approve Enterprise Qualifications', 'Manage RBAC User Roles', 'Export Audit Logs'],
    badgeColor: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
    description: 'Full administrative rights with write, approval, and security controls.'
  },
  Assessor: {
    permissions: ['Read Platform Analytics', 'Approve Enterprise Qualifications', 'Export Audit Logs'],
    badgeColor: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
    description: 'Technical evaluation rights to review and score applications.'
  },
  Applicant: {
    permissions: ['Read Platform Analytics', 'Submit Qualification Forms'],
    badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    description: 'User access to fill multi-step forms and upload credentials.'
  },
  Viewer: {
    permissions: ['Read Platform Analytics'],
    badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
    description: 'Read-only access for compliance auditors and stakeholders.'
  }
}

export default function InteractivePlayground() {
  const { playHover, playClick } = useSound()
  const [activeDemo, setActiveDemo] = useState<'rbac' | 'forms' | 'ssr'>('rbac')

  // RBAC State
  const [selectedRole, setSelectedRole] = useState<Role>('Admin')

  // Form State
  const [formFields, setFormFields] = useState<Array<{ id: number; name: string; type: string }>>([
    { id: 1, name: 'Applicant Full Name', type: 'text' },
    { id: 2, name: 'Insurance Coverage ($)', type: 'number' },
  ])
  const [fieldName, setFieldName] = useState('')

  const handleAddField = () => {
    if (!fieldName.trim()) return
    playClick()
    setFormFields([...formFields, { id: Date.now(), name: fieldName, type: 'text' }])
    setFieldName('')
  }

  const handleRemoveField = (id: number) => {
    playClick()
    setFormFields(formFields.filter(f => f.id !== id))
  }

  // SSR Toggle State
  const [isSSRMode, setIsSSRMode] = useState<boolean>(true)

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
            / INTERACTIVE DEMOS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
            Frontend Architecture <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Playground</span>
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto">
            Test live simulators of my core engineering solutions: Role-Based Access Control (RBAC), Reactive Dynamic Forms, and SSR Performance Optimization.
          </p>
        </motion.div>

        {/* Demo Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 bg-secondary/50 p-2 rounded-2xl border border-border/60 max-w-md mx-auto shadow-sm">
          {[
            { id: 'rbac', label: 'RBAC Permission Gate', icon: Shield },
            { id: 'forms', label: 'Dynamic Form Engine', icon: Layout },
            { id: 'ssr', label: 'SSR Performance Benchmark', icon: Zap },
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

        {/* Demo Display Area */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-xl min-h-[380px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* DEMO 1: RBAC SIMULATOR */}
            {activeDemo === 'rbac' && (
              <motion.div
                key="rbac"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-foreground flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-blue-500" /> Granular RBAC Role Switcher
                    </h3>
                    <p className="text-xs text-foreground/60 mt-1">
                      Simulates role-based UI component rendering and authorization guards.
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
                        }}
                        onMouseEnter={playHover}
                        className={`px-3 py-1.5 text-xs font-mono font-medium rounded-xl border transition-all ${
                          selectedRole === r
                            ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                            : 'bg-secondary/60 border-border text-foreground/70 hover:text-foreground'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-secondary/20 border border-border/60">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-foreground/50">Active Role Profile</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border ${rolesConfig[selectedRole].badgeColor}`}>
                        {selectedRole}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                      {rolesConfig[selectedRole].description}
                    </p>
                  </div>

                  {/* Permission Gate Checklist */}
                  <div className="p-5 rounded-2xl bg-secondary/20 border border-border/60 space-y-3">
                    <div className="text-xs font-mono text-foreground/50 mb-2">Gate Authorization Status</div>
                    {[
                      'Read Platform Analytics',
                      'Submit Qualification Forms',
                      'Approve Enterprise Qualifications',
                      'Write & Modify Configurations',
                      'Manage RBAC User Roles',
                    ].map((perm) => {
                      const isGranted = rolesConfig[selectedRole].permissions.includes(perm)
                      return (
                        <div
                          key={perm}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-colors ${
                            isGranted
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                              : 'bg-secondary/40 border-border/40 text-foreground/40'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {isGranted ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <Lock className="w-4 h-4 shrink-0 opacity-50" />}
                            {perm}
                          </span>
                          <span className="font-mono text-[10px]">
                            {isGranted ? 'ALLOWED' : 'LOCKED'}
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
                className="space-y-6"
              >
                <div className="border-b border-border/50 pb-4">
                  <h3 className="text-xl font-bold font-serif text-foreground flex items-center gap-2">
                    <Layout className="w-5 h-5 text-purple-500" /> Reactive Nested FormArray Builder
                  </h3>
                  <p className="text-xs text-foreground/60 mt-1">
                    Simulates dynamic field array generation and zero-error reactive validation.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                    placeholder="Enter dynamic field label (e.g. Policy Number)..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border text-xs focus:border-purple-500 outline-none"
                  />
                  <button
                    onClick={handleAddField}
                    onMouseEnter={playHover}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Add Dynamic Field
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  {formFields.map((field) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/30 border border-border/60"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        <span className="text-xs font-medium text-foreground">{field.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-background text-foreground/50 border border-border">
                          Reactive Field
                        </span>
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
              </motion.div>
            )}

            {/* DEMO 3: SSR BENCHMARK COMPARATOR */}
            {activeDemo === 'ssr' && (
              <motion.div
                key="ssr"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-foreground flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" /> Next.js SSR vs Client SPA Benchmark
                    </h3>
                    <p className="text-xs text-foreground/60 mt-1">
                      Visualizing the exact 167% Lighthouse score boost achieved in enterprise migrations.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      playClick()
                      setIsSSRMode(!isSSRMode)
                    }}
                    onMouseEnter={playHover}
                    className="px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Toggle Mode: {isSSRMode ? 'Next.js SSR (Optimized)' : 'Legacy Client SPA'}
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-secondary/20 border border-border/60 text-center">
                    <div className="text-xs font-mono text-foreground/50 mb-2">Lighthouse Score</div>
                    <div className={`text-4xl font-bold font-mono ${isSSRMode ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {isSSRMode ? '84 / 100' : '30 / 100'}
                    </div>
                    <div className="text-[11px] text-foreground/60 mt-2">
                      {isSSRMode ? '+167% Score Boost' : 'Heavy Client Bundle'}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-secondary/20 border border-border/60 text-center">
                    <div className="text-xs font-mono text-foreground/50 mb-2">First Contentful Paint (FCP)</div>
                    <div className={`text-4xl font-bold font-mono ${isSSRMode ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {isSSRMode ? '0.9s' : '3.4s'}
                    </div>
                    <div className="text-[11px] text-foreground/60 mt-2">
                      {isSSRMode ? '73% Faster Paint' : 'Render-Blocking JS'}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-secondary/20 border border-border/60 text-center">
                    <div className="text-xs font-mono text-foreground/50 mb-2">JS Payload Size</div>
                    <div className={`text-4xl font-bold font-mono ${isSSRMode ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {isSSRMode ? '195 KB' : '820 KB'}
                    </div>
                    <div className="text-[11px] text-foreground/60 mt-2">
                      {isSSRMode ? 'Automatic Code Splitting' : 'Unused Monolithic JS'}
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
