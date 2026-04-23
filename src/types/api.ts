// API Response Types

export interface Partner {
  id: string;
  name: string;
  role: string;
  links: { label: string; url: string }[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  previewImage: string;
  codeUrl: string;
  liveUrl?: string;
  partners: Partner[];
  color: string;
  spineColor: string;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  projectWorkedOn: string;
  profileImage?: string;
  contactLinks: { label: string; url: string }[];
  silhouetteColor: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export interface AvailabilityStatus {
  availableForWork: boolean;
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface ApiError {
  status: number;
  error: string;
  message: string;
}
