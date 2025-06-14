import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/model/user.model';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) readonly userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(data: LoginUserDto) {
    console.log(data.username);

    const user = await this.userModel.findOne({
      username: data.username,
    });

    if (!user) throw new BadRequestException('User not found');

    const isMatch = await user.comparePassword(data.password);

    if (!isMatch) throw new BadRequestException('Invalid Credentials');

    const token = await this.jwtService.signAsync(
      {
        id: user._id,
        username: user.username,
      },
      {
        secret: this.configService.get<string>('TOKEN_SECRET'),
        expiresIn: '7d',
      },
    );

    return {
      success: true,
      user: user,
      message: 'Login successful',
      token: token,
    };
  }
}
