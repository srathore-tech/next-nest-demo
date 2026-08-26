import { IsEnum, IsIn, IsOptional, IsString } from "class-validator";

import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { TaskPriority } from "src/common/enums/task-priority.enum";
import { TaskStatus } from "src/common/enums/task-status.enum";

export class TaskQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(["createdAt", "updatedAt", "title", "priority"])
  sortBy?: "createdAt" | "updatedAt" | "title" | "priority";

  //   @IsOptional()
  //   @IsIn(["asc", "desc"])
  //   sortOrder?: "asc" | "desc";
}
