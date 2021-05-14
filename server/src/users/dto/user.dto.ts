import { IsEmail } from 'class-validator';

export class UserDto {
  firstName: string;

  lastName: string;

  @IsEmail()
  email: string;

  phone: string;

  password: string;

  userRole: string;
}
