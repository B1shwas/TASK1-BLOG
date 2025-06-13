import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.model';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: CreateUserDto) {
    const duplicate = await this.userModel.findOne({ username: user.username });

    if (duplicate) {
      throw new BadRequestException('Username already exists');
    }

    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser;
  }
}
