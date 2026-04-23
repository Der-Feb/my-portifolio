import apiClient from '@/lib/api-client';
import { AvailabilityStatus } from '@/types/api';

export const availabilityService = {
  /**
   * Get current availability status (public endpoint)
   */
  getStatus: async (): Promise<AvailabilityStatus> => {
    const response = await apiClient.get<AvailabilityStatus>('/api/availability/status');
    return response.data;
  },

  /**
   * Update availability status (admin only)
   */
  updateStatus: async (availableForWork: boolean): Promise<AvailabilityStatus> => {
    const response = await apiClient.put<AvailabilityStatus>('/api/availability/status', {
      availableForWork,
    });
    return response.data;
  },

  /**
   * Create SSE connection for real-time availability updates
   */
  createEventSource: (): EventSource => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:2045';
    return new EventSource(`${API_BASE_URL}/api/availability/stream`, {
      withCredentials: true,
    });
  },
};
