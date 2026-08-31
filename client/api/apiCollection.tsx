import authService from "@/features/auth/api/authService";
import usersService from "@/features/users/api/usersService";
import teamsService from "@/features/teams/api/teamsService";
import projectsService from "@/features/projects/api/projectsService";
import tasksService from "@/features/tasks/api/tasksService";
import adminsService from "@/features/admins/api/adminsService";

export const apiCollection = {
  auth: authService,
  users: usersService,
  teams: teamsService,
  projects: projectsService,
  tasks: tasksService,
  admins: adminsService,
};

export default apiCollection;