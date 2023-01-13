import { JWTAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ParseStringPipe } from './pipes/parse-string.pipe';
import { UserExistGuard } from './guards/user-exist.guard';
import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Param,
  Get,
  Inject,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { USER_SERVICE } from 'src/core/constants';
import { IUserService } from './user-service.interface';

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  /**
   * register a new user; performs validation.
   *
   * @param {CreateUserDto} - a new register request.
   * @return {Promise<user>} Newly created user.
   */
  @UseGuards(UserExistGuard)
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * getUser returns a specific user; performs validation.
   *
   * @param {id} -  request.
   * @return {Promise<user>} found user.
   */
  @UseGuards(JWTAuthGuard)
  //   @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUser(@Param('id', new ParseStringPipe()) id: string) {
    try {
      return await this.userService.getById(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
