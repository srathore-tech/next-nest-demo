"use client";

import { useQuery } from "@tanstack/react-query";
import { adminsService } from "../api/adminsService";
import { AdminUsersResponse } from "../types/admin.types";

export const ADMIN_QUERY_KEYS = {
  all: ["admins"] as const,
  users: () => [...ADMIN_QUERY_KEYS.all, "users"] as const,
};

export function useAdminUsers(options?: { enabled?: boolean }) {
  return useQuery<AdminUsersResponse, Error>({
    queryKey: ADMIN_QUERY_KEYS.users(),
    queryFn: () => adminsService.getUsers(),
    enabled: options?.enabled,
  });
}
