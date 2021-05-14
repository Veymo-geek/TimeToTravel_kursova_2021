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
import { TourService } from './tour.service';
import { TourDto } from './dto/tour.dto';

@Controller('tour')
export class TourController {
  constructor(private tourService: TourService) {}

  @Get()
  async findAll(@Query('filter') query) {
    const q = query ? JSON.parse(query) : {};

    const foundedTours = await this.tourService.findAll(q);

    return {
      statusCode: HttpStatus.OK,
      data: foundedTours,
    };
  }

  @Get('/places')
  async findAllByTrainId(@Body() data) {
    const foundedTrains = await this.tourService.findAll();

    // await Promise.all(
    //   map(foundedTrains, async (item) => {
    //     assign(item, {
    //       trainPlaces: await this.placeService.findAllByTrainId(item._id),
    //     });
    //   }),
    // );

    return {
      statusCode: HttpStatus.OK,
      data: foundedTrains,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const foundedItem = await this.tourService.findById(id);
    if (!foundedItem) {
      throw new NotFoundException('Not found');
    }
    return {
      statusCode: HttpStatus.OK,
      data: foundedItem,
    };
  }

  @Post()
  async create(@Body() data: TourDto) {
    return {
      statusCode: HttpStatus.CREATED,
      data: await this.tourService.create(data),
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: TourDto) {
    const foundedItem = await this.tourService.findById(id);
    if (!foundedItem) {
      throw new Error('Not found');
    }
    const updatedItem = await this.tourService.update(id, data);

    return {
      statusCode: HttpStatus.OK,
      data: updatedItem,
    };
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const foundedItem = await this.tourService.findById(id);
    if (!foundedItem) {
      throw new Error('Not found');
    }
    await this.tourService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Deleted',
    };
  }
}
