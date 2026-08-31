"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tasksService } from "../api/tasksService";
import {
  Task,
  TaskQueryPayload,
  CreateTaskPayload,
  UpdateTaskPayload,
} from "../types/task.types";
import { PaginatedResponse, MessageResponse } from "@/shared/types/api.types";

export const TASK_QUERY_KEYS = {
  all: ["tasks"] as const,
  byProject: (projectId: string, query?: TaskQueryPayload) =>
    [...TASK_QUERY_KEYS.all, "byProject", projectId, query] as const,
  myTasks: (query?: TaskQueryPayload) =>
    [...TASK_QUERY_KEYS.all, "my", query] as const,
  detail: (id: string) => [...TASK_QUERY_KEYS.all, "detail", id] as const,
};

export function useTasksByProject(
  projectId: string,
  query?: TaskQueryPayload,
  options?: { enabled?: boolean }
) {
  return useQuery<PaginatedResponse<Task>, Error>({
    queryKey: TASK_QUERY_KEYS.byProject(projectId, query),
    queryFn: () => tasksService.findByProject(projectId, query),
    enabled:
      options?.enabled !== undefined ? options.enabled : Boolean(projectId),
  });
}

export function useMyTasks(
  query?: TaskQueryPayload,
  options?: { enabled?: boolean }
) {
  return useQuery<PaginatedResponse<Task>, Error>({
    queryKey: TASK_QUERY_KEYS.myTasks(query),
    queryFn: () => tasksService.findMyTasks(query),
    enabled: options?.enabled,
  });
}

export function useTask(id: string, options?: { enabled?: boolean }) {
  return useQuery<Task, Error>({
    queryKey: TASK_QUERY_KEYS.detail(id),
    queryFn: () => tasksService.findById(id),
    enabled: options?.enabled !== undefined ? options.enabled : Boolean(id),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation<
    Task,
    Error,
    { projectId: string; payload: CreateTaskPayload }
  >({
    mutationFn: ({ projectId, payload }) =>
      tasksService.create(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.all });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, { id: string; payload: UpdateTaskPayload }>({
    mutationFn: ({ id, payload }) => tasksService.update(id, payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: TASK_QUERY_KEYS.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.all });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation<MessageResponse, Error, string>({
    mutationFn: (id) => tasksService.remove(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: TASK_QUERY_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.all });
    },
  });
}
