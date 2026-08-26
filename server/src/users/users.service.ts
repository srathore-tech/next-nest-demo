import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User } from "./schemas/user.schema";
import { UpdateUserDto } from "./dto/update.user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(name: string, email: string, password: string) {
    const user = await this.userModel.create({
      name,
      email,
      password,
    });

    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findAll() {
    return this.userModel.find().select("-password");
  }

  async findById(id: string) {
    return this.userModel.findById(id).select("-password");
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const updateData = Object.fromEntries(
      Object.entries(updateUserDto).filter(([_, value]) => value !== undefined),
    );

    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await this.userModel.findOne({
        email: updateData.email,
        _id: { $ne: userId },
      });

      if (existingUser) {
        throw new ConflictException("Email is already in use");
      }
    }

    Object.assign(user, updateData);

    await user.save();

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto;

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestException("Current password is incorrect");
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      throw new BadRequestException(
        "New password cannot be the same as the current password",
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return {
      message: "Password changed successfully",
    };
  }
}
