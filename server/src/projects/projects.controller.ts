import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import type { JwtPayload } from "src/common/types/jwt-payload.type";

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post("teams/:teamId/projects")
  create(
    @Param("teamId") teamId: string,
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.projectsService.create(teamId, createProjectDto, user.sub);
  }

  @Get("teams/:teamId/projects")
  findByTeam(@Param("teamId") teamId: string, @CurrentUser() user: JwtPayload) {
    return this.projectsService.findByTeam(teamId, user.sub);
  }

  @Get("projects/:id")
  findOne(@Param("id") id: string, @CurrentUser() user: JwtPayload) {
    return this.projectsService.findById(id, user.sub);
  }

  @Patch("projects/:id")
  update(
    @Param("id") id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.projectsService.update(id, updateProjectDto, user.sub);
  }

  @Delete("projects/:id")
  remove(@Param("id") id: string, @CurrentUser() user: JwtPayload) {
    return this.projectsService.remove(id, user.sub);
  }
}
