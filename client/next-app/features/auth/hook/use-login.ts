"use client";

import { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/authService";



export function useLogin() {
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: (payload) => authService.login(payload),
  });
}

export function useRegister() {
  return useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: (payload) => authService.register(payload),
  });
}