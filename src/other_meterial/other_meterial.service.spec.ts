import { Test, TestingModule } from '@nestjs/testing';
import { OtherMeterialService } from './other_meterial.service';

describe('OtherMeterialService', () => {
  let service: OtherMeterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtherMeterialService],
    }).compile();

    service = module.get<OtherMeterialService>(OtherMeterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
