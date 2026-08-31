"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../api/usersService";
import {
  User,
  UpdateUserPayload,
  ChangePasswordPayload,
} from "../types/user.types";
import { MessageResponse } from "@/shared/types/api.types";

export const USER_QUERY_KEYS = {
  currentUser: ["currentUser"] as const,
  allUser: ["allUsers"] as const,
};

export function useCurrentUser(options?: { enabled?: boolean }) {
  const hasToken =
    typeof window !== "undefined"
      ? Boolean(localStorage.getItem("accessToken"))
      : false;

  return useQuery<User, Error>({
    queryKey: USER_QUERY_KEYS.currentUser,
    queryFn: () => usersService.getProfile(),
    enabled: options?.enabled !== undefined ? options.enabled : hasToken,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateUserPayload>({
    mutationFn: (payload) => usersService.updateProfile(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(USER_QUERY_KEYS.currentUser, data);
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.currentUser });
    },
  });
}

export function useChangePassword() {
  return useMutation<MessageResponse, Error, ChangePasswordPayload>({
    mutationFn: (payload) => usersService.changePassword(payload),
  });
}

export function useFetchAllUser(options?: { enabled?: boolean }) {
  const hasToken =
    typeof window !== "undefined"
      ? Boolean(localStorage.getItem("accessToken"))
      : false;
    return useQuery<User[], Error>({
    queryKey: USER_QUERY_KEYS.allUser,
    queryFn: () => usersService.getAllUser(),
    enabled: options?.enabled !== undefined ? options.enabled : hasToken,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
