import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Tour } from 'src/tour/schemas/tour.schema';
import { Users } from 'src/users/schemas/user.schema';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false, timestamps: true })
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  tourId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
