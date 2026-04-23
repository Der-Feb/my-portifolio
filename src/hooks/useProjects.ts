import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService, CreateProjectDto, CreatePartnerDto } from '@/services/project.service';
import { Project } from '@/types/api';

export const PROJECTS_QUERY_KEY = ['projects'];

/**
 * Hook to fetch all projects
 */
export const useProjects = () => {
  return useQuery({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: projectService.getAll,
  });
};

/**
 * Hook to fetch a single project by ID
 */
export const useProject = (id: string) => {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, id],
    queryFn: () => projectService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook to create a new project
 */
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectDto) => projectService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
};

/**
 * Hook to update a project
 */
export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateProjectDto }) =>
      projectService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
};

/**
 * Hook to delete a project
 */
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
};

/**
 * Hook to add a partner to a project
 */
export const useAddPartner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, data }: { projectId: string; data: CreatePartnerDto }) =>
      projectService.addPartner(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
};

/**
 * Hook to update a partner
 */
export const useUpdatePartner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      partnerId,
      data,
    }: {
      projectId: string;
      partnerId: string;
      data: CreatePartnerDto;
    }) => projectService.updatePartner(projectId, partnerId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
};

/**
 * Hook to delete a partner
 */
export const useDeletePartner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, partnerId }: { projectId: string; partnerId: string }) =>
      projectService.deletePartner(projectId, partnerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
};
