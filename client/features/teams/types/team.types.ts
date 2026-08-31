export interface TeamMember {
  _id: string;
  name: string;
  email: string;
}

export interface Team {
  _id: string;
  name: string;
  description?: string;
  owner: TeamMember | string;
  members: TeamMember[] | string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTeamPayload {
  name: string;
  description?: string;
}

export interface UpdateTeamPayload {
  name?: string;
  description?: string;
}

export interface AddTeamMemberPayload {
  userId: string;
}


export interface TeamResponse {
  _id: string;
  name: string;
  description?: string;
  owner: {
    _id: string;
    name: string;
    email?: string;
  };
  members: Array<{
    _id: string;
    name: string;
    email?: string;
  }>;
}

export interface CreateTeamForm {
  name: string;
  description: string;
}

export interface TeamListProps {
  teams?: TeamResponse[];
  isLoading?: boolean;
  onCreateTeam?: (data: CreateTeamForm) => void | Promise<void>;
  onEditTeam?: (team: TeamResponse) => void;
  onDeleteTeam?: (teamId: string) => void;
}
