import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Task, TaskDocument } from "./schemas/task.schema";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ProjectsService } from "src/projects/projects.service";
import { TeamsService } from "src/teams/teams.service";
import { UsersService } from "src/users/users.service";
import { TaskQueryDto } from "./dto/task-query.dto";
import { TaskStatus } from "src/common/enums/task-status.enum";
import { TaskPriority } from "src/common/enums/task-priority.enum";

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
    private readonly projectsService: ProjectsService,
    private readonly teamsService: TeamsService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    projectId: string,
    createTaskDto: CreateTaskDto,
    userId: string,
  ) {
    const project = await this.projectsService.findRawById(projectId);

    const teamId = project.team.toString();
    const isMember = await this.teamsService.isTeamMember(teamId, userId);
    if (!isMember) {
      throw new ForbiddenException("You must be a team member to create tasks");
    }

    if (createTaskDto.assignedTo) {
      const assigneeExists = await this.usersService.findById(
        createTaskDto.assignedTo,
      );
      if (!assigneeExists) {
        throw new NotFoundException("Assigned user not found");
      }

      const assigneeIsMember = await this.teamsService.isTeamMember(
        teamId,
        createTaskDto.assignedTo,
      );
      if (!assigneeIsMember) {
        throw new BadRequestException(
          "Assigned user must be a member of the project's team",
        );
      }
    }

    const task = await this.taskModel.create({
      ...createTaskDto,
      project: new Types.ObjectId(projectId),
      createdBy: new Types.ObjectId(userId),
      assignedTo: createTaskDto.assignedTo
        ? new Types.ObjectId(createTaskDto.assignedTo)
        : undefined,
    });

    return task.populate([
      { path: "project", select: "name" },
      { path: "assignedTo", select: "name email" },
      { path: "createdBy", select: "name email" },
    ]);
  }

  async findByProject(
    projectId: string,
    userId: string,
    queryDto: TaskQueryDto,
  ) {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      search,
      sortBy = "createdAt",
      // sortOrder = "desc",
    } = queryDto;

    const skip = (page - 1) * limit;

    const project = await this.projectsService.findRawById(projectId);

    const teamId = project.team.toString();
    const isMember = await this.teamsService.isTeamMember(teamId, userId);
    if (!isMember) {
      throw new ForbiddenException("You must be a team member to view tasks");
    }

    const filter: {
      project: Types.ObjectId;
      status?: TaskStatus;
      priority?: TaskPriority;
      title?: {
        $regex: string;
        $options: string;
      };
    } = {
      project: new Types.ObjectId(projectId),
    };
    if (priority) {
      filter.priority = priority;
    }
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (status) {
      filter.status = status;
    }

    const [tasks, total] = await Promise.all([
      this.taskModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .populate("assignedTo", "name email")
        .populate("createdBy", "name email"),

      this.taskModel.countDocuments(filter),
    ]);

    return {
      data: tasks,

      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(taskId: string, userId: string) {
    const task = await this.taskModel.findById(taskId);
    // .populate("project", "name team")
    // .populate("assignedTo", "name email")
    // .populate("createdBy", "name email");

    if (!task) {
      throw new NotFoundException("Task not found");
    }
    const project = await this.projectsService.findRawById(
      task.project.toString(),
    );
    // const project = task.project as unknown as { team: Types.ObjectId };
    const teamId = project.team.toString();
    const isMember = await this.teamsService.isTeamMember(teamId, userId);
    if (!isMember) {
      throw new ForbiddenException(
        "You must be a team member to view this task",
      );
    }

    return task.populate([
      {
        path: "project",
        select: "name team",
      },
      {
        path: "assignedTo",
        select: "name email",
      },
      {
        path: "createdBy",
        select: "name email",
      },
    ]);
  }

  async update(taskId: string, updateTaskDto: UpdateTaskDto, userId: string) {
    const task = await this.taskModel.findById(taskId);
    if (!task) {
      throw new NotFoundException("Task not found");
    }

    const project = await this.projectsService.findRawById(
      task.project.toString(),
    );
    const teamId = project.team.toString();
    const team = await this.teamsService.findTeamById(teamId);

    const isOwner = team.owner.toString() === userId;
    const isAssigned = task.assignedTo?.toString() === userId;

    if (!isOwner && !isAssigned) {
      throw new ForbiddenException(
        "Only the team owner or the assigned user can update this task",
      );
    }

    if (!isOwner && updateTaskDto.assignedTo !== undefined) {
      throw new ForbiddenException("Only the team owner can reassign tasks");
    }

    if (!isOwner) {
      const allowedFields = ["status"];
      const requestedFields = Object.entries(updateTaskDto)
        .filter(([_, value]) => value !== undefined)
        .map(([key]) => key);

      const hasForbiddenField = requestedFields.some(
        (field) => !allowedFields.includes(field),
      );
      console.log({ updateTaskDto, hasForbiddenField });
      if (hasForbiddenField) {
        throw new ForbiddenException(
          "Assigned users can only update task status",
        );
      }
    }

    if (updateTaskDto.assignedTo !== undefined) {
      const assigneeId = updateTaskDto.assignedTo;
      if (assigneeId) {
        const user = await this.usersService.findById(assigneeId);

        if (!user) {
          throw new NotFoundException("Assigned user not found");
        }

        const assigneeIsMember = await this.teamsService.isTeamMember(
          teamId,
          assigneeId,
        );
        if (!assigneeIsMember) {
          throw new BadRequestException(
            "Assigned user must be a member of the project's team",
          );
        }
        task.assignedTo = new Types.ObjectId(assigneeId);
      } else {
        task.assignedTo = null;
      }
    }
    // Object.assign(task, updateTaskDto);
    // Object.assign(task, {
    //   ...updateTaskDto,
    //   ...(updateTaskDto.assignedTo !== undefined && {
    //     assignedTo: task.assignedTo,
    //   }),
    // });

    const updateData = Object.fromEntries(
      Object.entries(updateTaskDto).filter(([_, value]) => value !== undefined),
    );

    Object.assign(task, updateData);

    return task.save();
  }

  async remove(taskId: string, userId: string) {
    const task = await this.taskModel.findById(taskId);
    if (!task) {
      throw new NotFoundException("Task not found");
    }

    const project = await this.projectsService.findRawById(
      task.project.toString(),
    );
    const teamId = project.team.toString();
    const team = await this.teamsService.findTeamById(teamId);

    const isOwner = team.owner.toString() === userId;
    if (!isOwner) {
      throw new ForbiddenException("Only the team owner can delete tasks");
    }

    await task.deleteOne();
    return { message: "Task deleted successfully" };
  }

  async findMyTasks(userId: string, queryDto: TaskQueryDto) {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      search,
      sortBy = "createdAt",
    } = queryDto;

    const skip = (page - 1) * limit;

    const filter: {
      assignedTo: Types.ObjectId;
      status?: TaskStatus;
      priority?: TaskPriority;
      title?: {
        $regex: string;
        $options: string;
      };
    } = {
      assignedTo: new Types.ObjectId(userId),
    };
    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }
    const [tasks, total] = await Promise.all([
      this.taskModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .populate("project", "name team")
        .populate("createdBy", "name email"),

      this.taskModel.countDocuments(filter),
    ]);

    return {
      data: tasks,

      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
    // return this.taskModel
    //   .find({ assignedTo: new Types.ObjectId(userId) })
    //   .populate("project", "name team")
    //   .populate("createdBy", "name email");
  }
}
