import { Test, TestingModule } from '@nestjs/testing';
import { FligthService } from './fligth.service';

describe('FligthService', () => {
  let service: FligthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FligthService],
    }).compile();

    service = module.get<FligthService>(FligthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
