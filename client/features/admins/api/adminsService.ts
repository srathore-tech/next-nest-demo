import api from "@/api/axios";
import { AdminUsersResponse } from "../types/admin.types";

export const adminsService = {
  getUsers: async (): Promise<AdminUsersResponse> => {
    const response = await api.get<AdminUsersResponse>("/admins/users");
    return response.data;
  },
};

export default adminsService;
