import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/modules/user/model/user.model';

@Schema({ timestamps: true, collection: 'blogs', versionKey: false })
export class Blog extends Document {
  readonly _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  author: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({
    type: String,
    unique: true,
  })
  slug: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
