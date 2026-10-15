// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/sections/theme-provider'
import { SoundProvider } from './components/sections/sound-provider'
import CustomCursor from './components/CustomCursor'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
})

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair' 
})

export const metadata: Metadata = {
  metadataBase: new URL('https://niteshwebdev-portfolio.vercel.app'),
  title: 'Nitesh Kushwaha | MERN Stack Developer & Full Stack JavaScript Engineer',
  description: 'Full Stack JavaScript Developer with 3+ years of experience in React.js, Next.js, Node.js, Express.js, MongoDB, REST APIs, and production web applications.',
  keywords: [
    'Nitesh Kushwaha',
    'MERN Stack Developer',
    'Full Stack JavaScript Engineer',
    'React.js Developer',
    'Next.js Developer',
    'Node.js Developer',
    'Express.js',
    'MongoDB',
    'REST APIs',
    'Frontend Developer',
    'Angular Developer',
    'Bhopal'
  ],
  authors: [{ name: 'Nitesh Kushwaha' }],
  alternates: {
    canonical: 'https://niteshwebdev-portfolio.vercel.app',
  },
  openGraph: {
    title: 'Nitesh Kushwaha | MERN Stack Developer & Full Stack JavaScript Engineer',
    description: 'Full Stack JavaScript Developer with 3+ years of experience in React.js, Next.js, Node.js, Express.js, MongoDB, REST APIs, and production web applications.',
    type: 'website',
    url: 'https://niteshwebdev-portfolio.vercel.app',
    siteName: 'Nitesh Kushwaha Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nitesh Kushwaha | MERN Stack Developer & Full Stack JavaScript Engineer',
    description: 'Full Stack JavaScript Developer with 3+ years of experience in React.js, Next.js, Node.js, Express.js, MongoDB, REST APIs, and production web applications.',
  }
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
    jobTitle: 'MERN Stack Developer | Full Stack JavaScript Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Soluzione IT Services Pvt. Ltd.',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Technocrats Institute of Technology',
    },
    knowsAbout: [
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'REST APIs',
      'JavaScript (ES6+)',
      'TypeScript',
      'Angular',
      'RxJS',
      'NgRx',
      'Tailwind CSS',
      'Server-Side Rendering (SSR)',
      'Role-Based Access Control (RBAC)'
    ],
    sameAs: [
      'https://github.com/NiteshKushwaha111',
      'https://www.linkedin.com/in/nitesh-kushwaha-dev/',
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
            <CustomCursor />
            {children}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}