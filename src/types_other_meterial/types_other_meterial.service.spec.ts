import { Test, TestingModule } from '@nestjs/testing';
import { TypesOtherMeterialService } from './types_other_meterial.service';

describe('TypesOtherMeterialService', () => {
  let service: TypesOtherMeterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypesOtherMeterialService],
    }).compile();

    service = module.get<TypesOtherMeterialService>(TypesOtherMeterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
