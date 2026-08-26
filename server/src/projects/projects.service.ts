import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Project, ProjectDocument } from "./schemas/project.schema";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { TeamsService } from "src/teams/teams.service";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    private readonly teamsService: TeamsService,
  ) {}

  async create(
    teamId: string,
    createProjectDto: CreateProjectDto,
    userId: string,
  ) {
    const team = await this.teamsService.findTeamById(teamId);

    const isOwner = team.owner.toString() === userId;
    if (!isOwner) {
      throw new ForbiddenException("Only the team owner can create projects");
    }

    const project = await this.projectModel.create({
      ...createProjectDto,
      team: new Types.ObjectId(teamId),
      createdBy: new Types.ObjectId(userId),
    });

    return project.populate([
      { path: "team", select: "name" },
      { path: "createdBy", select: "name email" },
    ]);
  }

  async findByTeam(teamId: string, userId: string) {
    const isMember = await this.teamsService.isTeamMember(teamId, userId);
    if (!isMember) {
      throw new ForbiddenException(
        "You must be a team member to view projects",
      );
    }

    return this.projectModel
      .find({ team: new Types.ObjectId(teamId) })
      .populate("createdBy", "name email");
  }

  async findRawById(projectId: string) {
    const project = await this.projectModel.findById(projectId);

    if (!project) {
      throw new NotFoundException("Project not found");
    }

    return project;
  }
  async findById(projectId: string, userId: string) {
    const project = await this.projectModel.findById(projectId);
    // .populate("team", "name owner members")
    // .populate("createdBy", "name email");

    if (!project) {
      throw new NotFoundException("Project not found");
    }

    const teamId = project.team.toString();
    const isMember = await this.teamsService.isTeamMember(teamId, userId);
    if (!isMember) {
      throw new ForbiddenException(
        "You must be a team member to view this project",
      );
    }

    return project.populate([
      {
        path: "team",
        select: "name owner members",
      },
      {
        path: "createdBy",
        select: "name email",
      },
    ]);
  }

  async update(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
  ) {
    const project = await this.projectModel.findById(projectId);
    if (!project) {
      throw new NotFoundException("Project not found");
    }

    const teamId = project.team.toString();
    const team = await this.teamsService.findTeamById(teamId);

    const isOwner = team.owner.toString() === userId;
    if (!isOwner) {
      throw new ForbiddenException("Only the team owner can update projects");
    }

    Object.assign(project, updateProjectDto);
    return project.save();
  }

  async remove(projectId: string, userId: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) {
      throw new NotFoundException("Project not found");
    }

    const teamId = project.team.toString();
    const team = await this.teamsService.findTeamById(teamId);

    const isOwner = team.owner.toString() === userId;
    if (!isOwner) {
      throw new ForbiddenException("Only the team owner can delete projects");
    }

    await project.deleteOne();
    return { message: "Project deleted successfully" };
  }
}
