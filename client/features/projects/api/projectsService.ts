import api from "@/api/axios";
import {
  Project,
  CreateProjectPayload,
  UpdateProjectPayload,
} from "../types/project.types";
import { MessageResponse } from "@/shared/types/api.types";

export const projectsService = {
  create: async (
    teamId: string,
    payload: CreateProjectPayload
  ): Promise<Project> => {
    const response = await api.post<Project>(
      `/teams/${teamId}/projects`,
      payload
    );
    return response.data;
  },

  findByTeam: async (teamId: string): Promise<Project[]> => {
    const response = await api.get<Project[]>(`/teams/${teamId}/projects`);
    return response.data;
  },

  findById: async (id: string): Promise<Project> => {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },

  update: async (
    id: string,
    payload: UpdateProjectPayload
  ): Promise<Project> => {
    const response = await api.patch<Project>(`/projects/${id}`, payload);
    return response.data;
  },

  remove: async (id: string): Promise<MessageResponse> => {
    const response = await api.delete<MessageResponse>(`/projects/${id}`);
    return response.data;
  },
};

export default projectsService;
