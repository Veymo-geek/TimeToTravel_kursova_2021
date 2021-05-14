import { Max, MaxLength } from 'class-validator';

export class TourDto {
  @Max(90000000)
  price: number;

  startDate: Date;

  endDate: Date;

  @MaxLength(100)
  place: string;

  @Max(5)
  rating: number;

  @MaxLength(10000)
  description: string;
}
