import { MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  phone: string;

  @MinLength(6)
  @MaxLength(20)
  password: string;
}
