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
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(@Query('filter') query) {
    const q = query ? JSON.parse(query) : {};

    const foundedItems = await this.usersService.findAll(q);
    
    return {
      statusCode: HttpStatus.OK,
      data: foundedItems,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const foundedItem = await this.usersService.findById(id);
    if (!foundedItem) {
      throw new NotFoundException('Not found');
    }
    return {
      statusCode: HttpStatus.OK,
      data: foundedItem,
    };
  }

  @Post()
  async create(@Body() data: UserDto) {
    return {
      statusCode: HttpStatus.CREATED,
      data: await this.usersService.create(data),
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UserDto) {
    const foundedItem = await this.usersService.findById(id);
    if (!foundedItem) {
      throw new NotFoundException('Not found');
    }
    const updatedItem = await this.usersService.update(id, data);

    return {
      statusCode: HttpStatus.OK,
      data: updatedItem,
    };
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const foundedItem = await this.usersService.findById(id);
    if (!foundedItem) {
      throw new NotFoundException('Not found');
    }
    await this.usersService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Deleted',
    };
  }
}
