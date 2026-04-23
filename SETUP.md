# Frontend Setup Guide

## Prerequisites

- Node.js 18+ installed
- Backend API running on port 2045
- PostgreSQL database configured

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   # Copy the example env file
   cp .env.example .env.development
   
   # Edit .env.development and set your API URL
   # Default: VITE_API_BASE_URL=http://localhost:2045
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:2030`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build with development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/          # React components
│   ├── portfolio/      # Portfolio-specific components
│   ├── ui/            # Reusable UI components (shadcn)
│   └── examples/      # Example components showing API usage
├── contexts/           # React contexts (Auth, etc.)
├── hooks/             # Custom React hooks
│   ├── useProjects.ts
│   ├── useTestimonials.ts
│   ├── useAvailability.ts
│   └── useContact.ts
├── lib/               # Utility libraries
│   ├── api-client.ts  # Axios configuration
│   ├── query-client.ts # React Query configuration
│   └── utils.ts       # Helper functions
├── services/          # API service layer
│   ├── auth.service.ts
│   ├── project.service.ts
│   ├── testimonial.service.ts
│   ├── availability.service.ts
│   └── contact.service.ts
├── types/             # TypeScript type definitions
│   └── api.ts         # API response types
├── pages/             # Page components
└── App.tsx            # Main app component
```

## Integration with Backend

The frontend is fully integrated with the Spring Boot backend. See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for detailed documentation.

### Quick Start - Using the API

```tsx
import { useProjects } from '@/hooks/useProjects';

function MyComponent() {
  const { data: projects, isLoading, error } = useProjects();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {projects?.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
}
```

## Authentication

The app uses JWT authentication with HTTP-only cookies:

```tsx
import { useAuth } from '@/contexts/AuthContext';

function LoginButton() {
  const { login, isAuthenticated, logout } = useAuth();
  
  const handleLogin = async () => {
    await login({ username: 'admin', password: 'password' });
  };
  
  return isAuthenticated ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <button onClick={handleLogin}>Login</button>
  );
}
```

## Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL (default: http://localhost:2045)

## Troubleshooting

### Port Already in Use
If port 2030 is already in use, you can change it in `vite.config.ts`:
```ts
server: {
  port: 3000, // Change to your preferred port
}
```

### CORS Errors
Ensure the backend CORS configuration includes your frontend URL. Check `SecurityConfig.java` in the backend.

### API Connection Issues
1. Verify backend is running: `http://localhost:2045`
2. Check `.env.development` has correct API URL
3. Ensure PostgreSQL database is running

### Build Errors
If you encounter build errors:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Production Build

1. **Update production environment:**
   ```bash
   # Edit .env.production
   VITE_API_BASE_URL=https://your-production-api.com
   ```

2. **Build:**
   ```bash
   npm run build
   ```

3. **Preview build locally:**
   ```bash
   npm run preview
   ```

4. **Deploy:**
   The `dist/` folder contains the production build ready for deployment.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client
- **React Router** - Routing
- **Shadcn UI** - Component library
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **GSAP** - Advanced animations

## Next Steps

1. Review [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for API usage examples
2. Replace mock data in components with real API calls
3. Implement admin dashboard for content management
4. Add error boundaries and loading states
5. Set up production deployment
