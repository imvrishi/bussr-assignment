import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findOne(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(username: string, password: string): Promise<User> {
    const creationDate = new Date();

    const user = new this.userModel({
      creationDate,
      username,
      password,
    });
    return user.save();
  }
}
