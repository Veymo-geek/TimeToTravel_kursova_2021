import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../users.enum';

export type UsersDocument = Users & Document;

@Schema({ versionKey: false })
export class Users {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Role.USER })
  userRole: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
