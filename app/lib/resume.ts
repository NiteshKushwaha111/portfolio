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
    title: "Frontend Developer | React.js, Next.js, Angular, TypeScript, Node.js",
    phone: "+91 83499 45280",
    email: "niteshkushwaha603@gmail.com",
    location: "Bhopal, MP, India",
    availability: "Available to Join Immediately",
    linkedin: "https://linkedin.com/in/nitesh-kushwaha-dev",
    github: "https://github.com/NiteshKushwaha111",
    summary: "Frontend-first Developer with 3+ years of experience building production web applications using React.js, Next.js, Angular, and TypeScript, with hands-on backend exposure building 20+ REST APIs using Node.js, Express.js, and MongoDB on a live production platform. Led a framework migration from Angular to Next.js to resolve real performance issues, improving Lighthouse scores by 167% through SSR. Experienced in building configurable RBAC systems, accessible (WCAG/ARIA) interfaces, and 80+ multi-step forms with conditional validation across enterprise projects, collaborating within Agile/Scrum teams. Comfortable with Azure fundamentals (repos, Blob Storage, CI/CD pipelines). Daily user of AI-assisted development tools (GitHub Copilot, ChatGPT, Claude, Cursor, DeepSeek) to accelerate coding, debugging, and codebase navigation."
  },
  skills: {
    frontend: ["React.js", "Next.js", "React Hooks", "React Router", "Angular (v12–v18)"],
    backend: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST API Design", "Multer"],
    languages: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "SCSS"],
    stateManagement: ["Redux", "Redux Toolkit", "Context API", "RxJS", "NgRx", "Axios", "RESTful APIs"],
    authentication: ["JWT", "Role-Based Access Control (RBAC)"],
    styling: ["Tailwind CSS", "Shadcn UI", "Bootstrap", "PrimeNG", "Angular Material"],
    dataVisualization: ["TanStack Table (React Table)", "Chart.js"],
    paymentsAndIntegrations: ["Razorpay Payment Gateway"],
    accessibility: ["WCAG 2.1", "ARIA", "Keyboard Navigation"],
    performance: ["React.memo", "useCallback", "useMemo", "Server-Side Rendering (SSR)", "Lazy Loading", "OnPush Change Detection"],
    cloudAndDevOps: ["Azure (Repos, Blob Storage, CI/CD Pipelines)"],
    aiTools: ["GitHub Copilot", "ChatGPT", "Claude", "Cursor", "DeepSeek"],
    processAndTools: ["Agile/Scrum (Sprints, Standups)", "Git", "GitHub", "VS Code", "npm", "Postman", "Vite", "Webpack"]
  },
  experience: [
    {
      company: "Soluzione IT Services Pvt. Ltd.",
      location: "Bhopal, MP",
      role: "Frontend Developer (React.js / Angular)",
      period: "June 2023 – July 2026",
      tracks: [
        {
          name: "React.js & Next.js Development",
          bullets: [
            "Owned complex accreditation and workspace features end-to-end using React.js and TypeScript, building 30+ nested reactive forms with conditional field validation and a configurable RBAC system securing access for 5+ administrator roles.",
            "Migrated the Boarding Schools of India platform from Angular to Next.js to resolve real performance bottlenecks, using Server-Side Rendering and asset optimization to raise Lighthouse scores from 30 to 80+ (167% increase).",
            "Designed modern admin dashboards using Tailwind CSS and Shadcn UI; integrated TanStack Table for high-speed sorting, pagination, and search.",
            "Used AI-assisted development tools (GitHub Copilot, ChatGPT, Cursor, DeepSeek) daily for debugging, refactoring, and navigating legacy code during framework migrations.",
            "Optimized UI rendering using React.memo, useCallback, and useMemo, reducing unnecessary re-renders on heavy-data views.",
            "Delivered WCAG/ARIA-compliant accessible interfaces and collaborated within Agile/Scrum ceremonies (sprints, standups) across cross-functional teams."
          ]
        },
        {
          name: "Angular Development",
          bullets: [
            "Designed modular Angular frontend structures with 30+ reusable UI components, pipes, and directives across multiple projects, saving 25% development time.",
            "Developed nested Reactive Forms with FormArrays and custom validators, using RxJS (switchMap, debounceTime) and NgRx for state management, connecting REST APIs via HTTP interceptors and secure JWT token handling.",
            "Rendered data visualization layouts with Chart.js for real-time business performance analysis."
          ]
        },
        {
          name: "Backend Development (Boarding Schools of India)",
          bullets: [
            "Developed 20+ REST APIs using Node.js and Express.js, backed by MongoDB, for a platform serving 700+ schools, including JWT-based authentication and Razorpay payment gateway integration.",
            "Implemented secure file uploads using Multer with Azure Blob Storage for document/media handling."
          ]
        }
      ]
    }
  ],
  projects: [
    {
      name: "Boarding Schools of India",
      category: "Full-Stack Platform",
      techStack: ["Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Razorpay", "Azure Blob Storage", "Multer"],
      details: [
        "Full-stack platform serving 700+ schools; originally built in Angular, later moved to Next.js to resolve performance issues, achieving a 167% Lighthouse score improvement via SSR.",
        "Engineered 20+ backend REST APIs (Node.js, Express.js, MongoDB) covering search, listings, and authentication; implemented JWT auth and Multer + Azure Blob Storage for file uploads; connected Razorpay payment gateway end-to-end (backend order/payment verification and frontend checkout flow).",
        "Created 20+ advanced search and inquiry forms with real-time validation, improving conversion rates."
      ],
      link: "https://www.boardingschoolsofindia.com/",
      isNDA: false
    },
    {
      name: "JAZ-ANZ – International Accreditation",
      category: "Enterprise Systems",
      techStack: ["Angular", "RxJS", "NgRx", "PrimeNG", "RBAC"],
      details: [
        "Engineered a multi-step accreditation system with 20+ conditionally-rendered Reactive Forms and granular RBAC supporting 4+ user types.",
        "Connected 30+ REST APIs using RxJS-driven data flows and NgRx state management.",
        "Developed a reusable PrimeNG component library ensuring UI consistency across 20+ screens."
      ],
      isNDA: true,
      ndaNotice: "Internal enterprise platform — case study & architecture details available on request"
    },
    {
      name: "AccredOne",
      category: "Enterprise Systems",
      techStack: ["React.js", "TypeScript", "Redux Toolkit", "Context API", "REST APIs", "WCAG"],
      details: [
        "Developed 30+ configurable workflow forms and a custom RBAC matrix for granular, field-level permissions, using Redux Toolkit and Context API for centralized state and real-time REST API data sync.",
        "Optimized rendering using React.memo, useCallback, and useMemo, reducing re-renders on heavy-data views.",
        "Delivered a WCAG/ARIA-accessible interface with keyboard navigation support."
      ],
      isNDA: true,
      ndaNotice: "Internal enterprise platform — case study & architecture details available on request"
    },
    {
      name: "Ensurite – Insurance Platform",
      category: "Enterprise Systems",
      techStack: ["Angular", "TypeScript", "Chart.js", "REST APIs", "Angular Material"],
      details: [
        "Built 15+ multi-field reactive forms digitizing legacy insurance workflows, reducing customer data entry errors by 60%.",
        "Consumed RESTful services for real-time policy updates; built an underwriting analytics dashboard using Chart.js."
      ],
      isNDA: true,
      ndaNotice: "Internal enterprise platform — case study & architecture details available on request"
    },
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
    }
  ],
  testimonials: [
    {
      name: "Technical Lead",
      role: "Engineering Manager",
      company: "Soluzione IT Services",
      text: "Nitesh's expertise in Next.js SSR migration was instrumental in turning around our Lighthouse scores from 30 to 80+. His reactive form architecture and backend REST API development for Boarding Schools of India delivered immense value."
    },
    {
      name: "Product Manager",
      role: "Enterprise Platforms",
      company: "AccredOne",
      text: "Working with Nitesh on AccredOne was fantastic. He architected an RBAC system and dynamic form workflow engine with Redux Toolkit that accelerated user task completion by 40%."
    }
  ],
  achievements: [
    "Lighthouse Performance: Raised scores from 30 to 80+ (167% increase) via Next.js SSR migration & asset optimization",
    "Forms Engineered: Created 80+ dynamic forms with conditional field validation across enterprise platforms",
    "Backend REST APIs: Developed 20+ REST APIs using Node.js, Express.js, MongoDB with Multer & Azure Blob Storage",
    "Productivity Boost: Cut development time by 25% by architecting 30+ reusable UI components and directives"
  ],
  education: [
    {
      institution: "Technocrats Institute of Technology",
      location: "Bhopal, M.P., India",
      degree: "Bachelor of Technology in Electronics and Communication",
      period: "2019 – 2023"
    }
  ]
};
