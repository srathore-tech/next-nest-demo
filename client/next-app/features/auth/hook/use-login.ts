"use client";

import { AuthResponse, LoginPayload } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/authService";



export function useLogin() {
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: (payload) => authService.login(payload),
  });
}