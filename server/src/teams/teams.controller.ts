import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { CreateTeamDto } from "./dto/create-team.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";
import { AddMemberDto } from "./dto/add-member.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import type { JwtPayload } from "src/common/types/jwt-payload.type";

@Controller("teams")
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(
    @Body() createTeamDto: CreateTeamDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.teamsService.create(createTeamDto, user.sub);
  }

  @Get()
  findMyTeams(@CurrentUser() user: JwtPayload) {
    return this.teamsService.findMyTeams(user.sub);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @CurrentUser() user: JwtPayload) {
    return this.teamsService.findById(id, user.sub);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTeamDto: UpdateTeamDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.teamsService.update(id, updateTeamDto, user.sub);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @CurrentUser() user: JwtPayload) {
    return this.teamsService.remove(id, user.sub);
  }

  @Post(":id/members")
  addMember(
    @Param("id") id: string,
    @Body() addMemberDto: AddMemberDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.teamsService.addMember(id, addMemberDto.userId, user.sub);
  }

  @Delete(":id/members/:memberId")
  removeMember(
    @Param("id") id: string,
    @Param("memberId") memberId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.teamsService.removeMember(id, memberId, user.sub);
  }

  @Get(":id/members")
  getMembers(@Param("id") id: string, @CurrentUser() user: JwtPayload) {
    return this.teamsService.getMembers(id, user.sub);
  }
}
