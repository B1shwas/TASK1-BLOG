import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './model/blog.model';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async create(createBlogDto: CreateBlogDto, user: string): Promise<Blog> {
    const createdBlog = new this.blogModel({ ...createBlogDto, author: user });
    return createdBlog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find({ isDeleted: false }).exec();
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogModel
      .findOne({ _id: id, isDeleted: false })
      .exec();
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const updatedBlog = await this.blogModel
      .findOneAndUpdate({ _id: id, isDeleted: false }, updateBlogDto, {
        new: true,
      })
      .exec();

    if (!updatedBlog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
    return updatedBlog;
  }

  async findBySlug(slug: string): Promise<Blog> {
    const blog = await this.blogModel
      .findOne({ slug, isDeleted: false })
      .exec();
    if (!blog) {
      throw new NotFoundException(`Blog with slug ${slug} not found`);
    }
    return blog;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.blogModel
      .findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true },
      )
      .exec();

    if (!deleted) {
      throw new NotFoundException(
        `Blog with id ${id} not found or already deleted`,
      );
    }
  }
}
