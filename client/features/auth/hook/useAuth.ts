"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../api/authService";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  AuthInfoResponse,
} from "../types/auth.types";
import { USER_QUERY_KEYS } from "@/features/users/hook/useUsers";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: (payload) => authService.login(payload),
    onSuccess: (data) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", data.access_token);
      }
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.currentUser });
    },
  });
}

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: (payload) => authService.register(payload),
  });
}

export function useAuthInfo() {
  return useQuery<AuthInfoResponse, Error>({
    queryKey: ["authInfo"],
    queryFn: () => authService.getAuthInfo(),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
    queryClient.clear();
    router.push("/login");
  };

  return { logout };
}
