import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
