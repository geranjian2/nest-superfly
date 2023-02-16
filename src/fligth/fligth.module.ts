import { Module } from '@nestjs/common';
import { FligthController } from './fligth.controller';
import { FligthService } from './fligth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FLIGTH } from '../common/models/models';
import { FligthSchema } from './schema/fligth.schema';
import { PassengerModule } from '../passenger/passenger.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: FLIGTH.name,
        useFactory: () => FligthSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    PassengerModule,
  ],
  controllers: [FligthController],
  providers: [FligthService],
})
export class FligthModule {}
