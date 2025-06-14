import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/model/user.model';
import { Model } from 'mongoose';
import { USER_ROLE } from '../user/enum/role.enum';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async seed() {
    const adminExists = await this.userModel.findOne({ role: USER_ROLE.ADMIN });
    console.log(adminExists);

    if (adminExists) {
      return;
    }

    const admin = await this.userModel.create({
      username: 'admin',
      password: 'admin123',
      role: USER_ROLE.ADMIN,
    });
  }
}
