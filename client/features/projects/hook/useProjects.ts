"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectsService } from "../api/projectsService";
import {
  Project,
  CreateProjectPayload,
  UpdateProjectPayload,
} from "../types/project.types";
import { MessageResponse } from "@/shared/types/api.types";

export const PROJECT_QUERY_KEYS = {
  all: ["projects"] as const,
  byTeam: (teamId: string) =>
    [...PROJECT_QUERY_KEYS.all, "byTeam", teamId] as const,
  detail: (id: string) => [...PROJECT_QUERY_KEYS.all, "detail", id] as const,
};

export function useProjectsByTeam(
  teamId: string,
  options?: { enabled?: boolean }
) {
  return useQuery<Project[], Error>({
    queryKey: PROJECT_QUERY_KEYS.byTeam(teamId),
    queryFn: () => projectsService.findByTeam(teamId),
    enabled: options?.enabled !== undefined ? options.enabled : Boolean(teamId),
  });
}

export function useProject(id: string, options?: { enabled?: boolean }) {
  return useQuery<Project, Error>({
    queryKey: PROJECT_QUERY_KEYS.detail(id),
    queryFn: () => projectsService.findById(id),
    enabled: options?.enabled !== undefined ? options.enabled : Boolean(id),
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation<
    Project,
    Error,
    { teamId: string; payload: CreateProjectPayload }
  >({
    mutationFn: ({ teamId, payload }) =>
      projectsService.create(teamId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_QUERY_KEYS.byTeam(variables.teamId),
      });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation<
    Project,
    Error,
    { id: string; payload: UpdateProjectPayload; teamId?: string }
  >({
    mutationFn: ({ id, payload }) => projectsService.update(id, payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_QUERY_KEYS.detail(variables.id),
      });
      if (variables.teamId) {
        queryClient.invalidateQueries({
          queryKey: PROJECT_QUERY_KEYS.byTeam(variables.teamId),
        });
      } else {
        queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.all });
      }
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation<
    MessageResponse,
    Error,
    { id: string; teamId?: string }
  >({
    mutationFn: ({ id }) => projectsService.remove(id),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({
        queryKey: PROJECT_QUERY_KEYS.detail(variables.id),
      });
      if (variables.teamId) {
        queryClient.invalidateQueries({
          queryKey: PROJECT_QUERY_KEYS.byTeam(variables.teamId),
        });
      } else {
        queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.all });
      }
    },
  });
}
