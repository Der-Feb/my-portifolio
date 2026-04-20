export interface Teammate {
  name: string;
  role: string;
  links: { label: string; url: string }[];
}


export interface Project {
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  previewImage: string; // URL or short base64
  codeUrl: string;
  liveUrl?: string;
  teammates?: Teammate[];
  color: string;
  spineColor: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
// 8 projects spread across 2 shelves (4 per shelf)

export const PROJECTS: Project[] = [
  // ── Shelf 1 ──
  {
    title: 'Portfolio CMS',
    subtitle: 'Content Management System',
    description:
      'A headless CMS built specifically to power this portfolio. Supports rich-text editing, image uploads, project metadata, and live preview. Built with a REST API backend and a React admin panel.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    liveUrl: '#',
    teammates: [],
    color: '#e87d2b',
    spineColor: '#8b4513',
  },
  {
    title: 'E-Commerce Platform',
    subtitle: 'Full-Stack Web App',
    description:
      'A modern e-commerce solution with real-time inventory management, Stripe payment integration, JWT authentication, and an admin dashboard with analytics. Deployed on AWS with CI/CD via GitHub Actions.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    previewImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    liveUrl: '#',
    teammates: [
      {
        name: 'Alice Uwera',
        role: 'UI Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'LinkedIn', url: 'https://linkedin.com/' },
        ],
      },
    ],
    color: '#4a80e8',
    spineColor: '#2c5f8a',
  },
  {
    title: 'Task Manager',
    subtitle: 'Collaborative Tool',
    description:
      'Real-time collaborative task board with WebSocket-powered live updates, drag-and-drop Kanban boards, team roles & permissions, and email notifications via Resend.',
    techStack: ['TypeScript', 'Next.js', 'Prisma', 'WebSocket', 'Resend'],
    previewImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    color: '#2bc5b4',
    spineColor: '#2a6b3a',
  },
  {
    title: 'Analytics Dashboard',
    subtitle: 'Data Visualization',
    description:
      'Custom analytics dashboard with interactive D3.js charts, configurable date ranges, CSV/PDF exports, and a Python FastAPI backend that processes large datasets with role-based access control.',
    techStack: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    liveUrl: '#',
    teammates: [
      {
        name: 'Jean Pierre',
        role: 'Data Engineer',
        links: [{ label: 'GitHub', url: 'https://github.com/' }],
      },
    ],
    color: '#8a4ae8',
    spineColor: '#6b2a6b',
  },

