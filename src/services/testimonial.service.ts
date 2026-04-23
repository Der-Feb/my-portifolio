import apiClient from '@/lib/api-client';
import { Testimonial } from '@/types/api';

export interface CreateTestimonialDto {
  name: string;
  role: string;
  company: string;
  comment: string;
  projectWorkedOn: string;
  profileImage?: string;
  contactLinks: { label: string; url: string }[];
  silhouetteColor: string;
}

export const testimonialService = {
  /**
   * Get all testimonials (public endpoint)
   */
  getAll: async (): Promise<Testimonial[]> => {
    const response = await apiClient.get<Testimonial[]>('/api/testimonials');
    return response.data;
  },

  /**
   * Get testimonial by ID
   */
  getById: async (id: string): Promise<Testimonial> => {
    const response = await apiClient.get<Testimonial>(`/api/testimonials/${id}`);
    return response.data;
  },

  /**
   * Create new testimonial (admin only)
   */
  create: async (data: CreateTestimonialDto): Promise<Testimonial> => {
    const response = await apiClient.post<Testimonial>('/api/testimonials', data);
    return response.data;
  },

  /**
   * Update testimonial (admin only)
   */
  update: async (id: string, data: CreateTestimonialDto): Promise<Testimonial> => {
    const response = await apiClient.put<Testimonial>(`/api/testimonials/${id}`, data);
    return response.data;
  },

  /**
   * Delete testimonial (admin only)
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/testimonials/${id}`);
  },
};
