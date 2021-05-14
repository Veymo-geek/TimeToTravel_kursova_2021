import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { LoginResponse } from './interfaces/login-res.interface';
import { RegistrationResponse } from './interfaces/registration-res.interface';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('registration')
  async registration(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<RegistrationResponse> {
    try {
      const existsUser = await this.usersService.findUserByPhone(
        registerUserDto.phone,
      );

      if (existsUser) {
        throw new HttpException(
          'User with this email exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(registerUserDto.password, salt);
      registerUserDto.password = hash;
      const newUser = await this.usersService.create(registerUserDto);

      const payload: JwtPayload = {
        userId: newUser['_id'],
        userRole: newUser.userRole,
      };

      return {
        success: true,
        message: 'Account was successfully created!',
        token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    try {
      const foundedUser = await this.usersService.findUserByPhone(
        loginUserDto.phone,
      );

      if (!foundedUser) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }

      const checkPassword = await bcrypt.compareSync(
        loginUserDto.password,
        foundedUser.password,
      );

      if (!checkPassword) {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      }

      const payload = {
        userId: foundedUser['_id'],
        userRole: foundedUser.userRole,
      };
      return {
        token: this.jwtService.sign(payload),
        message: 'Success',
        success: true,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
