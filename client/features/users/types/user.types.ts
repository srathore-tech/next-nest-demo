import { Role } from "@/shared/types/enums";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
