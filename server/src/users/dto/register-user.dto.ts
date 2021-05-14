import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  email: string;

  @MaxLength(30)
  phone: string;

  @MinLength(6)
  @MaxLength(30)
  password: string;
}
