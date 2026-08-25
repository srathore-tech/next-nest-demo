import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(name: string, email: string, password: string,role:string) {
    const user = await this.userModel.create({
      name,
      email,
      password,
      role
    });

    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findAll() {
    return this.userModel.find();
  }

  async findById(id: string) {
  return this.userModel.findById(id).select("-password");
}
}
