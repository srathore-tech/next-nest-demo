import { TaskPriority, TaskStatus } from "@/shared/types/enums";
import { PaginationQuery } from "@/shared/types/api.types";

export interface TaskUserRef {
  _id: string;
  name: string;
  email: string;
}

export interface TaskProjectRef {
  _id: string;
  name: string;
  team?: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  project: TaskProjectRef | string;
  assignedTo?: TaskUserRef | null;
  createdBy: TaskUserRef | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskQueryPayload extends PaginationQuery {
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
  sortBy?: "createdAt" | "updatedAt" | "title" | "priority";
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  priority?: TaskPriority;
  assignedTo?: string | null;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedTo?: string | null;
}
