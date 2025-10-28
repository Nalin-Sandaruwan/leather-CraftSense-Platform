import { Test, TestingModule } from '@nestjs/testing';
import { MeterialWasteController } from './meterial_waste.controller';
import { MeterialWasteService } from './meterial_waste.service';

describe('MeterialWasteController', () => {
  let controller: MeterialWasteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeterialWasteController],
      providers: [MeterialWasteService],
    }).compile();

    controller = module.get<MeterialWasteController>(MeterialWasteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
