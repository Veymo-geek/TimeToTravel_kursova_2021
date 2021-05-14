import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TourSchema, Tour } from './schemas/tour.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
  ],
  exports: [TourService],
  providers: [TourService],
  controllers: [TourController],
})
export class TourModule {}
