import api from "@/api/axios";
import {
  User,
  UpdateUserPayload,
  ChangePasswordPayload,
} from "../types/user.types";
import { MessageResponse } from "@/shared/types/api.types";

export const usersService = {
  getAllUser:async():Promise<User[]>=>{
    const response = await api.get<User[]>("/users/getAll");
    return response.data
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get<User>("/users/me");
    return response.data;
  },

  updateProfile: async (payload: UpdateUserPayload): Promise<User> => {
    const response = await api.patch<User>("/users/me", payload);
    return response.data;
  },

  changePassword: async (
    payload: ChangePasswordPayload
  ): Promise<MessageResponse> => {
    const response = await api.patch<MessageResponse>(
      "/users/me/password",
      payload
    );
    return response.data;
  },
};

export default usersService;
