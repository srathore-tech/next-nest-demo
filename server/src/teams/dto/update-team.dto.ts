import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateTeamDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
