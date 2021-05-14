import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<UsersDocument>,
  ) {}

  async findUserByPhone(phone: string): Promise<Users> {
    return await this.userModel.findOne({ phone: phone });
  }

  async create(user): Promise<Users> {
    return await new this.userModel({
      ...user,
      userRole: 'user',
    }).save();
  }

  async findAll(queries = []): Promise<Users[]> {
    return await this.userModel.find({ ...queries }).exec();
  }

  async findById(id): Promise<Users> {
    const res = await this.userModel.findById(id).exec();
    return res;
  }

  async update(id, data: Partial<UserDto>) {
    return await this.userModel.findByIdAndUpdate(id, data);
  }

  async delete(id) {
    await this.userModel.findByIdAndDelete(id);
    return { deleted: true };
  }
}
