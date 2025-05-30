import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UpdateUser } from './type/user.type';
import { AccessGuard } from 'src/common/guards/access/access.guard';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessGuard)
  @Post('/update')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Body() body: UpdateUser) {
    return this.userService.updateUser(body);
  }

  @UseGuards(AccessGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
