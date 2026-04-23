export interface Testimonial {
  name: string;
  role: string;
  company: string;
  comment: string;
  projectWorkedOn: string;
  profileImage?: string;
  contactLinks: { label: string; url: string }[];
  silhouetteColor: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Müller',
    role: 'Product Lead',
    company: 'TechFlow GmbH',
    comment: "Derick's attention to detail and ability to translate complex requirements into elegant solutions is truly impressive. He delivered the project ahead of schedule with zero bugs.",
    projectWorkedOn: 'E-Commerce Platform',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=60',
    contactLinks: [
      { label: 'LinkedIn', url: 'https://linkedin.com/' },
      { label: 'Email', url: 'mailto:sarah@techflow.de' },
    ],
    silhouetteColor: '#c87941',
  },
  {
    name: 'Kwame Asante',
    role: 'CTO',
    company: 'AfriTech Solutions',
    comment: "Working with Derick felt like having a senior engineer on the team. His code is clean, documented, and his communication throughout the project was excellent.",
    projectWorkedOn: 'Analytics Dashboard',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=60',
    contactLinks: [
      { label: 'LinkedIn', url: 'https://linkedin.com/' },
      { label: 'Twitter', url: 'https://twitter.com/' },
    ],
    silhouetteColor: '#7b5ea7',
  },
  {
    name: 'Yuki Tanaka',
    role: 'Founder',
    company: 'NeonPlay Studios',
    comment: "He built our gaming platform from scratch with lightning speed. The animations and UX he crafted blew our investors away. Highly recommend.",
    projectWorkedOn: 'Game Engine UI',
    contactLinks: [
      { label: 'Website', url: 'https://neonplay.jp' },
      { label: 'LinkedIn', url: 'https://linkedin.com/' },
    ],
    silhouetteColor: '#4a8c6f',
  },
  {
    name: 'Maria Rodriguez',
    role: 'Engineering Manager',
    company: 'CloudScale Inc',
    comment: "Derick transformed our infrastructure with his DevOps expertise. The CI/CD pipeline he built reduced our deployment time by 80%. Absolutely stellar work.",
    projectWorkedOn: 'DevOps Pipeline',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=60',
    contactLinks: [
      { label: 'LinkedIn', url: 'https://linkedin.com/' },
      { label: 'Email', url: 'mailto:maria@cloudscale.io' },
    ],
    silhouetteColor: '#c45c8a',
  },
  {
    name: 'Ahmed Hassan',
    role: 'Tech Lead',
    company: 'FinTech Pro',
    comment: "Outstanding work on our payment gateway integration. Derick's security-first approach and attention to edge cases gave us confidence in production.",
    projectWorkedOn: 'Payment Gateway',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=60',
    contactLinks: [
      { label: 'LinkedIn', url: 'https://linkedin.com/' },
      { label: 'GitHub', url: 'https://github.com/' },
    ],
    silhouetteColor: '#4a7fc1',
  },
  {
    name: 'Elena Popov',
    role: 'Design Director',
    company: 'Creative Labs',
    comment: "Derick bridges the gap between design and engineering perfectly. He implemented our complex animations flawlessly and even suggested improvements we hadn't thought of.",
    projectWorkedOn: 'Interactive Portfolio',
    contactLinks: [
      { label: 'LinkedIn', url: 'https://linkedin.com/' },
      { label: 'Dribbble', url: 'https://dribbble.com/' },
    ],
    silhouetteColor: '#d4a843',
  },
];
