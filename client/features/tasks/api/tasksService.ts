import api from "@/api/axios";
import {
  Task,
  TaskQueryPayload,
  CreateTaskPayload,
  UpdateTaskPayload,
} from "../types/task.types";
import { PaginatedResponse, MessageResponse } from "@/shared/types/api.types";

export const tasksService = {
  create: async (
    projectId: string,
    payload: CreateTaskPayload
  ): Promise<Task> => {
    const response = await api.post<Task>(
      `/projects/${projectId}/tasks`,
      payload
    );
    return response.data;
  },

  findByProject: async (
    projectId: string,
    query?: TaskQueryPayload
  ): Promise<PaginatedResponse<Task>> => {
    const response = await api.get<PaginatedResponse<Task>>(
      `/projects/${projectId}/tasks`,
      { params: query }
    );
    return response.data;
  },

  findMyTasks: async (
    query?: TaskQueryPayload
  ): Promise<PaginatedResponse<Task>> => {
    const response = await api.get<PaginatedResponse<Task>>("/tasks/my", {
      params: query,
    });
    return response.data;
  },

  findById: async (id: string): Promise<Task> => {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  update: async (id: string, payload: UpdateTaskPayload): Promise<Task> => {
    const response = await api.patch<Task>(`/tasks/${id}`, payload);
    return response.data;
  },

  remove: async (id: string): Promise<MessageResponse> => {
    const response = await api.delete<MessageResponse>(`/tasks/${id}`);
    return response.data;
  },
};

export default tasksService;
