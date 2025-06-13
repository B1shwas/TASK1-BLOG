import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { USER_ROLE } from '../enum/role.enum';
import { NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  username: string;

  @Prop({ required: true })
  password: string;

  token?: string;

  role: USER_ROLE = USER_ROLE.USER;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: NextFunction) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};
