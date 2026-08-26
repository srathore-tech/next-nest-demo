import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import type { JwtPayload } from "src/common/types/jwt-payload.type";
import { TaskQueryDto } from "./dto/task-query.dto";

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post("projects/:projectId/tasks")
  create(
    @Param("projectId") projectId: string,
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.tasksService.create(projectId, createTaskDto, user.sub);
  }

  @Get("projects/:projectId/tasks")
  findByProject(
    @Param("projectId") projectId: string,
    @CurrentUser() user: JwtPayload,
    @Query() queryDto: TaskQueryDto,
  ) {
    return this.tasksService.findByProject(projectId, user.sub, queryDto);
  }

  @Get("tasks/my")
  findMyTasks(
    @CurrentUser() user: JwtPayload,
    @Query() queryDto: TaskQueryDto,
  ) {
    return this.tasksService.findMyTasks(user.sub, queryDto);
  }

  @Get("tasks/:id")
  findOne(@Param("id") id: string, @CurrentUser() user: JwtPayload) {
    return this.tasksService.findById(id, user.sub);
  }

  @Patch("tasks/:id")
  update(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.tasksService.update(id, updateTaskDto, user.sub);
  }

  @Delete("tasks/:id")
  remove(@Param("id") id: string, @CurrentUser() user: JwtPayload) {
    return this.tasksService.remove(id, user.sub);
  }
}
