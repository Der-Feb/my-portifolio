import apiClient from '@/lib/api-client';
import { Project } from '@/types/api';

export interface CreateProjectDto {
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  previewImage: string;
  codeUrl: string;
  liveUrl?: string;
  color: string;
  spineColor: string;
}

export interface CreatePartnerDto {
  name: string;
  role: string;
  links: { label: string; url: string }[];
}

export const projectService = {
  /**
   * Get all projects (public endpoint)
   */
  getAll: async (): Promise<Project[]> => {
    const response = await apiClient.get<Project[]>('/api/projects');
    return response.data;
  },

  /**
   * Get project by ID
   */
  getById: async (id: string): Promise<Project> => {
    const response = await apiClient.get<Project>(`/api/projects/${id}`);
    return response.data;
  },

  /**
   * Create new project (admin only)
   */
  create: async (data: CreateProjectDto): Promise<Project> => {
    const response = await apiClient.post<Project>('/api/projects', data);
    return response.data;
  },

  /**
   * Update project (admin only)
   */
  update: async (id: string, data: CreateProjectDto): Promise<Project> => {
    const response = await apiClient.put<Project>(`/api/projects/${id}`, data);
    return response.data;
  },

  /**
   * Delete project (admin only)
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/projects/${id}`);
  },

  /**
   * Add partner to project (admin only)
   */
  addPartner: async (projectId: string, data: CreatePartnerDto): Promise<Project> => {
    const response = await apiClient.post<Project>(
      `/api/projects/${projectId}/partners`,
      data
    );
    return response.data;
  },

  /**
   * Update partner (admin only)
   */
  updatePartner: async (
    projectId: string,
    partnerId: string,
    data: CreatePartnerDto
  ): Promise<Project> => {
    const response = await apiClient.put<Project>(
      `/api/projects/${projectId}/partners/${partnerId}`,
      data
    );
    return response.data;
  },

  /**
   * Delete partner (admin only)
   */
  deletePartner: async (projectId: string, partnerId: string): Promise<void> => {
    await apiClient.delete(`/api/projects/${projectId}/partners/${partnerId}`);
  },
};
