export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string;
}

export const resumeData = {
  personalInfo: {
    name: "Nitesh Kushwaha",
    title: "Full-Stack & Frontend Engineer (Angular, React, Next.js & MEAN)",
    phone: "+91 83499 45280",
    email: "niteshkushwaha603@gmail.com",
    location: "Bhopal, MP, India",
    availability: "Available for Immediate Joining",
    linkedin: "https://linkedin.com/in/nitesh-kushwaha-dev",
    github: "https://github.com/NiteshKushwaha111",
    summary: "Results-driven Full-Stack & Frontend Engineer with 3+ years of experience specializing in Angular, Next.js, and React.js, along with full-stack MEAN stack capability. Proven track record of improving application performance by 167% through Server-Side Rendering (SSR) optimization (Lighthouse score 30 → 80+). Expert in building complex reactive forms with nested FormArrays, implementing Role-Based Access Control (RBAC) systems, and architecting reusable component libraries that accelerate development time by 25%."
  },
  skills: {
    frameworks: ["Angular (14+)", "Next.js 13/14/15", "React.js 18/19"],
    backend: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Aggregation Pipeline", "RESTful APIs", "Multer", "AWS S3"],
    languages: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
    stateManagement: ["RxJS", "NgRx", "Redux / Redux Toolkit", "Context API", "React Hooks"],
    uiDevelopment: ["Reactive Forms", "FormArrays", "Custom Validators", "RBAC Systems"],
    performance: ["SSR / Universal", "Lazy Loading", "OnPush Strategy", "Code Splitting", "Lighthouse Optimization"],
    styling: ["Tailwind CSS", "Angular Material", "Shadcn UI", "Bootstrap", "PrimeNG"],
    accessibility: ["WCAG 2.1 Guidelines", "ARIA Labels", "Keyboard Navigation", "Screen Reader Optimization"],
    dataVisualization: ["Chart.js", "TanStack Table", "Dynamic Dashboards"],
    authentication: ["MSAL Login", "Google OAuth", "JWT Authentication"],
    tools: ["Git", "npm / yarn / pnpm", "Webpack", "Postman", "Chrome DevTools", "Vercel"]
  },
  experience: [
    {
      company: "Soluzione IT Services Pvt. Ltd.",
      location: "Bhopal, MP",
      role: "Frontend Developer (Angular, Next.js & React.js)",
      period: "June 2023 – Present",
      achievements: [
        "Next.js Migration: Led migration of enterprise application from Angular to Next.js, boosting Lighthouse performance score from 30 to 80+ (167% increase) through SSR optimization, image optimization, and code splitting.",
        "Complex Forms Engine: Engineered 60+ dynamic forms with nested FormArrays and custom validators for insurance and accreditation platforms, reducing data entry errors by 60%.",
        "RBAC Architecture: Designed comprehensive Role-Based Access Control (RBAC) system managing 5+ user roles (admin, assessor, applicant, viewer), ensuring secure data access across enterprise modules.",
        "Component Library: Architected scalable UI component library with 30+ reusable components, custom directives, and pipes, accelerating team development time by 25%.",
        "Data Visualization: Created interactive analytics dashboards using Chart.js and TanStack Table with global filtering, sorting, pagination, and real-time data updates.",
        "API Integration & Security: Implemented secure RESTful API integrations with JWT authentication, HTTP interceptors, and error handling middleware."
      ]
    }
  ],
  projects: [
    {
      name: "Premium Cane Furniture – E-commerce Platform",
      category: "Next.js & React",
      techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
      details: [
        "Architected a high-performance e-commerce platform for premium cane furniture",
        "Implemented smooth scrolling, micro-animations, and dynamic product galleries",
        "Achieved 90+ Lighthouse scores across performance, accessibility, and SEO"
      ],
      link: "https://canefurnituredor.com/",
      github: "",
      isNDA: false
    },
    {
      name: "Skybound Construction – Corporate Website",
      category: "Next.js & React",
      techStack: ["React.js", "Tailwind CSS", "Framer Motion", "Responsive Design"],
      details: [
        "Developed a modern corporate landing page for a construction and infrastructure firm",
        "Built custom animated carousels, service highlight cards, and an interactive contact flow",
        "Ensured pixel-perfect responsiveness across mobile, tablet, and desktop architectures"
      ],
      link: "https://niteshkushwaha111.github.io/CONSTRUCTION-SITE/",
      github: "https://github.com/niteshkushwaha111/CONSTRUCTION-SITE",
      isNDA: false
    },
    {
      name: "AccredOne – Enterprise Accreditation System",
      category: "Enterprise Systems",
      techStack: ["React.js", "TypeScript", "Tailwind CSS", "RBAC", "WCAG"],
      details: [
        "Architected accreditation platform using React.js with modern hooks for optimal performance",
        "Implemented configurable workflow engine with dynamic form generation based on user roles",
        "Built responsive admin dashboard with real-time status tracking and document management",
        "Achieved 40% faster form completion through intuitive UI design and smart defaults"
      ],
      isNDA: true,
      ndaNotice: "Internal enterprise platform — architecture & case study available on request"
    },
    {
      name: "Boarding Schools of India – Education Discovery Platform",
      category: "Angular & MEAN",
      techStack: ["Angular", "TypeScript", "RxJS", "SSR / Universal"],
      details: [
        "Developed comprehensive school discovery platform serving 500+ schools with advanced search and comparison",
        "Implemented complex filtering using Reactive Forms with 20+ dynamic criteria and custom validators",
        "Configured Angular Universal for SSR and SEO optimization, improving page load speed by 60%"
      ],
      link: "https://www.boardingschoolsofindia.com/",
      isNDA: false
    },
    {
      name: "Ensurite – Cloud-Based Insurance Platform",
      category: "Enterprise Systems",
      techStack: ["Angular", "Chart.js", "Reactive Forms", "Angular Material"],
      details: [
        "Engineered 20+ complex insurance forms with nested FormArrays, conditional validation, and dynamic fields",
        "Reduced manual data entry errors by 60% through real-time validation and intelligent autofill",
        "Developed underwriting analytics dashboard with Chart.js for premium calculations and risk assessment"
      ],
      isNDA: true,
      ndaNotice: "Internal enterprise platform — architecture & case study available on request"
    },
    {
      name: "JAZ-ANZ – International Accreditation Platform",
      category: "Enterprise Systems",
      techStack: ["Angular", "RBAC", "Nested FormArrays", "PrimeNG"],
      details: [
        "Built multi-step accreditation system with complex nested FormArrays for qualification entry",
        "Implemented granular RBAC system with 4 user types and specific permission controls",
        "Created reusable component library ensuring 100% design consistency across 20+ screens"
      ],
      isNDA: true,
      ndaNotice: "Internal enterprise platform — architecture & case study available on request"
    }
  ],
  testimonials: [
    {
      name: "Technical Lead",
      role: "Engineering Manager",
      company: "Soluzione IT Services",
      text: "Nitesh's expertise in Next.js SSR migration was instrumental in turning around our Lighthouse scores from 30 to 80+. His reactive form architecture reduced data errors significantly across complex enterprise workflows."
    },
    {
      name: "Product Manager",
      role: "Enterprise Platforms",
      company: "AccredOne",
      text: "Working with Nitesh on AccredOne was fantastic. He architected an RBAC system and dynamic form workflow engine that accelerated user task completion by 40%."
    }
  ],
  achievements: [
    "Performance: Improved Lighthouse scores from 30 to 80+ (167% increase) through SSR, lazy loading, and image optimization",
    "Productivity: Reduced development time by 25% through reusable component libraries and standardized UI patterns",
    "Quality: Decreased data entry errors by 60% through intelligent form validation and dynamic workflows",
    "Security: Implemented RBAC systems managing 5+ user roles across multiple enterprise applications"
  ],
  education: [
    {
      institution: "Technocrats Institute of Technology",
      location: "Bhopal, MP",
      degree: "B.Tech in Electronics and Communication (CGPA: 8.57)",
      period: "2019 – 2023"
    }
  ]
};
