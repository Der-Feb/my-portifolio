import { useState } from 'react';
import { useContact } from '@/hooks/useContact';

/**
 * Example contact form component using the API
 */
export const ContactFormExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { mutate: sendMessage, isPending, isSuccess, isError, error } = useContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(formData, {
      onSuccess: () => {
        // Reset form on success
        setFormData({ name: '', email: '', message: '' });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Form</h2>
      
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Message'}
      </button>

      {isSuccess && <div style={{ color: 'green' }}>Message sent successfully!</div>}
      {isError && <div style={{ color: 'red' }}>Error: {error?.message}</div>}
    </form>
  );
};
