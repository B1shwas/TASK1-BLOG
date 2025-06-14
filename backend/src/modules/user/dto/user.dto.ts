import { IsEnum, IsLowercase, IsOptional, IsString } from 'class-validator';
import { USER_ROLE } from '../enum/role.enum';

export class CreateUserDto {
  @IsString()
  @IsLowercase()
  username: string;

  @IsString()
  password: string;

  @IsString()
  @IsEnum(USER_ROLE)
  role: USER_ROLE = USER_ROLE.USER;
}
