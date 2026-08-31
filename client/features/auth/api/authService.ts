import api from "@/api/axios";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  AuthInfoResponse,
} from "../types/auth.types";

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", payload);
    return response.data;
  },

  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>("/auth/register", payload);
    return response.data;
  },

  getAuthInfo: async (): Promise<AuthInfoResponse> => {
    const response = await api.get<AuthInfoResponse>("/auth");
    return response.data;
  },
};

export default authService;
