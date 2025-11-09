import { Test, TestingModule } from '@nestjs/testing';
import { OtherMeterialController } from './other_meterial.controller';
import { OtherMeterialService } from './other_meterial.service';

describe('OtherMeterialController', () => {
  let controller: OtherMeterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtherMeterialController],
      providers: [OtherMeterialService],
    }).compile();

    controller = module.get<OtherMeterialController>(OtherMeterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
