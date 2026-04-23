import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { availabilityService } from '@/services/availability.service';
import { AvailabilityStatus } from '@/types/api';

export const AVAILABILITY_QUERY_KEY = ['availability'];

/**
 * Hook to fetch availability status with automatic polling
 */
export const useAvailability = () => {
  return useQuery({
    queryKey: AVAILABILITY_QUERY_KEY,
    queryFn: availabilityService.getStatus,
    refetchInterval: 30000, // Poll every 30 seconds
    refetchIntervalInBackground: true, // Continue polling even when tab is not focused
  });
};

/**
 * Hook to update availability status (admin only)
 */
export const useUpdateAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (availableForWork: boolean) =>
      availabilityService.updateStatus(availableForWork),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AVAILABILITY_QUERY_KEY });
    },
  });
};

/**
 * Hook for real-time availability updates via SSE
 */
export const useAvailabilityStream = () => {
  const [status, setStatus] = useState<AvailabilityStatus | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let eventSource: EventSource | null = null;

    try {
      eventSource = availabilityService.createEventSource();

      eventSource.onopen = () => {
        setIsConnected(true);
        setError(null);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setStatus(data);
        } catch (err) {
          console.error('Failed to parse SSE data:', err);
        }
      };

      eventSource.onerror = (err) => {
        console.error('SSE error:', err);
        setIsConnected(false);
        setError('Connection lost');
        eventSource?.close();
      };
    } catch (err) {
      setError('Failed to connect');
      console.error('Failed to create EventSource:', err);
    }

    return () => {
      eventSource?.close();
    };
  }, []);

  return { status, isConnected, error };
};
