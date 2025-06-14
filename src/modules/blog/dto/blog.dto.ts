import { PartialType } from '@nestjs/mapped-types/dist/partial-type.helper';
import { IsString, IsOptional } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  content: string;
}

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}
