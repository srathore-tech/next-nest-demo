import api from "@/api/axios";
import {
  Team,
  TeamMember,
  CreateTeamPayload,
  UpdateTeamPayload,
  AddTeamMemberPayload,
} from "../types/team.types";
import { MessageResponse } from "@/shared/types/api.types";

export const teamsService = {
  create: async (payload: CreateTeamPayload): Promise<Team> => {
    const response = await api.post<Team>("/teams", payload);
    return response.data;
  },

  findMyTeams: async (): Promise<Team[]> => {
    const response = await api.get<Team[]>("/teams");
    return response.data;
  },

  findById: async (id: string): Promise<Team> => {
    const response = await api.get<Team>(`/teams/${id}`);
    return response.data;
  },

  update: async (id: string, payload: UpdateTeamPayload): Promise<Team> => {
    const response = await api.patch<Team>(`/teams/${id}`, payload);
    return response.data;
  },

  remove: async (id: string): Promise<MessageResponse> => {
    const response = await api.delete<MessageResponse>(`/teams/${id}`);
    return response.data;
  },

  addMember: async (
    id: string,
    payload: AddTeamMemberPayload
  ): Promise<Team> => {
    const response = await api.post<Team>(`/teams/${id}/members`, payload);
    return response.data;
  },

  removeMember: async (id: string, memberId: string): Promise<Team> => {
    const response = await api.delete<Team>(`/teams/${id}/members/${memberId}`);
    return response.data;
  },

  getMembers: async (id: string): Promise<TeamMember[]> => {
    const response = await api.get<TeamMember[]>(`/teams/${id}/members`);
    return response.data;
  },
};

export default teamsService;
