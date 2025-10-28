import { Test, TestingModule } from '@nestjs/testing';
import { MeterialWasteService } from './meterial_waste.service';

describe('MeterialWasteService', () => {
  let service: MeterialWasteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeterialWasteService],
    }).compile();

    service = module.get<MeterialWasteService>(MeterialWasteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
