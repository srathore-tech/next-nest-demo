export interface ProjectCreator {
  _id: string;
  name: string;
  email: string;
}

export interface ProjectTeamRef {
  _id: string;
  name: string;
  owner?: string;
  members?: string[];
}

export interface Project {
  _id: string;
  name: string;
  description?: string;
  team: ProjectTeamRef | string;
  createdBy: ProjectCreator | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
}

export interface UpdateProjectPayload {
  name?: string;
  description?: string;
}
