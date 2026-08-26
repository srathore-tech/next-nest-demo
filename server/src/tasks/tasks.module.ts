import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { Task, TaskSchema } from "./schemas/task.schema";
import { ProjectsModule } from "src/projects/projects.module";
import { TeamsModule } from "src/teams/teams.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    ProjectsModule,
    TeamsModule,
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
