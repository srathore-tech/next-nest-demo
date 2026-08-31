"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { teamsService } from "../api/teamsService";
import {
  Team,
  TeamMember,
  CreateTeamPayload,
  UpdateTeamPayload,
  AddTeamMemberPayload,
} from "../types/team.types";
import { MessageResponse } from "@/shared/types/api.types";

export const TEAM_QUERY_KEYS = {
  all: ["teams"] as const,
  myTeams: () => [...TEAM_QUERY_KEYS.all, "my"] as const,
  detail: (id: string) => [...TEAM_QUERY_KEYS.all, "detail", id] as const,
  members: (id: string) => [...TEAM_QUERY_KEYS.all, "members", id] as const,
};

export function useMyTeams(options?: { enabled?: boolean }) {
  return useQuery<Team[], Error>({
    queryKey: TEAM_QUERY_KEYS.myTeams(),
    queryFn: () => teamsService.findMyTeams(),
    enabled: options?.enabled,
  });
}

export function useTeam(id: string, options?: { enabled?: boolean }) {
  return useQuery<Team, Error>({
    queryKey: TEAM_QUERY_KEYS.detail(id),
    queryFn: () => teamsService.findById(id),
    enabled: options?.enabled !== undefined ? options.enabled : Boolean(id),
  });
}

export function useTeamMembers(id: string, options?: { enabled?: boolean }) {
  return useQuery<TeamMember[], Error>({
    queryKey: TEAM_QUERY_KEYS.members(id),
    queryFn: () => teamsService.getMembers(id),
    enabled: options?.enabled !== undefined ? options.enabled : Boolean(id),
  });
}

export function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation<Team, Error, CreateTeamPayload>({
    mutationFn: (payload) => teamsService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_QUERY_KEYS.myTeams() });
    },
  });
}

export function useUpdateTeam() {
  const queryClient = useQueryClient();

  return useMutation<Team, Error, { id: string; payload: UpdateTeamPayload }>({
    mutationFn: ({ id, payload }) => teamsService.update(id, payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: TEAM_QUERY_KEYS.myTeams() });
      queryClient.invalidateQueries({
        queryKey: TEAM_QUERY_KEYS.detail(variables.id),
      });
    },
  });
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();

  return useMutation<MessageResponse, Error, string>({
    mutationFn: (id) => teamsService.remove(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: TEAM_QUERY_KEYS.myTeams() });
      queryClient.removeQueries({ queryKey: TEAM_QUERY_KEYS.detail(id) });
    },
  });
}

export function useAddTeamMember() {
  const queryClient = useQueryClient();

  return useMutation<Team, Error, { id: string; payload: AddTeamMemberPayload }>({
    mutationFn: ({ id, payload }) => teamsService.addMember(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: TEAM_QUERY_KEYS.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: TEAM_QUERY_KEYS.members(variables.id),
      });
    },
  });
}

export function useRemoveTeamMember() {
  const queryClient = useQueryClient();

  return useMutation<Team, Error, { id: string; memberId: string }>({
    mutationFn: ({ id, memberId }) => teamsService.removeMember(id, memberId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: TEAM_QUERY_KEYS.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: TEAM_QUERY_KEYS.members(variables.id),
      });
    },
  });
}
