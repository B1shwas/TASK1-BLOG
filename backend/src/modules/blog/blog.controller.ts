import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  Query,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { Types } from 'mongoose';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: any;
  }
}

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AuthGuard)
  @Post('add')
  async create(@Body() createBlogDto: CreateBlogDto, @Req() req: Request) {
    const user = req.user._id;
    return this.blogService.create(createBlogDto, user);
  }

  @Get('all')
  async findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new NotFoundException('Invalid blog id');
    const blog = await this.blogService.findOne(id);
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  @UseGuards(AuthGuard)
  @Put('/edit/:id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    if (!Types.ObjectId.isValid(id))
      throw new NotFoundException('Invalid blog id');
    return this.blogService.update(id, updateBlogDto);
  }

  @Get('/slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    const blog = await this.blogService.findBySlug(slug);
    return blog;
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new NotFoundException('Invalid blog id');
    return this.blogService.delete(id);
  }
}
