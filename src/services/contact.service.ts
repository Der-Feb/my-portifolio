import apiClient from '@/lib/api-client';
import { ContactRequest } from '@/types/api';

export const contactService = {
  /**
   * Send contact message (public endpoint)
   */
  sendMessage: async (data: ContactRequest): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/api/contact-us', data);
    return response.data;
  },
};
