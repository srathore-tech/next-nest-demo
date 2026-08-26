import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskPriority } from "src/common/enums/task-priority.enum";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @IsString()
  @IsOptional()
  assignedTo?: string | null;
}
