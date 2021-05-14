import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TourDocument = Tour & Document;

@Schema({ versionKey: false, timestamps: true })
export class Tour {
  @Prop({ required: true })
  price: number;

  @Prop({ required: true, type: 'date' })
  startDate: Date;

  @Prop({ required: true, type: 'date' })
  endDate: Date;

  @Prop({ required: true })
  place: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  description: string;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
