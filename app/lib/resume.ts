export interface ProjectItem {
  id: string;
  name: string;
  projectType: 'Professional Project' | 'Personal Project';
  category: string;
  oneLiner: string;
  techStack: string[];
  highlight: string;
  details: string[];
  problem: string;
  role: string;
  architecture: string;
  results: string;
  link?: string;
  github?: string;
  isNDA: boolean;
  ndaNotice?: string;
}

export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  period: string;
}

export const resumeData = {
  personalInfo: {
    name: "Nitesh Kushwaha",
    title: "MERN Stack Developer | Full Stack JavaScript Engineer",
    subheading: "Building scalable web applications with React.js, Next.js, Node.js, Express.js, and MongoDB. Experienced in production application development, REST APIs, secure workflows, and frontend performance optimization.",
    phone: "+91 83499 45280",
    email: "niteshkushwaha603@gmail.com",
    location: "Bhopal, MP, India",
    availability: "Available to Join Immediately",
    linkedin: "https://www.linkedin.com/in/nitesh-kushwaha-dev/",
    github: "https://github.com/NiteshKushwaha111",
    summary: "MERN Stack Developer with 3+ years of experience building production web applications using React.js, Next.js, Node.js, Express.js, and MongoDB. Experienced in developing REST APIs with JWT authentication, Role-Based Access Control (RBAC), and Mongoose data modeling, alongside third-party integrations such as Razorpay and Azure Blob Storage. Frontend background in TypeScript, Redux Toolkit, Context API, and Server-Side Rendering (SSR), with delivered work on a school discovery and inquiry platform serving 700+ schools."
  },
  skills: {
    frontend: [
      "React.js",
      "Next.js",
      "Redux Toolkit",
      "Context API",
      "React Hooks",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Shadcn UI",
      "HTML5",
      "CSS3",
      "Angular",
      "RxJS",
      "NgRx",
      "Responsive Web Development"
    ],
    backend: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "Role-Based Access Control (RBAC)",
      "Multer",
      "Axios",
      "Postman"
    ],
    database: [
      "MongoDB",
      "Mongoose",
      "Schema Validation",
      "Aggregation Pipelines"
    ],
    toolsAndDelivery: [
      "Razorpay Integration",
      "Azure Blob Storage",
      "Server-Side Rendering (SSR)",
      "Performance Optimization (React.memo, useMemo, useCallback)",
      "Code Splitting & Lazy Loading",
      "Git",
      "GitHub",
      "Vercel",
      "Vite",
      "Webpack",
      "npm"
    ]
  },
  experience: [
    {
      company: "Soluzione IT Services Pvt. Ltd.",
      location: "Bhopal, MP",
      role: "Software Engineer L3",
      period: "June 2023 – July 2026",
      tracks: [
        {
          name: "Backend & MERN API Engineering",
          bullets: [
            "Developed 20+ REST APIs using Node.js, Express.js, and MongoDB for a production platform serving 700+ schools, covering authentication, school listings, search, inquiry, and payment workflows.",
            "Implemented JWT-based authentication and Role-Based Access Control (RBAC) across APIs and protected routes, enabling role-specific workflows for multiple user types.",
            "Integrated Razorpay payment gateway end-to-end and implemented file uploads using Multer with Azure Blob Storage for persistent media handling.",
            "Modeled MongoDB collections with Mongoose schemas and validation for listing, inquiry, user, and payment data used across the platform."
          ]
        },
        {
          name: "React.js, Next.js & Enterprise Systems",
          bullets: [
            "Migrated the production platform from Angular to Next.js using Server-Side Rendering (SSR) and asset optimization, improving the Lighthouse score from 30 to 80+.",
            "Built complex accreditation and workspace features using React.js, TypeScript, Redux Toolkit, and Context API, including 30+ nested form workflows with conditional validation and configurable RBAC for 5+ administrator roles.",
            "Optimized rendering on heavy-data views using React.memo, useMemo, and useCallback; delivered WCAG/ARIA-compliant interfaces with keyboard navigation support."
          ]
        },
        {
          name: "Angular & Architecture Delivery",
          bullets: [
            "Built modular Angular frontends with 30+ reusable components, pipes, and directives, reducing development time by 25%; used RxJS, NgRx, and HTTP interceptors with secure JWT handling."
          ]
        }
      ]
    }
  ],
  projects: [
    {
      id: "boarding-schools-of-india",
      name: "Boarding Schools of India",
      projectType: "Professional Project",
      category: "Full-Stack Platform",
      oneLiner: "Production full-stack platform for school discovery, listings, and inquiry management serving 700+ schools, with public pages rendered via SSR.",
      techStack: ["Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Razorpay", "Azure Blob Storage", "JWT"],
      highlight: "167% Lighthouse Score Boost (30 → 80+) via Next.js SSR Migration",
      details: [
        "Production full-stack platform for school discovery, listings, and inquiry management serving 700+ schools, with public pages rendered via SSR.",
        "Backend REST APIs built with Node.js, Express.js, and MongoDB/Mongoose support search, listing, authentication, inquiry, and payment workflows, protected with JWT and role-based access.",
        "Integrated Razorpay for payments and Multer with Azure Blob Storage for uploads; frontend built in Next.js and TypeScript with 20+ advanced search and inquiry workflows using dynamic filtering and client-side validation."
      ],
      problem: "The legacy client-side application had a Lighthouse performance score of ~30, slow initial page loads, and poor search engine crawlability, which harmed organic parent discovery and mobile user conversion.",
      role: "Full-Stack Developer responsible for the Next.js frontend SSR migration, 20+ backend REST APIs in Node.js/Express, MongoDB data models, and Azure/Razorpay integrations.",
      architecture: "Next.js frontend with Server-Side Rendering (SSR) for optimal SEO and rapid First Contentful Paint; Node.js/Express REST backend with Mongoose ORM; Azure Blob Storage for media and document assets; Razorpay for payment processing.",
      results: "Lighthouse score improved by 167% (from 30 to 80+), search crawl efficiency surged, and the platform reliably handles discovery and lead workflows for 700+ institutions.",
      link: "https://www.boardingschoolsofindia.com/",
      isNDA: false
    },
    {
      id: "accred-one",
      name: "AccredOne",
      projectType: "Professional Project",
      category: "Enterprise Systems",
      oneLiner: "Accreditation platform supporting role-based access control and configurable field-level permissions for administrators and end users.",
      techStack: ["React.js", "TypeScript", "Redux Toolkit", "Context API", "REST APIs", "RBAC", "WCAG/ARIA"],
      highlight: "30+ Configurable Form Workflows & Granular RBAC Matrix",
      details: [
        "Accreditation platform supporting role-based access control and configurable field-level permissions for administrators and end users.",
        "Developed 30+ configurable workflow forms and a custom RBAC matrix, managing complex form state with Redux Toolkit and Context API.",
        "Integrated REST APIs with centralized state management for data synchronization across multi-step accreditation workflows; delivered a WCAG/ARIA-accessible interface with keyboard navigation support."
      ],
      problem: "Enterprise accreditation evaluations previously relied on fragmented paperwork and rigid software that lacked field-level security delegation and dynamic multi-step compliance validation.",
      role: "Frontend Engineer leading the implementation of 30+ complex forms, RBAC permissions engine, and accessible UI component architecture.",
      architecture: "React.js and TypeScript single-page application utilizing Redux Toolkit for complex form state, custom validation hooks, and accessible Tailwind/Shadcn UI components.",
      results: "Delivered 30+ validated multi-step forms, cut customer data entry errors significantly, and enabled secure role delegation for 5+ administrator tiers.",
      isNDA: true,
      ndaNotice: "Internal enterprise platform — architecture & implementation walkthrough available during technical interviews"
    },
    {
      id: "skybound-construction",
      name: "Skybound Construction",
      projectType: "Personal Project",
      category: "Corporate Website",
      oneLiner: "Modern corporate web application showcasing infrastructure services, interactive portfolio galleries, and inquiry flows.",
      techStack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive Design"],
      highlight: "High-Performance Responsive Business UI with Custom Micro-Interactions",
      details: [
        "Developed a responsive corporate website for a construction and infrastructure business with mobile-first layouts.",
        "Built animated service showcase cards, interactive project galleries, and client contact inquiry workflows using Framer Motion.",
        "Optimized responsive layouts across mobile, tablet, and ultra-wide screens with clean, semantic HTML and accessible UI states."
      ],
      problem: "Small-to-medium construction businesses often lack modern digital presentation, making it difficult to convey craftsmanship and capture qualified contractor inquiries.",
      role: "Independent design and frontend developer building the corporate web presence from concept to deployment.",
      architecture: "React.js/Next.js component structure styled with Tailwind CSS, leveraging Framer Motion for scroll-driven animations and client-side contact capture.",
      results: "Fast loading speed, smooth 60fps animations, and a polished business presence deployed on Vercel.",
      link: "https://construction-site-gules.vercel.app/",
      github: "https://github.com/NiteshKushwaha111/CONSTRUCTION-SITE",
      isNDA: false
    },
    {
      id: "caneverse",
      name: "CaneVerse",
      projectType: "Personal Project",
      category: "Furniture Website",
      oneLiner: "Handcrafted furniture showcase featuring dynamic product catalogs, category filtering, and custom enquiry flows.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
      highlight: "90+ Lighthouse Performance Scores & Smooth Category Filtering",
      details: [
        "Self-designed and developed personal e-commerce showcase for premium handcrafted cane furniture.",
        "Implemented dynamic product catalog browsing, category filtering, detailed product specification layouts, and pricing displays.",
        "Created responsive custom furniture consultation and restoration inquiry CTAs with smooth Framer Motion micro-animations.",
        "Optimized image loading and component rendering, achieving 90+ Lighthouse scores across performance and accessibility."
      ],
      problem: "Artisanal cane furniture makers struggle with generic e-commerce templates that fail to showcase intricate craftsmanship and custom sizing inquiries.",
      role: "Independent creator, UI designer, and frontend developer.",
      architecture: "Next.js application with modular product catalog components, client-side category filtering, and Tailwind CSS responsive styling.",
      results: "Achieved 90+ Lighthouse scores across performance, accessibility, best practices, and SEO with instant page transitions.",
      link: "https://cane-verse.vercel.app/",
      isNDA: false
    },
    {
      id: "jaz-anz",
      name: "JAZ-ANZ Accreditation System",
      projectType: "Professional Project",
      category: "Enterprise Systems",
      oneLiner: "Multi-step accreditation system with 20+ conditionally rendered Reactive Forms and granular RBAC supporting 4+ user types.",
      techStack: ["Angular", "RxJS", "NgRx", "PrimeNG", "REST APIs", "RBAC"],
      highlight: "20+ Reactive Forms & 30+ REST APIs Managed via RxJS / NgRx",
      details: [
        "Multi-step accreditation system with 20+ conditionally rendered Reactive Forms and granular RBAC supporting 4+ user types.",
        "Connected 30+ REST APIs using RxJS-driven data flows and NgRx state management; developed a reusable PrimeNG component library used across 20+ screens."
      ],
      problem: "Global accreditation evaluation required strict audit trails, complex multi-page validation, and secure submission pipelines across international bodies.",
      role: "Angular frontend developer implementing dynamic Reactive Forms, RxJS data pipelines, and PrimeNG component patterns.",
      architecture: "Modular Angular application with NgRx store, RxJS HTTP interceptors for automatic JWT authentication token injection, and PrimeNG UI library.",
      results: "Successfully connected 30+ REST endpoints and automated multi-tier accreditation review flows.",
      isNDA: true,
      ndaNotice: "Internal enterprise platform — architecture & code patterns available on request"
    },
    {
      id: "ensurite",
      name: "Ensurite",
      projectType: "Professional Project",
      category: "Enterprise Systems",
      oneLiner: "Digitized legacy policy and underwriting workflows with 15+ multi-field Reactive Forms integrated with REST APIs, reducing customer data-entry errors by 60%.",
      techStack: ["Angular", "TypeScript", "Chart.js", "REST APIs", "Angular Material"],
      highlight: "60% Reduction in Customer Data-Entry Errors & Real-time Chart.js Analytics",
      details: [
        "Digitized legacy policy and underwriting workflows with 15+ multi-field Reactive Forms integrated with REST APIs, reducing customer data-entry errors by 60%.",
        "Built a Chart.js underwriting analytics dashboard for real-time risk assessment and visual performance tracking."
      ],
      problem: "Manual insurance underwriting suffered high error rates and slow policy quotation turnarounds due to paper-based data collection.",
      role: "Frontend engineer designing responsive forms, custom field validators, and interactive data visualization charts.",
      architecture: "Angular with Angular Material component library, Reactive Forms with custom async validators, and Chart.js integration.",
      results: "Reduced customer data entry errors by 60% and accelerated underwriting quotation reviews.",
      isNDA: true,
      ndaNotice: "Internal enterprise platform — case study details available on request"
    }
  ] as ProjectItem[],
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
  ] as EducationItem[]
};
