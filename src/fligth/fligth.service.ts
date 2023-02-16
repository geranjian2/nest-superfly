import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IFligth } from 'src/common/interfaces/fligth.interface';
import { FLIGTH } from '../common/models/models';
import { Model } from 'mongoose';
import { FligthDTO } from './dto/fligth.dto';
import axios from 'axios';
import * as moment from 'moment';
import { ILocation } from 'src/common/interfaces/location.interface';
import { IWeather } from 'src/common/interfaces/weather.interface';
@Injectable()
export class FligthService {
  constructor(
    @InjectModel(FLIGTH.name) private readonly model: Model<IFligth>,
  ) {}
  async getLocation(location: string): Promise<ILocation> {
    const { data } = await axios.get(
      `https://www.metaweather.com/api/location/search/?query=${location}`,
    );
    return data[0];
  }
  async getWeather(woeid: number, fligthDate: Date): Promise<IWeather[]> {
    const dateFormat = moment.utc(fligthDate).format();
    const year = dateFormat.substring(0, 4);
    const month = dateFormat.substring(5, 7);
    const day = dateFormat.substring(8, 10);
    const { data } = await axios.get(
      `https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${day}`,
    );
    return data;
  }
  assing(
    { _id, pilot, airplane, destinationCity, fligthDate, passengers }: IFligth,
    weather: IWeather[],
  ): IFligth {
    return Object.assign({
      _id,
      pilot,
      airplane,
      destinationCity,
      fligthDate,
      passengers,
      weather,
    });
  }
  async create(fligthDTO: FligthDTO): Promise<IFligth> {
    const newFligth = new this.model({ ...fligthDTO });
    return await newFligth.save();
  }
  async findAll(): Promise<IFligth[]> {
    return await this.model.find().populate('passengers');
  }
  async findOne(id: string): Promise<IFligth> {
    const fligth = await this.model.findById(id).populate('passengers');
    const location: ILocation = await this.getLocation(fligth.destinationCity);
    const weather: IWeather[] = await this.getWeather(
      location.woeid,
      fligth.fligthDate,
    );
    return this.assing(fligth, weather);
  }
  async update(id: string, fligthDTO: FligthDTO): Promise<IFligth> {
    const fligth = { ...fligthDTO };
    return await this.model.findByIdAndUpdate(id, fligth, { new: true });
  }
  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK };
  }
  async addPassenger(fligthId: string, passengerId: string): Promise<IFligth> {
    return await this.model
      .findByIdAndUpdate(
        fligthId,
        {
          $addToSet: { passengers: passengerId },
        },
        { new: true },
      )
      .populate('passengers');
  }
}
