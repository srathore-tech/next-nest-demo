import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";
import { Project, ProjectSchema } from "./schemas/project.schema";
import { TeamsModule } from "src/teams/teams.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    TeamsModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
