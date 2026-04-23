import apiClient from '@/lib/api-client';
import { LoginRequest, LoginResponse } from '@/types/api';

export const authService = {
  /**
   * Login with username and password
   * JWT token is automatically stored in HTTP-only cookie
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials);
    return response.data;
  },

  /**
   * Logout and clear JWT cookie
   */
  logout: async (): Promise<void> => {
    await apiClient.post('/api/auth/logout');
  },
};
