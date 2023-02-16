import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDTO } from './dto/user.sto';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() _userDTO: UserDTO) {
    return this.userService.create(_userDTO);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() _userDTO: UserDTO) {
    return this.userService.update(id, _userDTO);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    this.userService.delete(id);
  }
}