  // ── Shelf 2 ──
  {
    title: 'Social Media App',
    subtitle: 'Mobile Application',
    description:
      'Cross-platform mobile app with real-time chat via Firebase Firestore, image/video uploads, story features, push notifications, and an algorithmic feed. Published on App Store and Play Store.',
    techStack: ['React Native', 'Firebase', 'Redux', 'Expo'],
    previewImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    color: '#e84a6a',
    spineColor: '#8b1a2a',
  },
  {
    title: 'DevOps Pipeline',
    subtitle: 'Infrastructure & CI/CD',
    description:
      'Automated CI/CD pipeline using GitHub Actions, Docker, and Kubernetes. Includes zero-downtime deployments, automated testing gates, Slack notifications, and infrastructure-as-code with Terraform.',
    techStack: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'AWS'],
    previewImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    color: '#4ae8a0',
    spineColor: '#1a6b45',
  },
  {
    title: 'AI Chat Assistant',
    subtitle: 'Machine Learning App',
    description:
      'Conversational AI assistant fine-tuned on domain-specific data. Features streaming responses, conversation history, context window management, and a clean chat UI with markdown rendering.',
    techStack: ['Python', 'FastAPI', 'OpenAI API', 'React', 'LangChain'],
    previewImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    liveUrl: '#',
    color: '#e8c84a',
    spineColor: '#6b5a1a',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
      {
    title: 'Portfolio CMS',
    subtitle: 'Content Management System',
    description:
      'A headless CMS built specifically to power this portfolio. Supports rich-text editing, image uploads, project metadata, and live preview. Built with a REST API backend and a React admin panel.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    liveUrl: '#',
    teammates: [],
    color: '#e87d2b',
    spineColor: '#8b4513',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
      {
    title: 'Portfolio CMS',
    subtitle: 'Content Management System',
    description:
      'A headless CMS built specifically to power this portfolio. Supports rich-text editing, image uploads, project metadata, and live preview. Built with a REST API backend and a React admin panel.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    liveUrl: '#',
    teammates: [],
    color: '#e87d2b',
    spineColor: '#8b4513',
  },
      {
    title: 'Portfolio CMS',
    subtitle: 'Content Management System',
    description:
      'A headless CMS built specifically to power this portfolio. Supports rich-text editing, image uploads, project metadata, and live preview. Built with a REST API backend and a React admin panel.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    liveUrl: '#',
    teammates: [],
    color: '#e87d2b',
    spineColor: '#8b4513',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
    {
    title: 'Task Manager',
    subtitle: 'Collaborative Tool',
    description:
      'Real-time collaborative task board with WebSocket-powered live updates, drag-and-drop Kanban boards, team roles & permissions, and email notifications via Resend.',
    techStack: ['TypeScript', 'Next.js', 'Prisma', 'WebSocket', 'Resend'],
    previewImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    color: '#2bc5b4',
    spineColor: '#2a6b3a',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
    {
    title: 'Task Manager',
    subtitle: 'Collaborative Tool',
    description:
      'Real-time collaborative task board with WebSocket-powered live updates, drag-and-drop Kanban boards, team roles & permissions, and email notifications via Resend.',
    techStack: ['TypeScript', 'Next.js', 'Prisma', 'WebSocket', 'Resend'],
    previewImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    color: '#2bc5b4',
    spineColor: '#2a6b3a',
  },
    {
    title: 'Task Manager',
    subtitle: 'Collaborative Tool',
    description:
      'Real-time collaborative task board with WebSocket-powered live updates, drag-and-drop Kanban boards, team roles & permissions, and email notifications via Resend.',
    techStack: ['TypeScript', 'Next.js', 'Prisma', 'WebSocket', 'Resend'],
    previewImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    color: '#2bc5b4',
    spineColor: '#2a6b3a',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
      {
    title: 'Portfolio CMS',
    subtitle: 'Content Management System',
    description:
      'A headless CMS built specifically to power this portfolio. Supports rich-text editing, image uploads, project metadata, and live preview. Built with a REST API backend and a React admin panel.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    liveUrl: '#',
    teammates: [],
    color: '#e87d2b',
    spineColor: '#8b4513',
  },
    {
    title: 'Task Manager',
    subtitle: 'Collaborative Tool',
    description:
      'Real-time collaborative task board with WebSocket-powered live updates, drag-and-drop Kanban boards, team roles & permissions, and email notifications via Resend.',
    techStack: ['TypeScript', 'Next.js', 'Prisma', 'WebSocket', 'Resend'],
    previewImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    color: '#2bc5b4',
    spineColor: '#2a6b3a',
  },
      {
    title: 'Portfolio CMS',
    subtitle: 'Content Management System',
    description:
      'A headless CMS built specifically to power this portfolio. Supports rich-text editing, image uploads, project metadata, and live preview. Built with a REST API backend and a React admin panel.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    liveUrl: '#',
    teammates: [],
    color: '#e87d2b',
    spineColor: '#8b4513',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
      {
    title: 'Portfolio CMS',
    subtitle: 'Content Management System',
    description:
      'A headless CMS built specifically to power this portfolio. Supports rich-text editing, image uploads, project metadata, and live preview. Built with a REST API backend and a React admin panel.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    liveUrl: '#',
    teammates: [],
    color: '#e87d2b',
    spineColor: '#8b4513',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
    {
    title: 'Task Manager',
    subtitle: 'Collaborative Tool',
    description:
      'Real-time collaborative task board with WebSocket-powered live updates, drag-and-drop Kanban boards, team roles & permissions, and email notifications via Resend.',
    techStack: ['TypeScript', 'Next.js', 'Prisma', 'WebSocket', 'Resend'],
    previewImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    color: '#2bc5b4',
    spineColor: '#2a6b3a',
  },
    {
    title: 'Task Manager',
    subtitle: 'Collaborative Tool',
    description:
      'Real-time collaborative task board with WebSocket-powered live updates, drag-and-drop Kanban boards, team roles & permissions, and email notifications via Resend.',
    techStack: ['TypeScript', 'Next.js', 'Prisma', 'WebSocket', 'Resend'],
    previewImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    color: '#2bc5b4',
    spineColor: '#2a6b3a',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
    {
    title: 'Portfolio CMS',
    subtitle: 'Content Management System',
    description:
      'A headless CMS built specifically to power this portfolio. Supports rich-text editing, image uploads, project metadata, and live preview. Built with a REST API backend and a React admin panel.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    liveUrl: '#',
    teammates: [],
    color: '#e87d2b',
    spineColor: '#8b4513',
  },
  {
    title: 'Game Engine UI',
    subtitle: 'Interactive Experience',
    description:
      'A browser-based 2D game engine UI with a scene editor, asset manager, physics sandbox, and real-time preview. Built entirely with Canvas API and vanilla TypeScript — no external game libraries.',
    techStack: ['TypeScript', 'Canvas API', 'Web Workers', 'Vite'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=60',
    codeUrl: 'https://github.com/Derick-Feb/',
    teammates: [
      {
        name: 'Kevin Mugisha',
        role: 'Game Designer',
        links: [
          { label: 'GitHub', url: 'https://github.com/' },
          { label: 'Instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Sandra Iradukunda',
        role: 'Artist',
        links: [{ label: 'Instagram', url: 'https://instagram.com/' }],
      },
    ],
    color: '#4ab0e8',
    spineColor: '#1a4a6b',
  },
];