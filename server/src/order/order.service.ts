import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async findAll(queries = {}): Promise<Order[]> {
    return await this.orderModel.find({ ...queries }).exec();
  }

  async findById(id: string): Promise<Order> {
    return await this.orderModel.findById(id);
  }

  async create(item): Promise<Order> {
    return await new this.orderModel({
      ...item,
    }).save();
  }

  async update(id, data) {
    return await this.orderModel.findByIdAndUpdate(id, data);
  }

  async delete(id) {
    await this.orderModel.findByIdAndDelete(id);
    return { deleted: true };
  }
}
