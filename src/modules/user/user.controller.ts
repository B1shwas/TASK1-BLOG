import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
