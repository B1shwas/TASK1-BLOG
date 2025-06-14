import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { USER_ROLE } from '../enum/role.enum';
import { NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'users', versionKey: false })
export class User extends Document {
  readonly _id: Types.ObjectId;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: USER_ROLE, default: USER_ROLE.USER })
  role: USER_ROLE;

  comparePassword: (password: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next: NextFunction) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};
