import { useMutation } from '@tanstack/react-query';
import { contactService } from '@/services/contact.service';
import { ContactRequest } from '@/types/api';

/**
 * Hook to send contact message
 */
export const useContact = () => {
  return useMutation({
    mutationFn: (data: ContactRequest) => contactService.sendMessage(data),
  });
};
