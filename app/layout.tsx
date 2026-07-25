// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/sections/theme-provider'
import { SoundProvider } from './components/sections/sound-provider'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
})

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair' 
})

export const metadata: Metadata = {
  title: 'Nitesh Kushwaha - Full-Stack & Frontend Engineer (Angular, React, Next.js & MEAN)',
  description: 'Full-Stack & Frontend Engineer specializing in Angular, React & Next.js — with MEAN stack experience shipping production APIs, 167% SSR performance boosts, and enterprise RBAC platforms.',
  keywords: ['Nitesh Kushwaha', 'Full-Stack Developer', 'Frontend Engineer', 'Next.js Developer', 'Angular Developer', 'React Developer', 'MEAN Stack Developer', 'Bhopal'],
  authors: [{ name: 'Nitesh Kushwaha' }],
  openGraph: {
    title: 'Nitesh Kushwaha - Full-Stack & Frontend Engineer',
    description: 'Full-Stack & Frontend Engineer specializing in Angular, React & Next.js with MEAN stack capability. Proven 167% Lighthouse score boost.',
    type: 'website',
    url: 'https://niteshkushwaha.dev',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nitesh Kushwaha',
    jobTitle: 'Full-Stack & Frontend Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Soluzione IT Services Pvt. Ltd.',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Technocrats Institute of Technology',
    },
    knowsAbout: ['Angular', 'Next.js', 'React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'RxJS', 'Tailwind CSS', 'SSR', 'RBAC'],
    sameAs: [
      'https://github.com/NiteshKushwaha111',
      'https://linkedin.com/in/nitesh-kushwaha-dev',
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider>
          <SoundProvider>
            {children}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}