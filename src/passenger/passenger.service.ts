import { Injectable, HttpStatus } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { PASSENGER } from '../common/models/models';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}
  async create(passengerDTO: PassengerDTO): Promise<IPassenger> {
    const newUser = new this.model({ ...passengerDTO });
    return await newUser.save();
  }
  async findAll(): Promise<IPassenger[]> {
    return await this.model.find();
  }
  async findOne(id: string): Promise<IPassenger> {
    return await this.model.findById(id);
  }
  async update(id: string, passengerDTO: PassengerDTO): Promise<IPassenger> {
    const passenger = { ...passengerDTO };
    return await this.model.findByIdAndUpdate(id, passenger, { new: true });
  }
  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK };
  }
}
