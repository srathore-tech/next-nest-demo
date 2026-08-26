import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import type mongoose from "mongoose";
import { Team, TeamDocument } from "./schemas/team.schema";
import { CreateTeamDto } from "./dto/create-team.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";
import { UsersService } from "src/users/users.service";
import { MongoServerError } from "mongodb";

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<TeamDocument>,
    private readonly usersService: UsersService,
  ) {}

  async findTeamById(teamId: string) {
    const team = await this.teamModel.findById(teamId);

    if (!team) {
      throw new NotFoundException("Team not found");
    }

    return team;
  }

  async create(createTeamDto: CreateTeamDto, ownerId: string) {
    try {
      const team = await this.teamModel.create({
        ...createTeamDto,
        owner: new Types.ObjectId(ownerId),
        members: [new Types.ObjectId(ownerId)],
      });

      return team.populate("owner", "name email");
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new ConflictException("You already have a team with this name");
      }

      if (error instanceof Error && error.name === "ValidationError") {
        const messages = Object.values(
          (error as mongoose.Error.ValidationError).errors,
        ).map((err) => err.message);
        throw new BadRequestException(messages.join(", "));
      }

      throw error;
    }
  }

  async findMyTeams(userId: string) {
    return this.teamModel
      .find({
        $or: [
          { owner: new Types.ObjectId(userId) },
          { members: new Types.ObjectId(userId) },
        ],
      })
      .populate("owner", "name email")
      .populate("members", "name email");
  }

  async findById(teamId: string, userId?: string) {
    const team = await this.teamModel
      .findById(teamId)
      .populate("owner", "name email")
      .populate("members", "name email");

    if (!team) {
      throw new NotFoundException("Team not found");
    }

    if (userId) {
      const isOwner = team.owner._id.toString() === userId;
      const isMember = team.members.some(
        (member) => member._id.toString() === userId,
      );

      if (!isOwner && !isMember) {
        throw new NotFoundException("Team not found");
      }
    }

    return team;
  }

  async update(teamId: string, updateTeamDto: UpdateTeamDto, userId: string) {
    const team = await this.findTeamById(teamId);

    const ownerId = team.owner.toString();
    if (ownerId !== userId) {
      throw new ForbiddenException("Only the team owner can update the team");
    }

    console.log({ team, updateTeamDto });
    Object.assign(team, updateTeamDto);
    return team.save();
  }

  async remove(teamId: string, userId: string) {
    const team = await this.findTeamById(teamId);

    const ownerId = team.owner._id.toString();
    if (ownerId !== userId) {
      throw new ForbiddenException("Only the team owner can delete the team");
    }

    await team.deleteOne();
    return { message: "Team deleted successfully" };
  }

  async isTeamMember(teamId: string, userId: string): Promise<boolean> {
    const team = await this.teamModel.findById(teamId);
    if (!team) return false;
    return team.members.some((member) => member.toString() === userId);
  }

  async addMember(teamId: string, userId: string, ownerId: string) {
    const team = await this.findTeamById(teamId);

    const teamOwnerId = team.owner.toString();
    if (teamOwnerId !== ownerId) {
      throw new ForbiddenException("Only the team owner can add members");
    }

    if (userId === ownerId) {
      throw new BadRequestException(
        "Owner is already a member. Cannot add yourself.",
      );
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const alreadyMember = team.members.some(
      (member) => member._id.toString() === userId,
    );
    if (alreadyMember) {
      throw new ConflictException("User is already a member of this team");
    }

    team.members.push(new Types.ObjectId(userId));
    await team.save();

    return team.populate("members", "name email");
  }

  async removeMember(teamId: string, memberId: string, ownerId: string) {
    const team = await this.findTeamById(teamId);

    const teamOwnerId = team.owner.toString();
    if (teamOwnerId !== ownerId) {
      throw new ForbiddenException("Only the team owner can remove members");
    }

    if (memberId === ownerId) {
      throw new BadRequestException("Owner cannot be removed from the team");
    }

    const isMember = team.members.some(
      (member) => member.toString() === memberId,
    );
    if (!isMember) {
      throw new NotFoundException("User is not a member of this team");
    }

    team.members = team.members.filter(
      (member) => member.toString() !== memberId,
    );
    await team.save();

    return team.populate("members", "name email");
  }

  async getMembers(teamId: string, userId: string) {
    const team = await this.findTeamById(teamId);

    const isOwner = team.owner.toString() === userId;

    const isMember = team.members.some(
      (member) => member.toString() === userId,
    );

    if (!isOwner && !isMember) {
      throw new NotFoundException("Team not found");
    }

    await team.populate("members", "name email");

    return team.members;
  }
}
