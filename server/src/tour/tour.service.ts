import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tour, TourDocument } from './schemas/tour.schema';

@Injectable()
export class TourService {
  constructor(
    @InjectModel(Tour.name)
    private readonly tourModel: Model<TourDocument>,
  ) {}

  async findAll(queries = {}): Promise<Tour[]> {
    return await this.tourModel.find({ ...queries }).exec();
  }

  async findById(id: string): Promise<Tour> {
    return await this.tourModel.findById(id);
  }

  async create(item): Promise<Tour> {
    return await new this.tourModel({
      ...item,
    }).save();
  }

  async update(id, data) {
    return await this.tourModel.findByIdAndUpdate(id, data);
  }

  async delete(id) {
    await this.tourModel.findByIdAndDelete(id);
    return { deleted: true };
  }
}
