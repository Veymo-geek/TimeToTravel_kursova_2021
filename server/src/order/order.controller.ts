import {
  Body,
  Get,
  HttpStatus,
  Post,
  Controller,
  Param,
  Delete,
  Put,
  Query,
  HttpException,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { map, assign } from 'lodash';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { TourService } from 'src/tour/tour.service';
import { UsersService } from 'src/users/users.service';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private tourService: TourService,
    private userService: UsersService,
  ) {}

  @Get()
  async findAll(@Query('filter') query) {
    const q = query ? JSON.parse(query) : {};

    const foundedItems = await this.orderService.findAll(q);
    await Promise.all(
      map(foundedItems, async (item) => {
        assign(foundedItems, {
          user: await this.userService.findById(item.userId),
          tour: await this.tourService.findById(item.tourId),
        });
      }),
    );
    console.log(foundedItems);

    return {
      statusCode: HttpStatus.OK,
      data: foundedItems,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const foundedItem = await this.orderService.findById(id);
    if (!foundedItem) {
      throw new NotFoundException('Not found');
    }
    return {
      statusCode: HttpStatus.OK,
      data: foundedItem,
    };
  }

  @Post()
  async create(@Body() data: OrderDto) {
    return {
      statusCode: HttpStatus.CREATED,
      data: await this.orderService.create(data),
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: OrderDto) {
    const foundedItem = await this.orderService.findById(id);
    if (!foundedItem) {
      throw new NotFoundException('Not found');
    }
    const updatedItem = await this.orderService.update(id, data);

    return {
      statusCode: HttpStatus.OK,
      data: updatedItem,
    };
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const foundedItem = await this.orderService.findById(id);
    if (!foundedItem) {
      throw new NotFoundException('Not found');
    }
    await this.orderService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Deleted',
    };
  }
}
