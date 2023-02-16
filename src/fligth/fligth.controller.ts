import {
  Body,
  Controller,
  Post,
  Param,
  Delete,
  Put,
  Get,
  HttpException,
} from '@nestjs/common';
import { PassengerService } from 'src/passenger/passenger.service';
import { FligthDTO } from './dto/fligth.dto';
import { FligthService } from './fligth.service';
import { HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Fligth')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/fligth')
export class FligthController {
  constructor(
    private readonly fligthService: FligthService,
    private readonly passengerService: PassengerService,
  ) {}
  @Post()
  create(@Body() fligthDTO: FligthDTO) {
    return this.fligthService.create(fligthDTO);
  }

  @Get()
  findAll() {
    return this.fligthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fligthService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() fligthDTO: FligthDTO) {
    return this.fligthService.update(id, fligthDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fligthService.delete(id);
  }
  @Post(':fligthId/passenger/:passengerId')
  async addPassenger(
    @Param('fligthId') fligthId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this.passengerService.findOne(passengerId);
    if (!passenger)
      throw new HttpException('Passenger no Found', HttpStatus.NOT_FOUND);

    return this.fligthService.addPassenger(fligthId, passengerId);
  }
}
