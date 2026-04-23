import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { testimonialService, CreateTestimonialDto } from '@/services/testimonial.service';

export const TESTIMONIALS_QUERY_KEY = ['testimonials'];

/**
 * Hook to fetch all testimonials
 */
export const useTestimonials = () => {
  return useQuery({
    queryKey: TESTIMONIALS_QUERY_KEY,
    queryFn: testimonialService.getAll,
  });
};

/**
 * Hook to fetch a single testimonial by ID
 */
export const useTestimonial = (id: string) => {
  return useQuery({
    queryKey: [...TESTIMONIALS_QUERY_KEY, id],
    queryFn: () => testimonialService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook to create a new testimonial
 */
export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTestimonialDto) => testimonialService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIALS_QUERY_KEY });
    },
  });
};

/**
 * Hook to update a testimonial
 */
export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateTestimonialDto }) =>
      testimonialService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIALS_QUERY_KEY });
    },
  });
};

/**
 * Hook to delete a testimonial
 */
export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => testimonialService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIALS_QUERY_KEY });
    },
  });
};
