import { useProjects } from '@/hooks/useProjects';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useAvailability } from '@/hooks/useAvailability';

/**
 * Example component showing how to use the API hooks
 * Replace mock data with these patterns in your actual components
 */
export const ProjectsExample = () => {
  // Fetch projects from API
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useProjects();

  // Fetch testimonials from API
  const { data: testimonials, isLoading: testimonialsLoading } = useTestimonials();

  // Fetch availability status
  const { data: availability, isLoading: availabilityLoading } = useAvailability();

  if (projectsLoading) {
    return <div>Loading projects...</div>;
  }

  if (projectsError) {
    return <div>Error loading projects: {projectsError.message}</div>;
  }

  return (
    <div>
      <h2>Projects from API</h2>
      <div>
        {projects?.map((project) => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.subtitle}</p>
            <p>{project.description}</p>
            <div>
              Tech Stack: {project.techStack.join(', ')}
            </div>
            {project.partners.length > 0 && (
              <div>
                <h4>Partners:</h4>
                {project.partners.map((partner) => (
                  <div key={partner.id}>
                    {partner.name} - {partner.role}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <h2>Testimonials from API</h2>
      {testimonialsLoading ? (
        <div>Loading testimonials...</div>
      ) : (
        <div>
          {testimonials?.map((testimonial) => (
            <div key={testimonial.id}>
              <h3>{testimonial.name}</h3>
              <p>{testimonial.role} at {testimonial.company}</p>
              <p>{testimonial.comment}</p>
            </div>
          ))}
        </div>
      )}

      <h2>Availability Status</h2>
      {availabilityLoading ? (
        <div>Loading availability...</div>
      ) : (
        <div>
          Status: {availability?.availableForWork ? 'Available for work' : 'Not available'}
        </div>
      )}
    </div>
  );
};
